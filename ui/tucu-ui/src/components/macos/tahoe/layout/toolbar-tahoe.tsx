import cn from 'classnames';
import type { MacOSToolbarProps } from '../controls/types';

/**
 * Tahoe toolbar — glass panel with tahoe-specific border and blur.
 */
export function MacOSToolbarTahoe({
  title,
  leading,
  trailing,
  center,
  children,
  className,
  bordered = true,
}: MacOSToolbarProps) {
  return (
    <header
      data-tucu="toolbar-tahoe"
      className={cn(
        'relative z-20 flex h-(--macos-toolbar-height,58px) shrink-0 items-center gap-[12px] px-[20px] min-[500px]:px-[24px]',
        'bg-(--macos-tahoe-toolbar-bg) backdrop-blur-xl',
        bordered && 'border-b border-border',
        className
      )}
    >
      {leading && (
        <div className="flex shrink-0 items-center gap-[8px]">{leading}</div>
      )}

      <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
        {center ??
          (title && (
            <span className="select-none truncate text-[14px] font-semibold tracking-[0.01em] text-(--macos-tahoe-text)">
              {title}
            </span>
          ))}
        {children}
      </div>

      {trailing && (
        <div className="flex shrink-0 items-center gap-[8px]">{trailing}</div>
      )}
    </header>
  );
}
