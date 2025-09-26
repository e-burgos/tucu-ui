import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
  Alert,
  CodeBlock,
} from 'tucu-ui';
import HeroPage from '../components/HeroPage';

export function LayoutSystem() {
  const layoutTypes = [
    {
      name: 'Classic Layout',
      description:
        'Traditional application layout with fixed sidebar and header',
      icon: (
        <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      features: [
        'Expandable sidebar navigation',
        'Fixed header with logo and actions',
        'Responsive drawer menu for mobile',
        'RTL/LTR support',
      ],
    },
    {
      name: 'Minimal Layout',
      description: 'Clean, minimal layout with top navigation bar',
      icon: (
        <LucideIcons.Minimize2 className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      features: [
        'Sticky top navigation',
        'Horizontal menu items',
        'Backdrop blur effects',
        'Mobile hamburger menu',
      ],
    },
    {
      name: 'Authentication Layout',
      description: 'Full-height layout for authentication pages',
      icon: (
        <LucideIcons.Shield className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-emerald-500 via-green-500 to-teal-500',
      features: [
        'Full viewport height',
        'Centered content alignment',
        'No navigation elements',
        'Perfect for login/signup pages',
      ],
    },
  ];

  const themeFeatures = [
    {
      title: 'Theme Management',
      description: 'Complete control over appearance and layout behavior',
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      title: 'Direction Support',
      description: 'Comprehensive RTL/LTR support for international apps',
      icon: (
        <LucideIcons.ArrowLeftRight className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
    },
    {
      title: 'Color Presets',
      description: 'Predefined color themes that can be applied instantly',
      icon: (
        <LucideIcons.Paintbrush className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach with adaptive layouts',
      icon: (
        <LucideIcons.Smartphone className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-sky-500',
    },
  ];

  const breakpoints = [
    { name: 'xs', value: '500px', description: 'Extra small devices' },
    {
      name: 'sm',
      value: '640px',
      description: 'Small devices (landscape phones)',
    },
    { name: 'md', value: '768px', description: 'Medium devices (tablets)' },
    { name: 'lg', value: '1024px', description: 'Large devices (desktops)' },
    { name: 'xl', value: '1280px', description: 'Extra large devices' },
    { name: '2xl', value: '1440px', description: '2X large devices' },
    { name: '3xl', value: '1780px', description: '3X large devices' },
    { name: '4xl', value: '2160px', description: '4K devices' },
  ];

  const colorPresets = [
    { label: 'Green', value: '#009e60', color: 'bg-green-500' },
    { label: 'Black', value: '#323743', color: 'bg-gray-800' },
    { label: 'Blue', value: '#2a52be', color: 'bg-blue-500' },
    { label: 'Red', value: '#e34234', color: 'bg-red-500' },
    { label: 'Purple', value: '#9370DB', color: 'bg-purple-500' },
    { label: 'Orange', value: '#ffa500', color: 'bg-orange-500' },
  ];

  const bestPractices = [
    {
      category: 'Layout Selection',
      items: [
        'Classic: Use for complex applications with many navigation items',
        'Minimal: Use for content-focused sites and simple applications',
        'None: Use for authentication flows and standalone pages',
      ],
    },
    {
      category: 'Theme Management',
      items: [
        'Store theme preferences in localStorage (handled automatically)',
        'Use useTheme hook for programmatic theme changes',
        'Disable unnecessary theme controls with settingActions',
      ],
    },
    {
      category: 'Responsive Design',
      items: [
        'Always test layouts on mobile devices',
        'Use provided breakpoint hooks for responsive behavior',
        'Consider touch interactions for mobile navigation',
      ],
    },
    {
      category: 'Accessibility',
      items: [
        'Provide meaningful menu item names',
        'Use semantic HTML structure',
        'Test keyboard navigation',
        'Ensure proper color contrast in all themes',
      ],
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Layout System"
        description="Comprehensive layout system with multiple presets, responsive design patterns, and powerful theme management. Built for flexibility, accessibility, and ease of customization."
        githubButton
        getStartedButton
        docsButton="layout-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Layout className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Important Notice */}
      <section className="space-y-8">
        <Alert variant="warning">
          <LucideIcons.AlertTriangle className="h-4 w-4" />
          <div>
            <div className="font-semibold">ThemeProvider Required</div>
            <div>
              Before using any layout components or theme hooks, you MUST wrap
              your application with ThemeProvider. All layout components and
              theme hooks depend on the theme context.
            </div>
          </div>
        </Alert>
      </section>

      {/* Layout Types */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Layout Types
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Different structural patterns for various application types
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {layoutTypes.map((layout, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${layout.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {layout.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {layout.name}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {layout.description}
                </Typography>
                <div className="space-y-2">
                  {layout.features.map((feature, featureIndex) => (
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

      {/* Theme Features */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Theme Features
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Powerful theme management capabilities for modern applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {themeFeatures.map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
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

      {/* Color Presets */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Color Presets" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-md">
                  <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Available Color Presets
                </Typography>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
                {colorPresets.map((preset, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="relative group">
                      <div
                        className={`w-16 h-16 rounded-xl ${preset.color} mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200`}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="space-y-1">
                      <Typography tag="h4" className="font-semibold text-sm">
                        {preset.label}
                      </Typography>
                      <Typography
                        tag="span"
                        className="text-xs text-gray-500 dark:text-gray-400 font-mono"
                      >
                        {preset.value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Responsive Breakpoints */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Responsive Breakpoints" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 shadow-md">
                  <LucideIcons.Smartphone className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Breakpoint System
                </Typography>
              </div>
              <div className="space-y-4">
                {breakpoints.map((breakpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="font-mono">
                        {breakpoint.name}
                      </Badge>
                      <div>
                        <div className="font-semibold">
                          {breakpoint.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Min-width: {breakpoint.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
            Guidelines for optimal layout system implementation
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
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
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

      {/* Code Examples */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Implementation Examples" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                  <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Basic Usage
                </Typography>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography tag="h4" className="font-semibold">
                    1. ThemeProvider Setup
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`
import { ThemeProvider } from 'tucu-ui';

function App() {
  return <ThemeProvider menuItems={menuItems} />;
}

// Or with custom routes
function App() {
  return (
    <ThemeProvider 
      menuItems={menuItems}
      customRoutes={<YourAppContent />}
    />
  );
}`}
                  />
                </div>

                <div className="space-y-3">
                  <Typography tag="h4" className="font-semibold">
                    2. Using Theme Hooks
                  </Typography>

                  <CodeBlock
                    language="tsx"
                    code={`import { useTheme } from 'tucu-ui';

function ThemeControls() {
  const { mode, setMode, layout, setLayout } = useTheme();
  
  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <select 
        value={layout} 
        onChange={(e) => setLayout(e.target.value)}
      >
        <option value="classic">Classic</option>
        <option value="minimal">Minimal</option>
      </select>
    </div>
  );
}

// Usage with ThemeProvider
function App() {
  const menuItems = [
    { 
      name: 'Theme Controls', 
      href: '/theme-controls',
      component: <ThemeControls />
    }
  ];

  return <ThemeProvider menuItems={menuItems} />;
}`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Common Errors */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Common Errors and Solutions" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                  <LucideIcons.AlertCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Troubleshooting Guide
                </Typography>
              </div>

              <div className="space-y-6">
                <Alert variant="error">
                  <LucideIcons.XCircle className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">
                      useTheme must be used within ThemeProvider
                    </div>
                    <div className="text-sm mt-1">
                      This error occurs when you try to use useTheme outside of
                      ThemeProvider context. Always wrap your components with
                      ThemeProvider first.
                    </div>
                  </div>
                </Alert>

                <Alert variant="info">
                  <LucideIcons.Info className="h-4 w-4" />
                  <div>
                    <div className="font-semibold">
                      Layout not rendering correctly
                    </div>
                    <div className="text-sm mt-1">
                      Make sure you're using ThemeProvider instead of trying to
                      use RootLayout directly. ThemeProvider handles all layout
                      logic internally.
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
