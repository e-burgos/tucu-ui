#!/usr/bin/env node
/**
 * tucu-ui-mcp publish script
 * Usage:
 *   node scripts/publish-mcp.mjs patch              # 0.4.0 → 0.4.1
 *   node scripts/publish-mcp.mjs minor              # 0.4.0 → 0.5.0
 *   node scripts/publish-mcp.mjs major              # 0.4.0 → 1.0.0
 *   node scripts/publish-mcp.mjs --dry-run patch    # simula todo sin publicar
 *   node scripts/publish-mcp.mjs --skip-docs patch  # salta actualización de docs
 *   node scripts/publish-mcp.mjs --skip-git patch   # salta verificación working tree y commit/tag
 * Steps:
 *   1. Validate bump type
 *   2. Read current version from tools/mcp-server/package.json
 *   3. Calculate next version
 *   4. Check if version already exists on npm registry
 *   5. Auto-generate CHANGELOG entry from git commits since last tag
 *   6. Update version badge and install command in tools/mcp-server/README.md
 *   7. Update version in tools/mcp-server/package.json
 *   8. Build the MCP server (pnpm nx run tucu-ui-mcp:build)
 *   9. Publish to npm from tools/mcp-server
 *  10. (unless --skip-git) Commit and tag the release (mcp-vX.Y.Z)
 *  11. Deploy to fly.io (flyctl deploy from tools/mcp-server)
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const MCP_DIR = resolve(ROOT, 'tools/mcp-server');

// ─── HELPERS ───────────────────────────────────────────────

function log(msg) {
  console.log(`\x1b[36m[publish-mcp]\x1b[0m ${msg}`);
}
function success(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}
function warn(msg) {
  console.warn(`\x1b[33m⚠\x1b[0m ${msg}`);
}
function error(msg) {
  console.error(`\x1b[31m✗\x1b[0m ${msg}`);
  process.exit(1);
}

function exec(cmd, opts = {}) {
  try {
    return execSync(cmd, {
      cwd: opts.cwd ?? ROOT,
      encoding: 'utf-8',
      stdio: opts.silent ? 'pipe' : 'inherit',
      ...opts,
    });
  } catch (e) {
    if (opts.ignoreError) return (e.stdout || '') + (e.stderr || '');
    error(`Command failed: ${cmd}\n${e.message}`);
  }
}

function bumpVersion(current, type) {
  const [major, minor, patch] = current.split('.').map(Number);
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      error(`Invalid bump type: "${type}". Use: patch | minor | major`);
  }
}

function versionExistsOnNpm(packageName, version) {
  try {
    const result = execSync(
      `npm view ${packageName}@${version} version 2>/dev/null`,
      { encoding: 'utf-8', stdio: 'pipe', cwd: ROOT }
    );
    return result.trim() === version;
  } catch {
    return false;
  }
}

// ─── GIT CHANGELOG GENERATOR ───────────────────────────────

/**
 * Returns the most recent git tag matching the given prefix, or null if none.
 * If no prefix is given, returns the nearest tag from git describe.
 */
function getLastTag(prefix = '') {
  if (prefix) {
    const out = exec(`git tag -l "${prefix}*" --sort=-version:refname`, {
      silent: true,
      ignoreError: true,
    });
    return out ? out.trim().split('\n')[0] || null : null;
  }
  const out = exec('git describe --tags --abbrev=0 2>/dev/null', {
    silent: true,
    ignoreError: true,
  });
  return out ? out.trim() : null;
}

const SECTION_MAP = {
  feat: 'Added',
  feature: 'Added',
  add: 'Added',
  fix: 'Fixed',
  bugfix: 'Fixed',
  hotfix: 'Fixed',
  perf: 'Changed',
  refactor: 'Changed',
  change: 'Changed',
  chore: 'Changed',
  docs: 'Changed',
  style: 'Changed',
  test: 'Changed',
  ci: 'Changed',
  revert: 'Changed',
  remove: 'Removed',
  delete: 'Removed',
  deprecate: 'Removed',
  security: 'Security',
};

function parseCommits(rawLog) {
  const sections = {
    Added: [],
    Changed: [],
    Fixed: [],
    Removed: [],
    Security: [],
  };
  if (!rawLog.trim()) return sections;
  for (const line of rawLog.trim().split('\n')) {
    const trimmed = line.replace(/^\s*[-*]\s*/, '').trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([a-z]+)(?:\([^)]+\))?!?:\s+(.+)/i);
    if (match) {
      const section = SECTION_MAP[match[1].toLowerCase()] ?? 'Changed';
      sections[section].push(match[2]);
    } else {
      sections['Changed'].push(trimmed);
    }
  }
  return sections;
}

function getCommitsSinceTag(lastTag) {
  const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
  const out = exec(`git log ${range} --pretty=format:"%s" --no-merges`, {
    silent: true,
    ignoreError: true,
  });
  return out ? out.trim() : '';
}

function buildChangelogEntry(version, sections) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [`## [${version}] - ${today}`, ''];
  let hasContent = false;
  for (const [section, items] of Object.entries(sections)) {
    if (!items.length) continue;
    hasContent = true;
    lines.push(`### ${section}`, '');
    for (const item of items) lines.push(`- ${item}`);
    lines.push('');
  }
  if (!hasContent) {
    lines.push('### Changed', '', '- Version bump', '');
  }
  return lines.join('\n');
}

function updateChangelog(version, sections) {
  const changelogPath = resolve(MCP_DIR, 'CHANGELOG.md');
  const newEntry = buildChangelogEntry(version, sections);
  let existing = '';
  try {
    existing = readFileSync(changelogPath, 'utf-8');
  } catch {
    existing = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n`;
  }
  const firstSectionIdx = existing.indexOf('\n## ');
  if (firstSectionIdx !== -1) {
    writeFileSync(
      changelogPath,
      existing.slice(0, firstSectionIdx + 1) +
        newEntry +
        existing.slice(firstSectionIdx + 1)
    );
  } else {
    writeFileSync(changelogPath, existing.trimEnd() + '\n\n' + newEntry);
  }
  return changelogPath;
}

function updateReadme(packageName, oldVersion, newVersion) {
  const readmePath = resolve(MCP_DIR, 'README.md');
  let content;
  try {
    content = readFileSync(readmePath, 'utf-8');
  } catch {
    warn('tools/mcp-server/README.md not found — skipping.');
    return null;
  }

  const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedOld = oldVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // npm install / npx references: @package@version
  content = content.replace(
    new RegExp(`(${escapedName})@${escapedOld}`, 'g'),
    `$1@${newVersion}`
  );
  // shields.io version badges: .../npm/v/package/X.Y.Z
  content = content.replace(
    /(\[!\[npm version\].*?\/npm\/v\/[^/\s)]+\/)[\d]+\.[\d]+\.[\d]+/g,
    `$1${newVersion}`
  );

  writeFileSync(readmePath, content);
  return readmePath;
}

// ─── GIT RELEASE ───────────────────────────────────────────

/**
 * Aborts if the working tree has uncommitted changes.
 * Skipped in --dry-run mode.
 */
function checkCleanWorkingTree() {
  const status = exec('git status --porcelain', {
    silent: true,
    ignoreError: true,
  });
  if (status && status.trim()) {
    console.error('\n  Uncommitted changes:');
    console.error(
      status
        .trim()
        .split('\n')
        .map((l) => `    ${l}`)
        .join('\n')
    );
    error(
      'Working tree must be clean before publishing.\n  Commit or stash your changes, then re-run.'
    );
  }
  success('Working tree is clean.');
}

// ─── MAIN ──────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipDocs = args.includes('--skip-docs');
const skipGit = args.includes('--skip-git');
const bumpType = args.find((a) => ['major', 'minor', 'patch'].includes(a));

if (!bumpType) {
  error(
    'Missing bump type.\nUsage: node scripts/publish-mcp.mjs [--dry-run] [--skip-docs] [--skip-git] <patch|minor|major>'
  );
}

// 0. Guard: working tree must be clean before making any changes
if (!dryRun && !skipGit) checkCleanWorkingTree();

const pkgPath = resolve(MCP_DIR, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const currentVersion = pkg.version;
const packageName = pkg.name;

log(`Package:         ${packageName}`);
log(`Current version: ${currentVersion}`);

const nextVersion = bumpVersion(currentVersion, bumpType);
log(`Next version:    ${nextVersion} (${bumpType})`);

log(`Checking npm registry for ${packageName}@${nextVersion}...`);
if (versionExistsOnNpm(packageName, nextVersion)) {
  error(
    `Version ${nextVersion} already exists on npm! Choose a different bump type.`
  );
}
success(`Version ${nextVersion} is available on npm.`);

const lastTag = getLastTag('mcp-v');
const rawLog = getCommitsSinceTag(lastTag);
const sections = parseCommits(rawLog);
const commitCount = Object.values(sections).flat().length;
log(`Commits since ${lastTag ?? 'beginning'}: ${commitCount}`);

if (dryRun) {
  log('--dry-run mode: showing planned changes without applying them.\n');
  console.log(`  Bump:    ${currentVersion} → ${nextVersion}`);
  if (!skipDocs) {
    console.log('\n  CHANGELOG entry preview:\n');
    console.log(buildChangelogEntry(nextVersion, sections));
    console.log(`  README:  @${currentVersion} refs → @${nextVersion}`);
  }
  console.log(`\n  Build:   pnpm nx run tucu-ui-mcp:build`);
  console.log(`  Publish: cd tools/mcp-server && npm publish --access public`);
  console.log(`  Deploy:  flyctl deploy  (cwd: tools/mcp-server)\n`);
  process.exit(0);
}

if (!skipDocs) {
  log('Updating tools/mcp-server/CHANGELOG.md...');
  const changelogPath = updateChangelog(nextVersion, sections);
  success(`Updated ${changelogPath}`);

  log('Updating tools/mcp-server/README.md...');
  const readmePath = updateReadme(packageName, currentVersion, nextVersion);
  if (readmePath) success(`Updated ${readmePath}`);
} else {
  warn('--skip-docs: skipping CHANGELOG and README update.');
}

pkg.version = nextVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
success(`Updated tools/mcp-server/package.json → ${nextVersion}`);

log('Building MCP server...');
exec('pnpm nx run tucu-ui-mcp:build');
success('Build complete.');

log(`Publishing ${packageName}@${nextVersion} to npm...`);
exec('npm publish --access public', { cwd: MCP_DIR });
success(`Published ${packageName}@${nextVersion} to npm!`);

// 10. Commit and tag the release (unless --skip-git)
if (!skipGit) {
  log('Creating release commit and git tag...');
  const filesToCommit = [
    'tools/mcp-server/package.json',
    ...(skipDocs
      ? []
      : ['tools/mcp-server/CHANGELOG.md', 'tools/mcp-server/README.md']),
  ];
  exec(`git add ${filesToCommit.map((f) => `"${f}"`).join(' ')}`);
  exec(`git commit -m "chore: release ${packageName}@${nextVersion}"`);
  const releaseTag = `mcp-v${nextVersion}`;
  exec(`git tag ${releaseTag}`);
  success(`Release commit created and tagged: ${releaseTag}`);
} else {
  warn('--skip-git: skipping commit and tag creation.');
  log(`Remember to commit and tag manually: git tag mcp-v${nextVersion}`);
}

// 11. Deploy to fly.io
log('Deploying to fly.io (tucu-ui-mcp)...');
exec('flyctl deploy', { cwd: MCP_DIR });
success('Deployed to fly.io: https://tucu-ui-mcp.fly.dev');

console.log(`
\x1b[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
  🤖  ${packageName}@${nextVersion} published!

  Bump type:  ${bumpType}
  Previous:   ${currentVersion}
  Published:  ${nextVersion}
  Deployed:   https://tucu-ui-mcp.fly.dev
  Commits:    ${commitCount} processed into CHANGELOG
\x1b[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`);
