import cn from 'classnames';
import { Drawer } from '../../dialog';
import { LogoPropTypes } from '../../logos';
import ExpandableSidebar from '../menus/expandable-sidebar';
import { IMenuItem } from '../menus/menu-item';
import { AdminHeader } from '../header/admin-header';
import { useTheme } from '../../../themes/hooks/use-theme';

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
   * Controlled pinned state forwarded to the sidebar's `pinned` prop. When
   * set, persistence becomes the consumer's responsibility (pair with
   * `onSidebarPinnedChange`); when omitted, the pinned state persists
   * automatically through the theme store.
   */
  sidebarPinned?: boolean;
  /**
   * Initial pinned state forwarded to the sidebar's `defaultPinned` prop,
   * honored until the user toggles for the first time.
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
  const { isSidebarPinned } = useTheme();
  // Mirrors the sidebar's own pinned resolution: controlled prop first, then
  // the persisted store value, then the consumer's default. While pinned the
  // sidebar stays at its expanded width, so the content pads accordingly
  // instead of being covered by it.
  const isPinned =
    sidebarPinned !== undefined
      ? sidebarPinned
      : isSidebarPinned ?? defaultSidebarPinned ?? false;

  return (
    <div
      data-tucu="admin-layout"
      className={cn(
        'transition-[padding] duration-200',
        isPinned
          ? 'xl:ltr:pl-[288px] xl:rtl:pr-[288px] 2xl:ltr:pl-[320px] 2xl:rtl:pr-[320px]'
          : 'xl:ltr:pl-[96px] xl:rtl:pr-[96px] 2xl:ltr:pl-[112px] 2xl:rtl:pr-[112px]',
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
