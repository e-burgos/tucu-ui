import React from 'react';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import { MenuItem, IMenuItem } from '../layouts/menus/menu-item';
import Button from '../buttons';
import { Close } from '../icons/close';
import Scrollbar from '../common/scrollbar';

export function SidebarMenu({
  className,
  menuItems,
  children,
  title,
  actionContent,
  onClose,
  logo,
}: {
  className?: string;
  menuItems: IMenuItem[];
  children?: React.ReactNode;
  title?: string;
  actionContent?: React.ReactNode;
  onClose: () => void;
  logo?: LogoPropTypes;
}) {
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

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 dark:border-gray-700 bg-light-dark xs:w-80 2xl:w-96',
        className
      )}
    >
      <div className="relative flex h-[96px] items-center justify-between overflow-hidden px-[24px] py-[16px] 2xl:px-[32px]">
        {logo && <Logo {...(logo as LogoPropTypes)} />}
        {title && (
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white">
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
      <Scrollbar className="h-[calc(100%-96px)] custom-scrollbar overflow-hidden overflow-y-auto">
        <div className="px-[16px] 2xl:px-[24px] pb-[80px]">
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
      </Scrollbar>
      {actionContent && (
        <div className="absolute bottom-[16px] left-0 z-10 w-full px-[24px] flex gap-[8px]">
          {actionContent}
        </div>
      )}
    </aside>
  );
}

export default SidebarMenu;
