/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'lucide-react': path.resolve(
        __dirname,
        'src/__tests__/__mocks__/lucide-react.ts'
      ),
      '@e-burgos/tucu-ui': path.resolve(__dirname, 'src'),
      '@/lucide-react': path.resolve(
        __dirname,
        'src/__tests__/__mocks__/lucide-react.ts'
      ),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
    css: false,
    reporters: ['default'],
    passWithNoTests: true,
  },
});
