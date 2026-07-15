/// <reference types='vitest' />
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { copyFileSync, mkdirSync } from 'fs';
import tailwindcss from '@tailwindcss/vite';

const copyReadmePlugin = () => {
  return {
    name: 'copy-readme',
    closeBundle: () => {
      const readmePath = path.join(__dirname, '../../README.md');
      const destDir = path.join(__dirname, '../../dist/ui/tucu-ui');
      mkdirSync(destDir, { recursive: true });
      copyFileSync(readmePath, path.join(destDir, 'README.md'));
      console.log('README.md copied to distribution directory');
    },
  };
};

const copyChangelogPlugin = () => {
  return {
    name: 'copy-changelog',
    closeBundle: () => {
      const changelogPath = path.join(__dirname, 'CHANGELOG.md');
      const destDir = path.join(__dirname, '../../dist/ui/tucu-ui');
      mkdirSync(destDir, { recursive: true });
      copyFileSync(changelogPath, path.join(destDir, 'CHANGELOG.md'));
      console.log('CHANGELOG.md copied to distribution directory');
    },
  };
};

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/ui/tucu-ui',
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.dts.json'),
      rollupTypes: true,
      // tsconfig.dts.json's paths exist only so api-extractor can resolve
      // bare specifiers from dist/; they must not be rewritten to relative
      // node_modules paths in the emitted declarations.
      pathsToAliases: false,
    }),
    copyReadmePlugin(),
    copyChangelogPlugin(),
    tailwindcss() as PluginOption,
  ],
  resolve: {
    alias: {
      '@/lucide-react': path.resolve(__dirname, 'src/lucide-react'),
      '@/react-router-dom': path.resolve(__dirname, 'src/react-router-dom'),
    },
  },
  build: {
    outDir: '../../dist/ui/tucu-ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'tucu-ui',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Every real runtime dependency is externalized (not bundled): with
      // preserveModules below, an inlined third-party package would keep
      // its dist/out-of-tree node_modules path in the output, which npm
      // silently strips from the published tarball (nested node_modules
      // are never packed), breaking the import for consumers.
      external: (id) => {
        const externalPackages = [
          'react',
          'react-dom',
          'lucide-react',
          'react-router-dom',
          '@dnd-kit/core',
          '@dnd-kit/modifiers',
          '@dnd-kit/sortable',
          '@dnd-kit/utilities',
          '@tanstack/react-table',
          'classnames',
          'framer-motion',
          'lodash-es',
          'react-hook-form',
          'recharts',
          'swiper',
          'zustand',
          'prismjs',
        ];
        return externalPackages.some(
          (pkg) => id === pkg || id.startsWith(`${pkg}/`)
        );
      },
      output: [
        {
          // Per-module ESM output lets consumer bundlers drop unused
          // components (DataTable, charts, carousel, etc.) instead of
          // pulling in the single monolithic chunk a bundled build would
          // produce, where importing one component drags in every
          // dependency the whole library uses.
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          // Source compiles with TypeScript's esModuleInterop (Babel-style:
          // check the external module's `__esModule` flag). Rollup's own
          // default interop instead checks for a `.default` property, which
          // disagrees with how a consumer's bundler (esbuild/Vite) re-derives
          // an external CJS module's namespace shape. 'auto' matches the
          // interop the source was compiled against.
          interop: 'auto',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            'lucide-react': 'LucideReact',
            'react-router-dom': 'ReactRouter',
          },
        },
        {
          // CJS consumers don't tree-shake regardless, so this stays a
          // single bundle for require() compatibility.
          format: 'cjs',
          entryFileNames: 'index.js',
          interop: 'auto',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            'lucide-react': 'LucideReact',
            'react-router-dom': 'ReactRouter',
          },
        },
      ],
    },
  },
});
