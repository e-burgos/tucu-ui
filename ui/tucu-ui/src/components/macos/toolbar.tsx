import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSToolbarProps {
  title?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  center?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  transparent?: boolean;
  bordered?: boolean;
}

// ─── MacOSToolbar ──────────────────────────────────────────────

export function MacOSToolbar({
  title,
  leading,
  trailing,
  center,
  children,
  className,
  transparent = false,
  bordered = true,
}: MacOSToolbarProps) {
  return (
    <header
      className={cn(
        'flex h-[var(--macos-toolbar-height,44px)] shrink-0 items-center gap-3 px-4',
        !transparent && [
          'bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl',
        ],
        bordered && 'border-b border-[var(--color-semantic-line-primary-subtle)]',
        className
      )}
    >
      {/* Leading slot */}
      {leading && (
        <div className="flex shrink-0 items-center gap-2">{leading}</div>
      )}

      {/* Center / title */}
      <div className="flex flex-1 items-center justify-center">
        {center ?? (
          title && (
            <span className="select-none text-[13px] font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </span>
          )
        )}
        {children}
      </div>

      {/* Trailing slot */}
      {trailing && (
        <div className="flex shrink-0 items-center gap-2">{trailing}</div>
      )}
    </header>
  );
}

export default MacOSToolbar;
