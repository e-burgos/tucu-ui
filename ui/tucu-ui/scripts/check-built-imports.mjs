import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(fileURLToPath(import.meta.url), '../..');
const distRoot = resolve(
  packageRoot,
  process.argv[2] ?? '../../dist/ui/tucu-ui'
);

const IMPORT_SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)(['"])([^'"]+)\1/g;

const isCssSpecifier = (specifier) =>
  /\.css(?:[?#].*)?$/.test(specifier) || /^[^./][^'"]*\/css(?:\/|$)/.test(specifier);

const isInlinedDependency = (specifier) =>
  specifier.startsWith('.') && specifier.includes('node_modules/');

const describeOffence = (specifier) =>
  isCssSpecifier(specifier)
    ? 'stylesheet import'
    : isInlinedDependency(specifier)
    ? 'inlined dependency (add it to package.json dependencies)'
    : null;

function* scriptFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* scriptFiles(full);
    else if (/\.(mjs|js|cjs)$/.test(entry.name)) yield full;
  }
}

if (!existsSync(distRoot)) {
  console.error(`missing dist: ${distRoot}`);
  process.exit(1);
}

const offenders = [];
let checked = 0;
for (const file of scriptFiles(distRoot)) {
  checked += 1;
  const code = readFileSync(file, 'utf8');
  for (const match of code.matchAll(IMPORT_SPECIFIER)) {
    const offence = describeOffence(match[2]);
    if (offence) {
      offenders.push(`${relative(distRoot, file)} -> ${match[2]} (${offence})`);
    }
  }
}

if (offenders.length > 0) {
  for (const offender of offenders) console.error(offender);
  process.exit(1);
}

console.log(
  `built imports ok: ${checked} built JS files import no stylesheet and inline no dependency`
);
