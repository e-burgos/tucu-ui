import { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';

export interface MacOSTahoeDialogProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: number | string;
  onClose: () => void;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

export interface MacOSTahoeDialogButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'destructive';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function MacOSTahoeDialogButton({
  children,
  variant = 'default',
  onClick,
  disabled,
  className,
}: MacOSTahoeDialogButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex h-8 items-center justify-center rounded-lg px-4 text-[13px] font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--macos-tahoe-accent)/40',
        disabled && 'pointer-events-none opacity-40',
        variant === 'primary' && [
          'bg-(--macos-tahoe-accent) text-white',
          'hover:brightness-110 active:brightness-95',
        ],
        variant === 'destructive' && [
          'bg-red-500 text-white',
          'hover:bg-red-600 active:bg-red-700',
        ],
        variant === 'default' && [
          'bg-(--macos-glass-clear-bg) backdrop-blur-sm',
          'border border-(--macos-glass-border)',
          'text-(--macos-tahoe-text)',
          'hover:bg-(--macos-tahoe-hover)',
        ],
        className
      )}
    >
      {children}
    </button>
  );
}

export function MacOSTahoeDialog({
  open,
  title,
  children,
  footer,
  className,
  width = 420,
  onClose,
  closeOnOverlay = true,
  closeOnEscape = true,
}: MacOSTahoeDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) onClose();
    },
    [onClose, closeOnEscape]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  // Focus trap: focus dialog on open
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-tucu="tahoe-dialog-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        ref={dialogRef}
        data-tucu="tahoe-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex max-h-[80vh] flex-col overflow-hidden outline-none',
          'rounded-2xl',
          'bg-(--macos-glass-prominent-bg) backdrop-blur-(--macos-glass-prominent-blur,40px)',
          'border border-(--macos-glass-prominent-border,var(--macos-glass-border))',
          'shadow-[0_24px_80px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
          className
        )}
        style={{ width }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-(--macos-glass-border-subtle) px-6 py-4">
            <h2 className="text-[15px] font-semibold text-(--macos-tahoe-text)">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-md p-1 text-(--macos-tahoe-text-muted) transition-colors hover:text-(--macos-tahoe-text)"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-(--macos-glass-border-subtle) px-6 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default MacOSTahoeDialog;
