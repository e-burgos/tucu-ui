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
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        'react-router-dom',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact',
          'react-router-dom': 'ReactRouter',
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name && /Section/.test(chunkInfo.name)) {
            return 'documentation/[name]-[hash].js';
          }
          return '[name]-[hash].js';
        },
      },
    },
  },
});
