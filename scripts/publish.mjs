#!/usr/bin/env node

/**
 * tucu-ui publish script
 *
 * Usage:
 *   node scripts/publish.mjs patch              # 2.0.11 → 2.0.12
 *   node scripts/publish.mjs minor              # 2.0.11 → 2.1.0
 *   node scripts/publish.mjs major              # 2.0.11 → 3.0.0
 *   node scripts/publish.mjs publish            # publica la versión actual sin bump ni git
 *   node scripts/publish.mjs publish --skip-build  # igual pero salta el build
 *   node scripts/publish.mjs --dry-run patch    # simula todo sin publicar
 *   node scripts/publish.mjs --skip-docs patch  # salta actualización de docs
 *   node scripts/publish.mjs --skip-git patch   # salta verificación working tree y commit/tag
 *
 * Steps:
 *   1. Validate bump type
 *   2. Read current version from ui/tucu-ui/package.json
 *   3. Calculate next version
 *   4. Check if version already exists on npm registry
 *   5. Auto-generate CHANGELOG entry from git commits since last tag
 *   6. Update version badge and install command in README.md
 *   7. Update version in ui/tucu-ui/package.json
 *   8. Build the library (pnpm nx run tucu-ui:build)
 *   9. Sync version in dist/ui/tucu-ui/package.json
 *  10. Publish to npm from dist/ui/tucu-ui
 *  11. (unless --skip-git) Commit and tag the release
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ─── HELPERS ───────────────────────────────────────────────

function log(msg) {
  console.log(`\x1b[36m[publish]\x1b[0m ${msg}`);
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
      cwd: ROOT,
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

/**
 * Aborts the publish when any required build artifact is missing from dist.
 */
function verifyDistArtifacts() {
  const distDir = resolve(ROOT, 'dist/ui/tucu-ui');
  const required = ['index.js', 'index.mjs', 'index.d.ts', 'index.css', 'package.json'];
  const missing = required.filter((f) => !existsSync(resolve(distDir, f)));
  if (missing.length > 0) {
    error(
      `dist/ui/tucu-ui is missing required artifacts: ${missing.join(', ')}.\n` +
        '  Run "pnpm nx run tucu-ui:build" and retry.'
    );
  }
  success('Dist artifacts verified (index.js, index.mjs, index.d.ts, index.css, package.json).');
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

/**
 * Conventional commit prefixes → CHANGELOG section mapping.
 */
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

/**
 * Parses raw git commit subjects into grouped CHANGELOG sections.
 * Supports conventional commits: "feat(scope): message" or "feat: message".
 */
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

/**
 * Gets all commit subjects since lastTag (or all commits if no tag exists).
 */
function getCommitsSinceTag(lastTag) {
  const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
  const out = exec(`git log ${range} --pretty=format:"%s" --no-merges`, {
    silent: true,
    ignoreError: true,
  });
  return out ? out.trim() : '';
}

/**
 * Builds the new CHANGELOG entry string for the given version.
 */
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

/**
 * Prepends the new entry to ui/tucu-ui/CHANGELOG.md.
 */
function updateChangelog(version, sections) {
  const changelogPath = resolve(ROOT, 'ui/tucu-ui/CHANGELOG.md');
  const newEntry = buildChangelogEntry(version, sections);

  let existing = '';
  try {
    existing = readFileSync(changelogPath, 'utf-8');
  } catch {
    existing =
      '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n';
  }

  // Insert new entry right before the first existing ## section
  const firstSectionIdx = existing.indexOf('\n## ');
  if (firstSectionIdx !== -1) {
    const updated =
      existing.slice(0, firstSectionIdx + 1) +
      newEntry +
      existing.slice(firstSectionIdx + 1);
    writeFileSync(changelogPath, updated);
  } else {
    writeFileSync(changelogPath, existing.trimEnd() + '\n\n' + newEntry);
  }

  return changelogPath;
}

/**
 * Updates version references in README.md:
 *   - shields.io badge URLs
 *   - Versioned install snippets like: pnpm add @e-burgos/tucu-ui@2.0.11
 */
function updateReadme(packageName, oldVersion, newVersion) {
  const readmePath = resolve(ROOT, 'README.md');
  let content;
  try {
    content = readFileSync(readmePath, 'utf-8');
  } catch {
    warn('README.md not found — skipping.');
    return null;
  }

  const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedOld = oldVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Replace versioned install commands: packageName@oldVersion → packageName@newVersion
  content = content.replace(
    new RegExp(`(${escapedName})@${escapedOld}`, 'g'),
    `$1@${newVersion}`
  );

  // Replace pinned version in shields.io badge URLs
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
const skipBuild = args.includes('--skip-build');
const publishOnly = args.includes('publish');
const bumpType = args.find((a) => ['major', 'minor', 'patch'].includes(a));
const otpArg = args.find((a) => a.startsWith('--otp='));
const otp = otpArg ? otpArg.split('=')[1] : null;

// ─── PUBLISH-ONLY MODE ─────────────────────────────────────
// Publishes the current version as-is: no bump, no docs, no git commit/tag.
if (publishOnly) {
  const pkgPath = resolve(ROOT, 'ui/tucu-ui/package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const currentVersion = pkg.version;
  const packageName = pkg.name;

  log(`Package:  ${packageName}`);
  log(`Version:  ${currentVersion}  (no bump — publish only)`);

  if (!skipBuild) {
    log('Building library...');
    exec('pnpm nx run tucu-ui:build');
    success('Build complete.');
  } else {
    warn('--skip-build: using existing build artifacts.');
  }

  // Sync version in dist package.json in case the build copied an older version
  const distPkgPath = resolve(ROOT, 'dist/ui/tucu-ui/package.json');
  try {
    const distPkg = JSON.parse(readFileSync(distPkgPath, 'utf-8'));
    if (distPkg.version !== currentVersion) {
      distPkg.version = currentVersion;
      writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + '\n');
      success(`Synced dist/ui/tucu-ui/package.json → ${currentVersion}`);
    }
  } catch (e) {
    error(`Could not sync dist/ui/tucu-ui/package.json: ${e.message}`);
  }

  verifyDistArtifacts();
  log(`Publishing ${packageName}@${currentVersion} to npm...`);
  const publishCmd = `pnpm npm publish --access public --no-git-checks${
    otp ? ` --otp=${otp}` : ''
  }`;
  exec(publishCmd, {
    cwd: resolve(ROOT, 'dist/ui/tucu-ui'),
  });
  success(`Published ${packageName}@${currentVersion} to npm!`);

  console.log(`
\x1b[32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
  📦  ${packageName}@${currentVersion} published!
\x1b[32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`);
  process.exit(0);
}

if (!bumpType) {
  error(
    'Missing bump type.\nUsage: node scripts/publish.mjs [--dry-run] [--skip-docs] [--skip-git] <patch|minor|major>\n       node scripts/publish.mjs publish [--skip-build]'
  );
}

// 0. Guard: working tree must be clean before making any changes
if (!dryRun && !skipGit) checkCleanWorkingTree();

// 1. Read current version
const pkgPath = resolve(ROOT, 'ui/tucu-ui/package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const currentVersion = pkg.version;
const packageName = pkg.name;

log(`Package:         ${packageName}`);
log(`Current version: ${currentVersion}`);

// 2. Calculate next version
const nextVersion = bumpVersion(currentVersion, bumpType);
log(`Next version:    ${nextVersion} (${bumpType})`);

// 3. Check npm registry
log(`Checking npm registry for ${packageName}@${nextVersion}...`);
if (versionExistsOnNpm(packageName, nextVersion)) {
  error(
    `Version ${nextVersion} already exists on npm! Choose a different bump type.`
  );
}
success(`Version ${nextVersion} is available on npm.`);

// 4. Gather git commits for docs
const lastTag = getLastTag('tucu-ui-v');
const rawLog = getCommitsSinceTag(lastTag);
const sections = parseCommits(rawLog);
const commitCount = Object.values(sections).flat().length;

log(`Commits since ${lastTag ?? 'beginning'}: ${commitCount}`);

if (dryRun) {
  log('--dry-run mode: showing planned changes without applying them.\n');
  console.log(`  Bump:    ${currentVersion} → ${nextVersion}`);
  // Check MCP dependency
  const mcpDepName = '@e-burgos/tucu-ui-mcp';
  const currentMcpDep = pkg.dependencies?.[mcpDepName] ?? 'N/A';
  let latestMcpVersion = 'unknown';
  try {
    latestMcpVersion = execSync(`npm view ${mcpDepName} version 2>/dev/null`, {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: ROOT,
    }).trim();
  } catch {
    /* ignore */
  }
  console.log(
    `  MCP dep: ${currentMcpDep} (latest on npm: ${latestMcpVersion})`
  );
  if (!skipDocs) {
    console.log('\n  CHANGELOG entry preview:\n');
    console.log(buildChangelogEntry(nextVersion, sections));
    console.log(`  README:  @${currentVersion} refs → @${nextVersion}`);
  }
  console.log(`\n  Build:   pnpm nx run tucu-ui:build`);
  console.log(
    `  Publish: cd dist/ui/tucu-ui && pnpm npm publish --access public --no-git-checks\n`
  );
  process.exit(0);
}

// 5. Update CHANGELOG.md
if (!skipDocs) {
  log('Updating CHANGELOG.md...');
  const changelogPath = updateChangelog(nextVersion, sections);
  success(`Updated ${changelogPath}`);

  // 6. Update README.md
  log('Updating README.md...');
  const readmePath = updateReadme(packageName, currentVersion, nextVersion);
  if (readmePath) success(`Updated ${readmePath}`);
} else {
  warn('--skip-docs: skipping CHANGELOG and README update.');
}

// 7. Update version in source package.json
pkg.version = nextVersion;

// 7b. Ensure @e-burgos/tucu-ui-mcp dependency points to latest published version
log('Checking @e-burgos/tucu-ui-mcp dependency...');
const mcpDepName = '@e-burgos/tucu-ui-mcp';
if (pkg.dependencies && pkg.dependencies[mcpDepName]) {
  let latestMcpVersion;
  try {
    latestMcpVersion = execSync(`npm view ${mcpDepName} version 2>/dev/null`, {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: ROOT,
    }).trim();
  } catch {
    warn(
      `Could not fetch latest ${mcpDepName} version from npm — skipping sync.`
    );
    latestMcpVersion = null;
  }
  if (latestMcpVersion) {
    const currentMcpDep = pkg.dependencies[mcpDepName];
    const expectedDep = `^${latestMcpVersion}`;
    if (currentMcpDep !== expectedDep) {
      pkg.dependencies[mcpDepName] = expectedDep;
      success(
        `Updated ${mcpDepName} dependency: ${currentMcpDep} → ${expectedDep}`
      );
    } else {
      success(`${mcpDepName} dependency already up to date (${currentMcpDep})`);
    }
  }
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
success(`Updated ui/tucu-ui/package.json → ${nextVersion}`);

// 8. Build the library
log('Building library...');
exec('pnpm nx run tucu-ui:build');
success('Build complete.');

// 9. Sync version in dist package.json (build may have copied an older version)
const distPkgPath = resolve(ROOT, 'dist/ui/tucu-ui/package.json');
try {
  const distPkg = JSON.parse(readFileSync(distPkgPath, 'utf-8'));
  distPkg.version = nextVersion;
  writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + '\n');
  success(`Updated dist/ui/tucu-ui/package.json → ${nextVersion}`);
} catch (e) {
  error(`Could not update dist/ui/tucu-ui/package.json: ${e.message}`);
}

// 10. Publish to npm
verifyDistArtifacts();
log(`Publishing ${packageName}@${nextVersion} to npm...`);
exec('pnpm npm publish --access public --no-git-checks', {
  cwd: resolve(ROOT, 'dist/ui/tucu-ui'),
});
success(`Published ${packageName}@${nextVersion} to npm!`);

// 11. Commit and tag the release (unless --skip-git)
if (!skipGit) {
  log('Creating release commit and git tag...');
  const filesToCommit = [
    'ui/tucu-ui/package.json',
    ...(skipDocs ? [] : ['ui/tucu-ui/CHANGELOG.md', 'README.md']),
  ];
  exec(`git add ${filesToCommit.map((f) => `"${f}"`).join(' ')}`);
  exec(`git commit -m "chore: release ${packageName}@${nextVersion}"`);
  const releaseTag = `tucu-ui-v${nextVersion}`;
  exec(`git tag ${releaseTag}`);
  success(`Release commit created and tagged: ${releaseTag}`);
} else {
  warn('--skip-git: skipping commit and tag creation.');
  log(`Remember to commit and tag manually: git tag tucu-ui-v${nextVersion}`);
}

console.log(`
\x1b[32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
  📦  ${packageName}@${nextVersion} published!

  Bump type:  ${bumpType}
  Previous:   ${currentVersion}
  Published:  ${nextVersion}
  Commits:    ${commitCount} processed into CHANGELOG
\x1b[32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`);
