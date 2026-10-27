'use client';

import { useContext, type ReactNode } from 'react';
import { cn } from '../../../libs/cn';
import { useTucuMessages } from '../../../libs/i18n/use-tucu-messages';
import { TucuNavigationContext } from '../../../themes/navigation/tucu-navigation-context';
import type { MarketingLink, MarketingRenderLink } from './marketing-types';

export function isExternalLink(link: MarketingLink): boolean {
  return link.external ?? /^https?:\/\//i.test(link.href);
}

function trimTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function isLinkActive(link: MarketingLink, pathname?: string): boolean {
  if (link.active !== undefined) return link.active;
  if (!pathname || isExternalLink(link)) return false;
  const current = trimTrailingSlash(pathname);
  const target = trimTrailingSlash(link.href.split(/[?#]/)[0]);
  if (current === target) return true;
  return Boolean(link.matchPrefix) && target !== '/' && current.startsWith(`${target}/`);
}

export interface MarketingLinkItemProps {
  link: MarketingLink;
  className?: string;
  activeClassName?: string;
  onNavigate?: () => void;
  renderLink?: MarketingRenderLink;
  children?: ReactNode;
}

export function MarketingLinkItem({
  link,
  className,
  activeClassName,
  onNavigate,
  renderLink,
  children,
}: MarketingLinkItemProps) {
  const navigation = useContext(TucuNavigationContext);
  const messages = useTucuMessages();
  const external = isExternalLink(link);
  const active = isLinkActive(link, navigation?.pathname);

  const content = children ?? (
    <>
      {link.icon}
      <span>{link.label}</span>
      {external && <span className="sr-only">{messages.marketing.externalLink}</span>}
    </>
  );

  const props = {
    href: link.href,
    className: cn(className, active && activeClassName),
    children: content,
    onClick: onNavigate,
    ...(active ? { 'aria-current': 'page' as const } : {}),
    ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  };

  if (renderLink) return <>{renderLink(link, props)}</>;

  if (navigation && !external) {
    const { href, ...rest } = props;
    return <navigation.Link to={href} {...rest} />;
  }

  return <a {...props} />;
}
