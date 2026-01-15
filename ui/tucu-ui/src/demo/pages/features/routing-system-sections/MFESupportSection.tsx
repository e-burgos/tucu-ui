import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
} from '../../../../index';

const MFESupportSection: React.FC = () => {
  const mfeRouteConfig = `interface IAppRouteConfig extends RouteProps {
  key: string;           // Unique identifier for the route
  isPublic?: boolean;    // Whether the route is publicly accessible
  disabled?: boolean;    // Whether the route is disabled
  element: JSX.Element;  // The component to render
}`;

  const conditionalTyping = `// Conditional TypeScript Types
// The ThemeProvider automatically infers the correct props based on architecturalPatterns

// MFE Pattern
type MfeThemeProviderProps = MfeAppThemeProviderProps & {
  architecturalPatterns: 'mfe';
};

// TypeScript enforces required props for MFE mode
// basePath and appRoutesConfig are required when architecturalPatterns="mfe"`;

  const mfeBasicUsage = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

const appRoutesConfig: IAppRouteConfig[] = [
  {
    key: 'home',
    path: '/',
    element: <HomePage />,
    isPublic: true, // Public route, no authentication required
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    isPublic: false, // Private route, requires authentication
  },
  {
    key: 'profile',
    path: '/profile',
    element: <ProfilePage />,
    isPublic: false,
  },
];

function MfeApp() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"  // Activates MFE mode
      basePath="/my-app"           // Base path for the micro frontend
      appRoutesConfig={appRoutesConfig}  // Required for MFE
      logo={{ name: 'My', secondName: 'App' }}
      showSettings
    />
  );
}`;

  const mfeAdvancedUsage = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

const appRoutesConfig: IAppRouteConfig[] = [
  // Public routes (accessible without authentication)
  {
    key: 'login',
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
  },
  {
    key: 'register',
    path: '/register',
    element: <RegisterPage />,
    isPublic: true,
  },
  
  // Private routes (require authentication)
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    isPublic: false,
  },
  {
    key: 'settings',
    path: '/settings',
    element: <SettingsPage />,
    isPublic: false,
  },
  
  // Disabled routes (temporarily unavailable)
  {
    key: 'beta-feature',
    path: '/beta',
    element: <BetaFeaturePage />,
    disabled: true,
  },
];

function MfeApp() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/mfe-app"
      appRoutesConfig={appRoutesConfig}
      logo={{ name: 'MFE', secondName: 'App' }}
      showSettings
      // Note: menuItems and customRoutes are NOT allowed in MFE mode
      // TypeScript will show an error if you try to use them
    />
  );
}`;

  const typeSafetyExample = `// ✅ Correct - MFE Pattern with required props
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/app"
  appRoutesConfig={[...]}
/>

// ❌ Error - MFE Pattern without required props
<ThemeProvider
  architecturalPatterns="mfe"
  // TypeScript Error: Property 'basePath' is missing
  // TypeScript Error: Property 'appRoutesConfig' is missing
/>

// ❌ Error - Mixing MFE with Standalone App props
<ThemeProvider
  architecturalPatterns="mfe"
  menuItems={[...]}  // Error: Property does not exist on MFE type
  basePath="/app"
  appRoutesConfig={[...]}
/>`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Micro Frontends (MFE) Support" className="mt-2 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 shadow-lg">
                <LucideIcons.Box className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h4" className="font-semibold">
                Micro Frontend (MFE) Pattern
              </Typography>
            </div>

            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The <strong>Micro Frontend (MFE) Pattern</strong> is designed for
              distributed architectures where multiple applications need to be
              deployed independently. It requires explicit route configuration
              with{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                appRoutesConfig
              </code>{' '}
              and a{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                basePath
              </code>
              . Perfect for micro frontend architectures that need route
              isolation, authentication boundaries, and independent deployments.
            </Typography>

            <Alert variant="info" dismissible={false}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LucideIcons.Info className="w-4 h-4" />
                  <Typography tag="span" className="font-semibold">
                    MFE Mode Requirements
                  </Typography>
                </div>
                <Typography tag="p" className="text-sm">
                  When using{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    architecturalPatterns="mfe"
                  </code>
                  , you must provide{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    basePath
                  </code>{' '}
                  and{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    appRoutesConfig
                  </code>
                  . TypeScript will enforce these requirements at compile time.
                </Typography>
              </div>
            </Alert>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Conditional TypeScript Types
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  The ThemeProvider uses discriminated unions to automatically
                  enforce the correct props based on{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    architecturalPatterns
                  </code>
                  . When set to "mfe", TypeScript requires MFE-specific props.
                </Typography>
                <CodeBlock language="typescript" code={conditionalTyping} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 shadow-lg">
                    <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    IAppRouteConfig Interface
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  MFE pattern uses the{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    IAppRouteConfig
                  </code>{' '}
                  interface for explicit route configuration with access control
                  and route management.
                </Typography>
                <CodeBlock language="typescript" code={mfeRouteConfig} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                    <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Basic MFE Usage
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Set{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    architecturalPatterns="mfe"
                  </code>{' '}
                  to activate MFE mode. TypeScript will require{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    basePath
                  </code>{' '}
                  and{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    appRoutesConfig
                  </code>
                  .
                </Typography>
                <CodeBlock language="tsx" code={mfeBasicUsage} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 shadow-lg">
                    <LucideIcons.Zap className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Advanced: Public/Private Routes
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  MFE pattern automatically handles authentication for private
                  routes. Use{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    isPublic
                  </code>{' '}
                  to control access and{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    disabled
                  </code>{' '}
                  to temporarily disable routes.
                </Typography>
                <CodeBlock language="tsx" code={mfeAdvancedUsage} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-red-500 to-pink-500 shadow-lg">
                    <LucideIcons.Shield className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Type Safety Examples
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  TypeScript prevents invalid prop combinations at compile time,
                  ensuring type safety and preventing configuration errors.
                </Typography>
                <CodeBlock language="tsx" code={typeSafetyExample} />
              </div>
            </div>

            <div className="space-y-4">
              <Typography tag="h4" className="font-semibold text-lg">
                Key Features
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Explicit Route Configuration
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Full control over route configuration with{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      appRoutesConfig
                    </code>
                    . Each route is explicitly defined.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Route Isolation
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Each micro frontend has its own{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      basePath
                    </code>
                    , ensuring complete route isolation.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Authentication Integration
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Built-in support for public/private routes with{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      isPublic
                    </code>
                    . Automatic authentication handling.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Independent Deployment
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Perfect for micro frontend architectures where each app can
                    be developed, built, and deployed independently.
                  </Typography>
                </CardContainer>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default MFESupportSection;
