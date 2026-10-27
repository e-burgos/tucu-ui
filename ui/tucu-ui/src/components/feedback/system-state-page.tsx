'use client';

import React from 'react';
import { cn } from '../../libs/cn';

export type SystemStateTone = 'neutral' | 'error';

export interface SystemStatePageProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Large status code shown above the title, e.g. 404 or 500. */
  code?: React.ReactNode;
  /** Illustration or icon. */
  icon?: React.ReactNode;
  /** Page heading. */
  title: React.ReactNode;
  /** Supporting text under the title. */
  description?: React.ReactNode;
  /** Primary action, usually a Button. */
  action?: React.ReactNode;
  /** Secondary action, rendered next to the primary one. */
  secondaryAction?: React.ReactNode;
  /** `error` tints the code and icon with the error colour. */
  tone?: SystemStateTone;
  /** Extra classes merged last onto the `<main>` element. */
  className?: string;
  [dataAttribute: `data-${string}`]: string | undefined;
}

export const SystemStatePage: React.FC<SystemStatePageProps> = ({
  code,
  icon,
  title,
  description,
  action,
  secondaryAction,
  tone = 'neutral',
  className,
  ...rootProps
}) => {
  const toneClass =
    tone === 'error'
      ? 'text-[var(--tucu-state-view-error-fg,var(--tucu-state-view-error-fg-default))]'
      : 'text-[var(--tucu-state-view-fg-muted,var(--tucu-state-view-fg-muted-default))]';

  return (
    <main
      {...rootProps}
      data-tucu="system-state-page"
      data-tone={tone}
      className={cn(
        'flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-6 py-12 text-center text-[var(--tucu-state-view-fg,var(--tucu-state-view-fg-default))]',
        className
      )}
    >
      {icon && (
        <div
          data-tucu="system-state-page-icon"
          aria-hidden="true"
          className={cn('[&_svg]:h-20 [&_svg]:w-20', toneClass)}
        >
          {icon}
        </div>
      )}
      {code && (
        <p
          data-tucu="system-state-page-code"
          className={cn('text-6xl font-bold tracking-tight', toneClass)}
        >
          {code}
        </p>
      )}
      <h1 data-tucu="system-state-page-title" className="text-2xl font-semibold">
        {title}
      </h1>
      {description && (
        <p
          data-tucu="system-state-page-description"
          className="max-w-prose text-base text-[var(--tucu-state-view-fg-muted,var(--tucu-state-view-fg-muted-default))]"
        >
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div
          data-tucu="system-state-page-actions"
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
        >
          {action}
          {secondaryAction}
        </div>
      )}
    </main>
  );
};
