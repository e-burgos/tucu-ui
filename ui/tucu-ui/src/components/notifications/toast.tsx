import React from 'react';
import cn from 'classnames';
import { IToast } from '../../hooks/use-toast-store';
import { Close } from '../icons/close';
import { useToastQueue } from './use-toast-queue';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';

/**
 * Opaque surfaces with WCAG AA text contrast (≥ 4.5:1) in light and dark.
 * Customizable through the `--tucu-toast-*` CSS variables (see base.css).
 */
const variantClasses: Record<NonNullable<IToast['variant']>, string> = {
  default:
    'border-(--tucu-toast-border) bg-(--tucu-toast-bg) text-(--tucu-toast-fg)',
  destructive: 'border-red-700 bg-red-600 text-white',
  success: 'border-green-800 bg-green-700 text-white',
  warning: 'border-amber-500 bg-amber-400 text-gray-950',
  info: 'border-blue-700 bg-blue-600 text-white',
};

export const Toast: React.FC = () => {
  const messages = useTucuMessages();
  const { toasts, dismiss, regionHandlers } = useToastQueue(500);

  // Don't render the generic toast when a macOS theme is active (they have
  // their own toast renderer mounted by the macOS layouts).
  const isMacOS =
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('macos') ||
      document.documentElement.classList.contains('macos-tahoe'));

  if (isMacOS) return null;

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
          role={toast.variant === 'destructive' ? 'alert' : 'status'}
          aria-live={toast.variant === 'destructive' ? 'assertive' : 'polite'}
          aria-atomic="true"
          data-tucu="toast"
          data-variant={toast.variant ?? 'default'}
          className={cn(
            'relative flex items-center justify-between rounded-md border p-4 pr-10 shadow-lg transform transition-all duration-300 ease-out motion-reduce:transition-none',
            toast.dismissing
              ? 'translate-x-[120%] opacity-0 scale-95'
              : 'translate-x-0 opacity-100 scale-100',
            variantClasses[toast.variant ?? 'default']
          )}
        >
          <div className="flex flex-col">
            {toast.title && (
              <span className="mb-1 font-semibold text-md">{toast.title}</span>
            )}
            <span className="font-normal text-sm">{toast.message}</span>
          </div>
          <button
            type="button"
            className="absolute right-3 top-3 rounded p-1 opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
            onClick={() => dismiss(toast.id)}
            aria-label={`${messages.toast.dismiss}${
              toast.title ? `: ${toast.title}` : ''
            }`}
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
