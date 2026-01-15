# Standalone Application Integration Guide

Complete guide for integrating a new standalone application with Tucu-UI's standalone architecture pattern.

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

This guide will walk you through creating a new standalone application that integrates with `@e-burgos/tucu-ui` and follows the established architecture patterns. A standalone application in this architecture:

- Uses `@e-burgos/tucu-ui`'s `ThemeProvider` directly (no wrapper needed)
- **Automatically uses standalone mode** - `ThemeProvider` defaults to `architecturalPatterns="standalone"`
- Implements routing using `StandaloneAppRoutesMenuItem[]` in `menuItems`
- Routes are automatically generated from menu items
- All routes are in a single application
- Supports route protection via `isAuthenticated` and `loginUrl` props

### Key Concepts

- **Single Application**: All routes are in one application (no micro-frontends)
- **Menu-Driven Routing**: Routes are automatically generated from `menuItems` configuration
- **Tucu-UI Standalone Support**: Built-in standalone mode in `ThemeProvider` (default)
- **Automatic Route Generation**: Routes are created from menu items automatically
- **Route Protection**: Built-in support for public/private routes

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v8 or higher) - Package manager
- **Git**
- Basic understanding of:
  - React 19
  - TypeScript
  - Vite build tool
  - React Router

---

## Understanding the Architecture

### How Standalone Architecture Works

#### 1. ThemeProvider - The Core Component

The `@e-burgos/tucu-ui` library provides the `ThemeProvider` component that:

- **Automatically uses standalone mode**: Defaults to `architecturalPatterns="standalone"`
- **Generates routes from menuItems**: Automatically creates routes from `StandaloneAppRoutesMenuItem[]`
- **Provides React Router context**: Sets up `BrowserRouter` internally
- **Manages layout and navigation**: Handles header, menu, and layout components
- **Supports route protection**: Wraps private routes with `AuthProvider`

**Key Implementation:**

```typescript
<ThemeProvider
  menuItems={menuItems} // Route configuration
  layout={LAYOUT_OPTIONS.HORIZONTAL} // Layout type
  isAuthenticated={isAuthenticated} // For route protection
  loginUrl="/authentication/login" // Redirect URL if not authenticated
  // ... other props
/>
```

#### 2. ThemeProvider Standalone Mode

Tucu-UI's `ThemeProvider` uses **TypeScript discriminated unions** to handle standalone mode:

```typescript
// When architecturalPatterns="standalone" (default), ThemeProvider requires:
- menuItems: StandaloneAppRoutesMenuItem[]
- customRoutes?: React.ReactElement<typeof Routes>  // Optional
```

**Flow:**

1. `ThemeProvider` receives `menuItems` (defaults to standalone mode)
2. Renders `StandaloneAppThemeProvider` instead of `MfeAppThemeProvider`
3. `StandaloneAppThemeProvider` sets up `BrowserRouter` and `StandaloneAppRoutesProvider`
4. `StandaloneAppRoutesProvider` generates routes from `menuItems`
5. Routes are separated into public and private categories
6. Private routes are wrapped with `AuthProvider`

#### 3. Route Generation from Menu Items

The routing system automatically generates routes from menu items:

- **Menu items** define both navigation and routing
- **Public routes**: Set `isPublic: true` or omit it (defaults to public)
- **Private routes**: Set `isPublic: false` - requires authentication
- **Dropdown items**: Support nested routes via `dropdownItems`

---

## Step-by-Step Integration

### Step 1: Create Application Structure

Create a new application directory following this structure:

```
your-standalone-app/
├── src/
│   ├── app.tsx                 # Main app component
│   ├── main.tsx                # Application entry point
│   ├── assets/
│   │   └── styles.css         # Application-specific styles
│   ├── pages/                  # Page components
│   │   ├── home-page.tsx
│   │   └── ...
│   ├── router/
│   │   ├── routes-config.tsx   # Route configuration (menuItems)
│   │   └── entry-points.tsx    # Lazy-loaded route components
│   ├── components/             # Reusable components
│   ├── hooks/                  # Custom hooks
│   ├── queries/                # React Query queries
│   └── store/                  # Local state (Zustand)
├── public/                     # Public assets
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

### Step 2: Install Dependencies

Create `package.json`:

```json
{
  "name": "your-standalone-app",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@e-burgos/tucu-ui": "^latest",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.26.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^8.57.0",
    "typescript": "^5.4.0",
    "vite": "^5.4.0"
  }
}
```

Install dependencies:

```bash
pnpm install --ignore-workspace
```

### Step 3: Create Vite Configuration

Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_APP_PORT || '4200'),
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### Step 4: Create HTML Template

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Your Standalone App</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 5: Create Router Configuration

Create `src/router/routes-config.tsx`:

```typescript
import { useMemo } from 'react';
import { type StandaloneAppRoutesMenuItem, LucideIcons, ReactRouter } from '@e-burgos/tucu-ui';
import { HomePageComponent, PageOneComponent, PageTwoComponent } from './entry-points';

export const ROUTES = {
  Home: '/',
  PageOne: '/page-1',
  PageTwo: '/page-2',
};

export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Home',
        path: ROUTES.Home,
        icon: <LucideIcons.Home size={24} />,
        component: <HomePageComponent />,
        isPublic: true, // Public route
      },
      {
        name: 'Page One',
        path: ROUTES.PageOne,
        icon: <LucideIcons.FileText size={24} />,
        component: <PageOneComponent />,
        isPublic: true, // Public route
      },
      {
        name: 'Page Two',
        path: ROUTES.PageTwo,
        icon: <LucideIcons.Settings size={24} />,
        component: <PageTwoComponent />,
        isPublic: false, // Private route - requires authentication
      },
    ],
    []
  );

  return {
    menuItems,
  };
};
```

**Key Points:**

- All routes are defined in `menuItems` array
- Use `isPublic: true` for public routes
- Use `isPublic: false` for private routes
- Use `hide: true` to hide menu items from navigation (but keep the route)
- Use `dropdownItems` for nested routes

### Step 6: Create Route Entry Points

Create `src/router/entry-points.tsx`:

```typescript
import React, { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home-page'));
const PageOne = lazy(() => import('../pages/page-one'));
const PageTwo = lazy(() => import('../pages/page-two'));

export const HomePageComponent: React.FC = (props) => <HomePage {...props} />;

export const PageOneComponent: React.FC = (props) => <PageOne {...props} />;

export const PageTwoComponent: React.FC = (props) => <PageTwo {...props} />;
```

**Best Practice**: Use `React.lazy()` for code splitting and better performance.

### Step 7: Create Main App Component

Create `src/app.tsx`:

```typescript
import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { RoutesConfig } from './router/routes-config';
import { QueryProvider, queryClient } from './queries';
import { useAuthGlobalStore } from './store';
import { NavOptions } from './components/common/nav-options';

export function App() {
  const { menuItems } = RoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        menuItems={menuItems}
        layout={LAYOUT_OPTIONS.HORIZONTAL}
        rightButton={<NavOptions />}
        logo={{
          name: 'MY APP',
          secondName: 'V2',
          path: '/',
        }}
        isAuthenticated={isAuthenticated}
        loginUrl="/authentication/login"
        setCurrentPathname={(pathname) => {
          // Optional: track current pathname for custom logic
        }}
      />
    </QueryProvider>
  );
}

export default App;
```

**Important Notes:**

- `architecturalPatterns` is **not needed** - defaults to `"standalone"`
- `menuItems` is required - defines both navigation and routes
- `isAuthenticated` and `loginUrl` are required if you have private routes
- `queryClient` is optional - you can use your own React Query setup

### Step 8: Create Entry Point

Create `src/main.tsx`:

```typescript
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './assets/styles.css';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Step 9: Create Page Components

Create your page components in `src/pages/`:

```typescript
// src/pages/home-page.tsx
import { Button, CardContainer, Typography, ReactRouter } from '@e-burgos/tucu-ui';
import { ROUTES } from '../router/routes-config';

const HomePage = () => {
  const navigate = ReactRouter.useNavigate();

  return (
    <CardContainer className="flex flex-col gap-4 p-4 max-w-md mx-auto items-center justify-center mt-20">
      <Typography tag="h1">Home Page</Typography>
      <Button variant="solid" color="primary" fullWidth onClick={() => navigate(ROUTES.PageOne)}>
        Go to Page 1
      </Button>
    </CardContainer>
  );
};

export default HomePage;
```

### Step 10: Create Styles File

Create `src/assets/styles.css`:

```css
/* Import Tucu UI styles */
@import '@e-burgos/tucu-ui/styles';

/* Add your app-specific styles here */
```

### Step 11: Set Up React Query

Create `src/queries/query-client.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

Create `src/queries/query-provider.tsx`:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';

export const QueryProvider = ({ client = queryClient, children }: { client?: typeof queryClient; children: React.ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
```

Create `src/queries/index.ts`:

```typescript
export { queryClient } from './query-client';
export { QueryProvider } from './query-provider';
```

### Step 12: Set Up State Management (Optional)

Create `src/store/use-auth-store.ts`:

```typescript
import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthGlobalStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));
```

Create `src/store/index.ts`:

```typescript
export { useAuthGlobalStore } from './use-auth-store';
```

### Step 13: Environment Variables

Create `.env` file:

```env
VITE_APP_PORT=4200
VITE_APP_ENVIRONMENT=local
VITE_API_BASE_URL=https://api.example.com/api
```

---

## Configuration Details

### ThemeProvider Props

The `ThemeProvider` component accepts the following props for standalone mode:

```typescript
interface StandaloneAppThemeProviderProps {
  // Required
  menuItems: StandaloneAppRoutesMenuItem[]; // Route configuration array

  // Optional
  customRoutes?: React.ReactElement<typeof Routes>; // Custom routes (overrides menuItems)
  layout?: LAYOUT_OPTIONS; // Layout type
  logo?: {
    name?: string;
    secondName?: string;
    path: string;
  };
  rightButton?: React.ReactNode; // Custom right button
  showSettings?: boolean; // Show settings button (defaults to true in local env)

  // Required for route protection
  isAuthenticated?: boolean; // Authentication state
  loginUrl?: string; // URL to redirect if not authenticated

  // Additional props
  contentClassName?: string;
  setCurrentPathname?: (pathname: string) => void;
  // ... other ThemeProvider props
}
```

**Important Notes:**

- `architecturalPatterns` is **not needed** - defaults to `"standalone"`
- `menuItems` is required - defines both navigation and routes
- `customRoutes` is optional - use if you need custom routing logic
- `isAuthenticated` and `loginUrl` are required when using route protection

### Layout Options

`@e-burgos/tucu-ui` provides several layout options through `LAYOUT_OPTIONS`:

- **`LAYOUT_OPTIONS.CLEAN`** - Minimal layout without navigation (e.g., authentication pages)
- **`LAYOUT_OPTIONS.HORIZONTAL`** - Horizontal navigation layout
- **`LAYOUT_OPTIONS.ADMIN`** - Admin dashboard layout with sidebar

### Route Configuration

Routes are configured using the `StandaloneAppRoutesMenuItem` interface:

```typescript
interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: JSX.Element; // Component to render
  isPublic?: boolean; // If true, accessible without authentication
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Nested routes
  hide?: boolean; // Hide from navigation menu
}
```

**Route Protection:**

- **Public routes**: Set `isPublic: true` or omit it (defaults to public)
- **Private routes**: Set `isPublic: false` - requires authentication
- **Hidden routes**: Set `hide: true` - accessible but not shown in menu

### Navigation

Navigation is handled automatically by React Router:

```typescript
import { ReactRouter } from '@e-burgos/tucu-ui';

// In your component
const navigate = ReactRouter.useNavigate();

// Navigate to a route
navigate('/page-1');
```

---

## Advanced Features

### Custom Routes

You can provide custom routes instead of using automatic route generation:

```typescript
import { Routes, Route } from 'react-router-dom';

<ThemeProvider
  menuItems={menuItems}
  customRoutes={
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/custom" element={<CustomPage />} />
    </Routes>
  }
  // ... other props
/>;
```

### Nested Routes (Dropdown Items)

You can create nested routes using `dropdownItems`:

```typescript
const menuItems: StandaloneAppRoutesMenuItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LucideIcons.LayoutDashboard size={24} />,
    component: <DashboardPage />,
    isPublic: false,
    dropdownItems: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        icon: <LucideIcons.BarChart size={24} />,
        component: <AnalyticsPage />,
        isPublic: false,
      },
      {
        name: 'Reports',
        path: '/dashboard/reports',
        icon: <LucideIcons.FileText size={24} />,
        component: <ReportsPage />,
        isPublic: false,
      },
    ],
  },
];
```

### Route Protection

When using route protection, ensure you pass `isAuthenticated` and `loginUrl`:

```typescript
import { useAuthGlobalStore } from './store';

export function App() {
  const { menuItems } = RoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ThemeProvider
      menuItems={menuItems}
      isAuthenticated={isAuthenticated} // Required for protection
      loginUrl="/authentication/login" // Required for protection
      // ... other props
    />
  );
}
```

**How Route Protection Works:**

1. `StandaloneAppRoutesProvider` receives `isAuthenticated` and `loginUrl`
2. Routes are categorized into public and private
3. Private routes are wrapped with `AuthProvider`
4. If `isAuthenticated === false`, `AuthProvider` renders `AccessDeniedPage`
5. `AccessDeniedPage` redirects to `loginUrl` using `window.location.href`

### Using React Query

React Query can be used in your components:

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
// src/store/use-my-store.ts
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

- Use descriptive paths: `/dashboard/analytics` instead of `/dash/a`
- Keep route paths consistent with your app structure
- Use constants for route paths to avoid typos

### 2. Code Splitting

- Use `React.lazy()` for all page components
- Lazy load heavy components
- Use dynamic imports for large dependencies

### 3. Type Safety

- Always use TypeScript types from `@e-burgos/tucu-ui`
- Use `StandaloneAppRoutesMenuItem` for route configuration
- Use proper types for all components

### 4. Environment Variables

- Always use environment variables for URLs and ports
- Never hardcode URLs or ports
- Use constants for route paths

### 5. Error Handling

- Implement proper error boundaries
- Handle loading states
- Provide user-friendly error messages

### 6. Testing

- Write unit tests for components
- Test route configuration
- Test navigation flows

---

## Troubleshooting

### Issue: App doesn't load

**Solutions:**

- Verify `menuItems` is correctly formatted
- Check that route components are correctly exported
- Ensure environment variables are set correctly
- Check that the app is running on the correct port
- Verify Vite configuration is correct

### Issue: Routes not working

**Solutions:**

- Verify `menuItems` array is properly formatted
- Check that route components are correctly exported
- Ensure route paths are unique
- Check browser console for errors
- Verify `StandaloneAppRoutesProvider` is receiving correct props

### Issue: Styles not loading

**Solutions:**

- Verify `@e-burgos/tucu-ui/styles` is imported in `styles.css`
- Check that Tailwind CSS is configured
- Ensure styles are imported in `main.tsx`
- Check for CSS import order issues

### Issue: Route protection not working

**Solutions:**

- Ensure `isAuthenticated` and `loginUrl` props are passed to `ThemeProvider`
- Verify routes are correctly marked with `isPublic: false` for private routes
- Check that `StandaloneAppRoutesProvider` is receiving the correct props
- Verify authentication state is correctly managed
- Check browser console for errors

### Issue: Menu items not showing

**Solutions:**

- Verify `menuItems` prop is correctly formatted
- Check that menu items have correct `path` and `component` properties
- Ensure layout supports navigation (not `CLEAN` layout)
- Check that `hide` property is not set to `true` for items you want to show

### Issue: Build errors

**Solutions:**

- Check TypeScript errors: `pnpm run build`
- Verify all dependencies are installed
- Check for circular dependencies
- Ensure all imports are correct

---

## Examples

### Example 1: Simple App with Public Routes

```typescript
// app.tsx
export function App() {
  const { menuItems } = RoutesConfig();
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      isAuthenticated={true} // All routes are public
      loginUrl="/login"
    />
  );
}

// routes-config.tsx
export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Home',
        path: '/',
        icon: <LucideIcons.Home size={24} />,
        component: <HomePage />,
        isPublic: true,
      },
    ],
    []
  );

  return { menuItems };
};
```

### Example 2: App with Private Routes

```typescript
// app.tsx
export function App() {
  const { menuItems } = RoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.ADMIN}
      isAuthenticated={isAuthenticated} // From auth store
      loginUrl="/authentication/login"
    />
  );
}

// routes-config.tsx
export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Public Page',
        path: '/public',
        icon: <LucideIcons.Globe size={24} />,
        component: <PublicPage />,
        isPublic: true, // Public route
      },
      {
        name: 'Private Page',
        path: '/private',
        icon: <LucideIcons.Lock size={24} />,
        component: <PrivatePage />,
        isPublic: false, // Private route - requires authentication
      },
    ],
    []
  );

  return { menuItems };
};
```

### Example 3: App with Nested Routes

```typescript
// routes-config.tsx
export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <LucideIcons.LayoutDashboard size={24} />,
        component: <DashboardPage />,
        isPublic: false,
        dropdownItems: [
          {
            name: 'Analytics',
            path: '/dashboard/analytics',
            icon: <LucideIcons.BarChart size={24} />,
            component: <AnalyticsPage />,
            isPublic: false,
          },
          {
            name: 'Reports',
            path: '/dashboard/reports',
            icon: <LucideIcons.FileText size={24} />,
            component: <ReportsPage />,
            isPublic: false,
          },
        ],
      },
    ],
    []
  );

  return { menuItems };
};
```

### Example 4: App with Logo

```typescript
export function App() {
  const { menuItems } = RoutesConfig();
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      logo={{
        name: 'MY APP',
        secondName: 'V2',
        path: '/',
      }}
      isAuthenticated={true}
      loginUrl="/login"
    />
  );
}
```

---

## Additional Resources

- [Main README](../README.md) - Overview of the standalone architecture
- [Tucu-UI Documentation](https://tucu-ui.netlify.app) - Official Tucu-UI documentation

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
