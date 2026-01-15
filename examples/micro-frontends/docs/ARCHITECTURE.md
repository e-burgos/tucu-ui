# Architecture Overview

High-level overview of the Micro-Frontend architecture implementation with Tucu-UI.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Key Components](#key-components)
3. [How MFE Works](#how-mfe-works)
4. [Technology Stack](#technology-stack)
5. [Project Organization](#project-organization)

---

## Architecture Overview

This project implements a **path-based Micro-Frontend architecture** where:

- Each app is deployed independently on its own path (`/authentication`, `/landing`, etc.)
- All apps share a unified orchestrator through `@e-burgos-mfe/shell`
- Tucu-UI's `ThemeProvider` supports MFE mode via `architecturalPatterns="mfe"`
- Apps can navigate between each other using full page reloads or in-app routing

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Unified Dev Server                       │
│                  (Port 3000 - Proxy)                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ /authentication │ │ /landing │ │ /dashboard │ ...      │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ App: Auth    │ │ App: Landing │ │ App: Dashboard│
│ Port: 4200   │ │ Port: 4201   │ │ Port: 4203   │
└──────────────┘ └──────────────┘ └──────────────┘
         │              │              │
         └──────────────┴──────────────┘
                      │
         ┌────────────┴────────────┐
         │   Shared Libraries       │
         │  - shell (orchestrator)  │
         │  - api (React Query)     │
         │  - auth-security (Zustand)│
         │  - utils (constants)     │
         └──────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │      Tucu-UI             │
         │  (Design System)         │
         └──────────────────────────┘
```

---

## Key Components

### 1. ShellWrapper - The Unified Orchestrator

The `@e-burgos-mfe/shell` library provides the `ShellWrapper` component that:

- **Automatically sets MFE mode**: Always passes `architecturalPatterns="mfe"` to `ThemeProvider`
- **Wraps with ThemeProvider**: Integrates each app with Tucu-UI's MFE-capable `ThemeProvider`
- **Provides React Query context**: Wraps apps with `QueryProvider` for data fetching
- **Manages global navigation**: Generates menu items that navigate between micro-frontends
- **Composes header elements**: Combines `AppLabel`, `NavOptions`, and custom elements

**Key Implementation:**

```typescript
<ShellWrapper
  basePath={APP_PATHS.AUTHENTICATION}  // App's base path
  appRoutesConfig={routesConfig}      // Route configuration
  layout={LAYOUT_OPTIONS.CLEAN}        // Layout type
  // ... other props
/>
```

Internally, `ShellWrapper`:

1. Detects the current environment (local vs production)
2. Generates default navigation items via `useMainNavigation` hook
3. Composes the `rightButton` with `AppLabel` and `NavOptions`
4. Always passes `architecturalPatterns="mfe"` to `ThemeProvider`
5. Wraps everything with `QueryProvider` for React Query

### 2. ThemeProvider MFE Mode

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

### 3. Navigation Between Micro-Frontends

The navigation system uses a smart detection mechanism:

- **In-app navigation**: When the target app matches the current app, uses React Router (SPA navigation)
- **Inter-app navigation**: When navigating to a different app, uses full page reload via `navigateBetweenApps()`

**Implementation in `useMainNavigation`:**

```typescript
const isLandingApp = pathname.includes(APP_PATHS.LANDING);

// If in landing app, href is undefined → React Router handles it
// If in other app, href is set → Browser handles full page reload
href: isLandingApp ? undefined : APP_URLS.LANDING;
```

### 4. Route Protection

MFE mode supports route protection:

- **Public routes**: Accessible without authentication (`isPublic: true`)
- **Private routes**: Require authentication (`isPublic: false` or omitted)
- **Disabled routes**: Temporarily disabled (`disabled: true`)

When a user tries to access a private route without authentication:

1. `MfeAppRoutesProvider` checks `isAuthenticated` prop
2. If `false`, renders `AccessDeniedPage`
3. `AccessDeniedPage` redirects to `loginUrl` using `window.location.href`

---

## How MFE Works

### Component Hierarchy

```
App Component
  └── ShellWrapper
      └── QueryProvider (React Query)
          └── ThemeProvider (architecturalPatterns="mfe")
              └── MfeAppThemeProvider
                  └── BrowserRouter
                      └── ThemeWrapper
                          └── MfeAppRoutesProvider
                              ├── Public Routes
                              ├── Private Routes (wrapped with AuthProvider)
                              └── Disabled Routes
```

### Request Flow

1. **User navigates to `/landing`**
2. **Unified Dev Server** proxies request to landing app (port 4201)
3. **Landing App** loads and renders `ShellWrapper`
4. **ShellWrapper** wraps with `ThemeProvider` in MFE mode
5. **ThemeProvider** sets up routing and layout
6. **Route matches** and component renders

### Navigation Flow

**Within Same App (SPA Navigation):**

```
User clicks menu item → React Router handles → Component updates
```

**Between Different Apps (Full Page Reload):**

```
User clicks menu item → navigateBetweenApps() → window.location.href → Full page reload → New app loads
```

---

## Technology Stack

- **Nx** - Monorepo tooling and build system
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (via `@e-burgos/tucu-ui`)
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **pnpm** - Fast, disk space efficient package manager
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management
- **@e-burgos/tucu-ui** - Design system and UI component library with built-in MFE support

---

## Project Organization

```
micro-frontends/
├── apps/                    # Applications
│   ├── authentication/      # Authentication flow app
│   ├── landing/            # Landing page app
│   ├── user-profile/       # User profile app
│   └── dashboard/          # Dashboard app
├── libs/                    # Shared libraries
│   ├── api/                # API client and React Query
│   ├── auth-security/      # Authentication components (Zustand store)
│   ├── shell/              # Shell wrapper for @e-burgos/tucu-ui
│   │   ├── components/     # ShellWrapper, NavOptions, AppLabel
│   │   └── hooks/          # useMainNavigation, etc.
│   └── utils/              # Utility functions and constants
│       └── routes.ts       # APP_PATHS, APP_URLS, navigateBetweenApps
├── tools/                   # Build tools and configurations
│   ├── apps-config/        # Vite base configuration generator
│   └── dev-server/         # Unified development server
│       ├── index.html      # Landing page with app cards
│       └── vite.config.ts # Proxy configuration
├── docs/                    # Documentation
│   ├── INTEGRATION-GUIDE.md
│   ├── DEVELOPMENT.md
│   └── ARCHITECTURE.md
├── temp/                    # Analysis documents
│   ├── MFE-ARCHITECTURE-ANALYSIS.md
│   └── SHELL-LIBRARY-AND-MFE-IMPLEMENTATION-ANALYSIS.md
├── dist/                    # Build outputs
└── coverage/                # Test coverage reports
```

---

## Key Features

- **Micro Frontend Architecture** - Independent, deployable applications
- **Path-based Routing** - Each app accessible via its own path
- **Unified Orchestration** - Shared `ShellWrapper` component for all apps
- **Tucu-UI MFE Support** - Built-in MFE mode in `ThemeProvider`
- **Shared Component Library** - Reusable UI components across apps
- **Type-Safe Imports** - TypeScript path mappings for clean imports
- **Hot Module Replacement** - Fast development with Vite HMR
- **Code Sharing** - Shared libraries for common functionality
- **Independent Deployment** - Each app can be built and deployed separately
- **Smart Navigation** - Automatic detection of in-app vs inter-app navigation
- **Route Protection** - Built-in support for public/private routes in MFE mode

---

## Additional Resources

For detailed analysis and implementation details, see:

- **[Integration Guide](./INTEGRATION-GUIDE.md)** - Step-by-step guide for integrating a new micro-frontend
- **[Development Guide](./DEVELOPMENT.md)** - Development workflow and dev server details

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
