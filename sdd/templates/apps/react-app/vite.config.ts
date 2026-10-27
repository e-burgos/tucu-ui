import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [tailwindcss(), react()],
  server: { port: 4200, host: 'localhost' },
  build: {
    outDir: resolve(__dirname, '../../dist/apps/example-app'),
    emptyOutDir: true,
  },
});
