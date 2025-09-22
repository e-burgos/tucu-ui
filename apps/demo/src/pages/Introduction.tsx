import {
  CardContainer,
  Button,
  Avatar,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  useTheme,
  CardTitle,
  CodeBlock,
  ReactRouter,
} from 'tucu-ui';

import avatarImage from '../assets/images/author-dark.jpeg';
import { DOCUMENTATION_URL } from '../utils/constants';
import Banner from '../assets/images/logos/tucu-ui-logo-white.svg';
import BannerDark from '../assets/images/logos/tucu-ui-logo-black.svg';

export function Introduction() {
  const Link = ReactRouter.Link;
  const { mode } = useTheme();
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 dark:from-violet-900 dark:via-purple-900 dark:to-blue-900 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20 dark:from-blue-400/10 dark:via-purple-400/15 dark:to-pink-400/10"></div>

            {/* Floating geometric shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-rose-400/35 to-pink-500/35 rounded-full blur-lg animate-bounce"></div>

            {/* Animated mesh gradient */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent dark:via-white/5 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-300/20 to-transparent dark:from-blue-400/10 animate-spin"></div>
              <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-300/20 to-transparent dark:from-purple-400/10 animate-spin"
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '8s',
                }}
              ></div>
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0 bg-white/10 dark:bg-white/5"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              ></div>
            </div>

            {/* Radial glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent dark:from-blue-300/10 dark:via-purple-300/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-pink-400/20 via-violet-400/10 to-transparent dark:from-pink-300/10 dark:via-violet-300/5 rounded-full blur-3xl animate-glow"></div>

            {/* Additional floating elements */}
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white/30 rounded-full animate-float"></div>
            <div
              className="absolute top-1/3 right-1/3 w-4 h-4 bg-yellow-300/40 rounded-full animate-bounce"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-cyan-300/35 rounded-full animate-float"
              style={{ animationDelay: '2s' }}
            ></div>

            {/* Sparkle effects */}
            <div className="absolute top-12 right-12 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
            <div
              className="absolute top-1/3 left-12 w-3 h-3 bg-yellow-300/50 rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className="absolute bottom-12 right-1/3 w-2 h-2 bg-pink-300/50 rounded-full animate-ping"
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>

          {/* Content overlay with enhanced glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 dark:from-black/30 dark:via-transparent dark:to-black/10 backdrop-blur-[0.5px]"></div>

          <div className="relative text-center">
            <div className="relative mx-auto mb-6 w-fit">
              <div className="absolute inset-0 rounded-2xl blur-xl"></div>
              <img
                src={mode !== 'dark' ? BannerDark : Banner}
                alt="Tucu UI"
                className="relative h-16 sm:h-20 md:h-24 filter drop-shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </div>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 dark:text-white/80 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              A modern, comprehensive React component library built with
              TypeScript and Tailwind CSS. Designed for developers who need
              production-ready components that are both beautiful and
              functional.
            </Typography>

            <div className="flex flex-wrap sm:flex-row gap-4 justify-center mt-8 max-w-md mx-auto sm:max-w-none">
              <Button
                size="large"
                className=" text-white border border-white/30 hover:border-white/50 backdrop-blur-sm shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <Link to={DOCUMENTATION_URL} target="_blank">
                  <div className="flex justify-center items-center">
                    <LucideIcons.Rocket className="w-5 h-5 mr-2 animate-pulse" />
                    Get Started
                  </div>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="large"
                className="bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm shadow-xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center items-center">
                  <AnchorLink
                    to={'https://github.com/e-burgos/tucu-ui'}
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.Github className="w-5 h-5 mr-2 text-brand" />
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
                  <CodeBlock language="bash" code={`npm install tucu-ui`} />
                </div>

                {/* Usage Example */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    2. Basic Usage
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`import { Button, CardContainer, Avatar, ThemeProvider } from 'tucu-ui';
import 'tucu-ui/styles';

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
                    <div className="flex flex-col justify-center items-center gap-4">
                      <Avatar image={avatarImage} alt="Demo User" size="lg" />
                      <div className="flex flex-col justify-center items-center text-center sm:text-left">
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
