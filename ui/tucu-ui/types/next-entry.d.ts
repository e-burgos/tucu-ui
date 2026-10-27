import type { JSX } from 'react';
import type { ThemeModeScriptOptions, ThemeWrapperProps } from '../index';

export type NextThemeProviderProps = ThemeWrapperProps;

export declare function NextThemeProvider(
  props: NextThemeProviderProps
): JSX.Element;

export interface ThemeModeScriptProps extends ThemeModeScriptOptions {
  nonce?: string;
}

export declare function ThemeModeScript(
  props: ThemeModeScriptProps
): JSX.Element;
