// ─── Resource: Theme System ──────────────────────────────────────────────────

export function getThemeContent(): string {
  return `# Theme System — @e-burgos/tucu-ui

## useTheme Hook
Central hook for programmatic theme access. Powered by Zustand with persist middleware.

### State Properties
\`\`\`typescript
interface IThemeState {
  mode: 'light' | 'dark';
  colorScheme: 'default' | 'macos' | 'macos-tahoe';
  layout: LAYOUT_OPTIONS;
  direction: 'ltr' | 'rtl';
  lang: 'en' | 'es' | 'fr';
  primaryPreset: IThemeItem;
  darkPrimaryPreset: IThemeItem;
  secondaryPreset: IThemeItem;
  darkSecondaryPreset: IThemeItem;
  accentPreset: IThemeItem;
  darkAccentPreset: IThemeItem;
  mutedPreset: IThemeItem;
  darkMutedPreset: IThemeItem;
  darkBgPreset: IThemeItem;
  lightBgPreset: IThemeItem;
  lightDarkPreset: IThemeItem;
  darkLightDarkPreset: IThemeItem;
  logo: LogoType;
  showSettings: boolean;
  isSettingsOpen: boolean;
  backgroundVariant: 'none' | 'base' | 'sonoma' | 'wave' | 'wallpaper' | 'mobile' | 'radial' | 'window' | 'aurora' | 'depth' | 'demo';
  themeConfigs: Record<'default' | 'macos' | 'macos-tahoe', IThemeConfig>;
}

interface IThemeConfig {
  primaryPreset: IThemeItem;
  darkPrimaryPreset: IThemeItem;
  secondaryPreset: IThemeItem;
  darkSecondaryPreset: IThemeItem;
  accentPreset: IThemeItem;
  darkAccentPreset: IThemeItem;
  mutedPreset: IThemeItem;
  darkMutedPreset: IThemeItem;
  darkBgPreset: IThemeItem;
  lightBgPreset: IThemeItem;
  lightDarkPreset: IThemeItem;
  darkLightDarkPreset: IThemeItem;
  layout: LAYOUT_OPTIONS;
  mode: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
  backgroundVariant: BackgroundVariant;
}
\`\`\`

### Setters (auto-generated for every property except themeConfigs)
setMode, setLayout, setColorScheme, setDirection, setLang, setPrimaryPreset, setDarkPrimaryPreset, setSecondaryPreset, setBackgroundVariant, etc.

### Actions
| Method | Description |
|--------|-------------|
| restoreDefaultColors() | Resets configuration (presets, layout, mode, backgroundVariant) for the active colorScheme to their default values |
| applyMacOSTheme() | Switches colorScheme to 'macos' (loads its config) |
| applyMacOSTahoeTheme() | Switches colorScheme to 'macos-tahoe' (loads its config) |
| applyDefaultTheme() | Switches colorScheme to 'default' (loads its config) |
| applyThemeStyle(style) | Switches colorScheme to style (loads its config) |

### Theme Configuration State Sync
The store uses a Zustand middleware (\`themeConfigInterceptor\`) to intercept updates to configuration keys (presets, layout, mode, direction, backgroundVariant) and automatically synchronize/save them into \`themeConfigs[activeColorScheme]\`. When switching the \`colorScheme\` (e.g., via actions like \`applyMacOSTheme()\`), the stored configuration for the target theme is loaded automatically into the active state.

### Usage
\`\`\`tsx
import { useTheme, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

const ThemeControls = () => {
  const {
    mode, setMode,
    layout, setLayout,
    colorScheme, applyMacOSTheme, applyDefaultTheme,
    direction, setDirection,
    restoreDefaultColors,
  } = useTheme();

  return (
    <div className="flex gap-4">
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle Mode
      </button>
      <button onClick={() => setLayout(LAYOUT_OPTIONS.ADMIN)}>
        Admin Layout
      </button>
      <button onClick={colorScheme === 'macos' ? applyDefaultTheme : applyMacOSTheme}>
        Switch Theme
      </button>
      <button onClick={restoreDefaultColors}>Reset</button>
    </div>
  );
};
\`\`\`

## ThemeProvider Setup
\`\`\`tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      showSettings          // Enables settings drawer
      defaultTheme="system" // 'light' | 'dark' | 'system'
      logo={{ name: 'My', secondName: 'App' }}
      menuItems={menuItems}
    />
  );
}
\`\`\`

## Settings Components
| Component | Description |
|-----------|-------------|
| ThemeProvider | Entry point — wraps app with theme context |
| SettingsDrawer | Full settings panel (mode, preset, layout, direction) |
| SettingsButton | Floating gear button |
| SwitchMode | Inline light/dark toggle |
| LangSelector | Language dropdown (en, es, fr) |

## Theme Variants
| Variant | Description |
|---------|-------------|
| default | Standard design system |
| macos | Apple Sonoma-inspired with vibrancy, blur materials |
| macos-tahoe | Apple Tahoe-inspired with rounded corners, modern UI |

\`\`\`tsx
const { colorScheme } = useTheme(); // 'default' | 'macos' | 'macos-tahoe'
const { applyMacOSTheme } = useTheme();
applyMacOSTheme(); // applies colors + MACOS_TAHOE layout
\`\`\`

## Color Token Semantics
| Token | Light Mode Label | Dark Mode Label | Purpose |
|-------|-----------------|-----------------|---------|
| primary | Primary (Brand) Color | Dark Primary (Brand) Color | Main brand color |
| secondary | Auxiliary Background Color | Dark Auxiliary Background Color | Secondary backgrounds |
| accent | Secondary (Accent) Color | Dark Secondary (Accent) Color | Accent highlights |
| muted | Muted Color | Dark Muted Color | Muted/disabled elements |
| darkBg | — | Dark Primary Background Color | Dark mode main bg |
| lightBg | Light Primary Background Color | — | Light mode main bg |
| lightDark | Light Secondary Background Color | — | Light mode secondary bg |
| darkLightDark | — | Dark Secondary Background Color | Dark mode secondary bg |
`;
}
