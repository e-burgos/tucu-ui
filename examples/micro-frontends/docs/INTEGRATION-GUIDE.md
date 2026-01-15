# Micro-Frontend Integration Guide

Complete guide for integrating a new micro-frontend application with Tucu-UI's MFE architecture.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Understanding the Architecture](#understanding-the-architecture)
4. [Step-by-Step Integration](#step-by-step-integration)
5. [Configuration Details](#configuration-details)
6. [Advanced Features](#advanced-features)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Examples](#examples)

---

## Overview

This guide will walk you through creating a new micro-frontend application that integrates with `@e-burgos/tucu-ui` and follows the established architecture patterns. Each micro-frontend in this architecture:

- Uses `@e-burgos/tucu-ui`'s `ThemeProvider` through the `ShellWrapper` component
- **Automatically uses MFE mode** - `ShellWrapper` always sets `architecturalPatterns="mfe"`
- Implements its own routing configuration using `IAppRouteConfig[]`
- Can be developed, built, and deployed independently
- Shares common libraries and utilities
- Supports route protection via `isAuthenticated` and `loginUrl` props

### Key Concepts

- **Path-based Routing**: Each app is deployed on its own path (`/your-app`)
- **Unified Orchestration**: All apps share the `ShellWrapper` component
- **Tucu-UI MFE Support**: Built-in MFE mode in `ThemeProvider` via discriminated unions
- **Smart Navigation**: Automatic detection of in-app vs inter-app navigation
- **Route Protection**: Built-in support for public/private routes in MFE mode

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v20 or higher recommended)
- **pnpm** (v8 or higher) - Package manager
- **Git**
- Basic understanding of:
  - React 19
  - TypeScript
  - Nx monorepo structure
  - Vite build tool

---

## Understanding the Architecture

### How MFE Architecture Works

#### 1. ShellWrapper - The Unified Orchestrator

The `@e-burgos-mfe/shell` library provides the `ShellWrapper` component that:

- **Automatically sets MFE mode**: Always passes `architecturalPatterns="mfe"` to `ThemeProvider`
- **Wraps with ThemeProvider**: Integrates each app with Tucu-UI's MFE-capable `ThemeProvider`
- **Provides React Query context**: Wraps apps with `QueryProvider` for data fetching
- **Manages global navigation**: Generates menu items that navigate between micro-frontends
- **Composes header elements**: Combines `AppLabel`, `NavOptions`, and custom elements

**Key Implementation:**

```typescript
<ShellWrapper
  basePath={APP_PATHS.YOUR_APP}  // App's base path
  appRoutesConfig={routesConfig}      // Route configuration
  layout={LAYOUT_OPTIONS.HORIZONTAL}        // Layout type
  isAuthenticated={isAuthenticated}  // For route protection
  loginUrl={APP_URLS.AUTHENTICATION}  // Redirect URL if not authenticated
  // ... other props
/>
```

#### 2. ThemeProvider MFE Mode

Tucu-UI's `ThemeProvider` uses **TypeScript discriminated unions** to handle MFE mode:

```typescript
// When architecturalPatterns="mfe", ThemeProvider requires:
- basePath: string
- appRoutesConfig: IAppRouteConfig[]
- isAuthenticated: boolean
- loginUrl: string
```

**Flow:**

1. `ThemeProvider` receives `architecturalPatterns="mfe"`
2. Renders `MfeAppThemeProvider` instead of `StandaloneAppThemeProvider`
3. `MfeAppThemeProvider` sets up `BrowserRouter` and `MfeAppRoutesProvider`
4. `MfeAppRoutesProvider` handles route protection and `basePath` application
5. Routes are separated into public, private, and disabled categories

#### 3. Navigation Between Micro-Frontends

The navigation system uses a smart detection mechanism:

- **In-app navigation**: When the target app matches the current app, uses React Router (SPA navigation)
- **Inter-app navigation**: When navigating to a different app, uses full page reload via `navigateBetweenApps()`

---

## Step-by-Step Integration

### Step 1: Create Application Structure

Create a new application directory following this structure:

```
apps/your-app/
├── src/
│   ├── app.tsx                 # Main app component
│   ├── main.tsx                # Application entry point
│   ├── assets/
│   │   └── styles.css         # Application-specific styles
│   ├── pages/                  # Page components
│   │   ├── initial-page.tsx
│   │   └── ...
│   ├── router/
│   │   ├── routes-config.tsx   # Route configuration
│   │   └── entry-points.tsx    # Lazy-loaded route components
│   ├── features/               # Features specific to the app (optional)
│   ├── components/             # Components specific to the app (optional)
│   ├── hooks/                  # Custom hooks (optional)
│   ├── queries/                # React Query queries (optional)
│   └── store/                  # Local state (Zustand) (optional)
├── index.html                  # HTML template
├── package.json                # App metadata
├── vite.config.ts             # Vite configuration
├── project.json               # Nx project configuration
└── tsconfig.json              # TypeScript configuration
```

### Step 2: Update Route Constants

Add your app's path to `libs/utils/src/routes.ts`:

```typescript
export const APP_PATHS = {
  AUTHENTICATION: '/authentication',
  LANDING: '/landing',
  USER_PROFILE: '/user-profile',
  DASHBOARD: '/dashboard',
  YOUR_APP: '/your-app', // Add your app path
};

export const APP_URLS = {
  AUTHENTICATION: import.meta.env.VITE_APP_AUTHENTICATION_URL,
  LANDING: import.meta.env.VITE_APP_LANDING_URL,
  USER_PROFILE: import.meta.env.VITE_APP_USER_PROFILE_URL,
  DASHBOARD: import.meta.env.VITE_APP_DASHBOARD_URL,
  YOUR_APP: import.meta.env.VITE_APP_YOUR_APP_URL, // Add your app URL
};
```

### Step 3: Update Environment Variables

Add your app's configuration to `.env.local`:

```env
# Add your app port
VITE_APP_YOUR_APP_PORT=4204

# Add your app URL (for unified dev server)
VITE_APP_YOUR_APP_URL=http://localhost:3000/your-app
```

### Step 4: Create Vite Configuration

Create `apps/your-app/vite.config.ts`:

```typescript
/* eslint-disable @nx/enforce-module-boundaries */
/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../tools/apps-config/vite-base-config';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const config = {
    name: 'your-app', // Must match your app directory name
    port: parseInt(env.VITE_APP_YOUR_APP_PORT) || 4204,
    modulePath: __dirname,
    env,
  };

  return await generateViteConfigBase(config);
});
```

**Important**: The `name` property must match your app directory name exactly.

### Step 5: Create HTML Template

Create `apps/your-app/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Micro Frontends - Your App</title>
    <base href="%BASE_URL%" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    %GOOGLE_ANALYTICS_CONFIG%
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 6: Create Package.json

Create `apps/your-app/package.json`:

```json
{
  "name": "your-app",
  "version": "0.0.0"
}
```

### Step 7: Create Router Configuration

Create `apps/your-app/src/router/routes-config.tsx`:

```typescript
import { type IAppRouteConfig, ReactRouter } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import {
  InitialPageComponent,
  PageOneComponent,
  PageTwoComponent,
} from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.YOUR_APP,
  PageOne: `${APP_PATHS.YOUR_APP}/page-1`,
  PageTwo: `${APP_PATHS.YOUR_APP}/page-2`,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'your-app',
      path: ROUTES.Base,
      element: <ReactRouter.Navigate replace to={ROUTES.PageOne} />,
      // Or use a component directly:
      // element: <InitialPageComponent />,
    },
    {
      key: 'your-app-page-1',
      path: ROUTES.PageOne,
      element: <PageOneComponent />,
      isPublic: true, // Public route - accessible without authentication
    },
    {
      key: 'your-app-page-2',
      path: ROUTES.PageTwo,
      element: <PageTwoComponent />,
      isPublic: false, // Private route - requires authentication
    },
  ].filter((route) => route);
};
```

**Key Points:**

- All routes must start with your `basePath` (e.g., `APP_PATHS.YOUR_APP`)
- Use `isPublic: true` for public routes
- Use `isPublic: false` or omit it for private routes
- Use `disabled: true` to temporarily disable a route

### Step 8: Create Route Entry Points

Create `apps/your-app/src/router/entry-points.tsx`:

```typescript
import React, { lazy } from 'react';

const InitialPage = lazy(() => import('../pages/initial-page'));
const PageOne = lazy(() => import('../pages/page-one'));
const PageTwo = lazy(() => import('../pages/page-two'));

export const InitialPageComponent: React.FC = (props) => (
  <InitialPage {...props} />
);

export const PageOneComponent: React.FC = (props) => (
  <PageOne {...props} />
);

export const PageTwoComponent: React.FC = (props) => (
  <PageTwo {...props} />
);
```

**Best Practice**: Use `React.lazy()` for code splitting and better performance.

### Step 9: Create Main App Component

Create `apps/your-app/src/app.tsx`:

```typescript
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export function App() {
  const routesConfig = useRoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ShellWrapper
      queryClient={queryClient}
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.HORIZONTAL} // Choose your layout
      isAuthenticated={isAuthenticated} // Required for route protection
      loginUrl={APP_URLS.AUTHENTICATION} // Required for route protection
      // Optional: custom menu items (defaults to global navigation)
      menuItems={[]}
      // Optional: logo configuration
      logo={{
        name: 'Your App',
        path: APP_PATHS.YOUR_APP,
      }}
      // Optional: custom right button (always includes AppLabel)
      // rightButton={<CustomButton />}
    />
  );
}

export default App;
```

**Important Notes:**

- `architecturalPatterns="mfe"` is **automatically set** by `ShellWrapper` - you don't need to pass it
- `menuItems` is optional - if not provided, uses global navigation from `useMainNavigation`
- `isAuthenticated` and `loginUrl` are required if you have private routes
- `queryClient` is optional - uses default if not provided

### Step 10: Create Entry Point

Create `apps/your-app/src/main.tsx`:

```typescript
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './assets/styles.css';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Step 11: Create Page Components

Create your page components in `apps/your-app/src/pages/`:

```typescript
// apps/your-app/src/pages/initial-page.tsx
import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../router/routes-config';

const InitialPage = () => {
  const navigate = ReactRouter.useNavigate();

  return (
    <CardContainer className="flex flex-col gap-4 p-4 max-w-md mx-auto items-center justify-center mt-20">
      <Typography tag="h1">Your App</Typography>
      <Button
        variant="solid"
        color="primary"
        fullWidth
        onClick={() => navigate(ROUTES.PageOne)}
      >
        Go to Page 1
      </Button>
    </CardContainer>
  );
};

export default InitialPage;
```

### Step 12: Create Styles File

Create `apps/your-app/src/assets/styles.css`:

```css
/* Import Tucu UI styles */
@import '@e-burgos/tucu-ui/styles';

/* Add your app-specific styles here */
```

### Step 13: Add Scripts to package.json

Update the root `package.json` to add scripts for your new app:

```json
{
  "scripts": {
    // Development
    "your-app": "nx dev your-app",

    // Build
    "build:your-app": "nx build your-app",

    // Test
    "test:your-app": "nx test your-app",
    "test:your-app:coverage": "nx test your-app --coverage",

    // Lint
    "lint:your-app": "nx lint your-app",

    // Update aggregate commands
    "lint:apps": "nx run-many --target=lint --projects=authentication,landing,user-profile,dashboard,your-app",
    "test:apps": "nx run-many --target=test --projects=authentication,landing,user-profile,dashboard,your-app --output-style=stream"
  }
}
```

### Step 14: Update Unified Dev Server

Update `tools/dev-server/vite.config.ts` to add proxy configuration for your app:

```typescript
proxy: {
  '/authentication': { /* ... */ },
  '/landing': { /* ... */ },
  '/user-profile': { /* ... */ },
  '/dashboard': { /* ... */ },
  '/your-app': {
    target: `http://localhost:${yourAppPort}`,
    changeOrigin: true,
    rewrite: (path) => path,
    ws: true,
  },
}
```

Also update `tools/dev-server/start-dev-server.mjs` to start your app.

---

## Configuration Details

### ShellWrapper Props

The `ShellWrapper` component accepts the following props:

```typescript
interface ShellWrapperProps {
  // Required
  basePath: string; // Base path for your app (e.g., '/your-app')
  appRoutesConfig: IAppRouteConfig[]; // Route configuration array
  layout: LAYOUT_OPTIONS; // Layout type

  // Optional
  queryClient?: QueryClient; // React Query client (uses default if not provided)
  menuItems?: IMenuItem[]; // Custom menu items (defaults to global navigation)
  logo?: {
    name?: string;
    secondName?: string;
    path: string;
  };
  rightButton?: React.ReactNode; // Custom right button (always includes AppLabel)
  showSettings?: boolean; // Show settings button (defaults to true in local env)

  // Required for route protection
  isAuthenticated?: boolean; // Authentication state
  loginUrl?: string; // URL to redirect if not authenticated

  // Additional props passed to ThemeProvider
  contentClassName?: string;
  // ... other ThemeProvider props
}
```

**Important Notes:**

- `architecturalPatterns="mfe"` is **always** set internally - you don't pass it as a prop
- `menuItems` defaults to global navigation items from `useMainNavigation` if not provided
- `rightButton` always includes `AppLabel` component for development identification
- `isAuthenticated` and `loginUrl` are required when using route protection

### Layout Options

`@e-burgos/tucu-ui` provides several layout options through `LAYOUT_OPTIONS`:

- **`LAYOUT_OPTIONS.CLEAN`** - Minimal layout without navigation (e.g., authentication pages)
- **`LAYOUT_OPTIONS.HORIZONTAL`** - Horizontal navigation layout
- **`LAYOUT_OPTIONS.ADMIN`** - Admin dashboard layout with sidebar

### Route Configuration

Routes are configured using the `IAppRouteConfig` interface:

```typescript
interface IAppRouteConfig {
  key: string; // Unique identifier for the route
  path: string; // Route path (must start with basePath)
  element: React.ReactElement; // Component to render
  isPublic?: boolean; // If true, accessible without authentication
  disabled?: boolean; // If true, route is disabled
}
```

**Route Protection:**

- **Public routes**: Set `isPublic: true` - accessible without authentication
- **Private routes**: Set `isPublic: false` or omit it - requires authentication
- **Disabled routes**: Set `disabled: true` - temporarily disabled

### Navigation Between Micro-Frontends

To navigate between different micro-frontends, use the `navigateBetweenApps` helper:

```typescript
import { APP_URLS, navigateBetweenApps } from '@e-burgos-mfe/utils';

// Navigate to another micro frontend (full page reload)
navigateBetweenApps(APP_URLS.LANDING);
navigateBetweenApps(APP_URLS.DASHBOARD);
```

**How Navigation Works:**

1. **Automatic Detection**: The `useMainNavigation` hook detects which app you're currently in
2. **Smart Routing**:
   - If navigating within the same app → Uses React Router (SPA navigation)
   - If navigating to a different app → Uses `navigateBetweenApps()` (full page reload)
3. **Menu Items**: Global navigation menu automatically shows/hides `href` based on current app

---

## Advanced Features

### Custom Menu Items

You can provide custom menu items instead of using the default global navigation:

```typescript
import { type IMenuItem, LucideIcons } from '@e-burgos/tucu-ui';
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';

const customMenuItems: IMenuItem[] = [
  {
    name: 'Home',
    path: APP_PATHS.YOUR_APP,
    href: undefined, // undefined = React Router handles it (same app)
    isActive: true,
    icon: <LucideIcons.Home size={24} />,
  },
  {
    name: 'Settings',
    path: `${APP_PATHS.YOUR_APP}/settings`,
    href: undefined, // undefined = React Router handles it (same app)
    isActive: false,
    icon: <LucideIcons.Settings size={24} />,
  },
  {
    name: 'Dashboard',
    path: APP_PATHS.DASHBOARD,
    href: APP_URLS.DASHBOARD, // Full URL = browser handles it (different app)
    isActive: false,
    icon: <LucideIcons.LayoutDashboard size={24} />,
  },
];

// Use in ShellWrapper
<ShellWrapper
  menuItems={customMenuItems}
  // ... other props
/>
```

### Custom Right Button

You can provide a custom right button (it will always include `AppLabel`):

```typescript
<ShellWrapper
  rightButton={
    <Button variant="outline" onClick={handleCustomAction}>
      Custom Action
    </Button>
  }
  // ... other props
/>
```

### Route Protection

When using route protection, ensure you pass `isAuthenticated` and `loginUrl`:

```typescript
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export function App() {
  const routesConfig = useRoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ShellWrapper
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      isAuthenticated={isAuthenticated} // Required for protection
      loginUrl={APP_URLS.AUTHENTICATION} // Required for protection
      // ... other props
    />
  );
}
```

**How Route Protection Works:**

1. `MfeAppRoutesProvider` receives `isAuthenticated` and `loginUrl`
2. Routes are categorized into public, private, and disabled
3. Private routes are wrapped with `AuthProvider`
4. If `isAuthenticated === false`, `AuthProvider` renders `AccessDeniedPage`
5. `AccessDeniedPage` redirects to `loginUrl` using `window.location.href`

### Using React Query

React Query is automatically provided by `ShellWrapper`. You can use it in your components:

```typescript
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: fetchMyData,
  });

  // ... use data
}
```

### Using Zustand for State Management

You can use Zustand for local state management:

```typescript
// apps/your-app/src/store/useMyStore.ts
import { create } from 'zustand';

interface MyStore {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

## Best Practices

### 1. Route Naming

- Use descriptive keys for routes: `'your-app-page-1'` instead of `'page1'`
- Keep route paths consistent with your app structure
- Always prefix routes with your `basePath`

### 2. Code Splitting

- Use `React.lazy()` for all page components
- Lazy load heavy components
- Use dynamic imports for large dependencies

### 3. Type Safety

- Always use TypeScript types from `@e-burgos/tucu-ui`
- Use `IAppRouteConfig` for route configuration
- Use `IMenuItem` for menu items

### 4. Environment Variables

- Always use environment variables for URLs and ports
- Never hardcode URLs or ports
- Use `APP_PATHS` and `APP_URLS` constants

### 5. Error Handling

- Implement proper error boundaries
- Handle loading states
- Provide user-friendly error messages

### 6. Testing

- Write unit tests for components
- Test route configuration
- Test navigation between apps

---

## Troubleshooting

### Issue: App doesn't load

**Solutions:**

- Verify `basePath` matches your app's path in `APP_PATHS`
- Check that `vite.config.ts` has the correct `name` property (must match directory name)
- Ensure environment variables are set correctly
- Check that the app is running on the correct port
- Verify the unified dev server proxy configuration

### Issue: Routes not working

**Solutions:**

- Verify route paths start with your `basePath`
- Check that `appRoutesConfig` is properly formatted
- Ensure route components are correctly exported
- Check browser console for errors
- Verify `MfeAppRoutesProvider` is receiving correct props

### Issue: Styles not loading

**Solutions:**

- Verify `@e-burgos/tucu-ui/styles` is imported in `styles.css`
- Check that Tailwind CSS is configured (handled by `vite-base-config.ts`)
- Ensure styles are imported in `main.tsx`
- Check for CSS import order issues

### Issue: Navigation between apps fails

**Solutions:**

- Verify `APP_URLS` constants are correctly set
- Check that the unified dev server is running
- Ensure all apps are running on their configured ports
- Verify `navigateBetweenApps` function is imported from `@e-burgos-mfe/utils`
- Check browser console for CORS errors

### Issue: Route protection not working

**Solutions:**

- Ensure `isAuthenticated` and `loginUrl` props are passed to `ShellWrapper`
- Verify routes are correctly marked with `isPublic: false` for private routes
- Check that `MfeAppRoutesProvider` is receiving the correct props (handled internally by ThemeProvider)
- Verify authentication state is correctly managed
- Check browser console for errors

### Issue: Menu items not showing

**Solutions:**

- Verify `menuItems` prop is correctly formatted
- Check that `useMainNavigation` hook is working (if using default navigation)
- Ensure menu items have correct `path` and `href` properties
- Check that layout supports navigation (not `CLEAN` layout)

### Issue: Build errors

**Solutions:**

- Clear Nx cache: `nx reset`
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `nx run-many --target=typecheck`
- Verify all dependencies are installed
- Check for circular dependencies

---

## Examples

### Example 1: Simple App with Public Routes

```typescript
// app.tsx
export function App() {
  const routesConfig = useRoutesConfig();
  return (
    <ShellWrapper
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      isAuthenticated={true} // All routes are public
      loginUrl={APP_URLS.AUTHENTICATION}
    />
  );
}

// routes-config.tsx
export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'your-app-home',
      path: APP_PATHS.YOUR_APP,
      element: <HomePage />,
      isPublic: true,
    },
  ];
};
```

### Example 2: App with Private Routes

```typescript
// app.tsx
export function App() {
  const routesConfig = useRoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ShellWrapper
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.ADMIN}
      isAuthenticated={isAuthenticated} // From auth store
      loginUrl={APP_URLS.AUTHENTICATION}
    />
  );
}

// routes-config.tsx
export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'your-app-public',
      path: `${APP_PATHS.YOUR_APP}/public`,
      element: <PublicPage />,
      isPublic: true, // Public route
    },
    {
      key: 'your-app-private',
      path: `${APP_PATHS.YOUR_APP}/private`,
      element: <PrivatePage />,
      isPublic: false, // Private route - requires authentication
    },
  ];
};
```

### Example 3: App with Custom Menu

```typescript
// app.tsx
const customMenuItems: IMenuItem[] = [
  {
    name: 'Home',
    path: APP_PATHS.YOUR_APP,
    isActive: true,
    icon: <LucideIcons.Home size={24} />,
  },
];

export function App() {
  const routesConfig = useRoutesConfig();
  return (
    <ShellWrapper
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      menuItems={customMenuItems} // Custom menu
      isAuthenticated={true}
      loginUrl={APP_URLS.AUTHENTICATION}
    />
  );
}
```

### Example 4: App with Logo

```typescript
export function App() {
  const routesConfig = useRoutesConfig();
  return (
    <ShellWrapper
      basePath={APP_PATHS.YOUR_APP}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      logo={{
        name: 'MY APP',
        secondName: 'V2',
        path: APP_PATHS.YOUR_APP,
      }}
      isAuthenticated={true}
      loginUrl={APP_URLS.AUTHENTICATION}
    />
  );
}
```

---

## Additional Resources

- [Main README](../README.md) - Overview of the micro-frontend architecture
- [Tucu-UI Documentation](https://tucu-ui.netlify.app) - Official Tucu-UI documentation

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
