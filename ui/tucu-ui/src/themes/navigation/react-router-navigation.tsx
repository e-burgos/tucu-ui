'use client';

import React, { forwardRef, useMemo } from 'react';
import {
  Link as RouterLink,
  useInRouterContext,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { TucuNavigationContext } from './tucu-navigation-context';
import { registerRouterNavigationFallback } from './use-tucu-navigation';
import type { TucuLinkProps, TucuNavigation } from './types';

const ReactRouterLink = forwardRef<HTMLAnchorElement, TucuLinkProps>(
  ({ prefetch: _prefetch, ...props }, ref) => (
    <RouterLink ref={ref} {...props} />
  )
);
ReactRouterLink.displayName = 'ReactRouterLink';

export function useReactRouterNavigation(): TucuNavigation {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return useMemo(
    () => ({
      pathname,
      searchParams,
      useParams,
      navigate,
      setSearchParams,
      Link: ReactRouterLink,
    }),
    [pathname, searchParams, navigate, setSearchParams]
  );
}

export const ReactRouterNavigationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <TucuNavigationContext.Provider value={useReactRouterNavigation()}>
    {children}
  </TucuNavigationContext.Provider>
);

registerRouterNavigationFallback({
  useIsInsideRouter: useInRouterContext,
  useNavigation: useReactRouterNavigation,
});
