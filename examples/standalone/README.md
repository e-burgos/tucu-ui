# Tucu UI Standalone Application

A standalone Vite + React + TypeScript + Tailwind application built with `@e-burgos/tucu-ui`. This project demonstrates the standalone application architecture pattern, where all routes are in a single application with automatic route generation from menu items.

> **🚀 New to this project?** Start with the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md) for a comprehensive step-by-step guide, or check the [Quick Integration Guide](#-integrating-a-new-standalone-application) below for a quick reference.

## Features

- ⚡️ **Vite** - Fast development and optimized builds
- ⚛️ **React 19** - Latest React with modern features
- 📘 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🔄 **TanStack Query** - Powerful data synchronization
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🎯 **Tucu-UI Integration** - Built-in standalone mode in `ThemeProvider`

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v8 or higher) - Package manager
- **Git**

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies (use --ignore-workspace to install locally)
pnpm install --ignore-workspace

# Or use the convenience script
pnpm run install:local
```

**Note:** Since this app is independent and not part of the root workspace, you need to use the `--ignore-workspace` flag to ensure dependencies are installed locally in this directory. The `.npmrc` file is configured to help with this, but the flag is still required for the initial installation.

### Development

```bash
# Start development server
pnpm dev
```

The app will be available at `http://localhost:4200` (or the port specified in `VITE_APP_PORT`).

> **📖 For detailed information about the development server, environment variables, and development workflow, see the [Development Guide](./docs/DEVELOPMENT.md).**

### Build

```bash
# Build for production
pnpm build
```

### Preview

```bash
# Preview production build
pnpm preview
```

## Project Structure

```
standalone/
├── src/
│   ├── assets/          # Static assets and styles
│   ├── pages/           # Page components
│   ├── router/          # Routing configuration
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # State management (Zustand)
│   ├── queries/         # TanStack Query hooks
│   ├── app.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Public assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Integrating a New Standalone Application

> **📖 For a complete, detailed guide with step-by-step instructions, examples, and troubleshooting, see the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md).**

A standalone application in this architecture:

- Uses `@e-burgos/tucu-ui`'s `ThemeProvider` directly (no wrapper needed)
- **Automatically uses standalone mode** - `ThemeProvider` defaults to `architecturalPatterns="standalone"`
- Implements routing using `StandaloneAppRoutesMenuItem[]` in `menuItems`
- Routes are automatically generated from menu items
- All routes are in a single application
- Supports route protection via `isAuthenticated` and `loginUrl` props

**Quick Start:**

1. Create app structure
2. Configure routes with `menuItems`
3. Wrap with `ThemeProvider`
4. Set up environment variables

See the [Complete Integration Guide](./docs/INTEGRATION-GUIDE.md) for detailed instructions, code examples, and best practices.

## 🏗️ Building

### Build for Production

```bash
pnpm build
```

This builds the application for production. Build outputs are located in `dist/`.

### Preview Production Build

```bash
pnpm preview
```

This starts a local server serving the `dist/` directory, simulating production.

## 🧪 Testing

### Run Tests

```bash
# Run tests (if configured)
pnpm test

# Run with coverage
pnpm test:coverage
```

## 🔍 Linting

### Lint Code

```bash
pnpm lint
```

## 📝 Available Commands

### Development Commands

- `pnpm dev` - Start development server
- `pnpm install:local` - Install dependencies locally (ignores workspace)

### Build Commands

- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Lint Commands

- `pnpm lint` - Lint code with ESLint

## 🏛️ Architecture

> **📖 For detailed architecture information, component hierarchy, and how standalone works internally, see the [Architecture Guide](./docs/ARCHITECTURE.md).**

### Technology Stack

- **Vite** - Build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework (via `@e-burgos/tucu-ui`)
- **React Query** - Data fetching and state management
- **Zustand** - Lightweight state management
- **@e-burgos/tucu-ui** - Design system and UI component library with built-in standalone support

### Architecture Overview

This project implements a **standalone application architecture** where:

- All routes are in a single application (no micro-frontends)
- Routes are automatically generated from `menuItems` configuration
- Tucu-UI's `ThemeProvider` supports standalone mode by default
- Navigation is handled by React Router within the same application
- Route protection is built-in via `isAuthenticated` and `loginUrl` props

### Key Features

- **Standalone Application** - Single application with all routes
- **Menu-Driven Routing** - Routes automatically generated from menu items
- **Tucu-UI Standalone Support** - Built-in standalone mode in `ThemeProvider`
- **Automatic Route Generation** - No need to manually configure routes
- **Shared Component Library** - Reusable UI components from Tucu-UI
- **Type-Safe Configuration** - TypeScript ensures correct route configuration
- **Hot Module Replacement** - Fast development with Vite HMR
- **Code Splitting** - Lazy loading for better performance
- **Route Protection** - Built-in support for public/private routes

## 📁 Project Organization

```
standalone/
├── src/
│   ├── assets/          # Static assets and styles
│   ├── pages/           # Page components
│   ├── router/          # Routing configuration
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # State management (Zustand)
│   ├── queries/         # TanStack Query hooks
│   ├── app.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Public assets
├── docs/                # Documentation
│   ├── INTEGRATION-GUIDE.md
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT.md
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application Port
VITE_APP_PORT=4200

# Application Environment
VITE_APP_ENVIRONMENT=local

# API Configuration
VITE_API_BASE_URL=https://api.example.com/api
VITE_WEBSOCKET_URL=

# Support Email
VITE_APP_SUPPORT_EMAIL=your-email

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_TAG_ID=your-id
```

> **Note:** Only variables prefixed with `VITE_` are exposed to the client code.

## 🚨 Troubleshooting

> **📖 For detailed troubleshooting guides, see:**
>
> - **[Integration Guide - Troubleshooting](./docs/INTEGRATION-GUIDE.md#troubleshooting)** - Issues specific to integrating new features
> - **[Development Guide - Troubleshooting](./docs/DEVELOPMENT.md#troubleshooting)** - Development server and environment issues

### Common Issues

- **Port conflicts**: Update port in `.env` or stop the process using that port
- **Dependencies not installing**: Use `--ignore-workspace` flag or `pnpm install:local`
- **Build errors**: Check TypeScript errors and verify all imports are correct
- **Styles not loading**: Verify `@e-burgos/tucu-ui/styles` is imported in `styles.css`

## 📚 Additional Resources

### Documentation

**Guides:**

- **[Integration Guide](./docs/INTEGRATION-GUIDE.md)** - Complete step-by-step guide for integrating a new standalone application
- **[Development Guide](./docs/DEVELOPMENT.md)** - Development workflow, dev server, and environment setup
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - Architecture overview and how standalone works internally

### External Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tucu-UI Documentation](https://tucu-ui.netlify.app)

## 📊 Project Status

### Completed Features ✅

- ✅ **Standalone Application Architecture** - Single application with all routes
- ✅ **ThemeProvider Integration** - Complete integration with `@e-burgos/tucu-ui`
- ✅ **Automatic Route Generation** - Routes generated from menu items
- ✅ **Route Protection** - Built-in support for public/private routes
- ✅ **TypeScript Configuration** - Type-safe development
- ✅ **Vite Configuration** - Optimized build configuration
- ✅ **React Query Setup** - Data fetching integration
- ✅ **State Management** - Zustand store setup

### Architecture Highlights

- **Single Application** - All routes in one application
- **Menu-Driven Routing** - Routes automatically generated from menu items
- **Tucu-UI Standalone Support** - Built-in standalone mode in `ThemeProvider`
- **Code Splitting** - Lazy loading for better performance
- **Development Experience** - Fast HMR with Vite
- **Type Safety** - Full TypeScript support

## 🔄 Differences from Micro-Frontend Architecture

This app is a standalone version that:

- ✅ Does not depend on Nx
- ✅ Has its own `package.json` with all dependencies
- ✅ Uses simplified Vite configuration (no Nx plugins)
- ✅ Maintains the same folder structure and patterns
- ✅ Can be used independently or integrated into other projects
- ✅ Uses `ThemeProvider` directly (no `ShellWrapper`)
- ✅ Routes are generated from `menuItems` (not `appRoutesConfig`)
- ✅ No `basePath` needed (uses root `/`)

## 📄 License

MIT
