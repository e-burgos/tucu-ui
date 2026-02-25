# Skill: Tucu-UI Routing & Navigation

Complete guide to the routing and navigation system in `@e-burgos/tucu-ui`. Covers Standalone routing, Micro Frontend (MFE) routing, nested routes, dynamic routes, permission-based access, and navigation patterns.

> **Companion Skills**: See `tucu-ui` for overview, `tucu-ui-catalog` for component props, `tucu-ui-design-system` for layouts.
> **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## 1. Architecture Modes

`@e-burgos/tucu-ui` provides a complete routing system through `ThemeProvider`. The library uses `react-router-dom` internally — **you should never import or configure `react-router-dom` directly**.

Two modes are available:

| Mode           | Config                                                         | Use Case                        |
| -------------- | -------------------------------------------------------------- | ------------------------------- |
| **Standalone** | `menuItems` prop on `ThemeProvider`                            | Monolithic SPAs                 |
| **MFE**        | `architecturalPatterns="mfe"` + `basePath` + `appRoutesConfig` | Micro Frontend sub-applications |

---

## 2. Standalone Mode

The default mode. The application owns its full routing and navigation. Routes are defined as `menuItems` on `ThemeProvider`, which generates both the navigation UI and the router configuration.

### Basic Setup

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      showSettings
      logo={{ name: 'My', secondName: 'App' }}
      menuItems={[
        { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
        { name: 'Users', path: '/users', icon: <LucideIcons.Users />, component: <Users /> },
        { name: 'Settings', path: '/settings', icon: <LucideIcons.Settings />, component: <Settings /> },
      ]}
    />
  );
}
```

### `IMenuItem` Interface

```typescript
interface IMenuItem {
  name: string; // Display name in navigation
  path: string; // Route URL
  icon?: ReactNode; // Icon for sidebar/nav (use LucideIcons)
  component: ReactNode; // Component to render at this route
  href?: string; // External link (opens new tab)
  hide?: boolean; // Hide from nav but keep route active
  dropdownItems?: IMenuItem[]; // Nested sub-routes (accordion in sidebar)
  isActive?: boolean; // Force active state
  onClick?: () => void; // Custom click handler
}
```

### Hidden Routes

Use `hide: true` for routes that should be navigable but not shown in the sidebar/nav:

```tsx
const menuItems = [
  { name: 'Users', path: '/users', icon: <LucideIcons.Users />, component: <Users /> },
  // Accessible via URL, but hidden from navigation
  { name: 'User Detail', path: '/users/:id', component: <UserDetail />, hide: true },
  { name: 'Edit User', path: '/users/:id/edit', component: <EditUser />, hide: true },
];
```

### Custom Routes

For routes that don't belong in the main navigation at all, use `customRoutes`:

```tsx
<ThemeProvider
  menuItems={mainMenuItems}
  customRoutes={[
    { name: 'Callback', path: '/auth/callback', component: <AuthCallback />, hide: true },
    { name: 'Invite', path: '/invite/:token', component: <InvitePage />, hide: true },
  ]}
/>
```

---

## 3. Nested Routes & Dropdown Menus

Use `dropdownItems` to create sub-menus. In the Admin layout, these render as collapsible accordion sections in the sidebar.

```tsx
const menuItems = [
  { name: 'Dashboard', path: '/', icon: <LucideIcons.LayoutDashboard />, component: <Dashboard /> },
  {
    name: 'Tools',
    path: '/tools',
    icon: <LucideIcons.Wrench />,
    component: <ToolsIndex />,
    dropdownItems: [
      { name: 'Calculator', path: '/tools/calc', component: <Calculator />, icon: <LucideIcons.Calculator /> },
      { name: 'Converter', path: '/tools/converter', component: <Converter />, icon: <LucideIcons.RefreshCw /> },
      { name: 'Generator', path: '/tools/generator', component: <Generator />, icon: <LucideIcons.Wand2 /> },
    ],
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: <LucideIcons.BarChart3 />,
    component: <ReportsIndex />,
    dropdownItems: [
      { name: 'Sales', path: '/reports/sales', component: <SalesReport />, icon: <LucideIcons.DollarSign /> },
      { name: 'Analytics', path: '/reports/analytics', component: <Analytics />, icon: <LucideIcons.TrendingUp /> },
    ],
  },
];
```

---

## 4. Dynamic & Permission-Based Routes

For routes that depend on user state (roles, feature flags, authentication), define your menu items inside a hook with `useMemo`.

### Role-Based Menu

```tsx
import { useMemo } from 'react';
import { LucideIcons } from '@e-burgos/tucu-ui';

const useAppMenu = (userRole: 'admin' | 'editor' | 'viewer') => {
  return useMemo(() => {
    const baseRoutes = [
      { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
      { name: 'Profile', path: '/profile', icon: <LucideIcons.User />, component: <Profile /> },
    ];

    const editorRoutes = [
      { name: 'Content', path: '/content', icon: <LucideIcons.FileText />, component: <Content /> },
      { name: 'Media', path: '/media', icon: <LucideIcons.Image />, component: <MediaLibrary /> },
    ];

    const adminRoutes = [
      { name: 'Users', path: '/admin/users', icon: <LucideIcons.Users />, component: <AdminUsers /> },
      { name: 'Settings', path: '/admin/settings', icon: <LucideIcons.Settings />, component: <AdminSettings /> },
      { name: 'Logs', path: '/admin/logs', icon: <LucideIcons.ScrollText />, component: <AuditLogs /> },
    ];

    return [...baseRoutes, ...(userRole === 'editor' || userRole === 'admin' ? editorRoutes : []), ...(userRole === 'admin' ? adminRoutes : [])];
  }, [userRole]);
};

// Usage
function App() {
  const { user } = useAuth();
  const menuItems = useAppMenu(user.role);

  return <ThemeProvider showSettings menuItems={menuItems} />;
}
```

### Feature Flag Routes

```tsx
const useFeatureFlagMenu = (features: Record<string, boolean>) => {
  return useMemo(() => [{ name: 'Dashboard', path: '/', icon: <LucideIcons.Home />, component: <Dashboard /> }, ...(features.beta_reports ? [{ name: 'Reports (Beta)', path: '/reports', icon: <LucideIcons.BarChart3 />, component: <BetaReports /> }] : []), ...(features.ai_assistant ? [{ name: 'AI Assistant', path: '/ai', icon: <LucideIcons.Bot />, component: <AIAssistant /> }] : [])], [features]);
};
```

---

## 5. Micro Frontend (MFE) Mode

For applications that run as part of a larger system where a host/shell controls global navigation. The MFE only defines its own internal routes.

### Basic MFE Setup

```tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/dashboard"
      appRoutesConfig={[
        { key: 'home', path: '/', element: <DashboardHome />, isPublic: true },
        { key: 'analytics', path: '/analytics', element: <Analytics />, isPublic: false },
        { key: 'detail', path: '/item/:id', element: <ItemDetail />, isPublic: false },
      ]}
      isAuthenticated={isLoggedIn}
      loginUrl="/auth/login"
    />
  );
}
```

### `IAppRouteConfig` Interface

```typescript
interface IAppRouteConfig {
  key: string; // Unique route identifier
  path: string; // Path relative to basePath (e.g., '/' becomes '/dashboard/')
  element: ReactNode; // Component to render
  isPublic?: boolean; // true = no auth required, false = protected (default: false)
  disabled?: boolean; // Temporarily disable the route
}
```

### Key Differences from Standalone

| Feature          | Standalone                 | MFE                                          |
| ---------------- | -------------------------- | -------------------------------------------- |
| Navigation UI    | Generated from `menuItems` | Injected by host/shell                       |
| Route definition | `menuItems` array          | `appRoutesConfig` array                      |
| Base path        | `/` (root)                 | Custom `basePath` (e.g., `/dashboard`)       |
| Auth protection  | Optional per route         | Automatic via `isAuthenticated` + `loginUrl` |
| Layout control   | Via `ThemeProvider`        | Via `ThemeProvider` or host/shell            |
| Menu items       | Supported                  | **Not supported** (shell injects them)       |

### Protected Routes

In MFE mode, routes with `isPublic: false` (the default) are automatically protected. If `isAuthenticated` is `false`, the user is redirected to `loginUrl`.

```tsx
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/my-app"
  appRoutesConfig={[
    { key: 'login', path: '/login', element: <Login />, isPublic: true },
    { key: 'home', path: '/', element: <Home />, isPublic: false }, // Protected
    { key: 'settings', path: '/settings', element: <Settings /> }, // Protected (default)
  ]}
  isAuthenticated={user !== null}
  loginUrl="/my-app/login"
/>
```

### Disabled Routes

Temporarily disable routes without removing them:

```tsx
appRoutesConfig={[
  { key: 'home', path: '/', element: <Home /> },
  { key: 'experimental', path: '/experimental', element: <Experimental />, disabled: true },
]}
```

---

## 6. Navigation Components

### Links

| Component      | Props                                    | Description                              |
| -------------- | ---------------------------------------- | ---------------------------------------- |
| **AnchorLink** | Standard `Link` props                    | Auto-detects external URLs → `<a>`       |
| **ActiveLink** | `LinkProps` + `{activeClassName?, path}` | Adds active class based on current route |

```tsx
import { AnchorLink, ActiveLink } from '@e-burgos/tucu-ui';

// Internal link
<AnchorLink to="/users">Users</AnchorLink>

// External link (auto-detected, opens new tab)
<AnchorLink to="https://github.com">GitHub</AnchorLink>

// Link with active styling
<ActiveLink to="/dashboard" path="/dashboard" activeClassName="text-primary font-bold">
  Dashboard
</ActiveLink>
```

### Menu Item with External Links

```tsx
const menuItems = [
  { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
  { name: 'Documentation', path: '/docs', href: 'https://docs.example.com', icon: <LucideIcons.ExternalLink /> },
];
```

---

## 7. URL-Synced Tabs

For tab-based navigation that syncs with URL query parameters, use `ParamTab`:

```tsx
import { ParamTab } from '@e-burgos/tucu-ui';

const SettingsPage = () => (
  <ParamTab
    tabMenu={[
      { title: 'General', path: 'general', content: <GeneralSettings /> },
      { title: 'Security', path: 'security', content: <SecuritySettings /> },
      { title: 'Billing', path: 'billing', content: <BillingSettings /> },
    ]}
    variant="underline"
    size="medium"
    showMobileSelect
  />
);
// URL updates automatically: /settings?view=general, /settings?view=security, etc.
```

---

## 8. Route Configuration Properties Summary

### Standalone (`menuItems`)

| Property        | Type          | Required | Description                |
| --------------- | ------------- | -------- | -------------------------- |
| `name`          | `string`      | Yes      | Display name in navigation |
| `path`          | `string`      | Yes      | Route URL                  |
| `component`     | `ReactNode`   | Yes      | Component to render        |
| `icon`          | `ReactNode`   | No       | Icon for sidebar/nav       |
| `href`          | `string`      | No       | External link URL          |
| `hide`          | `boolean`     | No       | Hide from nav, keep route  |
| `dropdownItems` | `IMenuItem[]` | No       | Nested sub-routes          |
| `isActive`      | `boolean`     | No       | Force active state         |
| `onClick`       | `() => void`  | No       | Custom click handler       |

### MFE (`appRoutesConfig`)

| Property   | Type        | Required | Description                       |
| ---------- | ----------- | -------- | --------------------------------- |
| `key`      | `string`    | Yes      | Unique route ID                   |
| `path`     | `string`    | Yes      | Path relative to `basePath`       |
| `element`  | `ReactNode` | Yes      | Component to render               |
| `isPublic` | `boolean`   | No       | If false (default), requires auth |
| `disabled` | `boolean`   | No       | Temporarily disable the route     |

### ThemeProvider Routing Props

| Prop                    | Mode       | Type                | Description                            |
| ----------------------- | ---------- | ------------------- | -------------------------------------- |
| `menuItems`             | Standalone | `IMenuItem[]`       | Main navigation routes                 |
| `customRoutes`          | Standalone | `IMenuItem[]`       | Additional hidden routes               |
| `architecturalPatterns` | MFE        | `'mfe'`             | Enables MFE mode                       |
| `basePath`              | MFE        | `string`            | Base URL path for MFE                  |
| `appRoutesConfig`       | MFE        | `IAppRouteConfig[]` | Internal MFE routes                    |
| `isAuthenticated`       | MFE        | `boolean`           | Current auth state                     |
| `loginUrl`              | MFE        | `string`            | Redirect URL for unauthenticated users |

---

## 9. Agent Guidelines for Routing

1. **Never use `react-router-dom` directly** — always use `ThemeProvider` with `menuItems` (Standalone) or `appRoutesConfig` (MFE).
2. **Detect architecture first**: Ask whether the user is building Standalone or MFE before generating routing code.
3. **Use `LucideIcons` from `@e-burgos/tucu-ui`** for menu icons — don't install `lucide-react` separately.
4. **Dynamic menus in hooks**: For role/permission-based routes, always use `useMemo` in a custom hook.
5. **Use `hide: true`** for detail/edit routes that shouldn't appear in navigation.
6. **MFE routes are relative**: Paths in `appRoutesConfig` are relative to `basePath` — don't repeat the base path.
7. **Default is protected**: In MFE mode, routes are protected by default. Explicitly mark public routes with `isPublic: true`.
8. **ParamTab for tabbed navigation**: Use `ParamTab` instead of building custom tab-to-URL sync logic.
