import { useContext } from 'react';
import { useInRouterContext } from 'react-router-dom';
import { TucuNavigationContext } from './tucu-navigation-context';
import { useReactRouterNavigation } from './react-router-navigation';
import type { TucuNavigation, TucuRouteParams } from './types';

export function useTucuNavigation(): TucuNavigation {
  const provided = useContext(TucuNavigationContext);
  const inRouter = useInRouterContext();

  if (provided) return provided;
  if (!inRouter) {
    throw new Error(
      'useTucuNavigation must be used within a TucuNavigation provider or a react-router Router'
    );
  }
  // Provider/Router presence is stable for a mounted subtree, so hook order never changes.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useReactRouterNavigation();
}

export function useTucuParams(): TucuRouteParams {
  return useTucuNavigation().useParams();
}
