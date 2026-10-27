import type { ReactNode } from 'react';
import { cn } from '../../../libs/cn';
import { MarketingFooter, type MarketingFooterProps } from './marketing-footer';
import { MarketingNav, type MarketingNavProps } from './marketing-nav';
import { MarketingSkipLink } from './marketing-skip-link';
import type { MarketingRenderLink } from './marketing-types';

export interface MarketingLayoutProps {
  /** Props forwarded to the top navigation bar. Omit to render no bar. */
  nav?: MarketingNavProps;
  /** Props forwarded to the footer. Omit to render no footer. */
  footer?: MarketingFooterProps;
  /** Page content, rendered inside `<main>`. */
  children?: ReactNode;
  /** Id of the `<main>` element and target of the skip link. @default 'main-content' */
  mainId?: string;
  /** Skip-link text. Defaults to the i18n string. */
  skipLinkLabel?: string;
  /** Router override applied to nav and footer links unless they set their own. */
  renderLink?: MarketingRenderLink;
  /** Extra classes for the root element. */
  className?: string;
  /** Extra classes for `<main>`. */
  mainClassName?: string;
}

export function MarketingLayout({
  nav,
  footer,
  children,
  mainId = 'main-content',
  skipLinkLabel,
  renderLink,
  className,
  mainClassName,
  ...rest
}: MarketingLayoutProps) {
  const dataAndAria = Object.fromEntries(
    Object.entries(rest).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-'))
  );

  return (
    <div
      data-tucu="marketing-layout"
      {...dataAndAria}
      className={cn('flex min-h-dvh flex-col', className)}
    >
      <MarketingSkipLink targetId={mainId} label={skipLinkLabel} />
      {nav && <MarketingNav renderLink={renderLink} {...nav} />}
      <main id={mainId} tabIndex={-1} className={cn('flex-1 focus:outline-none', mainClassName)}>
        {children}
      </main>
      {footer && <MarketingFooter renderLink={renderLink} {...footer} />}
    </div>
  );
}

export default MarketingLayout;
