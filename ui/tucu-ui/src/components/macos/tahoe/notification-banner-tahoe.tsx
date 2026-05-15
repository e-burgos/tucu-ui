import { useState, useCallback } from 'react';
import cn from 'classnames';

export type MacOSTahoeNotificationVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface MacOSTahoeNotificationBannerProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  variant?: MacOSTahoeNotificationVariant;
  actions?: React.ReactNode;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
}

const variantAccent: Record<MacOSTahoeNotificationVariant, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

const variantIcon: Record<MacOSTahoeNotificationVariant, React.ReactNode> = {
  info: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const variantIconColor: Record<MacOSTahoeNotificationVariant, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
};

export function MacOSTahoeNotificationBanner({
  title,
  message,
  icon,
  variant = 'info',
  actions,
  dismissible = true,
  className,
  onDismiss,
}: MacOSTahoeNotificationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  if (dismissed) return null;

  return (
    <div
      data-tucu="tahoe-notification-banner"
      role="alert"
      className={cn(
        'relative flex items-start gap-3 overflow-hidden px-4 py-3',
        'rounded-xl',
        'bg-(--macos-glass-regular-bg) backdrop-blur-(--macos-glass-regular-blur,20px)',
        'border border-(--macos-glass-border)',
        'shadow-(--macos-glass-shadow,0_4px_16px_rgba(0,0,0,0.08))',
        className
      )}
    >
      {/* Left accent stripe */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-0.75',
          variantAccent[variant]
        )}
      />

      {/* Icon */}
      <div className={cn('mt-0.5 shrink-0', variantIconColor[variant])}>
        {icon || variantIcon[variant]}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-(--macos-tahoe-text)">
          {title}
        </p>
        {message && (
          <p className="mt-0.5 text-[12px] leading-relaxed text-(--macos-tahoe-text-muted)">
            {message}
          </p>
        )}
        {actions && <div className="mt-2 flex items-center gap-2">{actions}</div>}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-0.5 text-(--macos-tahoe-text-muted) transition-colors hover:text-(--macos-tahoe-text)"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSTahoeNotificationBanner;
