'use client';

import { cn } from '../../../../libs/cn';
import { IToast } from '../../../../hooks/use-toast-store';
import { useToastQueue } from '../../../notifications/use-toast-queue';
import { useTucuMessages } from '../../../../libs/i18n/use-tucu-messages';
import {
  MacOSNotificationBanner,
  MacOSNotificationVariant,
} from './notification-banner';

// ─── Helpers ───────────────────────────────────────────────────

function mapVariant(variant: IToast['variant']): MacOSNotificationVariant {
  switch (variant) {
    case 'destructive':
      return 'error';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
}

// ─── MacOSSonomaToast ───────────────────────────────────────────────────

export function MacOSSonomaToast() {
  const messages = useTucuMessages();
  const { toasts, dismiss, regionHandlers } = useToastQueue(300);

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label={messages.toast.region}
      data-tucu="toast-container"
      className="fixed top-4 right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
      {...regionHandlers}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'transform transition-all duration-300 ease-in-out motion-reduce:transition-none',
            toast.dismissing
              ? 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          )}
        >
          <MacOSNotificationBanner
            title={toast.title || ''}
            message={toast.message}
            variant={mapVariant(toast.variant)}
            dismissible
            onDismiss={() => dismiss(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default MacOSSonomaToast;
