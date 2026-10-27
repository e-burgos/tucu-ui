import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(__dirname, '../../..');
const entrySource = readFileSync(resolve(packageRoot, 'src/next/index.ts'), 'utf8');
const entryTypes = readFileSync(resolve(packageRoot, 'types/next-entry.d.ts'), 'utf8');

const exportedNames = (source: string) =>
  [...source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g)]
    .flatMap((match) => match[1].split(','))
    .map((name) => name.trim().split(/\s+as\s+/).pop() ?? '')
    .filter(Boolean);

describe('next entry type declarations', () => {
  it.each(exportedNames(entrySource))('declares %s', (name) => {
    expect(entryTypes).toMatch(
      new RegExp(`export\\s+(?:declare\\s+function|interface|type)\\s+${name}\\b`)
    );
  });
});
