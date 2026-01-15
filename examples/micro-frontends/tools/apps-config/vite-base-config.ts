/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';
import process from 'process';
import { PluginOption, UserConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { wrapRealpathSyncNative } from './functions';

export async function generateViteConfigBase({
  name,
  port,
  modulePath,
  env,
}: {
  name: string;
  port: number;
  modulePath: string;
  env: Record<string, string>;
}): Promise<UserConfig> {
  // Dynamic import to avoid race condition with ES modules
  const { default: tailwindcss } = await import('@tailwindcss/vite');
  const rootPath = modulePath.split('/apps')[0];
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(modulePath, 'package.json'), 'utf-8'),
  );
  const googleAnalyticsTagId = process.env.VITE_GOOGLE_ANALYTICS_TAG_ID;
  const isLocal = process.env.VITE_APP_ENVIRONMENT === 'local';
  const isProduction = process.env.VITE_APP_ENVIRONMENT === 'production';
  const defineEnvironment: Record<
    string,
    string | boolean | Record<string, string> | null | undefined
  > = {
    'import.meta.env.MODULE_APP_NAME': JSON.stringify(packageJson.name),
    'import.meta.env.MODULE_APP_VERSION': JSON.stringify(packageJson.version),
    'process.env': { ...env },
  };

  if (isLocal) {
    defineEnvironment['process.browser'] = true;
  }

  const plugins = [
    react(),
    tailwindcss(),
    nxViteTsPaths(),
    nodePolyfills({
      // Only polyfill globals, don't touch Node.js built-in modules
      // This prevents conflicts with Vite's internal Node.js module usage
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Don't polyfill Node.js built-in modules (fs, path, etc.)
      // Vite needs these internally and they shouldn't be polyfilled
      protocolImports: false,
    }),
    nxCopyAssetsPlugin(['*.md']),
    {
      name: 'html-transform',
      transformIndexHtml(html: string) {
        return html.replace('%BASE_URL%', `/${name}`);
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
        </script>`,
            );
          },
        }
      : {
          name: 'google-analytics',
          transformIndexHtml(html: string) {
            return html.replace('%GOOGLE_ANALYTICS_CONFIG%', '');
          },
        },
  ];

  // Configure proxy for API requests in local development to avoid CORS issues
  const apiBaseUrl = env.VITE_API_BASE_URL || '';
  console.log('[Vite Proxy Config] API Base URL:', apiBaseUrl);
  const proxyConfig =
    isLocal && apiBaseUrl
      ? {
          '/api': {
            // Use the full API base URL as target
            // e.g., https://api.example.com/dev/api
            // The path /api/auth/phone-register will be rewritten to /auth/phone-register
            // Final URL: https://api.example.com/dev/api/auth/phone-register
            target: apiBaseUrl,
            changeOrigin: true,
            secure: true,
            rewrite: (path: string) => {
              // Remove /api prefix from path since target already includes it
              // e.g., /api/auth/phone-register -> /auth/phone-register
              const rewrittenPath = path.replace(/^\/api/, '');
              const finalUrl = `${apiBaseUrl}${rewrittenPath}`;
              console.log(`[Vite Proxy] ${path} -> ${finalUrl}`);
              return rewrittenPath;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            configure: (proxy: any, _options: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              proxy.on('proxyReq', (_proxyReq: any, req: any, _res: any) => {
                const targetUrl = `${apiBaseUrl}${
                  req.url?.replace(/^\/api/, '') || ''
                }`;
                console.log(
                  `[Vite Proxy Request] ${req.method} ${req.url} -> ${targetUrl}`,
                );
              });
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              proxy.on('error', (err: any, req: any, _res: any) => {
                console.error(`[Vite Proxy Error] ${req.url}:`, err.message);
              });
            },
          },
        }
      : undefined;

  return {
    base: `/${name}`,
    root: modulePath,
    define: defineEnvironment,
    cacheDir: `../../node_modules/.vite/apps/${name}`,
    server: {
      port,
      host: 'localhost',
      proxy: proxyConfig,
      // Optimize HMR for faster updates
      hmr: {
        overlay: true, // Show errors in overlay for better UX
        protocol: 'ws',
        host: 'localhost',
        clientPort: port,
      },
      fs: {
        strict: false,
        allow: [
          wrapRealpathSyncNative(rootPath),
          wrapRealpathSyncNative(searchForWorkspaceRoot(process.cwd())),
        ],
      },
      // Optimize for faster startup
      warmup: {
        clientFiles: ['./index.html'],
      },
    },
    preview: {
      port,
      host: 'localhost',
    },
    plugins: plugins.filter(Boolean) as PluginOption[],
    optimizeDeps: {
      // Optimize esbuild for faster processing
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        // Optimize for development
        target: 'esnext',
      },
      // Pre-bundle dependencies for faster startup
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'zustand',
        'tailwindcss',
        '@tanstack/react-query',
        'vite-plugin-node-polyfills/shims/buffer',
        'vite-plugin-node-polyfills/shims/global',
        'vite-plugin-node-polyfills/shims/process',
      ],
      // Exclude large dependencies that don't need pre-bundling
      exclude: [],
      // Force optimization only on first run
      force: false,
    },
    build: {
      sourcemap: true,
      outDir: `../../dist/apps/${name}`,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 10000,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      minify: isProduction,
      terserOptions: {
        compress: {
          passes: 1, // Reduce compression passes
        },
        mangle: true,
      },
      rollupOptions: {
        maxParallelFileOps: 2,
        input: {
          main: path.resolve(modulePath, 'index.html'),
        },
        output: {
          compact: true,
          manualChunks(filepath: string) {
            if (filepath.includes('lodash')) return 'lodash';
            if (
              filepath.includes(`${rootPath}/libs/`) ||
              filepath.includes(`${rootPath}/apps/`)
            )
              return 'main';
            if (filepath.includes('node_modules')) return 'vendor';
            return 'polyfill';
          },
        },
      },
    },
    // Vitest config must be under 'test' in Vite config, but 'test' is not formally typed in UserConfig.
    // @ts-expect-error: 'test' is a Vitest-only config key, not in Vite's UserConfig type
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      passWithNoTests: true,
      coverage: {
        reportsDirectory: `../../coverage/apps/${name}`,
        provider: 'v8',
        reporter: ['text', 'text-summary', 'html'],
        all: false,
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      },
    },
  };
}
