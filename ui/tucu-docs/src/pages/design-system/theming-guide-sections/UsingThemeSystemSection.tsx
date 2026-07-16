import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const UsingThemeSystemSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Using the Theme System"
        description="Setup examples for ThemeProvider and the useTheme hook — everything you need to integrate theming in your application."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            ThemeProvider Setup
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Wrap your application with ThemeProvider to enable theming
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Basic Configuration">
            <CodeBlock
              language="tsx"
              code={`import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

function App() {
  const menuItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  ];

  return (
    <ThemeProvider
      // Theme Style (constrains available layouts)
      themeStyle="default" // 'default' | 'macos' | 'macos-tahoe'

      // Layout Configuration
      layout={LAYOUT_OPTIONS.HORIZONTAL} // CLEAN | ADMIN | HORIZONTAL
      menuItems={menuItems}
      logo={{ path: '/', name: 'MyApp' }}

      // Color Configuration
      brandColor="Blue"
      customPaletteColor={{
        primary: '#0052ff',
        darkPrimary: '#578bfa',
        secondary: '#f3f4f6',
        darkSecondary: '#172131',
        accent: '#f7d21a',
        darkAccent: '#936000',
        muted: '#4a5565',
        darkMuted: '#828a99',
        darkBg: '#030712',
        lightBg: '#ffffff',
        lightDark: '#f9fafb',
        darkLightDark: '#0a101d',
      }}

      // Theme Settings
      mode="dark"                    // 'light' | 'dark' (default: 'dark')
      showSettings={true}

      // Additional Features
      headerClassName="custom-header"
      contentClassName="custom-content"
      fullWidth={false}
      rightButton={<UserMenu />}
    >
      {/* Routes handled automatically by ThemeProvider */}
    </ThemeProvider>
  );
}`}
            />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            useTheme Hook Usage
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Access and control theme state from any component
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Theme Controls Example">
            <CodeBlock
              language="tsx"
              code={`import { useTheme, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

function ThemeControls() {
  const {
    // State
    mode, layout, direction, colorScheme,
    primaryPreset, secondaryPreset, accentPreset,
    isSettingsOpen,

    // Setters
    setMode, setLayout, setDirection,
    setPrimaryPreset, setSecondaryPreset,
    setIsSettingsOpen,

    // Actions
    restoreDefaultColors,
    applyMacOSTheme,
    applyMacOSTahoeTheme,
    applyThemeStyle,
  } = useTheme();

  return (
    <div>
      {/* Mode Toggle */}
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {/* Layout (only valid options for current theme style) */}
      <select
        value={layout}
        onChange={(e) => setLayout(e.target.value as LAYOUT_OPTIONS)}
      >
        <option value={LAYOUT_OPTIONS.CLEAN}>Clean</option>
        <option value={LAYOUT_OPTIONS.ADMIN}>Admin</option>
        <option value={LAYOUT_OPTIONS.HORIZONTAL}>Horizontal</option>
      </select>

      {/* Theme Style Actions */}
      <button onClick={applyMacOSTheme}>Apply macOS Sonoma</button>
      <button onClick={applyMacOSTahoeTheme}>Apply macOS Tahoe</button>
      <button onClick={() => applyThemeStyle('default')}>Reset to Default</button>

      {/* Color Controls */}
      <button onClick={() => setPrimaryPreset({ label: 'Blue', value: '#105eff' })}>
        Set Primary: Blue
      </button>

      {/* Settings Panel */}
      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        {isSettingsOpen ? 'Close' : 'Open'} Settings
      </button>

      {/* Restore Defaults */}
      <button onClick={restoreDefaultColors}>Restore Default Colors</button>
    </div>
  );
}`}
            />
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default UsingThemeSystemSection;
