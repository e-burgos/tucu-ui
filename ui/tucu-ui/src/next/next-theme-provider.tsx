'use client';

import React, { Suspense } from 'react';
import ThemeWrapper from '../themes/components/theme-provider/theme-wrapper';
import type { ThemeWrapperProps } from '../themes/components/theme-provider/theme-wrapper';
import { TucuNavigationContext } from '../themes/navigation/tucu-navigation-context';
import {
  EMPTY_SEARCH_PARAMS,
  useNextNavigation,
  useNextSearchParams,
} from './next-navigation';

export type NextThemeProviderProps = ThemeWrapperProps;

type ShellProps = NextThemeProviderProps & { searchParams: URLSearchParams };

const NavigationShell = ({ searchParams, ...wrapperProps }: ShellProps) => (
  <TucuNavigationContext.Provider value={useNextNavigation(searchParams)}>
    <ThemeWrapper {...(wrapperProps as ThemeWrapperProps)} />
  </TucuNavigationContext.Provider>
);

const SearchParamsShell = (props: NextThemeProviderProps) => (
  <NavigationShell {...props} searchParams={useNextSearchParams()} />
);

export function NextThemeProvider(
  props: NextThemeProviderProps
): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <NavigationShell {...props} searchParams={EMPTY_SEARCH_PARAMS} />
      }
    >
      <SearchParamsShell {...props} />
    </Suspense>
  );
}

export default NextThemeProvider;
