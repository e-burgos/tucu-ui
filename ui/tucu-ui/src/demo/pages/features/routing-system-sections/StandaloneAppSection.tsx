import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
} from '../../../../index';

const StandaloneAppSection: React.FC = () => {
  const standaloneRouteConfig = `interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: JSX.Element;  // Component to render
  isPublic?: boolean;      // If true, accessible without authentication
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Nested routes
  hide?: boolean;          // Hide from navigation menu
}`;

  const standaloneBasicUsage = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

const menuItems: StandaloneAppRoutesMenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <HomePage />,
    isPublic: true, // Public route
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LucideIcons.LayoutDashboard />,
    component: <DashboardPage />,
    isPublic: false, // Private route - requires authentication
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
    dropdownItems: [
      {
        name: 'Profile',
        path: '/settings/profile',
        component: <ProfilePage />,
      },
      {
        name: 'Preferences',
        path: '/settings/preferences',
        component: <PreferencesPage />,
      },
    ],
  },
];

function StandaloneApp() {
  return (
    <ThemeProvider
      // architecturalPatterns="standalone" is the default (optional)
      menuItems={menuItems}  // Required for Standalone
      logo={{ name: 'My', secondName: 'App' }}
      showSettings
    />
  );
}`;

  const customRoutesExample = `import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@e-burgos/tucu-ui';

function StandaloneApp() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      customRoutes={
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Standalone App" className="mt-2 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                <LucideIcons.Package className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h4" className="font-semibold">
                Standalone App Pattern (Default)
              </Typography>
            </div>

            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The <strong>Standalone App Pattern</strong> is the default mode for
              traditional single-page applications. Routes are automatically
              generated from{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                menuItems
              </code>{' '}
              configuration, making it perfect for monolithic applications that
              don't require micro frontend architecture.
            </Typography>

            <Alert variant="info" dismissible={false}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LucideIcons.Info className="w-4 h-4" />
                  <Typography tag="span" className="font-semibold">
                    Default Pattern
                  </Typography>
                </div>
                <Typography tag="p" className="text-sm">
                  The Standalone pattern is the default. You don't need to specify{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    architecturalPatterns
                  </code>
                  . Simply provide{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    menuItems
                  </code>{' '}
                  and routes will be automatically generated.
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
                    StandaloneAppRoutesMenuItem Interface
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Define your routes using the{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    StandaloneAppRoutesMenuItem
                  </code>{' '}
                  interface. Each menu item automatically becomes a route.
                </Typography>
                <CodeBlock language="typescript" code={standaloneRouteConfig} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                    <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Basic Usage
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Create a simple standalone application with automatic route
                  generation from menu items. Supports nested routes through{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    dropdownItems
                  </code>
                  .
                </Typography>
                <CodeBlock language="tsx" code={standaloneBasicUsage} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 shadow-lg">
                    <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Custom Routes Override
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  You can completely override the default routing by providing
                  your own{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    customRoutes
                  </code>{' '}
                  prop. This is useful for special routing requirements.
                </Typography>
                <CodeBlock language="tsx" code={customRoutesExample} />
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
                      Automatic Route Generation
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Routes are automatically created from your{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      menuItems
                    </code>{' '}
                    configuration. No manual route setup required.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Nested Routes Support
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Support for unlimited nesting levels with{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      dropdownItems
                    </code>
                    . Automatically converted to dropdown menus in navigation.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Simple Configuration
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Minimal setup required. Just define your menu items and the
                    routing system handles the rest.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold">
                      Perfect for SPAs
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Ideal for traditional single-page applications that don't
                    require micro frontend architecture or route isolation.
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

export default StandaloneAppSection;
