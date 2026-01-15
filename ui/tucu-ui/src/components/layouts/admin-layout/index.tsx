import cn from 'classnames';
import { Drawer } from '../../dialog';
import { LogoPropTypes } from '../../logos';
import ExpandableSidebar from '../menus/expandable-sidebar';
import { IMenuItem } from '../menus/menu-item';
import { AdminHeader } from '../header/admin-header';

interface AdminLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  className?: string;
  isOpen: boolean;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AdminLayout({
  logo,
  children,
  menuItems,
  rightButton,
  isOpen,
  className,
  headerClassName,
  contentClassName,
  fullWidth = false,
  setIsOpen,
}: AdminLayoutProps) {
  return (
    <div
      className={cn(
        'xl:ltr:pl-[96px] xl:rtl:pr-[96px] 2xl:ltr:pl-[112px] 2xl:rtl:pr-[112px]',
        className
      )}
    >
      <AdminHeader
        logo={logo}
        rightButton={rightButton}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={headerClassName}
      />
      <ExpandableSidebar
        logo={logo}
        className="hidden xl:block"
        menuItems={menuItems}
      />
      <Drawer
        type="sidebar-menu"
        position="left"
        backdrop={true}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen && setIsOpen(false)}
        logo={logo}
      />
      <main
        className={cn(
          fullWidth
            ? 'min-h-full w-full h-full px-[0px]'
            : 'min-h-full px-[16px] pb-[96px] pt-[16px] sm:px-[24px] sm:pb-[96px] lg:px-[32px] xl:pb-[96px] xl:pt-[20px] 3xl:px-[40px]',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
