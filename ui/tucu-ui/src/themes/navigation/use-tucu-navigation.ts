'use client';

import { useContext } from 'react';
import { TucuNavigationContext } from './tucu-navigation-context';
import type { TucuNavigation, TucuRouteParams } from './types';

export interface RouterNavigationFallback {
  useIsInsideRouter: () => boolean;
  useNavigation: () => TucuNavigation;
}

let routerFallback: RouterNavigationFallback | null = null;

export function registerRouterNavigationFallback(
  fallback: RouterNavigationFallback
): void {
  routerFallback = fallback;
}

export function useTucuNavigation(): TucuNavigation {
  const provided = useContext(TucuNavigationContext);
  if (provided) return provided;

  if (!routerFallback || !routerFallback.useIsInsideRouter()) {
    throw new Error(
      'useTucuNavigation must be used within a TucuNavigation provider or a react-router Router'
    );
  }
  // Provider/Router presence is stable for a mounted subtree, so hook order never changes.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return routerFallback.useNavigation();
}

export function useTucuParams(): TucuRouteParams {
  return useTucuNavigation().useParams();
}
