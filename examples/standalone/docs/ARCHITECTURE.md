# Architecture Overview

High-level overview of the Standalone Application architecture implementation with Tucu-UI.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Key Components](#key-components)
3. [How Standalone Works](#how-standalone-works)
4. [Technology Stack](#technology-stack)
5. [Project Organization](#project-organization)

---

## Architecture Overview

This project implements a **standalone application architecture** where:

- All routes are in a single application (no micro-frontends)
- Routes are automatically generated from `menuItems` configuration
- Tucu-UI's `ThemeProvider` supports standalone mode by default
- Navigation is handled by React Router within the same application
- Route protection is built-in via `isAuthenticated` and `loginUrl` props

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Standalone Application                    │
│                  (Single Application)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ThemeProvider                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         StandaloneAppThemeProvider              │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │      BrowserRouter                        │  │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  StandaloneAppRoutesProvider       │  │  │  │  │
│  │  │  │  │  ├── Public Routes                 │  │  │  │  │
│  │  │  │  │  └── Private Routes (AuthProvider) │  │  │  │  │
│  │  │  │  └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │      Tucu-UI             │
         │  (Design System)         │
         └──────────────────────────┘
```

---

## Key Components

### 1. ThemeProvider - The Core Component

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

Internally, `ThemeProvider`:

1. Detects the architectural pattern (defaults to `"standalone"`)
2. Renders `StandaloneAppThemeProvider` instead of `MfeAppThemeProvider`
3. Sets up `BrowserRouter` for routing
4. Generates routes from `menuItems` via `StandaloneAppRoutesProvider`
5. Wraps private routes with `AuthProvider` for protection

### 2. ThemeProvider Standalone Mode

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

### 3. Route Generation from Menu Items

The routing system automatically generates routes from menu items:

- **Menu items** define both navigation and routing
- **Public routes**: Set `isPublic: true` or omit it (defaults to public)
- **Private routes**: Set `isPublic: false` - requires authentication
- **Dropdown items**: Support nested routes via `dropdownItems`

**Implementation in `StandaloneAppRoutesProvider`:**

```typescript
menuItems?.forEach((route) => {
  if (route.isPublic || route.isPublic === undefined) {
    publicRoutes.push({
      key: `route-${index}`,
      path: route.path,
      element: route.component,
    });
  } else {
    privateRoutes.push({
      key: `route-${index}`,
      path: route.path,
      element: route.component,
    });
  }
  // Handle dropdownItems recursively
});
```

### 4. Route Protection

Standalone mode supports route protection:

- **Public routes**: Accessible without authentication (`isPublic: true` or omitted)
- **Private routes**: Require authentication (`isPublic: false`)

When a user tries to access a private route without authentication:

1. `StandaloneAppRoutesProvider` checks `isAuthenticated` prop
2. Private routes are wrapped with `AuthProvider`
3. If `isAuthenticated === false`, `AuthProvider` renders `AccessDeniedPage`
4. `AccessDeniedPage` redirects to `loginUrl` using `window.location.href`

---

## How Standalone Works

### Component Hierarchy

```
App Component
  └── QueryProvider (React Query)
      └── ThemeProvider (architecturalPatterns="standalone" - default)
          └── StandaloneAppThemeProvider
              └── BrowserRouter
                  └── ThemeWrapper
                      └── StandaloneAppRoutesProvider
                          ├── Public Routes
                          └── Private Routes (wrapped with AuthProvider)
```

### Request Flow

1. **User navigates to `/dashboard`**
2. **Browser** loads the application
3. **App Component** renders `ThemeProvider` with `menuItems`
4. **ThemeProvider** sets up routing and layout
5. **StandaloneAppRoutesProvider** matches route from `menuItems`
6. **Route matches** and component renders

### Navigation Flow

**Within Application (SPA Navigation):**

```
User clicks menu item → React Router handles → Component updates (no page reload)
```

**Route Protection Flow:**

```
User navigates to private route → AuthProvider checks isAuthenticated
  → If false: AccessDeniedPage → Redirects to loginUrl
  → If true: Component renders
```

---

## Technology Stack

- **Vite** - Build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework (via `@e-burgos/tucu-ui`)
- **Vitest** - Testing framework (optional)
- **ESLint** - Code linting
- **pnpm** - Fast, disk space efficient package manager
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management (optional)
- **React Router** - Client-side routing (via `@e-burgos/tucu-ui`)
- **@e-burgos/tucu-ui** - Design system and UI component library with built-in standalone support

---

## Project Organization

```
standalone/
├── src/
│   ├── app.tsx                 # Main app component
│   ├── main.tsx                # Application entry point
│   ├── assets/
│   │   └── styles.css         # Application-specific styles
│   ├── pages/                  # Page components
│   │   ├── home-page.tsx
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   └── ...
│   ├── router/
│   │   ├── routes-config.tsx   # Route configuration (menuItems)
│   │   └── entry-points.tsx   # Lazy-loaded route components
│   ├── components/             # Reusable components
│   │   └── common/
│   │       └── nav-options.tsx
│   ├── hooks/                  # Custom hooks
│   ├── queries/                # React Query queries
│   │   ├── query-client.ts
│   │   ├── query-provider.tsx
│   │   └── index.ts
│   └── store/                  # Local state (Zustand)
│       ├── use-auth-store.ts
│       └── index.ts
├── public/                     # Public assets
│   └── favicon.svg
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── docs/                      # Documentation
    ├── INTEGRATION-GUIDE.md
    ├── ARCHITECTURE.md
    └── DEVELOPMENT.md
```

---

## Key Features

- **Standalone Application** - Single application with all routes
- **Menu-Driven Routing** - Routes automatically generated from menu items
- **Tucu-UI Standalone Support** - Built-in standalone mode in `ThemeProvider`
- **Automatic Route Generation** - No need to manually configure routes
- **Route Protection** - Built-in support for public/private routes
- **Type-Safe Configuration** - TypeScript ensures correct route configuration
- **Hot Module Replacement** - Fast development with Vite HMR
- **Code Splitting** - Lazy loading for better performance
- **Layout Options** - Multiple layout types (CLEAN, HORIZONTAL, ADMIN)
- **Nested Routes** - Support for dropdown items and nested navigation

---

## Differences from Micro-Frontend Architecture

### Standalone vs MFE

| Feature                 | Standalone                                 | Micro-Frontend (MFE)                         |
| ----------------------- | ------------------------------------------ | -------------------------------------------- |
| **Architecture**        | Single application                         | Multiple independent apps                    |
| **Route Configuration** | `menuItems: StandaloneAppRoutesMenuItem[]` | `appRoutesConfig: IAppRouteConfig[]`         |
| **Base Path**           | Not needed (uses `/`)                      | Required (`basePath: string`)                |
| **Navigation**          | React Router (SPA)                         | React Router + full page reload between apps |
| **Wrapper Component**   | `ThemeProvider` directly                   | `ShellWrapper` → `ThemeProvider`             |
| **Route Generation**    | Automatic from menuItems                   | Explicit configuration                       |
| **Deployment**          | Single deployment                          | Independent deployments                      |
| **Use Case**            | Traditional SPA                            | Distributed teams, independent releases      |

### When to Use Standalone

Use **Standalone** when:

- Building a traditional single-page application
- You want automatic route generation from menu items
- You need simple navigation structure
- All features are in one codebase
- You prefer simpler deployment (single app)

### When to Use MFE

Use **Micro-Frontend** when:

- Building a distributed system with multiple teams
- You need independent deployments per feature
- You want to scale teams independently
- You need path-based routing across apps
- You want to integrate multiple apps with a base path

---

## Additional Resources

For detailed implementation details, see:

- **[Integration Guide](./INTEGRATION-GUIDE.md)** - Step-by-step guide for integrating a new standalone application
- **[Development Guide](./DEVELOPMENT.md)** - Development workflow and setup details

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
