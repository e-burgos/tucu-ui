import { useState } from 'react';
import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export type MacOSNotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface MacOSNotificationAction {
  label: string;
  onClick: () => void;
}

export interface MacOSNotificationBannerProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  variant?: MacOSNotificationVariant;
  actions?: MacOSNotificationAction[];
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
}

// ─── Accent stripes per variant ────────────────────────────────

const VARIANT_ACCENT: Record<MacOSNotificationVariant, string> = {
  info:    'border-l-[var(--color-semantic-bg-primary)]',
  success: 'border-l-[#34c759]',
  warning: 'border-l-[#ff9500]',
  error:   'border-l-[#ff3b30]',
};

// ─── MacOSNotificationBanner ───────────────────────────────────

export function MacOSNotificationBanner({
  title,
  message,
  icon,
  variant = 'info',
  actions,
  dismissible = true,
  className,
  onDismiss,
}: MacOSNotificationBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl px-4 py-3',
        'bg-[var(--macos-material-popover,rgba(255,255,255,0.90))] backdrop-blur-xl',
        'border border-[var(--color-semantic-line-primary-subtle)] border-l-4',
        'shadow-[var(--shadow-card)]',
        VARIANT_ACCENT[variant],
        className
      )}
    >
      {icon && (
        <span className="mt-0.5 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400">
          {icon}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">{title}</p>

        {message && (
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{message}</p>
        )}

        {actions && actions.length > 0 && (
          <div className="mt-2 flex gap-4">
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                className="text-xs font-semibold text-[var(--color-semantic-bg-primary)] hover:opacity-75 transition-opacity"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className={cn(
            'shrink-0 flex h-5 w-5 items-center justify-center rounded-full',
            'text-gray-400 hover:bg-gray-500/15 dark:hover:bg-white/10 transition-colors'
          )}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l6 6M7 1L1 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSNotificationBanner;
