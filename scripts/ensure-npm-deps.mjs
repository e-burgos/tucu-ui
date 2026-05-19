/**
 * ensure-npm-deps.mjs
 *
 * Safety script for CI/CD (Netlify, etc.).
 * If apps/demo/package.json has a "file:" reference for @e-burgos/tucu-ui
 * (from local testing), this script fetches the latest published version
 * from npm and restores it.
 *
 * Run: node scripts/ensure-npm-deps.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DEMO_PKG_PATH = resolve(ROOT, 'apps/demo/package.json');

const PKG_NAME = '@e-burgos/tucu-ui';

function getLatestVersion() {
  try {
    const version = execSync(`npm view ${PKG_NAME} version`, {
      encoding: 'utf-8',
    }).trim();
    return `^${version}`;
  } catch {
    console.error(`❌ Could not fetch latest version of ${PKG_NAME} from npm.`);
    process.exit(1);
  }
}

try {
  const raw = readFileSync(DEMO_PKG_PATH, 'utf-8');
  const pkg = JSON.parse(raw);
  const current = pkg.dependencies?.[PKG_NAME];

  if (!current) {
    console.log(`✅ ${PKG_NAME} not found in demo dependencies — skipping.`);
    process.exit(0);
  }

  if (current.startsWith('file:')) {
    const latestVersion = getLatestVersion();
    console.log(`⚠️  Found local "file:" reference: ${current}`);
    console.log(`🔄 Restoring to latest npm version: ${latestVersion}`);

    pkg.dependencies[PKG_NAME] = latestVersion;
    writeFileSync(DEMO_PKG_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

    console.log(
      `✅ Restored ${PKG_NAME} to "${latestVersion}" in apps/demo/package.json`
    );
  } else {
    console.log(`✅ ${PKG_NAME} is already on npm version: ${current}`);
  }
} catch (err) {
  console.error(`❌ Error checking demo package.json:`, err.message);
  process.exit(1);
}
