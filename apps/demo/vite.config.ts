/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //     (!) Some chunks are larger than 500 kB after minification. Consider:
  // - Using dynamic import() to code-split the application
  // - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
  // - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
  build: {
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 10000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: true,
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       'tucu-ui': ['tucu-ui'],
    //     },
    //   },
    // },
  },
});
