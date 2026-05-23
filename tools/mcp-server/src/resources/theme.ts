// ─── Resource: Theme System ──────────────────────────────────────────────────

export function getThemeContent(): string {
  return `# Theme System — @e-burgos/tucu-ui

## useTheme Hook
Central hook for programmatic theme access. Powered by Zustand with persist middleware.

### State Properties
\`\`\`typescript
interface IThemeState {
  mode: 'light' | 'dark';
  colorScheme: 'default' | 'macos';
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
}
\`\`\`

### Setters (auto-generated for every property)
setMode, setLayout, setColorScheme, setDirection, setLang, setPrimaryPreset, setDarkPrimaryPreset, setSecondaryPreset, etc.

### Actions
| Method | Description |
|--------|-------------|
| restoreDefaultColors() | Resets all presets, direction, layout, and mode |
| applyMacOSTheme() | Applies macOS system colors + sets colorScheme: 'macos' + MACOS_TAHOE layout |
| applyDefaultTheme() | Restores standard presets + sets colorScheme: 'default' + default layout |

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
| macos | Apple-inspired with vibrancy, blur materials |

\`\`\`tsx
const { colorScheme } = useTheme(); // 'default' | 'macos'
const { applyMacOSTheme } = useTheme();
applyMacOSTheme(); // applies colors + MACOS_TAHOE layout
\`\`\`
`;
}
