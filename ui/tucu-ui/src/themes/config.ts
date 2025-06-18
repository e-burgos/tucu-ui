import { LogoPropTypes } from '../components/logos/logo';
export interface IThemeItem {
  label: string;
  value: string;
}

export interface ISettingAction {
  disabledMode?: boolean;
  disabledLayout?: boolean;
  disabledDirection?: boolean;
  disabledPreset?: boolean;
}

export type MODE = 'light' | 'dark';

export type DIRECTION = 'ltr' | 'rtl';

export type LogoType = LogoPropTypes;

export enum LAYOUT_OPTIONS {
  AUTH = 'auth',
  MODERN = 'modern',
  MINIMAL = 'minimal',
  RETRO = 'retro',
  CLASSIC = 'classic',
}

export const LayoutOptions: IThemeItem[] = [
  {
    label: 'Modern',
    value: LAYOUT_OPTIONS.MODERN,
  },
  {
    label: 'Minimal',
    value: LAYOUT_OPTIONS.MINIMAL,
  },
  {
    label: 'Retro',
    value: LAYOUT_OPTIONS.RETRO,
  },
  {
    label: 'Classic',
    value: LAYOUT_OPTIONS.CLASSIC,
  },
];

export type PresetColorType =
  | 'Green'
  | 'Black'
  | 'Blue'
  | 'Red'
  | 'Purple'
  | 'Orange';

export enum PRESET_LABEL_COLORS {
  GREEN = 'Green',
  BLACK = 'Black',
  BLUE = 'Blue',
  RED = 'Red',
  PURPLE = 'Purple',
  ORANGE = 'Orange',
}

export enum PRESET_COLORS {
  GREEN = '#009e60',
  BLACK = '#323743',
  BLUE = '#2a52be',
  RED = '#e34234',
  PURPLE = '#9370DB',
  ORANGE = '#ffa500',
}

export const ColorPreset: IThemeItem[] = [
  {
    label: PRESET_LABEL_COLORS.GREEN,
    value: PRESET_COLORS.GREEN,
  },
  {
    label: PRESET_LABEL_COLORS.BLACK,
    value: PRESET_COLORS.BLACK,
  },
  {
    label: PRESET_LABEL_COLORS.BLUE,
    value: PRESET_COLORS.BLUE,
  },
  {
    label: PRESET_LABEL_COLORS.RED,
    value: PRESET_COLORS.RED,
  },
  {
    label: PRESET_LABEL_COLORS.PURPLE,
    value: PRESET_COLORS.PURPLE,
  },
  {
    label: PRESET_LABEL_COLORS.ORANGE,
    value: PRESET_COLORS.ORANGE,
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

export const defaultLogo: LogoType = {
  isoType: false,
  path: '/',
  name: 'Site',
  secondName: 'Name',
};

export const defaultSettingActions: ISettingAction = {
  disabledMode: false,
  disabledLayout: false,
  disabledDirection: false,
  disabledPreset: false,
};

export const defaultLayout = LAYOUT_OPTIONS.MINIMAL;

export const defaultColorPreset = ColorPreset[0];

export const defaultDirection = 'ltr';

export const defaultMode = 'dark';
