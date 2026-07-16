import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const MFESupportSection: React.FC = () => {
  const mfeRouteConfig = `import { RouteProps } from 'react-router-dom';

// Extends React Router's RouteProps (provides path, element, index, etc.)
type IAppRouteConfig = RouteProps & {
  key: string;           // Unique identifier for the route
  isPublic?: boolean;    // Whether the route is publicly accessible
  disabled?: boolean;    // Whether the route is temporarily disabled
};`;

  const mfeBasicUsage = `import { ThemeProvider, IAppRouteConfig } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

const appRoutesConfig: IAppRouteConfig[] = [
  {
    key: 'home',
    path: '/',
    element: <HomePage />,
    isPublic: true,
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
      architecturalPatterns="mfe"
      basePath="/my-app"
      appRoutesConfig={appRoutesConfig}
      isAuthenticated={true}    // Required: authentication state
      loginUrl="/auth/login"    // Required: redirect URL for unauthenticated users
      logo={{ name: 'My', secondName: 'App' }}
      showSettings
    />
  );
}`;

  const mfeAdvancedUsage = `import { ThemeProvider, IAppRouteConfig } from '@e-burgos/tucu-ui';

const appRoutesConfig: IAppRouteConfig[] = [
  // Public routes (accessible without authentication)
  { key: 'login', path: '/login', element: <LoginPage />, isPublic: true },
  { key: 'register', path: '/register', element: <RegisterPage />, isPublic: true },

  // Private routes (require authentication)
  { key: 'dashboard', path: '/dashboard', element: <DashboardPage /> },
  { key: 'settings', path: '/settings', element: <SettingsPage /> },

  // Disabled routes (temporarily unavailable)
  { key: 'beta', path: '/beta', element: <BetaPage />, disabled: true },
];

function MfeApp() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/mfe-app"
      appRoutesConfig={appRoutesConfig}
      isAuthenticated={isLoggedIn}
      loginUrl="/mfe-app/login"
      logo={{ name: 'MFE', secondName: 'App' }}
      showSettings
    />
  );
}`;

  const typeSafetyExample = `// ✅ Correct — MFE with all required props
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/app"
  appRoutesConfig={routes}
  isAuthenticated={isLoggedIn}
  loginUrl="/login"
/>

// ❌ Error — Missing required props
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/app"
  appRoutesConfig={routes}
  // TS Error: Property 'isAuthenticated' is missing
  // TS Error: Property 'loginUrl' is missing
/>

// ❌ Error — Mixing MFE with Standalone props
<ThemeProvider
  architecturalPatterns="mfe"
  menuItems={[...]}  // Error: not allowed in MFE mode
  basePath="/app"
  appRoutesConfig={routes}
/>`;

  const features = [
    {
      icon: (
        <LucideIcons.Settings className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Explicit Route Config',
      description:
        'Full control over each route via appRoutesConfig with access control.',
      iconBgClassName: 'from-purple-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Split className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Route Isolation',
      description:
        'Each MFE has its own basePath ensuring complete route isolation.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Lock className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Auth Integration',
      description:
        'Built-in public/private routes with isAuthenticated and loginUrl.',
      iconBgClassName: 'from-red-500 to-rose-500',
    },
    {
      icon: (
        <LucideIcons.Rocket className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Independent Deploy',
      description:
        'Each app can be developed, built, and deployed independently.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Micro Frontends (MFE)"
        description="Designed for distributed architectures where multiple applications are deployed independently. Uses explicit route configuration with appRoutesConfig, basePath, and built-in authentication."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Box className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            IAppRouteConfig Interface
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Extends React Router&apos;s RouteProps with access control
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Interface Definition">
            <CodeBlock language="TS" code={mfeRouteConfig} />
          </CardTitle>
        </CardContainer>
        <Alert variant="warning" dismissible={false}>
          <Typography tag="p" className="text-sm">
            <LucideIcons.AlertTriangle className="w-4 h-4 inline mr-2" />
            MFE mode requires{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              isAuthenticated
            </code>{' '}
            (boolean) and{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              loginUrl
            </code>{' '}
            (string) as mandatory props. TypeScript enforces this at compile
            time.
          </Typography>
        </Alert>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Basic Usage
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Minimal MFE setup with authentication
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="MFE ThemeProvider">
            <CodeBlock language="tsx" code={mfeBasicUsage} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Advanced: Public/Private Routes
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Authentication handling with disabled routes
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Advanced Configuration">
            <CodeBlock language="tsx" code={mfeAdvancedUsage} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Type Safety
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            TypeScript enforces correct prop combinations
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Compile-Time Validation">
            <CodeBlock language="tsx" code={typeSafetyExample} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Features
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Benefits of the MFE architectural pattern
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} layout="vertical" {...feature} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MFESupportSection;
