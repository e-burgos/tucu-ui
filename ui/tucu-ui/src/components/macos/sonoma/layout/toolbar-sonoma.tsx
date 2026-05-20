import cn from 'classnames';
import type { MacOSToolbarProps } from '../controls/types';

/**
 * Default macOS toolbar — translucent material background with blur.
 * Used by Sonoma layout.
 */
export function MacOSToolbarSonoma({
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
      data-tucu="toolbar"
      className={cn(
        'relative z-20 flex h-(--macos-toolbar-height,58px) shrink-0 items-center gap-[12px] px-[24px]!',
        !transparent &&
          'bg-(--macos-material-toolbar,rgba(255,255,255,0.72)) backdrop-blur-xl ',
        bordered && 'border-b border-black/10 dark:border-white/8',
        className
      )}
    >
      {leading && (
        <div className="flex shrink-0 items-center gap-[8px]">{leading}</div>
      )}

      <div className="flex flex-1 items-center justify-center">
        {center ??
          (title && (
            <span className="select-none text-[13px] font-semibold text-gray-800 dark:text-gray-100">
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
