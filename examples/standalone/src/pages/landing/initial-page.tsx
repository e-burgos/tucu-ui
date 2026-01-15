import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../../router/routes-config';

const InitialPage = () => {
  const navigate = ReactRouter.useNavigate();

  const features = [
    {
      icon: <LucideIcons.Package className="w-8 h-8" />,
      title: 'Standalone Application',
      description:
        'Single application with all routes integrated, perfect for traditional SPAs.',
    },
    {
      icon: <LucideIcons.Menu className="w-8 h-8" />,
      title: 'Menu-Driven Routing',
      description:
        'Routes automatically generated from menu items configuration for simplicity.',
    },
    {
      icon: <LucideIcons.Shield className="w-8 h-8" />,
      title: 'Route Protection',
      description:
        'Built-in support for public/private routes with automatic authentication handling.',
    },
    {
      icon: <LucideIcons.Navigation className="w-8 h-8" />,
      title: 'SPA Navigation',
      description:
        'Seamless React Router navigation within the same application for smooth user experience.',
    },
    {
      icon: <LucideIcons.Code className="w-8 h-8" />,
      title: 'Type-Safe',
      description:
        'Full TypeScript support with discriminated unions ensuring correct standalone mode configuration.',
    },
    {
      icon: <LucideIcons.Rocket className="w-8 h-8" />,
      title: 'Single Deployment',
      description:
        'One build, one deployment - simple and straightforward application deployment.',
    },
  ];

  const apps = [
    {
      name: 'Authentication',
      description:
        'Complete authentication flow with login, sign-up, password reset, and phone verification',
      icon: <LucideIcons.Lock className="w-6 h-6" />,
      path: ROUTES.Authentication.Login,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Dashboard',
      description: 'Admin dashboard with sidebar layout and protected routes',
      icon: <LucideIcons.LayoutDashboard className="w-6 h-6" />,
      path: ROUTES.Dashboard.Base,
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'User Profile',
      description: 'User profile management with horizontal navigation layout',
      icon: <LucideIcons.User className="w-6 h-6" />,
      path: ROUTES.UserProfile.Base,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  const documentationLinks = [
    {
      title: 'Integration Guide',
      description:
        'Complete step-by-step guide for integrating a new standalone application',
      icon: <LucideIcons.BookOpen className="w-5 h-5" />,
      href: ROUTES.Landing.IntegrationGuide,
    },
    {
      title: 'Architecture Overview',
      description: 'Understand how standalone architecture works with Tucu-UI',
      icon: <LucideIcons.Building className="w-5 h-5" />,
      href: ROUTES.Landing.ArchitectureOverview,
    },
    {
      title: 'Development Guide',
      description: 'Development workflow, dev server, and environment setup',
      icon: <LucideIcons.Terminal className="w-5 h-5" />,
      href: ROUTES.Landing.DevelopmentGuide,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="Standalone Application Architecture"
          description="Built with @e-burgos/tucu-ui and designed for traditional single-page applications"
          icon={
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Package className="w-10 h-10 text-white" />
            </div>
          }
          content={
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.IntegrationGuide)}
                className="min-w-[200px]"
              >
                <LucideIcons.Rocket className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.ArchitectureOverview)}
                className="min-w-[200px]"
              >
                <LucideIcons.BookOpen className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          }
        />
      </section>

      {/* Features Section */}
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
              Everything you need to build and deploy standalone applications with
              Tucu-UI
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-14 h-14 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {feature.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {feature.title}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  {feature.description}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview Section */}
      <section className="py-20 lg:py-24 bg-gray-50 bg-light-dark">
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
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Standalone application architecture with menu-driven routing
            </Typography>
          </div>

          <CardContainer className="p-8 lg:p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Typography
                  tag="h3"
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  How It Works
                </Typography>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                      <LucideIcons.Check className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <Typography
                        tag="p"
                        className="font-semibold text-gray-900 dark:text-white"
                      >
                        Menu-Driven Routing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Routes automatically generated from menu items configuration
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
                        ThemeProvider Integration
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Direct integration with ThemeProvider for consistent theming and navigation
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
                        Tucu-UI Standalone Support
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Built-in standalone mode in ThemeProvider (default) via discriminated
                        unions
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
                        SPA Navigation
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400 text-sm"
                      >
                        Seamless React Router navigation within the same application
                      </Typography>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-linear-to-br from-brand/5 to-indigo-500/10 dark:from-brand/10 dark:to-indigo-900/20 rounded-2xl p-8 border border-brand/20 dark:border-brand/30">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-brand"></div>
                      <Typography
                        tag="p"
                        className="text-sm font-mono text-gray-700 dark:text-gray-300"
                      >
                        Standalone Application
                      </Typography>
                    </div>
                    <div className="pl-6 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <Typography
                          tag="p"
                          className="text-sm font-mono text-gray-600 dark:text-gray-400"
                        >
                          {ROUTES.Authentication.Login} → Authentication
                        </Typography>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <Typography
                          tag="p"
                          className="text-sm font-mono text-gray-600 dark:text-gray-400"
                        >
                          {ROUTES.Landing.Base} → Landing
                        </Typography>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <Typography
                          tag="p"
                          className="text-sm font-mono text-gray-600 dark:text-gray-400"
                        >
                          {ROUTES.Dashboard.Base} → Dashboard
                        </Typography>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <Typography
                          tag="p"
                          className="text-sm font-mono text-gray-600 dark:text-gray-400"
                        >
                          {ROUTES.UserProfile.Base} → User Profile
                        </Typography>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <LucideIcons.Package className="w-4 h-4 text-gray-500" />
                        <Typography
                          tag="p"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          All features integrated in a single standalone app
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Example Apps Section */}
      <section className="py-20 lg:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Example Applications
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Explore our standalone application features
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <div
                key={index}
                onClick={() => navigate(app.path)}
                className="cursor-pointer"
              >
                <CardContainer className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${app.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {app.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {app.name}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    {app.description}
                  </Typography>
                  <Button
                    variant="ghost"
                    color="primary"
                    size="small"
                    className="w-full group-hover:bg-brand/10"
                  >
                    Explore App
                    <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-20 lg:py-24 bg-light-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Documentation
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Comprehensive guides to help you build with Standalone Applications
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentationLinks.map((doc, index) => (
              <div
                key={index}
                onClick={() => navigate(doc.href)}
                className="cursor-pointer"
              >
                <CardContainer className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group bg-white dark:bg-dark">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand group-hover:bg-brand/20 dark:group-hover:bg-brand/30 transition-colors">
                      {doc.icon}
                    </div>
                    <Typography
                      tag="h3"
                      className="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      {doc.title}
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 text-sm mb-4"
                  >
                    {doc.description}
                  </Typography>
                  <div className="flex items-center text-brand text-sm font-medium group-hover:gap-2 transition-all">
                    Read More
                    <LucideIcons.ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CardContainer className="p-8 lg:p-12 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Rocket className="w-8 h-8 text-white" />
            </div>
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Ready to Build?
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            >
              Start building your standalone application with Tucu-UI today
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Landing.IntegrationGuide)}
              >
                <LucideIcons.BookOpen className="w-5 h-5 mr-2" />
                Read Integration Guide
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Authentication.Login)}
              >
                <LucideIcons.ExternalLink className="w-5 h-5 mr-2" />
                View Example Apps
              </Button>
            </div>
          </CardContainer>
        </div>
      </section>
    </div>
  );
};

export default InitialPage;
