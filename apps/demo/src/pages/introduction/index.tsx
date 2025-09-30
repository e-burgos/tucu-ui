import {
  CardContainer,
  Button,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  useTheme,
  CardTitle,
  CodeBlock,
  Alert,
} from 'tucu-ui';

import { DOCUMENTATION_URL } from '../../utils/constants';
import Banner from '../../assets/images/logos/tucu-ui-logo-white.svg';
import BannerDark from '../../assets/images/logos/tucu-ui-logo-black.svg';
import HeroPage from '../../components/HeroPage';
import { Home } from './BasicUsageExample';
import BasicUsageCode from './BasicUsageExample?raw';
import BasicUsageWithCustomRouterCode from './BasicUsageWithCustomRouterExample?raw';

const installation = `
npm install tucu-ui

// or with pnpm

pnpm install tucu-ui
`;

export function Introduction() {
  const { mode } = useTheme();

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        description="A modern, comprehensive React component library built with TypeScript and Tailwind CSS. Designed for developers who need production-ready components that are both beautiful and functional."
        githubButton
        getStartedButton
        backgroundAnimation
        icon={
          <img
            src={mode !== 'dark' ? BannerDark : Banner}
            alt="Tucu UI"
            className="relative h-16 sm:h-20 md:h-24 filter drop-shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        }
      />

      {/* Key Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Why Choose Tucu UI?
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built with modern best practices and designed for real-world
            applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Complete Design System',
              description:
                'Consistent visual language with 80+ components and comprehensive theming',
              color: 'from-purple-500 via-purple-600 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Production Ready',
              description:
                'Battle-tested components used in real-world applications with TypeScript support',
              color: 'from-orange-500 via-yellow-500 to-amber-500',
            },
            {
              icon: (
                <LucideIcons.Code className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Developer Friendly',
              description:
                'Fully typed with excellent IDE support and comprehensive documentation',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Smartphone className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Responsive First',
              description:
                'Mobile-first approach with seamless responsive behavior across all devices',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dark Mode Native',
              description:
                'Built-in dark/light theme support with smooth transitions',
              color: 'from-indigo-500 via-purple-500 to-violet-500',
            },
            {
              icon: (
                <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Accessible',
              description:
                'WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation',
              color: 'from-red-500 via-pink-500 to-rose-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Technology Foundation" className="mt-2 mb-2">
            <div className="w-full space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    name: 'React 18+',
                    description: 'Modern hooks and concurrent features',
                    icon: '⚛️',
                    color:
                      'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
                  },
                  {
                    name: 'TypeScript',
                    description: 'Type safety and better developer experience',
                    icon: '📘',
                    color:
                      'bg-gradient-to-br from-indigo-500/10 to-blue-500/10 text-indigo-700 border-indigo-200 dark:from-indigo-400/20 dark:to-blue-400/20 dark:text-indigo-300 dark:border-indigo-700',
                  },
                  {
                    name: 'Tailwind CSS',
                    description:
                      'Utility-first styling with custom design tokens',
                    icon: '🎨',
                    color:
                      'bg-gradient-to-br from-cyan-500/10 to-teal-500/10 text-cyan-700 border-cyan-200 dark:from-cyan-400/20 dark:to-teal-400/20 dark:text-cyan-300 dark:border-cyan-700',
                  },
                  {
                    name: 'Framer Motion',
                    description: 'Smooth animations and micro-interactions',
                    icon: '🎭',
                    color:
                      'bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200 dark:from-purple-400/20 dark:to-pink-400/20 dark:text-purple-300 dark:border-purple-700',
                  },
                  {
                    name: 'Nx Monorepo',
                    description: 'Efficient development and build optimization',
                    icon: '🏗️',
                    color:
                      'bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-700 border-emerald-200 dark:from-emerald-400/20 dark:to-green-400/20 dark:text-emerald-300 dark:border-emerald-700',
                  },
                  {
                    name: 'React Hook Form',
                    description: 'Performant forms with minimal re-renders',
                    icon: '📝',
                    color:
                      'bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-700 border-orange-200 dark:from-orange-400/20 dark:to-red-400/20 dark:text-orange-300 dark:border-orange-700',
                  },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ${tech.color}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <Typography tag="h4" className="font-semibold">
                        {tech.name}
                      </Typography>
                    </div>
                    <Typography tag="p" className="text-sm opacity-80">
                      {tech.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Quick Start" className="mt-2 mb-2">
            <div className="w-full space-y-6">
              <Typography
                tag="p"
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
              >
                Get up and running with Tucu UI in minutes:
              </Typography>

              <div className="space-y-6">
                {/* Installation */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    1. Installation
                  </Typography>
                  <CodeBlock
                    noExpand={true}
                    language="bash"
                    code={installation}
                  />
                </div>

                {/* Usage Example */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    2. Basic Usage
                  </Typography>
                  <Alert variant="info" dismissible={false}>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      This example shows how to use the Basic Usage. This
                      implementation is ideal for apps that need a layout and
                      navigation all in one place.
                    </Typography>
                  </Alert>
                  <CodeBlock language="tsx" code={BasicUsageCode} />
                </div>
                {/* Usage Example */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    3. Basic Usage with Custom Router
                  </Typography>
                  <Alert variant="info" dismissible={false}>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      This example shows how to use the Basic Usage with Custom
                      Router. This implementation is ideal for apps that need
                      custom routes and layouts.
                    </Typography>
                  </Alert>
                  <CodeBlock
                    language="tsx"
                    code={BasicUsageWithCustomRouterCode}
                  />
                </div>
                {/* Live Demo */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    3. Live Demo
                  </Typography>
                  <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Home />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Component Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Component Overview
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive collection of components organized by
            category
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Layout',
              description: 'Containers, grids, and structural components',
              count: '12+',
              bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Navigation className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Navigation',
              description: 'Menus, tabs, breadcrumbs, and navigation',
              count: '8+',
              bgColor:
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.FileText className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Forms',
              description: 'Inputs, selectors, validation utilities',
              count: '15+',
              bgColor:
                'bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.MessageCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Feedback',
              description: 'Alerts, modals, notifications, loading',
              count: '10+',
              bgColor:
                'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.BarChart className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Data Display',
              description: 'Tables, cards, lists, visualization',
              count: '12+',
              bgColor: 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.MousePointer className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Interactive',
              description: 'Buttons, dropdowns, tooltips, controls',
              count: '18+',
              bgColor:
                'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Coins className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Blockchain',
              description: 'Web3 components for DeFi applications',
              count: '8+',
              bgColor:
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Utilities',
              description: 'Hooks, helpers, and utility functions',
              count: '15+',
              bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg',
            },
          ].map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full space-y-4 text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  {category.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Typography tag="h4" className="font-semibold">
                      {category.title}
                    </Typography>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {category.description}
                  </Typography>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <CardContainer>
          <CardTitle
            title="What's Next?"
            className="mt-2 mb-2 dark:border-current"
          >
            <div className="flex items-start gap-4">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Ready to dive deeper? Explore our comprehensive documentation
                  to learn more about:
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Component API with detailed props and examples
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Theming system for colors, spacing, and typography
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Advanced form handling with validation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Accessibility features and best practices
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                  <Button size="medium">
                    <AnchorLink to={DOCUMENTATION_URL} target="_blank">
                      <div className="flex justify-center items-center ">
                        <LucideIcons.BookOpen className="w-4 h-4 mr-2" />
                        Browse Documentation
                      </div>
                    </AnchorLink>
                  </Button>
                  <Button variant="ghost" size="medium">
                    <AnchorLink
                      to={
                        'https://main--683712ba90eaad206f988c65.chromatic.com/?path=/story/3-ui-components-auth-forgetpasswordform--default'
                      }
                      target="_blank"
                    >
                      <div className="flex justify-center items-center">
                        <LucideIcons.Code className="w-4 h-4 mr-2" />
                        View Examples
                      </div>
                    </AnchorLink>
                  </Button>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
