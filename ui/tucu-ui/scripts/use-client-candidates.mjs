import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const packageRoot = resolve(fileURLToPath(import.meta.url), '../..');
export const sourceRoot = join(packageRoot, 'src');

const DIRECTIVE = /^\s*(['"])use client\1;?/;

const CLIENT_LIBRARIES = [
  'framer-motion',
  'swiper',
  'recharts',
  'react-hook-form',
  '@tanstack/react-table',
  '@dnd-kit/',
  'zustand',
];

const CLIENT_SIGNALS = [
  /\buse[A-Z][A-Za-z0-9]*\s*[(<]/,
  /\bcreateContext\s*[(<]/,
  /\bcreatePortal\s*\(/,
  /\bon[A-Z][A-Za-z]*=\{/,
  /\bextends\s+(React\.)?(Pure)?Component\b/,
];

const EXCLUDED_DIRECTORIES = new Set([
  '__tests__',
  'generated',
  'node_modules',
]);

const isSourceModule = (file) =>
  /\.(ts|tsx)$/.test(file) &&
  !file.endsWith('.d.ts') &&
  !/\.(test|spec|stories)\.(ts|tsx)$/.test(file);

const isBarrel = (file) => /(^|[\\/])index\.(ts|tsx)$/.test(file);

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) {
      if (!EXCLUDED_DIRECTORIES.has(entry)) files.push(...walk(full));
    } else if (isSourceModule(full)) {
      files.push(full);
    }
  }
  return files;
}

const stripComments = (code) =>
  code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1');

const importsClientLibrary = (code) =>
  [...code.matchAll(/from\s+['"]([^'"]+)['"]/g)].some(([, specifier]) =>
    CLIENT_LIBRARIES.some(
      (library) => specifier === library || specifier.startsWith(`${library}/`)
    )
  );

export const hasDirective = (code) => DIRECTIVE.test(code);

export function needsDirective(code) {
  const body = stripComments(code);
  return (
    importsClientLibrary(body) ||
    CLIENT_SIGNALS.some((signal) => signal.test(body))
  );
}

export function listModules() {
  return walk(sourceRoot).map((file) => ({
    file,
    relativePath: relative(sourceRoot, file),
    code: readFileSync(file, 'utf8'),
  }));
}

export function listCandidates() {
  return listModules().filter(
    ({ file, code }) => !isBarrel(file) && needsDirective(code)
  );
}

export function modulesWithDirective() {
  return listModules().filter(({ code }) => hasDirective(code));
}

function applyDirectives() {
  let changed = 0;
  for (const { file, code } of listCandidates()) {
    if (hasDirective(code)) continue;
    writeFileSync(file, `'use client';\n\n${code}`);
    changed += 1;
  }
  return changed;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--write')) {
    console.log(`marked ${applyDirectives()} modules`);
  } else {
    const pending = listCandidates().filter(({ code }) => !hasDirective(code));
    for (const { relativePath } of pending) console.log(relativePath);
    console.log(`${pending.length} modules missing 'use client'`);
    if (process.argv.includes('--check') && pending.length > 0) process.exit(1);
  }
}
