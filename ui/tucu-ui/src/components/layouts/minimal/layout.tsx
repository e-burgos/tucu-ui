import Logo, { LogoPropTypes } from '../../logos/logo';
import cn from 'classnames';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { Drawer } from '../../drawer';
import { IMenuItem } from '../../common/menu-item';
import MinimalNavMenu from '../menus/minimal-nav-menu';
import { PRESET_LABEL_COLORS, useTheme } from '../../../themes';

function HeaderRightArea({
  rightButton,
  menuItems,
  isOpen,
  setIsOpen,
  logo,
}: {
  rightButton?: React.ReactNode;
  menuItems: IMenuItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  logo?: LogoPropTypes;
}) {
  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        {rightButton && rightButton}
      </div>
      <div className="flex items-center lg:hidden">
        {rightButton && rightButton}
        <Hamburger
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          color="white"
          className="shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white sm:ltr:ml-5 sm:rtl:mr-5"
        />
        <Drawer
          type="sidebar-menu"
          logo={logo}
          position="left"
          backdrop={true}
          menuItems={menuItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
  setIsOpen,
}: {
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  const { preset } = useTheme();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 flex w-full backdrop-blur-lg shadow-md items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        isMounted && windowScroll.y > 17
          ? 'min-h-24 bg-white/80 shadow-card sm:h-24 dark:bg-dark/80'
          : 'min-h-18 sm:h-24'
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
            <Logo
              name={logo?.name || ''}
              secondName={logo?.secondName || ''}
              isoType={breakpoint === 'xs' ? true : false}
              preset={preset?.label as PRESET_LABEL_COLORS}
            />
          )}
          {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) === -1 && (
            <MinimalNavMenu menuItems={menuItems} />
          )}
        </div>
        <HeaderRightArea
          rightButton={rightButton}
          menuItems={menuItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          logo={logo}
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
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MinimalLayout({
  children,
  menuItems,
  rightButton,
  logo,
  className,
  isOpen,
  setIsOpen,
}: MinimalLayoutProps) {
  return (
    <div className={cn(className)}>
      <Header
        rightButton={rightButton}
        menuItems={menuItems}
        logo={logo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className="bg-light-100 dark:bg-dark-100 flex p-4 sm:p-6 lg:p-8 3xl:p-10">
        {children}
      </main>
    </div>
  );
}

export default MinimalLayout;
