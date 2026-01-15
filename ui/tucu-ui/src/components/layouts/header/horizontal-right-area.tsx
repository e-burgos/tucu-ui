import { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { Drawer } from '../../dialog';
import { IMenuItem } from '../menus/menu-item';

export function HorizontalRightArea({
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
      <div className="hidden gap-[24px] lg:flex 2xl:gap-[32px]">
        {rightButton && rightButton}
      </div>
      <div className="flex items-center lg:hidden">
        {rightButton && rightButton}
        {menuItems.length > 0 && (
          <>
            <Hamburger
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              color="white"
              className="shadow-main ltr:ml-[14px] rtl:mr-[14px] w-[40px]! h-[40px]! sm:w-[48px]! sm:h-[48px]! md:w-[48px]! md:h-[48px]! dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white sm:ltr:ml-[20px] sm:rtl:mr-[20px]"
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
          </>
        )}
      </div>
    </div>
  );
}
