/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { copyFileSync } from 'fs';
import tailwindcssPostcss from '@tailwindcss/postcss';

const copyReadmePlugin = () => {
  return {
    name: 'copy-readme',
    closeBundle: () => {
      const readmePath = path.join(__dirname, '../../README.md');
      const destPath = path.join(__dirname, '../../dist/ui/tucu-ui/README.md');
      copyFileSync(readmePath, destPath);
      console.log('README.md copied to distribution directory');
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
  ],
  css: {
    postcss: {
      plugins: [tailwindcssPostcss({})],
    },
  },
  resolve: {
    alias: {
      '@/lucide-react': path.resolve(__dirname, 'src/lucide-react'),
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
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
});
