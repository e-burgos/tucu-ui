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

const DevelopmentGuide = () => {
  const navigate = ReactRouter.useNavigate();

  const devServerFeatures = [
    {
      title: 'All Apps on Same Domain',
      description: 'No CORS issues, all apps accessible from a single domain',
      icon: <LucideIcons.Globe className="w-5 h-5" />,
    },
    {
      title: 'Simulates Production',
      description: 'Production-like environment for accurate testing',
      icon: <LucideIcons.Server className="w-5 h-5" />,
    },
    {
      title: 'API Proxy',
      description:
        'Automatic API request proxying with no configuration needed',
      icon: <LucideIcons.Network className="w-5 h-5" />,
    },
    {
      title: 'No CORS Configuration',
      description: "Backend doesn't need CORS setup",
      icon: <LucideIcons.Shield className="w-5 h-5" />,
    },
  ];

  const availableLibraries = [
    {
      name: '@e-burgos/tucu-ui',
      description: 'Design system and UI component library',
      icon: <LucideIcons.Package className="w-5 h-5" />,
    },
    {
      name: '@e-burgos-mfe/utils',
      description: 'Utility functions, route constants, and shared constants',
      icon: <LucideIcons.Wrench className="w-5 h-5" />,
    },
    {
      name: '@e-burgos-mfe/shell',
      description: 'Shell wrapper and layout components',
      icon: <LucideIcons.Layout className="w-5 h-5" />,
    },
    {
      name: '@e-burgos-mfe/api',
      description: 'API client and React Query integration',
      icon: <LucideIcons.Database className="w-5 h-5" />,
    },
    {
      name: '@e-burgos-mfe/auth-security',
      description: 'Authentication and security components',
      icon: <LucideIcons.Lock className="w-5 h-5" />,
    },
  ];

  const appPorts = [
    {
      name: 'Authentication',
      port: 4200,
      path: APP_PATHS.AUTHENTICATION,
      icon: <LucideIcons.Lock className="w-5 h-5" />,
    },
    {
      name: 'Landing',
      port: 4201,
      path: APP_PATHS.LANDING,
      icon: <LucideIcons.Home className="w-5 h-5" />,
    },
    {
      name: 'User Profile',
      port: 4202,
      path: APP_PATHS.USER_PROFILE,
      icon: <LucideIcons.User className="w-5 h-5" />,
    },
    {
      name: 'Dashboard',
      port: 4203,
      path: APP_PATHS.DASHBOARD,
      icon: <LucideIcons.LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const troubleshootingItems = [
    {
      title: 'Port Already in Use',
      description:
        'Update the port in .env.local or stop the process using that port',
      icon: <LucideIcons.AlertCircle className="w-5 h-5" />,
      solution: 'Use `lsof -i :3000` to find and kill the process',
    },
    {
      title: 'CORS Errors',
      description:
        'Use the unified dev server instead of running apps individually',
      icon: <LucideIcons.XCircle className="w-5 h-5" />,
      solution: 'Run `pnpm dev:unified` and verify API configuration',
    },
    {
      title: 'API Requests Fail',
      description:
        'Verify API configuration and ensure the server is accessible',
      icon: <LucideIcons.WifiOff className="w-5 h-5" />,
      solution: 'Check VITE_API_BASE_URL in .env.local and proxy logs',
    },
    {
      title: "Apps Don't Load",
      description: 'Verify all apps are running on their internal ports',
      icon: <LucideIcons.Loader className="w-5 h-5" />,
      solution:
        'Check console output and ensure all apps have finished starting',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Development Guide"
          description="Complete guide for developing with the unified development server and understanding the development workflow"
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

      {/* Unified Dev Server Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Unified Development Server
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              The recommended way to run all applications during development.
              Solves the problem of running micro-frontends on different ports,
              which doesn't reflect production behavior.
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
                Starting the Unified Dev Server
              </Typography>
            </div>
            <CodeBlock
              language="bash"
              noExpand={true}
              code={`pnpm dev:unified`}
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
                    Starts all apps on their internal ports (4200, 4201, 4202,
                    4203)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <LucideIcons.Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>Starts a centralized proxy server on port 3000</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                    <LucideIcons.Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>
                    Makes all apps accessible from a single domain:
                    http://localhost:3000
                  </span>
                </li>
              </ul>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Running Applications Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Running Applications
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Choose between unified mode (recommended) or individual apps
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Unified Mode */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.Server className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Unified Mode (Recommended)
                </Typography>
              </div>
              <CodeBlock language="bash" code={`pnpm dev:unified`} />
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 mt-4 text-sm"
              >
                All apps accessible through{' '}
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  http://localhost:3000/&#123;app-path&#125;
                </code>
              </Typography>
            </CardContainer>

            {/* Individual Apps */}
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                  <LucideIcons.PlayCircle className="w-5 h-5" />
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Individual Apps
                </Typography>
              </div>
              <div className="space-y-3">
                <CodeBlock
                  language="bash"
                  code={`pnpm authentication
pnpm landing
pnpm user-profile
pnpm dashboard`}
                />
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mt-4 text-sm"
                >
                  Each app runs on its configured port (may cause CORS issues)
                </Typography>
              </div>
            </CardContainer>
          </div>

          {/* App Ports Table */}
          <CardContainer className="p-6 lg:p-8 mt-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <Typography
              tag="h3"
              className="text-xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Application Ports
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {appPorts.map((app, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-light-dark border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-brand">{app.icon}</div>
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      {app.name}
                    </Typography>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <LucideIcons.Server className="w-4 h-4" />
                      <span>Port: {app.port}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <LucideIcons.Route className="w-4 h-4" />
                      <span>{app.path}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContainer>
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
                        Proxy Server
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        The server on port 3000 acts as a reverse proxy
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
                        Individual Apps
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Each app runs on its internal port (4200-4203)
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
                        Routing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        The proxy redirects requests based on the path
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
                        GET http://localhost:3000{APP_PATHS.LANDING}/page-1
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-yellow-400">
                        (Intercepted by Vite proxy)
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-blue-400">Proxy Forwards:</span>
                      <br />
                      <span className="ml-4">
                        GET http://localhost:4201{APP_PATHS.LANDING}/page-1
                      </span>
                    </div>
                    <div className="text-center text-gray-500">↓</div>
                    <div>
                      <span className="text-purple-400">
                        (Landing app responds)
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

      {/* API Proxy Configuration Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              API Proxy Configuration
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Automatic API request proxying that solves CORS issues
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="space-y-6">
              <div>
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  How API Requests Work
                </Typography>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-light-dark border border-gray-200 dark:border-gray-700">
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      1. Client-Side Configuration
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                    >
                      In local development, applications use relative paths:
                    </Typography>
                    <CodeBlock
                      language="typescript"
                      code={`export const API_BASE_URL = isLocal ? '/api' : apiBaseUrlFromEnv;
export const AUTH_BASE_URL = \`\${API_BASE_URL}/auth\`;`}
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-light-dark border border-gray-200 dark:border-gray-700">
                    <Typography
                      tag="p"
                      className="font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      2. Proxy Configuration
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400 text-sm"
                    >
                      The unified dev server intercepts all requests to{' '}
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        /api/*
                      </code>{' '}
                      and forwards them to the actual API server configured in{' '}
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        VITE_API_BASE_URL
                      </code>
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Typography
                  tag="h3"
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Benefits
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-3 h-3 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        No CORS Issues
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        All requests appear to come from localhost:3000
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-3 h-3 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Consistent URLs
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        Applications use /api paths that work in both dev and
                        production
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-3 h-3 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Automatic Routing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        The proxy automatically handles translation from local
                        paths to remote API URLs
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-3 h-3 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white text-sm"
                      >
                        Environment-Aware
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-xs"
                      >
                        In production, apps use full URLs directly (no proxy
                        needed)
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Environment Variables Section */}
      <section className="py-20 lg:py-24">
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
                .env.local
              </code>{' '}
              file in the root directory:
            </Typography>
            <CodeBlock
              language="env"
              code={`# Application Environment
VITE_APP_ENVIRONMENT=local

# Application Ports (internal ports for each app)
VITE_APP_AUTHENTICATION_PORT=4200
VITE_APP_LANDING_PORT=4201
VITE_APP_USER_PROFILE_PORT=4202
VITE_APP_DASHBOARD_PORT=4203

# Unified Dev Server Port
VITE_DEV_SERVER_PORT=3000

# Application URLs (for unified dev server)
VITE_APP_AUTHENTICATION_URL=http://localhost:3000/authentication
VITE_APP_LANDING_URL=http://localhost:3000/landing
VITE_APP_USER_PROFILE_URL=http://localhost:3000/user-profile
VITE_APP_DASHBOARD_URL=http://localhost:3000/dashboard

# API Configuration
VITE_API_BASE_URL=https://api.example.com/dev/api
VITE_WEBSOCKET_URL=

# Support Email
VITE_APP_SUPPORT_EMAIL=your-email

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_TAG_ID=your-id`}
            />
          </CardContainer>
        </div>
      </section>

      {/* Working with Libraries Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
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
              Libraries are automatically available through TypeScript path
              mappings
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark mb-8">
            <CodeBlock
              language="typescript"
              code={`import { Component } from '@e-burgos/tucu-ui';
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';`}
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
      <section className="py-20 lg:py-24">
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
      <section className="py-20 lg:py-24 bg-light-dark">
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
              Ready to Develop?
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center"
            >
              Start developing with the unified development server today
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
                onClick={() => navigate(ROUTES.ArchitectureOverview)}
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
