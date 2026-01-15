import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/api',
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({ entryRoot: 'src', tsconfigPath: './tsconfig.json' }),
  ],
  // NOTE: Build target disabled - libraries are not built, only apps are built
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, 'src/index.ts'),
  //     name: 'api',
  //     fileName: 'index',
  //     formats: ['es', 'cjs'],
  //   },
  //   outDir: '../../dist/libs/api',
  //   reportCompressedSize: true,
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom'],
  //   },
  // },
});
