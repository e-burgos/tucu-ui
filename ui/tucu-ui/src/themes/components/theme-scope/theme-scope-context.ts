'use client';

import { createContext, useContext } from 'react';
import type { ThemePreset } from '../../presets';

export interface ThemeScopeValue {
  preset?: ThemePreset;
  mode: 'light' | 'dark';
}

export const ThemeScopeContext = createContext<ThemeScopeValue | null>(null);

/** Preset and resolved mode of the closest `ThemeScope`, or `null` outside one. */
export function useThemeScope(): ThemeScopeValue | null {
  return useContext(ThemeScopeContext);
}
