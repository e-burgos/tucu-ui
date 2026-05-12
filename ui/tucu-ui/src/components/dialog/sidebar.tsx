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
}

export function Sidebar({
  className,
  children,
  title,
  actionContent,
  logo,
  onClose,
}: SidebarProps) {
  const { colorScheme, layout } = useTheme();
  const isMacOS =
    colorScheme === 'macos' ||
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE;

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full pointer-events-auto',
        isMacOS
          ? 'min-[500px]:w-72 bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl border-r border-[var(--color-semantic-line-primary-subtle)]'
          : 'border-dashed border-gray-200 dark:border-gray-700 bg-light-dark min-[500px]:w-80 lg:w-96 xl:w-96 2xl:w-96',
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-between overflow-hidden',
          isMacOS
            ? 'h-[52px] px-3 py-2 border-b border-[var(--color-semantic-line-primary-subtle)]'
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
              'border-[var(--color-semantic-line-primary-subtle)] bg-[var(--macos-control-bg)]',
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
