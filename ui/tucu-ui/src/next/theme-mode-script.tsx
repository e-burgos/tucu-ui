import {
  getThemeModeScript,
  type ThemeModeScriptOptions,
} from '../themes/utils/theme-mode-script';

export interface ThemeModeScriptProps extends ThemeModeScriptOptions {
  /** CSP nonce forwarded to the inline script tag. */
  nonce?: string;
}

export function ThemeModeScript({ nonce, ...options }: ThemeModeScriptProps) {
  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: getThemeModeScript(options) }}
    />
  );
}
