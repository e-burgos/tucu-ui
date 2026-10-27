'use client';

import React from 'react';
import { Button } from '../buttons';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { StateView, StateViewProps } from './state-view';

export interface ErrorStateProps
  extends Omit<StateViewProps, 'title'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'className'> {
  /** Heading. Defaults to the localized "Something went wrong". */
  title?: React.ReactNode;
  /** Retry handler. When given, a retry Button is rendered as the primary action. */
  onRetry?: () => void;
  /** Label of the retry button. Defaults to the localized "Try again". */
  retryLabel?: string;
  /** Original error; its message is shown inside a collapsible details disclosure. */
  error?: unknown;
  /** Label of the details disclosure. Defaults to the localized "Details". */
  detailsLabel?: string;
  [dataAttribute: `data-${string}`]: string | undefined;
}

const describeError = (error: unknown): string | undefined => {
  if (error === undefined || error === null || error === '') return undefined;
  if (error instanceof Error) return error.message || error.name;
  return typeof error === 'string' ? error : String(error);
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  action,
  onRetry,
  retryLabel,
  error,
  detailsLabel,
  icon,
  secondaryAction,
  size,
  variant,
  className,
  ...rootProps
}) => {
  const messages = useTucuMessages();
  const details = describeError(error);
  const retryAction = onRetry ? (
    <Button size="small" shape="rounded" onClick={onRetry}>
      {retryLabel ?? messages.states.retry}
    </Button>
  ) : null;

  return (
    <StateView
      icon={icon}
      secondaryAction={secondaryAction}
      size={size}
      variant={variant}
      className={className}
      title={title ?? messages.states.errorTitle}
      description={description ?? messages.states.errorDescription}
      action={
        retryAction || action ? (
          <>
            {retryAction}
            {action}
          </>
        ) : undefined
      }
      role="alert"
      dataTucu="error-state"
      rootProps={rootProps}
      extra={
        details ? (
          <details
            data-tucu="error-state-details"
            className="max-w-full text-sm text-[var(--tucu-state-view-fg-muted,var(--tucu-state-view-fg-muted-default))]"
          >
            <summary className="cursor-pointer">
              {detailsLabel ?? messages.states.details}
            </summary>
            <pre className="mt-1 whitespace-pre-wrap break-words text-left text-xs">
              {details}
            </pre>
          </details>
        ) : null
      }
    />
  );
};
