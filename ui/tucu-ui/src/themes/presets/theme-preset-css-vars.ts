import { readableTextColorOn } from './color-contrast';
import type {
  ThemeButtonShape,
  ThemeCardStyle,
  ThemePreset,
  ThemePresetMode,
  ThemeRadius,
} from './theme-preset.types';

type CssVars = Record<string, string>;

const RADIUS_VALUES: Record<ThemeRadius, string> = {
  none: '0',
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
};

const PILL_RADIUS = '9999px';

const CARD_VARS: Record<ThemeCardStyle, Record<ThemePresetMode, CssVars>> = {
  glass: {
    light: {
      '--tucu-card-bg': 'rgba(255, 255, 255, 0.6)',
      '--tucu-card-border': '1px solid rgba(255, 255, 255, 0.7)',
      '--tucu-card-shadow': '0 8px 32px rgba(15, 23, 42, 0.08)',
      '--tucu-card-blur': '16px',
    },
    dark: {
      '--tucu-card-bg': 'rgba(255, 255, 255, 0.06)',
      '--tucu-card-border': '1px solid rgba(255, 255, 255, 0.12)',
      '--tucu-card-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
      '--tucu-card-blur': '16px',
    },
  },
  solid: {
    light: {
      '--tucu-card-bg': '#ffffff',
      '--tucu-card-border': '1px solid transparent',
      '--tucu-card-shadow': '0 1px 3px rgba(15, 23, 42, 0.12)',
      '--tucu-card-blur': '0px',
    },
    dark: {
      '--tucu-card-bg': '#1f2024',
      '--tucu-card-border': '1px solid transparent',
      '--tucu-card-shadow': '0 1px 3px rgba(0, 0, 0, 0.5)',
      '--tucu-card-blur': '0px',
    },
  },
  outlined: {
    light: {
      '--tucu-card-bg': 'transparent',
      '--tucu-card-border': '1px solid rgba(17, 24, 39, 0.18)',
      '--tucu-card-shadow': 'none',
      '--tucu-card-blur': '0px',
    },
    dark: {
      '--tucu-card-bg': 'transparent',
      '--tucu-card-border': '1px solid rgba(255, 255, 255, 0.2)',
      '--tucu-card-shadow': 'none',
      '--tucu-card-blur': '0px',
    },
  },
};

const isCustomProperty = (name: string) => name.startsWith('--');

const accentFor = (preset: ThemePreset, mode: ThemePresetMode): string =>
  mode === 'dark' ? preset.darkAccent ?? preset.accent : preset.accent;

const controlRadiusFor = (
  buttons: ThemeButtonShape | undefined,
  radius: ThemeRadius | undefined
): string | undefined => {
  if (buttons === 'pill') return PILL_RADIUS;
  if (buttons === 'square') return RADIUS_VALUES.none;
  return radius ? RADIUS_VALUES[radius] : undefined;
};

const accentVars = (preset: ThemePreset, mode: ThemePresetMode): CssVars => {
  const accent = accentFor(preset, mode);
  const darkAccent = accentFor(preset, 'dark');
  return {
    '--tucu-accent': accent,
    '--tucu-accent-contrast': readableTextColorOn(accent),
    '--color-semantic-bg-primary': accent,
    '--color-semantic-fg-primary': accent,
    '--color-semantic-dark-bg-primary': darkAccent,
    '--color-semantic-dark-fg-primary': darkAccent,
    '--color-brand': accent,
    '--color-primary': accent,
  };
};

const shapeVars = (preset: ThemePreset): CssVars => {
  const vars: CssVars = {};
  if (preset.radius) vars['--tucu-radius'] = RADIUS_VALUES[preset.radius];
  const controlRadius = controlRadiusFor(preset.buttons, preset.radius);
  if (controlRadius !== undefined) vars['--tucu-control-radius'] = controlRadius;
  return vars;
};

const fontVars = (preset: ThemePreset): CssVars => {
  const vars: CssVars = {};
  if (preset.fontFamily) vars['--tucu-font'] = preset.fontFamily;
  if (preset.headingFontFamily) {
    vars['--tucu-heading-font'] = preset.headingFontFamily;
  }
  return vars;
};

const cardVars = (preset: ThemePreset, mode: ThemePresetMode): CssVars =>
  preset.cards ? CARD_VARS[preset.cards][mode] : {};

const customTokenVars = (preset: ThemePreset, mode: ThemePresetMode): CssVars =>
  Object.fromEntries(
    Object.entries(preset.tokens?.[mode] ?? {}).filter(([name]) =>
      isCustomProperty(name)
    )
  );

export function themePresetToCssVars(
  preset: ThemePreset,
  mode: ThemePresetMode
): Record<string, string> {
  return {
    ...accentVars(preset, mode),
    ...shapeVars(preset),
    ...fontVars(preset),
    ...cardVars(preset, mode),
    ...customTokenVars(preset, mode),
  };
}
