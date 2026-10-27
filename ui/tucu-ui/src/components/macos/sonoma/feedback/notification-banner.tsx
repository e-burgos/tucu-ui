'use client';

import { useState } from 'react';
import { cn } from '../../../../libs/cn';
import { useTucuMessages } from '../../../../libs/i18n/use-tucu-messages';

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
  actions?: MacOSNotificationAction[] | React.ReactNode;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
}

// ─── Default icons per variant ─────────────────────────────────

const variantIcon: Record<MacOSNotificationVariant, React.ReactNode> = {
  info: (
    <svg className="h-[20px] w-[20px]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg className="h-[20px] w-[20px]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="h-[20px] w-[20px]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="h-[20px] w-[20px]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const variantIconColor: Record<MacOSNotificationVariant, string> = {
  info: 'text-[var(--color-semantic-bg-primary)]',
  // Apple's accessible system colors: ≥ 3:1 on the toast surface
  success: 'text-[#248a3d] dark:text-[#30d158]',
  warning: 'text-[#c93400] dark:text-[#ff9f0a]',
  error: 'text-[#d70015] dark:text-[#ff453a]',
};

// ─── Accent stripes per variant ────────────────────────────────

const VARIANT_ACCENT: Record<MacOSNotificationVariant, string> = {
  info: 'border-l-[var(--color-semantic-bg-primary)]',
  success: 'border-l-[#34c759]',
  warning: 'border-l-[#ff9500]',
  error: 'border-l-[#ff3b30]',
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
  const messages = useTucuMessages();

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const renderActions = () => {
    if (!actions) return null;
    if (Array.isArray(actions)) {
      return (
        <div className="mt-[8px] flex gap-[16px]">
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
      );
    }
    return (
      <div className="mt-[8px] flex items-center gap-[8px]">{actions}</div>
    );
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-[12px] rounded-[12px] px-[16px] py-[12px]',
        'bg-[color:var(--tucu-toast-bg,var(--tucu-toast-bg-default))] text-[color:var(--tucu-toast-fg,var(--tucu-toast-fg-default))]',
        'border border-[color:var(--tucu-toast-border,var(--tucu-toast-border-default))] border-l-4',
        '[box-shadow:var(--tucu-toast-shadow,var(--tucu-toast-shadow-default))]',
        VARIANT_ACCENT[variant],
        className
      )}
    >
      {/* Icon */}
      <div className={cn('mt-[2px] shrink-0', variantIconColor[variant])}>
        {icon || variantIcon[variant]}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[color:var(--tucu-toast-fg,var(--tucu-toast-fg-default))]">
          {title}
        </p>

        {message && (
          <p className="mt-[2px] text-xs text-[color:var(--tucu-toast-fg-muted,var(--tucu-toast-fg-muted-default))]">
            {message}
          </p>
        )}

        {renderActions()}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label={messages.toast.dismiss}
          className={cn(
            'shrink-0 flex h-[20px] w-[20px] items-center justify-center rounded-full',
            'text-[color:var(--tucu-toast-fg-muted,var(--tucu-toast-fg-muted-default))] hover:bg-gray-500/15 dark:hover:bg-white/10 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)'
          )}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l6 6M7 1L1 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSNotificationBanner;
