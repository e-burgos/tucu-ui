import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Button,
  Badge,
} from '@tucu-ui';

import HeroPage from '../components/HeroPage';

export function Components() {
  const componentCategories = [
    {
      title: 'Form System',
      description:
        'Complete form solution with validation, error handling, and accessibility features',
      icon: <LucideIcons.FileText className="w-8 h-8" />,
      href: '/form-system',
      examples: ['Form validation', 'Error handling', 'Field types'],
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Form Example',
      description:
        'Interactive form examples demonstrating real-world usage patterns',
      icon: <LucideIcons.FormInput className="w-8 h-8" />,
      href: '/form-system/example',
      examples: ['Registration forms', 'Contact forms', 'Settings forms'],
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Code Example',
      description:
        'Code examples and implementation patterns for form components',
      icon: <LucideIcons.Code className="w-8 h-8" />,
      href: '/form-system/code-example',
      examples: ['Form validation', 'API integration', 'State management'],
      status: 'Available',
      statusColor: 'bg-green-500',
    },
    {
      title: 'Blockchain',
      description:
        'Specialized components for blockchain and Web3 applications',
      icon: <LucideIcons.Coins className="w-8 h-8" />,
      href: '/blockchain',
      examples: [
        'Wallet connection',
        'Transaction display',
        'Token management',
      ],
      status: 'Available',
      statusColor: 'bg-green-500',
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
    <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Components"
        description="Explore our comprehensive component library built with React, TypeScript, and modern design principles. From simple form controls to complex layouts, find everything you need to build beautiful interfaces."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
        backgroundAnimation
      />

      {/* Component Overview */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Component Library
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A complete set of production-ready components designed for
            accessibility, performance, and developer experience.
          </Typography>
        </div>

        {/* Component Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {componentCategories.map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="p-6 w-full flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-brand/10 dark:bg-brand/20 rounded-lg text-brand">
                    {category.icon}
                  </div>
                  <Typography tag="h3" className="text-lg font-semibold">
                    {category.title}
                  </Typography>
                </div>

                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                >
                  {category.description}
                </Typography>

                <div className="flex flex-wrap gap-1 mb-4">
                  {category.examples.map((example, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  fullWidth
                  className="w-full group-hover:bg-brand group-hover:text-white transition-colors"
                  onClick={() => window.open(category.href, '_self')}
                >
                  <div className="flex items-center gap-2">
                    Explore {category.title}
                    <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Button>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Core Components */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Core Components
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Essential UI components that form the foundation of your
            applications
          </Typography>
        </div>

        <CardContainer>
          <CardTitle
            title="Available Components"
            className="flex items-center gap-2"
          >
            <LucideIcons.Grid3X3 className="w-5 h-5 text-blue-500" />
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              {coreComponents.length} core components ready to use
            </Typography>

            <div className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {coreComponents.map((component, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center hover:bg-brand/10 dark:hover:bg-brand/20 transition-colors cursor-pointer"
                  >
                    <Typography tag="p" className="text-sm font-medium">
                      {component}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Component Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Component Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Every component is built with modern standards and best practices
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardContainer>
            <CardTitle title="TypeScript First" className="flex flex-col gap-2">
              <LucideIcons.Code className="w-5 h-5 text-blue-500" />
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Full TypeScript support
              </Typography>

              <div className="mt-4 space-y-2">
                <Typography tag="p" className="text-sm">
                  • Comprehensive type definitions
                </Typography>
                <Typography tag="p" className="text-sm">
                  • IntelliSense support
                </Typography>
                <Typography tag="p" className="text-sm">
                  • Type-safe props
                </Typography>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle
              title="Accessible by Default"
              className="flex flex-col gap-2"
            >
              <LucideIcons.Accessibility className="w-5 h-5 text-green-500" />
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                WCAG 2.1 AA compliant
              </Typography>

              <div className="mt-4 space-y-2">
                <Typography tag="p" className="text-sm">
                  • ARIA attributes
                </Typography>
                <Typography tag="p" className="text-sm">
                  • Keyboard navigation
                </Typography>
                <Typography tag="p" className="text-sm">
                  • Screen reader support
                </Typography>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle
              title="Highly Customizable"
              className="flex flex-col gap-2"
            >
              <LucideIcons.Palette className="w-5 h-5 text-purple-500" />
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Flexible and extensible
              </Typography>

              <div className="mt-4 space-y-2">
                <Typography tag="p" className="text-sm">
                  • CSS variables support
                </Typography>
                <Typography tag="p" className="text-sm">
                  • Custom styling props
                </Typography>
                <Typography tag="p" className="text-sm">
                  • Theme integration
                </Typography>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </div>
  );
}
