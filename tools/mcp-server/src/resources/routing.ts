// ─── Resource: Routing & Navigation ─────────────────────────────────────────

export function getRoutingContent(): string {
  return `# Routing & Navigation — @e-burgos/tucu-ui

## Architecture Modes
| Mode | Config | Use Case |
|------|--------|----------|
| Standalone | \`menuItems\` prop on ThemeProvider | Monolithic SPAs |
| MFE | \`architecturalPatterns="mfe"\` + \`basePath\` + \`appRoutesConfig\` | Micro Frontend sub-apps |

## CRITICAL RULE
- ALWAYS use \`ReactRouter\` from \`@e-burgos/tucu-ui\` for hooks
- NEVER import directly from \`react-router-dom\`
\`\`\`tsx
import { ReactRouter } from '@e-burgos/tucu-ui';
const navigate = ReactRouter.useNavigate();
\`\`\`

## Standalone Mode

### Basic Setup
\`\`\`tsx
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
\`\`\`

### IMenuItem Interface
\`\`\`typescript
interface IMenuItem {
  name: string;              // Display name
  path: string;              // Route URL
  icon?: ReactNode;          // Icon (use LucideIcons)
  component: ReactNode;      // Component to render
  href?: string;             // External link
  hide?: boolean;            // Hide from nav, keep route
  dropdownItems?: IMenuItem[]; // Nested sub-routes
  enableNestedRoutes?: boolean; // Wildcard path (path/*)
  isActive?: boolean;
  onClick?: () => void;
}
\`\`\`

### Hidden Routes
\`\`\`tsx
const menuItems = [
  { name: 'Users', path: '/users', icon: <LucideIcons.Users />, component: <Users /> },
  { name: 'User Detail', path: '/users/:id', component: <UserDetail />, hide: true },
];
\`\`\`

### Custom Routes (outside navigation)
\`\`\`tsx
<ThemeProvider
  menuItems={mainMenuItems}
  customRoutes={[
    { name: 'Callback', path: '/auth/callback', component: <AuthCallback />, hide: true },
  ]}
/>
\`\`\`

## Nested Routes & Dropdown Menus
\`\`\`tsx
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
    ],
  },
];
\`\`\`

## MFE Mode
\`\`\`tsx
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
\`\`\`

## Dynamic & Role-Based Routes
\`\`\`tsx
const useAppMenu = (userRole: 'admin' | 'editor' | 'viewer') => {
  return useMemo(() => {
    const baseRoutes = [
      { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
    ];
    const adminRoutes = [
      { name: 'Users', path: '/admin/users', icon: <LucideIcons.Users />, component: <AdminUsers /> },
    ];
    return [...baseRoutes, ...(userRole === 'admin' ? adminRoutes : [])];
  }, [userRole]);
};
\`\`\`
`;
}
