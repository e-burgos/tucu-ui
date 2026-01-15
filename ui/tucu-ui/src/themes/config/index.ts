import { LogoPropTypes } from '../../components/logos/logo';
export interface IThemeItem {
  label: string;
  value: string;
}

export type MODE = 'light' | 'dark';

export type DIRECTION = 'ltr' | 'rtl';

export type LogoType = LogoPropTypes;

export enum LAYOUT_OPTIONS {
  CLEAN = 'clean',
  ADMIN = 'admin',
  HORIZONTAL = 'horizontal',
}

export type LayoutOptionType = 'clean' | 'admin' | 'horizontal';

export const layoutOptions: IThemeItem[] = [
  {
    label: 'Clean',
    value: LAYOUT_OPTIONS.CLEAN,
  },
  {
    label: 'Admin',
    value: LAYOUT_OPTIONS.ADMIN,
  },
  {
    label: 'Horizontal',
    value: LAYOUT_OPTIONS.HORIZONTAL,
  },
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
}

export enum PRESET_COLORS {
  // Primary colors - mapped from --color-semantic-bg-primary
  DEFAULT_PRIMARY = '#0052ff', // --color-tucu-ui-blue-60 (light mode)
  DEFAULT_DARK_PRIMARY = '#578bfa', // --color-tucu-ui-dark-blue-70 (dark mode)

  // Secondary colors - mapped from --color-semantic-bg-secondary
  DEFAULT_SECONDARY = '#eef0f3', // --color-tucu-ui-gray-10 (light mode)
  DEFAULT_DARK_SECONDARY = '#282b31', // --color-tucu-ui-dark-gray-15 (dark mode)

  // Accent colors - mapped from --color-semantic-accent-bold-yellow
  DEFAULT_ACCENT = '#f7d21a', // --color-tucu-ui-yellow-30 (light mode)
  DEFAULT_DARK_ACCENT = '#936000', // --color-tucu-ui-dark-yellow-30 (dark mode)

  // Muted colors - mapped from --color-semantic-fg-muted
  DEFAULT_MUTED = '#5b616e', // --color-tucu-ui-gray-60 (light mode)
  DEFAULT_DARK_MUTED = '#8a919e', // --color-tucu-ui-dark-gray-60 (dark mode)

  // Background colors - mapped from --color-semantic-bg
  DEFAULT_LIGHT_BG = '#ffffff', // --color-tucu-ui-gray-0 (light mode)
  DEFAULT_DARK_BG = '#0a0b0d', // --color-tucu-ui-dark-gray-0 (dark mode)

  // Light Dark colors - mapped from --color-semantic-bg-secondary-wash
  DEFAULT_LIGHT_DARK = '#f7f8f9', // --color-tucu-ui-gray-5 (light mode)
  DEFAULT_DARK_LIGHT_DARK = '#141519', // --color-tucu-ui-dark-gray-5 (dark mode)

  // Color presets - mapped from --color-tucu-ui-*-50 (light mode)
  BLUE = '#105eff', // --color-tucu-ui-blue-50
  DARK_BLUE = '#2162ee', // --color-tucu-ui-dark-blue-50
  GREEN = '#129961', // --color-tucu-ui-green-50
  DARK_GREEN = '#159962', // --color-tucu-ui-dark-green-50
  ORANGE = '#e1591b', // --color-tucu-ui-orange-50
  DARK_ORANGE = '#e66020', // --color-tucu-ui-dark-orange-50
  GRAY = '#717886', // --color-tucu-ui-gray-50
  DARK_GRAY = '#727886', // --color-tucu-ui-dark-gray-50
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

export const defaultDirection = 'ltr';

export const defaultMode = 'dark';
