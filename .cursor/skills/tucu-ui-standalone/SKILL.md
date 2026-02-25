# Skill: Tucu-UI Standalone Architecture

Complete guide to implementing **Standalone (SPA)** applications with `@e-burgos/tucu-ui`. Covers base configuration, menu-driven routing from `menuItems`, route protection, local authentication, theming, and deployment.

> **Companion Skills**: `tucu-ui`, `tucu-ui-routing`, `tucu-ui-design-system`, `tucu-ui-forms`
> **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## Reference Implementation

This skill describes the Standalone pattern in a **generic** way. The repository includes a reference implementation at `examples/standalone/` with a demo app that showcases authentication, route protection, layout usage, and library integration.

**The demo app is illustrative — not prescriptive.** You can build any type of application (e-commerce, CMS, dashboard, B2B portal, LMS, etc.) using the same patterns.

---

## 1. Standalone Architecture

In standalone mode there is **a single React application** that owns all routes. There is no MFE orchestrator or cross-app navigation.

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  Standalone Application (SPA)               │
│                                                             │
│  App.tsx                                                    │
│   └─ QueryProvider (optional)                              │
│      └─ ThemeProvider (standalone by default)              │
│         └─ BrowserRouter (internal to tucu-ui)            │
│            └─ StandaloneAppRoutesProvider                  │
│               ├─ Public Routes                             │
│               └─ Private Routes (internal AuthProvider)    │
└─────────────────────────────────────────────────────────────┘
                           │
                 @e-burgos/tucu-ui (npm)
```

### Key Principles

| Principle                 | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| **Single App**            | All routes live in one application                                    |
| **Menu-Driven Routing**   | Routes are generated from `menuItems`                                 |
| **Standalone by default** | `ThemeProvider` uses standalone without declaring `architecturalPatterns` |
| **Built-in Auth**         | Private routes via `isAuthenticated` + `loginUrl`                     |
| **SPA Navigation**        | Internal navigation with React Router (no full reload)                |

---

## 2. Recommended Structure

```text
your-standalone-app/
├── src/
│   ├── app.tsx
│   ├── main.tsx
│   ├── router/
│   │   ├── routes-config.tsx
│   │   └── entry-points.tsx
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── queries/
│   │   ├── query-client.ts
│   │   └── query-provider.tsx
│   └── store/
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

> **Reference**: `examples/standalone` uses this same layout for a demo application.

---

## 3. ThemeProvider in Standalone Mode

The main pattern is wrapping the app with `ThemeProvider` using `menuItems`.

```tsx
import { ThemeProvider, LAYOUT_OPTIONS, type StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';

export default function App() {
  const { menuItems } = useRoutesConfig();
  const isAuthenticated = true; // replace with real store/auth

  return <ThemeProvider menuItems={menuItems} layout={LAYOUT_OPTIONS.HORIZONTAL} isAuthenticated={isAuthenticated} loginUrl="/auth/login" logo={{ name: 'MY', secondName: 'APP' }} showSettings />;
}
```

### Important Rules

- In standalone you typically **do not need** an explicit `architecturalPatterns`.
- `menuItems` defines both navigation **and** routes.
- `isAuthenticated` and `loginUrl` enable private route protection.
- `layout` can change based on the app's UX needs.

---

## 4. Routing from menuItems

Define public and private routes via `StandaloneAppRoutesMenuItem[]`.

```tsx
import { LucideIcons, type StandaloneAppRoutesMenuItem, ReactRouter } from '@e-burgos/tucu-ui';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};

export function useRoutesConfig() {
  const menuItems: StandaloneAppRoutesMenuItem[] = [
    {
      name: 'Home',
      path: ROUTES.HOME,
      icon: <LucideIcons.House />,
      component: <HomePage />,
      isPublic: true,
    },
    {
      name: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: <LucideIcons.LayoutDashboard />,
      component: <DashboardPage />,
      isPublic: false,
    },
    {
      name: 'Profile',
      path: ROUTES.PROFILE,
      icon: <LucideIcons.User />,
      component: <ProfilePage />,
      isPublic: false,
    },
    {
      name: 'Login',
      path: ROUTES.LOGIN,
      icon: <LucideIcons.LogIn />,
      component: <LoginPage />,
      isPublic: true,
      hide: true,
    },
    {
      name: 'Root Redirect',
      path: '*',
      component: <ReactRouter.Navigate to={ROUTES.HOME} replace />,
      isPublic: true,
      hide: true,
    },
  ];

  return { menuItems };
}
```

### Recommended Semantics

- `isPublic: true` → open access
- `isPublic: false` → requires session
- `hide: true` → active route but hidden from menu
- `dropdownItems` → navigation hierarchy

---

## 5. Authentication & Route Protection

The auth strategy is up to you (JWT, OAuth, external provider, etc.), but the contract with `ThemeProvider` is simple:

- Expose `isAuthenticated`
- Define `loginUrl`
- Mark routes with `isPublic`

```tsx
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
```

```tsx
export default function App() {
  const { isAuthenticated } = useAuthStore();
  const { menuItems } = useRoutesConfig();

  return <ThemeProvider menuItems={menuItems} isAuthenticated={isAuthenticated} loginUrl="/auth/login" />;
}
```

> **Reference Implementation**: The standalone demo includes a full login/forgot/reset/sign-up flow to demonstrate these patterns.

---

## 6. Layout Strategy (by purpose)

| Layout                      | When to use                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `LAYOUT_OPTIONS.ADMIN`      | Data-rich apps with sidebar (admin/backoffice/analytics)     |
| `LAYOUT_OPTIONS.HORIZONTAL` | Content apps, docs, simple public/private portal             |
| `LAYOUT_OPTIONS.CLEAN`      | Isolated flows: login, onboarding, recovery                  |

You can also switch layout based on state:

```tsx
<ThemeProvider menuItems={menuItems} layout={isAuthenticated ? LAYOUT_OPTIONS.ADMIN : LAYOUT_OPTIONS.CLEAN} isAuthenticated={isAuthenticated} loginUrl="/auth/login" />
```

---

## 7. QueryProvider & Data Layer (optional)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 2 },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
```

---

## 8. Base Vite Configuration

```ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_APP_PORT || 4200),
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
```

Recommended variables:

```env
VITE_APP_PORT=4200
VITE_APP_ENVIRONMENT=local
VITE_API_BASE_URL=https://api.example.com
VITE_WEBSOCKET_URL=wss://api.example.com/ws
VITE_APP_SUPPORT_EMAIL=support@example.com
```

---

## 9. Implementation Flow (checklist)

1. Create base structure (`src/app.tsx`, `src/router`, `src/pages`).
2. Install `@e-burgos/tucu-ui` and React/Vite dependencies.
3. Define `menuItems` with public/private routes.
4. Connect auth state (`isAuthenticated`).
5. Declare `loginUrl` and hidden routes (`hide: true`) for auth flows.
6. Choose the main layout (`ADMIN`, `HORIZONTAL`, or `CLEAN`).
7. Add `QueryProvider` if the app consumes APIs.
8. Configure `.env` and `vite.config.ts`.
9. Validate navigation, guards, and fallback routes.

---

## 10. Differences with MFE

| Topic                   | Standalone                             | MFE                                               |
| ----------------------- | -------------------------------------- | ------------------------------------------------- |
| Deployable units        | 1 app                                 | N apps                                            |
| Cross-module navigation | Internal SPA                           | Mixed (SPA + reload between apps)                 |
| `ThemeProvider`         | Standalone by default (`menuItems`)    | `architecturalPatterns="mfe"` + `appRoutesConfig` |
| Shell wrapper           | Not required                           | Recommended / required                            |
| URLs                    | Internal routes                        | Paths per app + proxy/reverse proxy               |

If you need multiple independently deployed apps under different paths/domains, use the `tucu-ui-mfe` skill.

---

## 11. Key Interfaces

```ts
interface StandaloneAppRoutesMenuItem {
  name: string;
  path: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
  hide?: boolean;
  isPublic?: boolean;
  dropdownItems?: StandaloneAppRoutesMenuItem[];
}
```

```ts
interface ThemeProviderPropsStandalone {
  architecturalPatterns?: 'standalone';
  menuItems: StandaloneAppRoutesMenuItem[];
  isAuthenticated?: boolean;
  loginUrl?: string;
  layout?: LAYOUT_OPTIONS;
  rightButton?: React.ReactNode;
  logo?: { name?: string; secondName?: string; path?: string };
  showSettings?: boolean;
  customRoutes?: React.ReactElement;
}
```

---

## 12. Agent Guidelines (Standalone)

1. **Domain-free app**: Never assume the app should resemble the demo; propose structure based on the user's actual use case.
2. **Use `ThemeProvider` directly**: In standalone there is no need for an MFE shell.
3. **Routes from `menuItems`**: Avoid manual routing with `react-router-dom` outside the tucu-ui pattern.
4. **Decoupled auth**: `ThemeProvider` only needs `isAuthenticated` + `loginUrl`; the backend/auth provider is up to the user.
5. **Explicit protection**: Mark sensitive routes with `isPublic: false`.
6. **`hide: true` for technical routes**: login, OAuth callback, redirects, etc.
7. **Design with semantic tokens**: Use tucu-ui components and tokens, not hard-coded styles.
8. **Layout by context**: CLEAN for auth/onboarding; ADMIN for panels; HORIZONTAL for simple navigation.
9. **Lazy loading pages**: Use `React.lazy` + `Suspense` in `entry-points.tsx`.
10. **Scaling up**: If the user needs separate deployments per module, recommend migrating to the MFE pattern.
