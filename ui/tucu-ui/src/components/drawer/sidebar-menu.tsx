import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import { MenuItem } from '../common/menu-item';
import Button from '../buttons';
import Scrollbar from '../common/scrollbar';
import { X } from 'lucide-react';
import { IMenuItem } from '../common/menu-item';

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
      href: item.href,
      hide: item.hide,
      isActive: item.isActive,
      onClick: item.onClick,
      ...(item.dropdownItems && {
        dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
          name: dropdownItem.name,
          ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
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
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body dark:border-gray-700 dark:bg-dark xs:w-80 2xl:w-96',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        {logo && (
          <Logo
            name={logo.name}
            secondName={logo.secondName}
            preset={logo.preset}
            isoType={logo.isoType}
          />
        )}
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
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-4 2xl:px-6 pb-20">
          {children}
          {sidebarMenu &&
            sidebarMenu.map((item, index) => (
              <MenuItem
                onClick={onClose}
                key={`menu-item-${index}`}
                name={item.name}
                href={item.href}
                icon={item.icon}
                hide={item.hide}
                isActive={item.isActive}
                dropdownItems={item.dropdownItems}
              />
            ))}
        </div>
      </Scrollbar>
      <div className="absolute bottom-4 left-0 z-10 w-full px-6 flex gap-2">
        {actionContent}
      </div>
    </aside>
  );
}

export default SidebarMenu;
