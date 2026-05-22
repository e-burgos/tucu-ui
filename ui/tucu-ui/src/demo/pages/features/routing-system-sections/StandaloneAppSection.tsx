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
} from '../../../../index';

const StandaloneAppSection: React.FC = () => {
  const standaloneRouteConfig = `interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: React.JSX.Element;    // Component to render
  isPublic?: boolean;              // If true, accessible without authentication
  enableNestedRoutes?: boolean;    // Adds /* to path for nested routing
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Nested sub-routes
}`;

  const standaloneBasicUsage = `import { ThemeProvider, StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

const menuItems: StandaloneAppRoutesMenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <HomePage />,
    isPublic: true,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LucideIcons.LayoutDashboard />,
    component: <DashboardPage />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <SettingsPage />,
    enableNestedRoutes: true,
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
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
      showSettings
    />
  );
}`;

  const customRoutesExample = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import { ReactRouter } from '@e-burgos/tucu-ui';

const { Routes, Route } = ReactRouter;

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

  const features = [
    {
      icon: (
        <LucideIcons.Wand2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Auto Route Generation',
      description:
        'Routes created automatically from menuItems. No manual setup required.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Layers3 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Nested Routes',
      description:
        'Unlimited nesting with dropdownItems converted to dropdown menus.',
      iconBgClassName: 'from-purple-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Minimize2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Simple Configuration',
      description:
        'Minimal setup — define menu items and the system handles the rest.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.AppWindow className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Perfect for SPAs',
      description:
        'Ideal for traditional single-page applications without MFE complexity.',
      iconBgClassName: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Standalone App"
        description="The default architectural pattern for traditional SPAs. Routes are automatically generated from menuItems configuration with sidebar navigation."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Package className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            StandaloneAppRoutesMenuItem
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Type-safe interface for defining standalone routes
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Interface Definition">
            <CodeBlock language="typescript" code={standaloneRouteConfig} />
          </CardTitle>
        </CardContainer>
        <Alert variant="info" dismissible={false}>
          <Typography tag="p" className="text-sm">
            <LucideIcons.Info className="w-4 h-4 inline mr-2" />
            The Standalone pattern is the default. You don&apos;t need to
            specify{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              architecturalPatterns
            </code>
            . Simply provide{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              menuItems
            </code>{' '}
            and routes will be generated.
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
            Simple standalone app with nested routes
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="ThemeProvider with menuItems">
            <CodeBlock language="tsx" code={standaloneBasicUsage} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Custom Routes Override
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Override default routing with customRoutes prop
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Custom Routing">
            <CodeBlock language="tsx" code={customRoutesExample} />
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
            Benefits of the Standalone pattern
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

export default StandaloneAppSection;
