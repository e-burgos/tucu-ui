'use client';

import { useState } from 'react';
import { Close } from '../icons/close';
import { cn } from '../../libs/cn';

type AlertVariant = 'info' | 'warning' | 'error' | 'success';
type AlertAppearance = 'soft' | 'ink' | 'line';
type AlertDensity = 'default' | 'compact';

const densityClassNames: Record<AlertDensity, string> = {
  default:
    'py-4 ltr:pl-4 ltr:pr-8 rtl:pr-4 rtl:pl-8 sm:py-6 sm:ltr:pr-10 sm:ltr:pl-6 sm:rtl:pl-10 sm:rtl:pr-6',
  compact: 'px-3 py-1.5',
};

const appearanceClassNames: Record<AlertAppearance, Record<AlertVariant, string>> = {
  soft: {
    info: 'bg-info/10 border-info/30 text-info',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    error: 'bg-error/10 border-error/30 text-error',
    success: 'bg-success/10 border-success/30 text-success',
  },
  ink: {
    info: 'bg-info border-info text-white',
    warning: 'bg-warning border-warning text-white',
    error: 'bg-error border-error text-white',
    success: 'bg-success border-success text-white',
  },
  line: {
    info: 'bg-transparent border-info text-info',
    warning: 'bg-transparent border-warning text-warning',
    error: 'bg-transparent border-error text-error',
    success: 'bg-transparent border-success text-success',
  },
};

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'children'> {
  children: React.ReactNode;
  variant?: AlertVariant;
  /** Status appearance using theme tokens; omit to keep the default palette */
  appearance?: AlertAppearance;
  /** Announcement politeness: polite renders role="status" */
  live?: 'assertive' | 'polite';
  /** `compact` renders a slim banner (`px-3 py-1.5`) without the large responsive paddings. */
  density?: AlertDensity;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
  'aria-label'?: string;
}

export function Alert({
  children,
  variant = 'info',
  dismissible = false,
  className,
  appearance,
  live = 'assertive',
  density = 'default',
  onDismiss,
  'aria-label': ariaLabel,
  ...rootProps
}: React.PropsWithChildren<AlertProps>) {
  const [isHidden, setIsHidden] = useState(false);

  const handleDismiss = () => {
    setIsHidden(true);
    onDismiss?.();
  };

  if (isHidden) {
    return null;
  }

  const getVariantStyles = () => {
    if (appearance) {
      return appearanceClassNames[appearance][variant];
    }
    switch (variant) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div
      {...rootProps}
      data-tucu="alert"
      data-variant={variant}
      role={live === 'polite' ? 'status' : 'alert'}
      aria-live={live}
      aria-atomic="true"
      aria-label={ariaLabel}
      className={cn(
        'relative text-sm rounded-lg border shadow-card',
        densityClassNames[density],
        density === 'compact' && dismissible && 'ltr:pr-8 rtl:pl-8',
        getVariantStyles(),
        className
      )}
    >
      {children}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className={cn(
            'absolute transition-all hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-current focus:ring-offset-2',
            density === 'compact'
              ? 'top-1/2 -translate-y-1/2 p-1 ltr:right-1 rtl:left-1'
              : 'top-2 p-2 ltr:right-2 rtl:left-2'
          )}
        >
          <Close className="h-auto w-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';

export default Alert;
