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
  /**
   * Logo forwarded to the sidebar's collapsed rail. See
   * `ExpandableSidebar`'s `collapsedLogo` prop.
   */
  collapsedLogo?: LogoPropTypes;
  className?: string;
  isOpen: boolean;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  /**
   * Controlled pinned state forwarded to the sidebar's `pinned` prop.
   * Persisting the pinned state is the consumer's responsibility.
   */
  sidebarPinned?: boolean;
  /**
   * Initial pinned state forwarded to the sidebar's `defaultPinned` prop.
   */
  defaultSidebarPinned?: boolean;
  /**
   * Forwarded to the sidebar's `onPinnedChange` prop.
   */
  onSidebarPinnedChange?: (pinned: boolean) => void;
}

export function AdminLayout({
  logo,
  collapsedLogo,
  children,
  menuItems,
  rightButton,
  isOpen,
  className,
  headerClassName,
  contentClassName,
  fullWidth = false,
  setIsOpen,
  sidebarPinned,
  defaultSidebarPinned,
  onSidebarPinnedChange,
}: AdminLayoutProps) {
  return (
    <div
      data-tucu="admin-layout"
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
        collapsedLogo={collapsedLogo}
        className="hidden xl:block"
        menuItems={menuItems}
        pinned={sidebarPinned}
        defaultPinned={defaultSidebarPinned}
        onPinnedChange={onSidebarPinnedChange}
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
        data-tucu="admin-content"
        className={cn(
          fullWidth
            ? 'min-h-full w-full h-full px-[0px]'
            : 'min-h-full px-[16px] pb-[96px] pt-[16px] sm:px-[24px] sm:pb-[96px] lg:px-[32px] xl:pb-[96px] xl:pt-[20px] min-[1780px]:px-[40px]',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
