import React from 'react';
import { cn } from '../../../libs/cn';
import { GlassPanel } from '../../common/glass-panel';

export interface SplitAuthHighlight {
  /** Icon shown before the highlight text. */
  icon?: React.ReactNode;
  /** Highlight text. */
  text: React.ReactNode;
}

export interface SplitAuthBrand {
  /** Logo element shown at the top of the brand column and in the compact mobile header. */
  logo?: React.ReactNode;
  /** Brand name rendered next to the logo. */
  name?: React.ReactNode;
  /** Large headline of the brand column. */
  headline?: React.ReactNode;
  /** Supporting paragraph under the headline. */
  lead?: React.ReactNode;
  /** Bulleted selling points rendered as a list. */
  highlights?: SplitAuthHighlight[];
  /** Bottom line of the brand column, e.g. a copyright notice. */
  footer?: React.ReactNode;
  /** Decorative layer rendered behind the brand column content (aria-hidden). */
  background?: React.ReactNode;
}

export type SplitAuthBrandPosition = 'start' | 'end';
export type SplitAuthVariant = 'split' | 'centered';
export type SplitAuthSurface = 'glass' | 'solid' | 'plain';
export type SplitAuthBreakpoint = 'md' | 'lg';

export interface SplitAuthLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Brand column content. */
  brand?: SplitAuthBrand;
  /** Heading of the form column, rendered as an h1. */
  title?: React.ReactNode;
  /** Text under the title. */
  subtitle?: React.ReactNode;
  /** Icon shown above the title. */
  icon?: React.ReactNode;
  /** Form content, typically a SignInForm or SignUpForm. */
  children?: React.ReactNode;
  /** Content under the form, e.g. a link to the other auth screen. */
  footer?: React.ReactNode;
  /** Side where the brand column sits in the split variant. */
  brandPosition?: SplitAuthBrandPosition;
  /** `split` shows brand and form side by side; `centered` shows a single card with a compact brand on top. */
  variant?: SplitAuthVariant;
  /** Container material: `glass` uses GlassPanel, `solid` a plain card surface, `plain` no container styling. */
  surface?: SplitAuthSurface;
  /** Centers the form column text in the split variant. */
  centered?: boolean;
  /** Max width of the container as a CSS length; defaults to 56rem (split) or 28rem (centered). */
  maxWidth?: string;
  /** Viewport width from which the brand column appears. */
  breakpoint?: SplitAuthBreakpoint;
  /** Extra classes for the page wrapper. */
  className?: string;
  /** Extra classes for the form column. */
  formClassName?: string;
  /** Extra classes for the brand column. */
  brandClassName?: string;
}

const brandColumnVisibility: Record<SplitAuthBreakpoint, string> = {
  md: 'hidden md:flex',
  lg: 'hidden lg:flex',
};

const compactBrandVisibility: Record<SplitAuthBreakpoint, string> = {
  md: 'md:hidden',
  lg: 'lg:hidden',
};

const splitGrid: Record<SplitAuthBreakpoint, string> = {
  md: 'md:grid-cols-2',
  lg: 'lg:grid-cols-2',
};

const brandOrderEnd: Record<SplitAuthBreakpoint, string> = {
  md: 'md:order-last',
  lg: 'lg:order-last',
};

const textAlignment: Record<SplitAuthBreakpoint, string> = {
  md: 'text-center md:text-left',
  lg: 'text-center lg:text-left',
};

const iconAlignment: Record<SplitAuthBreakpoint, string> = {
  md: 'justify-center md:justify-start',
  lg: 'justify-center lg:justify-start',
};

const surfaceClasses: Record<Exclude<SplitAuthSurface, 'glass'>, string> = {
  solid:
    'rounded-lg border border-gray-200 bg-white shadow-card dark:border-gray-700 dark:bg-light-dark',
  plain: '',
};

function BrandIdentity({
  brand,
  className,
}: {
  brand: SplitAuthBrand;
  className?: string;
}) {
  if (!brand.logo && !brand.name) return null;
  return (
    <div
      data-tucu="split-auth-layout-identity"
      className={cn('flex items-center gap-3', className)}
    >
      {brand.logo}
      {brand.name && (
        <span className="text-lg font-semibold">{brand.name}</span>
      )}
    </div>
  );
}

function BrandHighlights({ items }: { items: SplitAuthHighlight[] }) {
  return (
    <ul data-tucu="split-auth-layout-highlights" className="mt-8 space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-sm">
          {item.icon && (
            <span aria-hidden="true" className="mt-0.5 shrink-0">
              {item.icon}
            </span>
          )}
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function BrandColumn({
  brand,
  breakpoint,
  brandPosition,
  className,
}: {
  brand: SplitAuthBrand;
  breakpoint: SplitAuthBreakpoint;
  brandPosition: SplitAuthBrandPosition;
  className?: string;
}) {
  return (
    <aside
      data-tucu="split-auth-layout-brand"
      className={cn(
        'relative flex-col justify-between overflow-hidden p-10',
        'bg-[var(--tucu-auth-brand-bg,var(--tucu-auth-brand-bg-default))]',
        'text-[var(--tucu-auth-brand-fg,var(--tucu-auth-brand-fg-default))]',
        brandColumnVisibility[breakpoint],
        brandPosition === 'end' && brandOrderEnd[breakpoint],
        className
      )}
    >
      {brand.background && (
        <div
          aria-hidden="true"
          data-tucu="split-auth-layout-background"
          className="pointer-events-none absolute inset-0"
        >
          {brand.background}
        </div>
      )}
      <div className="relative">
        <BrandIdentity brand={brand} />
        <div className="mt-16">
          {brand.headline && (
            <p className="text-3xl font-bold leading-tight">{brand.headline}</p>
          )}
          {brand.lead && (
            <p className="mt-4 text-base text-[var(--tucu-auth-brand-muted,var(--tucu-auth-brand-muted-default))]">
              {brand.lead}
            </p>
          )}
          {brand.highlights && brand.highlights.length > 0 && (
            <BrandHighlights items={brand.highlights} />
          )}
        </div>
      </div>
      {brand.footer && (
        <div className="relative mt-10 text-xs text-[var(--tucu-auth-brand-muted,var(--tucu-auth-brand-muted-default))]">
          {brand.footer}
        </div>
      )}
    </aside>
  );
}

export function SplitAuthLayout({
  brand,
  title,
  subtitle,
  icon,
  children,
  footer,
  brandPosition = 'start',
  variant = 'split',
  surface = 'glass',
  centered = false,
  maxWidth,
  breakpoint = 'lg',
  className,
  formClassName,
  brandClassName,
  ...props
}: SplitAuthLayoutProps) {
  const isSplit = variant === 'split';
  const showBrandColumn = isSplit && !!brand;
  const resolvedMaxWidth = maxWidth ?? (isSplit ? '56rem' : '28rem');
  const alignment =
    centered || !isSplit ? 'text-center' : textAlignment[breakpoint];

  const containerClassName = cn(
    'w-full overflow-hidden',
    showBrandColumn && cn('grid grid-cols-1', splitGrid[breakpoint]),
    surface !== 'glass' && surfaceClasses[surface]
  );

  const content = (
    <>
      {showBrandColumn && (
        <BrandColumn
          brand={brand}
          breakpoint={breakpoint}
          brandPosition={brandPosition}
          className={brandClassName}
        />
      )}
      <div
        data-tucu="split-auth-layout-form"
        className={cn(
          'flex flex-col justify-center p-6 sm:p-10',
          alignment,
          formClassName
        )}
      >
        {brand && (
          <BrandIdentity
            brand={brand}
            className={cn(
              'mb-8',
              isSplit
                ? cn('justify-center', compactBrandVisibility[breakpoint])
                : 'justify-center'
            )}
          />
        )}
        {icon && (
          <div
            data-tucu="split-auth-layout-icon"
            className={cn(
              'mb-4 flex',
              centered || !isSplit
                ? 'justify-center'
                : iconAlignment[breakpoint]
            )}
          >
            {icon}
          </div>
        )}
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
        <div className={cn((title || subtitle ? 'mt-6' : undefined), 'text-left')}>
          {children}
        </div>
        {footer && (
          <div
            data-tucu="split-auth-layout-footer"
            className="mt-6 border-t border-[var(--tucu-auth-divider,var(--tucu-auth-divider-default))] pt-6 text-sm"
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      {...props}
      data-tucu="split-auth-layout"
      data-variant={variant}
      data-surface={surface}
      className={cn(
        'flex min-h-dvh items-center justify-center bg-page p-4',
        className
      )}
    >
      {surface === 'glass' ? (
        <GlassPanel
          material="regular"
          radius="panel"
          elevation="panel"
          className={containerClassName}
          style={{ maxWidth: resolvedMaxWidth }}
        >
          {content}
        </GlassPanel>
      ) : (
        <div
          className={containerClassName}
          style={{ maxWidth: resolvedMaxWidth }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default SplitAuthLayout;
