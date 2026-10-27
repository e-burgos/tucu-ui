import type { ReactNode } from 'react';
import { cn } from '../../../libs/cn';
import { MarketingLinkItem } from './marketing-link';
import type { MarketingLink, MarketingRenderLink } from './marketing-types';

export interface MarketingFooterGroup {
  /** Group heading; used as the accessible name of its `<nav>` when a string. */
  title: ReactNode;
  /** Links listed under the heading. */
  links: MarketingLink[];
}

export interface MarketingFooterSocial {
  /** Accessible name of the icon-only link. */
  label: string;
  /** Destination; opens in a new tab. */
  href: string;
  /** Icon rendered inside the link. */
  icon: ReactNode;
}

export interface MarketingFooterProps {
  /** Brand mark at the top of the brand column. */
  logo?: ReactNode;
  /** Short description under the logo. */
  description?: ReactNode;
  /** Link groups, one column each. */
  groups?: MarketingFooterGroup[];
  /** Social links shown as icon buttons in the brand column. */
  socials?: MarketingFooterSocial[];
  /** Copyright / legal line. */
  legal?: ReactNode;
  /** Extra content on the bottom row, next to the legal line. */
  bottom?: ReactNode;
  /** Number of link columns; derived from the group count when omitted. */
  columns?: 1 | 2 | 3 | 4;
  /** Override how links are rendered (custom router). */
  renderLink?: MarketingRenderLink;
  /** Extra classes for the root `<footer>`. */
  className?: string;
}

const COLUMN_CLASS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const FOOTER_LINK =
  'inline-flex min-h-11 items-center gap-2 text-sm text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))] transition-colors hover:text-[var(--tucu-marketing-link-fg-active,var(--tucu-marketing-link-fg-active-default))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';
const FOOTER_LINK_ACTIVE =
  'text-[var(--tucu-marketing-link-fg-active,var(--tucu-marketing-link-fg-active-default))]';

export function MarketingFooter({
  logo,
  description,
  groups = [],
  socials = [],
  legal,
  bottom,
  columns,
  renderLink,
  className,
  ...rest
}: MarketingFooterProps) {
  const linkColumns = Math.min(4, Math.max(1, columns ?? groups.length)) as 1 | 2 | 3 | 4;
  const hasBrand = Boolean(logo || description || socials.length);
  const hasBottom = Boolean(legal || bottom);
  const dataAndAria = Object.fromEntries(
    Object.entries(rest).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-'))
  );

  return (
    <footer
      data-tucu="marketing-footer"
      {...dataAndAria}
      className={cn(
        'w-full border-t border-[var(--tucu-marketing-footer-border,var(--tucu-marketing-footer-border-default))] bg-[var(--tucu-marketing-footer-bg,var(--tucu-marketing-footer-bg-default))]',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          {hasBrand && (
            <div data-tucu="marketing-footer-brand" className="flex flex-col gap-4">
              {logo}
              {description && (
                <p className="max-w-sm text-sm text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))]">
                  {description}
                </p>
              )}
              {socials.length > 0 && (
                <ul data-tucu="marketing-footer-socials" className="flex flex-wrap gap-1">
                  {socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))] transition-colors hover:text-[var(--tucu-marketing-link-fg-active,var(--tucu-marketing-link-fg-active-default))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {social.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {groups.length > 0 && (
            <div
              data-tucu="marketing-footer-groups"
              className={cn(
                'grid grid-cols-2 gap-8',
                COLUMN_CLASS[linkColumns],
                !hasBrand && 'md:col-span-2'
              )}
            >
              {groups.map((group, index) => (
                <nav
                  key={index}
                  data-tucu="marketing-footer-group"
                  aria-label={typeof group.title === 'string' ? group.title : undefined}
                >
                  <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <MarketingLinkItem
                          link={link}
                          className={FOOTER_LINK}
                          activeClassName={FOOTER_LINK_ACTIVE}
                          renderLink={renderLink}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          )}
        </div>

        {hasBottom && (
          <div
            data-tucu="marketing-footer-bottom"
            className="mt-10 flex flex-col gap-3 border-t border-[var(--tucu-marketing-footer-border,var(--tucu-marketing-footer-border-default))] pt-6 text-sm text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))] sm:flex-row sm:items-center sm:justify-between"
          >
            {legal && <p>{legal}</p>}
            {bottom}
          </div>
        )}
      </div>
    </footer>
  );
}

export default MarketingFooter;
