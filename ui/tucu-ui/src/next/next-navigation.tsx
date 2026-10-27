'use client';

import React, { forwardRef, useMemo } from 'react';
import Link from 'next/link';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { toHref } from '../themes/navigation/to-href';
import type {
  TucuLinkProps,
  TucuNavigation,
  TucuRouteParams,
  TucuSearchParamsUpdate,
} from '../themes/navigation/types';

const EXTERNAL_HREF = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export const EMPTY_SEARCH_PARAMS = new URLSearchParams();

export function normalizeNextPathname(pathname: string): string {
  if (pathname.length <= 1) return pathname || '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export const NextNavigationLink = forwardRef<HTMLAnchorElement, TucuLinkProps>(
  (
    {
      to,
      replace,
      prefetch,
      reloadDocument,
      state: _state,
      preventScrollReset: _preventScrollReset,
      relative: _relative,
      viewTransition: _viewTransition,
      discover: _discover,
      children,
      ...anchorProps
    },
    ref
  ) => {
    const href = toHref(to);
    if (reloadDocument || EXTERNAL_HREF.test(href)) {
      return (
        <a ref={ref} href={href} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref}
        href={href}
        replace={replace}
        prefetch={prefetch}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }
);
NextNavigationLink.displayName = 'NextNavigationLink';

const useNextRouteParams = (): TucuRouteParams =>
  useParams() as unknown as TucuRouteParams;

export function useNextNavigation(
  searchParams: URLSearchParams
): TucuNavigation {
  const rawPathname = usePathname();
  const router = useRouter();
  const pathname = normalizeNextPathname(rawPathname ?? '/');

  return useMemo<TucuNavigation>(() => {
    const navigate: TucuNavigation['navigate'] = (to, options) => {
      const href = toHref(to);
      if (options?.replace) router.replace(href);
      else router.push(href);
    };

    const setSearchParams = (
      next: TucuSearchParamsUpdate,
      options?: { replace?: boolean }
    ) => {
      const resolved =
        typeof next === 'function'
          ? next(new URLSearchParams(searchParams))
          : next;
      const query = resolved.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      if (options?.replace) router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    };

    return {
      pathname,
      searchParams,
      useParams: useNextRouteParams,
      navigate,
      setSearchParams,
      Link: NextNavigationLink,
    };
  }, [pathname, router, searchParams]);
}

export function useNextSearchParams(): URLSearchParams {
  const searchParams = useSearchParams();
  return useMemo(
    () =>
      searchParams
        ? new URLSearchParams(searchParams.toString())
        : EMPTY_SEARCH_PARAMS,
    [searchParams]
  );
}
