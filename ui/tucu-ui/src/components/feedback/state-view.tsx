'use client';

import React from 'react';
import { cn } from '../../libs/cn';

export type StateViewSize = 'sm' | 'md' | 'lg';
export type StateViewVariant = 'plain' | 'card';

export interface StateViewProps {
  /** Illustration or icon shown above the title. */
  icon?: React.ReactNode;
  /** Main heading of the state. */
  title: React.ReactNode;
  /** Supporting text under the title. */
  description?: React.ReactNode;
  /** Primary action, usually a Button. */
  action?: React.ReactNode;
  /** Secondary action, rendered next to the primary one. */
  secondaryAction?: React.ReactNode;
  /** Spacing and type scale. */
  size?: StateViewSize;
  /** `card` draws a bordered surface, `plain` has no chrome. */
  variant?: StateViewVariant;
  /** Extra classes merged last onto the root element. */
  className?: string;
}

export interface StateViewInternalProps extends StateViewProps {
  role: 'status' | 'alert';
  dataTucu: string;
  extra?: React.ReactNode;
  rootProps?: Record<string, unknown>;
}

const SIZE_CLASSES: Record<StateViewSize, string> = {
  sm: 'gap-2 p-4 text-sm',
  md: 'gap-3 p-8 text-base',
  lg: 'gap-4 p-12 text-lg',
};

const ICON_SIZE_CLASSES: Record<StateViewSize, string> = {
  sm: 'h-10 w-10 [&_svg]:h-5 [&_svg]:w-5',
  md: 'h-14 w-14 [&_svg]:h-7 [&_svg]:w-7',
  lg: 'h-20 w-20 [&_svg]:h-10 [&_svg]:w-10',
};

const CARD_CLASSES =
  'rounded-2xl border border-[var(--tucu-state-view-border,var(--tucu-state-view-border-default))] bg-[var(--tucu-state-view-bg,var(--tucu-state-view-bg-default))]';

export const StateView: React.FC<StateViewInternalProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  variant = 'card',
  className,
  role,
  dataTucu,
  extra,
  rootProps,
}) => (
  <div
    {...rootProps}
    role={role}
    data-tucu={dataTucu}
    className={cn(
      'flex flex-col items-center justify-center text-center text-[var(--tucu-state-view-fg,var(--tucu-state-view-fg-default))]',
      SIZE_CLASSES[size],
      variant === 'card' && CARD_CLASSES,
      className
    )}
  >
    {icon && (
      <div
        data-tucu={`${dataTucu}-icon`}
        aria-hidden="true"
        className={cn(
          'flex items-center justify-center rounded-full bg-[var(--tucu-state-view-icon-bg,var(--tucu-state-view-icon-bg-default))]',
          ICON_SIZE_CLASSES[size]
        )}
      >
        {icon}
      </div>
    )}
    <div data-tucu={`${dataTucu}-title`} className="font-semibold">
      {title}
    </div>
    {description && (
      <div
        data-tucu={`${dataTucu}-description`}
        className="max-w-prose text-[0.875em] text-[var(--tucu-state-view-fg-muted,var(--tucu-state-view-fg-muted-default))]"
      >
        {description}
      </div>
    )}
    {extra}
    {(action || secondaryAction) && (
      <div
        data-tucu={`${dataTucu}-actions`}
        className="mt-2 flex flex-wrap items-center justify-center gap-2"
      >
        {action}
        {secondaryAction}
      </div>
    )}
  </div>
);
