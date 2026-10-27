'use client';

import { toHref, useTucuNavigation } from '../../themes/navigation/core';
import type { TucuLinkProps } from '../../themes/navigation/core';

const isExternalUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return /^https?:\/\//i.test(url);
};

const ROUTER_ONLY_PROPS = [
  'replace',
  'state',
  'prefetch',
  'reloadDocument',
  'preventScrollReset',
  'relative',
  'viewTransition',
  'discover',
] as const;

const omitRouterOnlyProps = (props: Omit<TucuLinkProps, 'to'>) =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !(ROUTER_ONLY_PROPS as readonly string[]).includes(key)
    )
  ) as React.AnchorHTMLAttributes<HTMLAnchorElement>;

const InternalAnchorLink: React.FC<TucuLinkProps> = (props) => {
  const { Link } = useTucuNavigation();
  return <Link {...props} />;
};

export const AnchorLink: React.FC<TucuLinkProps> = ({ to, ...props }) => {
  const href = toHref(to);

  if (isExternalUrl(href)) {
    const anchorProps = omitRouterOnlyProps(props);
    return (
      <a
        rel="noopener noreferrer"
        title={anchorProps.title ?? ''}
        href={href}
        {...anchorProps}
      />
    );
  }

  return <InternalAnchorLink to={to} {...props} />;
};

export default AnchorLink;
