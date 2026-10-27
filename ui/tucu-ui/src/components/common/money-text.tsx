'use client';

import React from 'react';
import { cn } from '../../libs/cn';
import { useTheme } from '../../themes/hooks/use-theme';

export type MoneyTextVariant = 'total' | 'subtotal' | 'row';
export type MoneyTextTone = 'default' | 'positive' | 'negative' | 'auto';

export interface MoneyTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Amount to format; numeric strings are parsed and non-finite values render an em dash. */
  value: number | string;
  /** ISO 4217 currency code. */
  currency?: string;
  /** BCP 47 locale; defaults to the theme `lang`, then the runtime default. */
  locale?: string;
  /** Typographic scale: total is the largest, row the smallest. */
  variant?: MoneyTextVariant;
  /** Colour of the figure; auto follows the sign of the value. */
  tone?: MoneyTextTone;
  /** Lower bound of fraction digits passed to Intl.NumberFormat. */
  minimumFractionDigits?: number;
  /** Upper bound of fraction digits passed to Intl.NumberFormat. */
  maximumFractionDigits?: number;
  /** Always shows the sign of non-zero values. */
  showSign?: boolean;
  /** Element or component rendered as the root. */
  as?: React.ElementType;
}

const EMPTY_AMOUNT = '—';
const DEFAULT_CURRENCY = 'USD';

const variantClassNames: Record<MoneyTextVariant, string> = {
  total: 'text-[22px] font-bold tracking-[-0.02em]',
  subtotal: 'text-[17px] font-bold tracking-[-0.02em]',
  row: 'text-[13.5px] font-medium',
};

const toneClassNames: Record<Exclude<MoneyTextTone, 'auto'>, string> = {
  default: '',
  positive:
    'text-[color:var(--tucu-state-green-ink,var(--tucu-state-green-ink-default))]',
  negative:
    'text-[color:var(--tucu-state-red-ink,var(--tucu-state-red-ink-default))]',
};

function toAmount(value: number | string): number {
  return typeof value === 'string' ? Number(value) : value;
}

function resolveTone(
  tone: MoneyTextTone,
  amount: number
): keyof typeof toneClassNames {
  if (tone !== 'auto') return tone;
  if (!Number.isFinite(amount) || amount === 0) return 'default';
  return amount > 0 ? 'positive' : 'negative';
}

function formatAmount(
  amount: number,
  options: Intl.NumberFormatOptions,
  locale?: string
): string {
  if (!Number.isFinite(amount)) return EMPTY_AMOUNT;
  try {
    return new Intl.NumberFormat(locale, options).format(amount);
  } catch {
    return String(amount);
  }
}

export function MoneyText({
  value,
  currency = DEFAULT_CURRENCY,
  locale,
  variant = 'row',
  tone = 'default',
  minimumFractionDigits,
  maximumFractionDigits,
  showSign = false,
  as: Tag = 'span',
  className,
  ...props
}: MoneyTextProps) {
  const themeLang = useTheme((state) => state.lang);
  const amount = toAmount(value);
  const formatted = formatAmount(
    amount,
    {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      signDisplay: showSign ? 'exceptZero' : 'auto',
    },
    locale ?? themeLang ?? undefined
  );

  return (
    <Tag
      {...props}
      data-tucu="money-text"
      data-variant={variant}
      className={cn(
        'whitespace-nowrap font-mono tabular-nums',
        variantClassNames[variant],
        toneClassNames[resolveTone(tone, amount)],
        className
      )}
    >
      {formatted}
    </Tag>
  );
}

export default MoneyText;
