import { useEffect, useRef } from 'react';
import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export type MacOSPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface MacOSPopoverProps {
  isOpen: boolean;
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: MacOSPopoverPlacement;
  minWidth?: number;
  className?: string;
  contentClassName?: string;
  onClose?: () => void;
}

// ─── Placement classes ─────────────────────────────────────────

const PLACEMENT: Record<MacOSPopoverPlacement, string> = {
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-[8px]',
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-[8px]',
  left:   'right-full top-1/2 -translate-y-1/2 mr-[8px]',
  right:  'left-full top-1/2 -translate-y-1/2 ml-[8px]',
};

// ─── MacOSPopover ──────────────────────────────────────────────

export function MacOSPopover({
  isOpen,
  content,
  children,
  placement = 'bottom',
  minWidth = 200,
  className,
  contentClassName,
  onClose,
}: MacOSPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      {children}

      {isOpen && (
        <div
          role="dialog"
          style={{ minWidth }}
          className={cn(
            'absolute z-50',
            'overflow-hidden rounded-[16px]',
            'bg-[var(--macos-material-popover,rgba(255,255,255,0.90))] backdrop-blur-2xl',
            'border border-[var(--color-semantic-line-primary-subtle)]',
            'shadow-[var(--shadow-main)]',
            PLACEMENT[placement],
            contentClassName
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// ─── MacOSPopoverItem — list item inside a popover ────────────

export interface MacOSPopoverItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function MacOSPopoverItem({
  label,
  icon,
  shortcut,
  destructive = false,
  disabled = false,
  onClick,
}: MacOSPopoverItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-[8px] px-[12px] py-[6px] text-[13px] transition-colors',
        destructive
          ? 'text-[#ff3b30] hover:bg-[#ff3b30]/10 dark:text-[#ff453a]'
          : 'text-gray-800 dark:text-gray-200 hover:bg-[var(--color-semantic-bg-primary)]/10',
        disabled && 'cursor-not-allowed opacity-40'
      )}
    >
      {icon && (
        <span className="h-[16px] w-[16px] shrink-0 text-gray-500 dark:text-gray-400">{icon}</span>
      )}
      <span className="flex-1 text-left">{label}</span>
      {shortcut && (
        <span className="shrink-0 text-[11px] text-gray-400 dark:text-gray-500">{shortcut}</span>
      )}
    </button>
  );
}

export default MacOSPopover;
