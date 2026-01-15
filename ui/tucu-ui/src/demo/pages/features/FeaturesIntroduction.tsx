import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Button,
  HeroCard,
} from '../../../../index';

export function FeaturesIntroduction() {
  const features = [
    {
      title: 'Icons System',
      description:
        'Complete Lucide React icons integration with theme-aware colors and consistent sizing. Access to 98+ custom icons and 5000+ Lucide icons through a unified API.',
      icon: <LucideIcons.Sparkles className="w-8 h-8" />,
      href: '/icons-system',
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Accessibility',
      description:
        'WCAG 2.1 AA compliant components with ARIA support, keyboard navigation, and screen reader compatibility. Built with inclusivity in mind.',
      icon: <LucideIcons.Accessibility className="w-8 h-8" />,
      href: '/accessibility',
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Hooks Utilities',
      description:
        'Powerful custom hooks for state management, API calls, local storage, and common React patterns. Enhance your development experience with reusable logic.',
      icon: <LucideIcons.Settings className="w-8 h-8" />,
      href: '/hooks-utilities',
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Routing System',
      description:
        'Powerful and flexible routing system built on React Router with automatic navigation generation, nested routes support, and micro frontends (MFE) support.',
      icon: <LucideIcons.Route className="w-8 h-8" />,
      href: '/routing-system',
      status: 'Available',
      statusColor: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Features"
        description="Explore the powerful features and utilities that make tucu-ui a comprehensive design system. From accessibility to performance optimizations, discover what makes our components special."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Features Overview */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Core Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built with modern web standards and best practices, our features
            ensure your applications are accessible, performant, and
            maintainable.
          </Typography>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-lg transition-shadow "
            >
              <div className="p-6 w-full flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-brand/10 dark:bg-brand/20 rounded-lg text-brand">
                    {feature.icon}
                  </div>
                  <Typography tag="h3" className="text-lg font-semibold ">
                    {feature.title}
                  </Typography>
                </div>

                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                >
                  {feature.description}
                </Typography>

                <Button
                  variant="ghost"
                  fullWidth
                  className="w-full group-hover:bg-brand group-hover:text-white transition-colors"
                  onClick={() => (window.location.href = feature.href)}
                >
                  <div className="flex items-center  gap-2">
                    Explore {feature.title}
                    <LucideIcons.ArrowRight className="w-4 h-4 " />
                  </div>
                </Button>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Why Choose Our Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Each feature is carefully designed to solve real-world problems
            while maintaining high standards
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CardContainer>
            <CardTitle
              title="Accessibility First"
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <LucideIcons.Accessibility className="w-5 h-5 text-blue-500" />
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  WCAG 2.1 AA compliant by default
                </Typography>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      Keyboard Navigation
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Full keyboard support for all interactive elements
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      Screen Reader Support
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Proper ARIA labels and semantic HTML structure
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      Focus Management
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Visible focus indicators and logical tab order
                    </Typography>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle
              title="Developer Experience"
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <LucideIcons.Code className="w-5 h-5 text-purple-500" />
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Built for productivity and maintainability
                </Typography>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      TypeScript Support
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Full type safety with comprehensive TypeScript definitions
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      Modern React Patterns
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Hooks, Context API, and functional components
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="p" className="font-medium">
                      Comprehensive Documentation
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      Interactive examples and detailed API references
                    </Typography>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Get Started with Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our feature-rich components and utilities designed to
            enhance your development experience
          </Typography>
        </div>

        <CardContainer>
          <CardTitle
            title="Feature Categories"
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="w-5 h-5 text-indigo-500" />
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Organized by functionality for easy discovery
              </Typography>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <LucideIcons.Palette className="w-5 h-5 text-indigo-500" />
                  <Typography tag="p" className="font-medium">
                    Design System
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Consistent theming, colors, and component library
                </Typography>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <LucideIcons.Accessibility className="w-5 h-5 text-blue-500" />
                  <Typography tag="p" className="font-medium">
                    Accessibility
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  WCAG compliant components and utilities
                </Typography>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <LucideIcons.Zap className="w-5 h-5 text-yellow-500" />
                  <Typography tag="p" className="font-medium">
                    Performance
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Optimized rendering and bundle size management
                </Typography>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
