import type { ITheme } from '../../hooks/use-theme';
import {
  IThemeItem,
  defaultPrimaryPreset,
  defaultDarkPrimaryPreset,
  defaultSecondaryPreset,
  defaultDarkSecondaryPreset,
  defaultAccentPreset,
  defaultDarkAccentPreset,
  defaultMutedPreset,
  defaultDarkMutedPreset,
  defaultDarkBgPreset,
  defaultLightBgPreset,
  defaultLightDarkPreset,
  defaultDarkLightDarkPreset,
  defaultSuccessPreset,
  defaultDarkSuccessPreset,
  defaultWarningPreset,
  defaultDarkWarningPreset,
  defaultErrorPreset,
  defaultDarkErrorPreset,
  defaultInfoPreset,
  defaultDarkInfoPreset,
  defaultFgPreset,
  defaultDarkFgPreset,
  defaultBorderPreset,
  defaultDarkBorderPreset,
} from '../../config';

export type { IThemeItem };

export type ColorType =
  | 'primary'
  | 'darkPrimary'
  | 'secondary'
  | 'darkSecondary'
  | 'accent'
  | 'darkAccent'
  | 'muted'
  | 'darkMuted'
  | 'darkBg'
  | 'lightBg'
  | 'lightDark'
  | 'darkLightDark'
  | 'success'
  | 'darkSuccess'
  | 'warning'
  | 'darkWarning'
  | 'error'
  | 'darkError'
  | 'info'
  | 'darkInfo'
  | 'fg'
  | 'darkFg'
  | 'border'
  | 'darkBorder';

export interface ColorConfig {
  presetKey: keyof ITheme;
  setterKey: keyof ITheme;
  defaultValue: IThemeItem;
  label: string;
}

export interface ColorGroup {
  title: string;
  items: { light: ColorType; dark: ColorType }[];
}

export const COLOR_CONFIG: Record<ColorType, ColorConfig> = {
  primary: {
    presetKey: 'primaryPreset',
    setterKey: 'setPrimaryPreset',
    defaultValue: defaultPrimaryPreset,
    label: 'Primary (Brand) Color',
  },
  darkPrimary: {
    presetKey: 'darkPrimaryPreset',
    setterKey: 'setDarkPrimaryPreset',
    defaultValue: defaultDarkPrimaryPreset,
    label: 'Dark Primary (Brand) Color',
  },
  secondary: {
    presetKey: 'secondaryPreset',
    setterKey: 'setSecondaryPreset',
    defaultValue: defaultSecondaryPreset,
    label: 'Auxiliary Background Color',
  },
  darkSecondary: {
    presetKey: 'darkSecondaryPreset',
    setterKey: 'setDarkSecondaryPreset',
    defaultValue: defaultDarkSecondaryPreset,
    label: 'Dark Auxiliary Background Color',
  },
  accent: {
    presetKey: 'accentPreset',
    setterKey: 'setAccentPreset',
    defaultValue: defaultAccentPreset,
    label: 'Secondary (Accent) Color',
  },
  darkAccent: {
    presetKey: 'darkAccentPreset',
    setterKey: 'setDarkAccentPreset',
    defaultValue: defaultDarkAccentPreset,
    label: 'Dark Secondary (Accent) Color',
  },
  muted: {
    presetKey: 'mutedPreset',
    setterKey: 'setMutedPreset',
    defaultValue: defaultMutedPreset,
    label: 'Muted Color',
  },
  darkMuted: {
    presetKey: 'darkMutedPreset',
    setterKey: 'setDarkMutedPreset',
    defaultValue: defaultDarkMutedPreset,
    label: 'Dark Muted Color',
  },
  darkBg: {
    presetKey: 'darkBgPreset',
    setterKey: 'setDarkBgPreset',
    defaultValue: defaultDarkBgPreset,
    label: 'Dark Primary Background Color',
  },
  lightBg: {
    presetKey: 'lightBgPreset',
    setterKey: 'setLightBgPreset',
    defaultValue: defaultLightBgPreset,
    label: 'Light Primary Background Color',
  },
  lightDark: {
    presetKey: 'lightDarkPreset',
    setterKey: 'setLightDarkPreset',
    defaultValue: defaultLightDarkPreset,
    label: 'Light Secondary Background Color',
  },
  darkLightDark: {
    presetKey: 'darkLightDarkPreset',
    setterKey: 'setDarkLightDarkPreset',
    defaultValue: defaultDarkLightDarkPreset,
    label: 'Dark Secondary Background Color',
  },
  success: {
    presetKey: 'successPreset',
    setterKey: 'setSuccessPreset',
    defaultValue: defaultSuccessPreset,
    label: 'Success Color',
  },
  darkSuccess: {
    presetKey: 'darkSuccessPreset',
    setterKey: 'setDarkSuccessPreset',
    defaultValue: defaultDarkSuccessPreset,
    label: 'Dark Success Color',
  },
  warning: {
    presetKey: 'warningPreset',
    setterKey: 'setWarningPreset',
    defaultValue: defaultWarningPreset,
    label: 'Warning Color',
  },
  darkWarning: {
    presetKey: 'darkWarningPreset',
    setterKey: 'setDarkWarningPreset',
    defaultValue: defaultDarkWarningPreset,
    label: 'Dark Warning Color',
  },
  error: {
    presetKey: 'errorPreset',
    setterKey: 'setErrorPreset',
    defaultValue: defaultErrorPreset,
    label: 'Error Color',
  },
  darkError: {
    presetKey: 'darkErrorPreset',
    setterKey: 'setDarkErrorPreset',
    defaultValue: defaultDarkErrorPreset,
    label: 'Dark Error Color',
  },
  info: {
    presetKey: 'infoPreset',
    setterKey: 'setInfoPreset',
    defaultValue: defaultInfoPreset,
    label: 'Info Color',
  },
  darkInfo: {
    presetKey: 'darkInfoPreset',
    setterKey: 'setDarkInfoPreset',
    defaultValue: defaultDarkInfoPreset,
    label: 'Dark Info Color',
  },
  fg: {
    presetKey: 'fgPreset',
    setterKey: 'setFgPreset',
    defaultValue: defaultFgPreset,
    label: 'Primary',
  },
  darkFg: {
    presetKey: 'darkFgPreset',
    setterKey: 'setDarkFgPreset',
    defaultValue: defaultDarkFgPreset,
    label: 'Primary',
  },
  border: {
    presetKey: 'borderPreset',
    setterKey: 'setBorderPreset',
    defaultValue: defaultBorderPreset,
    label: 'Border Color',
  },
  darkBorder: {
    presetKey: 'darkBorderPreset',
    setterKey: 'setDarkBorderPreset',
    defaultValue: defaultDarkBorderPreset,
    label: 'Dark Border Color',
  },
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Brand',
    items: [
      { light: 'primary', dark: 'darkPrimary' },
      { light: 'accent', dark: 'darkAccent' },
    ],
  },
  {
    title: 'Surfaces',
    items: [
      { light: 'secondary', dark: 'darkSecondary' },
      { light: 'lightBg', dark: 'darkBg' },
      { light: 'lightDark', dark: 'darkLightDark' },
    ],
  },
  {
    title: 'Text',
    items: [
      { light: 'muted', dark: 'darkMuted' },
      { light: 'fg', dark: 'darkFg' },
      { light: 'border', dark: 'darkBorder' },
    ],
  },
  {
    title: 'Status',
    items: [
      { light: 'success', dark: 'darkSuccess' },
      { light: 'warning', dark: 'darkWarning' },
      { light: 'error', dark: 'darkError' },
      { light: 'info', dark: 'darkInfo' },
    ],
  },
];
