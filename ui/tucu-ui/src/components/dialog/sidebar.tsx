import React from 'react';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import Button from '../buttons';
import { Close } from '../icons/close';
import { useTheme } from '../../themes/hooks/use-theme';
import { LAYOUT_OPTIONS } from '../../themes/config';
export interface SidebarProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  actionContent?: React.ReactNode;
  logo?: LogoPropTypes;
  onClose?: () => void;
  position?: 'left' | 'right';
}

export function Sidebar({
  className,
  children,
  title,
  actionContent,
  logo,
  onClose,
  position = 'left',
}: SidebarProps) {
  const { colorScheme, layout } = useTheme();
  const isTahoe =
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isMacOS =
    colorScheme === 'macos' ||
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;

  if (isTahoe) {
    return (
      <div
        className={cn(
          'pointer-events-none relative flex h-full w-full items-stretch p-3 min-[500px]:p-4',
          position === 'right' ? 'justify-end' : 'justify-start'
        )}
      >
        <aside
          data-tucu="macos-tahoe-drawer"
          className={cn(
            'pointer-events-auto flex h-full w-80 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[30px] border border-border bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]',
            className
          )}
        >
          <div className="shrink-0 px-5 pb-3 pt-5 flex items-center justify-between gap-3">
            {logo && <Logo {...(logo as LogoPropTypes)} size="small" />}
            {title && (
              <span className="text-[16px] font-semibold text-(--macos-tahoe-text) dark:text-white/90">
                {title}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
            >
              <Close className="h-3.5 w-3.5" width={14} height={14} />
            </button>
          </div>
          <div className="overflow-y-auto h-full px-3 py-2">{children}</div>
          {actionContent && (
            <div className="absolute bottom-4 left-0 z-10 w-full flex gap-2 px-3">
              {actionContent}
            </div>
          )}
        </aside>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full pointer-events-auto',
        isMacOS
          ? 'min-[500px]:w-[300px] bg-light-dark backdrop-blur-xl border-r border-[var(--color-border)]'
          : 'border-dashed border-[var(--color-border)] bg-light-dark min-[500px]:w-[300px] lg:w-96 xl:w-96 2xl:w-96',
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-between overflow-hidden',
          isMacOS
            ? 'h-[52px] px-3 py-2 border-b border-[var(--color-border)]'
            : 'h-[96px] px-[24px] py-[16px] 2xl:px-[32px]'
        )}
      >
        {!title && (
          <Logo
            {...(logo as LogoPropTypes)}
            size={isMacOS ? 'small' : logo?.size}
          />
        )}
        {title &&
          (isMacOS ? (
            <div
              role="heading"
              aria-level={2}
              className="text-[16px] leading-5 font-semibold tracking-[0.005em] text-gray-700 dark:text-gray-200"
            >
              {title}
            </div>
          ) : (
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white">
              {title}
            </h2>
          ))}
        {isMacOS ? (
          <button
            type="button"
            aria-label="Close"
            title="Close"
            onClick={onClose}
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border transition-colors',
              'border-[var(--color-border)] bg-[var(--macos-control-bg)]',
              'text-gray-500 hover:bg-black/4 hover:text-gray-700',
              'dark:text-gray-300 dark:hover:bg-white/8 dark:hover:text-white'
            )}
          >
            <Close className="h-3 w-3" width={12} height={12} />
          </button>
        ) : (
          <Button
            title="Close"
            shape="circle"
            variant="ghost"
            size="mini"
            onClick={onClose}
            onTouchStart={onClose}
            onTouchEnd={onClose}
          >
            <Close className="h-[16px] w-[16px]" width={16} height={16} />
          </Button>
        )}
      </div>
      <div
        className={cn(
          'overflow-y-auto',
          isMacOS ? 'h-[calc(100%-52px)]' : 'h-[calc(100%-96px)]'
        )}
      >
        <div
          className={cn(isMacOS ? 'px-2 py-2' : 'px-[24px] pb-[80px] pt-[4px]')}
        >
          {children}
        </div>
      </div>
      {actionContent && (
        <div
          className={cn(
            'absolute bottom-[16px] left-0 z-10 w-full flex gap-[8px]',
            isMacOS ? 'px-3' : 'px-[24px]'
          )}
        >
          {actionContent}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
