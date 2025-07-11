import React, { useCallback, useEffect, useState } from 'react';
import { useToastStore, IToast } from '../../hooks/use-toast-store';
import { Close } from '../icons/close';

export const Toast: React.FC = () => {
  const { toasts, dismissToast } = useToastStore();
  const [visibleToasts, setVisibleToasts] = useState<IToast[]>([]);

  const handleVariant = (variant: IToast['variant']) => {
    switch (variant) {
      case 'destructive':
        return 'border-red-500 bg-red-500 text-white';
      case 'success':
        return 'border-green-500 bg-green-500 text-white';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500 text-white';
      case 'info':
        return 'border-blue-500 bg-blue-500 text-white';
      default:
        return 'border-gray-300 bg-white p-4 shadow-card dark:bg-light-dark';
    }
  };

  const handleDismiss = useCallback(
    (toast: IToast) => {
      setVisibleToasts((prevToasts) =>
        prevToasts.map((t) =>
          t.id === toast.id ? { ...t, dismissing: true } : t
        )
      );
      setTimeout(() => {
        dismissToast(toast.id);
      }, 500);
    },
    [dismissToast]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, toast: IToast) => {
      if (
        event.key === 'Escape' ||
        event.key === ' ' ||
        event.key === 'Enter'
      ) {
        event.preventDefault();
        handleDismiss(toast);
      }
    },
    [handleDismiss]
  );

  useEffect(() => {
    setVisibleToasts(toasts);
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        handleDismiss(toast);
      }, toast.timeout);
      return { id: toast.id, timer };
    });
    return () => {
      timers.forEach(({ timer }) => clearTimeout(timer));
    };
  }, [toasts, handleDismiss]);

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 flex flex-col gap-2 w-auto z-20"
    >
      {visibleToasts.map((toast, index) => (
        <div
          key={index}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className={`relative flex items-center justify-between space-x-2 border-gray-300 p-4 pr-6 rounded-md shadow-lg transform transition-all duration-500 ease-in-out 
            ${toast.dismissing ? 'translate-x-full -mr-6' : 'translate-x-0'} 
            ${handleVariant(toast.variant)}`}
        >
          <div className="flex flex-col">
            <span className="dark:text-light mb-1 font-semibold text-md">
              {toast.title}
            </span>
            <span className="dark:text-light mr-3 font-normal text-sm">
              {toast.message}
            </span>
          </div>
          <button
            type="button"
            className="absolute right-3 top-3 p-1 rounded focus:outline-hidden focus:ring-2 focus:ring-current focus:ring-offset-1"
            onClick={() => handleDismiss(toast)}
            onKeyDown={(e) => handleKeyDown(e, toast)}
            aria-label={`Dismiss ${toast.title} notification`}
          >
            <Close aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
};

Toast.displayName = 'Toast';

export default Toast;
