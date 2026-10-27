'use client';

import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../libs/cn';

export type FilterPillTone =
  | 'green'
  | 'orange'
  | 'red'
  | 'teal'
  | 'purple'
  | 'neutral';

export interface FilterPillProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Pill label. */
  children?: ReactNode;
  /** Marks the pill as the active filter (`aria-pressed`). */
  active?: boolean;
  /** Counter shown after the label. */
  count?: number;
  /** Colour used while active. Defaults to `neutral`. */
  tone?: FilterPillTone;
}

const stateToken = (tone: FilterPillTone, part: 'soft' | 'ink' | 'line') =>
  `var(--tucu-state-${tone}-${part}, var(--tucu-state-${tone}-${part}-default))`;

const activeToneStyle = (tone: FilterPillTone): React.CSSProperties => ({
  backgroundColor: stateToken(tone, 'soft'),
  color: stateToken(tone, 'ink'),
  borderColor: stateToken(tone, 'line'),
});

export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  (
    { children, active = false, count, tone = 'neutral', className, type, style, ...rest },
    ref
  ) => (
    <button
      {...rest}
      ref={ref}
      type={type ?? 'button'}
      aria-pressed={active}
      data-tucu="filter-pill"
      data-active={active ? 'true' : undefined}
      data-tone={tone}
      style={active ? { ...activeToneStyle(tone), ...style } : style}
      className={cn(
        'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-xs font-medium outline-hidden transition-colors',
        'focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50',
        !active &&
          'border-border bg-transparent text-muted hover:bg-foreground/5 hover:text-foreground',
        className
      )}
    >
      {children}
      {count !== undefined && (
        <span
          data-tucu="filter-pill-count"
          className="rounded-full bg-foreground/10 px-1.5 text-[10px] leading-4 tabular-nums"
        >
          {count}
        </span>
      )}
    </button>
  )
);

FilterPill.displayName = 'FilterPill';

export default FilterPill;
