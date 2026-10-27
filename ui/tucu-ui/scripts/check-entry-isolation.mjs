import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(fileURLToPath(import.meta.url), '../..');
const distRoot = resolve(
  packageRoot,
  process.argv[2] ?? '../../dist/ui/tucu-ui'
);

const IMPORT_SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)(['"])([^'"]+)\1/g;

const specifiersOf = (code) =>
  [...code.matchAll(IMPORT_SPECIFIER)].map((match) => match[2]);

const isPackage = (specifier, name) =>
  specifier === name || specifier.startsWith(`${name}/`);

function reachableModules(entryFile) {
  const visited = new Set();
  const specifiersByFile = new Map();
  const pending = [entryFile];

  while (pending.length > 0) {
    const file = pending.pop();
    if (visited.has(file) || !existsSync(file)) continue;
    visited.add(file);

    const specifiers = specifiersOf(readFileSync(file, 'utf8'));
    specifiersByFile.set(file, specifiers);
    for (const specifier of specifiers) {
      if (specifier.startsWith('.')) {
        pending.push(resolve(dirname(file), specifier));
      }
    }
  }
  return specifiersByFile;
}

function findForbidden(entryFile, forbiddenPackages) {
  const offenders = [];
  for (const [file, specifiers] of reachableModules(entryFile)) {
    for (const specifier of specifiers) {
      if (forbiddenPackages.some((name) => isPackage(specifier, name))) {
        offenders.push(`${file.replace(`${distRoot}/`, '')} -> ${specifier}`);
      }
    }
  }
  return offenders;
}

const checks = [
  { entry: 'index.mjs', forbidden: ['next'] },
  { entry: 'index.js', forbidden: ['next'] },
  { entry: 'next/index.mjs', forbidden: ['react-router', 'react-router-dom'] },
];

const failures = [];
for (const { entry, forbidden } of checks) {
  const entryFile = join(distRoot, entry);
  if (!existsSync(entryFile)) {
    failures.push(`missing entry: ${entry}`);
    continue;
  }
  for (const offender of findForbidden(entryFile, forbidden)) {
    failures.push(`${entry} reaches forbidden ${forbidden[0]}: ${offender}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(
  'entry isolation ok: root entries never reach next; ./next never reaches react-router'
);
