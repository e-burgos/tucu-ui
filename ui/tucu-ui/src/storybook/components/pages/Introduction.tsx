import {
  CardContainer,
  Button,
  Badge,
  Typography,
  AnchorLink,
  Scrollbar,
  CardTitle,
} from '../../../components';

import { useTheme } from '../../../themes';
import {
  Github,
  Palette,
  Rocket,
  Smartphone,
  Zap,
  Code,
  Moon,
  Layout,
  Check,
  BookOpen,
  Eye,
  MessageCircle,
  BarChart,
  MousePointer,
  Coins,
  Sparkles,
  Navigation,
  FileText,
} from 'lucide-react';

export function Introduction() {
  const { mode } = useTheme();
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            ></div>
          </div>

          <div className="relative text-center">
            {/* <img
              src={mode !== 'dark' ? BannerDark : Banner}
              alt="Tucu UI"
              className="mx-auto mb-6 h-16 sm:h-20 md:h-24"
            /> */}

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-6xl mx-auto leading-relaxed"
            >
              A modern, comprehensive React component library built with
              TypeScript and Tailwind CSS. Designed for developers who need
              production-ready components that are both beautiful and
              functional.
            </Typography>

            <div className="flex flex-wrap sm:flex-row gap-4 justify-center mt-8 max-w-md mx-auto sm:max-w-none">
              <Button
                size="large"
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <AnchorLink to={''} target="_blank">
                  <div className="flex justify-center items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Started
                  </div>
                </AnchorLink>
              </Button>
              <Button
                variant="ghost"
                size="large"
                className="border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-center items-center">
                  <AnchorLink
                    to={'https://github.com/e-burgos/tucu-ui'}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <Github className="w-5 h-5 mr-2" />
                      View on GitHub
                    </div>
                  </AnchorLink>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
              icon: <Palette className="w-8 h-8 text-purple-500" />,
              title: 'Complete Design System',
              description:
                'Consistent visual language with 80+ components and comprehensive theming',
              color: 'from-purple-500 to-gray-500',
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: 'Production Ready',
              description:
                'Battle-tested components used in real-world applications with TypeScript support',
              color: 'from-orange-500 to-gray-500',
            },
            {
              icon: <Code className="w-8 h-8 text-blue-500" />,
              title: 'Developer Friendly',
              description:
                'Fully typed with excellent IDE support and comprehensive documentation',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: <Smartphone className="w-8 h-8 text-green-500" />,
              title: 'Responsive First',
              description:
                'Mobile-first approach with seamless responsive behavior across all devices',
              color: 'from-green-500 to-emerald-500',
            },
            {
              icon: <Moon className="w-8 h-8 text-indigo-500" />,
              title: 'Dark Mode Native',
              description:
                'Built-in dark/light theme support with smooth transitions',
              color: 'from-indigo-500 to-purple-500',
            },
            {
              icon: <Eye className="w-8 h-8 text-red-500" />,
              title: 'Accessible',
              description:
                'WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation',
              color: 'from-red-500 to-pink-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}
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
                      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
                  },
                  {
                    name: 'TypeScript',
                    description: 'Type safety and better developer experience',
                    icon: '📘',
                    color:
                      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
                  },
                  {
                    name: 'Tailwind CSS',
                    description:
                      'Utility-first styling with custom design tokens',
                    icon: '🎨',
                    color:
                      'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
                  },
                  {
                    name: 'Framer Motion',
                    description: 'Smooth animations and micro-interactions',
                    icon: '🎭',
                    color:
                      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
                  },
                  {
                    name: 'Nx Monorepo',
                    description: 'Efficient development and build optimization',
                    icon: '🏗️',
                    color:
                      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
                  },
                  {
                    name: 'React Hook Form',
                    description: 'Performant forms with minimal re-renders',
                    icon: '📝',
                    color:
                      'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
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
                  <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-gray-600 transition-colors overflow-x-auto">
                    <Typography
                      className="border-0 text-sm sm:text-base"
                      tag="code"
                    >
                      npm install @e-burgos/tucu-ui
                    </Typography>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    2. Basic Usage
                  </Typography>
                  <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-gray-600 transition-colors overflow-x-auto">
                    <Scrollbar
                      autoHide="leave"
                      direction="vertical"
                      style={{
                        height: '300px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'normal',
                        overflowWrap: 'normal',
                        wordWrap: 'normal',
                        lineBreak: 'normal',
                        fontFamily: 'monospace',
                      }}
                    >
                      {`import { Button, CardContainer, Avatar, ThemeProvider } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

function App() {
  return (
    <ThemeProvider>
      <CardContainer className="p-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar image={avatarImage} alt="Demo User" size="md" />
            <div className="flex-1 text-center sm:text-left">
              <Typography tag="h5" className="font-semibold mb-2">
                Welcome to Tucu UI
              </Typography>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge status="active">Production Ready</Badge>
                <Badge variant="outline" color="info">
                  TypeScript
                </Badge>
                <Badge variant="outline" color="success">
                  React Hook Form
                </Badge>
                <Badge variant="outline" color="warning">
                  Tailwind CSS
                </Badge>
              </div>
            </div>
            <Button size="small" shape="circle" fullWidth>
              <div className="flex justify-center items-center">
                <LucideIcons.Zap className="w-4 h-4 mr-2" />
                Get Started
              </div>
            </Button>
          </div>
        </div>
      </CardContainer>
    </ThemeProvider>
  );
}`}
                    </Scrollbar>
                  </div>
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
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* <Avatar image={avatarImage} alt="Demo User" size="lg" /> */}
                      <div className="flex-1 text-center sm:text-left">
                        <Typography tag="h5" className="font-semibold mb-2">
                          Welcome to Tucu UI
                        </Typography>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <Badge status="active">Production Ready</Badge>
                          <Badge variant="outline" color="info">
                            TypeScript
                          </Badge>
                          <Badge variant="outline" color="success">
                            React Hook Form
                          </Badge>
                          <Badge variant="outline" color="warning">
                            Tailwind CSS
                          </Badge>
                        </div>
                      </div>
                      <Button size="small" shape="circle" fullWidth>
                        <div className="flex justify-center items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Get Started
                        </div>
                      </Button>
                    </div>
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
              icon: <Layout className="w-6 h-6" />,
              title: 'Layout',
              description: 'Containers, grids, and structural components',
              count: '12+',
              color: 'text-blue-500',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            },
            {
              icon: <Navigation className="w-6 h-6" />,
              title: 'Navigation',
              description: 'Menus, tabs, breadcrumbs, and navigation',
              count: '8+',
              color: 'text-green-500',
              bgColor: 'bg-green-50 dark:bg-green-900/20',
            },
            {
              icon: <FileText className="w-6 h-6" />,
              title: 'Forms',
              description: 'Inputs, selectors, validation utilities',
              count: '15+',
              color: 'text-purple-500',
              bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            },
            {
              icon: <MessageCircle className="w-6 h-6" />,
              title: 'Feedback',
              description: 'Alerts, modals, notifications, loading',
              count: '10+',
              color: 'text-orange-500',

              bgColor: 'bg-gray-50 dark:bg-gray-00/20',
            },
            {
              icon: <BarChart className="w-6 h-6" />,
              title: 'Data Display',
              description: 'Tables, cards, lists, visualization',
              count: '12+',
              color: 'text-red-500',
              bgColor: 'bg-red-50 dark:bg-red-900/20',
            },
            {
              icon: <MousePointer className="w-6 h-6" />,
              title: 'Interactive',
              description: 'Buttons, dropdowns, tooltips, controls',
              count: '18+',
              color: 'text-current',
              bgColor: 'bg-red-50 dark:bg-red-900/20',
            },
            {
              icon: <Coins className="w-6 h-6" />,
              title: 'Blockchain',
              description: 'Web3 components for DeFi applications',
              count: '8+',
              color: 'text-yellow-500',
              bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: 'Utilities',
              description: 'Hooks, helpers, and utility functions',
              count: '15+',
              color: 'text-black',
              bgColor: 'bg-gray-50 dark:bg-gray-00/20',
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
                  <span className={category.color}>{category.icon}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Typography tag="h4" className="font-semibold">
                      {category.title}
                    </Typography>
                    <Badge variant="outline" className="text-sm">
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
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Component API with detailed props and examples
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Theming system for colors, spacing, and typography
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Advanced form handling with validation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Accessibility features and best practices
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                  <Button size="medium">
                    <AnchorLink to={''} target="_blank">
                      <div className="flex justify-center items-center ">
                        <BookOpen className="w-4 h-4 mr-2" />
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
                        <Code className="w-4 h-4 mr-2" />
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
