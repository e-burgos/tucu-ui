import cn from 'classnames';
import { Tooltip } from '../common';

/* ─── Types ───────────────────────────────────────────────────────────────── */

export interface InfoCardColumn {
  /** Unique key for the column */
  key: string;
  /** Column group label (shown uppercase) */
  label: string;
  /** Icon element for the group header */
  icon?: React.ReactNode;
  /** Accent color class for the vertical bar (e.g. 'bg-brand') */
  accent?: string;
  /** Accent text color class for label and icon (e.g. 'text-brand') */
  accentText?: string;
  /** Key-value rows to render */
  items: InfoCardItem[];
}

export interface InfoCardItem {
  label: string;
  value: React.ReactNode;
  /** Optional text color class for the value */
  color?: string;
}

export interface InfoCardFooterTag {
  label: string;
  /** Tailwind color classes for the tag */
  className?: string;
  icon?: React.ReactNode;
  /** Tooltip content shown on hover */
  tooltip?: React.ReactNode;
}

export interface InfoCardProps {
  /** Title displayed in the header */
  title?: string;
  /** Subtitle/description under the title */
  subtitle?: string;
  /** Icon rendered in a styled badge in the header */
  icon?: React.ReactNode;
  /** Element rendered on the right side of the header (e.g. status badge) */
  headerRight?: React.ReactNode;
  /** Column groups for the structured grid layout */
  columns?: InfoCardColumn[];
  /** Number of grid columns on lg breakpoint (default: columns.length or 4) */
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Free-form children (rendered below columns if both provided) */
  children?: React.ReactNode;
  /** Footer tags/pills */
  footerTags?: InfoCardFooterTag[];
  /** Footer label prefix */
  footerLabel?: string;
  /** Custom footer content (takes precedence over footerTags) */
  footer?: React.ReactNode;
  /** Additional className for the root container */
  className?: string;
}

/* ─── Grid column mapping ─────────────────────────────────────────────────── */

const GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

/* ─── Component ───────────────────────────────────────────────────────────── */

export function InfoCard({
  title,
  subtitle,
  icon,
  headerRight,
  columns,
  gridCols,
  children,
  footerTags,
  footerLabel,
  footer,
  className,
}: InfoCardProps) {
  const effectiveCols = gridCols ?? columns?.length ?? 4;

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-light-dark overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Header */}
      {(title || icon || headerRight) && (
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-brand/10">
          {icon && (
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 border border-brand/20">
              {icon}
            </div>
          )}
          {(title || subtitle) && (
            <div className="flex flex-col">
              {title && (
                <span className="text-xs font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="text-[10px] text-gray-500 dark:text-gray-500 leading-tight">
                  {subtitle}
                </span>
              )}
            </div>
          )}
          {headerRight && <div className="ml-auto">{headerRight}</div>}
        </div>
      )}

      {/* Column grid */}
      {columns && columns.length > 0 && (
        <div
          className={cn(
            'grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/30 dark:divide-gray-700/30',
            GRID_COLS[effectiveCols]
          )}
        >
          {columns.map((col) => (
            <div key={col.key} className="p-4 flex flex-col gap-3">
              {/* Group header */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'h-4 w-0.5 rounded-full opacity-70',
                    col.accent ?? 'bg-brand'
                  )}
                />
                {col.icon && (
                  <span
                    className={cn('h-3 w-3', col.accentText ?? 'text-brand')}
                  >
                    {col.icon}
                  </span>
                )}
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider',
                    col.accentText ?? 'text-brand'
                  )}
                >
                  {col.label}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2.5">
                {col.items.map((item, idx) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className="flex items-start justify-between gap-3"
                  >
                    <span className="text-[11px] text-gray-500 dark:text-gray-500 shrink-0 leading-tight">
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        'text-[11px] font-semibold text-right font-mono leading-tight',
                        item.color ?? 'text-gray-900 dark:text-gray-100'
                      )}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Free-form children */}
      {children && <div className="px-5 py-4">{children}</div>}

      {/* Footer */}
      <div className="mt-auto">
        {footer
          ? footer
          : footerTags &&
            footerTags.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-200/40 dark:border-gray-700/40 bg-gray-100 dark:bg-gray-800/20 flex flex-wrap gap-2 items-center">
                {footerLabel && (
                  <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-bold mr-1">
                    {footerLabel}
                  </span>
                )}
                {footerTags.map((tag, i) => {
                  const tagEl = (
                    <span
                      key={i}
                      className={cn(
                        'flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px]',
                        tag.className ??
                          'bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400'
                      )}
                    >
                      {tag.icon}
                      {tag.label}
                    </span>
                  );
                  return tag.tooltip ? (
                    <Tooltip key={i} content={tag.tooltip} placement="top">
                      {tagEl}
                    </Tooltip>
                  ) : (
                    tagEl
                  );
                })}
              </div>
            )}
      </div>
    </div>
  );
}

export default InfoCard;
