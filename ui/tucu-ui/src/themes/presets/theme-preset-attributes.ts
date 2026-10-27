import type { ThemePreset } from './theme-preset.types';

export function themePresetToAttributes(
  preset: ThemePreset
): Record<string, string> {
  const attributes: Record<string, string> = {};
  if (preset.cards) attributes['data-tucu-cards'] = preset.cards;
  if (preset.buttons) attributes['data-tucu-buttons'] = preset.buttons;
  if (preset.fontFamily) attributes['data-tucu-font'] = '';
  if (preset.headingFontFamily) attributes['data-tucu-heading-font'] = '';
  return attributes;
}
