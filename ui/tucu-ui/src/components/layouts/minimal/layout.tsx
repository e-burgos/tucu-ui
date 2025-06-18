import Logo, { LogoPropTypes } from '../../logos/logo';
import cn from 'classnames';
import { FlashIcon } from '../../icons/flash';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { Drawer, IMenuItem, SidebarMenu } from '../../drawer';
import { SearchIcon } from '../../icons/search';

function HeaderRightArea({
  rightButton,
  menuItems,
  isOpen,
  setIsOpen,
  onClickNotification,
  onClickSearch,
}: {
  rightButton?: React.ReactNode;
  menuItems: IMenuItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
}) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden">
        {onClickSearch && (
          <SearchIcon
            className="h-auto w-3.5 sm:w-auto"
            onClick={onClickSearch}
          />
        )}
      </div>

      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) === -1 && (
          <div>
            <SearchIcon
              className="h-auto w-3.5 sm:w-auto"
              onClick={onClickSearch}
            />
          </div>
        )}
        {onClickNotification && (
          <FlashIcon
            className="h-auto w-3 sm:w-auto"
            onClick={onClickNotification}
          />
        )}
        {rightButton && rightButton}
      </div>

      <div className="flex items-center lg:hidden">
        {onClickNotification && (
          <FlashIcon
            className="h-auto w-3 sm:w-auto"
            onClick={onClickNotification}
          />
        )}
        {rightButton && rightButton}
        <Hamburger
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          color="white"
          className="shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white ltr:sm:ml-5 rtl:sm:mr-5"
        />
        <Drawer
          type="sidebar-menu"
          position="left"
          backdrop={true}
          menuItems={menuItems}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export function Header({
  menuItems,
  rightButton,
  logo,
  isOpen,
  onClickNotification,
  onClickSearch,
  setIsOpen,
}: {
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  isOpen: boolean;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 flex w-full backdrop-blur items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        isMounted && windowScroll.y > 17
          ? 'h-16 bg-white/80 shadow-card sm:h-20 dark:bg-dark/80'
          : 'h-16 sm:h-24'
      )}
    >
      <div className="mx-auto flex w-full max-w-[2160px] items-center justify-between">
        <div className="flex items-center">
          <div className="hidden lg:mr-6 lg:block xl:hidden">
            <Hamburger
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              color="white"
              className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
            />
          </div>
          {logo && (
            <Logo name={logo?.name || ''} secondName={logo?.secondName || ''} />
          )}
          {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) === -1 && (
            <SidebarMenu
              menuItems={menuItems}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
        <HeaderRightArea
          rightButton={rightButton}
          menuItems={menuItems}
          onClickNotification={onClickNotification}
          onClickSearch={onClickSearch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </nav>
  );
}

interface MinimalLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
}

export default function MinimalLayout({
  children,
  menuItems,
  rightButton,
  logo,
  isOpen,
  onClickNotification,
  onClickSearch,
  setIsOpen,
}: MinimalLayoutProps) {
  return (
    <>
      <Header
        onClickNotification={onClickNotification}
        onClickSearch={onClickSearch}
        rightButton={rightButton}
        menuItems={menuItems}
        logo={logo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="bg-light-100 dark:bg-dark-100 mt-8 flex min-h-full flex-col gap-6 px-4 sm:px-6 lg:px-8 3xl:px-10">
        <main className="mx-auto mb-12 flex w-full max-w-[2160px] flex-grow flex-col @container">
          {children}
        </main>
      </div>
    </>
  );
}
