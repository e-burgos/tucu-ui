import React from 'react';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import { MenuItem, IMenuItem } from '../layouts/menus/menu-item';
import Button from '../buttons';
import { Close } from '../icons/close';
import { useTheme } from '../../themes/hooks/use-theme';
import { LAYOUT_OPTIONS } from '../../themes/config';

export function SidebarMenu({
  className,
  menuItems,
  children,
  title,
  actionContent,
  onClose,
  logo,
  position = 'left',
}: {
  className?: string;
  menuItems: IMenuItem[];
  children?: React.ReactNode;
  title?: string;
  actionContent?: React.ReactNode;
  onClose: () => void;
  logo?: LogoPropTypes;
  position?: 'left' | 'right';
}) {
  const { layout } = useTheme();
  const isTahoe =
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isMacOS =
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;

  const sidebarMenu =
    menuItems &&
    menuItems?.map((item) => ({
      name: item.name,
      icon: item.icon,
      path: item.path,
      href: item.href,
      hide: item.hide,
      isActive: item.isActive,
      onClick: item.onClick,
      ...(item.dropdownItems && {
        dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
          name: dropdownItem.name,
          ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
          path: dropdownItem.path,
          href: dropdownItem.href,
          hide: dropdownItem.hide,
          isActive: dropdownItem.isActive,
          onClick: dropdownItem.onClick,
        })),
      }),
    }));

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
            'pointer-events-auto flex h-full w-[272px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]',
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
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
            >
              <Close className="h-3.5 w-3.5" width={14} height={14} />
            </button>
          </div>
          <div className="overflow-y-auto h-full px-3 py-2">
            {children}
            {sidebarMenu &&
              sidebarMenu.map((item, index) => (
                <MenuItem
                  onClick={onClose}
                  key={`menu-item-${index}`}
                  name={item.name}
                  path={item.path}
                  href={item.href}
                  icon={item.icon}
                  hide={item.hide}
                  isActive={item.isActive}
                  dropdownItems={
                    item.dropdownItems &&
                    item.dropdownItems.map((dropdownItem) => ({
                      ...dropdownItem,
                      onClick: onClose,
                    }))
                  }
                />
              ))}
          </div>
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
          ? 'min-[500px]:w-80 bg-(--macos-material-toolbar,rgba(255,255,255,0.72)) backdrop-blur-xl border-r border-(--color-semantic-line-primary-subtle)'
          : 'border-dashed border-gray-200 dark:border-gray-700 bg-light-dark min-[500px]:w-80 2xl:w-96',
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
        {logo && (
          <Logo
            {...(logo as LogoPropTypes)}
            size={isMacOS ? 'small' : logo?.size}
          />
        )}
        {title && (
          <h2
            className={cn(
              isMacOS
                ? 'text-[13px] font-semibold text-gray-700 dark:text-gray-200'
                : 'text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white'
            )}
          >
            {title}
          </h2>
        )}
        <Button
          title="Close"
          shape="circle"
          variant="ghost"
          size="mini"
          onClick={onClose}
          onTouchStart={onClose}
          onTouchEnd={onClose}
        >
          <Close className="h-[8px] w-[8px]" width={16} height={16} />
        </Button>
      </div>
      <div
        className={cn(
          'overflow-y-auto',
          isMacOS ? 'h-[calc(100%-52px)]' : 'h-[calc(100%-96px)]'
        )}
      >
        <div
          className={cn(
            isMacOS ? 'px-2 py-2' : 'px-[16px] 2xl:px-[24px] pb-[80px]'
          )}
        >
          {children}
          {sidebarMenu &&
            sidebarMenu.map((item, index) => (
              <MenuItem
                onClick={onClose}
                key={`menu-item-${index}`}
                name={item.name}
                path={item.path}
                href={item.href}
                icon={item.icon}
                hide={item.hide}
                isActive={item.isActive}
                dropdownItems={
                  item.dropdownItems &&
                  item.dropdownItems.map((dropdownItem) => ({
                    ...dropdownItem,
                    onClick: onClose,
                  }))
                }
              />
            ))}
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

export default SidebarMenu;
