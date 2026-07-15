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
  FeatureCard,
  ColorCard,
  Logo,
} from '@e-burgos/tucu-ui';
import { NPM_PACKAGE_URL, GITHUB_URL } from '@tucu-ui-internal/docs-kit/utils/constants';

import { Home } from './BasicUsageDemo';
import { BasicUsageExampleCode } from './BasicUsageExampleCode';
import { BasicUsageWithCustomRouterExampleCode } from './BasicUsageWithCustomRouterExampleCode';
import { StandaloneAppExample, MfeAppExample } from './ThemeProviderExamples';

export function Introduction() {
  const installation = `
npm install @e-burgos/tucu-ui

or

pnpm install @e-burgos/tucu-ui
`;

  const keyFeatures = [
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Advanced Theming System',
      description:
        '34+ color presets with 12-layer color architecture (primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, backgrounds)',
      iconBgClassName: 'from-purple-500 via-purple-600 to-pink-500',
    },
    {
      icon: (
        <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: '3 Themes & 10 Layouts',
      description:
        'Default (Admin, Horizontal, Clean), macOS Sonoma (Sidebar, Clean, Navbar), and macOS Tahoe (Sidebar, Dock, Clean, Navbar) — each with integrated routing',
      iconBgClassName: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: (
        <LucideIcons.FileText className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Powerful Form System',
      description:
        'Integrated React Hook Form with 18+ form components, field validation, error handling, and form state management',
      iconBgClassName: 'from-green-500 via-emerald-500 to-teal-500',
    },
    {
      icon: (
        <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Developer Friendly',
      description:
        'Fully typed with TypeScript, excellent IDE support, comprehensive documentation, and interactive examples',
      iconBgClassName: 'from-orange-500 via-yellow-500 to-amber-500',
    },
    {
      icon: (
        <LucideIcons.Moon className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Dark Mode Native',
      description:
        'Advanced dark/light theme support with dynamic color mixing, smooth transitions, and system preference detection',
      iconBgClassName: 'from-indigo-500 via-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.Settings className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Granular Theme Control',
      description:
        'Fine-tune every aspect: color presets per layer, layouts, RTL/LTR, persistent settings, and user customization control',
      iconBgClassName: 'from-red-500 via-pink-500 to-rose-500',
    },
    {
      icon: (
        <LucideIcons.Accessibility className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Accessibility First',
      description:
        'WCAG 2.1 AA compliant with proper ARIA attributes, keyboard navigation, focus management, and screen reader support',
      iconBgClassName: 'from-teal-500 via-cyan-500 to-blue-500',
    },
    {
      icon: (
        <LucideIcons.Wand2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Tailwind CSS v4',
      description:
        'Latest Tailwind CSS with Tucu UI Design Tokens, semantic colors, dynamic utilities, and performance optimizations',
      iconBgClassName: 'from-amber-500 via-yellow-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.Smartphone className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Responsive First',
      description:
        'Mobile-first approach with seamless responsive behavior, breakpoint system, and optimized for all devices',
      iconBgClassName: 'from-pink-500 via-rose-500 to-red-500',
    },
    {
      icon: (
        <LucideIcons.BrainCircuit className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'MCP Agentic Server',
      description:
        'Built-in Model Context Protocol server that enables AI agents to generate UI code using your design system tokens, components, and patterns',
      iconBgClassName: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
  ];

  const technologyStack = [
    {
      icon: <LucideIcons.Atom className="w-6 h-6" />,
      title: 'React 19+',
      description: 'Modern hooks and concurrent features',
      color: 'blue' as const,
    },
    {
      icon: <LucideIcons.BookOpen className="w-6 h-6" />,
      title: 'TypeScript',
      description: 'Type safety and better developer experience',
      color: 'indigo' as const,
    },
    {
      icon: <LucideIcons.Palette className="w-6 h-6" />,
      title: 'Tailwind CSS v4',
      description:
        'Latest version with advanced theming, dynamic utilities, and performance optimizations',
      color: 'cyan' as const,
    },
    {
      icon: <LucideIcons.Drama className="w-6 h-6" />,
      title: 'Framer Motion',
      description: 'Smooth animations and micro-interactions',
      color: 'purple' as const,
    },
    {
      icon: <LucideIcons.Building2 className="w-6 h-6" />,
      title: 'Nx Monorepo',
      description: 'Efficient development and build optimization',
      color: 'emerald' as const,
    },
    {
      icon: <LucideIcons.PenLine className="w-6 h-6" />,
      title: 'React Hook Form',
      description: 'Performant forms with minimal re-renders',
      color: 'orange' as const,
    },
  ];

  const colorLayers = [
    { layer: 'Primary', color: 'bg-brand', desc: 'Brand identity' },
    { layer: 'Dark Primary', color: 'bg-brand', desc: 'Dark mode primary' },
    { layer: 'Secondary', color: 'bg-secondary', desc: 'Supporting color' },
    {
      layer: 'Dark Secondary',
      color: 'bg-secondary',
      desc: 'Dark mode secondary',
    },
    { layer: 'Accent', color: 'bg-accent', desc: 'Action highlights' },
    { layer: 'Dark Accent', color: 'bg-accent', desc: 'Dark mode accent' },
    { layer: 'Muted', color: 'bg-gray-400', desc: 'Muted text' },
    { layer: 'Dark Muted', color: 'bg-gray-500', desc: 'Dark mode muted' },
    { layer: 'Light BG', color: 'bg-light', desc: 'Light base' },
    { layer: 'Dark BG', color: 'bg-dark', desc: 'Dark base' },
    { layer: 'Light Dark', color: 'bg-light-dark', desc: 'Light secondary' },
    {
      layer: 'Dark Light Dark',
      color: 'bg-dark-light-dark',
      desc: 'Dark secondary',
    },
  ];

  const configFeatures = [
    {
      icon: (
        <LucideIcons.Settings className="w-4 h-4 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-blue-500 to-cyan-500',
      title: 'Partial Settings Control',
      description: 'Enable/disable specific theme options per user',
    },
    {
      icon: (
        <LucideIcons.Zap className="w-4 h-4 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-green-500 to-emerald-500',
      title: 'Dynamic Color Mixing',
      description: 'CSS color-mix() for automatic color variations',
    },
    {
      icon: (
        <LucideIcons.Moon className="w-4 h-4 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-orange-500 to-amber-500',
      title: 'Persistent Settings',
      description: 'Automatic localStorage integration for user preferences',
    },
  ];

  const themeVariants = [
    {
      icon: (
        <LucideIcons.LayoutGrid className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Default',
      badge: '3 layouts',
      description:
        'Traditional web application layouts with Admin (sidebar), Horizontal (top nav), and Clean options. Includes automatic route generation, integrated routing, and responsive design.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
      tags: ['Admin', 'Horizontal', 'Clean'],
    },
    {
      icon: (
        <LucideIcons.AppWindowMac className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'macOS',
      badge: '3 layouts',
      description:
        'Apple-inspired design with macOS Sonoma window chrome, sidebar navigation, toolbar, command palette, search bar, widgets, notifications, segmented controls. Includes Clean and Navbar layout variants.',
      iconBgClassName: 'from-gray-600 to-gray-800',
      tags: ['Sonoma', 'Sonoma Clean', 'Sonoma Navbar'],
    },
    {
      icon: (
        <LucideIcons.MountainSnow className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'macOS Tahoe',
      badge: '4 layouts',
      description:
        'Next-generation macOS Tahoe design with liquid glass effects, dock navigation, dialog system, progress bars, command palette, and advanced window management with translucent materials. Includes Dock, Clean, and Navbar layout variants.',
      iconBgClassName: 'from-purple-500 to-indigo-600',
      tags: ['Tahoe', 'Tahoe Dock', 'Tahoe Clean', 'Tahoe Navbar'],
    },
  ];

  const typeSafetyFeatures = [
    {
      icon: (
        <LucideIcons.Shield className="w-5 h-5 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-green-500 to-emerald-500',
      title: 'Type Safety',
      description: (
        <>
          Props automatically change based on{' '}
          <code className="px-1 py-0.5 border border-border rounded text-xs">
            architecturalPatterns
          </code>{' '}
          value. No invalid combinations possible.
        </>
      ),
    },
    {
      icon: (
        <LucideIcons.Lightbulb className="w-5 h-5 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-blue-500 to-cyan-500',
      title: 'IntelliSense',
      description: (
        <>
          Your IDE automatically shows only relevant props and hides irrelevant
          ones based on pattern selection.
        </>
      ),
    },
    {
      icon: (
        <LucideIcons.AlertCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
      ),
      iconBgClassName: 'from-orange-500 to-amber-500',
      title: 'Compile-Time',
      description: (
        <>
          Errors are caught during compilation, not at runtime. Prevents bugs
          before they happen.
        </>
      ),
    },
  ];

  const componentCategories = [
    {
      icon: (
        <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Layout Systems',
      badge: '10',
      description:
        '10 layouts across 3 themes: Default (3), macOS Sonoma (3), macOS Tahoe (4)',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Theming',
      badge: '34+',
      description: '12-layer color system with 34+ presets and settings',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.FileText className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Form System',
      badge: '14+',
      description: 'React Hook Form integration with validation and inputs',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Navigation className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Navigation',
      badge: '10+',
      description: 'Menus, tabs, breadcrumbs, anchor links, routing',
      iconBgClassName: 'from-teal-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.MessageCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Feedback',
      badge: '12+',
      description: 'Alerts, modals, notifications, toasts, loaders',
      iconBgClassName: 'from-orange-500 to-amber-500',
    },
    {
      icon: (
        <LucideIcons.BarChart className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Data Display',
      badge: '15+',
      description: 'Tables, cards, lists, badges, avatars, stats',
      iconBgClassName: 'from-red-500 to-pink-500',
    },
    {
      icon: (
        <LucideIcons.MousePointer className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Interactive',
      badge: '25+',
      description: 'Buttons, dropdowns, tooltips, accordions, carousels',
      iconBgClassName: 'from-indigo-500 to-purple-500',
    },
    {
      icon: (
        <LucideIcons.Coins className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Blockchain',
      badge: '8+',
      description: 'Web3 wallet connectors and DeFi components',
      iconBgClassName: 'from-emerald-500 to-green-500',
    },
    {
      icon: (
        <LucideIcons.Accessibility className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Accessibility',
      badge: 'Built-in',
      description: 'ARIA attributes, keyboard nav, screen reader support',
      iconBgClassName: 'from-cyan-500 to-blue-500',
    },
    {
      icon: (
        <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Hooks & Utils',
      badge: '18+',
      description: 'Custom hooks, theme utilities, helper functions',
      iconBgClassName: 'from-pink-500 to-rose-500',
    },
    {
      icon: (
        <LucideIcons.Box className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Containers',
      badge: '12+',
      description: 'Cards, panels, sections, grid layouts, dividers',
      iconBgClassName: 'from-violet-500 to-purple-500',
    },
    {
      icon: (
        <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Typography',
      badge: '8+',
      description: 'Text components, headings, code blocks, links',
      iconBgClassName: 'from-amber-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.BrainCircuit className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'MCP Server',
      badge: '7 tools',
      description:
        'AI agent integration via Model Context Protocol with resources, tools, and prompts',
      iconBgClassName: 'from-emerald-500 to-teal-500',
    },
  ];

  const nextSteps = [
    '12-layer theming system with 34+ color presets and independent layer control',
    '3 theme variants (Default, macOS Sonoma, macOS Tahoe) with 10 layouts and integrated routing',
    'React Hook Form integration with 14+ form components and validation',
    'Component API with detailed props, examples, and live demos',
    'Accessibility features with WCAG 2.1 AA compliance and keyboard navigation',
    'Design system principles with spacing, typography, and color guidelines',
    'Granular theme configuration with persistent user preferences',
    'Custom hooks and utilities for advanced use cases',
    'MCP Agentic Server for AI-powered code generation with design system awareness',
  ];

  const standaloneUseCases = [
    'Building a traditional single-page application',
    'All routes in one codebase',
    'Need automatic route generation',
    'Simple deployment model',
  ];

  const mfeUseCases = [
    'Micro frontend architecture',
    'Multiple teams working independently',
    'Need independent deployments',
    'Require route isolation and access control',
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        description="A modern, comprehensive React component library built with TypeScript and Tailwind CSS v4. Features 3 theme variants (Default, macOS, macOS Tahoe), 10 layout systems, 34+ color presets with 12-layer color architecture, integrated routing, powerful form system with React Hook Form, granular theme control, and a built-in MCP Agentic Server for AI-powered development. Designed for production-ready applications with sophisticated theming and full accessibility support."
        githubButton
        getStartedButton
        backgroundAnimation
        icon={
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand via-secondary to-light-dark rounded-full border border-border">
            <Logo name="" secondName="" size="xxlarge" />
          </div>
        }
      />

      {/* Key Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Why Choose Tucu UI?
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Built with modern best practices and designed for real-world
            applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {keyFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              layout="horizontal"
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgClassName={feature.iconBgClassName}
            />
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Technology Foundation">
            <div className="w-full space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {technologyStack.map((tech, index) => (
                  <ColorCard
                    key={index}
                    icon={tech.icon}
                    title={tech.title}
                    description={tech.description}
                    color={tech.color}
                  />
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Advanced Theming Showcase */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Advanced Theming Capabilities
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Experience the power of our sophisticated theming system with
            multi-layered color architecture and granular control
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color System Demo */}
          <CardContainer>
            <CardTitle title="12-Layer Color Architecture" className="">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Multi-layered color system with 34+ presets and independent
                  control per layer:
                </Typography>

                <div className="grid grid-cols-2 gap-2">
                  {colorLayers.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-light-dark rounded-lg"
                    >
                      <div
                        className={`w-6 h-6 rounded ${item.color} border border-border shrink-0`}
                      ></div>
                      <div className="overflow-hidden">
                        <Typography tag="label-2" className="truncate">
                          {item.layer}
                        </Typography>
                        <Typography
                          tag="legal"
                          className="text-gray-500 dark:text-gray-400 truncate"
                        >
                          {item.desc}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 dark:border-purple-700">
                  <Typography
                    tag="caption"
                    className="text-purple-700 dark:text-purple-300"
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
            <CardTitle title="Configuration Flexibility">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Granular control over theme settings with advanced
                  configuration options:
                </Typography>

                <div className="space-y-3">
                  {configFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-light-dark rounded-lg"
                    >
                      <div
                        className={`p-2 rounded-lg bg-linear-to-br ${feature.iconBgClassName} shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <Typography tag="label-1">{feature.title}</Typography>
                        <Typography
                          tag="caption"
                          className="text-gray-500 dark:text-gray-400"
                        >
                          {feature.description}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-200 dark:border-blue-700">
                  <Typography
                    tag="caption"
                    className="text-blue-700 dark:text-blue-300"
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

      {/* Theme Variants */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            3 Theme Variants
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose the visual style that best fits your application with 3
            built-in theme variants, each with its own layout system
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {themeVariants.map((variant, index) => (
            <FeatureCard
              key={index}
              layout="showcase"
              icon={variant.icon}
              title={variant.title}
              badge={variant.badge}
              description={variant.description}
              iconBgClassName={variant.iconBgClassName}
              tags={variant.tags}
            />
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Quick Start">
            <div className="w-full space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-300">
                Get up and running with Tucu UI in minutes:
              </Typography>

              <div className="space-y-6">
                {/* Installation */}
                <div className="space-y-3">
                  <Typography tag="h5">1. Installation</Typography>
                  <CodeBlock
                    noExpand={true}
                    language="bash"
                    code={installation}
                  />
                </div>

                {/* CSS integration path */}
                <div className="space-y-3">
                  <Typography tag="h5">
                    1.1. Choosing a CSS Integration Path
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Tucu UI ships two separate CSS entry points. Pick the one
                    that matches your project —{' '}
                    <strong>do not import both</strong> in the same app, since
                    that runs two independent Tailwind builds whose layers can
                    conflict and leak styles into each other.
                  </Typography>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Typography tag="label-1" className="text-brand">
                        Option A — Your project has no Tailwind CSS build
                      </Typography>
                      <Typography
                        tag="caption"
                        className="text-gray-600 dark:text-gray-400 mb-2"
                      >
                        Use <code className="px-1 py-0.5 border border-border rounded text-xs">./styles</code>{' '}
                        — a complete, pre-compiled stylesheet (Tailwind
                        included). Nothing else to install or configure.
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="css"
                        code={`@import '@e-burgos/tucu-ui/styles';`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Typography tag="label-1" className="text-brand">
                        Option B — Your project already runs Tailwind CSS v4
                        (or you need Tailwind utility classes Tucu UI doesn't
                        already use internally)
                      </Typography>
                      <Typography
                        tag="caption"
                        className="text-gray-600 dark:text-gray-400 mb-2"
                      >
                        Use <code className="px-1 py-0.5 border border-border rounded text-xs">./theme</code>{' '}
                        instead — design tokens and component styles only, no
                        bundled Tailwind — and let your own Tailwind build
                        generate every utility class, including Tucu UI's,
                        from a single instance.
                      </Typography>
                    </div>

                    <div className="space-y-2">
                      <Typography
                        tag="label-1"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Step 1: Install Tailwind CSS dependencies
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="bash"
                        code={`
npm install tailwindcss @tailwindcss/vite

or

pnpm install tailwindcss @tailwindcss/vite`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Typography
                        tag="label-1"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Step 2: Configure Vite plugin
                      </Typography>
                      <Typography
                        tag="caption"
                        className="text-gray-600 dark:text-gray-400 mb-2"
                      >
                        Add the Tailwind CSS plugin to your{' '}
                        <code className="px-1 py-0.5 border border-border rounded text-xs">
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
                        tag="label-1"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Step 3: Import Tucu UI's theme (not styles) alongside
                        Tailwind, and tell Tailwind to scan Tucu UI's source
                      </Typography>
                      <Typography
                        tag="caption"
                        className="text-gray-600 dark:text-gray-400 mb-2"
                      >
                        In your main CSS file (e.g.,{' '}
                        <code className="px-1 py-0.5 border border-border rounded text-xs">
                          src/index.css
                        </code>{' '}
                        or{' '}
                        <code className="px-1 py-0.5 border border-border rounded text-xs">
                          src/styles.css
                        </code>
                        ), add:
                      </Typography>
                      <CodeBlock
                        noExpand={true}
                        language="css"
                        code={`@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui';`}
                      />
                      <Alert variant="info" dismissible={false}>
                        <Typography tag="p">
                          Import order between these three lines doesn't
                          matter — Tailwind fixes their relative cascade
                          priority regardless of which comes first, so your
                          app's own utility classes always win over Tucu UI's
                          defaults.
                        </Typography>
                      </Alert>
                    </div>

                    <Alert variant="warning" dismissible={false}>
                      <Typography tag="p">
                        <strong>Don't mix the two.</strong> Importing{' '}
                        <code className="px-1 py-0.5 border border-border rounded text-xs">
                          ./styles
                        </code>{' '}
                        together with your own{' '}
                        <code className="px-1 py-0.5 border border-border rounded text-xs">
                          @import 'tailwindcss'
                        </code>{' '}
                        creates two separate compiled Tailwind builds in the
                        same page — their base styles and generated utilities
                        can override each other unpredictably depending on
                        import order. Pick Option A or Option B, not both.
                      </Typography>
                    </Alert>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="space-y-3">
                  <Typography tag="h5">2. Basic Usage</Typography>
                  <Alert variant="info" dismissible={false}>
                    <Typography tag="p">
                      This example shows how to use the Basic Usage. This
                      implementation is ideal for apps that need a layout and
                      navigation all in one place.
                    </Typography>
                  </Alert>
                  <CodeBlock language="tsx" code={BasicUsageExampleCode} />
                </div>

                {/* Usage Example with Custom Router */}
                <div className="space-y-3">
                  <Typography tag="h5">
                    3. Basic Usage with Custom Router
                  </Typography>
                  <Alert variant="info" dismissible={false}>
                    <Typography tag="p">
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
                  <Typography tag="h5">4. Live Demo</Typography>
                  <div className="p-4 sm:p-6 bg-light-dark rounded-xl border border-border">
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
          <Typography tag="h2" className="mb-2">
            Architectural Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose between Standalone App (default) or Micro Frontends (MFE)
            patterns with conditional TypeScript support
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Standalone App Pattern */}
          <CardContainer>
            <CardTitle title="Standalone App Pattern">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <LucideIcons.Package className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h5">Standalone App (Default)</Typography>
                </div>
                <Alert variant="info" dismissible={false}>
                  <div className="space-y-2">
                    <Typography tag="p">
                      <strong>Default pattern</strong> - Ideal for traditional
                      single-page applications with automatic route generation
                      from{' '}
                      <code className="px-1 py-0.5 border border-border rounded text-xs">
                        menuItems
                      </code>
                      .
                    </Typography>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="soft" color="light-dark">
                        Default
                      </Badge>
                      <Badge variant="soft" color="light-dark">
                        menuItems
                      </Badge>
                      <Badge variant="soft" color="light-dark">
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
                    <Typography tag="h5">Implementation Example</Typography>
                  </div>
                  <CodeBlock language="tsx" code={StandaloneAppExample} />
                </div>

                <div className="p-4 bg-light-dark rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5">When to Use</Typography>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {standaloneUseCases.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* MFE Pattern */}
          <CardContainer>
            <CardTitle title="Micro Frontends (MFE) Pattern">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <LucideIcons.Box className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h5">Micro Frontends (MFE)</Typography>
                </div>
                <Alert variant="info" dismissible={false}>
                  <div className="space-y-2">
                    <Typography tag="p">
                      <strong>Advanced pattern</strong> - For micro frontend
                      architectures with explicit route configuration via{' '}
                      <code className="px-1 py-0.5 border border-border rounded text-xs">
                        appRoutesConfig
                      </code>{' '}
                      and{' '}
                      <code className="px-1 py-0.5 border border-border rounded text-xs">
                        basePath
                      </code>
                      .
                    </Typography>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="soft" color="light-dark">
                        MFE
                      </Badge>
                      <Badge variant="soft" color="light-dark">
                        basePath
                      </Badge>
                      <Badge variant="soft" color="light-dark">
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
                    <Typography tag="h5">Implementation Example</Typography>
                  </div>
                  <CodeBlock language="tsx" code={MfeAppExample} />
                </div>

                <div className="p-4 bg-light-dark rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    <Typography tag="h5">When to Use</Typography>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {mfeUseCases.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>

        {/* Type Safety Features */}
        <CardContainer>
          <CardTitle title="Conditional TypeScript Types">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-300">
                The ThemeProvider uses TypeScript discriminated unions to
                provide intelligent type checking based on your architectural
                pattern choice.
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {typeSafetyFeatures.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    layout="horizontal"
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    iconBgClassName={feature.iconBgClassName}
                  />
                ))}
              </div>

              <FeatureCard
                layout="horizontal"
                icon={
                  <LucideIcons.Info className="w-4 h-4 text-white filter drop-shadow-sm" />
                }
                iconBgClassName="from-indigo-500 to-purple-500"
                title="How It Works"
                description={
                  <>
                    When you set{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      architecturalPatterns="mfe"
                    </code>
                    , TypeScript requires{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      basePath
                    </code>{' '}
                    and{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      appRoutesConfig
                    </code>
                    . With the default Standalone App pattern, TypeScript
                    requires{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      menuItems
                    </code>{' '}
                    instead. This is powered by TypeScript discriminated unions.
                  </>
                }
              />
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Component Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Component Overview
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore our comprehensive collection of components organized by
            category
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {componentCategories.map((category, index) => (
            <FeatureCard
              key={index}
              icon={category.icon}
              title={category.title}
              badge={category.badge}
              description={category.description}
              iconBgClassName={category.iconBgClassName}
            />
          ))}
        </div>
      </section>

      {/* MCP Agentic Server */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            MCP Agentic Server
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            AI agents can use our built-in Model Context Protocol server to
            generate code that respects your design system out of the box
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ColorCard
            icon={<LucideIcons.Database className="w-6 h-6" />}
            title="Resources"
            description="Exposes component catalog, design tokens, form patterns, and routing guides as structured resources that agents can read at any time."
            color="emerald"
          />
          <ColorCard
            icon={<LucideIcons.Wrench className="w-6 h-6" />}
            title="7 Tools"
            description="Generate components, full pages, forms, theme configs, and refactored code — all aligned with Tucu UI conventions and best practices."
            color="blue"
          />
          <ColorCard
            icon={<LucideIcons.MessageSquare className="w-6 h-6" />}
            title="8 Prompts"
            description="Pre-built prompt templates for dashboards, CRUD pages, landing pages, settings panels, and more — ready to use from any MCP client."
            color="purple"
          />
        </div>

        <CardContainer>
          <CardTitle title="How It Works">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <Typography tag="h6">Agent reads context</Typography>
                    <Typography tag="caption" className="text-foreground/60">
                      Reads component catalog, tokens, and patterns via MCP
                      resources
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <Typography tag="h6">Calls generation tools</Typography>
                    <Typography tag="caption" className="text-foreground/60">
                      Uses tools like generate_component or generate_page with
                      your requirements
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <Typography tag="h6">Production-ready output</Typography>
                    <Typography tag="caption" className="text-foreground/60">
                      Returns TypeScript + Tailwind code using real Tucu UI
                      components and design tokens
                    </Typography>
                  </div>
                </div>
              </div>
              <CodeBlock
                code={`// Connect from VS Code, Cursor, or Claude Desktop
{
  "mcpServers": {
    "tucu-ui": {
      "command": "tucu-ui-mcp"
    }
  }
}

// Or use the remote HTTP server
{
  "mcpServers": {
    "tucu-ui": {
      "url": "https://tucu-ui-mcp.fly.dev/mcp"
    }
  }
}`}
              />
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Next Steps */}
      <section>
        <CardContainer>
          <CardTitle title="What's Next?">
            <div className="space-y-4">
              <Typography tag="h6">
                Ready to dive deeper? Explore our comprehensive documentation to
                learn more about:
              </Typography>
              <div className="flex flex-wrap flex-row gap-3 pt-2">
                <ul className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <Typography tag="body">{step}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                <Button size="medium">
                  <AnchorLink to={NPM_PACKAGE_URL} target="_blank">
                    <div className="flex justify-center items-center">
                      <LucideIcons.Package className="w-4 h-4 mr-2" />
                      Install TucuUI
                    </div>
                  </AnchorLink>
                </Button>
                <Button variant="ghost" size="medium">
                  <AnchorLink to={GITHUB_URL} target="_blank">
                    <div className="flex justify-center items-center">
                      <LucideIcons.Code className="w-4 h-4 mr-2" />
                      View Source Code
                    </div>
                  </AnchorLink>
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
