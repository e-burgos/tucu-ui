import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Button,
  Badge,
} from '@e-burgos/tucu-ui';

import HeroPage from '../../components/HeroPage';

export function Components() {
  // Main component sections following menu order
  const mainSections = [
    {
      title: 'UI Components',
      description:
        'Complete overview of all core UI components organized by category',
      icon: <LucideIcons.Component className="w-8 h-8" />,
      href: '/ui-components',
      componentCount: 57,
      gradient: 'from-blue-500 to-cyan-500',
      examples: ['Auth forms', 'Interactive elements', 'Data display'],
    },
    {
      title: 'Blockchain',
      description:
        'Specialized components for blockchain and Web3 applications',
      icon: <LucideIcons.Coins className="w-8 h-8" />,
      href: '/blockchain',
      componentCount: 8,
      gradient: 'from-green-500 to-emerald-500',
      examples: ['Wallet connection', 'Transactions', 'DeFi interfaces'],
    },
  ];

  // Form-related sections
  const formSections = [
    {
      title: 'Form System',
      description: 'Complete form solution with validation and accessibility',
      icon: <LucideIcons.FileText className="w-6 h-6" />,
      href: '/form-system',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Form Examples',
      description: 'Interactive examples and real-world patterns',
      icon: <LucideIcons.FormInput className="w-6 h-6" />,
      href: '/form-system/example',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Code Examples',
      description: 'Implementation patterns and best practices',
      icon: <LucideIcons.Code className="w-6 h-6" />,
      href: '/form-system/code-example',
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  const coreComponents = [
    'Button',
    'Input',
    'Select',
    'Checkbox',
    'Radio',
    'Textarea',
    'Card',
    'Modal',
    'Dropdown',
    'Tabs',
    'Accordion',
    'Badge',
    'Alert',
    'Toast',
    'Spinner',
    'Avatar',
    'Breadcrumb',
    'Pagination',
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Components"
        description="Explore our comprehensive component library with production-ready components for modern web applications. From UI primitives to specialized blockchain interfaces."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Main Component Sections */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Component Sections
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our main component categories organized for modern web
            development
          </Typography>
        </div>

        {/* Primary Sections - Following Menu Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainSections.map((section, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 bg-gradient-to-br ${section.gradient} rounded-xl shadow-lg`}
                  >
                    <div className="text-white">{section.icon}</div>
                  </div>
                  <Badge variant="default" className="text-sm font-medium">
                    {section.componentCount} components
                  </Badge>
                </div>

                <Typography tag="h3" className="text-xl font-bold mb-3">
                  {section.title}
                </Typography>

                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  {section.description}
                </Typography>

                <div className="flex flex-wrap gap-2 mb-6">
                  {section.examples.map((example, idx) => (
                    <Badge key={idx} variant="default" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>

                <Button
                  fullWidth
                  className={`bg-gradient-to-r ${section.gradient} hover:shadow-lg transition-all duration-200 text-white border-0`}
                  onClick={() => window.open(section.href, '_self')}
                >
                  <div className="flex items-center justify-center gap-2">
                    Explore {section.title}
                    <LucideIcons.ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </div>
            </CardContainer>
          ))}
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <div className="text-center">
            <Typography tag="h2" className="mb-4 text-3xl font-bold">
              Form Solutions
            </Typography>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Complete form ecosystem with validation, examples, and
              implementation patterns
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formSections.map((section, index) => (
              <CardContainer
                key={index}
                className="w-full flex flex-col justify-center items-center hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br ${section.gradient} rounded-xl shadow-lg mb-4`}
                  >
                    <div className="text-white">{section.icon}</div>
                  </div>

                  <Typography tag="h4" className="font-semibold mb-2">
                    {section.title}
                  </Typography>

                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                  >
                    {section.description}
                  </Typography>

                  <Button
                    variant="ghost"
                    fullWidth
                    className="group-hover:border-brand group-hover:text-brand transition-colors"
                    onClick={() => window.open(section.href, '_self')}
                  >
                    View {section.title}
                  </Button>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Component Showcase */}
      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-4 text-3xl font-bold">
            Popular Components
          </Typography>
          <Typography
            tag="p"
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            Essential UI components ready to use in your applications
          </Typography>
        </div>

        <CardContainer className="p-24">
          <div className="flex w-full items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <LucideIcons.Grid3X3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Typography tag="h4" className="font-semibold">
                Core Components
              </Typography>
            </div>
            <Badge variant="default" className="text-xs font-medium truncate">
              {coreComponents.length} components
            </Badge>
          </div>

          <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-4">
            {coreComponents.map((component, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <Typography tag="p" className="text-xs font-medium truncate">
                  {component}
                </Typography>
              </div>
            ))}
          </div>
        </CardContainer>
      </section>

      {/* Key Features */}
      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-4 text-3xl font-bold">
            Built for Production
          </Typography>
          <Typography
            tag="p"
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            Modern standards and best practices in every component
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardContainer className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2">
              <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                <LucideIcons.Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Typography tag="h4" className="font-semibold mb-2">
                TypeScript First
              </Typography>
            </div>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Full type safety with comprehensive definitions and IntelliSense
              support
            </Typography>
          </CardContainer>

          <CardContainer className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2">
              <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mb-4">
                <LucideIcons.Accessibility className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <Typography tag="h4" className="font-semibold mb-2">
                WCAG 2.1 AA
              </Typography>
            </div>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              WCAG 2.1 AA compliant with ARIA attributes and keyboard navigation
            </Typography>
          </CardContainer>

          <CardContainer className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2">
              <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
                <LucideIcons.Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <Typography tag="h4" className="font-semibold mb-2">
                Highly Customizable
              </Typography>
            </div>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Flexible theming with CSS variables and custom styling options
            </Typography>
          </CardContainer>
        </div>
      </section>
    </div>
  );
}
