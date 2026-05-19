import { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';

export type MacOSTahoePopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export interface MacOSTahoePopoverItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export interface MacOSTahoePopoverProps {
  isOpen: boolean;
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: MacOSTahoePopoverPlacement;
  minWidth?: number;
  className?: string;
  contentClassName?: string;
  onClose: () => void;
}

const placementStyles: Record<MacOSTahoePopoverPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-[8px]',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-[8px]',
  left: 'right-full top-1/2 -translate-y-1/2 mr-[8px]',
  right: 'left-full top-1/2 -translate-y-1/2 ml-[8px]',
  'top-start': 'bottom-full left-0 mb-[8px]',
  'top-end': 'bottom-full right-0 mb-[8px]',
  'bottom-start': 'top-full left-0 mt-[8px]',
  'bottom-end': 'top-full right-0 mt-[8px]',
};

export function MacOSTahoePopoverItem({
  label,
  icon,
  shortcut,
  disabled,
  destructive,
  onClick,
}: MacOSTahoePopoverItemProps) {
  return (
    <button
      data-tucu="tahoe-popover-item"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-[10px] rounded-[8px] px-[10px] py-[6px] text-left text-[13px] transition-colors',
        disabled && 'pointer-events-none opacity-40',
        destructive
          ? 'text-red-500 hover:bg-red-500/10'
          : 'text-(--macos-tahoe-text) hover:bg-(--macos-tahoe-hover)'
      )}
    >
      {icon && (
        <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1">{label}</span>
      {shortcut && (
        <kbd className="ml-[12px] text-[11px] text-(--macos-tahoe-text-muted)">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

export function MacOSTahoePopover({
  isOpen,
  content,
  children,
  placement = 'bottom-start',
  minWidth = 200,
  className,
  contentClassName,
  onClose,
}: MacOSTahoePopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      {children}

      {isOpen && (
        <div
          data-tucu="tahoe-popover"
          className={cn(
            'absolute z-50 p-[6px]',
            'rounded-[12px]',
            'bg-(--macos-glass-prominent-bg) backdrop-blur-(--macos-glass-prominent-blur,40px)',
            'border border-(--macos-glass-prominent-border,var(--macos-glass-border))',
            'shadow-(--macos-glass-shadow,0_8px_32px_rgba(0,0,0,0.15))',
            'animate-in fade-in-0 zoom-in-95',
            placementStyles[placement],
            contentClassName
          )}
          style={{ minWidth }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default MacOSTahoePopover;
