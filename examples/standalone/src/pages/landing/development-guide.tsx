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

const DevelopmentGuide = () => {
  const navigate = ReactRouter.useNavigate();

  const devServerFeatures = [
    {
      title: 'Fast Development',
      description: 'Vite provides instant server start and HMR',
      icon: <LucideIcons.Zap className="w-5 h-5" />,
    },
    {
      title: 'TypeScript Support',
      description: 'Full TypeScript support with type checking',
      icon: <LucideIcons.FileCode className="w-5 h-5" />,
    },
    {
      title: 'Hot Module Replacement',
      description: 'Instant updates without page refresh',
      icon: <LucideIcons.RefreshCw className="w-5 h-5" />,
    },
    {
      title: 'Optimized Builds',
      description: 'Production builds optimized for performance',
      icon: <LucideIcons.Rocket className="w-5 h-5" />,
    },
  ];

  const availableLibraries = [
    {
      name: '@e-burgos/tucu-ui',
      description: 'Design system and UI component library',
      icon: <LucideIcons.Package className="w-5 h-5" />,
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
      name: 'React Router',
      description: 'Client-side routing',
      icon: <LucideIcons.Route className="w-5 h-5" />,
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      icon: <LucideIcons.Palette className="w-5 h-5" />,
    },
  ];

  const features = [
    {
      name: 'Authentication',
      path: ROUTES.Authentication.Login,
      icon: <LucideIcons.Lock className="w-5 h-5" />,
    },
    {
      name: 'Landing',
      path: ROUTES.Landing.Base,
      icon: <LucideIcons.Home className="w-5 h-5" />,
    },
    {
      name: 'User Profile',
      path: ROUTES.UserProfile.Base,
      icon: <LucideIcons.User className="w-5 h-5" />,
    },
    {
      name: 'Dashboard',
      path: ROUTES.Dashboard.Base,
      icon: <LucideIcons.LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const troubleshootingItems = [
    {
      title: 'Port Already in Use',
      description:
        'Update the port in .env or stop the process using that port',
      icon: <LucideIcons.AlertCircle className="w-5 h-5" />,
      solution: 'Use `lsof -i :4200` to find and kill the process',
    },
    {
      title: 'Build Errors',
      description:
        'Check TypeScript errors and ensure all dependencies are installed',
      icon: <LucideIcons.XCircle className="w-5 h-5" />,
      solution: 'Run `pnpm install` and check for TypeScript errors',
    },
    {
      title: 'API Requests Fail',
      description:
        'Verify API configuration and ensure the server is accessible',
      icon: <LucideIcons.WifiOff className="w-5 h-5" />,
      solution: 'Check VITE_API_BASE_URL in .env and verify network connectivity',
    },
    {
      title: "Components Don't Load",
      description: 'Verify all imports are correct and paths are valid',
      icon: <LucideIcons.Loader className="w-5 h-5" />,
      solution:
        'Check console for errors and verify import paths',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Development Guide"
          description="Complete guide for developing the standalone application and understanding the development workflow"
          icon={
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Terminal className="w-10 h-10 text-white" />
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

      {/* Development Server Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Development Server
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Fast development server with Hot Module Replacement and optimized
              builds.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {devServerFeatures.map((feature, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {feature.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {feature.title}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  {feature.description}
                </Typography>
              </CardContainer>
            ))}
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                <LucideIcons.Play className="w-5 h-5" />
              </div>
              <Typography
                tag="h3"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Starting the Development Server
              </Typography>
            </div>
            <CodeBlock
              language="bash"
              noExpand={true}
              code={`pnpm dev`}
            />
            <div className="mt-6 space-y-4">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                This command:
              </Typography>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <LucideIcons.Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>
                    Starts the Vite development server on the configured port
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <LucideIcons.Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>Enables Hot Module Replacement for instant updates</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <LucideIcons.Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>
                    Application accessible at http://localhost:4200 (or configured port)
                  </span>
                </li>
              </ul>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Application Features
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              All features integrated in a single standalone application
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-brand">{feature.icon}</div>
                  <Typography
                    tag="p"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    {feature.name}
                  </Typography>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <LucideIcons.Route className="w-4 h-4" />
                    <span className="font-mono text-xs">{feature.path}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Dev Server Works Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How the Dev Server Works
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Understanding the request flow and routing mechanism
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Application Routing
                </Typography>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        React Router
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Client-side routing with BrowserRouter
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        Lazy Loading
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Components are lazy-loaded for optimal performance
                      </Typography>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        Route Matching
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Routes are matched based on path configuration
                      </Typography>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Request Flow
                </Typography>
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-400">Browser Request:</span>
                      <br />
                      <span className="ml-4">
                        GET http://localhost:4200{ROUTES.Landing.Base}
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-yellow-400">
                        (Vite dev server)
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-blue-400">React Router matches route</span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-purple-400">
                        (Component renders)
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-cyan-400">
                        Response returned to browser
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Environment Variables Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Environment Variables
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Configure your development environment with these variables
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                <LucideIcons.FileText className="w-5 h-5" />
              </div>
              <Typography
                tag="h3"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Required Variables
              </Typography>
            </div>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4 text-sm"
            >
              Create a{' '}
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                .env
              </code>{' '}
              file in the root directory:
            </Typography>
            <CodeBlock
              language="env"
              code={`# Application Environment
VITE_APP_ENVIRONMENT=local

# Application Port
VITE_APP_PORT=4200

# API Configuration (optional)
VITE_API_BASE_URL=https://api.example.com/api`}
            />
          </CardContainer>
        </div>
      </section>

      {/* Working with Libraries Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Working with Libraries
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Libraries available in the standalone application
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark mb-8">
            <CodeBlock
              language="typescript"
              code={`import { Component } from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from './store/useAuthGlobalStore';
import { queryClient } from './queries';`}
            />
          </CardContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableLibraries.map((lib, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                    {lib.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {lib.name}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  {lib.description}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Module Replacement Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Hot Module Replacement
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Vite provides HMR for fast development with instant updates
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <CardContainer className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                <LucideIcons.Zap className="w-6 h-6 text-brand dark:text-indigo-400" />
              </div>
              <Typography
                tag="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                Instant Updates
              </Typography>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                Changes to components are reflected immediately
              </Typography>
            </CardContainer>
            <CardContainer className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                <LucideIcons.Save className="w-6 h-6 text-brand dark:text-indigo-400" />
              </div>
              <Typography
                tag="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                State Preservation
              </Typography>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                Component state is preserved during updates
              </Typography>
            </CardContainer>
            <CardContainer className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                <LucideIcons.RefreshCw className="w-6 h-6 text-brand dark:text-indigo-400" />
              </div>
              <Typography
                tag="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                Fast Refresh
              </Typography>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                React Fast Refresh is enabled by default
              </Typography>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Troubleshooting
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Common issues and their solutions
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingItems.map((item, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                    {item.icon}
                  </div>
                  <div className="grow">
                    <Typography
                      tag="h3"
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                    >
                      {item.description}
                    </Typography>
                    <div className="p-3 rounded-lg bg-light-dark border border-gray-200 dark:border-gray-700">
                      <Typography
                        tag="p"
                        className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Solution:
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-600 dark:text-gray-400"
                      >
                        {item.solution}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardContainer className="p-8 lg:p-12 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Rocket className="w-8 h-8 text-white" />
            </div>
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
            >
              Ready to Develop?
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center"
            >
              Start developing the standalone application today
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
                onClick={() => navigate(ROUTES.Landing.ArchitectureOverview)}
              >
                <LucideIcons.Building className="w-5 h-5 mr-2" />
                Architecture
              </Button>
            </div>
          </CardContainer>
        </div>
      </section>
    </div>
  );
};

export default DevelopmentGuide;
