import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, CodeBlock } from '../../../../index';

const UsingThemeSystemSection: React.FC = () => {
  return (
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
              code={`import { ThemeProvider, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function App() {
  const menuItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  ];

  return (
    <ThemeProvider
      // Layout Configuration
      layout={LAYOUT_OPTIONS.HORIZONTAL} // CLEAN | ADMIN | HORIZONTAL
      menuItems={menuItems}
      logo={{ path: '/', name: 'MyApp' }}

      // Color Configuration
      brandColor="Blue"              // Primary brand color preset
      customPaletteColor={{
        primary: '#0052ff',          // Hex color or preset name
        darkPrimary: '#578bfa',
        secondary: '#eef0f3',
        darkSecondary: '#282b31',
        accent: '#f7d21a',
        darkAccent: '#936000',
        muted: '#5b616e',
        darkMuted: '#8a919e',
        darkBg: '#0a0b0d',
        lightBg: '#ffffff',
        lightDark: '#f7f8f9',
        darkLightDark: '#141519',
      }}

      // Theme Settings
      mode="light"                   // 'light' | 'dark'
      showSettings={true}
      
      // Additional Features
      headerClassName="custom-header"
      contentClassName="custom-content"
      fullWidth={false}
      rightButton={<UserMenu />}
      className="custom-layout"
    >
      {/* Routes are automatically handled by ThemeProvider */}
      {/* Or provide customRoutes prop for custom routing */}
    </ThemeProvider>
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
              code={`import { useTheme, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function ThemeControls() {
  const {
    // State
    mode,
    layout,
    primaryPreset,
    darkPrimaryPreset,
    secondaryPreset,
    darkSecondaryPreset,
    accentPreset,
    darkAccentPreset,
    mutedPreset,
    darkMutedPreset,
    darkBgPreset,
    lightBgPreset,
    lightDarkPreset,
    darkLightDarkPreset,
    direction,
    logo,
    lang,
    isSettingsOpen,
    showSettings,

    // Setters
    setMode,
    setLayout,
    setPrimaryPreset,
    setDarkPrimaryPreset,
    setSecondaryPreset,
    setDarkSecondaryPreset,
    setAccentPreset,
    setDarkAccentPreset,
    setMutedPreset,
    setDarkMutedPreset,
    setDarkBgPreset,
    setLightBgPreset,
    setLightDarkPreset,
    setDarkLightDarkPreset,
    setDirection,
    setLogo,
    setLang,
    setIsSettingsOpen,
    setShowSettings,
    restoreDefaultColors,
  } = useTheme();

  return (
    <div>
      {/* Basic Controls */}
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <select
        value={layout}
        onChange={(e) => setLayout(e.target.value as LAYOUT_OPTIONS)}
      >
        <option value={LAYOUT_OPTIONS.CLEAN}>Clean</option>
        <option value={LAYOUT_OPTIONS.ADMIN}>Admin</option>
        <option value={LAYOUT_OPTIONS.HORIZONTAL}>Horizontal</option>
      </select>

      <select
        value={direction}
        onChange={(e) => setDirection(e.target.value as 'ltr' | 'rtl')}
      >
        <option value="ltr">LTR</option>
        <option value="rtl">RTL</option>
      </select>

      {/* Advanced Color Controls */}
      <button onClick={() => setPrimaryPreset({ label: 'Blue', value: '#105eff' })}>
        Set Primary Color
      </button>

      <button onClick={() => setSecondaryPreset({ label: 'DEFAULT_SECONDARY', value: '#eef0f3' })}>
        Set Secondary Color
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
  );
};

export default UsingThemeSystemSection;

