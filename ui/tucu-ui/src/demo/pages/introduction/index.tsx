import {
  CardContainer,
  Button,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  CardTitle,
  CodeBlock,
  Alert,
  HeroCard,
  DOCUMENTATION_URL,
  Logo,
} from '../../../index';

import { Home } from './BasicUsageDemo';
import { BasicUsageExampleCode } from './BasicUsageExampleCode';
import { BasicUsageWithCustomRouterExampleCode } from './BasicUsageWithCustomRouterExampleCode';
import { StandaloneAppExample, MfeAppExample } from './ThemeProviderExamples';

export function Introduction() {

  const installation = `
npm install @e-burgos/tucu-ui

// or with pnpm

pnpm install @e-burgos/tucu-ui
`;

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        description="A modern, comprehensive React component library built with TypeScript and Tailwind CSS v4. Features an advanced theming system with 34+ color presets, multi-layered color architecture, three layout systems, integrated routing, powerful form system with React Hook Form, and granular theme control. Designed for production-ready applications with sophisticated theming and full accessibility support."
        githubButton
        getStartedButton
        backgroundAnimation
        icon={
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand via-secondary to-light-dark rounded-full border border-gray-200 dark:border-gray-700">
            <Logo name="" secondName="" size="xxlarge" />
          </div>
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
              title: 'Advanced Theming System',
              description:
                '34+ color presets with 12-layer color architecture (primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, backgrounds)',
              color: 'from-purple-500 via-purple-600 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Three Layout Systems',
              description:
                'Admin (sidebar), Horizontal (top nav), and Clean layouts with integrated routing and automatic route generation',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.FileText className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Powerful Form System',
              description:
                'Integrated React Hook Form with 18+ form components, field validation, error handling, and form state management',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Code className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Developer Friendly',
              description:
                'Fully typed with TypeScript, excellent IDE support, comprehensive documentation, and interactive examples',
              color: 'from-orange-500 via-yellow-500 to-amber-500',
            },
            {
              icon: (
                <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dark Mode Native',
              description:
                'Advanced dark/light theme support with dynamic color mixing, smooth transitions, and system preference detection',
              color: 'from-indigo-500 via-purple-500 to-violet-500',
            },
            {
              icon: (
                <LucideIcons.Settings className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Granular Theme Control',
              description:
                'Fine-tune every aspect: color presets per layer, layouts, RTL/LTR, persistent settings, and user customization control',
              color: 'from-red-500 via-pink-500 to-rose-500',
            },
            {
              icon: (
                <LucideIcons.Accessibility className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Accessibility First',
              description:
                'WCAG 2.1 AA compliant with proper ARIA attributes, keyboard navigation, focus management, and screen reader support',
              color: 'from-teal-500 via-cyan-500 to-blue-500',
            },
            {
              icon: (
                <LucideIcons.Wand2 className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Tailwind CSS v4',
              description:
                'Latest Tailwind CSS with Tucu UI Design Tokens, semantic colors, dynamic utilities, and performance optimizations',
              color: 'from-amber-500 via-yellow-500 to-orange-500',
            },
            {
              icon: (
                <LucideIcons.Smartphone className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Responsive First',
              description:
                'Mobile-first approach with seamless responsive behavior, breakpoint system, and optimized for all devices',
              color: 'from-pink-500 via-rose-500 to-red-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
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
                    name: 'Tailwind CSS v4',
                    description:
                      'Latest version with advanced theming, dynamic utilities, and performance optimizations',
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

      {/* Advanced Theming Showcase */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Advanced Theming Capabilities
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Experience the power of our sophisticated theming system with
            multi-layered color architecture and granular control
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color System Demo */}
          <CardContainer>
            <CardTitle
              title="12-Layer Color Architecture"
              className="mt-2 mb-6"
            >
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Multi-layered color system with 34+ presets and independent
                  control per layer:
                </Typography>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      layer: 'Primary',
                      color: 'bg-brand',
                      desc: 'Brand identity',
                    },
                    {
                      layer: 'Dark Primary',
                      color: 'bg-brand',
                      desc: 'Dark mode primary',
                    },
                    {
                      layer: 'Secondary',
                      color: 'bg-secondary',
                      desc: 'Supporting color',
                    },
                    {
                      layer: 'Dark Secondary',
                      color: 'bg-secondary',
                      desc: 'Dark mode secondary',
                    },
                    {
                      layer: 'Accent',
                      color: 'bg-accent',
                      desc: 'Action highlights',
                    },
                    {
                      layer: 'Dark Accent',
                      color: 'bg-accent',
                      desc: 'Dark mode accent',
                    },
                    {
                      layer: 'Muted',
                      color: 'bg-gray-400',
                      desc: 'Muted text',
                    },
                    {
                      layer: 'Dark Muted',
                      color: 'bg-gray-500',
                      desc: 'Dark mode muted',
                    },
                    {
                      layer: 'Light BG',
                      color: 'bg-light',
                      desc: 'Light base',
                    },
                    {
                      layer: 'Dark BG',
                      color: 'bg-dark',
                      desc: 'Dark base',
                    },
                    {
                      layer: 'Light Dark',
                      color: 'bg-light-dark',
                      desc: 'Light secondary',
                    },
                    {
                      layer: 'Dark Light Dark',
                      color: 'bg-dark-light-dark',
                      desc: 'Dark secondary',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-light-dark rounded-lg"
                    >
                      <div
                        className={`w-6 h-6 rounded ${item.color} border border-gray-300 dark:border-gray-600 shrink-0`}
                      ></div>
                      <div className="overflow-hidden">
                        <Typography
                          tag="h4"
                          className="font-medium text-xs truncate"
                        >
                          {item.layer}
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-[10px] text-gray-500 dark:text-gray-400 truncate"
                        >
                          {item.desc}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 dark:border-purple-700">
                  <Typography
                    tag="p"
                    className="text-sm text-purple-700 dark:text-purple-300"
                  >
                    <LucideIcons.Palette className="w-4 h-4 inline mr-2" />
                    34+ predefined color presets with independent control for
                    each of the 12 color layers
                  </Typography>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Theme Configuration Demo */}
          <CardContainer>
            <CardTitle title="Configuration Flexibility" className="mt-2 mb-6">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Granular control over theme settings with advanced
                  configuration options:
                </Typography>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-light-dark rounded-lg">
                    <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <LucideIcons.Settings className="w-4 h-4 text-white filter drop-shadow-sm" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Partial Settings Control
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Enable/disable specific theme options per user
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-light-dark rounded-lg">
                    <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LucideIcons.Zap className="w-4 h-4 text-white filter drop-shadow-sm" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Dynamic Color Mixing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        CSS color-mix() for automatic color variations
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-light-dark rounded-lg">
                    <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 shadow-lg">
                      <LucideIcons.Moon className="w-4 h-4 text-white filter drop-shadow-sm" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Persistent Settings
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Automatic localStorage integration for user preferences
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-200 dark:border-blue-700">
                  <Typography
                    tag="p"
                    className="text-sm text-blue-700 dark:text-blue-300"
                  >
                    <LucideIcons.Code className="w-4 h-4 inline mr-2" />
                    Full TypeScript support with Zustand state management
                  </Typography>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
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

                {/* Tailwind CSS Installation (Optional) */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    1.1. Installing Tailwind CSS (Optional)
                  </Typography>
                  <Alert variant="info" dismissible={false}>
                    <Typography tag="p" className="text-sm mb-2">
                      <strong>Note:</strong> If you require all Tailwind CSS
                      utility classes (not just the ones included in Tucu UI),
                      you should also install Tailwind CSS as a dependency.
                    </Typography>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Typography
                        tag="p"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Step 1: Install Tailwind CSS dependencies
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="bash"
                        code={`npm install tailwindcss @tailwindcss/vite

// or with pnpm

pnpm install tailwindcss @tailwindcss/vite`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Typography
                        tag="p"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Step 2: Configure Vite plugin
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-600 dark:text-gray-400 mb-2"
                      >
                        Add the Tailwind CSS plugin to your{' '}
                        <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                          vite.config.ts
                        </code>
                        :
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="typescript"
                        code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add Tailwind CSS plugin
  ],
});`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Typography
                        tag="p"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Step 3: Import Tailwind CSS in your main CSS file
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-600 dark:text-gray-400 mb-2"
                      >
                        In your main CSS file (e.g.,{' '}
                        <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                          src/index.css
                        </code>{' '}
                        or{' '}
                        <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                          src/styles.css
                        </code>
                        ), add:
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="css"
                        code={`@import 'tailwindcss';
@import '@e-burgos/tucu-ui/styles';`}
                      />
                    </div>
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
                  <Alert variant="info" dismissible={false}>
                    <Typography tag="p" className="text-sm">
                      This example shows how to use the Basic Usage. This
                      implementation is ideal for apps that need a layout and
                      navigation all in one place.
                    </Typography>
                  </Alert>
                  <CodeBlock language="tsx" code={BasicUsageExampleCode} />
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
                    <Typography tag="p" className="text-sm">
                      This example shows how to use the Basic Usage with Custom
                      Router. This implementation is ideal for apps that need
                      custom routes and layouts.
                    </Typography>
                  </Alert>
                  <CodeBlock
                    language="tsx"
                    code={BasicUsageWithCustomRouterExampleCode}
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
                  <div className="p-4 sm:p-6 bg-light-dark rounded-xl border border-gray-200 dark:border-gray-700">
                    <Home />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Architectural Patterns */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Architectural Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose between Standalone App (default) or Micro Frontends (MFE)
            patterns with conditional TypeScript support
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Standalone App Pattern */}
          <CardContainer>
            <CardTitle title="Standalone App Pattern" className="mt-2 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <LucideIcons.Package className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Standalone App (Default)
                  </Typography>
                </div>
                <Alert variant="info" dismissible={false}>
                  <div className="space-y-2">
                    <Typography tag="p" className="text-sm">
                      <strong>Default pattern</strong> - Ideal for traditional
                      single-page applications with automatic route generation
                      from{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        menuItems
                      </code>
                      .
                    </Typography>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" color="light-dark">
                        Default
                      </Badge>
                      <Badge variant="outline" color="light-dark">
                        menuItems
                      </Badge>
                      <Badge variant="outline" color="light-dark">
                        customRoutes
                      </Badge>
                    </div>
                  </div>
                </Alert>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      Implementation Example
                    </Typography>
                  </div>
                  <CodeBlock language="tsx" code={StandaloneAppExample} />
                </div>

                <div className="p-4 bg-light-dark rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold text-sm">
                      When to Use
                    </Typography>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>
                        Building a traditional single-page application
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>All routes in one codebase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Need automatic route generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Simple deployment model</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* MFE Pattern */}
          <CardContainer>
            <CardTitle
              title="Micro Frontends (MFE) Pattern"
              className="mt-2 mb-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <LucideIcons.Box className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Micro Frontends (MFE)
                  </Typography>
                </div>
                <Alert variant="info" dismissible={false}>
                  <div className="space-y-2">
                    <Typography tag="p" className="text-sm">
                      <strong>Advanced pattern</strong> - For micro frontend
                      architectures with explicit route configuration via{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        appRoutesConfig
                      </code>{' '}
                      and{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        basePath
                      </code>
                      .
                    </Typography>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" color="light-dark">
                        MFE
                      </Badge>
                      <Badge variant="outline" color="light-dark">
                        basePath
                      </Badge>
                      <Badge variant="outline" color="light-dark">
                        appRoutesConfig
                      </Badge>
                    </div>
                  </div>
                </Alert>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      Implementation Example
                    </Typography>
                  </div>
                  <CodeBlock language="tsx" code={MfeAppExample} />
                </div>

                <div className="p-4 bg-light-dark rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5" className="font-semibold text-sm">
                      When to Use
                    </Typography>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Micro frontend architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Multiple teams working independently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Need independent deployments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                      <span>Require route isolation and access control</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>

        {/* Type Safety Features */}
        <CardContainer>
          <CardTitle title="Conditional TypeScript Types" className="mt-2 mb-2">
            <div className="space-y-6">
              <Typography
                tag="p"
                className="text-base text-gray-600 dark:text-gray-300"
              >
                The ThemeProvider uses TypeScript discriminated unions to
                provide intelligent type checking based on your architectural
                pattern choice.
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LucideIcons.Shield className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Type Safety
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Props automatically change based on{' '}
                    <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                      architecturalPatterns
                    </code>{' '}
                    value. No invalid combinations possible.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <LucideIcons.Lightbulb className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      IntelliSense
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Your IDE automatically shows only relevant props and hides
                    irrelevant ones based on pattern selection.
                  </Typography>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 shadow-lg">
                      <LucideIcons.AlertCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Compile-Time
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Errors are caught during compilation, not at runtime.
                    Prevents bugs before they happen.
                  </Typography>
                </CardContainer>
              </div>

              <div className="p-4 bg-light-dark rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <LucideIcons.Info className="w-4 h-4 text-white filter drop-shadow-sm shrink-0" />
                  </div>
                  <div>
                    <Typography tag="p" className="text-sm font-semibold mb-2">
                      How It Works
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      When you set{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        architecturalPatterns="mfe"
                      </code>
                      , TypeScript requires{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        basePath
                      </code>{' '}
                      and{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        appRoutesConfig
                      </code>
                      . With the default Standalone App pattern, TypeScript
                      requires{' '}
                      <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                        menuItems
                      </code>{' '}
                      instead. This is powered by TypeScript discriminated
                      unions.
                    </Typography>
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
              title: 'Layout Systems',
              description:
                'Three layouts: Admin, Horizontal, Clean with routing',
              count: '3',
              bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Theming',
              description:
                '12-layer color system with 34+ presets and settings',
              count: '34+',
              bgColor:
                'bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.FileText className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Form System',
              description: 'React Hook Form integration with 18+ components',
              count: '18+',
              bgColor:
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Navigation className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Navigation',
              description: 'Menus, tabs, breadcrumbs, anchor links, routing',
              count: '10+',
              bgColor: 'bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.MessageCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Feedback',
              description: 'Alerts, modals, notifications, toasts, loaders',
              count: '12+',
              bgColor:
                'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.BarChart className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Data Display',
              description: 'Tables, cards, lists, badges, avatars, stats',
              count: '15+',
              bgColor: 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.MousePointer className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Interactive',
              description:
                'Buttons, dropdowns, tooltips, accordions, carousels',
              count: '25+',
              bgColor:
                'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Coins className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Blockchain',
              description: 'Web3 wallet connectors and DeFi components',
              count: '8+',
              bgColor:
                'bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Accessibility className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Accessibility',
              description:
                'ARIA attributes, keyboard nav, screen reader support',
              count: 'Built-in',
              bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Hooks & Utils',
              description: 'Custom hooks, theme utilities, helper functions',
              count: '25+',
              bgColor: 'bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Box className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Containers',
              description: 'Cards, panels, sections, grid layouts, dividers',
              count: '12+',
              bgColor:
                'bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Typography',
              description: 'Text components, headings, code blocks, links',
              count: '8+',
              bgColor:
                'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg',
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
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        12-layer theming system with 34+ color presets and
                        independent layer control
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Three layout systems with integrated routing and menu
                        generation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        React Hook Form integration with 18+ form components and
                        validation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Component API with detailed props, examples, and live
                        demos
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Accessibility features with WCAG 2.1 AA compliance and
                        keyboard navigation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Design system principles with spacing, typography, and
                        color guidelines
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Granular theme configuration with persistent user
                        preferences
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Custom hooks and utilities for advanced use cases
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
