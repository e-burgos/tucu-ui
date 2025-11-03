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
import HeroPage from '../components/HeroPage';

export function ThemingGuide() {
  const { mode, preset, setMode, setIsSettingsOpen, isSettingsOpen } =
    useTheme();

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Theming Guide"
        description="Master the powerful theming system built with Zustand, CSS custom properties, and Tailwind CSS. Create beautiful, consistent themes that adapt to your brand."
        githubButton
        getStartedButton
        docsButton="theming-guide"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Paintbrush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
                      { label: 'Brand Color', value: '26+ predefined colors' },
                      {
                        label: 'Secondary Color',
                        value: '26+ predefined colors',
                      },
                      { label: 'Accent Color', value: '26+ predefined colors' },
                      { label: 'Dark Color', value: 'Theme base colors' },
                      { label: 'Light Color', value: 'Theme base colors' },
                      {
                        label: 'Disabled Settings',
                        value: 'Partial control options',
                      },
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                    {[
                      { name: 'Green', color: '#009e60' },
                      { name: 'Black', color: '#323743' },
                      { name: 'Blue', color: '#2a52be' },
                      { name: 'Red', color: '#e34234' },
                      { name: 'Purple', color: '#9370DB' },
                      { name: 'Orange', color: '#ffa500' },
                      { name: 'Rose', color: '#ff1493' },
                      { name: 'Pink', color: '#ffc0cb' },
                      { name: 'Yellow', color: '#ffff00' },
                      { name: 'Lime', color: '#00ff00' },
                      { name: 'Teal', color: '#008080' },
                      { name: 'Cyan', color: '#00ffff' },
                      { name: 'Navy', color: '#000080' },
                      { name: 'Maroon', color: '#800000' },
                      { name: 'Brown', color: '#a52a2a' },
                      { name: 'Gray', color: '#808080' },
                      { name: 'Silver', color: '#c0c0c0' },
                      { name: 'Gold', color: '#ffd700' },
                      { name: 'Coral', color: '#ff7f50' },
                      { name: 'Salmon', color: '#fa8072' },
                      { name: 'Chocolate', color: '#d2691e' },
                      { name: 'Tan', color: '#d2b48c' },
                      { name: 'Beige', color: '#f5f5dc' },
                      { name: 'Mint', color: '#98ff98' },
                      { name: 'Lavender', color: '#e6e6fa' },
                      { name: 'Violet', color: '#ee82ee' },
                      { name: 'Bufus', color: '#00D6F2' },
                      { name: 'BufusBlue', color: '#0184BF' },
                      { name: 'BufusDark', color: '#273240' },
                      { name: 'BufusAccent', color: '#F26522' },
                      { name: 'ThemeLight', color: '#fcfcfc' },
                      { name: 'ThemeDark', color: '#0d1321' },
                    ].map((preset, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span className="text-xs font-medium truncate">
                          {preset.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-500 dark:text-gray-400 mt-2"
                  >
                    31 total color presets available
                  </Typography>
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
      // Layout Configuration
      layout="minimal" // 'classic' | 'minimal' | 'none'
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}

      // Color Configuration
      brandColor="BufusBlue"        // Primary brand color
      secondaryColor="Bufus"        // Secondary color for accents
      accentColor="BufusAccent"     // Accent color for highlights
      darkColor="ThemeDark"         // Dark theme base color
      lightColor="ThemeLight"       // Light theme base color

      // Theme Settings
      showSettings={true}
      settingActions={{
        disabledMode: false,
        disabledLayout: false,
        disabledDirection: false,
        disabledPreset: false,
        disabledSecondary: false,
        disabledAccent: false,
        disabledDark: false,
        disabledLight: false,
      }}

      // Additional Features
      rightButton={<UserMenu />}
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
    // State
    mode,
    preset,
    secondaryPreset,
    accentPreset,
    darkPreset,
    lightPreset,
    direction,
    layout,
    logo,
    isSettingsOpen,
    showSettings,
    settingActions,

    // Setters
    setMode,
    setPreset,
    setSecondaryPreset,
    setAccentPreset,
    setDarkPreset,
    setLightPreset,
    setDirection,
    setLayout,
    setLogo,
    setIsSettingsOpen,
    setShowSettings,
    setSettingActions,
    restoreDefaultColors,
  } = useTheme();

  return (
    <div>
      {/* Basic Controls */}
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>

      <button onClick={() => setLayout('minimal')}>
        Switch to Minimal Layout
      </button>

      {/* Advanced Color Controls */}
      <button onClick={() => setSecondaryPreset({ label: 'Bufus', value: '#00D6F2' })}>
        Set Secondary Color
      </button>

      <button onClick={() => setAccentPreset({ label: 'BufusAccent', value: '#F26522' })}>
        Set Accent Color
      </button>

      {/* Settings Panel Control */}
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        {isSettingsOpen ? 'Close' : 'Open'} Settings
      </button>

      {/* Restore Defaults */}
      <button onClick={restoreDefaultColors}>
        Restore Default Colors
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
                    <Typography
                      tag="code"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
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
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'bg-brand',
                      'text-brand',
                      'border-brand',
                      'bg-secondary',
                      'text-secondary',
                      'border-secondary',
                      'bg-accent',
                      'text-accent',
                      'border-accent',
                      'bg-primary',
                      'text-primary',
                      'border-primary',
                      'bg-dark',
                      'text-dark',
                      'border-dark',
                      'bg-light',
                      'text-light',
                      'border-light',
                      'bg-brand/50',
                      'text-brand/80',
                      'border-brand/30',
                      'bg-secondary/20',
                      'text-secondary/60',
                      'border-secondary/40',
                    ].map((className, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded border border-gray-300 dark:border-gray-600 ${
                            className.includes('bg-') ? className : 'bg-brand'
                          }`}
                        ></div>
                        <Typography
                          tag="code"
                          className="text-xs text-gray-600 dark:text-gray-400"
                        >
                          .{className}
                        </Typography>
                      </div>
                    ))}
                  </div>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-500 dark:text-gray-400 mt-2"
                  >
                    All colors support opacity modifiers (/10, /20, /30, /50,
                    /80, etc.)
                  </Typography>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography tag="h5" className="font-medium mb-2">
                        Core Settings
                      </Typography>
                      <ul className="space-y-1">
                        {[
                          'Toggle between light and dark modes',
                          'Switch between LTR and RTL text direction',
                          'Choose between Classic, Minimal, and None layouts',
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <LucideIcons.Check className="w-3 h-3 text-green-500" />
                            <span className="text-xs">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Typography tag="h5" className="font-medium mb-2">
                        Color Management
                      </Typography>
                      <ul className="space-y-1">
                        {[
                          'Select from 31 predefined brand colors',
                          'Configure secondary and accent colors',
                          'Customize dark and light theme colors',
                          'Partial settings control (enable/disable options)',
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <LucideIcons.Check className="w-3 h-3 text-green-500" />
                            <span className="text-xs">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography tag="h5" className="font-medium">
                    Current Settings
                  </Typography>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Mode</span>
                        <Badge variant="outline" className="text-xs">
                          {mode}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Layout</span>
                        <Badge variant="outline" className="text-xs">
                          {preset?.label || 'Minimal'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Brand</span>
                        <Badge variant="outline" className="text-xs">
                          {preset?.label || 'BufusBlue'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Secondary</span>
                        <Badge variant="outline" className="text-xs">
                          Bufus
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Accent</span>
                        <Badge variant="outline" className="text-xs">
                          BufusAccent
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Direction</span>
                        <Badge variant="outline" className="text-xs">
                          LTR
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="small"
                        onClick={() =>
                          setMode(mode === 'dark' ? 'light' : 'dark')
                        }
                        className="flex-1"
                      >
                        Toggle {mode === 'dark' ? 'Light' : 'Dark'}
                      </Button>
                      <Button
                        size="small"
                        variant="ghost"
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="flex-1"
                      >
                        {isSettingsOpen ? 'Close' : 'Open'} Settings
                      </Button>
                    </div>
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

      {/* Advanced Color System */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Advanced Color System
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Multi-layered color architecture with dynamic theming capabilities
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardContainer>
            <CardTitle title="Color Layers" className="mt-2 mb-6">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  The theming system supports multiple color layers for
                  comprehensive theming:
                </Typography>

                <div className="space-y-3">
                  {[
                    {
                      layer: 'Brand',
                      description: 'Primary brand identity color',
                      variable: '--color-brand',
                      default: '#0184BF (BufusBlue)',
                    },
                    {
                      layer: 'Secondary',
                      description: 'Supporting color for accents',
                      variable: '--color-secondary',
                      default: '#00D6F2 (Bufus)',
                    },
                    {
                      layer: 'Accent',
                      description: 'Highlight color for actions',
                      variable: '--color-accent',
                      default: '#F26522 (BufusAccent)',
                    },
                    {
                      layer: 'Dark',
                      description: 'Dark theme base color',
                      variable: '--color-dark',
                      default: '#0d1321 (ThemeDark)',
                    },
                    {
                      layer: 'Light',
                      description: 'Light theme base color',
                      variable: '--color-light',
                      default: '#fcfcfc (ThemeLight)',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Typography tag="h5" className="font-semibold text-sm">
                          {item.layer}
                        </Typography>
                        <Typography
                          tag="code"
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {item.variable}
                        </Typography>
                      </div>
                      <Typography
                        tag="p"
                        className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-500"
                      >
                        Default: {item.default}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle
              title="Dynamic Color Mixing"
              className="mt-2 mb-6 h-full"
            >
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Advanced color manipulation using CSS color-mix() for
                  automatic variations:
                </Typography>

                <CodeBlock
                  language="css"
                  expanded={false}
                  code={`/* Automatic color variations */
--color-muted: color-mix(in oklab, var(--color-brand) 50%, transparent);
--color-primary: var(--color-brand);
--color-success: var(--color-emerald-500);
--color-warning: var(--color-orange-500);
--color-error: var(--color-red-500);
--color-info: var(--color-blue-500);

/* Opacity support */
.bg-brand\\/50    /* 50% opacity */
.text-brand\\/80  /* 80% opacity */
.border-brand\\/30 /* 30% opacity */`}
                />
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Settings Control */}
      <section className="space-y-8 flex flex-col justify-between h-full">
        <CardContainer>
          <CardTitle title="Granular Settings Control" className="mt-2 mb-6">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Fine-tune user customization options with granular control over
                which settings are available:
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-full overflow-y-auto">
                <div className="space-y-4 max-h-full overflow-y-hidden">
                  <Typography tag="h5" className="font-semibold">
                    Setting Actions Configuration
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`<ThemeProvider
  settingActions={{
    disabledMode: false,        // Enable/disable mode toggle
    disabledLayout: false,      // Enable/disable layout selection
    disabledDirection: false,   // Enable/disable RTL/LTR
    disabledPreset: false,      // Enable/disable brand color
    disabledSecondary: false,   // Enable/disable secondary color
    disabledAccent: false,      // Enable/disable accent color
    disabledDark: false,        // Enable/disable dark theme color
    disabledLight: false,       // Enable/disable light theme color
  }}
/>`}
                  />
                </div>

                <div className="space-y-4">
                  <Typography tag="h5" className="font-semibold">
                    Use Cases
                  </Typography>
                  <div className="space-y-3">
                    {[
                      {
                        title: 'Brand Lock',
                        description:
                          'Disable color changes to maintain brand consistency',
                        config: 'disabledPreset: true, disabledSecondary: true',
                      },
                      {
                        title: 'Layout Only',
                        description: 'Allow only layout and mode changes',
                        config: 'disabledDirection: true, disabledAccent: true',
                      },
                      {
                        title: 'Minimal Control',
                        description: 'Basic theme switching only',
                        config: 'disabledLayout: true, disabledDirection: true',
                      },
                    ].map((useCase, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Typography
                          tag="h4"
                          className="font-medium text-sm mb-1"
                        >
                          {useCase.title}
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-xs text-gray-600 dark:text-gray-400 mb-2"
                        >
                          {useCase.description}
                        </Typography>
                        <Typography
                          tag="code"
                          className="text-xs text-gray-500 dark:text-gray-500"
                        >
                          {useCase.config}
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
