/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { sitemapPlugin } from './vite.config.sitemap';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const port = parseInt(env.VITE_APP_PORT) || 4200;
  const googleAnalyticsTagId = env.VITE_GOOGLE_ANALYTICS_TAG_ID || '';

  return {
    plugins: [
      react(),
      sitemapPlugin(),
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
          gtag('config', '${googleAnalyticsTagId}');
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
      },
    },
    server: {
      port,
      host: 'localhost',
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
      //       '@e-burgos/tucu-ui': ['@e-burgos/tucu-ui'],
      //     },
      //   },
      // },
    },
  };
});
