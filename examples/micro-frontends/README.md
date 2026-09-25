# Tucu UI MFE (Micro Frontend)

A monorepo micro frontend architecture built with Nx, React, TypeScript, and Vite. This project contains multiple independent applications that can be developed, built, and deployed separately while sharing common libraries and components.

> **🚀 New to this project?** Start with the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md) for a comprehensive step-by-step guide, or check the [Quick Integration Guide](#-integrating-a-new-micro-frontend-with-eburgostucu-ui) below for a quick reference.

## 🏗️ Project Structure

This is an **Nx monorepo** organized as follows:

### Applications (`apps/`)

- **authentication** - User authentication flow application with login, sign-up, password reset, and phone verification
- **landing** - Landing page application
- **user-profile** - User profile management application
- **dashboard** - Dashboard application

### Libraries (`libs/`)

Shared libraries used across applications:

- **api** - API client and React Query integration utilities
- **auth-security** - Authentication and security components, including auth provider and store
- **shell** - Shell wrapper and layout components that integrate with `@e-burgos/tucu-ui`
- **utils** - Utility functions, route constants, and shared constants

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher recommended)
- **pnpm** (v8 or higher) - Package manager
- **Git**

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for the entire monorepo, including all apps and libraries.

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Application Environment
VITE_APP_ENVIRONMENT=local

# Application Ports (internal ports for each app)
VITE_APP_AUTHENTICATION_PORT=4200
VITE_APP_LANDING_PORT=4201
VITE_APP_USER_PROFILE_PORT=4202
VITE_APP_DASHBOARD_PORT=4203

# Unified Dev Server Port (all apps accessible through this port)
VITE_DEV_SERVER_PORT=3000

# Application URLs (for unified dev server)
# All apps are accessible through the unified server at http://localhost:3000
VITE_APP_AUTHENTICATION_URL=http://localhost:3000/authentication
VITE_APP_LANDING_URL=http://localhost:3000/landing
VITE_APP_USER_PROFILE_URL=http://localhost:3000/user-profile
VITE_APP_DASHBOARD_URL=http://localhost:3000/dashboard

# API Configuration
VITE_API_BASE_URL=https://api.example.com/dev/api
VITE_WEBSOCKET_URL=

# API Configuration
VITE_API_BASE_URL=https://your-api-url/api
VITE_WEBSOCKET_URL=https://your-ws-url/ws

# Support Email
VITE_APP_SUPPORT_EMAIL=your-email

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_TAG_ID=your-id
```

> **Note:** Check `env.local-example` in the root directory for a complete list of environment variables.

## 🛠️ Development

### Running Applications

#### Unified Development Server (Recommended)

Check [tools/dev-server/README.md](./tools/dev-server/README.md) for more details.

The recommended way to run all applications is using the unified development server, which runs all apps on the same domain (simulating production behavior):

```bash
pnpm dev:unified
```

This command:

1. Starts all apps on their internal ports (4200, 4201, 4202, 4203)
2. Starts a centralized proxy server on port 3000
3. Makes all apps accessible from a single domain:
   - `http://localhost:3000/` - Landing page with app cards and auto-redirect
   - `http://localhost:3000/authentication`
   - `http://localhost:3000/landing`
   - `http://localhost:3000/user-profile`
   - `http://localhost:3000/dashboard`

**Features:**

- ✅ **All apps on same domain** - No CORS issues
- ✅ **Simulates production** - Production-like environment
- ✅ **API proxy** - Automatic API request proxying
- ✅ **No CORS configuration needed** - Backend doesn't need CORS setup

#### Run a Single Application

If you prefer to work with a single app, you can run it individually:

```bash
# Authentication app
pnpm authentication

# Landing app
pnpm landing

# User Profile app
pnpm user-profile

# Dashboard app
pnpm dashboard
```

Each app will be available on its configured port:

- Authentication: `http://localhost:4200`
- Landing: `http://localhost:4201`
- User Profile: `http://localhost:4202`
- Dashboard: `http://localhost:4203`

**Note:** When running apps individually, they will be on different ports, which may cause CORS issues with API requests. It's recommended to use the unified dev server (`pnpm dev:unified`) for a better development experience.

> **📖 For detailed information about the development server, API proxy, environment variables, and development workflow, see the [Development Guide](./docs/DEVELOPMENT.md).**

## 🎯 Integrating a New Micro Frontend

> **📖 For a complete, detailed guide with step-by-step instructions, examples, and troubleshooting, see the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md).**

Each micro frontend in this architecture:

- Uses `@e-burgos/tucu-ui`'s `ThemeProvider` through the `ShellWrapper` component
- **Automatically uses MFE mode** - `ShellWrapper` always sets `architecturalPatterns="mfe"`
- Implements its own routing configuration using `IAppRouteConfig[]`
- Can be developed, built, and deployed independently
- Shares common libraries and utilities
- Supports route protection via `isAuthenticated` and `loginUrl` props

**Quick Start:**

1. Create app structure
2. Configure Vite and routes
3. Wrap with `ShellWrapper`
4. Add environment variables

See the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md) for detailed instructions, code examples, and best practices.

## 🏗️ Building

### Build All Applications

```bash
pnpm build
```

This builds all applications and libraries in the monorepo.

### Build Individual Applications

```bash
# Build specific app
pnpm build:authentication
pnpm build:landing
pnpm build:user-profile
pnpm build:dashboard
```

Build outputs are located in `dist/apps/<app-name>/`.

### Build Using Nx Directly

```bash
# Build a specific project
nx build authentication

# Build multiple projects
nx run-many --target=build --projects=authentication,user-profile
```

## 🧪 Testing

### Run Tests for All Applications

```bash
# Run all app tests
pnpm test:apps

# Run with coverage
pnpm test:apps:coverage

# Run in watch mode
pnpm test:apps:watch
```

### Run Tests for Individual Applications

```bash
# Run tests
pnpm test:authentication
pnpm test:landing
pnpm test:user-profile
pnpm test:dashboard

# Run with coverage
pnpm test:authentication:coverage
pnpm test:landing:coverage
pnpm test:user-profile:coverage
pnpm test:dashboard:coverage
```

### Using Nx for Testing

```bash
# Test a specific project
nx test authentication

# Test with coverage
nx test authentication --coverage
```

Test coverage reports are generated in `coverage/apps/<app-name>/`.

## 🔍 Linting

### Lint All Projects

```bash
pnpm lint
```

### Lint Applications Only

```bash
pnpm lint:apps
```

### Lint Libraries Only

```bash
pnpm lint:libs
```

### Lint Individual Applications

```bash
pnpm lint:authentication
pnpm lint:landing
pnpm lint:user-profile
pnpm lint:dashboard
```

### Using Nx for Linting

```bash
# Lint a specific project
nx lint authentication

# Lint multiple projects
nx run-many --target=lint --projects=authentication,user-profile
```

## 📊 Project Graph

Visualize the project dependency graph:

```bash
pnpm graph
# or
nx graph
```

This opens an interactive visualization of your project dependencies in the browser.

## 📝 Available Commands

### Development Commands

- `pnpm dev:unified` - Start all apps in unified mode (recommended - same domain, no CORS issues)
- `pnpm authentication` - Start authentication app in dev mode (port 4200)
- `pnpm landing` - Start landing app in dev mode (port 4201)
- `pnpm user-profile` - Start user-profile app in dev mode (port 4202)
- `pnpm dashboard` - Start dashboard app in dev mode (port 4203)

> **Note**: To add commands for a new app, see the [Integration Guide](./docs/INTEGRATION-GUIDE.md).

### Build Commands

- `pnpm build` - Build all projects
- `pnpm build:authentication` - Build authentication app
- `pnpm build:landing` - Build landing app
- `pnpm build:user-profile` - Build user-profile app
- `pnpm build:dashboard` - Build dashboard app

### Test Commands

- `pnpm test:apps` - Test all apps
- `pnpm test:apps:coverage` - Test all apps with coverage
- `pnpm test:apps:watch` - Test all apps in watch mode
- `pnpm test:authentication` - Test authentication app
- `pnpm test:landing` - Test landing app
- `pnpm test:user-profile` - Test user-profile app
- `pnpm test:dashboard` - Test dashboard app
- `pnpm test:authentication:coverage` - Test authentication with coverage
- `pnpm test:landing:coverage` - Test landing with coverage
- `pnpm test:user-profile:coverage` - Test user-profile with coverage
- `pnpm test:dashboard:coverage` - Test dashboard with coverage

### Lint Commands

- `pnpm lint` - Lint all projects
- `pnpm lint:apps` - Lint all apps
- `pnpm lint:libs` - Lint all libraries
- `pnpm lint:authentication` - Lint authentication app
- `pnpm lint:landing` - Lint landing app
- `pnpm lint:user-profile` - Lint user-profile app
- `pnpm lint:dashboard` - Lint dashboard app

### Utility Commands

- `pnpm graph` - Visualize project dependency graph

## 🏛️ Architecture

> **📖 For detailed architecture information, component hierarchy, and how MFE works internally, see the [Architecture Guide](./docs/ARCHITECTURE.md).**

### Technology Stack

- **Nx** - Monorepo tooling and build system
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (via `@e-burgos/tucu-ui`)
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management
- **@e-burgos/tucu-ui** - Design system and UI component library with built-in MFE support

### Architecture Overview

This project implements a **path-based Micro-Frontend architecture** where:

- Each app is deployed independently on its own path (`/authentication`, `/landing`, etc.)
- All apps share a unified orchestrator through `@e-burgos-mfe/shell`
- Tucu-UI's `ThemeProvider` supports MFE mode via `architecturalPatterns="mfe"`
- Apps can navigate between each other using full page reloads or in-app routing

### Key Features

- **Micro Frontend Architecture** - Independent, deployable applications
- **Path-based Routing** - Each app accessible via its own path
- **Unified Orchestration** - Shared `ShellWrapper` component for all apps
- **Tucu-UI MFE Support** - Built-in MFE mode in `ThemeProvider`
- **Shared Component Library** - Reusable UI components across apps
- **Type-Safe Imports** - TypeScript path mappings for clean imports
- **Independent Deployment** - Each app can be built and deployed separately

## 📁 Project Organization

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
├── dist/                    # Build outputs
└── coverage/                # Test coverage reports
```

## 🔧 Nx Commands

Since this is an Nx workspace, you can use Nx commands directly:

```bash
# Run any target for a project
nx <target> <project-name>

# Examples:
nx build authentication
nx test authentication
nx lint authentication
nx dev authentication

# Run multiple projects
nx run-many --target=build --all
nx run-many --target=test --projects=authentication,user-profile

# Show project details
nx show project authentication

# Generate code
nx generate @nx/react:component my-component --project=authentication
```

## 🚨 Troubleshooting

> **📖 For detailed troubleshooting guides, see:**
>
> - **[Integration Guide - Troubleshooting](./docs/INTEGRATION-GUIDE.md#troubleshooting)** - Issues specific to integrating new apps
> - **[Development Guide - Troubleshooting](./docs/DEVELOPMENT.md#troubleshooting)** - Development server and environment issues

### Common Issues

- **Port conflicts**: Update port in `.env.local` or stop the process using that port
- **CORS errors**: Use the unified dev server (`pnpm dev:unified`)
- **Build errors**: Clear Nx cache with `nx reset` and rebuild
- **Dependency issues**: Clean install with `rm -rf node_modules pnpm-lock.yaml && pnpm install`

## 📚 Additional Resources

### Documentation

**Guides:**

- **[Integration Guide](./docs/INTEGRATION-GUIDE.md)** - Complete step-by-step guide for integrating a new micro-frontend
- **[Development Guide](./docs/DEVELOPMENT.md)** - Development workflow, dev server, and environment setup
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - Architecture overview and how MFE works internally

### External Resources

- [Nx Documentation](https://nx.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tucu-UI Documentation](https://ui.estebanburgos.com.ar)

## 📊 Project Status

### Completed Features ✅

- ✅ **Micro Frontend Architecture** - Four independent applications (authentication, landing, user-profile, dashboard)
- ✅ **Shell Integration** - Complete integration with `@e-burgos/tucu-ui` through ShellWrapper
- ✅ **Unified Development Server** - All apps accessible on same domain with API proxy
- ✅ **Shared Libraries** - API client, auth security, shell wrapper, and utilities
- ✅ **Routing System** - Independent routing configuration for each app
- ✅ **TypeScript Configuration** - Type-safe imports across apps and libraries
- ✅ **Vite Configuration** - Optimized build configuration for all apps

### Architecture Highlights

- **Independent Deployment** - Each app can be built and deployed separately
- **Path-based Routing** - Each app deployed on its own path
- **Unified Orchestration** - `ShellWrapper` provides consistent integration
- **Tucu-UI MFE Support** - Built-in MFE mode in `ThemeProvider`
- **Code Sharing** - Shared libraries prevent code duplication
- **Development Experience** - Unified dev server eliminates CORS issues
- **Type Safety** - Full TypeScript support with path mappings

## 📄 License

MIT
