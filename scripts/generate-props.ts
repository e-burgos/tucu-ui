/// <reference types="node" />
/**
 * generate-props.ts
 *
 * Extracts component prop metadata from TypeScript source files
 * using react-docgen-typescript and outputs a typed JSON module.
 *
 * Usage: pnpm tsx scripts/generate-props.ts
 *
 * Output: ui/tucu-ui/src/demo/generated/props-metadata.ts
 */

import * as path from 'path';
import * as fs from 'fs';
import { withCompilerOptions } from 'react-docgen-typescript';
import * as ts from 'typescript';
import { fileURLToPath } from 'url';

// ─── Configuration ─────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.resolve(ROOT, 'ui/tucu-ui/src/components');
const OUTPUT_DIR = path.resolve(ROOT, 'ui/tucu-ui/src/demo/generated');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'props-metadata.ts');
const TSCONFIG_PATH = path.resolve(ROOT, 'ui/tucu-ui/tsconfig.lib.json');

// Components to skip (internal/utility components not meant for docs)
const SKIP_COMPONENTS = new Set(['TransitionComponent', 'StoryContainer']);

// Directories to skip entirely (re-exports from external libs)
const SKIP_DIRS = new Set([
  'icons', // Lucide re-exports (~1500 icons)
  'lucide-react', // Lucide re-exports
]);

// ─── Parser Setup ──────────────────────────────────────────────

const compilerOptions: ts.CompilerOptions = {
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  strict: true,
  baseUrl: ROOT,
  paths: {
    '@/lucide-react': ['./ui/tucu-ui/src/lucide-react/index.ts'],
    '@e-burgos/tucu-ui': ['./ui/tucu-ui/src'],
  },
};

const parser = withCompilerOptions(compilerOptions, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractValuesFromUnion: true,
  propFilter: (prop) => {
    // Filter out inherited HTML props that clutter the table
    if (prop.parent) {
      const fileName = prop.parent.fileName;
      if (fileName.includes('node_modules/@types/react')) return false;
      if (fileName.includes('node_modules/csstype')) return false;
    }
    // Filter out internal props
    if (prop.name.startsWith('__')) return false;
    return true;
  },
});

// ─── File Discovery ────────────────────────────────────────────

function findComponentFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip directories that contain re-exports from external libraries
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...findComponentFiles(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) &&
      !entry.name.endsWith('.stories.tsx') &&
      !entry.name.endsWith('.test.tsx') &&
      !entry.name.endsWith('.spec.tsx')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

// ─── Types ─────────────────────────────────────────────────────

interface PropInfo {
  name: string;
  type: string;
  defaultValue: string | null;
  required: boolean;
  description: string;
}

interface ComponentMeta {
  displayName: string;
  description: string;
  filePath: string;
  props: PropInfo[];
}

// ─── Extraction ────────────────────────────────────────────────

function extractProps(): Map<string, ComponentMeta> {
  const componentFiles = findComponentFiles(COMPONENTS_DIR);
  const metadata = new Map<string, ComponentMeta>();

  console.log(`\n📦 Scanning ${componentFiles.length} component files...\n`);

  for (const file of componentFiles) {
    try {
      const docs = parser.parse(file);

      for (const doc of docs) {
        if (SKIP_COMPONENTS.has(doc.displayName)) continue;
        if (metadata.has(doc.displayName)) continue;
        // Skip components that look like icon re-exports (e.g. "index.ArrowUp")
        if (doc.displayName.includes('.')) continue;
        // Skip lowercase displayNames shorter than 3 chars
        if (doc.displayName.length < 3) continue;
        // Skip lowercase displayNames — keep only PascalCase (avoids duplicates)
        if (doc.displayName[0] !== doc.displayName[0].toUpperCase()) continue;

        const props: PropInfo[] = Object.entries(doc.props).map(
          ([name, prop]) => ({
            name,
            type: resolveType(prop),
            defaultValue: prop.defaultValue?.value ?? null,
            required: prop.required,
            description: prop.description || '',
          })
        );

        if (props.length === 0) continue;

        const relativePath = path.relative(ROOT, file).replace(/\\/g, '/');

        metadata.set(doc.displayName, {
          displayName: doc.displayName,
          description: doc.description || '',
          filePath: relativePath,
          props: props.sort((a, b) => {
            // Required props first, then alphabetical
            if (a.required !== b.required) return a.required ? -1 : 1;
            return a.name.localeCompare(b.name);
          }),
        });
      }
    } catch (err) {
      // Silently skip files that can't be parsed
    }
  }

  return metadata;
}

// ─── Helpers ───────────────────────────────────────────────────

// ─── Helpers ───────────────────────────────────────────────────

function resolveType(prop: any): string {
  const typeName = prop.type?.name || 'unknown';
  const typeRaw = prop.type?.raw;
  const typeValue = prop.type?.value;

  // If it's an enum (union type), reconstruct from values
  if (typeName === 'enum' && Array.isArray(typeValue) && typeValue.length > 0) {
    const values = typeValue.map((v: any) => v.value || v).join(' | ');
    return cleanType(values);
  }

  // If we have raw type info, use it (more detailed)
  if (typeRaw && typeName === 'enum') {
    return cleanType(typeRaw);
  }

  return cleanType(typeName);
}

function cleanType(type: string): string {
  // Simplify complex React types
  return type
    .replace(
      /ReactElement<any, string \| JSXElementConstructor<any>>/g,
      'ReactElement'
    )
    .replace(/ReactNode \| undefined/g, 'ReactNode')
    .replace(
      /DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>/g,
      'InputHTMLAttributes'
    )
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ─── Output Generation ────────────────────────────────────────

function generateOutput(metadata: Map<string, ComponentMeta>): string {
  const sorted = [...metadata.entries()].sort(([a], [b]) => a.localeCompare(b));

  const lines: string[] = [
    '/**',
    ' * AUTO-GENERATED — Do not edit manually.',
    ` * Generated by: scripts/generate-props.ts`,
    ` * Last updated: ${new Date().toISOString()}`,
    ` * Components: ${sorted.length}`,
    ' */',
    '',
    '// ─── Types ─────────────────────────────────────────────────────',
    '',
    'export interface PropInfo {',
    '  name: string;',
    '  type: string;',
    '  defaultValue: string | null;',
    '  required: boolean;',
    '  description: string;',
    '}',
    '',
    'export interface ComponentMeta {',
    '  displayName: string;',
    '  description: string;',
    '  filePath: string;',
    '  props: PropInfo[];',
    '}',
    '',
    '// ─── Registry ──────────────────────────────────────────────────',
    '',
    'export const propsRegistry: Record<string, ComponentMeta> = {',
  ];

  for (const [name, meta] of sorted) {
    lines.push(`  '${escapeString(name)}': {`);
    lines.push(`    displayName: '${escapeString(meta.displayName)}',`);
    lines.push(`    description: '${escapeString(meta.description)}',`);
    lines.push(`    filePath: '${escapeString(meta.filePath)}',`);
    lines.push(`    props: [`);

    for (const prop of meta.props) {
      lines.push(`      {`);
      lines.push(`        name: '${escapeString(prop.name)}',`);
      lines.push(`        type: '${escapeString(prop.type)}',`);
      lines.push(
        `        defaultValue: ${
          prop.defaultValue !== null
            ? `'${escapeString(prop.defaultValue)}'`
            : 'null'
        },`
      );
      lines.push(`        required: ${prop.required},`);
      lines.push(`        description: '${escapeString(prop.description)}',`);
      lines.push(`      },`);
    }

    lines.push(`    ],`);
    lines.push(`  },`);
  }

  lines.push('};');
  lines.push('');
  lines.push(
    '// ─── Helpers ───────────────────────────────────────────────────'
  );
  lines.push('');
  lines.push(
    'export function getComponentProps(componentName: string): ComponentMeta | undefined {'
  );
  lines.push('  return propsRegistry[componentName];');
  lines.push('}');
  lines.push('');
  lines.push('export function getComponentNames(): string[] {');
  lines.push('  return Object.keys(propsRegistry);');
  lines.push('}');
  lines.push('');
  lines.push(
    'export function searchComponents(query: string): ComponentMeta[] {'
  );
  lines.push('  const lower = query.toLowerCase();');
  lines.push('  return Object.values(propsRegistry).filter((c) =>');
  lines.push('    c.displayName.toLowerCase().includes(lower)');
  lines.push('  );');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

// ─── Main ──────────────────────────────────────────────────────

function main() {
  console.log('🔍 Generating prop metadata for tucu-ui components...');

  const metadata = extractProps();

  console.log(`✅ Found ${metadata.size} components with props:`);
  for (const [name, meta] of [...metadata.entries()].sort()) {
    console.log(`   ${name} (${meta.props.length} props)`);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write output
  const output = generateOutput(metadata);
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`\n📄 Output written to: ${path.relative(ROOT, OUTPUT_FILE)}`);
  console.log(`   Size: ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`);
}

main();
