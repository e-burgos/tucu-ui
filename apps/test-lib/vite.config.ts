/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
//import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tucu-ui': path.resolve(__dirname, '../../ui/tucu-ui/src/index.ts'),
    },
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
          'tucu-ui': ['tucu-ui'],
        },
      },
    },
  },
});
