'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../libs/cn';
import { useTucuMessages } from '../../../libs/i18n/use-tucu-messages';
import { useLockBodyScroll } from '../../../hooks/use-lock-body-scroll';
import { MarketingLinkItem } from './marketing-link';
import type { MarketingLink, MarketingRenderLink } from './marketing-types';

export type MarketingMaxWidth =
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';

const MAX_WIDTH_CLASS: Record<MarketingMaxWidth, string> = {
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-none',
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const DESKTOP_QUERY = '(min-width: 768px)';

const LINK_BASE =
  'inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))] transition-colors hover:text-[var(--tucu-marketing-link-fg-active,var(--tucu-marketing-link-fg-active-default))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';
const LINK_ACTIVE =
  'text-[var(--tucu-marketing-link-fg-active,var(--tucu-marketing-link-fg-active-default))]';

export interface MarketingNavProps {
  /** Brand mark rendered at the start of the bar. */
  logo?: ReactNode;
  /** Destination of the logo link. @default '/' */
  logoHref?: string;
  /** Primary navigation links. */
  links?: MarketingLink[];
  /** Call-to-action area: right side on desktop, bottom of the mobile menu. */
  actions?: ReactNode;
  /** Small actions always visible on the mobile bar (e.g. a theme toggle). */
  mobileActions?: ReactNode;
  /** Keep the bar fixed to the top while scrolling. @default true */
  sticky?: boolean;
  /** Start transparent and gain a background after `scrollThreshold`. @default false */
  transparentUntilScroll?: boolean;
  /** Scroll offset in px that flips the bar to its scrolled state. @default 32 */
  scrollThreshold?: number;
  /** When the backdrop blur applies once scrolled. @default 'desktop' */
  blurOnScroll?: 'desktop' | 'always' | 'never';
  /** Max width of the bar content. @default '7xl' */
  maxWidth?: MarketingMaxWidth;
  /** Horizontal placement of the links column. @default 'center' */
  align?: 'center' | 'start';
  /** Label of the mobile menu button and panel. Defaults to the i18n string. */
  menuLabel?: string;
  /** Label of the mobile menu button while open. Defaults to the i18n string. */
  closeMenuLabel?: string;
  /** Accessible name of the navigation landmark. Defaults to the i18n string. */
  'aria-label'?: string;
  /** Override how links are rendered (custom router). */
  renderLink?: MarketingRenderLink;
  /** Extra classes for the root `<header>`. */
  className?: string;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function useScrolled(threshold: number, enabled: boolean): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!enabled) return undefined;
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold, enabled]);
  return enabled && scrolled;
}

function useCloseOnDesktop(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open || typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [open, close]);
}

export function MarketingNav({
  logo,
  logoHref = '/',
  links = [],
  actions,
  mobileActions,
  sticky = true,
  transparentUntilScroll = false,
  scrollThreshold = 32,
  blurOnScroll = 'desktop',
  maxWidth = '7xl',
  align = 'center',
  menuLabel,
  closeMenuLabel,
  'aria-label': ariaLabel,
  renderLink,
  className,
  ...rest
}: MarketingNavProps) {
  const messages = useTucuMessages();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(scrollThreshold, transparentUntilScroll);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const solid = !transparentUntilScroll || scrolled || open;
  const blurred = blurOnScroll !== 'never' && (scrolled || !transparentUntilScroll);

  useLockBodyScroll(open);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);
  const closeOnDesktop = useCallback(() => close(false), [close]);
  useCloseOnDesktop(open, closeOnDesktop);

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panelRef.current)?.focus();
  }, [open]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const panelItems = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
    );
    const items = toggleRef.current ? [toggleRef.current, ...panelItems] : panelItems;
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    const last = items.length - 1;
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      items[last].focus();
    } else if (!event.shiftKey && (index === -1 || index === last)) {
      event.preventDefault();
      items[0].focus();
    }
  };

  const toggleLabel = open
    ? closeMenuLabel ?? messages.marketing.closeMenu
    : menuLabel ?? messages.marketing.openMenu;

  return (
    <header
      data-tucu="marketing-nav"
      data-scrolled={scrolled ? 'true' : 'false'}
      data-open={open ? 'true' : 'false'}
      onKeyDown={handleKeyDown}
      {...pickDataAndAria(rest)}
      className={cn(
        'z-40 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-200',
        sticky ? 'sticky top-0' : 'relative',
        solid
          ? 'border-[var(--tucu-marketing-nav-border,var(--tucu-marketing-nav-border-default))] bg-[var(--tucu-marketing-nav-bg-scrolled,var(--tucu-marketing-nav-bg-scrolled-default))]'
          : 'border-transparent bg-[var(--tucu-marketing-nav-bg,var(--tucu-marketing-nav-bg-default))]',
        blurred && blurOnScroll === 'always' && 'backdrop-blur-md',
        blurred && blurOnScroll === 'desktop' && 'md:backdrop-blur-md',
        className
      )}
    >
      <div
        data-tucu="marketing-nav-bar"
        className={cn(
          'mx-auto grid min-h-16 w-full grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8',
          align === 'center'
            ? 'md:grid-cols-[1fr_auto_1fr]'
            : 'md:grid-cols-[auto_1fr_auto]',
          MAX_WIDTH_CLASS[maxWidth]
        )}
      >
        <div data-tucu="marketing-nav-logo" className="flex min-w-0 items-center justify-self-start">
          {logo && (
            <MarketingLinkItem
              link={{ label: '', href: logoHref, active: false }}
              className="inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              renderLink={renderLink}
              onNavigate={() => close(false)}
            >
              {logo}
            </MarketingLinkItem>
          )}
        </div>

        <nav
          data-tucu="marketing-nav-links"
          aria-label={ariaLabel ?? messages.marketing.navLabel}
          className={cn('hidden md:block', align === 'start' && 'md:justify-self-start')}
        >
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <MarketingLinkItem
                  link={link}
                  className={LINK_BASE}
                  activeClassName={LINK_ACTIVE}
                  renderLink={renderLink}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div
          data-tucu="marketing-nav-actions"
          className="hidden items-center gap-2 justify-self-end md:flex"
        >
          {actions}
        </div>

        <div className="flex items-center gap-1 justify-self-end md:hidden">
          {mobileActions}
          <button
            ref={toggleRef}
            type="button"
            data-tucu="marketing-nav-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={toggleLabel}
            onClick={() => (open ? close(true) : setOpen(true))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--tucu-marketing-link-fg,var(--tucu-marketing-link-fg-default))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            aria-hidden="true"
            data-tucu="marketing-nav-backdrop"
            className="fixed inset-0 top-16 -z-10 bg-black/30 md:hidden"
            onClick={() => close(true)}
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel ?? messages.marketing.openMenu}
            tabIndex={-1}
            data-tucu="marketing-nav-panel"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--tucu-marketing-nav-border,var(--tucu-marketing-nav-border-default))] bg-[var(--tucu-marketing-footer-bg,var(--tucu-marketing-footer-bg-default))] px-4 py-4 shadow-lg focus:outline-none md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <MarketingLinkItem
                    link={link}
                    className={cn(LINK_BASE, 'w-full py-2 text-base')}
                    activeClassName={LINK_ACTIVE}
                    renderLink={renderLink}
                    onNavigate={() => close(false)}
                  />
                </li>
              ))}
            </ul>
            {actions && (
              <div
                data-tucu="marketing-nav-panel-actions"
                className="mt-4 flex flex-col gap-2 border-t border-[var(--tucu-marketing-nav-border,var(--tucu-marketing-nav-border-default))] pt-4"
              >
                {actions}
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}

function pickDataAndAria(props: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-'))
  );
}

export default MarketingNav;
