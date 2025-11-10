import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Badge,
  Alert,
  useTheme,
} from '@e-burgos/tucu-ui';
import HeroPage from '../components/HeroPage';

export function RoutingSystem() {
  const routingStructure = `interface AppRoutesMenuItem {
  name: string;           // Display name for the menu item
  href: string;           // URL path for the route
  icon?: React.ReactNode; // Optional icon component
  component: React.ReactNode; // The component to render
  dropdownItems?: AppRoutesMenuItem[]; // Optional sub-routes
}`;

  const basicUsage = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import { Introduction } from './pages/Introduction';
import { ThemingGuide } from './pages/ThemingGuide';

const menuItems = [
  {
    name: 'Introduction',
    href: '/',
    icon: <LucideIcons.Home />,
    component: <Introduction />,
  },
  {
    name: 'Theming',
    href: '/theming-guide',
    icon: <LucideIcons.Paintbrush />,
    component: <ThemingGuide />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  const nestedRoutes = `const menuItems = [
  {
    name: 'Components',
    href: '/components',
    icon: <LucideIcons.Component />,
    component: <ComponentsPage />,
    dropdownItems: [
      {
        name: 'Buttons',
        href: '/components/buttons',
        icon: <LucideIcons.MousePointerClick />,
        component: <ButtonsPage />,
      },
      {
        name: 'Forms',
        href: '/components/forms',
        icon: <LucideIcons.FileText />,
        component: <FormsPage />,
      },
    ],
  },
  {
    name: 'Utilities',
    href: '/utilities',
    icon: <LucideIcons.Wrench />,
    component: <UtilitiesPage />,
    dropdownItems: [
      {
        name: 'Hooks',
        href: '/utilities/hooks',
        icon: <LucideIcons.Hook />,
        component: <HooksPage />,
      },
    ],
  },
];`;

  const themeProviderProps = `interface ThemeProviderProps {
  // Layout Configuration
  menuItems: AppRoutesMenuItem[];    // Required: Array of route items
  layout?: 'classic' | 'minimal' | 'none'; // Layout type

  // Branding
  logo?: { name: string; secondName?: string }; // App logo
  rightButton?: React.ReactNode; // Custom button in header

  // Theming (inherited from theme system)
  brandColor?: PresetColorType;
  secondaryColor?: PresetColorType;
  accentColor?: PresetColorType;
  mode?: 'light' | 'dark';

  // Settings Panel
  showSettings?: boolean; // Show/hide settings panel
  settingActions?: {        // Control which settings are available
    disabledMode?: boolean;
    disabledLayout?: boolean;
    disabledDirection?: boolean;
    disabledPreset?: boolean;
    disabledSecondary?: boolean;
    disabledAccent?: boolean;
    disabledDark?: boolean;
    disabledLight?: boolean;
  };

  // Advanced
  customRoutes?: React.ReactElement<typeof Routes>; // Override default routing
  withRouterProvider?: boolean; // Use custom router provider
}`;

  const dynamicRoutes = `import { useMemo } from 'react';

export const useMenuItems = () => {
  const menuItems = useMemo(() => [
    // Static routes
    {
      name: 'Home',
      href: '/',
      component: <HomePage />,
    },

    // Dynamic routes based on user permissions
    ...(userHasAccess('admin') ? [{
      name: 'Admin',
      href: '/admin',
      component: <AdminPage />,
      dropdownItems: [
        {
          name: 'Users',
          href: '/admin/users',
          component: <UsersPage />,
        },
        {
          name: 'Settings',
          href: '/admin/settings',
          component: <AdminSettingsPage />,
        },
      ],
    }] : []),

    // Feature-flagged routes
    ...(featureFlags.newFeature ? [{
      name: 'New Feature',
      href: '/new-feature',
      component: <NewFeaturePage />,
    }] : []),
  ], [userPermissions, featureFlags]);

  return { menuItems };
};`;

  const customLayout = `import { ThemeProvider } from '@e-burgos/tucu-ui';

function CustomLayoutApp() {
  return (
    <ThemeProvider
      layout="minimal"
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
      rightButton={
        <div className="flex gap-2">
          <Button variant="ghost" size="small">
            Profile
          </Button>
          <Button variant="ghost" size="small">
            Logout
          </Button>
        </div>
      }
      // Custom styling
      headerClassName="bg-brand/5 border-b border-brand/20"
      contentClassName="max-w-7xl mx-auto"
      fullWidth={false}
    />
  );
}`;

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Routing System"
        description="Powerful and flexible routing system built on React Router with automatic navigation generation, nested routes support, and seamless integration with the theming system."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.Route className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* System Overview */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            System Overview
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built on React Router with automatic menu generation and nested
            route support
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <LucideIcons.Router className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'React Router Integration',
              description:
                'Built on React Router v6 with full compatibility and modern routing features',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
              features: ['Browser History', 'Nested Routes', 'Route Guards'],
            },
            {
              icon: (
                <LucideIcons.Menu className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Automatic Navigation',
              description:
                'Generate navigation menus automatically from route configuration',
              color: 'from-green-500 via-emerald-500 to-teal-500',
              features: ['Auto Sidebar', 'Breadcrumb Support', 'Active States'],
            },
            {
              icon: (
                <LucideIcons.Layers3 className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Nested Route Support',
              description:
                'Support for unlimited nesting levels with dropdown menus and sub-navigation',
              color: 'from-purple-500 via-violet-500 to-indigo-500',
              features: ['Multi-level', 'Dropdown Menus', 'Hierarchical'],
            },
          ].map((item, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {item.description}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Route Configuration */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Route Configuration" className="mt-2 mb-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    AppRoutesMenuItem Interface
                  </Typography>
                </div>
                <CodeBlock language="typescript" code={routingStructure} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                    <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Basic Usage
                  </Typography>
                </div>
                <CodeBlock language="tsx" code={basicUsage} />
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Nested Routes */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle
            title="Nested Routes & Dropdown Menus"
            className="mt-2 mb-6"
          >
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Create hierarchical navigation with unlimited nesting levels.
                Each menu item can have dropdown sub-items that appear in the
                sidebar navigation.
              </Typography>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Nested Routes Example
                  </Typography>
                  <CodeBlock language="tsx" code={nestedRoutes} />
                </div>

                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Navigation Structure
                  </Typography>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideIcons.Component className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Components</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <LucideIcons.MousePointerClick className="w-3 h-3" />
                          Buttons
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <LucideIcons.FileText className="w-3 h-3" />
                          Forms
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideIcons.Wrench className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Utilities</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <LucideIcons.Zap className="w-3 h-3" />
                          Hooks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Alert variant="info" dismissible={false}>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  <LucideIcons.Info className="w-4 h-4 inline mr-2" />
                  Nested routes are automatically converted to dropdown menus in
                  the sidebar navigation. The parent route serves as the main
                  landing page, while dropdown items provide access to
                  sub-sections.
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* ThemeProvider Integration */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="ThemeProvider Integration" className="mt-2 mb-6">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                The routing system is fully integrated with the ThemeProvider,
                providing seamless navigation, layout management, and theming
                support.
              </Typography>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Complete ThemeProvider Props
                  </Typography>
                  <CodeBlock language="typescript" code={themeProviderProps} />
                </div>

                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Custom Layout Example
                  </Typography>
                  <CodeBlock language="tsx" code={customLayout} />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Dynamic Routes */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Dynamic & Conditional Routes" className="mt-2 mb-6">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Create dynamic routing based on user permissions, feature flags,
                or application state.
              </Typography>

              <CodeBlock language="tsx" code={dynamicRoutes} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Role-Based Access',
                    description: 'Show/hide routes based on user permissions',
                    icon: (
                      <LucideIcons.Shield className="w-5 h-5 text-red-500" />
                    ),
                  },
                  {
                    title: 'Feature Flags',
                    description: 'Enable routes based on feature toggles',
                    icon: (
                      <LucideIcons.Flag className="w-5 h-5 text-blue-500" />
                    ),
                  },
                  {
                    title: 'State-Driven',
                    description: 'Routes that change based on app state',
                    icon: (
                      <LucideIcons.Database className="w-5 h-5 text-green-500" />
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {item.icon}
                    <div>
                      <Typography tag="h5" className="font-medium mb-1">
                        {item.title}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Best Practices" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                      <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-green-600 dark:text-green-400"
                    >
                      Do's
                    </Typography>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Use descriptive route names and paths',
                      'Keep route hierarchy logical and shallow (max 2-3 levels)',
                      'Use consistent naming conventions',
                      'Leverage TypeScript for type safety',
                      'Use useMemo for dynamic route generation',
                      'Include icons for better UX',
                      'Test routes with different user roles',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg shadow-lg">
                      <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-red-600 dark:text-red-400"
                    >
                      Don'ts
                    </Typography>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Create overly deep nesting (>3 levels)',
                      'Use generic names like "Page" or "Component"',
                      'Hardcode routes in components',
                      'Forget to handle 404 pages',
                      'Mix routing logic with business logic',
                      'Skip accessibility considerations',
                      'Ignore mobile navigation UX',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* API Reference */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="API Reference" className="mt-2 mb-6">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Complete API reference for the routing system components and
                interfaces.
              </Typography>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography tag="h4" className="font-semibold">
                    AppRoutesMenuItem Properties
                  </Typography>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 px-4 font-medium">
                            Property
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Type
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Required
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        <tr>
                          <td className="py-2 px-4 font-mono text-xs">name</td>
                          <td className="py-2 px-4 text-xs">string</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-xs">
                              Yes
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            Display name for navigation menu
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono text-xs">href</td>
                          <td className="py-2 px-4 text-xs">string</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-xs">
                              Yes
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            URL path for the route
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono text-xs">
                            component
                          </td>
                          <td className="py-2 px-4 text-xs">React.ReactNode</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-xs">
                              Yes
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            Component to render for this route
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono text-xs">icon</td>
                          <td className="py-2 px-4 text-xs">React.ReactNode</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-xs">
                              Optional
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            Icon to display in navigation
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-mono text-xs">
                            dropdownItems
                          </td>
                          <td className="py-2 px-4 text-xs">
                            AppRoutesMenuItem[]
                          </td>
                          <td className="py-2 px-4">
                            <Badge variant="outline" className="text-xs">
                              Optional
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            Array of nested sub-routes
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
