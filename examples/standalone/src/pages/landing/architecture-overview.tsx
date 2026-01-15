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

const ArchitectureOverview = () => {
  const navigate = ReactRouter.useNavigate();

  const keyComponents = [
    {
      title: 'ThemeProvider',
      description:
        'The unified component that provides theming, navigation, and layout management',
      icon: <LucideIcons.Package className="w-5 h-5" />,
      features: [
        'Provides consistent theming',
        'Manages navigation menu',
        'Handles layout options',
        'Supports dark mode',
      ],
    },
    {
      title: 'React Router',
      description:
        'Client-side routing with lazy-loaded components for optimal performance',
      icon: <LucideIcons.Layers className="w-5 h-5" />,
      features: [
        'BrowserRouter setup',
        'Lazy loading support',
        'Route configuration',
        'Navigation handling',
      ],
    },
    {
      title: 'SPA Navigation',
      description: 'Seamless React Router navigation within the same application',
      icon: <LucideIcons.Navigation className="w-5 h-5" />,
      features: [
        'SPA navigation',
        'Route-based rendering',
        'Automatic updates',
        'Seamless user experience',
      ],
    },
    {
      title: 'Menu-Driven Routing',
      description: 'Routes automatically generated from menu items configuration',
      icon: <LucideIcons.Menu className="w-5 h-5" />,
      features: [
        'Automatic route generation',
        'Nested routes support',
        'Menu item configuration',
        'Route visibility control',
      ],
    },
  ];

  const technologyStack = [
    {
      name: 'Vite',
      description: 'Build tool and dev server',
      icon: <LucideIcons.Zap className="w-5 h-5" />,
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
      description: 'Design system and component library',
      icon: <LucideIcons.Component className="w-5 h-5" />,
    },
  ];

  const keyFeatures = [
    {
      title: 'Standalone Architecture',
      description: 'Single application with all features integrated',
      icon: <LucideIcons.Network className="w-5 h-5" />,
    },
    {
      title: 'Menu-Driven Routing',
      description: 'Routes automatically generated from menu items',
      icon: <LucideIcons.Menu className="w-5 h-5" />,
    },
    {
      title: 'ThemeProvider Integration',
      description: 'Direct integration with ThemeProvider for consistent theming',
      icon: <LucideIcons.Package className="w-5 h-5" />,
    },
    {
      title: 'Tucu-UI Components',
      description: 'Built-in component library',
      icon: <LucideIcons.Layers className="w-5 h-5" />,
    },
    {
      title: 'Shared Component Library',
      description: 'Reusable UI components across features',
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
      title: 'Code Organization',
      description: 'Feature-based folder structure',
      icon: <LucideIcons.Share2 className="w-5 h-5" />,
    },
    {
      title: 'Single Deployment',
      description: 'One build, one deployment',
      icon: <LucideIcons.Rocket className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Architecture Overview"
          description="High-level overview of the standalone application architecture with Tucu-UI"
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
                onClick={() => navigate(ROUTES.Landing.IntegrationGuide)}
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
              <strong>standalone application architecture</strong> where all
              features are integrated in a single application, sharing a unified
              ThemeProvider and React Router for navigation.
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
                  │ Standalone Application │
                </div>
                <div className="text-cyan-400">
                  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
                </div>
                <div className="ml-4 text-green-400">
                  │ {ROUTES.Authentication.Login} │ {ROUTES.Landing.Base} │{' '}
                  {ROUTES.Dashboard.Base} │ {ROUTES.UserProfile.Base} │
                </div>
                <div className="text-cyan-400">
                  │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
                </div>
                <div className="text-cyan-400">
                  └─────────────────────────────────────────────────────────────┘
                </div>
                <div className="text-center text-yellow-400">│ │ │ │</div>
                <div className="text-center text-yellow-400">▼ ▼ ▼ ▼</div>
                <div className="flex gap-4 justify-center">
                  <div className="text-blue-400">
                    <div>┌──────────────┐</div>
                    <div>│ Authentication│</div>
                    <div>└──────────────┘</div>
                  </div>
                  <div className="text-purple-400">
                    <div>┌──────────────┐</div>
                    <div>│ Landing │</div>
                    <div>└──────────────┘</div>
                  </div>
                  <div className="text-pink-400">
                    <div>┌──────────────┐</div>
                    <div>│ Dashboard │</div>
                    <div>└──────────────┘</div>
                  </div>
                  <div className="text-green-400">
                    <div>┌──────────────┐</div>
                    <div>│ User Profile │</div>
                    <div>└──────────────┘</div>
                  </div>
                </div>
                <div className="text-center text-yellow-400">│ │ │ │</div>
                <div className="text-center text-yellow-400">
                  └──────────────┴──────────────┴──────────────┴──────────────┘
                </div>
                <div className="text-center text-yellow-400">│</div>
                <div className="text-center text-green-400">
                  ┌────────────┴────────────┐
                </div>
                <div className="text-center text-green-400">
                  │ Shared Components │
                </div>
                <div className="text-center text-green-400">
                  │ - ThemeProvider │
                </div>
                <div className="text-center text-green-400">
                  │ - React Query │
                </div>
                <div className="text-center text-green-400">
                  │ - Store (Zustand) │
                </div>
                <div className="text-center text-green-400">
                  │ - @e-burgos/tucu-ui │
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
              Understanding the core components that make this architecture work
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

      {/* How It Works Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How It Works
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
                  <div className="ml-2 text-yellow-400">└── QueryProvider</div>
                  <div className="ml-4 text-blue-400">
                    └── ThemeProvider
                  </div>
                  <div className="ml-6 text-green-400">└── BrowserRouter</div>
                  <div className="ml-8 text-purple-400">└── ThemeWrapper</div>
                  <div className="ml-10 text-pink-400">
                    └── StandaloneAppRoutesProvider
                  </div>
                  <div className="ml-12 text-cyan-400">├── Menu Items</div>
                  <div className="ml-12 text-cyan-400">├── Generated Routes</div>
                  <div className="ml-12 text-cyan-400">└── Components</div>
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
                      User navigates to {ROUTES.Landing.Base}
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
                      App loads and renders ThemeProvider
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
                      React Router sets up routing
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
                  Navigation (SPA)
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
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <LucideIcons.RefreshCw className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-bold text-gray-900 dark:text-white"
                >
                  Lazy Loading
                </Typography>
              </div>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                <div className="space-y-2">
                  <div className="text-blue-400">Route matches</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-yellow-400">Lazy load component</div>
                  <div className="text-center text-gray-500">↓</div>
                  <div className="text-purple-400">Component renders</div>
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
              Modern tools and frameworks powering the standalone application
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
              Powerful features that make this architecture robust and scalable
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

      {/* ThemeProvider Example Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              ThemeProvider Implementation
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              How ThemeProvider provides unified theming and navigation
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
                  code={`<ThemeProvider
  showSettings
  rightButton={<NavOptions />}
  logo={{ path: '/' }}
  menuItems={menuItems}
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
                        Sets up BrowserRouter
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        React Router configuration
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
                        Generates navigation menu
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        From menuItems configuration
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
                        Provides theme context
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Dark mode and theme management
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
                        Renders routes
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Based on menuItems configuration
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

export default ArchitectureOverview;
