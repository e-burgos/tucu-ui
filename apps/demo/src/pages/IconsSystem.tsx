import { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
  Alert,
  CodeBlock,
} from 'tucu-ui';

export function IconsSystem() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const iconCategories = [
    {
      title: 'Lucide React Integration',
      description:
        'Access to 5000+ high-quality icons through the LucideIcons namespace',
      icon: (
        <LucideIcons.Sparkles className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-rose-500 to-pink-500',
      features: [
        'Complete Lucide React library',
        'Single namespace import',
        'Tree-shaking optimized',
        'TypeScript support',
      ],
    },
    {
      title: 'Custom Tucu Icons',
      description:
        'Carefully crafted SVG icons designed specifically for Tucu UI',
      icon: (
        <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-pink-500 via-red-500 to-rose-500',
      features: [
        '90+ custom icons',
        'Theme-aware variants',
        'Brand consistency',
        'Optimized SVGs',
      ],
    },
    {
      title: 'Dual Icon System',
      description:
        'Seamless integration of custom and Lucide icons in one system',
      icon: (
        <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-rose-500 via-red-500 to-pink-500',
      features: [
        'Unified API',
        'Consistent styling',
        'Easy migration',
        'Performance optimized',
      ],
    },
  ];

  const iconShowcase = [
    {
      category: 'Navigation & Layout',
      description: 'Essential navigation and layout icons',
      icon: (
        <LucideIcons.Navigation className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-rose-500 to-pink-500',
      icons: [
        { name: 'Home', component: <LucideIcons.Home className="w-6 h-6" /> },
        { name: 'Menu', component: <LucideIcons.Menu className="w-6 h-6" /> },
        {
          name: 'ArrowLeft',
          component: <LucideIcons.ArrowLeft className="w-6 h-6" />,
        },
        {
          name: 'ArrowRight',
          component: <LucideIcons.ArrowRight className="w-6 h-6" />,
        },
        {
          name: 'ChevronUp',
          component: <LucideIcons.ChevronUp className="w-6 h-6" />,
        },
        {
          name: 'ChevronDown',
          component: <LucideIcons.ChevronDown className="w-6 h-6" />,
        },
        {
          name: 'Grid',
          component: <LucideIcons.Grid3X3 className="w-6 h-6" />,
        },
        { name: 'List', component: <LucideIcons.List className="w-6 h-6" /> },
      ],
    },
    {
      category: 'Actions & Controls',
      description: 'Common action and control icons',
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-pink-500 via-red-500 to-rose-500',
      icons: [
        { name: 'Plus', component: <LucideIcons.Plus className="w-6 h-6" /> },
        { name: 'Minus', component: <LucideIcons.Minus className="w-6 h-6" /> },
        { name: 'X', component: <LucideIcons.X className="w-6 h-6" /> },
        { name: 'Check', component: <LucideIcons.Check className="w-6 h-6" /> },
        { name: 'Edit', component: <LucideIcons.Edit className="w-6 h-6" /> },
        {
          name: 'Trash2',
          component: <LucideIcons.Trash2 className="w-6 h-6" />,
        },
        {
          name: 'Download',
          component: <LucideIcons.Download className="w-6 h-6" />,
        },
        {
          name: 'Upload',
          component: <LucideIcons.Upload className="w-6 h-6" />,
        },
      ],
    },
    {
      category: 'Communication',
      description: 'Communication and social icons',
      icon: (
        <LucideIcons.MessageCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-rose-500 via-red-500 to-pink-500',
      icons: [
        { name: 'Mail', component: <LucideIcons.Mail className="w-6 h-6" /> },
        { name: 'Phone', component: <LucideIcons.Phone className="w-6 h-6" /> },
        {
          name: 'MessageCircle',
          component: <LucideIcons.MessageCircle className="w-6 h-6" />,
        },
        { name: 'Send', component: <LucideIcons.Send className="w-6 h-6" /> },
        { name: 'Bell', component: <LucideIcons.Bell className="w-6 h-6" /> },
        {
          name: 'BellOff',
          component: <LucideIcons.BellOff className="w-6 h-6" />,
        },
        { name: 'Share', component: <LucideIcons.Share className="w-6 h-6" /> },
        { name: 'Heart', component: <LucideIcons.Heart className="w-6 h-6" /> },
      ],
    },
    {
      category: 'User & Account',
      description: 'User management and account icons',
      icon: (
        <LucideIcons.Users className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-600 via-rose-600 to-pink-600',
      icons: [
        { name: 'User', component: <LucideIcons.User className="w-6 h-6" /> },
        { name: 'Users', component: <LucideIcons.Users className="w-6 h-6" /> },
        {
          name: 'UserPlus',
          component: <LucideIcons.UserPlus className="w-6 h-6" />,
        },
        {
          name: 'Settings',
          component: <LucideIcons.Settings className="w-6 h-6" />,
        },
        { name: 'Lock', component: <LucideIcons.Lock className="w-6 h-6" /> },
        {
          name: 'Unlock',
          component: <LucideIcons.Unlock className="w-6 h-6" />,
        },
        { name: 'Eye', component: <LucideIcons.Eye className="w-6 h-6" /> },
        {
          name: 'EyeOff',
          component: <LucideIcons.EyeOff className="w-6 h-6" />,
        },
      ],
    },
  ];

  const bestPractices = [
    {
      category: 'Icon Sizing',
      items: [
        'Use consistent sizing patterns (xs: 12px, sm: 16px, md: 24px, lg: 32px, xl: 48px)',
        'Follow responsive design principles with size variants',
        'Maintain visual hierarchy with appropriate icon sizes',
      ],
    },
    {
      category: 'Accessibility',
      items: [
        'Always provide aria-label for interactive icons',
        'Use aria-hidden="true" for decorative icons',
        'Ensure sufficient color contrast in all themes',
        'Test with screen readers and keyboard navigation',
      ],
    },
    {
      category: 'Performance',
      items: [
        'Use the LucideIcons namespace for automatic tree-shaking',
        'Avoid importing individual icons directly',
        'Leverage the unified import pattern for better bundling',
      ],
    },
    {
      category: 'Theme Integration',
      items: [
        'Use theme-aware custom icons when available',
        'Apply brand colors using text-brand utility class',
        'Ensure icons work well in both light and dark themes',
      ],
    },
  ];

  const handleCopyIcon = (iconName: string) => {
    const iconCode = `<LucideIcons.${iconName} className="w-6 h-6" />`;
    navigator.clipboard.writeText(iconCode);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const lucideImportCode = `import { LucideIcons } from 'tucu-ui';

function MyComponent() {
  return (
    <div>
      <LucideIcons.Home className="w-6 h-6 text-gray-600" />
      <LucideIcons.User size={24} color="currentColor" />
      <LucideIcons.Settings className="w-5 h-5" />
      <LucideIcons.ChevronDown strokeWidth={1.5} />
      <LucideIcons.Search className="w-4 h-4 text-blue-500" />
    </div>
  );
}`;

  const customIconsCode = `import {
  Tucu,
  HomeIcon,
  SearchIcon,
  BookIcon,
  PlayIcon,
  InfoIcon,
  DocumentIcon,
} from 'tucu-ui';

function MyApp() {
  return (
    <div>
      <Tucu className="w-8 h-8 text-brand" />
      <HomeIcon className="w-6 h-6" />
      <SearchIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
}`;

  const iconButtonCode = `import { LucideIcons } from 'tucu-ui';

interface IconButtonProps {
  iconName: keyof typeof LucideIcons;
  label: string;
  onClick?: () => void;
}

function IconButton({ iconName, label, onClick }: IconButtonProps) {
  const IconComponent = LucideIcons[iconName];

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={label}
    >
      <IconComponent className="w-5 h-5" />
    </button>
  );
}`;

  const accessibilityCode = `import { LucideIcons } from 'tucu-ui';

// Decorative icons
<LucideIcons.Home className="w-6 h-6" aria-hidden="true" />

// Interactive icons
<LucideIcons.Settings
  className="w-6 h-6 cursor-pointer"
  aria-label="Open settings"
  role="button"
  tabIndex={0}
/>

// Icons with text labels
<button>
  <LucideIcons.Home className="w-4 h-4 mr-2" aria-hidden="true" />
  Home
</button>`;

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 dark:from-red-900 dark:via-rose-900 dark:to-pink-900 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 dark:from-black/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-rose-300/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            <Typography
              tag="h1"
              className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Icons System
            </Typography>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              Comprehensive icon system combining custom-designed icons with
              full Lucide React integration. Access to 5000+ high-quality icons
              through a unified, performant API.
            </Typography>
          </div>
        </div>
      </section>

      {/* Icon Architecture */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Icon Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Dual icon system combining custom design with extensive Lucide React
            library
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {iconCategories.map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {category.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {category.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {category.description}
                </Typography>
                <div className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Icon Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Icon Showcase
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Popular icons organized by category with interactive preview
          </Typography>
        </div>

        <div className="space-y-8">
          {iconShowcase.map((category, index) => (
            <CardContainer key={index} className="overflow-hidden">
              <CardTitle title={category.category} className="mt-2 mb-2">
                <div className="w-full space-y-6 p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <Typography tag="h3" className="text-xl font-semibold">
                        {category.category}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {category.description}
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {category.icons.map((icon, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                        onClick={() => handleCopyIcon(icon.name)}
                        title={`Click to copy: LucideIcons.${icon.name}`}
                      >
                        <div className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">
                          {icon.component}
                        </div>
                        <Typography
                          tag="span"
                          className="text-xs text-center text-gray-500 dark:text-gray-400"
                        >
                          {icon.name}
                        </Typography>
                        {copiedIcon === icon.name && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                            Copied!
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardTitle>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Usage Examples" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                  <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  How to Use Icons
                </Typography>
              </div>

              <div className="space-y-8">
                {/* Lucide Icons */}
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Lucide React Integration
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Import the LucideIcons namespace and access any icon with
                    dot notation.
                  </Typography>
                  <CodeBlock code={lucideImportCode} language="tsx" />
                </div>

                {/* Custom Icons */}
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Custom Tucu Icons
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Access custom-designed icons specific to Tucu UI through
                    direct imports.
                  </Typography>
                  <CodeBlock code={customIconsCode} language="tsx" />
                </div>

                {/* Icon Button Component */}
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Creating Icon Components
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Create reusable icon components with proper TypeScript
                    support.
                  </Typography>
                  <CodeBlock code={iconButtonCode} language="tsx" />
                </div>

                {/* Accessibility */}
                <div className="space-y-4">
                  <Typography tag="h4" className="font-semibold">
                    Accessibility Best Practices
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Always provide proper accessibility attributes for icons.
                  </Typography>
                  <CodeBlock code={accessibilityCode} language="tsx" />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Best Practices
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Guidelines for optimal icon system implementation
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {bestPractices.map((practice, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="font-semibold text-lg">
                    {practice.category}
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {practice.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <LucideIcons.ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Icon Sizes Demo */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Icon Sizing Guide" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                  <LucideIcons.Ruler className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Standard Icon Sizes
                </Typography>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  {
                    name: 'XS',
                    size: 'w-3 h-3',
                    pixels: '12px',
                    use: 'Inline text',
                  },
                  {
                    name: 'SM',
                    size: 'w-4 h-4',
                    pixels: '16px',
                    use: 'Small buttons',
                  },
                  {
                    name: 'MD',
                    size: 'w-6 h-6',
                    pixels: '24px',
                    use: 'Default size',
                  },
                  {
                    name: 'LG',
                    size: 'w-8 h-8',
                    pixels: '32px',
                    use: 'Large buttons',
                  },
                  {
                    name: 'XL',
                    size: 'w-12 h-12',
                    pixels: '48px',
                    use: 'Feature icons',
                  },
                ].map((size, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="flex justify-center">
                      <LucideIcons.Star
                        className={`${size.size} text-red-500`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Typography tag="h4" className="font-semibold text-sm">
                        {size.name}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        {size.pixels}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-600 dark:text-gray-400"
                      >
                        {size.use}
                      </Typography>
                      <Badge variant="outline" className="text-xs font-mono">
                        {size.size}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Migration Guide */}
      <section className="space-y-8">
        <Alert>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
              <Typography tag="h6" className="font-semibold">
                Icon System Benefits
              </Typography>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Single namespace import for all Lucide icons</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Automatic tree-shaking for optimal bundle size</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>TypeScript support with full icon name completion</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Seamless integration with Tailwind CSS utilities</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Theme-aware custom icons with brand consistency</span>
              </li>
            </ul>
          </div>
        </Alert>
      </section>
    </div>
  );
}
