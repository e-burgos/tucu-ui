import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  HeroCard,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../router/routes-config';
import { APP_PATHS } from '@e-burgos-mfe/utils';

const ArchitectureOverview = () => {
  const navigate = ReactRouter.useNavigate();

  const keyComponents = [
    {
      title: 'ShellWrapper',
      description:
        'The unified orchestrator that automatically sets MFE mode and wraps apps with ThemeProvider',
      icon: <LucideIcons.Package className="w-5 h-5" />,
      features: [
        'Automatically sets architecturalPatterns="mfe"',
        'Wraps with ThemeProvider',
        'Provides React Query context',
        'Manages global navigation',
      ],
    },
    {
      title: 'ThemeProvider MFE Mode',
      description:
        'Uses TypeScript discriminated unions to handle MFE mode with route protection',
      icon: <LucideIcons.Layers className="w-5 h-5" />,
      features: [
        'Renders MfeAppThemeProvider',
        'Sets up BrowserRouter',
        'Handles route protection',
        'Separates public/private routes',
      ],
    },
    {
      title: 'Smart Navigation',
      description: 'Automatic detection of in-app vs inter-app navigation',
      icon: <LucideIcons.Navigation className="w-5 h-5" />,
      features: [
        'In-app: React Router (SPA)',
        'Inter-app: Full page reload',
        'Automatic detection',
        'Seamless user experience',
      ],
    },
    {
      title: 'Route Protection',
      description: 'Built-in support for public/private routes in MFE mode',
      icon: <LucideIcons.Shield className="w-5 h-5" />,
      features: [
        'Public routes (isPublic: true)',
        'Private routes (isPublic: false)',
        'Disabled routes',
        'Automatic redirects',
      ],
    },
  ];

  const technologyStack = [
    {
      name: 'Nx',
      description: 'Monorepo tooling and build system',
      icon: <LucideIcons.Box className="w-5 h-5" />,
    },
    {
      name: 'React 19',
      description: 'UI framework',
      icon: <LucideIcons.Code className="w-5 h-5" />,
    },
    {
      name: 'TypeScript',
      description: 'Type-safe JavaScript',
      icon: <LucideIcons.FileCode className="w-5 h-5" />,
    },
    {
      name: 'Vite',
      description: 'Build tool and dev server',
      icon: <LucideIcons.Zap className="w-5 h-5" />,
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      icon: <LucideIcons.Palette className="w-5 h-5" />,
    },
    {
      name: 'React Query',
      description: 'Data fetching and state management',
      icon: <LucideIcons.Database className="w-5 h-5" />,
    },
    {
      name: 'Zustand',
      description: 'Lightweight state management',
      icon: <LucideIcons.Store className="w-5 h-5" />,
    },
    {
      name: '@e-burgos/tucu-ui',
      description: 'Design system with built-in MFE support',
      icon: <LucideIcons.Component className="w-5 h-5" />,
    },
  ];

  const keyFeatures = [
    {
      title: 'Micro Frontend Architecture',
      description: 'Independent, deployable applications',
      icon: <LucideIcons.Network className="w-5 h-5" />,
    },
    {
      title: 'Path-based Routing',
      description: 'Each app accessible via its own path',
      icon: <LucideIcons.Route className="w-5 h-5" />,
    },
    {
      title: 'Unified Orchestration',
      description: 'Shared ShellWrapper component for all apps',
      icon: <LucideIcons.Link className="w-5 h-5" />,
    },
    {
      title: 'Tucu-UI MFE Support',
      description: 'Built-in MFE mode in ThemeProvider',
      icon: <LucideIcons.Layers className="w-5 h-5" />,
    },
    {
      title: 'Shared Component Library',
      description: 'Reusable UI components across apps',
      icon: <LucideIcons.Package className="w-5 h-5" />,
    },
    {
      title: 'Type-Safe Imports',
      description: 'TypeScript path mappings for clean imports',
      icon: <LucideIcons.FileCode className="w-5 h-5" />,
    },
    {
      title: 'Hot Module Replacement',
      description: 'Fast development with Vite HMR',
      icon: <LucideIcons.Zap className="w-5 h-5" />,
    },
    {
      title: 'Code Sharing',
      description: 'Shared libraries for common functionality',
      icon: <LucideIcons.Share2 className="w-5 h-5" />,
    },
    {
      title: 'Independent Deployment',
      description: 'Each app can be built and deployed separately',
      icon: <LucideIcons.Rocket className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Architecture Overview"
          description="High-level overview of the Micro-Frontend architecture implementation with Tucu-UI"
          icon={
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Building className="w-10 h-10 text-white" />
            </div>
          }
          content={
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Base)}
                className="min-w-[200px]"
              >
                <LucideIcons.Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.IntegrationGuide)}
                className="min-w-[200px]"
              >
                <LucideIcons.BookOpen className="w-5 h-5 mr-2" />
                Integration Guide
              </Button>
            </div>
          }
        />
      </section>

      {/* Architecture Overview Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Architecture Overview
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              This project implements a{' '}
              <strong>path-based Micro-Frontend architecture</strong> where each
              app is deployed independently on its own path, all apps share a
              unified orchestrator, and Tucu-UI's ThemeProvider supports MFE
              mode.
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="mb-6">
              <Typography
                tag="h3"
                className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              >
                High-Level Architecture
              </Typography>
            </div>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 font-mono text-sm text-gray-300 overflow-x-auto">
              <div className="space-y-2">
                <div className="text-cyan-400">
                  ┌─────────────────────────────────────────────────────────────┐
                </div>
                <div className="text-cyan-400">
                  │ Unified Dev Server (Port 3000 - Proxy) │
                </div>
                <div className="text-cyan-400">
                  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
                </div>
                <div className="ml-4 text-green-400">
                  │ {APP_PATHS.AUTHENTICATION} │ {APP_PATHS.LANDING} │{' '}
                  {APP_PATHS.DASHBOARD} │
                </div>
                <div className="text-cyan-400">
                  │ └──────────────┘ └──────────────┘ └──────────────┘ │
                </div>
                <div className="text-cyan-400">
                  └─────────────────────────────────────────────────────────────┘
                </div>
                <div className="text-center text-yellow-400">│ │ │</div>
                <div className="text-center text-yellow-400">▼ ▼ ▼</div>
                <div className="flex gap-4 justify-center">
                  <div className="text-blue-400">
                    <div>┌──────────────┐</div>
                    <div>│ App: Auth │</div>
                    <div>│ Port: 4200 │</div>
                    <div>└──────────────┘</div>
                  </div>
                  <div className="text-purple-400">
                    <div>┌──────────────┐</div>
                    <div>│ App: Landing │</div>
                    <div>│ Port: 4201 │</div>
                    <div>└──────────────┘</div>
                  </div>
                  <div className="text-pink-400">
                    <div>┌──────────────┐</div>
                    <div>│ App: Dashboard│</div>
                    <div>│ Port: 4203 │</div>
                    <div>└──────────────┘</div>
                  </div>
                </div>
                <div className="text-center text-yellow-400">│ │ │</div>
                <div className="text-center text-yellow-400">
                  └──────────────┴──────────────┘
                </div>
                <div className="text-center text-yellow-400">│</div>
                <div className="text-center text-green-400">
                  ┌────────────┴────────────┐
                </div>
                <div className="text-center text-green-400">
                  │ Shared Libraries │
                </div>
                <div className="text-center text-green-400">
                  │ - shell (orchestrator) │
                </div>
                <div className="text-center text-green-400">
                  │ - api (React Query) │
                </div>
                <div className="text-center text-green-400">
                  │ - auth-security │
                </div>
                <div className="text-center text-green-400">
                  │ - utils (constants) │
                </div>
                <div className="text-center text-green-400">
                  └──────────────────────────┘
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Key Components
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Understanding the core components that make MFE architecture work
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyComponents.map((component, index) => (
              <CardContainer
                key={index}
                className="p-6 lg:p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                    {component.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {component.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-4 text-sm"
                >
                  {component.description}
                </Typography>
                <ul className="space-y-2">
                  {component.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                        <LucideIcons.Check className="w-3 h-3 text-brand" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* How MFE Works Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How MFE Works
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Understanding the component hierarchy and request flow
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Component Hierarchy */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.TreePine className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Component Hierarchy
                </Typography>
              </div>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-xs text-gray-300">
                <div className="space-y-1">
                  <div>App Component</div>
                  <div className="ml-2 text-yellow-400">└── ShellWrapper</div>
                  <div className="ml-4 text-blue-400">└── QueryProvider</div>
                  <div className="ml-6 text-green-400">
                    └── ThemeProvider (MFE)
                  </div>
                  <div className="ml-8 text-purple-400">
                    └── MfeAppThemeProvider
                  </div>
                  <div className="ml-10 text-pink-400">└── BrowserRouter</div>
                  <div className="ml-12 text-cyan-400">└── ThemeWrapper</div>
                  <div className="ml-14 text-orange-400">
                    └── MfeAppRoutesProvider
                  </div>
                  <div className="ml-16 text-gray-400">├── Public Routes</div>
                  <div className="ml-16 text-gray-400">├── Private Routes</div>
                  <div className="ml-16 text-gray-400">└── Disabled Routes</div>
                </div>
              </div>
            </CardContainer>

            {/* Request Flow */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.ArrowRight className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Request Flow
                </Typography>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-brand">1</span>
                  </div>
                  <div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      User navigates to {APP_PATHS.LANDING}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-brand">2</span>
                  </div>
                  <div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      Unified Dev Server proxies request
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-brand">3</span>
                  </div>
                  <div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      App loads and renders ShellWrapper
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-brand">4</span>
                  </div>
                  <div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      ThemeProvider sets up routing
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-brand">5</span>
                  </div>
                  <div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white text-sm"
                    >
                      Route matches and component renders
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContainer>
          </div>

          {/* Navigation Flow */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <LucideIcons.ArrowRight className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-bold text-gray-900 dark:text-white"
                >
                  Within Same App (SPA)
                </Typography>
              </div>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                <div className="space-y-2">
                  <div className="text-green-400">User clicks menu item</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-blue-400">React Router handles</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-purple-400">Component updates</div>
                </div>
              </div>
            </CardContainer>

            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <LucideIcons.RefreshCw className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-bold text-gray-900 dark:text-white"
                >
                  Between Different Apps
                </Typography>
              </div>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                <div className="space-y-2">
                  <div className="text-orange-400">User clicks menu item</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-yellow-400">navigateBetweenApps()</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-red-400">window.location.href</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-pink-400">Full page reload</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-cyan-400">New app loads</div>
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Technology Stack
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Modern tools and frameworks powering the MFE architecture
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {tech.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {tech.name}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  {tech.description}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Key Features
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Powerful features that make this MFE architecture robust and
              scalable
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  {feature.description}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ShellWrapper Example Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              ShellWrapper Implementation
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              How ShellWrapper automatically enables MFE mode
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="space-y-6">
              <div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Key Implementation
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`<ShellWrapper
  basePath={APP_PATHS.AUTHENTICATION}
  appRoutesConfig={routesConfig}
  layout={LAYOUT_OPTIONS.CLEAN}
  isAuthenticated={isAuthenticated}
  loginUrl={APP_URLS.AUTHENTICATION}
/>`}
                />
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Internal Flow
                </Typography>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-brand">1</span>
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Detects current environment
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Local vs production detection
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-brand">2</span>
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Generates navigation items
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Via useMainNavigation hook
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-brand">3</span>
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Always passes architecturalPatterns="mfe"
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Automatically enables MFE mode
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-brand">4</span>
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Wraps with QueryProvider
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        React Query context for data fetching
                      </Typography>
                    </div>
                  </li>
                </ul>
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
              Ready to Explore?
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center"
            >
              Learn more about integrating and developing with this architecture
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Base)}
              >
                <LucideIcons.Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.DevelopmentGuide)}
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

export default ArchitectureOverview;
