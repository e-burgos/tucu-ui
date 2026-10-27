// ─── Prompt: theme-setup ─────────────────────────────────────────────────────

export function getThemeSetupPrompt(
  preset?: string,
  darkMode?: string,
  framework?: string
): string {
  if (framework === 'next') {
    return getNextThemeSetupPrompt(preset, darkMode);
  }
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
- 'macos' — Apple-inspired with vibrancy (Sonoma)
- 'macos-tahoe' — Apple-inspired with rounded corners (Tahoe)

RULES:
- Always use semantic tokens (bg-primary, text-secondary, etc.)
- Never hardcode colors
- Use ThemeProvider at the root of your app
- showSettings enables the floating settings button

Generate the ThemeProvider configuration with the specified preset and dark mode settings.`;
}

function getNextThemeSetupPrompt(preset?: string, darkMode?: string): string {
  return `You are setting up the theme system for a @e-burgos/tucu-ui application running on Next.js 16 (App Router).

FRAMEWORK: next
${preset ? `PRESET: ${preset}` : 'PRESET: default (Blue)'}
${darkMode ? `DARK MODE: ${darkMode}` : 'DARK MODE: system'}

SETUP (app/layout.tsx, Server Component):
\`\`\`tsx
import './globals.css';
import { LucideIcons, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { NextThemeProvider } from '@e-burgos/tucu-ui/next';

const menuItems = [
  { name: 'Home', path: '/', icon: <LucideIcons.Home /> },
  { name: 'Users', path: '/users', icon: <LucideIcons.Users /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider
          showSettings
          logo={{ name: 'My', secondName: 'App' }}
          layout={LAYOUT_OPTIONS.HORIZONTAL}
          menuItems={menuItems}
        >
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

TAILWIND V4 (app/globals.css):
\`\`\`css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui';
\`\`\`

INSTALL: pnpm add @e-burgos/tucu-ui next@^16 react react-dom tailwindcss @tailwindcss/postcss (peer next >=16)

RULES:
- Use NextThemeProvider from '@e-burgos/tucu-ui/next', never ThemeProvider, BrowserRouter or the ReactRouter namespace
- Routes are the app/ directory; menuItems only drives the navigation UI (name, path, icon)
- Navigation hooks come from next/navigation; links go through next/link automatically inside tucu-ui components
- Every tucu-ui module ships with 'use client'. Functions (callbacks, DataTable cells, formatters) cannot be passed from a Server Component: put them in a client file of your app
- If the provider props include functions, wrap NextThemeProvider in a 'use client' providers.tsx and render that from the layout
- useTheme() (setMode, setLayout, applyMacOSTheme, applyDefaultTheme, restoreDefaultColors) works only in client components
- Always use semantic tokens (bg-primary, text-secondary, etc.), never hardcode colors
- Static export (output: 'export') is supported

AVAILABLE LAYOUTS: LAYOUT_OPTIONS.ADMIN, HORIZONTAL (default), CLEAN, MACOS, MACOS_TAHOE

Generate the app/layout.tsx and globals.css configuration with the specified preset and dark mode settings.`;
}
