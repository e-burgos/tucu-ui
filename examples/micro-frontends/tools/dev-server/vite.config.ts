import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isLocal = env.VITE_APP_ENVIRONMENT === 'local';

  // Ports for each app (from environment or defaults)
  const authenticationPort = parseInt(env.VITE_APP_AUTHENTICATION_PORT) || 4200;
  const landingPort = parseInt(env.VITE_APP_LANDING_PORT) || 4201;
  const userProfilePort = parseInt(env.VITE_APP_USER_PROFILE_PORT) || 4202;
  const dashboardPort = parseInt(env.VITE_APP_DASHBOARD_PORT) || 4203;

  // Main dev server port
  const devServerPort = parseInt(env.VITE_DEV_SERVER_PORT) || 3000;

  // API proxy configuration
  const apiBaseUrl = env.VITE_API_BASE_URL || '';
  console.log('[Unified Dev Server] API Base URL:', apiBaseUrl);
  const apiProxyConfig: Record<string, any> =
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
              console.log(`[Unified Dev Server Proxy] ${path} -> ${finalUrl}`);
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
                  `[Unified Dev Server Proxy Request] ${req.method} ${req.url} -> ${targetUrl}`,
                );
              });
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              proxy.on('error', (err: any, req: any, _res: any) => {
                console.error(
                  `[Unified Dev Server Proxy Error] ${req.url}:`,
                  err.message,
                );
              });
            },
          },
        }
      : {};

  // Optimized middleware - removed as Vite proxy handles routing directly

  return {
    root: join(__dirname),
    server: {
      port: devServerPort,
      host: 'localhost',
      hmr: {
        overlay: false,
        // Optimize HMR for faster updates
        protocol: 'ws',
        host: 'localhost',
        clientPort: devServerPort,
      },
      // Optimize for faster startup
      warmup: {
        clientFiles: ['./index.html'],
      },
      proxy: {
        // Proxy each app to its respective Vite dev server
        '/authentication': {
          target: `http://localhost:${authenticationPort}`,
          changeOrigin: true,
          rewrite: (path) => path,
          ws: true, // Enable WebSocket proxying
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              // Silently handle WebSocket connection errors during startup
              // These are expected when apps are still starting up
              const nodeError = err as { code?: string; message?: string };
              if (nodeError.code === 'ECONNREFUSED') {
                // Silently ignore connection refused errors during startup
                return;
              }
              // Only log other types of errors
              if (nodeError.message) {
                console.error('[Proxy] WebSocket error:', nodeError.message);
              }
            });
            // Suppress WebSocket upgrade errors during startup
            proxy.on('proxyReqWs', () => {
              // WebSocket upgrade request - errors are handled above
            });
          },
        },
        '/landing': {
          target: `http://localhost:${landingPort}`,
          changeOrigin: true,
          rewrite: (path) => path,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              const nodeError = err as { code?: string; message?: string };
              if (nodeError.code === 'ECONNREFUSED') {
                // Silently ignore connection refused errors during startup
                return;
              }
              if (nodeError.message) {
                console.error('[Proxy] WebSocket error:', nodeError.message);
              }
            });
          },
        },
        '/user-profile': {
          target: `http://localhost:${userProfilePort}`,
          changeOrigin: true,
          rewrite: (path) => path,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              const nodeError = err as { code?: string; message?: string };
              if (nodeError.code === 'ECONNREFUSED') {
                // Silently ignore connection refused errors during startup
                return;
              }
              if (nodeError.message) {
                console.error('[Proxy] WebSocket error:', nodeError.message);
              }
            });
          },
        },
        '/dashboard': {
          target: `http://localhost:${dashboardPort}`,
          changeOrigin: true,
          rewrite: (path) => path,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              const nodeError = err as { code?: string; message?: string };
              if (nodeError.code === 'ECONNREFUSED') {
                // Silently ignore connection refused errors during startup
                return;
              }
              if (nodeError.message) {
                console.error('[Proxy] WebSocket error:', nodeError.message);
              }
            });
          },
        },
        // API proxy
        ...apiProxyConfig,
      },
    },
    plugins: [react(), nxViteTsPaths()],
    // Optimize for development performance
    optimizeDeps: {
      // Pre-bundle dependencies for faster startup
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
      ],
      // Force optimization
      force: false, // Only force on first run
    },
    build: {
      // This server is only for development, no build needed
      outDir: 'dist-dev-server',
    },
  };
});
