import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { modulesWithDirective } from './use-client-candidates.mjs';

const packageRoot = resolve(fileURLToPath(import.meta.url), '../..');
const distRoot = resolve(
  packageRoot,
  process.argv[2] ?? '../../dist/ui/tucu-ui'
);

const startsWithDirective = (code) => /^\s*(['"])use client\1/.test(code);

const failures = [];
let checked = 0;

for (const { relativePath } of modulesWithDirective()) {
  const emitted = join(distRoot, relativePath.replace(/\.(ts|tsx)$/, '.mjs'));
  if (!existsSync(emitted)) continue;
  checked += 1;
  if (!startsWithDirective(readFileSync(emitted, 'utf8'))) {
    failures.push(`directive lost: ${relativePath}`);
  }
}

if (checked === 0)
  failures.push('no emitted ESM module with a directive was found');

const cjsBundle = join(distRoot, 'index.js');
if (!existsSync(cjsBundle)) {
  failures.push(`missing CJS bundle: ${cjsBundle}`);
} else if (startsWithDirective(readFileSync(cjsBundle, 'utf8'))) {
  failures.push('CJS bundle must not start with a "use client" directive');
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(
  `use client preserved in ${
    modulesWithDirective().length
  } ESM modules; CJS bundle clean`
);
