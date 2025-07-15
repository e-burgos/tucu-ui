import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Button,
  Badge,
  useTheme,
  CodeBlock,
} from 'tucu-ui';

export function ThemingGuide() {
  const { mode, preset, setMode } = useTheme();

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 dark:from-purple-900 dark:via-violet-900 dark:to-indigo-900 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/30 to-indigo-600/20 dark:from-purple-400/10 dark:via-violet-400/15 dark:to-indigo-400/10"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-400/25 to-violet-500/25 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-violet-400/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
          </div>

          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <LucideIcons.Paintbrush className="w-16 h-16 text-white filter drop-shadow-lg" />
              </div>
            </div>

            <Typography
              tag="h1"
              className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              Theming Guide
            </Typography>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 dark:text-white/80 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Master the powerful theming system built with Zustand, CSS custom
              properties, and Tailwind CSS. Create beautiful, consistent themes
              that adapt to your brand.
            </Typography>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-white/20 text-white border-white/30">
                Zustand State Management
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                CSS Custom Properties
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                Dark Mode Native
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Theme Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built on modern technologies for flexibility and performance
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Zustand State Management',
              description:
                'Centralized theme state with minimal boilerplate and excellent TypeScript support',
              color: 'from-yellow-500 via-amber-500 to-orange-500',
              features: ['Lightweight', 'TypeScript First', 'DevTools Support'],
            },
            {
              icon: (
                <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'CSS Custom Properties',
              description:
                'Dynamic brand colors using CSS variables for real-time theme updates',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
              features: ['Dynamic Colors', 'Alpha Support', 'No Rebuilds'],
            },
            {
              icon: (
                <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dark Mode Support',
              description:
                'Automatic dark/light mode switching with smooth transitions',
              color: 'from-purple-500 via-violet-500 to-indigo-500',
              features: ['Auto Detection', 'Smooth Transitions', 'System Sync'],
            },
          ].map((item, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {item.description}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Theme Configuration */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Theme Configuration" className="mt-2 mb-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg">
                      <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Available Options
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Mode', value: "'light' | 'dark'" },
                      { label: 'Direction', value: "'ltr' | 'rtl'" },
                      {
                        label: 'Layout',
                        value: "'classic' | 'minimal' | 'none'",
                      },
                      { label: 'Color Preset', value: '6 predefined colors' },
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <span className="font-medium">{option.label}</span>
                        <code className="text-sm text-gray-600 dark:text-gray-400">
                          {option.value}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg shadow-lg">
                      <LucideIcons.Palette className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Color Presets
                    </Typography>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'Green', color: '#009e60' },
                      { name: 'Blue', color: '#2a52be' },
                      { name: 'Purple', color: '#9370DB' },
                      { name: 'Orange', color: '#ffa500' },
                      { name: 'Red', color: '#e34234' },
                      { name: 'Black', color: '#323743' },
                    ].map((preset, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span className="text-sm font-medium">
                          {preset.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Using the Theme System */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Using the Theme System" className="mt-2 mb-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    ThemeProvider Setup
                  </Typography>
                </div>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider } from 'tucu-ui';

function App() {
  const menuItems = [
    {
      name: 'Home',
      href: '/',
      component: <HomePage />,
    },
    {
      name: 'About',
      href: '/about',
      component: <AboutPage />,
    },
  ];

  return (
    <ThemeProvider
      menuItems={menuItems}
      brandColor="Blue"
      showSettings={true}
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                    <LucideIcons.Zap className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    useTheme Hook
                  </Typography>
                </div>
                <CodeBlock
                  language="tsx"
                  code={`import { useTheme } from 'tucu-ui';

function ThemeControls() {
  const {
    mode,
    preset,
    direction,
    layout,
    setMode,
    setPreset,
    setDirection,
    setLayout,
  } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}`}
                />
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Color Customization */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Color Customization" className="mt-2 mb-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                      <LucideIcons.Palette className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Dynamic Brand Colors
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Brand colors are dynamically applied using CSS custom
                    properties, allowing real-time theme updates without
                    rebuilding.
                  </Typography>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Typography tag="code" className="text-sm">
                      --color-brand: {preset?.value || '#2a52be'}
                    </Typography>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                      <LucideIcons.Brush className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Tailwind Integration
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Seamlessly integrated with Tailwind CSS utilities for
                    consistent theming across all components.
                  </Typography>
                  <div className="space-y-2">
                    {[
                      'bg-brand',
                      'text-brand',
                      'border-brand',
                      'bg-primary',
                      'bg-secondary',
                    ].map((className, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-brand rounded border"></div>
                        <Typography tag="code" className="text-sm">
                          .{className}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Settings Panel */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Settings Panel" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
                  <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Built-in Settings UI
                </Typography>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    The theme system includes a built-in settings panel that
                    allows users to:
                  </Typography>
                  <ul className="space-y-2">
                    {[
                      'Toggle between light and dark modes',
                      'Switch between LTR and RTL text direction',
                      'Choose between Classic, Minimal, and None layouts',
                      'Select from 6 predefined brand colors',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <LucideIcons.Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <Typography tag="h5" className="font-medium">
                    Current Settings
                  </Typography>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium">Mode</span>
                      <Badge variant="outline">{mode}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium">Color Preset</span>
                      <Badge variant="outline">{preset?.label || 'Blue'}</Badge>
                    </div>
                    <Button
                      size="small"
                      onClick={() =>
                        setMode(mode === 'dark' ? 'light' : 'dark')
                      }
                      className="w-full"
                    >
                      Toggle Theme Mode
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Best Practices" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                      <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-green-600 dark:text-green-400"
                    >
                      Do's
                    </Typography>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Use the useTheme hook to access theme state',
                      'Utilize built-in color presets for consistency',
                      'Test your application in both light and dark modes',
                      'Use the settings panel for user customization',
                      'Leverage persistent storage for user preferences',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg shadow-lg">
                      <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-red-600 dark:text-red-400"
                    >
                      Don'ts
                    </Typography>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Directly manipulate CSS custom properties',
                      "Hardcode colors that don't adapt to themes",
                      'Override theme state without using setters',
                      'Ignore RTL support for international apps',
                      'Disable all settings without alternatives',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Advanced Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Advanced Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful features for complex theming scenarios
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <LucideIcons.Globe className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'RTL/LTR Support',
              description:
                'Full right-to-left language support with automatic layout adjustments',
              color: 'from-blue-500 via-indigo-500 to-purple-500',
            },
            {
              icon: (
                <LucideIcons.Save className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Persistent Settings',
              description:
                'Automatic localStorage integration for user preference persistence',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Custom Routes',
              description:
                'Advanced routing scenarios with custom route configuration',
              color: 'from-orange-500 via-red-500 to-pink-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
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
    </div>
  );
}
