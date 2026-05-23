// ─── Prompt: theme-setup ─────────────────────────────────────────────────────

export function getThemeSetupPrompt(preset?: string, darkMode?: string): string {
  return `You are setting up the theme system for a @e-burgos/tucu-ui application.

${preset ? `PRESET: ${preset}` : 'PRESET: default (Blue)'}
${darkMode ? `DARK MODE: ${darkMode}` : 'DARK MODE: system'}

THEME SETUP PATTERN:
\`\`\`tsx
import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      showSettings          // Enables the settings drawer
      logo={{ name: 'My', secondName: 'App' }}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      menuItems={menuItems}
    />
  );
}
\`\`\`

AVAILABLE LAYOUTS:
- LAYOUT_OPTIONS.ADMIN — sidebar + header
- LAYOUT_OPTIONS.HORIZONTAL — top nav (default)
- LAYOUT_OPTIONS.CLEAN — no nav
- LAYOUT_OPTIONS.MACOS — macOS sidebar
- LAYOUT_OPTIONS.MACOS_TAHOE — macOS Tahoe style

PROGRAMMATIC THEME CONTROL:
\`\`\`tsx
import { useTheme, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

const { mode, setMode, setLayout, applyMacOSTheme, applyDefaultTheme, restoreDefaultColors } = useTheme();

// Toggle dark mode
setMode(mode === 'dark' ? 'light' : 'dark');

// Change layout at runtime
setLayout(LAYOUT_OPTIONS.ADMIN);

// Apply macOS theme (colors + layout)
applyMacOSTheme();

// Restore defaults
applyDefaultTheme();
restoreDefaultColors();
\`\`\`

COLOR PRESETS (34 total):
- Standard Light (11): Blue, Green, Orange, Red, Pink, Purple, Indigo, Teal, Yellow, Chartreuse, Gray
- Standard Dark (11): Dark Blue, Dark Green, Dark Orange, Dark Red, Dark Pink, Dark Purple, Dark Indigo, Dark Teal, Dark Yellow, Dark Chartreuse, Dark Gray
- macOS System (12): Applied automatically via applyMacOSTheme()

THEME VARIANTS:
- 'default' — Standard design system
- 'macos' — Apple-inspired with vibrancy

RULES:
- Always use semantic tokens (bg-primary, text-secondary, etc.)
- Never hardcode colors
- Use ThemeProvider at the root of your app
- showSettings enables the floating settings button

Generate the ThemeProvider configuration with the specified preset and dark mode settings.`;
}
