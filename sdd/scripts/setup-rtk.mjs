#!/usr/bin/env node
// Leaves rtk operational with zero developer action, and lets the sdd-steward switch it off.
//
//   node sdd/scripts/setup-rtk.mjs              hooks + binary (idempotent; what setup-agents
//                                               and the package.json postinstall run)
//   node sdd/scripts/setup-rtk.mjs --status     JSON: enabled, binary, version, hooks
//   node sdd/scripts/setup-rtk.mjs --enable     sdd/tools.json → rtk.enabled = true
//   node sdd/scripts/setup-rtk.mjs --disable    sdd/tools.json → rtk.enabled = false
//   node sdd/scripts/setup-rtk.mjs --no-install hooks only, never touches the binary
//
// The binary install is best effort: pinned version, SHA-256 verified against the release's
// checksums.txt, into a per-user directory (never the repo). Anything that fails prints ONE
// warning with the manual command and exits 0 — the kit stays fully usable without rtk.
// Skipped in CI and when SDD_RTK_SKIP_INSTALL is set (tests, offline installs).

import { createHash } from 'node:crypto';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import {
  CLAUDE_HOOK_COMMAND,
  GEMINI_HOOK_COMMAND,
  REPO_ROOT,
  RULE_ZERO_CLAUDE_COMMAND,
  RULE_ZERO_HOOK_MARKER,
  RULE_ZERO_SESSION_MATCHER,
  RTK_MANUAL_INSTALL,
  RTK_PINNED_VERSION,
  RTK_RELEASES_URL,
  TOOLS_FILE,
  compareVersions,
  findRtkBinary,
  hasKitHook,
  hasNativeRtkHook,
  readJsonFile,
  readToolsFile,
  rtkBinaryName,
  rtkBinaryVersion,
  rtkInstallDir,
  rtkSettings,
} from './rtk-common.mjs';

const CLAUDE_SETTINGS = join(REPO_ROOT, '.claude', 'settings.json');
const GEMINI_SETTINGS = join(REPO_ROOT, '.gemini', 'settings.json');
const DOWNLOAD_TIMEOUT_MS = 30_000;

const TARGETS = {
  linux: {
    x64: 'x86_64-unknown-linux-musl',
    arm64: 'aarch64-unknown-linux-gnu',
  },
  darwin: { x64: 'x86_64-apple-darwin', arm64: 'aarch64-apple-darwin' },
  win32: { x64: 'x86_64-pc-windows-msvc' },
};

const log = (line) => process.stdout.write(`${line}\n`);
const warn = (line) => process.stderr.write(`⚠ ${line}\n`);

// ─── sdd/tools.json ──────────────────────────────────────────────────────────

function writeTools(tools) {
  writeFileSync(TOOLS_FILE, `${JSON.stringify(tools, null, 2)}\n`, 'utf8');
}

function setEnabled(enabled) {
  const tools = readToolsFile() ?? {
    $schema: './schemas/tools.schema.json',
    rtk: {},
  };
  tools.rtk = { ...(tools.rtk ?? {}), enabled };
  writeTools(tools);
  log(
    `rtk ${enabled ? 'enabled' : 'disabled'} in sdd/tools.json${
      enabled ? '' : ' — hooks stay installed but pass every command through untouched'
    }`,
  );
}

// ─── hooks ───────────────────────────────────────────────────────────────────

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

/**
 * Merge, never clobber: other hooks are kept, ours is added once. A hook wired by
 * `rtk init` (the upstream installer) is respected — two rewrites would fight.
 */
function ensureHook({ file, label, eventKey, matcher, hook, tool = 'rtk', marker, nativeCheck = true }) {
  const settings = readJsonFile(file) ?? {};
  if (existsSync(file) && readJsonFile(file) === null) {
    warn(`${label} is not valid JSON — ${tool} hook not added; fix the file and re-run pnpm sdd:rtk`);
    return false;
  }
  if (hasKitHook(settings, eventKey, marker)) {
    log(`present          : ${label} (${eventKey} ${tool})`);
    return true;
  }
  if (nativeCheck && hasNativeRtkHook(settings, eventKey)) {
    log(`kept yours       : ${label} already runs rtk's own hook`);
    return true;
  }
  settings.hooks = settings.hooks ?? {};
  const list = Array.isArray(settings.hooks[eventKey])
    ? settings.hooks[eventKey]
    : [];
  list.push({ matcher, hooks: [hook] });
  settings.hooks[eventKey] = list;
  writeJson(file, settings);
  log(`merged           : ${label} (${eventKey} ${tool})`);
  return true;
}

/** Rule zero must survive `rtk.enabled = false`, so it never consults tools.json. */
function ensureRuleZeroHook() {
  return ensureHook({
    file: CLAUDE_SETTINGS,
    label: '.claude/settings.json',
    eventKey: 'SessionStart',
    matcher: RULE_ZERO_SESSION_MATCHER,
    hook: { type: 'command', command: RULE_ZERO_CLAUDE_COMMAND, timeout: 10 },
    tool: 'rule-zero',
    marker: RULE_ZERO_HOOK_MARKER,
    nativeCheck: false,
  });
}

function ensureHooks() {
  const claude = ensureHook({
    file: CLAUDE_SETTINGS,
    label: '.claude/settings.json',
    eventKey: 'PreToolUse',
    matcher: 'Bash',
    hook: { type: 'command', command: CLAUDE_HOOK_COMMAND, timeout: 10 },
  });
  const gemini = ensureHook({
    file: GEMINI_SETTINGS,
    label: '.gemini/settings.json',
    eventKey: 'BeforeTool',
    matcher: 'run_shell_command',
    hook: {
      type: 'command',
      name: 'SDD rtk rewrite',
      command: GEMINI_HOOK_COMMAND,
      timeout: 10000,
    },
  });
  return { claude, gemini };
}

// ─── binary ──────────────────────────────────────────────────────────────────

function targetTriple() {
  return TARGETS[process.platform]?.[process.arch] ?? null;
}

function releaseBaseUrl(version) {
  return (
    process.env.SDD_RTK_RELEASE_BASE_URL ??
    `${RTK_RELEASES_URL}/download/v${version}`
  );
}

async function download(url, dest) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      writeFileSync(dest, Buffer.from(await response.arrayBuffer()));
      return;
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    // Node's fetch ignores HTTPS_PROXY; curl honours it, so corporate networks get a
    // second chance before we give up.
    const curl = spawnSync('curl', ['-fsSL', '--max-time', '30', '-o', dest, url], {
      encoding: 'utf8',
      windowsHide: true,
    });
    if (curl.status === 0 && existsSync(dest)) return;
    throw error instanceof Error ? error : new Error(String(error));
  }
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function expectedChecksum(checksumsPath, assetName) {
  for (const line of readFileSync(checksumsPath, 'utf8').split('\n')) {
    const [hash, ...rest] = line.trim().split(/\s+/);
    const name = rest.join(' ').replace(/^\*/, '');
    if (name === assetName || name.endsWith(`/${assetName}`)) return hash;
  }
  return null;
}

function extract(archive, into) {
  const args = archive.endsWith('.zip') ? ['-xf', archive] : ['-xzf', archive];
  const tar = spawnSync('tar', [...args, '-C', into], {
    encoding: 'utf8',
    windowsHide: true,
  });
  if (tar.status === 0) return;
  if (process.platform === 'win32' && archive.endsWith('.zip')) {
    const ps = spawnSync(
      'powershell',
      [
        '-NoProfile',
        '-Command',
        `Expand-Archive -LiteralPath '${archive}' -DestinationPath '${into}' -Force`,
      ],
      { encoding: 'utf8', windowsHide: true },
    );
    if (ps.status === 0) return;
  }
  throw new Error(`could not extract ${archive}`);
}

function findFile(dir, name) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(path, name);
      if (found) return found;
    } else if (entry.name === name) {
      return path;
    }
  }
  return null;
}

async function installBinary(version) {
  const triple = targetTriple();
  if (!triple) {
    throw new Error(`no rtk release for ${process.platform}/${process.arch}`);
  }
  const ext = process.platform === 'win32' ? 'zip' : 'tar.gz';
  const asset = `rtk-${triple}.${ext}`;
  const base = releaseBaseUrl(version);
  const work = mkdtempSync(join(tmpdir(), 'sdd-rtk-'));
  try {
    const archive = join(work, asset);
    const checksums = join(work, 'checksums.txt');
    await download(`${base}/${asset}`, archive);
    await download(`${base}/checksums.txt`, checksums);
    const expected = expectedChecksum(checksums, asset);
    if (!expected) throw new Error(`${asset} missing from checksums.txt`);
    const actual = sha256(archive);
    if (actual !== expected) {
      throw new Error(`checksum mismatch for ${asset} (refusing to install)`);
    }
    const unpacked = join(work, 'unpacked');
    mkdirSync(unpacked);
    extract(archive, unpacked);
    const binary = findFile(unpacked, rtkBinaryName());
    if (!binary) throw new Error(`${rtkBinaryName()} not found inside ${asset}`);
    const dir = rtkInstallDir();
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, rtkBinaryName());
    copyFileSync(binary, dest);
    if (process.platform !== 'win32') chmodSync(dest, 0o755);
    const installed = rtkBinaryVersion(dest);
    if (!installed) throw new Error(`${dest} does not run`);
    return { path: dest, version: installed };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

function installSkipReason(settings) {
  if (process.env.SDD_RTK_SKIP_INSTALL) return 'SDD_RTK_SKIP_INSTALL is set';
  if (process.env.CI) return 'CI environment';
  if (!settings.enabled) return 'rtk.enabled is false in sdd/tools.json';
  if (!settings.autoInstall) return 'rtk.auto_install is false in sdd/tools.json';
  return null;
}

async function ensureBinary(settings) {
  const skip = installSkipReason(settings);
  if (skip) {
    log(`skipped install  : rtk binary (${skip})`);
    return;
  }
  const wanted = settings.version;
  const existing = findRtkBinary();
  const existingVersion = rtkBinaryVersion(existing);
  const ours = existing && existing.startsWith(rtkInstallDir());
  if (existingVersion && compareVersions(existingVersion, wanted) >= 0) {
    log(`present          : rtk ${existingVersion} (${existing})`);
    return;
  }
  if (existing && !ours) {
    log(
      `kept yours       : rtk ${existingVersion ?? '?'} at ${existing} is older than the kit's ${wanted} — upgrade it when you can`,
    );
    return;
  }
  try {
    const { path, version } = await installBinary(wanted);
    log(`installed        : rtk ${version} → ${path}`);
  } catch (error) {
    warn(
      `rtk ${wanted} could not be installed (${error.message}). The kit works without it; ` +
        `to get the token savings install it manually:\n    ${RTK_MANUAL_INSTALL}\n` +
        `  or set "auto_install": false in sdd/tools.json to stop trying.`,
    );
  }
}

// ─── status ──────────────────────────────────────────────────────────────────

function status() {
  const settings = rtkSettings();
  const binary = findRtkBinary();
  const claude = readJsonFile(CLAUDE_SETTINGS);
  const gemini = readJsonFile(GEMINI_SETTINGS);
  return {
    enabled: settings.enabled,
    auto_install: settings.autoInstall,
    pinned_version: settings.version,
    kit_pinned_version: RTK_PINNED_VERSION,
    binary,
    version: rtkBinaryVersion(binary),
    install_dir: rtkInstallDir(),
    hooks: {
      rule_zero: hasKitHook(claude, 'SessionStart', RULE_ZERO_HOOK_MARKER),
      claude: hasKitHook(claude, 'PreToolUse') || hasNativeRtkHook(claude, 'PreToolUse'),
      gemini: hasKitHook(gemini, 'BeforeTool') || hasNativeRtkHook(gemini, 'BeforeTool'),
    },
    tools_file: existsSync(TOOLS_FILE),
  };
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--status')) {
    log(JSON.stringify(status(), null, 2));
    return;
  }
  if (args.has('--enable')) return setEnabled(true);
  if (args.has('--disable')) return setEnabled(false);

  if (!existsSync(TOOLS_FILE)) {
    writeTools({
      $schema: './schemas/tools.schema.json',
      rtk: { enabled: true, auto_install: true },
    });
    log('created          : sdd/tools.json');
  }
  ensureRuleZeroHook();
  ensureHooks();
  if (!args.has('--no-install')) await ensureBinary(rtkSettings());
}

main().catch((error) => {
  warn(`setup-rtk: ${error.message}`);
  process.exit(0);
});
