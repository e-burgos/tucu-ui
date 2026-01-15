# Development Guide

Complete guide for developing with the unified development server and understanding the development workflow.

## Table of Contents

1. [Unified Development Server](#unified-development-server)
2. [Running Applications](#running-applications)
3. [How the Dev Server Works](#how-the-dev-server-works)
4. [API Proxy Configuration](#api-proxy-configuration)
5. [Environment Variables](#environment-variables)
6. [Working with Libraries](#working-with-libraries)
7. [Hot Module Replacement](#hot-module-replacement)

---

## Unified Development Server

The unified development server is the recommended way to run all applications during development. It solves the problem of running micro-frontends on different ports, which doesn't reflect production behavior where all apps are on the same domain.

### Starting the Unified Dev Server

```bash
pnpm dev:unified
```

This command:

1. Starts all apps on their internal ports (4200, 4201, 4202, 4203)
2. Starts a centralized proxy server on port 3000
3. Makes all apps accessible from a single domain:
   - `http://localhost:3000/` - Landing page with app cards
   - `http://localhost:3000/authentication`
   - `http://localhost:3000/landing`
   - `http://localhost:3000/user-profile`
   - `http://localhost:3000/dashboard`

### Benefits

- ✅ **All apps on same domain** - No CORS issues
- ✅ **Simulates production** - Production-like environment
- ✅ **API proxy** - Automatic API request proxying
- ✅ **No CORS configuration needed** - Backend doesn't need CORS setup

For more details, see [tools/dev-server/README.md](../tools/dev-server/README.md).

---

## Running Applications

### Unified Mode (Recommended)

```bash
pnpm dev:unified
```

All apps accessible through `http://localhost:3000/{app-path}`.

### Individual Apps

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

---

## How the Dev Server Works

### Application Routing

1. **Proxy Server**: The server on port 3000 acts as a reverse proxy
2. **Individual Apps**: Each app runs on its internal port (4200-4203)
3. **Routing**: The proxy redirects requests based on the path:
   - `/authentication/*` → `http://localhost:4200/authentication/*`
   - `/landing/*` → `http://localhost:4201/landing/*`
   - `/user-profile/*` → `http://localhost:4202/user-profile/*`
   - `/dashboard/*` → `http://localhost:4203/dashboard/*`

### Request Flow

```
Browser Request:
GET http://localhost:3000/landing/page-1

↓ (Intercepted by Vite proxy)

Proxy Forwards:
GET http://localhost:4201/landing/page-1

↓ (Landing app responds)

Response returned to browser:
(HTML, CSS, JS from landing app)
```

---

## API Proxy Configuration

The unified server includes an API proxy that handles all API requests, solving CORS issues automatically.

### How API Requests Work

1. **Client-Side Configuration**:
   - In local development, applications use relative paths: `/api` instead of full URLs
   - This is configured in `libs/utils/src/constants.ts`:
     ```typescript
     export const API_BASE_URL = isLocal ? '/api' : apiBaseUrlFromEnv;
     export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
     ```

2. **Proxy Configuration**:
   - The unified dev server intercepts all requests to `/api/*`
   - The proxy forwards them to the actual API server configured in `VITE_API_BASE_URL`
   - Requests appear to come from `localhost:3000`, eliminating CORS issues

3. **Request Flow Example**:

   ```
   Browser Request:
   POST http://localhost:3000/api/auth/phone-register

   ↓ (Intercepted by Vite proxy)

   Proxy Forwards:
   POST https://api.example.com/dev/api/auth/phone-register

   ↓ (API Server Response)

   Response returned to browser:
   (Same origin, no CORS issues)
   ```

4. **Benefits**:
   - **No CORS Issues**: All requests appear to come from `localhost:3000`
   - **Consistent URLs**: Applications use `/api` paths that work in both development and production
   - **Automatic Routing**: The proxy automatically handles translation from local paths to remote API URLs
   - **Environment-Aware**: In production, apps use full URLs directly (no proxy needed)

---

## Environment Variables

### Required Variables

Create a `.env.local` file in the root directory:

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

# Support Email
VITE_APP_SUPPORT_EMAIL=your-email

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_TAG_ID=your-id
```

> **Note:** Check `env.local-example` in the root directory for a complete list of environment variables.

---

## Working with Libraries

Libraries are automatically available to applications through TypeScript path mappings defined in `tsconfig.base.json`. You can import them using:

```typescript
import { Component } from '@e-burgos/tucu-ui';
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
```

### Available Libraries

- **`@e-burgos/tucu-ui`** - Design system and UI component library
- **`@e-burgos-mfe/utils`** - Utility functions, route constants, and shared constants
- **`@e-burgos-mfe/shell`** - Shell wrapper and layout components
- **`@e-burgos-mfe/api`** - API client and React Query integration
- **`@e-burgos-mfe/auth-security`** - Authentication and security components

---

## Hot Module Replacement

Vite provides Hot Module Replacement (HMR) for fast development:

- **Instant Updates**: Changes to components are reflected immediately
- **State Preservation**: Component state is preserved during updates
- **Fast Refresh**: React Fast Refresh is enabled by default

### HMR Configuration

HMR is configured in each app's `vite.config.ts` via the base configuration:

```typescript
// Automatically configured in vite-base-config.ts
server: {
  hmr: {
    overlay: false,
    protocol: 'ws',
    host: 'localhost',
    clientPort: devServerPort,
  },
}
```

---

## Troubleshooting

### Port Already in Use

If you encounter port conflicts:

1. Update the port in your `.env.local` file
2. Or stop the process using that port:

   ```bash
   # Find process using port
   lsof -i :3000

   # Kill process
   kill -9 <PID>
   ```

### CORS Errors

If you see CORS errors when making API requests:

1. **Use the unified dev server**: Run `pnpm dev:unified` instead of running apps individually
2. **Verify API configuration**: Ensure `VITE_API_BASE_URL` is set correctly in `.env.local`
3. **Check environment**: Make sure `VITE_APP_ENVIRONMENT=local` is set
4. **Restart the server**: The API proxy is only active in local development mode

### API Requests Fail

If API requests are failing:

1. Verify `VITE_API_BASE_URL` is correctly configured in `.env.local`
2. Check that the API server is accessible from your network
3. Review the proxy logs in the dev server console
4. Ensure the API endpoint path matches the expected format (e.g., `/api/auth/phone-register`)
5. Make sure you're using the unified dev server (`pnpm dev:unified`)

### Apps Don't Load in Unified Mode

If apps don't load correctly when using `pnpm dev:unified`:

1. Verify that all apps are running on their internal ports (check the console output)
2. Check server logs for connection errors
3. Make sure ports are not being used by other processes
4. Ensure all apps have finished starting before accessing them

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
