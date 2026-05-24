import { LogoPropTypes } from '../../components/logos/logo';
export interface IThemeItem {
  label: string;
  value: string;
}

export type MODE = 'light' | 'dark';

export type THEME_VARIANT = 'default' | 'macos' | 'macos-tahoe';

export const defaultThemeVariant: THEME_VARIANT = 'default';

export enum LAYOUT_OPTIONS {
  CLEAN = 'clean',
  ADMIN = 'admin',
  HORIZONTAL = 'horizontal',
  MACOS = 'macos',
  MACOS_CLEAN = 'macos-clean',
  MACOS_NAVBAR = 'macos-navbar',
  MACOS_TAHOE = 'macos-tahoe',
  MACOS_TAHOE_DOCK = 'macos-tahoe-dock',
  MACOS_TAHOE_CLEAN = 'macos-tahoe-clean',
  MACOS_TAHOE_NAVBAR = 'macos-tahoe-navbar',
}

// ─── Theme Style → Layout Mapping ─────────────────────────────────────────
// Each theme style has a set of valid layouts and a default layout.

export interface ThemeStyleConfig {
  validLayouts: LAYOUT_OPTIONS[];
  defaultLayout: LAYOUT_OPTIONS;
}

export const THEME_STYLE_LAYOUTS: Record<THEME_VARIANT, ThemeStyleConfig> = {
  default: {
    validLayouts: [
      LAYOUT_OPTIONS.CLEAN,
      LAYOUT_OPTIONS.ADMIN,
      LAYOUT_OPTIONS.HORIZONTAL,
    ],
    defaultLayout: LAYOUT_OPTIONS.HORIZONTAL,
  },
  macos: {
    validLayouts: [
      LAYOUT_OPTIONS.MACOS,
      LAYOUT_OPTIONS.MACOS_CLEAN,
      LAYOUT_OPTIONS.MACOS_NAVBAR,
    ],
    defaultLayout: LAYOUT_OPTIONS.MACOS,
  },
  'macos-tahoe': {
    validLayouts: [
      LAYOUT_OPTIONS.MACOS_TAHOE,
      LAYOUT_OPTIONS.MACOS_TAHOE_DOCK,
      LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN,
      LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR,
    ],
    defaultLayout: LAYOUT_OPTIONS.MACOS_TAHOE,
  },
};

export type DIRECTION = 'ltr' | 'rtl';

export type LogoType = LogoPropTypes;

export type LayoutOptionType =
  | 'clean'
  | 'admin'
  | 'horizontal'
  | 'macos'
  | 'macos-clean'
  | 'macos-navbar'
  | 'macos-tahoe'
  | 'macos-tahoe-dock'
  | 'macos-tahoe-clean'
  | 'macos-tahoe-navbar';

export const layoutOptions: IThemeItem[] = [
  { label: 'Clean', value: LAYOUT_OPTIONS.CLEAN },
  { label: 'Admin', value: LAYOUT_OPTIONS.ADMIN },
  { label: 'Horizontal', value: LAYOUT_OPTIONS.HORIZONTAL },
];

export type PresetColorType =
  | 'Default'
  | 'DefaultSecondary'
  | 'DefaultAccent'
  | 'DefaultBgLight'
  | 'DefaultBgDark'
  | 'Yellow'
  | 'Orange'
  | 'Red'
  | 'Pink'
  | 'Violet'
  | 'Purple'
  | 'Blue'
  | 'Azure'
  | 'Turquoise'
  | 'Green'
  | 'Lime'
  | 'Black'
  | 'Gray';

export enum PRESET_LABEL_COLORS {
  DEFAULT_PRIMARY = 'DefaultPrimary',
  DEFAULT_DARK_PRIMARY = 'DefaultDarkPrimary',
  DEFAULT_SECONDARY = 'DefaultSecondary',
  DEFAULT_DARK_SECONDARY = 'DefaultDarkSecondary',
  DEFAULT_ACCENT = 'DefaultAccent',
  DEFAULT_DARK_ACCENT = 'DefaultDarkAccent',
  DEFAULT_MUTED = 'DefaultMuted',
  DEFAULT_DARK_MUTED = 'DefaultDarkMuted',
  DEFAULT_LIGHT_BG = 'DefaultLightBg',
  DEFAULT_DARK_BG = 'DefaultDarkBg',
  DEFAULT_LIGHT_DARK = 'DefaultLightDark',
  DEFAULT_DARK_LIGHT_DARK = 'DefaultDarkLightDark',
  BLUE = 'Blue',
  DARK_BLUE = 'DarkBlue',
  GREEN = 'Green',
  DARK_GREEN = 'DarkGreen',
  ORANGE = 'Orange',
  DARK_ORANGE = 'DarkOrange',
  GRAY = 'Gray',
  DARK_GRAY = 'DarkGray',
  INDIGO = 'Indigo',
  DARK_INDIGO = 'DarkIndigo',
  PINK = 'Pink',
  DARK_PINK = 'DarkPink',
  PURPLE = 'Purple',
  DARK_PURPLE = 'DarkPurple',
  RED = 'Red',
  DARK_RED = 'DarkRed',
  TEAL = 'Teal',
  DARK_TEAL = 'DarkTeal',
  YELLOW = 'Yellow',
  DARK_YELLOW = 'DarkYellow',
  CHARTREUSE = 'Chartreuse',
  DARK_CHARTREUSE = 'DarkChartreuse',

  // Status & Foreground
  DEFAULT_SUCCESS = 'DefaultSuccess',
  DEFAULT_DARK_SUCCESS = 'DefaultDarkSuccess',
  DEFAULT_WARNING = 'DefaultWarning',
  DEFAULT_DARK_WARNING = 'DefaultDarkWarning',
  DEFAULT_ERROR = 'DefaultError',
  DEFAULT_DARK_ERROR = 'DefaultDarkError',
  DEFAULT_INFO = 'DefaultInfo',
  DEFAULT_DARK_INFO = 'DefaultDarkInfo',
  DEFAULT_FG = 'DefaultFg',
  DEFAULT_DARK_FG = 'DefaultDarkFg',
  DEFAULT_BORDER = 'DefaultBorder',
  DEFAULT_DARK_BORDER = 'DefaultDarkBorder',

  // macOS / Apple preset labels
  MACOS_PRIMARY = 'MacOSPrimary',
  MACOS_DARK_PRIMARY = 'MacOSDarkPrimary',
  MACOS_SECONDARY = 'MacOSSecondary',
  MACOS_DARK_SECONDARY = 'MacOSDarkSecondary',
  MACOS_ACCENT = 'MacOSAccent',
  MACOS_DARK_ACCENT = 'MacOSDarkAccent',
  MACOS_MUTED = 'MacOSMuted',
  MACOS_DARK_MUTED = 'MacOSDarkMuted',
  MACOS_LIGHT_BG = 'MacOSLightBg',
  MACOS_DARK_BG = 'MacOSDarkBg',
  MACOS_LIGHT_DARK = 'MacOSLightDark',
  MACOS_DARK_LIGHT_DARK = 'MacOSDarkLightDark',
}

export enum PRESET_COLORS {
  // Primary colors - mapped from --color-semantic-bg-primary
  DEFAULT_PRIMARY = '#0052ff', // --color-tucu-ui-blue-60 (light mode)
  DEFAULT_DARK_PRIMARY = '#578bfa', // --color-tucu-ui-dark-blue-70 (dark mode)

  // Secondary colors - mapped from --color-semantic-bg-secondary
  DEFAULT_SECONDARY = '#f3f4f6', // --color-tucu-ui-gray-10 (light mode)
  DEFAULT_DARK_SECONDARY = '#172131', // --color-tucu-ui-dark-gray-15 (dark mode)

  // Accent colors - mapped from --color-semantic-accent-bold-yellow
  DEFAULT_ACCENT = '#f7d21a', // --color-tucu-ui-yellow-30 (light mode)
  DEFAULT_DARK_ACCENT = '#936000', // --color-tucu-ui-dark-yellow-30 (dark mode)

  // Muted colors - mapped from --color-semantic-fg-muted
  DEFAULT_MUTED = '#4a5565', // --color-tucu-ui-gray-60 (light mode)
  DEFAULT_DARK_MUTED = '#828a99', // --color-tucu-ui-dark-gray-60 (dark mode)

  // Background colors - mapped from --color-semantic-bg
  DEFAULT_LIGHT_BG = '#ffffff', // --color-tucu-ui-gray-0 (light mode)
  DEFAULT_DARK_BG = '#030712', // --color-tucu-ui-dark-gray-0 (dark mode)

  // Light Dark colors - mapped from --color-semantic-bg-secondary-wash
  DEFAULT_LIGHT_DARK = '#f9fafb', // --color-tucu-ui-gray-5 (light mode)
  DEFAULT_DARK_LIGHT_DARK = '#0a101d', // --color-tucu-ui-dark-gray-5 (dark mode)

  // Color presets - mapped from --color-tucu-ui-*-50 (light mode)
  BLUE = '#105eff', // --color-tucu-ui-blue-50
  DARK_BLUE = '#2162ee', // --color-tucu-ui-dark-blue-50
  GREEN = '#129961', // --color-tucu-ui-green-50
  DARK_GREEN = '#159962', // --color-tucu-ui-dark-green-50
  ORANGE = '#e1591b', // --color-tucu-ui-orange-50
  DARK_ORANGE = '#e66020', // --color-tucu-ui-dark-orange-50
  GRAY = '#6a7282', // --color-tucu-ui-gray-50
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DARK_GRAY = '#6a7282', // --color-tucu-ui-dark-gray-50
  INDIGO = '#596ff2', // --color-tucu-ui-indigo-50
  DARK_INDIGO = '#5c71ee', // --color-tucu-ui-dark-indigo-50
  PINK = '#cb51bb', // --color-tucu-ui-pink-50
  DARK_PINK = '#d058c1', // --color-tucu-ui-dark-pink-50
  PURPLE = '#9d6bf2', // --color-tucu-ui-purple-50
  DARK_PURPLE = '#bc7bfb', // --color-tucu-ui-dark-purple-50
  RED = '#e13947', // --color-tucu-ui-red-50
  DARK_RED = '#e6404e', // --color-tucu-ui-dark-red-50
  TEAL = '#0093cb', // --color-tucu-ui-teal-50
  DARK_TEAL = '#0095cd', // --color-tucu-ui-dark-teal-50
  YELLOW = '#cf9700', // --color-tucu-ui-yellow-50
  DARK_YELLOW = '#c79e00', // --color-tucu-ui-dark-yellow-50
  CHARTREUSE = '#56b340', // --color-tucu-ui-chartreuse-50
  DARK_CHARTREUSE = '#7bc869', // --color-tucu-ui-dark-chartreuse-50

  // Status & Foreground
  DEFAULT_SUCCESS = '#098551', // --color-tucu-ui-green-60 (light)
  DEFAULT_DARK_SUCCESS = '#27ad75', // --color-tucu-ui-dark-green-60 (dark)
  DEFAULT_WARNING = '#ed702f', // --color-tucu-ui-orange-40 (light)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_DARK_WARNING = '#c79e00', // --color-tucu-ui-dark-yellow-50 (dark)
  DEFAULT_ERROR = '#cf202f', // --color-tucu-ui-red-60 (light)
  DEFAULT_DARK_ERROR = '#f0616d', // --color-tucu-ui-dark-red-60 (dark)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_INFO = '#0052ff', // same as primary (light)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_DARK_INFO = '#578bfa', // same as dark primary (dark)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_FG = '#030712', // --color-tucu-ui-gray-100 (light)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_DARK_FG = '#ffffff', // --color-tucu-ui-dark-gray-100 (dark)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_BORDER = 'color-mix(in oklab, var(--color-black) 10%, transparent)',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  DEFAULT_DARK_BORDER = 'color-mix(in oklab, var(--color-white) 8%, transparent)',

  // macOS Sonoma / Apple system colors
  // Source: UIColor/NSColor semantic values, sampled from macOS Sonoma 14
  MACOS_PRIMARY = '#007aff', // systemBlue (light)
  MACOS_DARK_PRIMARY = '#0a84ff', // systemBlue (dark)
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MACOS_SECONDARY = '#ffffff', // contentBackground — cards float on gray bg
  MACOS_DARK_SECONDARY = '#2c2c2e', // systemGray4 (dark) — elevated surface
  MACOS_ACCENT = '#ff9500', // systemOrange (light)
  MACOS_DARK_ACCENT = '#ff9f0a', // systemOrange (dark)
  MACOS_MUTED = '#6c6c70', // secondaryLabel blended (light)
  MACOS_DARK_MUTED = '#aeaeb2', // systemGray2 (dark)
  MACOS_LIGHT_BG = '#f2f2f7', // systemGray6 — primary app background
  MACOS_DARK_BG = '#1c1c1e', // systemGray5 (dark) — primary bg
  MACOS_LIGHT_DARK = '#e5e5ea', // systemGray5 (light) — secondary bg wash
  MACOS_DARK_LIGHT_DARK = '#3a3a3c', // systemGray3 (dark) — tertiary bg
}

export const colorPreset: IThemeItem[] = [
  {
    label: PRESET_LABEL_COLORS.DEFAULT_PRIMARY,
    value: PRESET_COLORS.DEFAULT_PRIMARY,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_PRIMARY,
    value: PRESET_COLORS.DEFAULT_DARK_PRIMARY,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_SECONDARY,
    value: PRESET_COLORS.DEFAULT_SECONDARY,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_SECONDARY,
    value: PRESET_COLORS.DEFAULT_DARK_SECONDARY,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_ACCENT,
    value: PRESET_COLORS.DEFAULT_ACCENT,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_ACCENT,
    value: PRESET_COLORS.DEFAULT_DARK_ACCENT,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_MUTED,
    value: PRESET_COLORS.DEFAULT_MUTED,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_MUTED,
    value: PRESET_COLORS.DEFAULT_DARK_MUTED,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_BG,
    value: PRESET_COLORS.DEFAULT_DARK_BG,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_LIGHT_BG,
    value: PRESET_COLORS.DEFAULT_LIGHT_BG,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_LIGHT_DARK,
    value: PRESET_COLORS.DEFAULT_LIGHT_DARK,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_LIGHT_DARK,
    value: PRESET_COLORS.DEFAULT_DARK_LIGHT_DARK,
  },
  {
    label: PRESET_LABEL_COLORS.BLUE,
    value: PRESET_COLORS.BLUE,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_BLUE,
    value: PRESET_COLORS.DARK_BLUE,
  },
  {
    label: PRESET_LABEL_COLORS.GREEN,
    value: PRESET_COLORS.GREEN,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_GREEN,
    value: PRESET_COLORS.DARK_GREEN,
  },
  {
    label: PRESET_LABEL_COLORS.ORANGE,
    value: PRESET_COLORS.ORANGE,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_ORANGE,
    value: PRESET_COLORS.DARK_ORANGE,
  },
  {
    label: PRESET_LABEL_COLORS.GRAY,
    value: PRESET_COLORS.GRAY,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_GRAY,
    value: PRESET_COLORS.DARK_GRAY,
  },
  {
    label: PRESET_LABEL_COLORS.INDIGO,
    value: PRESET_COLORS.INDIGO,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_INDIGO,
    value: PRESET_COLORS.DARK_INDIGO,
  },
  {
    label: PRESET_LABEL_COLORS.PINK,
    value: PRESET_COLORS.PINK,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_PINK,
    value: PRESET_COLORS.DARK_PINK,
  },
  {
    label: PRESET_LABEL_COLORS.PURPLE,
    value: PRESET_COLORS.PURPLE,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_PURPLE,
    value: PRESET_COLORS.DARK_PURPLE,
  },
  {
    label: PRESET_LABEL_COLORS.RED,
    value: PRESET_COLORS.RED,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_RED,
    value: PRESET_COLORS.DARK_RED,
  },
  {
    label: PRESET_LABEL_COLORS.TEAL,
    value: PRESET_COLORS.TEAL,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_TEAL,
    value: PRESET_COLORS.DARK_TEAL,
  },
  {
    label: PRESET_LABEL_COLORS.YELLOW,
    value: PRESET_COLORS.YELLOW,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_YELLOW,
    value: PRESET_COLORS.DARK_YELLOW,
  },
  {
    label: PRESET_LABEL_COLORS.CHARTREUSE,
    value: PRESET_COLORS.CHARTREUSE,
  },
  {
    label: PRESET_LABEL_COLORS.DARK_CHARTREUSE,
    value: PRESET_COLORS.DARK_CHARTREUSE,
  },
  // Status & Foreground presets
  {
    label: PRESET_LABEL_COLORS.DEFAULT_SUCCESS,
    value: PRESET_COLORS.DEFAULT_SUCCESS,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_SUCCESS,
    value: PRESET_COLORS.DEFAULT_DARK_SUCCESS,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_WARNING,
    value: PRESET_COLORS.DEFAULT_WARNING,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_WARNING,
    value: PRESET_COLORS.DEFAULT_DARK_WARNING,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_ERROR,
    value: PRESET_COLORS.DEFAULT_ERROR,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_ERROR,
    value: PRESET_COLORS.DEFAULT_DARK_ERROR,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_INFO,
    value: PRESET_COLORS.DEFAULT_INFO,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_INFO,
    value: PRESET_COLORS.DEFAULT_DARK_INFO,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_FG,
    value: PRESET_COLORS.DEFAULT_FG,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_FG,
    value: PRESET_COLORS.DEFAULT_DARK_FG,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_BORDER,
    value: PRESET_COLORS.DEFAULT_BORDER,
  },
  {
    label: PRESET_LABEL_COLORS.DEFAULT_DARK_BORDER,
    value: PRESET_COLORS.DEFAULT_DARK_BORDER,
  },
];

export const Direction: IThemeItem[] = [
  {
    label: 'LTR',
    value: 'ltr',
  },
  {
    label: 'RTL',
    value: 'rtl',
  },
];

export type LangType = 'en' | 'es' | 'fr';

export const langOptions: IThemeItem[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Spanish',
    value: 'es',
  },
  {
    label: 'French',
    value: 'fr',
  },
];

// Default Values
export const defaultLang: LangType = 'en';

export const defaultLogo: LogoType = {
  path: '/onboarding',
  name: '',
};

export const defaultLayout = LAYOUT_OPTIONS.HORIZONTAL;

export const defaultPrimaryPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_PRIMARY
) as IThemeItem;

export const defaultDarkPrimaryPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_PRIMARY
) as IThemeItem;

export const defaultSecondaryPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_SECONDARY
) as IThemeItem;

export const defaultDarkSecondaryPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_SECONDARY
) as IThemeItem;

export const defaultAccentPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_ACCENT
) as IThemeItem;

export const defaultDarkAccentPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_ACCENT
) as IThemeItem;

export const defaultMutedPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_MUTED
) as IThemeItem;

export const defaultDarkMutedPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_MUTED
) as IThemeItem;

export const defaultDarkBgPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_BG
) as IThemeItem;

export const defaultLightBgPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_LIGHT_BG
) as IThemeItem;

export const defaultLightDarkPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_LIGHT_DARK
) as IThemeItem;

export const defaultDarkLightDarkPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_LIGHT_DARK
) as IThemeItem;

export const defaultSuccessPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_SUCCESS
) as IThemeItem;

export const defaultDarkSuccessPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_SUCCESS
) as IThemeItem;

export const defaultWarningPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_WARNING
) as IThemeItem;

export const defaultDarkWarningPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_WARNING
) as IThemeItem;

export const defaultErrorPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_ERROR
) as IThemeItem;

export const defaultDarkErrorPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_ERROR
) as IThemeItem;

export const defaultInfoPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_INFO
) as IThemeItem;

export const defaultDarkInfoPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_INFO
) as IThemeItem;

export const defaultFgPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_FG
) as IThemeItem;

export const defaultDarkFgPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_FG
) as IThemeItem;

export const defaultBorderPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_BORDER
) as IThemeItem;

export const defaultDarkBorderPreset = colorPreset.find(
  (item) => item.label === PRESET_LABEL_COLORS.DEFAULT_DARK_BORDER
) as IThemeItem;

export const defaultDirection = 'ltr';

export const defaultMode = 'dark';

// ─── macOS Preset Bundles ─────────────────────────────────────────────────
// Ready-to-use preset objects for applyMacOSTheme() store action.

export const macosLightPresets = {
  primaryPreset: {
    label: PRESET_LABEL_COLORS.MACOS_PRIMARY,
    value: PRESET_COLORS.MACOS_PRIMARY,
  },
  darkPrimaryPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_PRIMARY,
    value: PRESET_COLORS.MACOS_DARK_PRIMARY,
  },
  secondaryPreset: {
    label: PRESET_LABEL_COLORS.MACOS_SECONDARY,
    value: PRESET_COLORS.MACOS_SECONDARY,
  },
  darkSecondaryPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_SECONDARY,
    value: PRESET_COLORS.MACOS_DARK_SECONDARY,
  },
  accentPreset: {
    label: PRESET_LABEL_COLORS.MACOS_ACCENT,
    value: PRESET_COLORS.MACOS_ACCENT,
  },
  darkAccentPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_ACCENT,
    value: PRESET_COLORS.MACOS_DARK_ACCENT,
  },
  mutedPreset: {
    label: PRESET_LABEL_COLORS.MACOS_MUTED,
    value: PRESET_COLORS.MACOS_MUTED,
  },
  darkMutedPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_MUTED,
    value: PRESET_COLORS.MACOS_DARK_MUTED,
  },
  lightBgPreset: {
    label: PRESET_LABEL_COLORS.MACOS_LIGHT_BG,
    value: PRESET_COLORS.MACOS_LIGHT_BG,
  },
  darkBgPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_BG,
    value: PRESET_COLORS.MACOS_DARK_BG,
  },
  lightDarkPreset: {
    label: PRESET_LABEL_COLORS.MACOS_LIGHT_DARK,
    value: PRESET_COLORS.MACOS_LIGHT_DARK,
  },
  darkLightDarkPreset: {
    label: PRESET_LABEL_COLORS.MACOS_DARK_LIGHT_DARK,
    value: PRESET_COLORS.MACOS_DARK_LIGHT_DARK,
  },
} as const;

// ─── macOS Tahoe Accent Color Bundles ─────────────────────────────────────
// Inspired by macOS System Preferences accent color options.
// Each accent defines primary (light/dark) + accent (light/dark) while
// sharing the same neutral backgrounds/muted/secondary values.

export interface TahoeAccentBundle {
  id: string;
  label: string;
  /** Preview swatch — light mode primary */
  swatch: string;
  primaryLight: string;
  primaryDark: string;
  accentLight: string;
  accentDark: string;
}

export const TAHOE_ACCENT_BUNDLES: TahoeAccentBundle[] = [
  {
    id: 'glass-neutral',
    label: 'Glass',
    swatch: '#007AFF',
    primaryLight: '#007AFF',
    primaryDark: '#0A84FF',
    accentLight: '#FF9500',
    accentDark: '#FF9F0A',
  },
  {
    id: 'blue',
    label: 'Blue',
    swatch: '#007AFF',
    primaryLight: '#007AFF',
    primaryDark: '#0A84FF',
    accentLight: '#5AC8FA',
    accentDark: '#64D2FF',
  },
  {
    id: 'purple',
    label: 'Purple',
    swatch: '#AF52DE',
    primaryLight: '#AF52DE',
    primaryDark: '#BF5AF2',
    accentLight: '#5856D6',
    accentDark: '#5E5CE6',
  },
  {
    id: 'pink',
    label: 'Pink',
    swatch: '#FF2D55',
    primaryLight: '#FF2D55',
    primaryDark: '#FF375F',
    accentLight: '#FF6482',
    accentDark: '#FF6482',
  },
  {
    id: 'red',
    label: 'Red',
    swatch: '#FF3B30',
    primaryLight: '#FF3B30',
    primaryDark: '#FF453A',
    accentLight: '#FF6961',
    accentDark: '#FF6961',
  },
  {
    id: 'orange',
    label: 'Orange',
    swatch: '#FF9500',
    primaryLight: '#FF9500',
    primaryDark: '#FF9F0A',
    accentLight: '#FFB340',
    accentDark: '#FFB340',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    swatch: '#FFCC00',
    primaryLight: '#FFCC00',
    primaryDark: '#FFD60A',
    accentLight: '#FFE066',
    accentDark: '#FFE066',
  },
  {
    id: 'green',
    label: 'Green',
    swatch: '#34C759',
    primaryLight: '#34C759',
    primaryDark: '#30D158',
    accentLight: '#63DA83',
    accentDark: '#63DA83',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    swatch: '#8E8E93',
    primaryLight: '#8E8E93',
    primaryDark: '#98989D',
    accentLight: '#636366',
    accentDark: '#AEAEB2',
  },
];

/** Build a full macOS preset set from a Tahoe accent bundle */
export function buildTahoePresets(bundle: TahoeAccentBundle) {
  return {
    primaryPreset: {
      label: `Tahoe${bundle.label}`,
      value: bundle.primaryLight,
    },
    darkPrimaryPreset: {
      label: `Tahoe${bundle.label}Dark`,
      value: bundle.primaryDark,
    },
    secondaryPreset: macosLightPresets.secondaryPreset,
    darkSecondaryPreset: macosLightPresets.darkSecondaryPreset,
    accentPreset: {
      label: `Tahoe${bundle.label}Accent`,
      value: bundle.accentLight,
    },
    darkAccentPreset: {
      label: `Tahoe${bundle.label}AccentDark`,
      value: bundle.accentDark,
    },
    mutedPreset: macosLightPresets.mutedPreset,
    darkMutedPreset: macosLightPresets.darkMutedPreset,
    lightBgPreset: macosLightPresets.lightBgPreset,
    darkBgPreset: macosLightPresets.darkBgPreset,
    lightDarkPreset: macosLightPresets.lightDarkPreset,
    darkLightDarkPreset: macosLightPresets.darkLightDarkPreset,
    borderPreset: {
      label: PRESET_LABEL_COLORS.DEFAULT_BORDER,
      value: PRESET_COLORS.DEFAULT_BORDER,
    },
    darkBorderPreset: {
      label: PRESET_LABEL_COLORS.DEFAULT_DARK_BORDER,
      value: PRESET_COLORS.DEFAULT_DARK_BORDER,
    },
  };
}

// ─── macOS Sonoma Accent Color Bundles ────────────────────────────────────
// macOS Sonoma System Preferences accent color options.
// Uses the same TahoeAccentBundle shape for consistency.

export const SONOMA_ACCENT_BUNDLES: TahoeAccentBundle[] = [
  {
    id: 'blue',
    label: 'Blue',
    swatch: '#007AFF',
    primaryLight: '#007AFF',
    primaryDark: '#0A84FF',
    accentLight: '#007AFF',
    accentDark: '#0A84FF',
  },
  {
    id: 'purple',
    label: 'Purple',
    swatch: '#AF52DE',
    primaryLight: '#AF52DE',
    primaryDark: '#BF5AF2',
    accentLight: '#AF52DE',
    accentDark: '#BF5AF2',
  },
  {
    id: 'pink',
    label: 'Pink',
    swatch: '#FF2D55',
    primaryLight: '#FF2D55',
    primaryDark: '#FF375F',
    accentLight: '#FF2D55',
    accentDark: '#FF375F',
  },
  {
    id: 'red',
    label: 'Red',
    swatch: '#FF3B30',
    primaryLight: '#FF3B30',
    primaryDark: '#FF453A',
    accentLight: '#FF3B30',
    accentDark: '#FF453A',
  },
  {
    id: 'orange',
    label: 'Orange',
    swatch: '#FF9500',
    primaryLight: '#FF9500',
    primaryDark: '#FF9F0A',
    accentLight: '#FF9500',
    accentDark: '#FF9F0A',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    swatch: '#FFCC00',
    primaryLight: '#FFCC00',
    primaryDark: '#FFD60A',
    accentLight: '#FFCC00',
    accentDark: '#FFD60A',
  },
  {
    id: 'green',
    label: 'Green',
    swatch: '#34C759',
    primaryLight: '#34C759',
    primaryDark: '#30D158',
    accentLight: '#34C759',
    accentDark: '#30D158',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    swatch: '#8E8E93',
    primaryLight: '#8E8E93',
    primaryDark: '#98989D',
    accentLight: '#8E8E93',
    accentDark: '#98989D',
  },
];

/** Build a full macOS preset set from a Sonoma accent bundle */
export function buildSonomaPresets(bundle: TahoeAccentBundle) {
  return {
    primaryPreset: {
      label: `Sonoma${bundle.label}`,
      value: bundle.primaryLight,
    },
    darkPrimaryPreset: {
      label: `Sonoma${bundle.label}Dark`,
      value: bundle.primaryDark,
    },
    secondaryPreset: macosLightPresets.secondaryPreset,
    darkSecondaryPreset: macosLightPresets.darkSecondaryPreset,
    accentPreset: {
      label: `Sonoma${bundle.label}Accent`,
      value: bundle.accentLight,
    },
    darkAccentPreset: {
      label: `Sonoma${bundle.label}AccentDark`,
      value: bundle.accentDark,
    },
    mutedPreset: macosLightPresets.mutedPreset,
    darkMutedPreset: macosLightPresets.darkMutedPreset,
    lightBgPreset: macosLightPresets.lightBgPreset,
    darkBgPreset: macosLightPresets.darkBgPreset,
    lightDarkPreset: macosLightPresets.lightDarkPreset,
    darkLightDarkPreset: macosLightPresets.darkLightDarkPreset,
    borderPreset: {
      label: PRESET_LABEL_COLORS.DEFAULT_BORDER,
      value: PRESET_COLORS.DEFAULT_BORDER,
    },
    darkBorderPreset: {
      label: PRESET_LABEL_COLORS.DEFAULT_DARK_BORDER,
      value: PRESET_COLORS.DEFAULT_DARK_BORDER,
    },
  };
}
