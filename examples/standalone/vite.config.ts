import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const port = parseInt(env.VITE_APP_PORT) || 4200;
  const isProduction = env.VITE_APP_ENVIRONMENT === 'production';
  const googleAnalyticsTagId = env.VITE_GOOGLE_ANALYTICS_TAG_ID || '';

  return {
    base: '/',
    root: __dirname,
    define: {
      'import.meta.env.MODULE_APP_NAME': JSON.stringify('@e-burgos/standalone'),
      'import.meta.env.MODULE_APP_VERSION': JSON.stringify('0.0.0'),
      'process.env': { ...env },
    },
    plugins: [
      react(),
      tailwindcss(),
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: false,
      }),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace('%BASE_URL%', '/');
        },
      },
      googleAnalyticsTagId
        ? {
            name: 'google-analytics',
            transformIndexHtml(html: string) {
              return html.replace(
                '%GOOGLE_ANALYTICS_CONFIG%',
                `<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTagId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.VITE_GOOGLE_ANALYTICS_TAG_ID}');
        </script>`
              );
            },
          }
        : {
            name: 'google-analytics',
            transformIndexHtml(html: string) {
              return html.replace('%GOOGLE_ANALYTICS_CONFIG%', '');
            },
          },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@e-burgos/tucu-ui': path.resolve(
          __dirname,
          '../../ui/tucu-ui/src/index.ts'
        ),
        '@e-burgos/tucu-ui/styles': path.resolve(
          __dirname,
          '../../ui/tucu-ui/src/styles.css'
        ),
      },
    },
    server: {
      port,
      host: 'localhost',
      hmr: {
        overlay: true,
        protocol: 'ws',
        host: 'localhost',
        clientPort: port,
      },
      fs: {
        strict: false,
      },
    },
    preview: {
      port,
      host: 'localhost',
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        target: 'esnext',
      },
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'zustand',
        'tailwindcss',
        '@tanstack/react-query',
      ],
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 10000,
      minify: isProduction,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks(filepath: string) {
            if (filepath.includes('node_modules')) {
              if (
                filepath.includes('react') ||
                filepath.includes('react-dom')
              ) {
                return 'react-vendor';
              }
              if (filepath.includes('react-router')) {
                return 'router-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
