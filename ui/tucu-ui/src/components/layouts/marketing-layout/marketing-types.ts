import type { ReactNode } from 'react';

export interface MarketingLink {
  /** Visible link content. */
  label: ReactNode;
  /** Destination. Absolute http(s) URLs are treated as external. */
  href: string;
  /** Forces external behaviour (new tab, `noopener noreferrer`). */
  external?: boolean;
  /** Optional icon rendered before the label. */
  icon?: ReactNode;
  /** Explicit active state; when omitted it is derived from the navigation pathname. */
  active?: boolean;
  /** Match any path under `href` as active instead of an exact match. */
  matchPrefix?: boolean;
}

export interface MarketingLinkRenderProps {
  href: string;
  className: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  'aria-current'?: 'page';
  onClick?: () => void;
}

export type MarketingRenderLink = (
  link: MarketingLink,
  props: MarketingLinkRenderProps
) => ReactNode;
