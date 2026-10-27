/// <reference types='vitest' />
// .mts is load-bearing — see the note at the top of vite.config.mts.
// Second, ESM-only pass for the `./next` entry. It runs after the root pass
// (chained from vite.config.mts) and links to the modules that pass already
// emitted instead of re-bundling them, so both entries share one instance of
// the navigation context and the theme store.
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { copyFileSync, mkdirSync } from 'fs';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { preserveUseClient } from './scripts/preserve-use-client-plugin.mjs';
import { isExternalPackage } from './scripts/external-packages.mjs';

const srcRoot = path.join(__dirname, 'src');
const nextSrcRoot = path.join(srcRoot, 'next') + path.sep;

const linkToRootPassModules = (): Plugin => ({
  name: 'link-to-root-pass-modules',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (!importer || isExternalPackage(source)) return null;
    const resolved = await this.resolve(source, importer, {
      ...options,
      skipSelf: true,
    });
    if (!resolved || resolved.external) return null;
    const file = resolved.id.split('?')[0];
    if (!file.startsWith(srcRoot + path.sep) || file.startsWith(nextSrcRoot)) {
      return null;
    }
    const fromImporterDir = path.relative(path.dirname(importer), file);
    const emitted = fromImporterDir
      .split(path.sep)
      .join('/')
      .replace(/\.(ts|tsx)$/, '.mjs');
    return {
      id: emitted.startsWith('.') ? emitted : `./${emitted}`,
      external: true,
    };
  },
});

const copyEntryTypes = (): Plugin => ({
  name: 'copy-next-entry-types',
  closeBundle: () => {
    const destDir = path.join(__dirname, '../../dist/ui/tucu-ui/next');
    mkdirSync(destDir, { recursive: true });
    copyFileSync(
      path.join(__dirname, 'types/next-entry.d.ts'),
      path.join(destDir, 'index.d.ts')
    );
  },
});

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/ui/tucu-ui-next',
  plugins: [
    linkToRootPassModules(),
    react(),
    preserveUseClient(),
    nxViteTsPaths(),
    copyEntryTypes(),
  ],
  build: {
    outDir: '../../dist/ui/tucu-ui',
    emptyOutDir: false,
    reportCompressedSize: false,
    lib: {
      entry: 'src/next/index.ts',
      name: 'tucu-ui-next',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternalPackage,
      output: {
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: path.join(__dirname, 'src'),
        entryFileNames: '[name].mjs',
        interop: 'auto',
      },
    },
  },
});
