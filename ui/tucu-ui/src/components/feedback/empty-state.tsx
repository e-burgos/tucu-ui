'use client';

import React from 'react';
import { StateView, StateViewProps } from './state-view';

export interface EmptyStateProps
  extends StateViewProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'className'> {
  [dataAttribute: `data-${string}`]: string | undefined;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size,
  variant,
  className,
  ...rootProps
}) => (
  <StateView
    icon={icon}
    title={title}
    description={description}
    action={action}
    secondaryAction={secondaryAction}
    size={size}
    variant={variant}
    className={className}
    role="status"
    dataTucu="empty-state"
    rootProps={rootProps}
  />
);
