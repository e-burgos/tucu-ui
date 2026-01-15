# Unified Development Server

Centralized development server that runs all micro-frontend applications on the same domain, simulating production behavior.

> **📖 For comprehensive development documentation, see the [Development Guide](../../docs/DEVELOPMENT.md).**

## Overview

The unified development server solves the problem of running micro-frontends on different ports by providing a single entry point that proxies requests to individual apps.

### Problem

Running apps individually on different ports doesn't reflect production behavior:

- `http://localhost:4200` (authentication)
- `http://localhost:4201` (landing)
- `http://localhost:4202` (user-profile)
- `http://localhost:4203` (dashboard)

### Solution

All apps accessible from a single domain:

- `http://localhost:3000/authentication`
- `http://localhost:3000/landing`
- `http://localhost:3000/user-profile`
- `http://localhost:3000/dashboard`

## Usage

### Start Unified Server

```bash
pnpm dev:unified
```

This command:

1. Starts all apps on their internal ports (4200, 4201, 4202, 4203)
2. Starts the centralized proxy server on port 3000
3. Makes all apps accessible from `http://localhost:3000/{app-path}`

### Landing Page

The unified server includes a landing page at `http://localhost:3000/` that:

- Displays all available micro-frontend applications
- Provides quick access to each app
- Automatically redirects to `/landing` after 60 seconds if no interaction

## How It Works

### Application Routing

The server acts as a reverse proxy, routing requests based on path:

- `/authentication/*` → `http://localhost:4200/authentication/*`
- `/landing/*` → `http://localhost:4201/landing/*`
- `/user-profile/*` → `http://localhost:4202/user-profile/*`
- `/dashboard/*` → `http://localhost:4203/dashboard/*`

### API Proxy

The server includes an API proxy that:

- Intercepts all requests to `/api/*`
- Forwards them to the API server configured in `VITE_API_BASE_URL`
- Eliminates CORS issues by making requests appear to come from `localhost:3000`

**Request Flow:**

```
Browser: POST http://localhost:3000/api/auth/phone-register
  ↓
Proxy: POST https://api.example.com/dev/api/auth/phone-register
  ↓
Response: (Same origin, no CORS)
```

**Configuration:**

- Proxy is automatically enabled when `VITE_APP_ENVIRONMENT=local`
- Target URL is extracted from `VITE_API_BASE_URL`
- Path rewriting removes `/api` prefix before forwarding

## Configuration

### Environment Variables

Required variables in `.env.local`:

```env
# Application Environment
VITE_APP_ENVIRONMENT=local

# Internal ports for each app
VITE_APP_AUTHENTICATION_PORT=4200
VITE_APP_LANDING_PORT=4201
VITE_APP_USER_PROFILE_PORT=4202
VITE_APP_DASHBOARD_PORT=4203

# Unified dev server port
VITE_DEV_SERVER_PORT=3000

# Application URLs (for unified server)
VITE_APP_AUTHENTICATION_URL=http://localhost:3000/authentication
VITE_APP_LANDING_URL=http://localhost:3000/landing
VITE_APP_USER_PROFILE_URL=http://localhost:3000/user-profile
VITE_APP_DASHBOARD_URL=http://localhost:3000/dashboard

# API Configuration
VITE_API_BASE_URL=https://api.example.com/dev/api
```

### Proxy Configuration

The proxy configuration is in `vite.config.ts`:

- App proxies: Routes requests to individual apps based on path
- API proxy: Routes `/api/*` requests to the configured API server
- WebSocket support: Proxies WebSocket connections for real-time features

## Files

- **`vite.config.ts`** - Vite configuration with proxy rules
- **`start-dev-server.mjs`** - Script that starts all apps and the unified server
- **`index.html`** - Landing page with app cards and navigation

## Troubleshooting

> **📖 For detailed troubleshooting, see the [Development Guide - Troubleshooting](../../docs/DEVELOPMENT.md#troubleshooting).**

### Apps Don't Load

1. Verify all apps are running on their internal ports (check console output)
2. Check server logs for connection errors
3. Ensure ports are not in use by other processes
4. Wait for all apps to finish starting before accessing them

### CORS Errors

The unified server automatically resolves CORS issues. If you still see errors:

1. Verify `VITE_APP_ENVIRONMENT=local` is set
2. Check that `VITE_API_BASE_URL` is correctly configured
3. Ensure you're using the unified server (`pnpm dev:unified`)

### API Requests Fail

1. Verify `VITE_API_BASE_URL` is correctly set in `.env.local`
2. Check API server accessibility
3. Review proxy logs in the dev server console
4. Ensure endpoint paths match expected format (e.g., `/api/auth/phone-register`)

## Notes

- All apps must be running for the unified server to work correctly
- Press `Ctrl+C` to stop all servers
- API proxy only works in local development mode
- The landing page at root (`/`) provides visual navigation to all apps

## Additional Resources

- **[Development Guide](../../docs/DEVELOPMENT.md)** - Complete development workflow documentation
- **[Integration Guide](../../docs/INTEGRATION-GUIDE.md)** - How to integrate new apps with the dev server
- **[Architecture Guide](../../docs/ARCHITECTURE.md)** - Architecture overview

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-13
