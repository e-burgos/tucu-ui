# Skill: Tucu-UI Micro Frontend Architecture

Complete guide to implementing a **Micro Frontend (MFE) architecture** using `@e-burgos/tucu-ui` as the shared design system. Covers project structure, shell orchestrator, inter-app navigation, shared authentication, theming consistency, Vite configuration, and deployment patterns.

> **Companion Skills**: See `tucu-ui` for overview, `tucu-ui-routing` for MFE routing props, `tucu-ui-design-system` for theming.
> **Live MFE Docs**: [e-burgos.github.io/tucu-ui-mfe/landing/integration-guide](https://e-burgos.github.io/tucu-ui-mfe/landing/integration-guide) > **Live Library Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## Reference Implementation

This skill documents the MFE architecture patterns that `@e-burgos/tucu-ui` enables. A **reference implementation** exists at `examples/micro-frontends/` in the tucu-ui repository, which uses four demo apps (authentication, landing, dashboard, user-profile) to illustrate the concepts.

**The demo apps are illustrative — not prescriptive.** Your project can have any number and type of apps (e-commerce, analytics, admin, CMS, etc.). The patterns described here (shell orchestrator, shared auth, dual navigation, proxy server, Vite factory) are **generic and apply to any MFE ecosystem** built with `@e-burgos/tucu-ui`.

---

## 1. Architecture Overview

This architecture implements **path-based Micro Frontends** — each MFE is an independent React application deployed under its own URL path. A unified dev server (Vite reverse proxy) routes requests to the correct app. All apps share the same design system (`@e-burgos/tucu-ui`) and a set of internal shared libraries.

> **This architecture does NOT use Module Federation.** Instead, it uses a lightweight reverse-proxy approach for development and path-based deployment for production.

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│            Unified Dev Server (Port 3000 — Proxy)            │
│                                                              │
│  /app-a → :4200  |  /app-b → :4201  |  /app-c → :4202      │
│  /api → Backend API (reverse proxy, removes CORS)           │
└──────────────────────────────────────────────────────────────┘
       │              │              │
       ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐    ...N apps
  │  App A   │  │  App B   │  │  App C   │
  │  :4200   │  │  :4201   │  │  :4202   │
  └──────────┘  └──────────┘  └──────────┘
       │              │              │
       └──────────────┴──────────────┘
                      │
       ┌──────────────┴──────────────┐
       │       Shared Libraries       │
       │  shell · api · auth · utils  │
       └──────────────┬──────────────┘
                      │
             ┌────────┴────────┐
             │   @e-burgos/    │
             │    tucu-ui      │
             └─────────────────┘
```

### Key Principles

| Principle                | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| **Independent Deploy**   | Each MFE builds and deploys separately under its own path                 |
| **Shared Design**        | All apps import `@e-burgos/tucu-ui` for consistent UI                     |
| **Shared State**         | Auth and user preferences persist via `localStorage` (Zustand persist)    |
| **Path-Based Routing**   | Each app owns a URL path prefix (`/orders`, `/admin`, etc.)               |
| **Proxy Dev Server**     | A single entry point (port 3000) proxies requests to individual app ports |
| **No Module Federation** | Simpler setup, no runtime module sharing — libraries are bundled per app  |
| **Any Number of Apps**   | Add or remove MFEs independently without affecting others                 |

---

## 2. Project Structure

### Recommended Monorepo Layout

```
my-mfe-project/
├── nx.json                       # Nx configuration
├── package.json                  # Root dependencies & scripts
├── pnpm-workspace.yaml           # Workspace packages
├── tsconfig.base.json            # Shared TypeScript paths
├── .env.local                    # Environment variables
├── apps/
│   ├── <app-a>/                  # Your first MFE app
│   ├── <app-b>/                  # Your second MFE app
│   ├── <app-c>/                  # Your third MFE app
│   └── ...                       # As many apps as you need
├── libs/
│   ├── shell/                    # MFE orchestrator (ShellWrapper)
│   ├── api/                      # Shared API client (React Query)
│   ├── auth-security/            # Shared auth state (Zustand)
│   ├── utils/                    # Constants, helpers, navigation
│   └── ...                       # Any additional shared libraries
└── tools/
    ├── apps-config/              # Shared Vite configuration factory
    └── dev-server/               # Unified proxy dev server
```

> **Example**: The reference implementation uses `apps/authentication`, `apps/landing`, `apps/dashboard`, and `apps/user-profile` as demo apps to showcase auth flows, public pages, protected dashboards, and user settings, respectively.

### Workspace Configuration

**pnpm-workspace.yaml**:

```yaml
packages:
  - 'apps/*'
  - 'libs/*'
  - 'tools/*'
```

### TypeScript Path Mappings

In `tsconfig.base.json`, define aliases for all shared libraries:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@my-project/shell": ["libs/shell/src/index.ts"],
      "@my-project/utils": ["libs/utils/src/index.ts"],
      "@my-project/auth-security": ["libs/auth-security/src/index.ts"],
      "@my-project/api": ["libs/api/src/index.ts"]
    }
  }
}
```

> **Note**: `@e-burgos/tucu-ui` is installed from npm — it does NOT need a path mapping.

---

## 3. Shell Library — The MFE Orchestrator

The shell library is the **core of the MFE architecture**. It wraps each app with shared providers, navigation, and styling. Every MFE imports the shell wrapper instead of configuring `ThemeProvider` directly.

### ShellWrapper Component

```tsx
// libs/shell/src/components/shell-wrapper.tsx
import { ThemeProvider, MfeThemeProviderProps } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';
import { QueryProvider } from '@my-project/api';
import { useMainNavigation } from '../hooks/use-main-navigation';

export interface ShellWrapperProps extends Omit<MfeThemeProviderProps, 'architecturalPatterns' | 'menuItems'> {
  queryClient?: QueryClient;
  menuItems?: IMenuItem[];
}

export function ShellWrapper({ queryClient, menuItems, rightButton, ...themeProps }: ShellWrapperProps) {
  const defaultMenuItems = useMainNavigation();

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        architecturalPatterns="mfe"
        menuItems={menuItems ?? defaultMenuItems}
        rightButton={
          <>
            <NavOptions />
            {rightButton}
          </>
        }
        {...themeProps}
      />
    </QueryProvider>
  );
}
```

**What this wrapper provides:**

1. **React Query provider** — shared singleton `QueryClient`
2. **ThemeProvider in MFE mode** — always passes `architecturalPatterns="mfe"`
3. **Default navigation** — uses `useMainNavigation()` if no custom menu items are provided
4. **Shared right button** — composed with `NavOptions` (dark mode, settings, profile, logout)
5. **CSS import** — `@e-burgos/tucu-ui/styles` for global design tokens

### NavOptions Component

Provides a consistent header menu across all MFEs. Customize the options to match your project's needs:

```tsx
// libs/shell/src/components/nav-options.tsx
import { SwitchMode, ListContainer, Button, LucideIcons, useTheme } from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from '@my-project/auth-security';
import { navigateBetweenApps, APP_URLS } from '@my-project/utils';

export function NavOptions() {
  const { setIsSettingsOpen } = useTheme();
  const { isAuthenticated, logout } = useAuthGlobalStore();

  const options = [
    { label: 'Dark Mode', action: null, component: <SwitchMode /> },
    { label: 'Settings', action: () => setIsSettingsOpen(true), icon: <LucideIcons.Settings /> },
    // Navigate to whichever app handles user profiles in your ecosystem
    { label: 'Profile', action: () => navigateBetweenApps(APP_URLS.PROFILE), icon: <LucideIcons.User /> },
    isAuthenticated
      ? {
          label: 'Logout',
          action: () => {
            logout();
            navigateBetweenApps(APP_URLS.AUTH);
          },
          icon: <LucideIcons.LogOut />,
        }
      : { label: 'Login', action: () => navigateBetweenApps(APP_URLS.AUTH), icon: <LucideIcons.LogIn /> },
  ];

  return (
    <ListContainer title="Options">
      {options.map((opt) => (
        <Button key={opt.label} variant="ghost" onClick={opt.action}>
          {opt.icon} {opt.label} {opt.component}
        </Button>
      ))}
    </ListContainer>
  );
}
```

### Shell Exports

```tsx
// libs/shell/src/index.ts
export { ShellWrapper } from './components/shell-wrapper';
export type { ShellWrapperProps } from './components/shell-wrapper';
export { NavOptions } from './components/nav-options';
export { useMainNavigation } from './hooks/use-main-navigation';
export { usePublicErrorRoutesConfig } from './hooks/use-public-error-routes-config';
```

---

## 4. Navigation Between MFEs

### Dual Navigation Mechanism

Navigation uses two mechanisms depending on context:

| Scenario            | Mechanism          | Implementation                                     |
| ------------------- | ------------------ | -------------------------------------------------- |
| **Within same app** | React Router (SPA) | `href: undefined` → client-side routing            |
| **Between apps**    | Full page reload   | `href: APP_URLS.XXX` → `window.open(url, '_self')` |

### navigateBetweenApps Utility

```tsx
// libs/utils/src/functions.ts
export const navigateBetweenApps = (url: string, target: '_self' | '_blank' = '_self') => {
  window.open(url, target);
};
```

### useMainNavigation Hook

This hook generates menu items for the entire MFE ecosystem. It automatically detects the current app and uses React Router for internal links or full reloads for cross-app navigation. **Adapt the items to reflect your actual apps.**

```tsx
// libs/shell/src/hooks/use-main-navigation.tsx
import { IMenuItem, LucideIcons } from '@e-burgos/tucu-ui';
import { APP_PATHS, APP_URLS } from '@my-project/utils';

export function useMainNavigation(): IMenuItem[] {
  // Detect which app is currently active based on the URL
  const currentPath = window.location.pathname;
  const isAppA = currentPath.includes(APP_PATHS.APP_A);
  const isAppB = currentPath.includes(APP_PATHS.APP_B);
  // ...detect each of your apps

  return [
    {
      name: 'App A',
      path: APP_PATHS.APP_A,
      icon: <LucideIcons.Home />,
      isActive: isAppA,
      // If we ARE in App A, use React Router (undefined href = SPA navigation)
      // If we're in a different app, use full reload (href = full URL)
      href: isAppA ? undefined : APP_URLS.APP_A,
      dropdownItems: [
        {
          name: 'Sub Page',
          path: `${APP_PATHS.APP_A}/sub-page`,
          icon: <LucideIcons.FileText />,
          isActive: false,
          href: isAppA ? undefined : `${APP_URLS.APP_A}/sub-page`,
        },
      ],
    },
    {
      name: 'App B',
      path: APP_PATHS.APP_B,
      icon: <LucideIcons.Grid />,
      isActive: isAppB,
      href: isAppB ? undefined : APP_URLS.APP_B,
    },
    // Hidden items: accessible via URL but not shown in the nav menu
    {
      name: 'Auth',
      path: APP_PATHS.AUTH,
      icon: <LucideIcons.Lock />,
      isActive: false,
      hide: true, // Hidden from nav — only accessed via login/logout flows
      href: APP_URLS.AUTH,
    },
  ];
}
```

**Key Pattern**: The `href` property controls navigation:

- `href: undefined` → React Router handles it (SPA navigation within the same app)
- `href: "https://..."` → Full page reload via the shell's anchor element

> **Reference Implementation**: The demo uses 4 menu items (Authentication `hide:true`, Landing with dropdowns, Dashboard with dropdowns, User Profile `hide:true`). Your project defines whatever items map to your actual apps.

---

## 5. Shared Constants & URLs

Define your app paths and URLs in a central location. **Add one entry per app in your ecosystem.**

### App Paths & URLs

```tsx
// libs/utils/src/routes.ts

// Static path prefixes — one per MFE app
export const APP_PATHS = {
  AUTH: '/auth',
  APP_A: '/app-a',
  APP_B: '/app-b',
  APP_C: '/app-c',
  // Add more as needed
} as const;

// Full URLs from environment variables — used for cross-app navigation
export const APP_URLS = {
  AUTH: import.meta.env.VITE_APP_AUTH_URL,
  APP_A: import.meta.env.VITE_APP_A_URL,
  APP_B: import.meta.env.VITE_APP_B_URL,
  APP_C: import.meta.env.VITE_APP_C_URL,
  // Add more as needed
} as const;
```

### Environment Variables

Each app needs a port (for local dev) and a URL (for inter-app navigation). **Add a pair of variables per app.**

```bash
# .env.local
VITE_APP_ENVIRONMENT=local

# Dev server
VITE_DEV_SERVER_PORT=3000

# Per-app ports (local dev servers)
VITE_APP_AUTH_PORT=4200
VITE_APP_A_PORT=4201
VITE_APP_B_PORT=4202
VITE_APP_C_PORT=4203
# ...add more for each app

# Per-app URLs (used for inter-app navigation)
VITE_APP_AUTH_URL=http://localhost:3000/auth
VITE_APP_A_URL=http://localhost:3000/app-a
VITE_APP_B_URL=http://localhost:3000/app-b
VITE_APP_C_URL=http://localhost:3000/app-c
# ...add more for each app

# Backend API
VITE_API_BASE_URL=https://api.example.com
VITE_WEBSOCKET_URL=wss://api.example.com/ws
```

> **Production**: Change `VITE_APP_*_URL` to production domains (e.g., `https://myapp.com/app-a`). The path-based approach works identically in production with a reverse proxy (Nginx, Cloudflare, etc.).

---

## 6. Shared Authentication

### Auth Store (Zustand + Persist)

Authentication state is shared across all MFEs via Zustand with `localStorage` persistence. When a user logs in on one app, the state persists. When the browser loads another MFE (via full page reload), the store rehydrates from `localStorage`.

```tsx
// libs/auth-security/src/store/useAuthGlobalStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define User to match YOUR domain — these are example fields
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  // ...add your own fields (roles, permissions, tokens, etc.)
}

interface AuthGlobalState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
  setUser: (user: Partial<User> | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthGlobalStore = create<AuthGlobalState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      checkAuth: () => get().isAuthenticated,
      setUser: (user) =>
        set((state) => ({
          user: user ? ({ ...state.user, ...user } as User) : null,
        })),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: 'mfe-auth-storage', // localStorage key — shared across all MFEs
    }
  )
);
```

**How cross-MFE auth works:**

1. User visits `/auth/login` → Auth MFE loads
2. User submits credentials → `login(user)` → Zustand persists to `localStorage`
3. Navigation to `/app-b` → full page reload → App B MFE loads
4. App B's `useAuthGlobalStore` rehydrates from `localStorage` → `isAuthenticated: true`
5. Protected routes are accessible

> **Extend as needed**: The reference implementation uses a simple username/password demo. In production, you'd integrate JWT tokens, refresh flows, OAuth, or any auth provider you use.

### Auth Exports

```tsx
// libs/auth-security/src/index.ts
export { useAuthGlobalStore } from './store/useAuthGlobalStore';
export type { User, AuthGlobalState } from './store/useAuthGlobalStore';
```

---

## 7. Shared API Client

### QueryClient Singleton

```tsx
// libs/api/src/components/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: import.meta.env.VITE_APP_ENVIRONMENT === 'local',
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### QueryProvider Wrapper

```tsx
// libs/api/src/components/query-provider.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient as defaultClient } from './query-client';

interface QueryProviderProps {
  children: React.ReactNode;
  client?: QueryClient;
}

export function QueryProvider({ children, client }: QueryProviderProps) {
  const isLocal = import.meta.env.VITE_APP_ENVIRONMENT === 'local';

  return (
    <QueryClientProvider client={client ?? defaultClient}>
      {children}
      {isLocal && <ReactQueryDevtools position="bottom-left" />}
    </QueryClientProvider>
  );
}
```

---

## 8. Vite Configuration for MFEs

### Base Configuration Factory

Each MFE app uses a shared Vite configuration factory that handles path-based deployment, HMR, build optimization, and proxy setup.

```tsx
// tools/apps-config/vite-base-config.ts
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

interface ViteConfigOptions {
  name: string; // App name — must match the directory name and URL path
  port: number; // Dev server port for this app
  modulePath: string; // __dirname of the app
  env: Record<string, string>;
}

export async function generateViteConfigBase({ name, port, modulePath, env }: ViteConfigOptions) {
  const isLocal = env.VITE_APP_ENVIRONMENT === 'local';

  return {
    root: modulePath,
    base: `/${name}`, // Critical: path-based deployment

    plugins: [react(), tailwindcss(), nxViteTsPaths()],

    define: {
      MODULE_APP_NAME: JSON.stringify(name),
      MODULE_APP_VERSION: JSON.stringify(require(`${modulePath}/package.json`).version),
    },

    server: {
      port,
      hmr: {
        host: 'localhost',
        port,
        clientPort: port, // Ensures HMR works through the proxy
      },
      proxy: isLocal
        ? {
            '/api': {
              target: env.VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
          }
        : undefined,
    },

    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            state: ['zustand', '@tanstack/react-query'],
          },
        },
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'tailwindcss', '@tanstack/react-query'],
    },

    test: {
      environment: 'jsdom',
      globals: true,
    },
  };
}
```

### Per-App Usage

Each app's `vite.config.ts` is minimal — just calls the factory:

```tsx
// apps/<your-app>/vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../tools/apps-config/vite-base-config';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return await generateViteConfigBase({
    name: 'your-app', // Must match directory and URL path
    port: parseInt(env.VITE_APP_YOUR_APP_PORT) || 4201, // Fallback port
    modulePath: __dirname,
    env,
  });
});
```

### Critical: `base` Path

The `base: /${name}` setting ensures that:

- All assets are served from `/{name}/assets/...`
- React Router's `basename` aligns with the deployment path
- The proxy server knows which app to forward to

---

## 9. Unified Dev Server

The dev server is a Vite instance that proxies requests to each individual MFE app. It provides a single entry point (typically port 3000) for the entire MFE ecosystem.

### Proxy Configuration

**Add one proxy entry per app.** The pattern is always `/<app-path>` → `http://localhost:<app-port>`.

```tsx
// tools/dev-server/vite.config.ts
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 3000,
      proxy: {
        // Add one entry per MFE app:
        '/auth': {
          target: `http://localhost:${env.VITE_APP_AUTH_PORT}`,
          ws: true, // WebSocket for HMR
        },
        '/app-a': {
          target: `http://localhost:${env.VITE_APP_A_PORT}`,
          ws: true,
        },
        '/app-b': {
          target: `http://localhost:${env.VITE_APP_B_PORT}`,
          ws: true,
        },
        // ...add more apps here

        // API reverse proxy (eliminates CORS in development)
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
```

### Startup Script

**Update the `apps` array whenever you add or remove an MFE.**

```javascript
// tools/dev-server/start-dev-server.mjs
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

// List ALL your MFE apps here
const apps = ['auth', 'app-a', 'app-b', 'app-c'];
const processes = [];

// 1. Start each MFE app via Nx
for (const app of apps) {
  const proc = spawn('npx', ['nx', 'dev', app], {
    cwd: rootDir,
    stdio: 'pipe',
    shell: true,
  });

  proc.stdout.on('data', (data) => {
    process.stdout.write(`[${app}] ${data}`);
  });

  processes.push(proc);
}

// 2. Start the unified proxy server
const devServer = spawn('npx', ['vite', '--force'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
});
processes.push(devServer);

// 3. Graceful shutdown
const cleanup = () => {
  processes.forEach((p) => p.kill());
  process.exit(0);
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
```

### Root Scripts

```json
{
  "scripts": {
    "dev:unified": "node tools/dev-server/start-dev-server.mjs",
    "auth": "nx dev auth",
    "app-a": "nx dev app-a",
    "app-b": "nx dev app-b",
    "app-c": "nx dev app-c"
  }
}
```

---

## 10. Building an MFE App

Every MFE app follows the same pattern: import `ShellWrapper` from the shell library and configure its routes. **The content, routes, and layout of each app are entirely up to you.**

### App Entry Point

```tsx
// apps/<your-app>/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### App Component

```tsx
// apps/<your-app>/src/app.tsx
import { ShellWrapper } from '@my-project/shell';
import { useAuthGlobalStore } from '@my-project/auth-security';
import { APP_PATHS, APP_URLS } from '@my-project/utils';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';

export default function App() {
  const { isAuthenticated } = useAuthGlobalStore();
  const appRoutesConfig = useRoutesConfig();

  return <ShellWrapper basePath={APP_PATHS.APP_A} appRoutesConfig={appRoutesConfig} isAuthenticated={isAuthenticated} loginUrl={APP_URLS.AUTH + '/login'} layout={isAuthenticated ? LAYOUT_OPTIONS.ADMIN : LAYOUT_OPTIONS.CLEAN} logo={{ name: 'MY', secondName: 'APP' }} />;
}
```

### Routes Configuration

```tsx
// apps/<your-app>/src/router/routes-config.tsx
import { IAppRouteConfig, ReactRouter } from '@e-burgos/tucu-ui';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/home'));
const DetailPage = lazy(() => import('../pages/detail'));

export function useRoutesConfig(): IAppRouteConfig[] {
  return [
    {
      key: 'redirect',
      path: '/',
      element: <ReactRouter.Navigate to="/app-a/home" replace />,
      isPublic: false,
    },
    {
      key: 'home',
      path: '/home',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      ),
      isPublic: false, // Protected — requires auth
    },
    {
      key: 'detail',
      path: '/detail/:id',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DetailPage />
        </Suspense>
      ),
      isPublic: false,
    },
  ];
}
```

---

## 11. Layout Strategies per App

Each MFE can use a different layout from `@e-burgos/tucu-ui` depending on its purpose. Choose the layout that best fits your app's UX:

| Layout                          | Sidebar | Top Nav | Best For                                           |
| ------------------------------- | ------- | ------- | -------------------------------------------------- |
| `LAYOUT_OPTIONS.ADMIN`          | Yes     | Yes     | Data-rich apps (dashboards, admin panels, CRM)     |
| `LAYOUT_OPTIONS.HORIZONTAL`     | No      | Yes     | Content apps (landing, docs, profiles, settings)   |
| `LAYOUT_OPTIONS.CLEAN`          | No      | No      | Standalone flows (login, signup, onboarding)       |
| `LAYOUT_OPTIONS.MACOS`          | Yes     | Yes     | macOS-style apps with translucent sidebar + toolbar|
| `LAYOUT_OPTIONS.MACOS_TAHOE`    | Yes     | Yes     | macOS Tahoe-style with rounded corners + vibrancy  |

> **Reference Implementation examples**: Authentication → `CLEAN`, Landing → `HORIZONTAL`, Dashboard → `ADMIN`, User Profile → `HORIZONTAL`. These are just sensible defaults for their respective demo purposes.

### Dynamic Layout Based on Auth State

A common pattern is switching layouts based on authentication:

```tsx
<ShellWrapper
  layout={isAuthenticated ? LAYOUT_OPTIONS.ADMIN : LAYOUT_OPTIONS.CLEAN}
  // When not authenticated, CLEAN layout shows no navigation
  // When authenticated, ADMIN layout shows full sidebar + top nav
/>
```

---

## 12. Error Routes

The shell library provides a hook for standard error routes that all MFEs should include:

```tsx
// libs/shell/src/hooks/use-public-error-routes-config.tsx
import { IAppRouteConfig, NotFoundPage, AppErrorPage } from '@e-burgos/tucu-ui';

export function usePublicErrorRoutesConfig(basePath: string): IAppRouteConfig[] {
  return [
    {
      key: 'forbidden',
      path: '/forbidden',
      element: <AppErrorPage type="FORBIDDEN" />,
      isPublic: true,
    },
    {
      key: 'not-found',
      path: '/not-found',
      element: <NotFoundPage />,
      isPublic: true,
    },
    {
      key: 'server-error',
      path: '/server-error',
      element: <AppErrorPage type="SERVER_ERROR" />,
      isPublic: true,
    },
    {
      key: 'access-denied',
      path: '/access-denied',
      element: <AppErrorPage type="ACCESS_DENIED" />,
      isPublic: true,
    },
    {
      key: 'user-blocked',
      path: '/user-blocked',
      element: <AppErrorPage type="USER_BLOCKED" />,
      isPublic: true,
    },
  ];
}
```

Apps merge error routes with their own:

```tsx
const appRoutes = useRoutesConfig();
const errorRoutes = usePublicErrorRoutesConfig(APP_PATHS.APP_A);
const allRoutes = [...appRoutes, ...errorRoutes];
```

---

## 13. Theme & Settings Sharing

### How Theming Works Across MFEs

Each MFE has its own instance of `ThemeProvider` (via `ShellWrapper`). Theme preferences are shared implicitly through `localStorage`:

| Setting             | Sharing Mechanism                                          |
| ------------------- | ---------------------------------------------------------- |
| **Dark/Light mode** | `useTheme` persists preference in `localStorage`           |
| **Color preset**    | Persisted in `localStorage` by tucu-ui                     |
| **Language**        | Persisted in `localStorage`                                |
| **Auth state**      | Zustand persist → `localStorage`                           |
| **Layout**          | NOT shared — each app chooses its own layout               |
| **Settings panel**  | Available in each app via `useTheme().setIsSettingsOpen()` |

### Consistent Imports

All MFEs must import the CSS and use the same components:

```tsx
// In ShellWrapper (done once, automatically):
import '@e-burgos/tucu-ui/styles';
```

This ensures all CSS custom properties (design tokens) are available and consistent.

---

## 14. Production Deployment

### Reverse Proxy Configuration (Nginx Example)

**Add one `location` block per MFE app.** The pattern is always `/{app-name}/` → local build directory.

```nginx
server {
    listen 80;
    server_name myapp.com;

    # One block per MFE app
    location /auth/ {
        alias /var/www/auth/;
        try_files $uri $uri/ /auth/index.html;
    }

    location /app-a/ {
        alias /var/www/app-a/;
        try_files $uri $uri/ /app-a/index.html;
    }

    location /app-b/ {
        alias /var/www/app-b/;
        try_files $uri $uri/ /app-b/index.html;
    }

    # ...add more apps

    # API proxy
    location /api/ {
        proxy_pass https://api.example.com/;
    }

    # Root redirect — choose your default landing app
    location = / {
        return 302 /app-a;
    }
}
```

### Build Each App

```bash
# Build all apps
pnpm nx run-many -t build

# Build specific app
pnpm nx build app-a
```

Each app builds to `dist/apps/{name}/` with `base: /{name}` already configured.

---

## 15. Adding a New MFE App

Step-by-step checklist for adding a new micro-frontend to your ecosystem:

### 1. Create the app

```bash
pnpm nx g @nx/react:app apps/my-new-app --bundler=vite --style=none
```

### 2. Configure Vite

```tsx
// apps/my-new-app/vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../tools/apps-config/vite-base-config';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return await generateViteConfigBase({
    name: 'my-new-app',
    port: parseInt(env.VITE_APP_MY_NEW_APP_PORT) || 4204,
    modulePath: __dirname,
    env,
  });
});
```

### 3. Add environment variables

```bash
# .env.local — add:
VITE_APP_MY_NEW_APP_PORT=4204
VITE_APP_MY_NEW_APP_URL=http://localhost:3000/my-new-app
```

### 4. Update shared constants

```tsx
// libs/utils/src/routes.ts
export const APP_PATHS = {
  // ...existing paths
  MY_NEW_APP: '/my-new-app',
};

export const APP_URLS = {
  // ...existing URLs
  MY_NEW_APP: import.meta.env.VITE_APP_MY_NEW_APP_URL,
};
```

### 5. Add proxy route

```tsx
// tools/dev-server/vite.config.ts — add proxy entry:
'/my-new-app': {
  target: `http://localhost:${env.VITE_APP_MY_NEW_APP_PORT}`,
  ws: true,
},
```

### 6. Add to startup script

```javascript
// tools/dev-server/start-dev-server.mjs — add to apps array:
const apps = [...existingApps, 'my-new-app'];
```

### 7. Create the app component

```tsx
// apps/my-new-app/src/app.tsx
import { ShellWrapper } from '@my-project/shell';
import { useAuthGlobalStore } from '@my-project/auth-security';
import { APP_PATHS, APP_URLS } from '@my-project/utils';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

export default function App() {
  const { isAuthenticated } = useAuthGlobalStore();

  return <ShellWrapper basePath={APP_PATHS.MY_NEW_APP} appRoutesConfig={[{ key: 'home', path: '/', element: <Home />, isPublic: false }]} isAuthenticated={isAuthenticated} loginUrl={APP_URLS.AUTH + '/login'} layout={LAYOUT_OPTIONS.HORIZONTAL} logo={{ name: 'MY NEW', secondName: 'APP' }} />;
}
```

### 8. Update navigation

Add the new app to `useMainNavigation()` in the shell library.

### 9. Add to reverse proxy (production)

```nginx
location /my-new-app/ {
    alias /var/www/my-new-app/;
    try_files $uri $uri/ /my-new-app/index.html;
}
```

---

## 16. Key TypeScript Interfaces

### From `@e-burgos/tucu-ui`

```typescript
// Route configuration for MFE mode
interface IAppRouteConfig {
  key: string; // Unique route identifier
  path: string; // Path relative to basePath
  element: ReactNode; // Component to render
  isPublic?: boolean; // true = no auth required (default: false)
  disabled?: boolean; // Temporarily disable the route
}

// Navigation menu item
interface IMenuItem {
  name: string; // Display name
  path: string; // Route URL
  icon?: ReactNode; // Icon (use LucideIcons)
  href?: string; // External URL (full reload) — undefined = SPA navigation
  hide?: boolean; // Hidden from nav but route active
  isActive?: boolean; // Force active state
  dropdownItems?: IMenuItem[];
  onClick?: () => void;
}

// Layout options
enum LAYOUT_OPTIONS {
  ADMIN = 'admin', // Sidebar + top nav
  HORIZONTAL = 'horizontal', // Top nav only
  CLEAN = 'clean', // No navigation chrome
  MACOS = 'macos', // macOS-style sidebar + toolbar
  MACOS_TAHOE = 'macos-tahoe', // macOS Tahoe-style with rounded corners
}

// ThemeProvider props in MFE mode
interface MfeThemeProviderProps {
  architecturalPatterns: 'mfe';
  basePath: string;
  appRoutesConfig: IAppRouteConfig[];
  isAuthenticated: boolean;
  loginUrl: string;
  layout?: LAYOUT_OPTIONS;
  menuItems?: IMenuItem[];
  rightButton?: ReactNode;
  logo?: { name?: string; secondName?: string; path?: string };
  contentClassName?: string;
  showSettings?: boolean;
}
```

---

## 17. Agent Guidelines for MFE Implementation

1. **Apps are custom** — The user defines what apps to create. The reference implementation's 4 apps (authentication, landing, dashboard, user-profile) are demos. Help users design their own app decomposition based on their domain.
2. **Always use ShellWrapper** — Never configure `ThemeProvider` with `architecturalPatterns="mfe"` directly in an app. Use the shell library's `ShellWrapper` to ensure consistent providers, navigation, and styling.
3. **Import `@e-burgos/tucu-ui` from npm** — All MFE apps and shared libraries import from the npm package, never from local paths.
4. **Dual navigation pattern** — Use `href: undefined` for same-app links (React Router) and `href: APP_URLS.XXX` for cross-app links (full reload).
5. **Auth via Zustand persist** — Always use the shared `useAuthGlobalStore` for authentication. It persists to `localStorage`, enabling cross-MFE session sharing. Adapt the `User` interface and auth logic to the user's requirements.
6. **One Vite config factory** — Keep all Vite configuration in `tools/apps-config/`. Each app's `vite.config.ts` should be 5-10 lines calling the factory.
7. **Environment-driven URLs** — Never hardcode app URLs. Use `VITE_APP_*_URL` environment variables via `APP_URLS`.
8. **Path-based `base`** — Every MFE Vite config must set `base: /${name}` to match its deployment path.
9. **Layout matches purpose** — Suggest layouts based on the app's function: CLEAN for standalone flows, HORIZONTAL for content/simple apps, ADMIN for data-rich apps.
10. **Error routes are public** — Always add error routes with `isPublic: true` so they're accessible regardless of auth state.
11. **Lazy load pages** — Use `React.lazy()` + `Suspense` for all page components in route configs to minimize initial bundle size.
12. **Shared libraries, not shared runtime** — This architecture bundles shared libraries into each app independently. There's no runtime module sharing.
13. **Proxy eliminates CORS** — In development, the unified proxy makes all apps appear to come from the same origin (port 3000). In production, use a reverse proxy (Nginx) for the same effect.
14. **Checklist for new apps** — When generating a new MFE, follow all 9 steps in Section 15 (create app, configure Vite, add env vars, update constants, add proxy, add to startup, create component, update nav, add to reverse proxy).
