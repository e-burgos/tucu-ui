import { useState } from 'react';
import { Close } from '../icons/close';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'error' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
  'aria-label'?: string;
}

export function Alert({
  children,
  variant = 'info',
  dismissible = true,
  onDismiss,
  'aria-label': ariaLabel,
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
    switch (variant) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={ariaLabel}
      className={`relative rounded-lg border py-4 shadow-card ltr:pl-4 ltr:pr-8 rtl:pr-4 rtl:pl-8 sm:py-6 sm:ltr:pr-10 sm:ltr:pl-6 sm:rtl:pl-10 sm:rtl:pr-6 ${getVariantStyles()}`}
    >
      {children}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className="absolute top-2 p-2 transition-all hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-current focus:ring-offset-2 ltr:right-2 rtl:left-2"
        >
          <Close className="h-auto w-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';

export default Alert;
