# Development Guide

Complete guide for developing with the standalone application and understanding the development workflow.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running the Application](#running-the-application)
3. [Development Workflow](#development-workflow)
4. [Environment Variables](#environment-variables)
5. [Working with Dependencies](#working-with-dependencies)
6. [Hot Module Replacement](#hot-module-replacement)
7. [Building for Production](#building-for-production)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v8 or higher) - Package manager
- **Git**

### Installation

Since this is a standalone application (not part of the root workspace), you need to install dependencies locally:

```bash
# Install dependencies (use --ignore-workspace to install locally)
pnpm install --ignore-workspace

# Or use the convenience script
pnpm run install:local
```

**Note:** The `--ignore-workspace` flag ensures dependencies are installed locally in this directory, not from the root workspace. The `.npmrc` file is configured to help with this, but the flag is still required for the initial installation.

---

## Running the Application

### Development Server

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:4200` (or the port specified in `VITE_APP_PORT`).

### Development Server Features

- ✅ **Fast HMR** - Hot Module Replacement for instant updates
- ✅ **Fast Refresh** - React Fast Refresh preserves component state
- ✅ **TypeScript Support** - Full TypeScript support with type checking
- ✅ **Source Maps** - Debug with original source code
- ✅ **Auto-reload** - Browser automatically refreshes on changes

### Port Configuration

You can configure the port via environment variable:

```env
VITE_APP_PORT=4200
```

Or directly in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 4200,
  },
});
```

---

## Development Workflow

### Project Structure

```
standalone/
├── src/
│   ├── app.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── pages/                  # Page components
│   ├── router/                 # Route configuration
│   ├── components/             # Reusable components
│   ├── hooks/                  # Custom hooks
│   ├── queries/                # React Query setup
│   └── store/                  # State management
├── public/                     # Static assets
└── index.html                  # HTML template
```

### Adding a New Page

1. **Create the page component:**

```typescript
// src/pages/my-page.tsx
import { CardContainer, Typography } from '@e-burgos/tucu-ui';

const MyPage = () => {
  return (
    <CardContainer>
      <Typography tag="h1">My Page</Typography>
    </CardContainer>
  );
};

export default MyPage;
```

2. **Add lazy-loaded entry point:**

```typescript
// src/router/entry-points.tsx
const MyPage = lazy(() => import('../pages/my-page'));

export const MyPageComponent: React.FC = (props) => (
  <MyPage {...props} />
);
```

3. **Add route to configuration:**

```typescript
// src/router/routes-config.tsx
import { MyPageComponent } from './entry-points';

const menuItems: StandaloneAppRoutesMenuItem[] = [
  // ... existing routes
  {
    name: 'My Page',
    path: '/my-page',
    icon: <LucideIcons.FileText size={24} />,
    component: <MyPageComponent />,
    isPublic: true,
  },
];
```

### Adding a New Component

1. **Create the component:**

```typescript
// src/components/my-component.tsx
import { Button } from '@e-burgos/tucu-ui';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return (
    <Button onClick={onClick}>
      {title}
    </Button>
  );
};
```

2. **Use it in your pages:**

```typescript
import { MyComponent } from '../components/my-component';

const MyPage = () => {
  return (
    <MyComponent
      title="Click me"
      onClick={() => console.log('Clicked!')}
    />
  );
};
```

### Adding a New Hook

1. **Create the hook:**

```typescript
// src/hooks/use-my-hook.ts
import { useState, useEffect } from 'react';

export const useMyHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Hook logic
  }, []);

  return { value, setValue };
};
```

2. **Use it in your components:**

```typescript
import { useMyHook } from '../hooks/use-my-hook';

const MyComponent = () => {
  const { value, setValue } = useMyHook('initial');

  return <div>{value}</div>;
};
```

### Adding React Query Queries

1. **Create the query:**

```typescript
// src/queries/use-my-query.ts
import { useQuery } from '@tanstack/react-query';

export const useMyQuery = () => {
  return useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const response = await fetch('/api/my-data');
      return response.json();
    },
  });
};
```

2. **Use it in your components:**

```typescript
import { useMyQuery } from '../queries/use-my-query';

const MyComponent = () => {
  const { data, isLoading, error } = useMyQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
};
```

---

## Environment Variables

### Required Variables

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

### Environment Variable Usage

Access environment variables in your code:

```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appPort = import.meta.env.VITE_APP_PORT;
```

**Note:** Only variables prefixed with `VITE_` are exposed to the client code.

### Environment-Specific Configuration

You can create environment-specific files:

- `.env` - Default (loaded in all cases)
- `.env.local` - Local overrides (loaded in all cases, ignored by git)
- `.env.development` - Development only
- `.env.production` - Production only

---

## Working with Dependencies

### Installing Dependencies

Since this is a standalone app, install dependencies locally:

```bash
# Install a production dependency
pnpm add <package-name>

# Install a development dependency
pnpm add -D <package-name>
```

**Important:** Always use `--ignore-workspace` if you're in a workspace context, or ensure you're in the standalone directory.

### Updating Dependencies

```bash
# Update all dependencies
pnpm update

# Update a specific package
pnpm update <package-name>
```

### Using Tucu-UI Components

Import components from `@e-burgos/tucu-ui`:

```typescript
import {
  Button,
  CardContainer,
  Typography,
  ThemeProvider,
  LAYOUT_OPTIONS,
  LucideIcons,
  ReactRouter,
} from '@e-burgos/tucu-ui';
```

### Type Imports

Import types from `@e-burgos/tucu-ui`:

```typescript
import {
  type StandaloneAppRoutesMenuItem,
  type IMenuItem,
} from '@e-burgos/tucu-ui';
```

---

## Hot Module Replacement

Vite provides Hot Module Replacement (HMR) for fast development:

- **Instant Updates**: Changes to components are reflected immediately
- **State Preservation**: Component state is preserved during updates
- **Fast Refresh**: React Fast Refresh is enabled by default

### HMR Configuration

HMR is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    hmr: {
      overlay: true, // Show error overlay
    },
  },
});
```

### HMR Best Practices

1. **Component Updates**: Changes to components update instantly
2. **State Preservation**: Component state is preserved (unless you unmount)
3. **Error Overlay**: Errors are shown in an overlay (can be disabled)
4. **Fast Refresh**: React Fast Refresh handles component updates

---

## Building for Production

### Build Command

Build the application for production:

```bash
pnpm build
```

This will:

1. Type-check the code with TypeScript
2. Bundle the application with Vite
3. Optimize assets (minification, tree-shaking)
4. Generate source maps (if enabled)
5. Output to `dist/` directory

### Build Output

The build output is in the `dist/` directory:

```
dist/
├── index.html          # HTML entry point
├── assets/
│   ├── index-[hash].js # JavaScript bundle
│   └── index-[hash].css # CSS bundle
└── favicon.svg         # Static assets
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

This starts a local server serving the `dist/` directory, simulating production.

### Build Configuration

Customize the build in `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps
    minify: 'terser', // Minification
    rollupOptions: {
      output: {
        manualChunks: {
          // Code splitting configuration
        },
      },
    },
  },
});
```

---

## Troubleshooting

### Port Already in Use

If you encounter port conflicts:

1. Update the port in your `.env` file:
   ```env
   VITE_APP_PORT=4201
   ```

2. Or stop the process using that port:
   ```bash
   # Find process using port
   lsof -i :4200

   # Kill process
   kill -9 <PID>
   ```

### Dependencies Not Installing

If dependencies fail to install:

1. **Clear cache:**
   ```bash
   pnpm store prune
   ```

2. **Delete and reinstall:**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install --ignore-workspace
   ```

3. **Check Node version:**
   ```bash
   node --version  # Should be v18 or higher
   ```

### Build Errors

If build fails:

1. **Check TypeScript errors:**
   ```bash
   pnpm run build
   ```

2. **Verify all imports are correct:**
   - Check that all imports from `@e-burgos/tucu-ui` are valid
   - Ensure all local imports use correct paths

3. **Check for circular dependencies:**
   - Review import statements
   - Ensure no circular imports

### Styles Not Loading

If styles don't load:

1. **Verify styles import:**
   ```typescript
   // src/main.tsx
   import './assets/styles.css';
   ```

2. **Check styles.css:**
   ```css
   /* src/assets/styles.css */
   @import '@e-burgos/tucu-ui/styles';
   ```

3. **Verify Tailwind configuration:**
   - Tailwind is configured via `@e-burgos/tucu-ui`
   - No additional configuration needed

### HMR Not Working

If Hot Module Replacement doesn't work:

1. **Check Vite configuration:**
   ```typescript
   server: {
     hmr: true, // Should be enabled
   }
   ```

2. **Restart dev server:**
   ```bash
   # Stop and restart
   pnpm dev
   ```

3. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### TypeScript Errors

If TypeScript shows errors:

1. **Check tsconfig.json:**
   - Ensure paths are correctly configured
   - Verify types are included

2. **Restart TypeScript server:**
   - In VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

3. **Verify imports:**
   - Check that all type imports use `type` keyword when needed

---

## Additional Resources

- **[Integration Guide](./INTEGRATION-GUIDE.md)** - Step-by-step guide for integrating a new standalone application
- **[Architecture Guide](./ARCHITECTURE.md)** - Architecture overview and how standalone works internally
- [Vite Documentation](https://vitejs.dev) - Official Vite documentation
- [React Documentation](https://react.dev) - Official React documentation
- [Tucu-UI Documentation](https://tucu-ui.netlify.app) - Official Tucu-UI documentation

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
