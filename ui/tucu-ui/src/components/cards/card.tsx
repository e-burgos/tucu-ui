'use client';

import type React from 'react';
import { cn } from '../../libs/cn';

export type CardDensity = 'compact' | 'default' | 'comfortable';

const densityBody: Record<CardDensity, string> = {
  compact: 'p-3',
  default: 'p-4',
  comfortable: 'p-6',
};

const densityHeader: Record<CardDensity, string> = {
  compact: 'p-3 pb-0',
  default: 'p-4 pb-0',
  comfortable: 'p-6 pb-0',
};

const densityFooter: Record<CardDensity, string> = {
  compact: 'px-3 py-2',
  default: 'px-4 py-3',
  comfortable: 'px-6 py-4',
};

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Extra class names for the body wrapper, merged after the density padding. */
  bodyClassName?: string;
  /** Padding scale of header, body and footer. */
  density?: CardDensity;
}

export function Card({
  title,
  description,
  icon,
  header,
  footer,
  actions,
  children,
  className,
  bodyClassName,
  density = 'default',
  onClick,
  ...rest
}: CardProps) {
  return (
    <div
      data-tucu="card"
      data-density={density}
      {...rest}
      className={cn(
        'flex flex-col rounded-xl border border-border bg-light-dark',
        onClick &&
          'cursor-pointer hover:border-brand/30 dark:hover:border-brand/30 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {(header || title || actions) && (
        <div
          className={cn(
            'flex items-start justify-between gap-3',
            densityHeader[density]
          )}
        >
          {header || (
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children && (
        <div
          data-tucu="card-body"
          className={cn('flex-1', densityBody[density], bodyClassName)}
        >
          {children}
        </div>
      )}
      {footer && (
        <div
          data-tucu="card-footer"
          className={cn('border-t border-border', densityFooter[density])}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
