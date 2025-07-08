import cn from 'classnames';
import { ClassicHeader } from '../header/header';
import { Drawer } from '../../dialog';
import { LogoPropTypes } from '../../logos';
import ExpandableSidebar from '../menus/expandable-sidebar';
import { IMenuItem } from '../../common/menu-item';

interface ClassicLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ClassicLayout({
  logo,
  children,
  menuItems,
  rightButton,
  isOpen,
  className,
  setIsOpen,
}: ClassicLayoutProps) {
  return (
    <div
      className={cn(
        'xl:ltr:pl-24 xl:rtl:pr-24 2xl:ltr:pl-28 2xl:rtl:pr-28',
        className
      )}
    >
      <ClassicHeader
        logo={logo}
        rightButton={rightButton}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
          'min-h-full px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-5 3xl:px-10'
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default ClassicLayout;
