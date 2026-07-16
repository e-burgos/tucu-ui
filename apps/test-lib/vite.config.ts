/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@tucu-ui',
        replacement: path.resolve(__dirname, '../../ui/tucu-ui/src/index.ts'),
      },
      {
        find: '@e-burgos/tucu-ui',
        replacement: path.resolve(__dirname, '../../ui/tucu-ui/src/index.ts'),
      },
      {
        find: '@tucu-docs',
        replacement: path.resolve(__dirname, '../../ui/tucu-docs/src/index.ts'),
      },
      {
        // tucu-docs pages reach into tucu-ui internals not part of its
        // public API (raw source snippets via ?raw, docs-kit helpers).
        find: /^@tucu-ui-internal\/(.*)$/,
        replacement: path.resolve(__dirname, '../../ui/tucu-ui/src') + '/$1',
      },
    ],
  },
  build: {
    sourcemap: true,
    outDir: `../../dist/apps/test-lib`,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 10000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'tucu-ui': ['@tucu-ui'],
          'tucu-docs': ['@tucu-docs'],
        },
      },
    },
  },
});
