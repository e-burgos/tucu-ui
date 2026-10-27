'use client';

import { useTheme } from '../../themes/hooks/use-theme';
import { getTucuMessages, resolveTucuLang, TucuLang, TucuMessages } from './messages';

/** Current theme lang, normalized to a lang tucu-ui ships strings for. */
export function useTucuLang(): TucuLang {
  return resolveTucuLang(useTheme((state) => state.lang));
}

/** Built-in UI strings for the current theme lang. */
export function useTucuMessages(): TucuMessages {
  return getTucuMessages(useTucuLang());
}
