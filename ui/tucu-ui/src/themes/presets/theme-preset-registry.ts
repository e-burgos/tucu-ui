import { BUILT_IN_THEME_PRESETS } from './built-in-theme-presets';
import { isHexColor } from './color-contrast';
import type { ThemePreset } from './theme-preset.types';

const registry = new Map<string, ThemePreset>();

const assertValidAccent = (presetName: string, field: string, value: string) => {
  if (!isHexColor(value)) {
    throw new Error(
      `Theme preset "${presetName}": ${field} must be a hex color (#rgb or #rrggbb), received "${value}"`
    );
  }
};

export function defineThemePreset(preset: ThemePreset): ThemePreset {
  if (!preset.name) {
    throw new Error('Theme preset requires a name');
  }
  assertValidAccent(preset.name, 'accent', preset.accent);
  if (preset.darkAccent !== undefined) {
    assertValidAccent(preset.name, 'darkAccent', preset.darkAccent);
  }
  return preset;
}

export function registerThemePresets(...presets: ThemePreset[]): void {
  for (const preset of presets) {
    registry.set(preset.name, defineThemePreset(preset));
  }
}

export function getThemePreset(name: string): ThemePreset | undefined {
  return registry.get(name);
}

export function listThemePresets(): ThemePreset[] {
  return Array.from(registry.values());
}

export function resetThemePresets(): void {
  registry.clear();
  registerThemePresets(...BUILT_IN_THEME_PRESETS);
}

export function resolvePresetReference(
  reference: string | ThemePreset | undefined
): ThemePreset | undefined {
  return typeof reference === 'string' ? getThemePreset(reference) : reference;
}

resetThemePresets();
