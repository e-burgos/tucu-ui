#!/usr/bin/env node

/**
 * Unified publish script for @e-burgos/tucu-ui and @e-burgos/tucu-ui-mcp.
 *
 * Publishing to npm normally happens in CI: this script prepares the
 * release (bump, changelog, README, build, verify, commit, tag) and stops.
 * Pushing the resulting tag (tucu-ui-v*.*.* or mcp-v*.*.*) triggers the
 * matching GitHub Actions workflow, which publishes with an npm automation
 * token (see .github/workflows/publish-tucu-ui.yml / publish-mcp.yml).
 *
 * Usage:
 *   node scripts/publish.mjs <tucu-ui|mcp> <patch|minor|major> [flags]
 *   node scripts/publish.mjs <tucu-ui|mcp> publish [--skip-build] [flags]
 *
 * Flags:
 *   --dry-run        Simulate everything without writing files, building, or publishing
 *   --skip-docs      Skip CHANGELOG.md / README.md updates
 *   --skip-git       Skip clean-working-tree check and the release commit/tag
 *   --skip-build     (publish subcommand only) reuse existing build artifacts
 *   --local-publish  Also run `npm publish` (and, for mcp, `flyctl deploy`) from
 *                    this machine — the emergency/manual escape hatch for when
 *                    CI can't run. Requires interactive npm OTP if 2FA is on.
 *   --otp=123456     OTP to pass through to `npm publish` with --local-publish
 *
 * Steps (bump mode):
 *   1. Validate target and bump type
 *   2. Read current version from the package's package.json
 *   3. Calculate next version
 *   4. Check the next version doesn't already exist on npm
 *   5. Auto-generate a CHANGELOG entry from git commits since the last matching tag
 *   6. Update the version badge / install snippets in the package's README
 *   7. Update version in the package's package.json (tucu-ui also re-syncs its
 *      @e-burgos/tucu-ui-mcp dependency to the latest published mcp version)
 *   8. Build (pnpm nx run <project>:build)
 *   9. (tucu-ui only) sync dist/ui/tucu-ui/package.json and verify build artifacts
 *  10. Commit and tag the release (unless --skip-git)
 *  11. (--local-publish only) publish to npm, and for mcp, deploy to fly.io
 *
 * Steps (publish subcommand — publishes the current version as-is):
 *   1. Build (unless --skip-build)
 *   2. (tucu-ui only) sync dist package.json and verify build artifacts
 *   3. Publish to npm, and for mcp, deploy to fly.io
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ─── PACKAGE REGISTRY ──────────────────────────────────────

const PACKAGES = {
  'tucu-ui': {
    label: '[publish:tucu-ui]',
    pkgDir: resolve(ROOT, 'ui/tucu-ui'),
    // tucu-ui builds to dist/ and publishes from there; mcp publishes in place.
    publishDir: resolve(ROOT, 'dist/ui/tucu-ui'),
    tagPrefix: 'tucu-ui-v',
    buildTarget: 'tucu-ui:build',
    publishCmd: 'pnpm npm publish --access public --no-git-checks',
    requiredDistArtifacts: [
      'index.js',
      'index.mjs',
      'index.d.ts',
      'index.css',
      'package.json',
    ],
    changelogPath: resolve(ROOT, 'ui/tucu-ui/CHANGELOG.md'),
    readmePath: resolve(ROOT, 'README.md'),
    syncMcpDependency: true,
    deployToFly: false,
    emoji: '📦',
    color: '\x1b[32m', // green
  },
  mcp: {
    label: '[publish:mcp]',
    pkgDir: resolve(ROOT, 'tools/mcp-server'),
    publishDir: resolve(ROOT, 'tools/mcp-server'),
    tagPrefix: 'mcp-v',
    buildTarget: 'tucu-ui-mcp:build',
    publishCmd: 'npm publish --access public',
    requiredDistArtifacts: null,
    changelogPath: resolve(ROOT, 'tools/mcp-server/CHANGELOG.md'),
    readmePath: resolve(ROOT, 'tools/mcp-server/README.md'),
    syncMcpDependency: false,
    deployToFly: true,
    emoji: '🤖',
    color: '\x1b[35m', // magenta
  },
};

// ─── HELPERS ───────────────────────────────────────────────

function log(label, msg) {
  console.log(`\x1b[36m${label}\x1b[0m ${msg}`);
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

/** Aborts if any required build artifact is missing (tucu-ui only). */
function verifyDistArtifacts(pkg) {
  if (!pkg.requiredDistArtifacts) return;
  const missing = pkg.requiredDistArtifacts.filter(
    (f) => !existsSync(resolve(pkg.publishDir, f))
  );
  if (missing.length > 0) {
    error(
      `${pkg.publishDir} is missing required artifacts: ${missing.join(', ')}.\n` +
        `  Run "pnpm nx run ${pkg.buildTarget}" and retry.`
    );
  }
  success(
    `Dist artifacts verified (${pkg.requiredDistArtifacts.join(', ')}).`
  );
}

// ─── GIT CHANGELOG GENERATOR ───────────────────────────────

/** Most recent tag matching the given prefix, or null if none exists. */
function getLastTag(prefix) {
  const out = exec(`git tag -l "${prefix}*" --sort=-version:refname`, {
    silent: true,
    ignoreError: true,
  });
  return out ? out.trim().split('\n')[0] || null : null;
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

/** Parses conventional-commit subjects ("feat(scope): message") into CHANGELOG sections. */
function parseCommits(rawLog) {
  const sections = { Added: [], Changed: [], Fixed: [], Removed: [], Security: [] };
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
  if (!hasContent) lines.push('### Changed', '', '- Version bump', '');

  return lines.join('\n');
}

/** Prepends the new entry to the package's CHANGELOG.md, creating it if needed. */
function updateChangelog(pkg, version, sections) {
  const newEntry = buildChangelogEntry(version, sections);

  let existing = '';
  try {
    existing = readFileSync(pkg.changelogPath, 'utf-8');
  } catch {
    existing =
      '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n';
  }

  const firstSectionIdx = existing.indexOf('\n## ');
  if (firstSectionIdx !== -1) {
    writeFileSync(
      pkg.changelogPath,
      existing.slice(0, firstSectionIdx + 1) +
        newEntry +
        existing.slice(firstSectionIdx + 1)
    );
  } else {
    writeFileSync(pkg.changelogPath, existing.trimEnd() + '\n\n' + newEntry);
  }
  return pkg.changelogPath;
}

/** Updates version badges and versioned install snippets in the package's README. */
function updateReadme(pkg, packageName, oldVersion, newVersion) {
  let content;
  try {
    content = readFileSync(pkg.readmePath, 'utf-8');
  } catch {
    warn(`${pkg.readmePath} not found — skipping.`);
    return null;
  }

  const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedOld = oldVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  content = content.replace(
    new RegExp(`(${escapedName})@${escapedOld}`, 'g'),
    `$1@${newVersion}`
  );
  content = content.replace(
    /(\[!\[npm version\].*?\/npm\/v\/[^/\s)]+\/)[\d]+\.[\d]+\.[\d]+/g,
    `$1${newVersion}`
  );

  writeFileSync(pkg.readmePath, content);
  return pkg.readmePath;
}

// ─── GIT RELEASE ───────────────────────────────────────────

/** Aborts if the working tree has uncommitted changes. */
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

// ─── PUBLISH + DEPLOY (shared by --local-publish and the `publish` subcommand) ─

function publishToNpm(pkg, packageName, version, otp) {
  verifyDistArtifacts(pkg);
  const cmd = `${pkg.publishCmd}${otp ? ` --otp=${otp}` : ''}`;
  log(pkg.label, `Publishing ${packageName}@${version} to npm...`);
  exec(cmd, { cwd: pkg.publishDir });
  success(`Published ${packageName}@${version} to npm!`);
}

function deployToFly(pkg) {
  if (!pkg.deployToFly) return;
  log(pkg.label, 'Deploying to fly.io (tucu-ui-mcp)...');
  exec('flyctl deploy', { cwd: pkg.pkgDir });
  success('Deployed to fly.io: https://tucu-ui-mcp.fly.dev');
}

function printBanner(pkg, packageName, version, extraLines = []) {
  console.log(`
${pkg.color}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
  ${pkg.emoji}  ${packageName}@${version} published!
${extraLines.map((l) => `\n  ${l}`).join('')}
${pkg.color}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`);
}

// ─── MAIN ──────────────────────────────────────────────────

const args = process.argv.slice(2);
const target = args.find((a) => a in PACKAGES);
const pkg = target && PACKAGES[target];

if (!pkg) {
  error(
    'Missing or invalid target.\n' +
      'Usage: node scripts/publish.mjs <tucu-ui|mcp> <patch|minor|major> [flags]\n' +
      '       node scripts/publish.mjs <tucu-ui|mcp> publish [--skip-build] [flags]'
  );
}

const dryRun = args.includes('--dry-run');
const skipDocs = args.includes('--skip-docs');
const skipGit = args.includes('--skip-git');
const skipBuild = args.includes('--skip-build');
const localPublish = args.includes('--local-publish');
const publishOnly = args.includes('publish');
const bumpType = args.find((a) => ['major', 'minor', 'patch'].includes(a));
const otpArg = args.find((a) => a.startsWith('--otp='));
const otp = otpArg ? otpArg.split('=')[1] : null;

// ─── PUBLISH-ONLY MODE ─────────────────────────────────────
// Publishes the current version as-is: no bump, no docs, no git commit/tag.
// This mode always publishes directly (that is its entire purpose), so it
// ignores --local-publish.
if (publishOnly) {
  const pkgPath = resolve(pkg.pkgDir, 'package.json');
  const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const currentVersion = pkgJson.version;
  const packageName = pkgJson.name;

  log(pkg.label, `Package:  ${packageName}`);
  log(pkg.label, `Version:  ${currentVersion}  (no bump — publish only)`);

  if (!skipBuild) {
    log(pkg.label, 'Building...');
    exec(`pnpm nx run ${pkg.buildTarget}`);
    success('Build complete.');
  } else {
    warn('--skip-build: using existing build artifacts.');
  }

  // tucu-ui builds into dist/, whose package.json may still carry an older
  // version if the build step copied it before this run's edits.
  if (pkg === PACKAGES['tucu-ui']) {
    const distPkgPath = resolve(pkg.publishDir, 'package.json');
    try {
      const distPkg = JSON.parse(readFileSync(distPkgPath, 'utf-8'));
      if (distPkg.version !== currentVersion) {
        distPkg.version = currentVersion;
        writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + '\n');
        success(`Synced ${distPkgPath} → ${currentVersion}`);
      }
    } catch (e) {
      error(`Could not sync ${distPkgPath}: ${e.message}`);
    }
  }

  if (dryRun) {
    log(pkg.label, '--dry-run mode: showing planned changes without applying them.\n');
    console.log(`  Publish: cd ${pkg.publishDir} && ${pkg.publishCmd}`);
    if (pkg.deployToFly) console.log(`  Deploy:  flyctl deploy  (cwd: ${pkg.pkgDir})`);
    process.exit(0);
  }

  publishToNpm(pkg, packageName, currentVersion, otp);
  deployToFly(pkg);
  printBanner(pkg, packageName, currentVersion);
  process.exit(0);
}

if (!bumpType) {
  error(
    'Missing bump type.\n' +
      'Usage: node scripts/publish.mjs <tucu-ui|mcp> <patch|minor|major> [flags]\n' +
      '       node scripts/publish.mjs <tucu-ui|mcp> publish [--skip-build]'
  );
}

// 0. Guard: working tree must be clean before making any changes
if (!dryRun && !skipGit) checkCleanWorkingTree();

// 1. Read current version
const pkgPath = resolve(pkg.pkgDir, 'package.json');
const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const currentVersion = pkgJson.version;
const packageName = pkgJson.name;

log(pkg.label, `Package:         ${packageName}`);
log(pkg.label, `Current version: ${currentVersion}`);

// 2. Calculate next version
const nextVersion = bumpVersion(currentVersion, bumpType);
log(pkg.label, `Next version:    ${nextVersion} (${bumpType})`);

// 3. Check npm registry
log(pkg.label, `Checking npm registry for ${packageName}@${nextVersion}...`);
if (versionExistsOnNpm(packageName, nextVersion)) {
  error(`Version ${nextVersion} already exists on npm! Choose a different bump type.`);
}
success(`Version ${nextVersion} is available on npm.`);

// 4. Gather git commits for docs
const lastTag = getLastTag(pkg.tagPrefix);
const rawLog = getCommitsSinceTag(lastTag);
const sections = parseCommits(rawLog);
const commitCount = Object.values(sections).flat().length;
log(pkg.label, `Commits since ${lastTag ?? 'beginning'}: ${commitCount}`);

// Latest published mcp version, used both for --dry-run preview and the
// actual sync step below (tucu-ui only).
let latestMcpVersion = null;
if (pkg.syncMcpDependency) {
  const mcpDepName = '@e-burgos/tucu-ui-mcp';
  try {
    latestMcpVersion = execSync(`npm view ${mcpDepName} version 2>/dev/null`, {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: ROOT,
    }).trim();
  } catch {
    /* ignore */
  }
}

if (dryRun) {
  log(pkg.label, '--dry-run mode: showing planned changes without applying them.\n');
  console.log(`  Bump:    ${currentVersion} → ${nextVersion}`);
  if (pkg.syncMcpDependency) {
    const mcpDepName = '@e-burgos/tucu-ui-mcp';
    const currentMcpDep = pkgJson.dependencies?.[mcpDepName] ?? 'N/A';
    console.log(
      `  MCP dep: ${currentMcpDep} (latest on npm: ${latestMcpVersion ?? 'unknown'})`
    );
  }
  if (!skipDocs) {
    console.log('\n  CHANGELOG entry preview:\n');
    console.log(buildChangelogEntry(nextVersion, sections));
    console.log(`  README:  @${currentVersion} refs → @${nextVersion}`);
  }
  console.log(`\n  Build:   pnpm nx run ${pkg.buildTarget}`);
  console.log(`  Tag:     ${pkg.tagPrefix}${nextVersion}`);
  if (localPublish) {
    console.log(`  Publish: cd ${pkg.publishDir} && ${pkg.publishCmd}  (--local-publish)`);
    if (pkg.deployToFly) console.log(`  Deploy:  flyctl deploy  (cwd: ${pkg.pkgDir})`);
  } else {
    console.log(
      `  Publish: NOT run locally — push the tag to trigger CI publish\n`
    );
  }
  process.exit(0);
}

// 5. Update CHANGELOG.md
if (!skipDocs) {
  log(pkg.label, 'Updating CHANGELOG.md...');
  const changelogPath = updateChangelog(pkg, nextVersion, sections);
  success(`Updated ${changelogPath}`);

  // 6. Update README.md
  log(pkg.label, 'Updating README.md...');
  const readmePath = updateReadme(pkg, packageName, currentVersion, nextVersion);
  if (readmePath) success(`Updated ${readmePath}`);
} else {
  warn('--skip-docs: skipping CHANGELOG and README update.');
}

// 7. Update version in source package.json
pkgJson.version = nextVersion;

// 7b. (tucu-ui only) ensure @e-burgos/tucu-ui-mcp dependency points to latest published version
if (pkg.syncMcpDependency) {
  log(pkg.label, 'Checking @e-burgos/tucu-ui-mcp dependency...');
  const mcpDepName = '@e-burgos/tucu-ui-mcp';
  if (pkgJson.dependencies?.[mcpDepName] && latestMcpVersion) {
    const currentMcpDep = pkgJson.dependencies[mcpDepName];
    const expectedDep = `^${latestMcpVersion}`;
    if (currentMcpDep !== expectedDep) {
      pkgJson.dependencies[mcpDepName] = expectedDep;
      success(`Updated ${mcpDepName} dependency: ${currentMcpDep} → ${expectedDep}`);
    } else {
      success(`${mcpDepName} dependency already up to date (${currentMcpDep})`);
    }
  } else if (pkgJson.dependencies?.[mcpDepName]) {
    warn(`Could not fetch latest ${mcpDepName} version from npm — skipping sync.`);
  }
}

writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + '\n');
success(`Updated ${pkgPath} → ${nextVersion}`);

// 8. Build
log(pkg.label, 'Building...');
exec(`pnpm nx run ${pkg.buildTarget}`);
success('Build complete.');

// 9. (tucu-ui only) sync dist package.json and verify build artifacts
if (pkg === PACKAGES['tucu-ui']) {
  const distPkgPath = resolve(pkg.publishDir, 'package.json');
  try {
    const distPkg = JSON.parse(readFileSync(distPkgPath, 'utf-8'));
    distPkg.version = nextVersion;
    writeFileSync(distPkgPath, JSON.stringify(distPkg, null, 2) + '\n');
    success(`Updated ${distPkgPath} → ${nextVersion}`);
  } catch (e) {
    error(`Could not update ${distPkgPath}: ${e.message}`);
  }
}
verifyDistArtifacts(pkg);

// 10. Commit and tag the release (unless --skip-git)
const releaseTag = `${pkg.tagPrefix}${nextVersion}`;
if (!skipGit) {
  log(pkg.label, 'Creating release commit and git tag...');
  const relFromRoot = (p) => p.replace(`${ROOT}/`, '');
  const filesToCommit = [
    relFromRoot(pkgPath),
    ...(skipDocs ? [] : [relFromRoot(pkg.changelogPath), relFromRoot(pkg.readmePath)]),
  ];
  exec(`git add ${filesToCommit.map((f) => `"${f}"`).join(' ')}`);
  exec(`git commit -m "chore: release ${packageName}@${nextVersion}"`);
  exec(`git tag ${releaseTag}`);
  success(`Release commit created and tagged: ${releaseTag}`);
} else {
  warn('--skip-git: skipping commit and tag creation.');
  log(pkg.label, `Remember to commit and tag manually: git tag ${releaseTag}`);
}

// 11. --local-publish: publish directly instead of waiting for CI
if (localPublish) {
  publishToNpm(pkg, packageName, nextVersion, otp);
  deployToFly(pkg);
} else {
  log(
    pkg.label,
    `Not publishing locally. Push "${releaseTag}" to trigger the CI publish workflow:\n` +
      `  git push origin ${releaseTag}`
  );
}

printBanner(pkg, packageName, nextVersion, [
  `Bump type:  ${bumpType}`,
  `Previous:   ${currentVersion}`,
  `Published:  ${nextVersion}`,
  `Commits:    ${commitCount} processed into CHANGELOG`,
  ...(localPublish
    ? []
    : [`Next step:  git push origin ${releaseTag}  (triggers CI publish)`]),
]);
