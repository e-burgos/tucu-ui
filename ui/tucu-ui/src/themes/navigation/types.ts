import type { AnchorHTMLAttributes, ComponentType, RefAttributes } from 'react';

export interface TucuPartialPath {
  pathname?: string;
  search?: string;
  hash?: string;
}

export type TucuTo = string | TucuPartialPath;

export interface TucuLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: TucuTo;
  replace?: boolean;
  state?: unknown;
  prefetch?: boolean;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: 'route' | 'path';
  viewTransition?: boolean;
  discover?: 'render' | 'none';
}

export interface TucuNavigateOptions {
  replace?: boolean;
  state?: unknown;
}

export type TucuSearchParamsUpdate =
  | URLSearchParams
  | ((previous: URLSearchParams) => URLSearchParams);

export type TucuRouteParams = Readonly<Record<string, string | undefined>>;

export interface TucuNavigation {
  pathname: string;
  searchParams: URLSearchParams;
  useParams: () => TucuRouteParams;
  navigate: (to: TucuTo, options?: TucuNavigateOptions) => void;
  setSearchParams: (
    next: TucuSearchParamsUpdate,
    options?: { replace?: boolean }
  ) => void;
  Link: ComponentType<TucuLinkProps & RefAttributes<HTMLAnchorElement>>;
}
