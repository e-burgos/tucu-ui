import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Button,
  CodeBlock,
} from '@e-burgos/tucu-ui';

import HeroPage from '../components/HeroPage';

export function TailwindV4() {
  const tailwindCategories = [
    {
      title: 'Layout & Positioning',
      description:
        'Aspect ratio, display, position, z-index, and overflow utilities',
      icon: <LucideIcons.Layout className="w-8 h-8" />,
      href: '/tailwind-utilities/layout-utilities',
      component: 'LayoutUtilities',
    },
    {
      title: 'Sizing',
      description: 'Width, height, max/min dimensions with arbitrary values',
      icon: <LucideIcons.Move className="w-8 h-8" />,
      href: '/tailwind-utilities/sizing',
      component: 'SizingUtilities',
    },
    {
      title: 'Spacing',
      description: 'Padding, margin, gap utilities with responsive breakpoints',
      icon: <LucideIcons.ArrowUpDown className="w-8 h-8" />,
      href: '/tailwind-utilities/spacing',
      component: 'SpacingUtilities',
    },
    {
      title: 'Typography',
      description:
        'Font families, sizes, weights, spacing, and text formatting',
      icon: <LucideIcons.Type className="w-8 h-8" />,
      href: '/tailwind-utilities/typography',
      component: 'TypographyUtilities',
    },
    {
      title: 'Flexbox & Grid',
      description: 'Complete flexbox and CSS Grid layout system',
      icon: <LucideIcons.Grid3X3 className="w-8 h-8" />,
      href: '/tailwind-utilities/flexbox-grid',
      component: 'FlexboxGridUtilities',
    },
    {
      title: 'Background',
      description: 'Background colors, gradients, images, and positioning',
      icon: <LucideIcons.Image className="w-8 h-8" />,
      href: '/tailwind-utilities/background',
      component: 'BackgroundUtilities',
    },
    {
      title: 'Borders',
      description: 'Border radius, width, colors, styles, and outlines',
      icon: <LucideIcons.Square className="w-8 h-8" />,
      href: '/tailwind-utilities/borders',
      component: 'BordersUtilities',
    },
    {
      title: 'Effects',
      description: 'Shadows, opacity, blend modes, and visual effects',
      icon: <LucideIcons.Sparkles className="w-8 h-8" />,
      href: '/tailwind-utilities/effects',
      component: 'EffectsUtilities',
    },
    {
      title: 'Filters',
      description: 'CSS filters: blur, brightness, contrast, and more',
      icon: <LucideIcons.Filter className="w-8 h-8" />,
      href: '/tailwind-utilities/filters',
      component: 'FiltersUtilities',
    },
    {
      title: 'Tables',
      description: 'Table layout, border spacing, and display utilities',
      icon: <LucideIcons.Table className="w-8 h-8" />,
      href: '/tailwind-utilities/tables',
      component: 'TablesUtilities',
    },
    {
      title: 'Transitions',
      description: 'CSS transitions and animation properties',
      icon: <LucideIcons.Play className="w-8 h-8" />,
      href: '/tailwind-utilities/transitions',
      component: 'TransitionsAnimations',
    },
    {
      title: 'Transforms',
      description: 'CSS transforms: rotate, scale, translate, skew',
      icon: <LucideIcons.Move3D className="w-8 h-8" />,
      href: '/tailwind-utilities/transforms',
      component: 'TransformsUtilities',
    },
    {
      title: 'Interactivity',
      description: 'Cursors, pointers, scroll behavior, and user interactions',
      icon: <LucideIcons.MousePointerClick className="w-8 h-8" />,
      href: '/tailwind-utilities/interactivity',
      component: 'InteractivityUtilities',
    },
    {
      title: 'SVG',
      description: 'SVG fill, stroke, and stroke width utilities',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      href: '/tailwind-utilities/svg',
      component: 'SVGUtilities',
    },
    {
      title: 'Accessibility',
      description: 'Accessibility utilities and screen reader support',
      icon: <LucideIcons.Accessibility className="w-8 h-8" />,
      href: '/tailwind-utilities/accessibility',
      component: 'AccessibilityUtilities',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Tailwind CSS v4"
        description="Explore the complete Tailwind CSS v4 utility system integrated into tucu-ui. Every utility class is automatically available through our optimized @source directives, providing full design system coverage without bundle bloat."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.Wind className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Architecture Overview */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Complete Utility Coverage
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            All Tailwind CSS v4 utilities are automatically included through our
            optimized @source directive system, ensuring zero configuration and
            full feature parity.
          </Typography>
        </div>

        {/* Implementation Status */}
        <CardContainer>
          <CardTitle
            title="Implementation Status"
            className="flex items-center gap-2"
          >
            <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              All 15 Tailwind utility categories fully implemented
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <Typography
                  tag="p"
                  className="text-sm font-medium text-green-800 dark:text-green-200 mb-2"
                >
                  ✅ Layout & Positioning
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-green-700 dark:text-green-300"
                >
                  Aspect ratio, display, position, overflow, z-index
                </Typography>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <Typography
                  tag="p"
                  className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2"
                >
                  ✅ Flexbox & Grid
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-blue-700 dark:text-blue-300"
                >
                  Complete layout system with all properties
                </Typography>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <Typography
                  tag="p"
                  className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2"
                >
                  ✅ Typography
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-purple-700 dark:text-purple-300"
                >
                  Fonts, text formatting, and spacing
                </Typography>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Utility Categories Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Utility Categories
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore all available Tailwind CSS v4 utility categories with
            interactive examples and documentation
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tailwindCategories.map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="p-6 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
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

      {/* Getting Started */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Getting Started
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            All utilities are automatically available - just start using
            Tailwind classes in your components
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Quick Start" className="flex items-center gap-2">
            <LucideIcons.Zap className="w-5 h-5 text-yellow-500" />
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              No configuration needed - all utilities are pre-included
            </Typography>

            <div className="mt-6 space-y-4 w-full">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Typography tag="p" className="font-medium mb-2">
                  Basic Usage
                </Typography>
                <CodeBlock
                  expanded={false}
                  code={`<div className="flex items-center justify-center p-4 bg-brand text-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Hello Tailwind v4!</h2>
</div>`}
                  language="tsx"
                />
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Typography tag="p" className="font-medium mb-2">
                  Responsive Design
                </Typography>
                <CodeBlock
                  expanded={false}
                  code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    Responsive Card
  </div>
</div>`}
                  language="tsx"
                />
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
