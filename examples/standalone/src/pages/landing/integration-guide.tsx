import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  HeroCard,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../../router/routes-config';

const IntegrationGuide = () => {
  const navigate = ReactRouter.useNavigate();

  const integrationSteps = [
    {
      step: 1,
      title: 'Create Application Structure',
      description:
        'Set up the directory structure with app.tsx, main.tsx, router configuration, and page components.',
      icon: <LucideIcons.FolderPlus className="w-6 h-6" />,
      details: [
        'Create app directory structure',
        'Set up `src/` with app.tsx and main.tsx',
        'Create router/ directory with routes-config.tsx',
        'Add pages/ directory for page components',
      ],
    },
    {
      step: 2,
      title: 'Define Route Constants',
      description:
        'Add your routes to the routes-config.tsx file with proper path definitions.',
      icon: <LucideIcons.Route className="w-6 h-6" />,
      details: [
        'Define routes in ROUTES object',
        'Use consistent path naming',
        'Organize routes by feature',
      ],
    },
    {
      step: 3,
      title: 'Configure Environment Variables',
      description:
        'Add port and URL configuration to `.env` for development and production.',
      icon: <LucideIcons.Settings className="w-6 h-6" />,
      details: [
        'Set VITE_APP_PORT',
        'Set VITE_APP_ENVIRONMENT',
        'Configure API base URL if needed',
      ],
    },
    {
      step: 4,
      title: 'Create Vite Configuration',
      description:
        'Set up vite.config.ts with React, TypeScript, and Tailwind support.',
      icon: <LucideIcons.FileCode className="w-6 h-6" />,
      details: [
        'Configure React plugin',
        'Set up Tailwind CSS',
        'Configure path aliases',
      ],
    },
    {
      step: 5,
      title: 'Create Router Configuration',
      description:
        'Define routes using StandaloneAppRoutesMenuItem with lazy-loaded components.',
      icon: <LucideIcons.Network className="w-6 h-6" />,
      details: [
        'Use StandaloneAppRoutesMenuItem type',
        'Lazy load page components',
        'Configure menu items',
      ],
    },
    {
      step: 6,
      title: 'Wrap with ThemeProvider',
      description:
        'Integrate your app with ThemeProvider for consistent theming and navigation.',
      icon: <LucideIcons.Package className="w-6 h-6" />,
      details: [
        'Pass menuItems configuration',
        'Choose layout options',
        'Configure navigation',
      ],
    },
  ];

  const keyConcepts = [
    {
      title: 'Menu-Driven Routing',
      description:
        'Routes automatically generated from menu items configuration for simplicity.',
      icon: <LucideIcons.Menu className="w-5 h-5" />,
    },
    {
      title: 'ThemeProvider Integration',
      description:
        'Direct integration with ThemeProvider for consistent theming and navigation.',
      icon: <LucideIcons.Package className="w-5 h-5" />,
    },
    {
      title: 'Tucu-UI Components',
      description:
        'Built-in component library with consistent design system.',
      icon: <LucideIcons.Layers className="w-5 h-5" />,
    },
    {
      title: 'SPA Navigation',
      description: 'Seamless React Router navigation within the same application.',
      icon: <LucideIcons.Navigation className="w-5 h-5" />,
    },
    {
      title: 'Route Protection',
      description: 'Built-in support for public/private routes with authentication.',
      icon: <LucideIcons.Shield className="w-5 h-5" />,
    },
    {
      title: 'Type-Safe',
      description:
        'Full TypeScript support with discriminated unions ensuring correct standalone mode.',
      icon: <LucideIcons.Code className="w-5 h-5" />,
    },
  ];

  const layoutOptions = [
    {
      name: 'CLEAN',
      description:
        'Minimal layout without navigation (e.g., authentication pages)',
      icon: <LucideIcons.Layout className="w-5 h-5" />,
    },
    {
      name: 'HORIZONTAL',
      description: 'Horizontal navigation layout',
      icon: <LucideIcons.LayoutList className="w-5 h-5" />,
    },
    {
      name: 'ADMIN',
      description: 'Admin dashboard layout with sidebar',
      icon: <LucideIcons.LayoutDashboard className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Integration Guide"
          description="Complete step-by-step guide for building a standalone application with Tucu-UI"
          icon={
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.BookOpen className="w-10 h-10 text-white" />
            </div>
          }
          content={
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.Base)}
                className="min-w-[200px]"
              >
                <LucideIcons.Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.ArchitectureOverview)}
                className="min-w-[200px]"
              >
                <LucideIcons.Building className="w-5 h-5 mr-2" />
                Architecture
              </Button>
            </div>
          }
        />
      </section>

      {/* Overview Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Overview
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              This standalone application uses `@e-burgos/tucu-ui`'s `ThemeProvider`
              component directly (no wrapper needed) for consistent theming, navigation, and layout management.
              Routes are automatically generated from menu items configuration.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyConcepts.map((concept, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {concept.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {concept.title}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  {concept.description}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Integration */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Step-by-Step Integration
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Follow these steps to add a new feature to the standalone application
            </Typography>
          </div>

          <div className="space-y-6">
            {integrationSteps.map((step, index) => (
              <CardContainer
                key={index}
                className="p-6 lg:p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="shrink-0">
                    <div className="flex items-center gap-4 mb-4 lg:mb-0">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30">
                        <div className="flex items-center justify-center gap-1 text-lg font-bold text-brand dark:text-indigo-400">
                          {step.step} {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grow">
                    <Typography
                      tag="h3"
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400 mb-4"
                    >
                      {step.description}
                    </Typography>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                            <LucideIcons.Check className="w-3 h-3 text-brand" />
                          </div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Configuration Details */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Configuration Details
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Understand the key configuration options available
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ThemeProvider Props */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.Settings className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  ThemeProvider Props
                </Typography>
              </div>
              <div className="space-y-4">
                <div>
                  <Typography
                    tag="p"
                    className="font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Required Props
                  </Typography>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• menuItems: StandaloneAppRoutesMenuItem[]</li>
                  </ul>
                </div>
                <div>
                  <Typography
                    tag="p"
                    className="font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Optional Props
                  </Typography>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• logo?: LogoConfig</li>
                    <li>• rightButton?: React.ReactNode</li>
                    <li>• showSettings?: boolean</li>
                  </ul>
                </div>
              </div>
            </CardContainer>

            {/* Layout Options */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.Layout className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Layout Options
                </Typography>
              </div>
              <div className="space-y-4">
                {layoutOptions.map((layout, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-light-dark  border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-brand">{layout.icon}</div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        {layout.name}
                      </Typography>
                    </div>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {layout.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Quick Start Example */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Quick Start Example
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              A minimal example to get you started
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="space-y-6">
              <div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  app.tsx
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, NavOptions } from '@e-burgos/tucu-ui';
import { RoutesConfig } from './router/routes-config';
import { queryClient, QueryProvider } from './queries';

export function App() {
  const { menuItems } = RoutesConfig();
  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        showSettings
        rightButton={<NavOptions />}
        logo={{ path: '/' }}
        menuItems={menuItems}
      />
    </QueryProvider>
  );
}`}
                />
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  routes-config.tsx
                </Typography>

                <CodeBlock
                  language="tsx"
                  code={`import { type StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { YourPageComponent } from './entry-points';

export const ROUTES = {
  YourFeature: {
    Base: '/your-feature',
  },
};

export const RoutesConfig = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = [
    {
      name: 'Your Feature',
      path: ROUTES.YourFeature.Base,
      icon: <LucideIcons.Home />,
      component: <YourPageComponent />,
    },
  ];

  return { menuItems };
};`}
                />
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardContainer className="p-8 lg:p-12 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Rocket className="w-8 h-8 text-white" />
            </div>
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
            >
              Ready to Integrate?
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center"
            >
              Start building your standalone application with Tucu-UI today
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.Base)}
              >
                <LucideIcons.Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.DevelopmentGuide)}
              >
                <LucideIcons.Terminal className="w-5 h-5 mr-2" />
                Development Guide
              </Button>
            </div>
          </CardContainer>
        </div>
      </section>
    </div>
  );
};

export default IntegrationGuide;
