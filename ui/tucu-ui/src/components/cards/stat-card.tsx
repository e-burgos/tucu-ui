'use client';

import React from 'react';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { Skeleton } from '../common/skeleton';
import { TrendArrowDownIcon } from '../icons/trend-arrow-down-icon';
import { TrendArrowUpIcon } from '../icons/trend-arrow-up-icon';

export type StatCardTone =
  | 'brand'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type StatCardTrendDirection = 'up' | 'down' | 'flat';

export interface StatCardTrend {
  /** Figure shown next to the arrow, for example `12%`. */
  value: number | string;
  /** Arrow direction; inferred from the sign of a numeric `value` when omitted. */
  direction?: StatCardTrendDirection;
  /** Text after the figure, for example "vs last month". */
  label?: React.ReactNode;
  /** When false a downward trend is the good one (for example churn). */
  positiveIsGood?: boolean;
}

export interface StatCardProgress {
  /** Current amount. */
  value: number;
  /** Amount that fills the bar. */
  max: number;
  /** Text shown above the bar. */
  label?: React.ReactNode;
}

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onClick'> {
  /** Label of the metric. */
  title: React.ReactNode;
  /** Main figure. */
  value: React.ReactNode;
  /** Secondary line below the figure. */
  subtitle?: React.ReactNode;
  /** Icon shown in the accent badge. */
  icon?: React.ReactNode;
  /** Change indicator next to the figure. */
  trend?: StatCardTrend;
  /** Progress bar toward a maximum. */
  progress?: StatCardProgress;
  /** Accent used for the icon badge, glow and progress bar. */
  tone?: StatCardTone;
  /** Shows skeletons instead of the content. */
  loading?: boolean;
  /** Makes the card a button. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Makes the card a link. */
  href?: string;
}

interface ToneClassNames {
  icon: string;
  glow: string;
  bar: string;
}

const toneClassNames: Record<StatCardTone, ToneClassNames> = {
  brand: {
    icon: 'bg-brand/10 text-brand border-brand/20',
    glow: 'bg-brand/10',
    bar: 'bg-brand',
  },
  neutral: {
    icon: 'bg-muted/10 text-muted border-muted/20',
    glow: 'bg-muted/10',
    bar: 'bg-muted',
  },
  success: {
    icon: 'bg-success/10 text-success border-success/20',
    glow: 'bg-success/10',
    bar: 'bg-success',
  },
  warning: {
    icon: 'bg-warning/10 text-warning border-warning/20',
    glow: 'bg-warning/10',
    bar: 'bg-warning',
  },
  danger: {
    icon: 'bg-error/10 text-error border-error/20',
    glow: 'bg-error/10',
    bar: 'bg-error',
  },
  info: {
    icon: 'bg-info/10 text-info border-info/20',
    glow: 'bg-info/10',
    bar: 'bg-info',
  },
};

const sentimentClassNames = {
  good: 'bg-success/10 text-success border-success/20',
  bad: 'bg-error/10 text-error border-error/20',
  neutral: 'bg-muted/10 text-muted border-muted/20',
};

function inferDirection(trend: StatCardTrend): StatCardTrendDirection {
  if (trend.direction) return trend.direction;
  const numeric = Number(trend.value);
  if (!Number.isFinite(numeric) || numeric === 0) return 'flat';
  return numeric > 0 ? 'up' : 'down';
}

function resolveSentiment(
  direction: StatCardTrendDirection,
  positiveIsGood: boolean
): keyof typeof sentimentClassNames {
  if (direction === 'flat') return 'neutral';
  return (direction === 'up') === positiveIsGood ? 'good' : 'bad';
}

function progressPercent({ value, max }: StatCardProgress): number {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / max) * 100)));
}

function TrendBadge({ trend }: { trend: StatCardTrend }) {
  const messages = useTucuMessages();
  const direction = inferDirection(trend);
  const sentiment = resolveSentiment(direction, trend.positiveIsGood ?? true);
  const directionLabel = {
    up: messages.statCard.trendUp,
    down: messages.statCard.trendDown,
    flat: messages.statCard.trendFlat,
  }[direction];

  return (
    <span
      data-tucu="stat-card-trend"
      data-direction={direction}
      data-sentiment={sentiment}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        sentimentClassNames[sentiment]
      )}
    >
      {direction === 'up' && (
        <TrendArrowUpIcon aria-hidden="true" className="h-3 w-3" />
      )}
      {direction === 'down' && (
        <TrendArrowDownIcon aria-hidden="true" className="h-3 w-3" />
      )}
      <span className="sr-only">{directionLabel}</span>
      <span className="font-mono tabular-nums">{trend.value}</span>
      {trend.label && (
        <span className="font-normal opacity-80">{trend.label}</span>
      )}
    </span>
  );
}

function ProgressBar({
  progress,
  barClassName,
}: {
  progress: StatCardProgress;
  barClassName: string;
}) {
  const percent = progressPercent(progress);
  return (
    <span data-tucu="stat-card-progress" className="block space-y-1.5 pt-1">
      <span className="flex items-center justify-between text-[10px] font-medium text-muted">
        <span>{progress.label}</span>
        <span className="font-mono tabular-nums">{percent}%</span>
      </span>
      <span
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={progress.max}
        aria-valuenow={Math.min(Math.max(progress.value, 0), progress.max)}
        className="block h-1.5 w-full overflow-hidden rounded-full bg-muted/15"
      >
        <span
          className={cn(
            'block h-full rounded-full transition-all duration-700 ease-out',
            barClassName
          )}
          style={{ width: `${percent}%` }}
        />
      </span>
    </span>
  );
}

function StatCardSkeleton() {
  return (
    <span className="block space-y-4" aria-hidden="true">
      <Skeleton width="40%" height="12px" />
      <Skeleton width="60%" height="32px" />
      <Skeleton width="30%" height="12px" />
    </span>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  tone = 'brand',
  loading = false,
  onClick,
  href,
  className,
  children,
  ...props
}: StatCardProps) {
  const accent = toneClassNames[tone];
  const interactive = Boolean(href || onClick);
  const Tag: React.ElementType = href ? 'a' : onClick ? 'button' : 'div';
  const interactiveProps: Record<string, unknown> = href
    ? { href, onClick }
    : onClick
    ? { type: 'button', onClick }
    : {};

  return (
    <Tag
      {...props}
      {...interactiveProps}
      data-tucu="stat-card"
      data-tone={tone}
      aria-busy={loading || undefined}
      className={cn(
        'group relative block w-full overflow-hidden rounded-2xl border border-border bg-light-dark p-6 text-start shadow-card transition-all duration-300',
        interactive &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        className
      )}
    >
      <span
        aria-hidden="true"
        data-tucu="stat-card-glow"
        className={cn(
          'pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 blur-xl transition-transform duration-500 group-hover:scale-150',
          accent.glow
        )}
      />
      {loading ? (
        <StatCardSkeleton />
      ) : (
        <span className="relative block space-y-4">
          <span className="flex items-start justify-between gap-3">
            <span
              data-tucu="stat-card-title"
              className="text-xs font-semibold uppercase tracking-wider text-muted"
            >
              {title}
            </span>
            {icon && (
              <span
                data-tucu="stat-card-icon"
                className={cn('rounded-xl border p-2.5', accent.icon)}
              >
                {icon}
              </span>
            )}
          </span>
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span
              data-tucu="stat-card-value"
              className="font-mono text-3xl font-extrabold leading-none tracking-tight tabular-nums"
            >
              {value}
            </span>
            {trend && <TrendBadge trend={trend} />}
          </span>
          {subtitle && (
            <span
              data-tucu="stat-card-subtitle"
              className="block text-xs leading-snug text-muted"
            >
              {subtitle}
            </span>
          )}
          {progress && (
            <ProgressBar progress={progress} barClassName={accent.bar} />
          )}
          {children}
        </span>
      )}
    </Tag>
  );
}

export default StatCard;
