export type ThemeSurface = 'light' | 'dark' | 'auto';

export type ThemeRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type ThemeCardStyle = 'glass' | 'solid' | 'outlined';

export type ThemeButtonShape = 'rounded' | 'pill' | 'square';

export type ThemePresetMode = 'light' | 'dark';

export interface ThemePresetTokens {
  /** Extra CSS custom properties (keys must start with `--`) applied in light mode. */
  light?: Record<string, string>;
  /** Extra CSS custom properties (keys must start with `--`) applied in dark mode. */
  dark?: Record<string, string>;
}

export interface ThemePreset {
  /** Unique registry key, also exposed as `data-tucu-theme`. */
  name: string;
  /** Human readable name for pickers. */
  label?: string;
  /** Brand color (hex) used in light mode. */
  accent: string;
  /** Brand color (hex) used in dark mode. Falls back to `accent`. */
  darkAccent?: string;
  /** Preferred surface. `auto` follows the page color scheme. */
  surface?: ThemeSurface;
  /** Corner radius scale for cards and surfaces. */
  radius?: ThemeRadius;
  /** CSS font-family for body text. */
  fontFamily?: string;
  /** CSS font-family for h1-h3 headings. */
  headingFontFamily?: string;
  /** Card treatment applied to `Card` components inside the theme. */
  cards?: ThemeCardStyle;
  /** Button shape applied to `Button` components inside the theme. */
  buttons?: ThemeButtonShape;
  /** Free-form CSS custom property overrides, applied last. */
  tokens?: ThemePresetTokens;
}

export interface ThemePresetRule {
  /** Exact host (case-insensitive, port ignored), `*.example.com` wildcard, or RegExp. */
  host?: string | RegExp;
  /** Exact tenant identifier. */
  tenant?: string;
  /** Registered preset name or an inline preset. */
  preset: string | ThemePreset;
}

export interface ResolveThemePresetOptions {
  host?: string;
  tenant?: string;
  rules: ThemePresetRule[];
  /** Registered preset name or inline preset used when no rule matches. */
  fallback?: string | ThemePreset;
}
