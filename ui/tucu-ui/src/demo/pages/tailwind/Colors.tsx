import {
  CardContainer,
  Button,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  CardTitle,
  HeroCard,
} from '../../../../index';
import { DOCUMENTATION_URL } from '../../../../index';

export function Colors() {
  // Color palettes organized by category
  const colorPalettes = [
    {
      name: 'Neutrals',
      colors: ['slate', 'gray', 'zinc', 'neutral', 'stone'],
      description: 'Perfect for backgrounds, borders, and text',
    },
    {
      name: 'Reds & Pinks',
      colors: ['red', 'rose', 'pink', 'fuchsia'],
      description: 'Ideal for errors, warnings, and highlights',
    },
    {
      name: 'Blues & Cyans',
      colors: ['blue', 'sky', 'cyan', 'indigo', 'violet'],
      description: 'Great for primary actions and information',
    },
    {
      name: 'Greens & Teals',
      colors: ['green', 'emerald', 'teal', 'lime'],
      description: 'Perfect for success states and nature themes',
    },
    {
      name: 'Warm Colors',
      colors: ['orange', 'amber', 'yellow'],
      description: 'Excellent for warnings and attention-grabbing elements',
    },
    {
      name: 'Purples',
      colors: ['purple', 'violet'],
      description: 'Creative and premium feeling colors',
    },
  ];

  // Semantic colors from the library
  const semanticColors = [
    {
      name: 'Brand',
      class: 'bg-brand',
      textClass: 'text-brand',
      description: 'Main brand color',
    },
    {
      name: 'Gray (Secondary)',
      class: 'bg-gray-500',
      textClass: 'text-gray-500',
      description: 'Secondary actions color',
    },
    {
      name: 'Emerald (Success)',
      class: 'bg-emerald-500',
      textClass: 'text-emerald-500',
      description: 'Positive actions',
    },
    {
      name: 'Orange (Warning)',
      class: 'bg-orange-500',
      textClass: 'text-orange-500',
      description: 'Caution states',
    },
    {
      name: 'Red (Error)',
      class: 'bg-red-500',
      textClass: 'text-red-500',
      description: 'Error states',
    },
    {
      name: 'Cyan (Information)',
      class: 'bg-cyan-500',
      textClass: 'text-cyan-500',
      description: 'Information',
    },
    {
      name: 'Body',
      class: 'bg-body',
      textClass: 'text-body',
      description: 'Background color',
    },
    {
      name: 'Dark',
      class: 'bg-dark',
      textClass: 'text-dark',
      description: 'Dark mode background',
    },
    {
      name: 'Light Dark',
      class: 'bg-light-dark',
      textClass: 'text-light-dark',
      description: 'Light dark mode background',
    },
    {
      name: 'Sidebar Body',
      class: 'bg-sidebar-body',
      textClass: 'text-sidebar-body',
      description: 'Sidebar background',
    },
    {
      name: 'White',
      class: 'bg-white',
      textClass: 'text-white',
      description: 'White color',
    },
    {
      name: 'Black',
      class: 'bg-black',
      textClass: 'text-black',
      description: 'Black color',
    },
    {
      name: 'Blue',
      class: 'bg-blue-500',
      textClass: 'text-blue-500',
      description: 'Blue color',
    },
    {
      name: 'Rose',
      class: 'bg-rose-500',
      textClass: 'text-rose-500',
      description: 'Rose color',
    },
    {
      name: 'Pink',
      class: 'bg-pink-500',
      textClass: 'text-pink-500',
      description: 'Pink color',
    },
    {
      name: 'Fuchsia',
      class: 'bg-fuchsia-500',
      textClass: 'text-fuchsia-500',
      description: 'Fuchsia color',
    },
    {
      name: 'Indigo',
      class: 'bg-indigo-500',
      textClass: 'text-indigo-500',
      description: 'Indigo color',
    },
    {
      name: 'Violet',
      class: 'bg-violet-500',
      textClass: 'text-violet-500',
      description: 'Violet color',
    },
    {
      name: 'Cyan',
      class: 'bg-cyan-500',
      textClass: 'text-cyan-500',
      description: 'Cyan color',
    },
    {
      name: 'Sky',
      class: 'bg-sky-500',
      textClass: 'text-sky-500',
      description: 'Sky color',
    },
    {
      name: 'Teal',
      class: 'bg-teal-500',
      textClass: 'text-teal-500',
      description: 'Teal color',
    },
  ];

  // Gradient combinations
  const gradients = [
    { name: 'Sunset', classes: 'from-orange-400 via-pink-500 to-purple-600' },
    { name: 'Ocean', classes: 'from-blue-400 via-cyan-500 to-teal-600' },
    { name: 'Forest', classes: 'from-green-400 via-emerald-500 to-teal-600' },
    { name: 'Royal', classes: 'from-purple-400 via-violet-500 to-indigo-600' },
    { name: 'Fire', classes: 'from-red-400 via-orange-500 to-yellow-600' },
    { name: 'Mint', classes: 'from-cyan-400 via-teal-500 to-emerald-600' },
    { name: 'Brand', classes: 'from-brand via-brand/20 to-brand/10' },
    { name: 'Steel', classes: 'from-gray-500 via-gray-600 to-gray-900' },
    {
      name: 'Emerald',
      classes: 'from-emerald-500 via-emerald-600 to-emerald-900',
    },
  ];

  // Opacity variations
  const opacityLevels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Color System"
        description="Explore our comprehensive color palette with 22 color families, 11 shades each, semantic colors, gradients, and opacity variations. Built with modern OKLCH color space for better accuracy and accessibility."
        githubButton
        getStartedButton
        docsButton="design-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Semantic Colors */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Semantic Colors
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Predefined semantic colors for consistent UI patterns
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {semanticColors.map((color, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${color.class} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  ></div>
                  <div>
                    <Typography
                      tag="h3"
                      className={`font-semibold text-lg ${color.textClass} group-hover:scale-105 transition-all duration-300`}
                    >
                      {color.name}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {color.description}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {color.class}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {color.textClass}
                  </Badge>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Color Palettes */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Color Palettes
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive color system with 22 color families
          </Typography>
        </div>

        <div className="space-y-12">
          {colorPalettes.map((palette, paletteIndex) => (
            <CardContainer key={paletteIndex} className="overflow-hidden mb-8">
              <CardTitle title={palette.name} className="mb-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-6"
                >
                  {palette.description}
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {palette.colors.map((colorName, colorIndex) => (
                    <div key={colorIndex} className="space-y-2">
                      <Typography
                        tag="h4"
                        className="font-semibold text-sm capitalize"
                      >
                        {colorName}
                      </Typography>
                      <div className="space-y-1">
                        {[
                          50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
                        ].map((shade) => (
                          <div
                            key={shade}
                            className={`h-8 rounded-md bg-${colorName}-${shade} border border-gray-200 dark:border-gray-700 flex items-center justify-between px-2 group hover:scale-105 transition-transform duration-200`}
                          >
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                              {shade}
                            </span>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              {colorName}-{shade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardTitle>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Gradient Combinations
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Beautiful gradient combinations for modern UI designs
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gradients.map((gradient, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="w-full space-y-4">
                <div
                  className={`h-24 rounded-lg bg-gradient-to-r ${gradient.classes} group-hover:scale-105 transition-transform duration-300`}
                ></div>
                <div className="space-y-2">
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {gradient.name}
                  </Typography>
                  <Badge
                    variant="outline"
                    className="text-xs overflow-hidden text-ellipsis whitespace-wrap font-mono max-w-full h-10 px-2 py-2"
                  >
                    {gradient.classes}
                  </Badge>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Opacity Variations */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Opacity Variations
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore opacity levels from 10% to 100% for layered designs
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <CardTitle title="Opacity Scale" className="mb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Typography
                  tag="h4"
                  className="font-semibold text-sm capitalize"
                >
                  Brand opacity scale
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {opacityLevels.map((opacity, opacityIndex) => (
                    <div
                      key={opacityIndex}
                      className={`h-12 rounded-md bg-brand/${opacity} border border-gray-200 dark:border-gray-700 flex items-center justify-center group hover:scale-105 transition-transform duration-200`}
                    >
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {opacity}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {[
                'blue',
                'red',
                'green',
                'purple',
                'orange',
                'indigo',
                'violet',
                'fuchsia',
                'pink',
                'rose',
                'gray',
                'zinc',
                'neutral',
                'stone',
              ].map((color, colorIndex) => (
                <div key={colorIndex} className="space-y-2">
                  <Typography
                    tag="h4"
                    className="font-semibold text-sm capitalize"
                  >
                    {color} opacity scale
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {opacityLevels.map((opacity, opacityIndex) => (
                      <div
                        key={opacityIndex}
                        className={`h-12 rounded-md bg-${color}-500/${opacity} border border-gray-200 dark:border-gray-700 flex items-center justify-center group hover:scale-105 transition-transform duration-200`}
                      >
                        <span className="text-xs font-mono text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {opacity}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Usage Examples */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Usage Examples
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            See how colors work in real components and applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Button Examples */}
          <CardContainer>
            <CardTitle title="Button Variants" className="mb-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button color="primary" size="medium">
                    Primary
                  </Button>
                  <Button color="gray" size="medium">
                    Gray
                  </Button>
                  <Button color="success" size="medium">
                    Success
                  </Button>
                  <Button color="warning" size="medium">
                    Warning
                  </Button>
                  <Button color="danger" size="medium">
                    Danger
                  </Button>
                  <Button color="info" size="medium">
                    Info
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" color="primary" size="medium">
                    Ghost Primary
                  </Button>
                  <Button variant="ghost" color="success" size="medium">
                    Ghost Success
                  </Button>
                  <Button variant="ghost" color="danger" size="medium">
                    Ghost Danger
                  </Button>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Badge Examples */}
          <CardContainer>
            <CardTitle title="Badge Variants" className="mb-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge status="active">Active</Badge>
                  <Badge status="inactive">Inactive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Alert Examples */}
          <CardContainer>
            <CardTitle title="Alert States" className="mb-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-emerald-500 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <Typography
                      tag="p"
                      className="text-emerald-800 dark:text-emerald-200 font-medium"
                    >
                      Success! Your changes have been saved.
                    </Typography>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2">
                    <LucideIcons.AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <Typography
                      tag="p"
                      className="text-orange-800 dark:text-orange-200 font-medium"
                    >
                      Warning! Please review your input.
                    </Typography>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <LucideIcons.XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <Typography
                      tag="p"
                      className="text-red-800 dark:text-red-200 font-medium"
                    >
                      Error! Something went wrong.
                    </Typography>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Status Indicators */}
          <CardContainer>
            <CardTitle title="Status Indicators" className="mb-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <Typography tag="span" className="text-sm">
                    Online
                  </Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <Typography tag="span" className="text-sm">
                    Away
                  </Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <Typography tag="span" className="text-sm">
                    Offline
                  </Typography>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <Typography tag="span" className="text-sm">
                    Available
                  </Typography>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Color System Info */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Color System Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built with modern color science and accessibility in mind
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'OKLCH Color Space',
              description:
                'Modern color space for better accuracy and perceptual uniformity',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Accessibility First',
              description: 'WCAG 2.1 AA compliant with proper contrast ratios',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dark Mode Ready',
              description: 'Optimized colors for both light and dark themes',
              color: 'from-purple-500 via-violet-500 to-indigo-500',
            },
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Performance Optimized',
              description:
                'CSS variables for efficient theming and minimal bundle size',
              color: 'from-orange-500 via-yellow-500 to-amber-500',
            },
            {
              icon: (
                <LucideIcons.Code className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Developer Friendly',
              description:
                'TypeScript support with autocomplete and IntelliSense',
              color: 'from-indigo-500 via-blue-500 to-cyan-500',
            },
            {
              icon: (
                <LucideIcons.Sparkles className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Extensible',
              description:
                'Easy to customize and extend with your own color tokens',
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

      {/* Tailwind CSS v4 Safelist: Explicit classes for dynamic generation */}
      {/* This hidden block ensures all dynamic classes are detected by @source directive */}
      <div className="hidden">
        {/* Brand opacity classes (including /50 and /70 used in HeroCard) */}
        <div className="bg-brand/10 bg-brand/20 bg-brand/30 bg-brand/40 bg-brand/50 bg-brand/60 bg-brand/70 bg-brand/80 bg-brand/90 bg-brand/100 border-brand/50"></div>
        {/* Orange 900 opacity classes (used in alerts) */}
        <div className="bg-orange-900/20"></div>
        {/* Red 900 opacity classes (used in alerts) */}
        <div className="bg-red-900/20"></div>
        {/* Blue opacity classes */}
        <div className="bg-blue-500/10 bg-blue-500/20 bg-blue-500/30 bg-blue-500/40 bg-blue-500/50 bg-blue-500/60 bg-blue-500/70 bg-blue-500/80 bg-blue-500/90 bg-blue-500/100"></div>
        {/* Color Palettes: Neutrals - slate, gray, zinc, neutral, stone */}
        <div className="bg-slate-50 bg-slate-100 bg-slate-200 bg-slate-300 bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700 bg-slate-800 bg-slate-900 bg-slate-950"></div>
        <div className="bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900 bg-gray-950"></div>
        <div className="bg-zinc-50 bg-zinc-100 bg-zinc-200 bg-zinc-300 bg-zinc-400 bg-zinc-500 bg-zinc-600 bg-zinc-700 bg-zinc-800 bg-zinc-900 bg-zinc-950"></div>
        <div className="bg-neutral-50 bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900 bg-neutral-950"></div>
        <div className="bg-stone-50 bg-stone-100 bg-stone-200 bg-stone-300 bg-stone-400 bg-stone-500 bg-stone-600 bg-stone-700 bg-stone-800 bg-stone-900 bg-stone-950"></div>
        {/* Color Palettes: Reds & Pinks - red, rose, pink, fuchsia */}
        <div className="bg-red-50 bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700 bg-red-800 bg-red-900 bg-red-950"></div>
        <div className="bg-rose-50 bg-rose-100 bg-rose-200 bg-rose-300 bg-rose-400 bg-rose-500 bg-rose-600 bg-rose-700 bg-rose-800 bg-rose-900 bg-rose-950"></div>
        <div className="bg-pink-50 bg-pink-100 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600 bg-pink-700 bg-pink-800 bg-pink-900 bg-pink-950"></div>
        <div className="bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-200 bg-fuchsia-300 bg-fuchsia-400 bg-fuchsia-500 bg-fuchsia-600 bg-fuchsia-700 bg-fuchsia-800 bg-fuchsia-900 bg-fuchsia-950"></div>
        {/* Color Palettes: Blues & Cyans - blue, sky, cyan, indigo, violet */}
        <div className="bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900 bg-blue-950"></div>
        <div className="bg-sky-50 bg-sky-100 bg-sky-200 bg-sky-300 bg-sky-400 bg-sky-500 bg-sky-600 bg-sky-700 bg-sky-800 bg-sky-900 bg-sky-950"></div>
        <div className="bg-cyan-50 bg-cyan-100 bg-cyan-200 bg-cyan-300 bg-cyan-400 bg-cyan-500 bg-cyan-600 bg-cyan-700 bg-cyan-800 bg-cyan-900 bg-cyan-950"></div>
        <div className="bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900 bg-indigo-950"></div>
        <div className="bg-violet-50 bg-violet-100 bg-violet-200 bg-violet-300 bg-violet-400 bg-violet-500 bg-violet-600 bg-violet-700 bg-violet-800 bg-violet-900 bg-violet-950"></div>
        {/* Color Palettes: Greens & Teals - green, emerald, teal, lime */}
        <div className="bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900 bg-green-950"></div>
        <div className="bg-emerald-50 bg-emerald-100 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-emerald-700 bg-emerald-800 bg-emerald-900 bg-emerald-950"></div>
        <div className="bg-teal-50 bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal-900 bg-teal-950"></div>
        <div className="bg-lime-50 bg-lime-100 bg-lime-200 bg-lime-300 bg-lime-400 bg-lime-500 bg-lime-600 bg-lime-700 bg-lime-800 bg-lime-900 bg-lime-950"></div>
        {/* Color Palettes: Warm Colors - orange, amber, yellow */}
        <div className="bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900 bg-orange-950"></div>
        <div className="bg-amber-50 bg-amber-100 bg-amber-200 bg-amber-300 bg-amber-400 bg-amber-500 bg-amber-600 bg-amber-700 bg-amber-800 bg-amber-900 bg-amber-950"></div>
        <div className="bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900 bg-yellow-950"></div>
        {/* Color Palettes: Purples - purple, violet (already included above) */}
        <div className="bg-purple-50 bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900 bg-purple-950"></div>
        {/* Red opacity classes */}
        <div className="bg-red-500/10 bg-red-500/20 bg-red-500/30 bg-red-500/40 bg-red-500/50 bg-red-500/60 bg-red-500/70 bg-red-500/80 bg-red-500/90 bg-red-500/100"></div>
        {/* Green opacity classes */}
        <div className="bg-green-500/10 bg-green-500/20 bg-green-500/30 bg-green-500/40 bg-green-500/50 bg-green-500/60 bg-green-500/70 bg-green-500/80 bg-green-500/90 bg-green-500/100"></div>
        {/* Purple opacity classes */}
        <div className="bg-purple-500/10 bg-purple-500/20 bg-purple-500/30 bg-purple-500/40 bg-purple-500/50 bg-purple-500/60 bg-purple-500/70 bg-purple-500/80 bg-purple-500/90 bg-purple-500/100"></div>
        {/* Orange opacity classes */}
        <div className="bg-orange-500/10 bg-orange-500/20 bg-orange-500/30 bg-orange-500/40 bg-orange-500/50 bg-orange-500/60 bg-orange-500/70 bg-orange-500/80 bg-orange-500/90 bg-orange-500/100"></div>
        {/* Indigo opacity classes */}
        <div className="bg-indigo-500/10 bg-indigo-500/20 bg-indigo-500/30 bg-indigo-500/40 bg-indigo-500/50 bg-indigo-500/60 bg-indigo-500/70 bg-indigo-500/80 bg-indigo-500/90 bg-indigo-500/100"></div>
        {/* Violet opacity classes */}
        <div className="bg-violet-500/10 bg-violet-500/20 bg-violet-500/30 bg-violet-500/40 bg-violet-500/50 bg-violet-500/60 bg-violet-500/70 bg-violet-500/80 bg-violet-500/90 bg-violet-500/100"></div>
        {/* Fuchsia opacity classes */}
        <div className="bg-fuchsia-500/10 bg-fuchsia-500/20 bg-fuchsia-500/30 bg-fuchsia-500/40 bg-fuchsia-500/50 bg-fuchsia-500/60 bg-fuchsia-500/70 bg-fuchsia-500/80 bg-fuchsia-500/90 bg-fuchsia-500/100"></div>
        {/* Pink opacity classes */}
        <div className="bg-pink-500/10 bg-pink-500/20 bg-pink-500/30 bg-pink-500/40 bg-pink-500/50 bg-pink-500/60 bg-pink-500/70 bg-pink-500/80 bg-pink-500/90 bg-pink-500/100"></div>
        {/* Rose opacity classes */}
        <div className="bg-rose-500/10 bg-rose-500/20 bg-rose-500/30 bg-rose-500/40 bg-rose-500/50 bg-rose-500/60 bg-rose-500/70 bg-rose-500/80 bg-rose-500/90 bg-rose-500/100"></div>
        {/* Gray opacity classes */}
        <div className="bg-gray-500/10 bg-gray-500/20 bg-gray-500/30 bg-gray-500/40 bg-gray-500/50 bg-gray-500/60 bg-gray-500/70 bg-gray-500/80 bg-gray-500/90 bg-gray-500/100"></div>
        {/* Zinc opacity classes */}
        <div className="bg-zinc-500/10 bg-zinc-500/20 bg-zinc-500/30 bg-zinc-500/40 bg-zinc-500/50 bg-zinc-500/60 bg-zinc-500/70 bg-zinc-500/80 bg-zinc-500/90 bg-zinc-500/100"></div>
        {/* Neutral opacity classes */}
        <div className="bg-neutral-500/10 bg-neutral-500/20 bg-neutral-500/30 bg-neutral-500/40 bg-neutral-500/50 bg-neutral-500/60 bg-neutral-500/70 bg-neutral-500/80 bg-neutral-500/90 bg-neutral-500/100"></div>
        {/* Stone opacity classes */}
        <div className="bg-stone-500/10 bg-stone-500/20 bg-stone-500/30 bg-stone-500/40 bg-stone-500/50 bg-stone-500/60 bg-stone-500/70 bg-stone-500/80 bg-stone-500/90 bg-stone-500/100"></div>
      </div>

      {/* Next Steps */}
      <section>
        <CardContainer>
          <CardTitle
            title="Ready to Get Started?"
            className="mt-2 mb-2 dark:border-current"
          >
            <div className="flex items-start gap-4">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Now that you've seen our comprehensive color system, explore
                  more:
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Component library with 80+ components
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Complete theming system and customization
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Advanced form handling and validation
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm">
                        Accessibility features and best practices
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                  <Button size="medium">
                    <AnchorLink to={DOCUMENTATION_URL} target="_blank">
                      <div className="flex justify-center items-center">
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
