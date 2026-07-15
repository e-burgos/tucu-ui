import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  HeroCard,
  FeatureCard,
  ColorCard,
  Button,
  AnchorLink,
} from '@e-burgos/tucu-ui';

export function TailwindIntroduction() {
  const keyFeatures = [
    {
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Zero Configuration',
      description:
        'All utilities pre-included via @source directives — no config file needed',
      iconBgClassName: 'from-yellow-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'CSS-First Architecture',
      description:
        'Tailwind v4 uses native CSS layers and @import — no PostCSS plugins required',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Paintbrush className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Design Token Integration',
      description:
        'Seamless integration with tucu-ui color presets, dark mode, and theming system',
      iconBgClassName: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <LucideIcons.Gauge className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Optimized Bundle',
      description:
        'Automatic tree-shaking with only used utilities in the final CSS bundle',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.MonitorSmartphone className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Responsive & Dark Mode',
      description:
        'Full responsive breakpoints and dark mode support with sm:, md:, lg:, xl:, dark: prefixes',
      iconBgClassName: 'from-indigo-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.Puzzle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: '15 Utility Categories',
      description:
        'Complete coverage: layout, sizing, spacing, typography, flexbox, grid, effects, and more',
      iconBgClassName: 'from-rose-500 to-red-500',
    },
  ];

  const implementationStatus = [
    {
      icon: <LucideIcons.LayoutGrid className="w-5 h-5" />,
      title: 'Layout & Positioning',
      description: 'Aspect ratio, display, position, overflow, z-index',
      color: 'green' as const,
    },
    {
      icon: <LucideIcons.Grid3X3 className="w-5 h-5" />,
      title: 'Flexbox & Grid',
      description: 'Complete layout system with all properties',
      color: 'blue' as const,
    },
    {
      icon: <LucideIcons.Type className="w-5 h-5" />,
      title: 'Typography',
      description: 'Fonts, text formatting, and spacing',
      color: 'purple' as const,
    },
    {
      icon: <LucideIcons.Move className="w-5 h-5" />,
      title: 'Sizing & Spacing',
      description: 'Width, height, padding, margin, gap',
      color: 'cyan' as const,
    },
    {
      icon: <LucideIcons.Image className="w-5 h-5" />,
      title: 'Backgrounds & Effects',
      description: 'Colors, gradients, shadows, opacity',
      color: 'orange' as const,
    },
    {
      icon: <LucideIcons.Play className="w-5 h-5" />,
      title: 'Transitions & Transforms',
      description: 'Animations, rotate, scale, translate',
      color: 'pink' as const,
    },
  ];

  const tailwindCategories = [
    {
      title: 'Layout & Positioning',
      description:
        'Aspect ratio, display, position, z-index, and overflow utilities',
      icon: (
        <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/layout-utilities',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Sizing',
      description: 'Width, height, max/min dimensions with arbitrary values',
      icon: (
        <LucideIcons.Move className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/sizing',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Spacing',
      description: 'Padding, margin, gap utilities with responsive breakpoints',
      icon: (
        <LucideIcons.ArrowUpDown className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/spacing',
      iconBgClassName: 'from-teal-500 to-cyan-500',
    },
    {
      title: 'Typography',
      description:
        'Font families, sizes, weights, spacing, and text formatting',
      icon: (
        <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/typography',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Flexbox & Grid',
      description: 'Complete flexbox and CSS Grid layout system',
      icon: (
        <LucideIcons.Grid3X3 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/flexbox-grid',
      iconBgClassName: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Background',
      description: 'Background colors, gradients, images, and positioning',
      icon: (
        <LucideIcons.Image className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/background',
      iconBgClassName: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Borders',
      description: 'Border radius, width, colors, styles, and outlines',
      icon: (
        <LucideIcons.Square className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/borders',
      iconBgClassName: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Effects',
      description: 'Shadows, opacity, blend modes, and visual effects',
      icon: (
        <LucideIcons.Sparkles className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/effects',
      iconBgClassName: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Filters',
      description: 'CSS filters: blur, brightness, contrast, and more',
      icon: (
        <LucideIcons.Filter className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/filters',
      iconBgClassName: 'from-sky-500 to-blue-500',
    },
    {
      title: 'Tables',
      description: 'Table layout, border spacing, and display utilities',
      icon: (
        <LucideIcons.Table className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/tables',
      iconBgClassName: 'from-emerald-500 to-green-500',
    },
    {
      title: 'Transitions',
      description: 'CSS transitions and animation properties',
      icon: (
        <LucideIcons.Play className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/transitions',
      iconBgClassName: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Transforms',
      description: 'CSS transforms: rotate, scale, translate, skew',
      icon: (
        <LucideIcons.Move3D className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/transforms',
      iconBgClassName: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Interactivity',
      description: 'Cursors, pointers, scroll behavior, and user interactions',
      icon: (
        <LucideIcons.MousePointerClick className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/interactivity',
      iconBgClassName: 'from-red-500 to-orange-500',
    },
    {
      title: 'SVG',
      description: 'SVG fill, stroke, and stroke width utilities',
      icon: (
        <LucideIcons.Pen className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/svg',
      iconBgClassName: 'from-amber-500 to-yellow-500',
    },
    {
      title: 'Accessibility',
      description: 'Accessibility utilities and screen reader support',
      icon: (
        <LucideIcons.Accessibility className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      href: '/tailwind-utilities/accessibility',
      iconBgClassName: 'from-cyan-500 to-teal-500',
    },
  ];

  const nextSteps = [
    'Browse all 15 utility categories with interactive examples and live demos',
    'Learn responsive design patterns with sm:, md:, lg:, xl: breakpoints',
    'Explore dark mode utilities with automatic dark: variant support',
    'Combine utilities with tucu-ui components for rapid UI development',
    'Use arbitrary values [value] for custom one-off styles',
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Tailwind CSS v4"
        description="Explore the complete Tailwind CSS v4 utility system integrated into tucu-ui. Every utility class is automatically available through our optimized @source directives, providing full design system coverage without bundle bloat."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Wind className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Key Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Why Tailwind CSS v4?
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A CSS-first architecture with zero configuration, optimized bundles,
            and seamless design token integration
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

      {/* Implementation Status */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Implementation Status">
            <div className="w-full space-y-8">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
              >
                <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                All 15 Tailwind utility categories fully implemented and
                available
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {implementationStatus.map((item, index) => (
                  <ColorCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Utility Categories Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Utility Categories
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore all available Tailwind CSS v4 utility categories with
            interactive examples and documentation
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {tailwindCategories.map((category, index) => (
            <FeatureCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              iconBgClassName={category.iconBgClassName}
              onClick={() => window.open(category.href, '_self')}
            />
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Quick Start">
            <div className="w-full space-y-6">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-300"
              >
                All utilities are automatically available — just start using
                Tailwind classes in your components:
              </Typography>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography tag="h5">1. Basic Usage</Typography>
                  <CodeBlock
                    noExpand={true}
                    language="tsx"
                    code={`<div className="flex items-center justify-center p-4 bg-brand text-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Hello Tailwind v4!</h2>
</div>`}
                  />
                </div>

                <div className="space-y-3">
                  <Typography tag="h5">2. Responsive Design</Typography>
                  <CodeBlock
                    noExpand={true}
                    language="tsx"
                    code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    Responsive Card
  </div>
</div>`}
                  />
                </div>

                <div className="space-y-3">
                  <Typography tag="h5">3. Dark Mode</Typography>
                  <CodeBlock
                    noExpand={true}
                    language="tsx"
                    code={`<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl">
  <p className="text-gray-600 dark:text-gray-400">
    Automatic dark mode support with the dark: variant
  </p>
</div>`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* What's Next */}
      <section>
        <CardContainer>
          <CardTitle title="What's Next?">
            <div className="space-y-4">
              <Typography tag="h6">
                Ready to dive deeper? Explore our comprehensive utility
                documentation:
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
                  <AnchorLink
                    to="/tailwind-utilities/layout-utilities"
                    target="_self"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.BookOpen className="w-4 h-4 mr-2" />
                      Explore Utilities
                    </div>
                  </AnchorLink>
                </Button>
                <Button variant="ghost" size="medium">
                  <AnchorLink
                    to="https://tailwindcss.com/docs"
                    target="_blank"
                  >
                    <div className="flex justify-center items-center">
                      <LucideIcons.ExternalLink className="w-4 h-4 mr-2" />
                      Tailwind Docs
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
