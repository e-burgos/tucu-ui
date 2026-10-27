// Shared helpers for the rtk integration (rtk-hook.mjs, setup-rtk.mjs, docs/serve.mjs).
// rtk (https://github.com/rtk-ai/rtk) is a Rust binary that compresses the output of shell
// commands before an agent reads it. The kit never runs `rtk init`: the hooks point at
// sdd/scripts/rtk-hook.mjs, which delegates to the binary only when sdd/tools.json says so.

import { existsSync, readFileSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Release the kit installs. Bump here (and in the CHANGELOG) to roll the team forward. */
export const RTK_PINNED_VERSION = '0.48.0';
export const RTK_REPO = 'rtk-ai/rtk';
export const RTK_RELEASES_URL = `https://github.com/${RTK_REPO}/releases`;
export const RTK_MANUAL_INSTALL =
  'curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh';

export const SDD_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_ROOT = resolve(SDD_DIR, '..');
export const TOOLS_FILE = join(SDD_DIR, 'tools.json');

/** Substring both hook entries carry — how setup-rtk recognises its own entries. */
export const HOOK_MARKER = 'rtk-hook.mjs';

/** Claude Code expands $CLAUDE_PROJECT_DIR itself, so the hook works from any cwd. */
export const CLAUDE_HOOK_COMMAND =
  'node "$CLAUDE_PROJECT_DIR/sdd/scripts/rtk-hook.mjs" claude';
/** Gemini CLI runs hooks from the project directory and exposes no project-dir variable. */
export const GEMINI_HOOK_COMMAND = 'node sdd/scripts/rtk-hook.mjs gemini';

/** Rule zero (model/effort/context) is re-injected at session start; independent of rtk. */
export const RULE_ZERO_HOOK_MARKER = 'rule-zero-hook.mjs';
export const RULE_ZERO_CLAUDE_COMMAND =
  'node "$CLAUDE_PROJECT_DIR/sdd/scripts/rule-zero-hook.mjs" claude';
export const RULE_ZERO_SESSION_MATCHER = 'startup|resume|clear|compact';

export function readToolsFile() {
  try {
    return JSON.parse(readFileSync(TOOLS_FILE, 'utf8'));
  } catch {
    return null;
  }
}

/** Effective rtk settings: a missing tools.json behaves like the kit default (enabled). */
export function rtkSettings() {
  const rtk = readToolsFile()?.rtk ?? {};
  return {
    enabled: rtk.enabled !== false,
    autoInstall: rtk.auto_install !== false,
    version:
      typeof rtk.version === 'string' && /^\d+\.\d+\.\d+$/.test(rtk.version)
        ? rtk.version
        : RTK_PINNED_VERSION,
  };
}

/** Per-user location (never inside the repo): ~/.local/bin or %LOCALAPPDATA%\rtk\bin. */
export function rtkInstallDir() {
  if (process.env.RTK_INSTALL_DIR) return resolve(process.env.RTK_INSTALL_DIR);
  if (process.platform === 'win32') {
    const base =
      process.env.LOCALAPPDATA ?? join(homedir(), 'AppData', 'Local');
    return join(base, 'rtk', 'bin');
  }
  return join(homedir(), '.local', 'bin');
}

export function rtkBinaryName() {
  return process.platform === 'win32' ? 'rtk.exe' : 'rtk';
}

function isExecutableFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolution order: RTK_BIN → PATH → the kit's install dir. Returns null when absent.
 * Done by hand (no `which`) so the hook stays cheap: it runs before every shell command.
 */
export function findRtkBinary() {
  if (process.env.RTK_BIN && isExecutableFile(process.env.RTK_BIN)) {
    return process.env.RTK_BIN;
  }
  const names =
    process.platform === 'win32' ? ['rtk.exe', 'rtk.cmd', 'rtk'] : ['rtk'];
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!dir) continue;
    for (const name of names) {
      const candidate = join(dir, name);
      if (isExecutableFile(candidate)) return candidate;
    }
  }
  const local = join(rtkInstallDir(), rtkBinaryName());
  if (isExecutableFile(local)) return local;
  return null;
}

/** "rtk 0.48.0" → "0.48.0"; null when the binary is not ours or does not answer. */
export function rtkBinaryVersion(bin) {
  if (!bin) return null;
  const result = spawnSync(bin, ['--version'], {
    encoding: 'utf8',
    timeout: 5000,
    windowsHide: true,
  });
  if (result.status !== 0) return null;
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  if (!/\brtk\b/i.test(output)) return null;
  const match = output.match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : null;
}

export function compareVersions(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function readJsonFile(path) {
  if (!existsSync(path)) return null;
  try {
    // A BOM here is a leftover from Set-Content -Encoding UTF8 on PowerShell 5.1 (older
    // setup-agents.ps1 runs, before it started writing UTF-8 without BOM); JSON.parse rejects it.
    return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    return null;
  }
}

function hookEntries(settings, eventKey) {
  const list = settings?.hooks?.[eventKey];
  return Array.isArray(list) ? list : [];
}

function entryCommands(entry) {
  const hooks = Array.isArray(entry?.hooks) ? entry.hooks : [];
  return hooks
    .map((hook) => (typeof hook?.command === 'string' ? hook.command : ''))
    .filter(Boolean);
}

/** Whether a settings object already routes shell commands through the kit bridge. */
export function hasKitHook(settings, eventKey, marker = HOOK_MARKER) {
  return hookEntries(settings, eventKey).some((entry) =>
    entryCommands(entry).some((cmd) => cmd.includes(marker)),
  );
}

/** Whether `rtk init` (the upstream installer) already wired its own hook here. */
export function hasNativeRtkHook(settings, eventKey) {
  return hookEntries(settings, eventKey).some((entry) =>
    entryCommands(entry).some((cmd) => /\brtk\s+hook\b/.test(cmd)),
  );
}
