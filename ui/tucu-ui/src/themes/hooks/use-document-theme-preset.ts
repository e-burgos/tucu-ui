'use client';

import { useEffect, useMemo } from 'react';
import {
  themePresetToAttributes,
  themePresetToCssVars,
  type ThemePreset,
} from '../presets';
import { resolvePresetReference } from '../presets/theme-preset-registry';
import { useTheme } from './use-theme';

const STORE_MANAGED_VARS = new Set(['--color-brand', '--color-primary']);

const isStoreManagedVar = (name: string) =>
  name.startsWith('--color-semantic-') || STORE_MANAGED_VARS.has(name);

export function useDocumentThemePreset(
  presetProp: string | ThemePreset | undefined
): void {
  const mode = useTheme((state) => state.mode);
  const preset = useMemo(() => resolvePresetReference(presetProp), [presetProp]);

  useEffect(() => {
    if (!preset) return;
    useTheme.setState({
      primaryPreset: { label: preset.name, value: preset.accent },
      darkPrimaryPreset: {
        label: preset.name,
        value: preset.darkAccent ?? preset.accent,
      },
    });
  }, [preset]);

  useEffect(() => {
    if (!preset) return;
    const html = document.documentElement;
    const cssVars = Object.entries(
      themePresetToCssVars(preset, mode === 'dark' ? 'dark' : 'light')
    ).filter(([name]) => !isStoreManagedVar(name));
    const attributes = Object.entries(themePresetToAttributes(preset));

    cssVars.forEach(([name, value]) => html.style.setProperty(name, value));
    attributes.forEach(([name, value]) => html.setAttribute(name, value));

    return () => {
      cssVars.forEach(([name]) => html.style.removeProperty(name));
      attributes.forEach(([name]) => html.removeAttribute(name));
    };
  }, [preset, mode]);
}
