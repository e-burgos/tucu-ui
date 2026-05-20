import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useToastStore, IToast } from '../../../../hooks/use-toast-store';
import {
  MacOSTahoeNotificationBanner,
  MacOSTahoeNotificationVariant,
} from './notification-banner-tahoe';

// ─── Helpers ───────────────────────────────────────────────────

function mapVariant(variant: IToast['variant']): MacOSTahoeNotificationVariant {
  switch (variant) {
    case 'destructive':
      return 'error';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
}

// ─── MacOSTahoeToast ───────────────────────────────────────────

export function MacOSTahoeToast() {
  const { toasts, dismissToast } = useToastStore();
  const [visibleToasts, setVisibleToasts] = useState<IToast[]>([]);

  const handleDismiss = useCallback(
    (toast: IToast) => {
      setVisibleToasts((prev) =>
        prev.map((t) => (t.id === toast.id ? { ...t, dismissing: true } : t))
      );
      setTimeout(() => {
        dismissToast(toast.id);
      }, 300);
    },
    [dismissToast]
  );

  useEffect(() => {
    setVisibleToasts(toasts);
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        handleDismiss(toast);
      }, toast.timeout || 3000);
      return { id: toast.id, timer };
    });
    return () => {
      timers.forEach(({ timer }) => clearTimeout(timer));
    };
  }, [toasts, handleDismiss]);

  if (visibleToasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      data-tucu="toast-container"
      className="fixed top-4 right-4 z-50 flex w-[360px] flex-col gap-2"
    >
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'transform transition-all duration-300 ease-in-out',
            toast.dismissing
              ? 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          )}
        >
          <MacOSTahoeNotificationBanner
            title={toast.title || ''}
            message={toast.message}
            variant={mapVariant(toast.variant)}
            dismissible
            onDismiss={() => handleDismiss(toast)}
          />
        </div>
      ))}
    </div>
  );
}

export default MacOSTahoeToast;
