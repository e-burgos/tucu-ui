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
  NONE = 'none',
  MINIMAL = 'minimal',
  CLASSIC = 'classic',
}

export type LayoutOptionType = 'none' | 'minimal' | 'classic';

export const LayoutOptions: IThemeItem[] = [
  {
    label: 'Minimal',
    value: LAYOUT_OPTIONS.MINIMAL,
  },
  {
    label: 'None',
    value: LAYOUT_OPTIONS.NONE,
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
  | 'Orange'
  | 'Rose'
  | 'Pink'
  | 'Yellow'
  | 'Lime'
  | 'Teal'
  | 'Cyan'
  | 'Navy'
  | 'Maroon'
  | 'Brown'
  | 'Gray'
  | 'Silver'
  | 'Gold'
  | 'Coral'
  | 'Salmon'
  | 'Chocolate'
  | 'Tan'
  | 'Beige'
  | 'Mint'
  | 'Lavender'
  | 'Violet';

export enum PRESET_LABEL_COLORS {
  GREEN = 'Green',
  BLACK = 'Black',
  BLUE = 'Blue',
  RED = 'Red',
  PURPLE = 'Purple',
  ORANGE = 'Orange',
  ROSE = 'Rose',
  PINK = 'Pink',
  YELLOW = 'Yellow',
  LIME = 'Lime',
  TEAL = 'Teal',
  CYAN = 'Cyan',
  NAVY = 'Navy',
  MAROON = 'Maroon',
  BROWN = 'Brown',
  GRAY = 'Gray',
  SILVER = 'Silver',
  GOLD = 'Gold',
  CORAL = 'Coral',
  SALMON = 'Salmon',
  CHOCOLATE = 'Chocolate',
  TAN = 'Tan',
  BEIGE = 'Beige',
  MINT = 'Mint',
  LAVENDER = 'Lavender',
  VIOLET = 'Violet',
}

export enum PRESET_COLORS {
  GREEN = '#009e60',
  BLACK = '#323743',
  BLUE = '#2a52be',
  RED = '#e34234',
  PURPLE = '#9370DB',
  ORANGE = '#ffa500',
  ROSE = '#ff1493',
  PINK = '#ffc0cb',
  YELLOW = '#ffff00',
  LIME = '#00ff00',
  TEAL = '#008080',
  CYAN = '#00ffff',
  NAVY = '#000080',
  MAROON = '#800000',
  BROWN = '#a52a2a',
  GRAY = '#808080',
  SILVER = '#c0c0c0',
  GOLD = '#ffd700',
  CORAL = '#ff7f50',
  SALMON = '#fa8072',
  CHOCOLATE = '#d2691e',
  TAN = '#d2b48c',
  BEIGE = '#f5f5dc',
  MINT = '#98ff98',
  LAVENDER = '#e6e6fa',
  VIOLET = '#ee82ee',
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
  {
    label: PRESET_LABEL_COLORS.ROSE,
    value: PRESET_COLORS.ROSE,
  },
  {
    label: PRESET_LABEL_COLORS.PINK,
    value: PRESET_COLORS.PINK,
  },
  {
    label: PRESET_LABEL_COLORS.YELLOW,
    value: PRESET_COLORS.YELLOW,
  },
  {
    label: PRESET_LABEL_COLORS.LIME,
    value: PRESET_COLORS.LIME,
  },
  {
    label: PRESET_LABEL_COLORS.TEAL,
    value: PRESET_COLORS.TEAL,
  },
  {
    label: PRESET_LABEL_COLORS.CYAN,
    value: PRESET_COLORS.CYAN,
  },
  {
    label: PRESET_LABEL_COLORS.NAVY,
    value: PRESET_COLORS.NAVY,
  },
  {
    label: PRESET_LABEL_COLORS.MAROON,
    value: PRESET_COLORS.MAROON,
  },
  {
    label: PRESET_LABEL_COLORS.BROWN,
    value: PRESET_COLORS.BROWN,
  },
  {
    label: PRESET_LABEL_COLORS.GRAY,
    value: PRESET_COLORS.GRAY,
  },
  {
    label: PRESET_LABEL_COLORS.SILVER,
    value: PRESET_COLORS.SILVER,
  },
  {
    label: PRESET_LABEL_COLORS.GOLD,
    value: PRESET_COLORS.GOLD,
  },
  {
    label: PRESET_LABEL_COLORS.CORAL,
    value: PRESET_COLORS.CORAL,
  },
  {
    label: PRESET_LABEL_COLORS.SALMON,
    value: PRESET_COLORS.SALMON,
  },
  {
    label: PRESET_LABEL_COLORS.CHOCOLATE,
    value: PRESET_COLORS.CHOCOLATE,
  },
  {
    label: PRESET_LABEL_COLORS.TAN,
    value: PRESET_COLORS.TAN,
  },
  {
    label: PRESET_LABEL_COLORS.BEIGE,
    value: PRESET_COLORS.BEIGE,
  },
  {
    label: PRESET_LABEL_COLORS.MINT,
    value: PRESET_COLORS.MINT,
  },
  {
    label: PRESET_LABEL_COLORS.LAVENDER,
    value: PRESET_COLORS.LAVENDER,
  },
  {
    label: PRESET_LABEL_COLORS.VIOLET,
    value: PRESET_COLORS.VIOLET,
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
  name: 'Tucu',
  secondName: 'UI',
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
