import React from 'react';
import { cn } from '../../libs/cn';
import { Badge, type BadgeProps } from './badge';

export type StateBadgeTone =
  | 'green'
  | 'orange'
  | 'red'
  | 'teal'
  | 'purple'
  | 'neutral';

export interface StateBadgeProps
  extends Omit<
    BadgeProps,
    'tone' | 'variant' | 'withDot' | 'size' | 'status' | 'color'
  > {
  /** State hue: green paid, orange pending, red alert, teal ready, purple online, neutral delivered or expired. */
  tone: StateBadgeTone;
  /** Renders a solid 6px dot before the label. */
  dot?: boolean;
  /** Strikes the label through for cancelled or expired states. */
  struck?: boolean;
  /** Badge density. */
  size?: 'sm' | 'md';
}

const neutralClassName =
  'bg-[color:var(--tucu-state-neutral-soft,var(--tucu-state-neutral-soft-default))] text-[color:var(--tucu-state-neutral-ink,var(--tucu-state-neutral-ink-default))] border-[color:var(--tucu-state-neutral-line,var(--tucu-state-neutral-line-default))]';

const sizeClassNames = {
  sm: 'gap-1.5 h-auto px-2.5 py-1 text-[10.5px] font-semibold',
  md: 'gap-1.5 h-auto px-3 py-1.5 text-[11px] font-semibold',
};

export function StateBadge({
  tone,
  dot = true,
  struck = false,
  size = 'md',
  className,
  children,
  ...props
}: StateBadgeProps) {
  return (
    <Badge
      {...props}
      data-tucu="state-badge"
      data-state-tone={tone}
      tone={tone}
      variant="soft"
      struck={struck}
      className={cn(
        sizeClassNames[size],
        tone === 'neutral' && neutralClassName,
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          data-tucu="state-badge-dot"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
        />
      )}
      {children}
    </Badge>
  );
}

export default StateBadge;
