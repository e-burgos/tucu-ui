import {
  Button,
  CardContainer,
  Typography,
  CodeBlock,
  useAnchorScroll,
} from '../../../../index';

export const ThemingGuideIntroduction = () => {
  useAnchorScroll();

  return (
    <div className="max-w-6xl mx-auto p-[16px] pb-[64px] scroll-smooth">
      <CardContainer className="p-[24px] mb-[24px]">
        <Typography tag="h1" className="mb-[16px]">
          Theme System Documentation
        </Typography>
        <Typography tag="body" className="mb-[24px] text-muted">
          Complete guide to the Tucu UI Design System theme configuration and
          usage.
        </Typography>

        {/* Table of Contents */}
        <div className="mb-[32px] p-[16px] bg-light-dark rounded-lg">
          <Typography tag="headline" className="mb-[12px]">
            Table of Contents
          </Typography>
          <ul className="list-disc list-inside space-y-[8px] text-body">
            <li>
              <a href="#introduction" className="text-brand hover:underline">
                Introduction
              </a>
            </li>
            <li>
              <a href="#tailwind-config" className="text-brand hover:underline">
                Tailwind CSS Configuration
              </a>
            </li>
            <li>
              <a href="#theme-provider" className="text-brand hover:underline">
                ThemeProvider Component
              </a>
            </li>
            <li>
              <a href="#hooks" className="text-brand hover:underline">
                Theme Hooks
              </a>
            </li>
            <li>
              <a href="#color-config" className="text-brand hover:underline">
                Color Configuration
              </a>
            </li>
            <li>
              <a href="#examples" className="text-brand hover:underline">
                Usage Examples
              </a>
            </li>
          </ul>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            1. Introduction
          </Typography>
          <Typography tag="body" className="mb-[16px]">
            The Tucu UI Design System uses a comprehensive theme system built on
            top of Tailwind CSS v4 and Tucu UI Design Tokens. The theme system
            provides:
          </Typography>
          <ul className="list-disc list-inside space-y-[8px] mb-[16px] ml-[16px]">
            <li>Light and Dark mode support</li>
            <li>Customizable color palettes</li>
            <li>Multiple layout options (Clean, Admin, Horizontal)</li>
            <li>RTL/LTR direction support</li>
            <li>Persistent theme settings via localStorage</li>
            <li>Dynamic CSS variable injection</li>
          </ul>
          <Typography tag="body" className="mb-[16px]">
            The theme system is located in{' '}
            <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
              ui/tucu-ui/src/themes
            </code>
            , and the Tailwind configuration is in{' '}
            <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
              ui/tucu-ui/src/assets/css/globals.css
            </code>
            .
          </Typography>
        </section>

        {/* Tailwind Configuration */}
        <section id="tailwind-config" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            2. Tailwind CSS Configuration
          </Typography>
          <Typography tag="body" className="mb-[16px]">
            The Tailwind CSS configuration is defined in{' '}
            <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
              ui/tucu-ui/src/assets/css/globals.css
            </code>
            . This file contains:
          </Typography>

          <div className="mb-[16px]">
            <Typography tag="headline" className="mb-[12px]">
              2.1 Design Tokens
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The system uses Tucu UI Design Tokens organized into color
              spectrums:
            </Typography>
            <ul className="list-disc list-inside space-y-[8px] mb-[16px] ml-[16px]">
              <li>
                <strong>Color Spectrums:</strong> Blue, Green, Orange, Gray,
                Indigo, Pink, Purple, Red, Teal, Yellow, Chartreuse
              </li>
              <li>
                <strong>Color Scale:</strong> Each spectrum has values from
                0-100 (e.g., blue-0 to blue-100)
              </li>
              <li>
                <strong>Light & Dark Variants:</strong> Separate color sets for
                light and dark modes
              </li>
            </ul>
          </div>

          <div className="mb-[16px]">
            <Typography tag="headline" className="mb-[12px]">
              2.2 Semantic Colors
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              Semantic colors map design tokens to functional purposes:
            </Typography>
            <CodeBlock
              language="css"
              code={`/* Semantic Background Colors */
--color-semantic-bg-primary: var(--color-tucu-ui-blue-60);
--color-semantic-bg-secondary: var(--color-tucu-ui-gray-10);
--color-semantic-bg-positive: var(--color-tucu-ui-green-60);
--color-semantic-bg-negative: var(--color-tucu-ui-red-60);

/* Semantic Foreground Colors */
--color-semantic-fg: var(--color-tucu-ui-gray-100);
--color-semantic-fg-muted: var(--color-tucu-ui-gray-60);
--color-semantic-fg-primary: var(--color-tucu-ui-blue-60);`}
            />
          </div>

          <div className="mb-[16px]">
            <Typography tag="headline" className="mb-[12px]">
              2.3 Spacing Scale
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The spacing scale is mapped to Tucu UI Design Tokens. All spacing
              values use arbitrary values in pixels to maintain consistency:
            </Typography>
            <CodeBlock
              language="css"
              code={`/* Spacing Scale - Mapped to Tucu UI Design Tokens */
--spacing-0: 0px;
--spacing-1: 8px;    /* --spacing-tucu-ui-1 */
--spacing-2: 16px;   /* --spacing-tucu-ui-2 */
--spacing-3: 24px;   /* --spacing-tucu-ui-3 */
--spacing-4: 32px;   /* --spacing-tucu-ui-4 */
--spacing-5: 40px;   /* --spacing-tucu-ui-5 */
--spacing-6: 48px;   /* --spacing-tucu-ui-6 */
--spacing-8: 64px;   /* --spacing-tucu-ui-8 */
--spacing-10: 80px;  /* --spacing-tucu-ui-10 */`}
            />
            <Typography tag="body" className="mt-[12px] text-muted">
              <strong>Note:</strong> Components use arbitrary values like{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                p-[16px]
              </code>{' '}
              instead of{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                p-4
              </code>{' '}
              to maintain original Tailwind spacing values.
            </Typography>
          </div>
        </section>

        {/* ThemeProvider */}
        <section id="theme-provider" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            3. ThemeProvider Component
          </Typography>
          <Typography tag="body" className="mb-[16px]">
            The{' '}
            <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
              ThemeProvider
            </code>{' '}
            is the root component that wraps your application and manages all
            theme state.
          </Typography>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              3.1 Basic Usage
            </Typography>
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
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      menuItems={menuItems}
      mode="light"
      showSettings={true}
    >
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              3.2 ThemeProvider Props
            </Typography>
            <div className="overflow-x-auto -mx-[16px] px-[16px] sm:mx-0 sm:px-0">
              <table className="min-w-max border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 p-[12px] text-left">
                      Prop
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 p-[12px] text-left">
                      Type
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 p-[12px] text-left">
                      Default
                    </th>
                    <th className="border border-gray-300 dark:border-gray-700 p-[12px] text-left">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>menuItems</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>IMenuItem[]</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Required
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Navigation menu items
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>layout</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>LAYOUT_OPTIONS</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>HORIZONTAL</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Layout type: CLEAN, ADMIN, or HORIZONTAL
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>mode</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>'light' | 'dark'</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>'light'</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Color mode
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>showSettings</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>false</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Show theme settings drawer button
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>customPaletteColor</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>object</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Custom color palette (see Color Configuration)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>logo</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>LogoType</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>{`{ path: '/', name: '' }`}</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Logo configuration object with path and name
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>brandColor</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>PresetColorType</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Brand color preset
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>headerClassName</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Custom CSS classes for header
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>contentClassName</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Custom CSS classes for content area
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>fullWidth</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>false</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Enable full width layout
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>rightButton</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>ReactNode</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Custom button component for header right area
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>className</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      <code>string</code>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      -
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-[12px]">
                      Custom CSS classes for root layout
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Hooks */}
        <section id="hooks" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            4. Theme Hooks
          </Typography>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              4.1 useTheme Hook
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                useTheme
              </code>{' '}
              hook provides access to all theme state and setters. It uses
              Zustand for state management with localStorage persistence.
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { useTheme } from '@ui/tucu-ui';

function MyComponent() {
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
      <p>Current mode: {mode}</p>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Mode
      </button>
    </div>
  );
}`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              4.2 useThemeColor Hook
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                useThemeColor
              </code>{' '}
              hook dynamically injects CSS variables into the document root
              based on theme color presets.
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                useThemeColor
              </code>{' '}
              hook is used internally by the theme system to dynamically inject
              CSS variables into the document root based on theme color presets.
              It's automatically called by the theme provider and settings
              components.
            </Typography>
            <CodeBlock
              language="tsx"
              code={`// This hook is automatically used by ThemeWrapper
// It updates CSS variables like:
// --color-semantic-bg-primary
// --color-semantic-dark-bg-primary
// --color-semantic-bg-secondary
// --color-semantic-dark-bg-secondary
// --color-semantic-accent-bold-yellow
// --color-semantic-dark-accent-bold-yellow
// --color-semantic-fg-muted
// --color-semantic-dark-fg-muted
// --color-semantic-bg
// --color-semantic-dark-bg
// --color-semantic-bg-secondary-wash
// --color-semantic-dark-bg-secondary-wash`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              4.3 useDirection Hook
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                useDirection
              </code>{' '}
              hook sets the document direction for RTL/LTR support.
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { useDirection } from '@ui/tucu-ui';

function MyComponent() {
  useDirection('rtl'); // or 'ltr'
  // Sets document.documentElement.dir = 'rtl'
}`}
            />
          </div>
        </section>

        {/* Color Configuration */}
        <section id="color-config" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            5. Color Configuration
          </Typography>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              5.1 Color Presets
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              Colors are defined in{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                ui/tucu-ui/src/themes/config/index.ts
              </code>
              . All spectrum colors use the{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                -50
              </code>{' '}
              value from Tucu UI Design Tokens:
            </Typography>
            <CodeBlock
              language="typescript"
              code={`export enum PRESET_COLORS {
  // Default colors (semantic)
  DEFAULT_PRIMARY = '#0052ff',        // --color-tucu-ui-blue-60 (light mode)
  DEFAULT_DARK_PRIMARY = '#578bfa',   // --color-tucu-ui-dark-blue-70 (dark mode)
  DEFAULT_SECONDARY = '#eef0f3',      // --color-tucu-ui-gray-10 (light mode)
  DEFAULT_DARK_SECONDARY = '#282b31', // --color-tucu-ui-dark-gray-15 (dark mode)
  DEFAULT_ACCENT = '#f7d21a',         // --color-tucu-ui-yellow-30 (light mode)
  DEFAULT_DARK_ACCENT = '#936000',    // --color-tucu-ui-dark-yellow-30 (dark mode)
  DEFAULT_MUTED = '#5b616e',         // --color-tucu-ui-gray-60 (light mode)
  DEFAULT_DARK_MUTED = '#8a919e',    // --color-tucu-ui-dark-gray-60 (dark mode)
  DEFAULT_LIGHT_BG = '#ffffff',       // --color-tucu-ui-gray-0 (light mode)
  DEFAULT_DARK_BG = '#0a0b0d',        // --color-tucu-ui-dark-gray-0 (dark mode)
  DEFAULT_LIGHT_DARK = '#f7f8f9',     // --color-tucu-ui-gray-5 (light mode)
  DEFAULT_DARK_LIGHT_DARK = '#141519', // --color-tucu-ui-dark-gray-5 (dark mode)
  
  // Spectrum colors (all use -50 values)
  BLUE = '#105eff',                   // --color-tucu-ui-blue-50
  DARK_BLUE = '#2162ee',              // --color-tucu-ui-dark-blue-50
  GREEN = '#129961',                  // --color-tucu-ui-green-50
  DARK_GREEN = '#159962',             // --color-tucu-ui-dark-green-50
  ORANGE = '#e1591b',                 // --color-tucu-ui-orange-50
  DARK_ORANGE = '#e66020',            // --color-tucu-ui-dark-orange-50
  GRAY = '#717886',                   // --color-tucu-ui-gray-50
  DARK_GRAY = '#727886',              // --color-tucu-ui-dark-gray-50
  INDIGO = '#596ff2',                 // --color-tucu-ui-indigo-50
  DARK_INDIGO = '#5c71ee',            // --color-tucu-ui-dark-indigo-50
  PINK = '#cb51bb',                   // --color-tucu-ui-pink-50
  DARK_PINK = '#d058c1',              // --color-tucu-ui-dark-pink-50
  PURPLE = '#9d6bf2',                 // --color-tucu-ui-purple-50
  DARK_PURPLE = '#bc7bfb',            // --color-tucu-ui-dark-purple-50
  RED = '#e13947',                    // --color-tucu-ui-red-50
  DARK_RED = '#e6404e',               // --color-tucu-ui-dark-red-50
  TEAL = '#0093cb',                   // --color-tucu-ui-teal-50
  DARK_TEAL = '#0095cd',              // --color-tucu-ui-dark-teal-50
  YELLOW = '#cf9700',                 // --color-tucu-ui-yellow-50
  DARK_YELLOW = '#c79e00',            // --color-tucu-ui-dark-yellow-50
  CHARTREUSE = '#56b340',             // --color-tucu-ui-chartreuse-50
  DARK_CHARTREUSE = '#7bc869',        // --color-tucu-ui-dark-chartreuse-50
}`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              5.2 Custom Color Palette
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              You can provide custom colors via the{' '}
              <code className="px-[4px] py-[2px] bg-light-dark rounded text-sm">
                customPaletteColor
              </code>{' '}
              prop:
            </Typography>
            <CodeBlock
              language="tsx"
              code={`<ThemeProvider
  menuItems={menuItems}
  customPaletteColor={{
    primary: '#0052ff',           // Hex color or preset name
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
>
  {/* Your app */}
</ThemeProvider>`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              5.3 Available Color Presets
            </Typography>
            <Typography tag="body" className="mb-[12px]">
              The following color presets are available:
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[12px] mb-[16px]">
              {[
                'DEFAULT_PRIMARY',
                'DEFAULT_DARK_PRIMARY',
                'DEFAULT_SECONDARY',
                'DEFAULT_DARK_SECONDARY',
                'DEFAULT_ACCENT',
                'DEFAULT_DARK_ACCENT',
                'DEFAULT_MUTED',
                'DEFAULT_DARK_MUTED',
                'DEFAULT_LIGHT_BG',
                'DEFAULT_DARK_BG',
                'DEFAULT_LIGHT_DARK',
                'DEFAULT_DARK_LIGHT_DARK',
                'BLUE',
                'DARK_BLUE',
                'GREEN',
                'DARK_GREEN',
                'ORANGE',
                'DARK_ORANGE',
                'GRAY',
                'DARK_GRAY',
                'INDIGO',
                'DARK_INDIGO',
                'PINK',
                'DARK_PINK',
                'PURPLE',
                'DARK_PURPLE',
                'RED',
                'DARK_RED',
                'TEAL',
                'DARK_TEAL',
                'YELLOW',
                'DARK_YELLOW',
                'CHARTREUSE',
                'DARK_CHARTREUSE',
              ].map((color) => (
                <div
                  key={color}
                  className="p-[8px] bg-light-dark rounded text-sm"
                >
                  {color}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-[48px] scroll-mt-[120px]">
          <Typography tag="h2" className="mb-[16px]">
            6. Usage Examples
          </Typography>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              6.1 Basic Setup
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { ThemeProvider, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function App() {
  const menuItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'About', path: '/about', icon: AboutIcon },
  ];

  return (
    <ThemeProvider
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      menuItems={menuItems}
      mode="light"
      showSettings={true}
    >
      {/* Routes are automatically handled by ThemeProvider */}
      {/* Or provide customRoutes prop for custom routing */}
    </ThemeProvider>
  );
}`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              6.2 Programmatic Theme Control
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { useTheme, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function ThemeControls() {
  const { 
    mode, 
    setMode, 
    layout, 
    setLayout, 
    direction,
    setDirection,
    restoreDefaultColors 
  } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Mode (Current: {mode})
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
      
      <button onClick={restoreDefaultColors}>
        Restore Default Colors
      </button>
    </div>
  );
}`}
            />
          </div>

          <div className="mb-[24px]">
            <Typography tag="headline" className="mb-[12px]">
              6.3 Using Theme Colors in Components
            </Typography>
            <CodeBlock
              language="tsx"
              code={`// Colors are automatically available via CSS variables
// Use Tailwind classes that reference semantic colors:

<div className="bg-brand text-white">
  {/* Uses --color-semantic-bg-primary */}
</div>

<div className="bg-secondary">
  {/* Uses --color-semantic-bg-secondary */}
</div>

<div className="text-muted">
  {/* Uses --color-semantic-fg-muted */}
</div>

// Or use arbitrary values with CSS variables:
<div style={{ backgroundColor: 'var(--color-semantic-bg-primary)' }}>
  Custom styled element
</div>`}
            />
          </div>
        </section>

        {/* File Structure */}
        <section className="mb-[48px]">
          <Typography tag="h2" className="mb-[16px]">
            7. File Structure
          </Typography>
          <CodeBlock
            language="markdown"
            code={`ui/tucu-ui/src/
├── themes/
│   ├── components/
│   │   ├── theme-provider/
│   │   │   ├── index.tsx                    # Main ThemeProvider component
│   │   │   ├── single-app-theme-provider.tsx # Single app theme provider
│   │   │   ├── mfe-app-theme-provider.tsx    # MFE app theme provider
│   │   │   └── theme-wrapper.tsx             # Theme wrapper component
│   │   └── settings/
│   │       ├── settings-button.tsx           # Settings button component
│   │       ├── settings-drawer.tsx           # Settings drawer component
│   │       ├── switch-mode.tsx               # Mode switcher component
│   │       └── lang-selector.tsx             # Language selector component
│   ├── hooks/
│   │   ├── use-theme.tsx                     # Main theme hook (Zustand store)
│   │   ├── use-theme-color.ts                # CSS variable injection hook
│   │   └── use-direction.ts                  # RTL/LTR direction hook
│   ├── config/
│   │   └── index.ts                          # Color presets, layouts, types
│   ├── auth/                                 # Auth provider components
│   ├── pages/                                # Theme-related pages
│   ├── router/                               # Router providers
│   ├── types/                                # Type definitions
│   └── index.ts                              # Public exports
└── assets/css/
    └── globals.css                            # Tailwind CSS v4 configuration`}
          />
        </section>

        {/* Important Notes */}
        <section className="mb-[48px]">
          <Typography tag="h2" className="mb-[16px]">
            8. Important Notes
          </Typography>
          <div className="space-y-[16px]">
            <div className="p-[16px] bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <Typography tag="headline" className="mb-[8px]">
                Spacing Classes
              </Typography>
              <Typography tag="body" className="text-sm">
                All spacing classes in components use arbitrary values (e.g.,{' '}
                <code className="px-[4px] py-[2px] bg-light-dark rounded">
                  p-[16px]
                </code>
                ) instead of Tailwind defaults (e.g.,{' '}
                <code className="px-[4px] py-[2px] bg-light-dark rounded">
                  p-4
                </code>
                ) to maintain original spacing values regardless of global
                Tailwind configuration changes.
              </Typography>
            </div>

            <div className="p-[16px] bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Typography tag="headline" className="mb-[8px]">
                Theme Persistence
              </Typography>
              <Typography tag="body" className="text-sm">
                Theme settings are automatically persisted to localStorage using
                Zustand's persist middleware. The storage key is{' '}
                <code className="px-[4px] py-[2px] bg-light-dark rounded">
                  theme-storage
                </code>
                .
              </Typography>
            </div>

            <div className="p-[16px] bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Typography tag="headline" className="mb-[8px]">
                CSS Variables
              </Typography>
              <Typography tag="body" className="text-sm">
                Theme colors are injected as CSS variables on the document root.
                These variables are used by Tailwind utilities and can be
                referenced directly in your CSS or inline styles.
              </Typography>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-[16px] mt-[48px] pt-[32px] border-t border-gray-200 dark:border-gray-700">
          <Typography tag="headline" className="mb-[16px] sm:mb-0 sm:mr-auto">
            Explore More
          </Typography>
          <div className="flex flex-col sm:flex-row gap-[12px]">
            <Button
              variant="solid"
              color="primary"
              fullWidth
              className="min-w-[180px]"
            >
              Components
            </Button>
            <Button
              variant="solid"
              color="primary"
              fullWidth
              className="min-w-[180px]"
            >
              Design System
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default ThemingGuideIntroduction;
