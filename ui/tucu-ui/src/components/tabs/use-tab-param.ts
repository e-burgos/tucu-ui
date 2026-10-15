import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UseTabParamOptions<T extends string> {
  /** Allowed tab values, in order. */
  values: readonly T[];
  /** Search param that stores the tab. Default `tab`. */
  param?: string;
  /** Value used when the param is missing or unknown. Default `values[0]`. */
  defaultValue?: T;
  /**
   * Replace the history entry instead of pushing one. Default `false`, so
   * the browser back button walks through tabs.
   */
  replace?: boolean;
}

/**
 * Keeps the selected tab in the URL (`?tab=...`), so it survives reloads,
 * can be linked to, and follows back/forward navigation. The URL is the
 * only source of truth: there is no local state to drift out of sync.
 * Works with any tab UI (TabGroup, segmented controls, custom buttons).
 * Must be used inside the router (ThemeProvider already provides it).
 *
 * @example
 * const [tab, setTab] = useTabParam({ values: ['general', 'branches'] as const });
 * <TabGroup selectedIndex={TABS.indexOf(tab)} onChange={(i) => setTab(TABS[i])} />
 */
export function useTabParam<T extends string>({
  values,
  param = 'tab',
  defaultValue,
  replace = false,
}: UseTabParamOptions<T>): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const fallback = (defaultValue ?? values[0]) as T;
  const current = searchParams.get(param);

  const value = useMemo(
    () =>
      current !== null && (values as readonly string[]).includes(current)
        ? (current as T)
        : fallback,
    [current, values, fallback]
  );

  const setValue = useCallback(
    (next: T) => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);
          params.set(param, next);
          return params;
        },
        { replace }
      );
    },
    [param, replace, setSearchParams]
  );

  return [value, setValue];
}

export default useTabParam;
