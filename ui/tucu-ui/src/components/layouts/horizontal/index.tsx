import { LogoPropTypes } from '../../logos/logo';
import cn from 'classnames';
import { IMenuItem } from '../menus/menu-item';
import { HorizontalHeader } from '../header/horizontal-header';

interface HorizontalLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  className?: string;
  isOpen: boolean;
  fullWidth?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function HorizontalLayout({
  children,
  menuItems,
  rightButton,
  logo,
  className,
  isOpen,
  fullWidth = false,
  headerClassName,
  contentClassName,
  setIsOpen,
}: HorizontalLayoutProps) {
  return (
    <div className={cn(className)}>
      <HorizontalHeader
        rightButton={rightButton}
        menuItems={menuItems}
        logo={logo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={headerClassName}
      />
      <main
        className={cn(
          fullWidth
            ? 'min-h-full w-full h-full px-[0px]'
            : 'min-h-full px-[8px] pb-[96px] pt-[16px] sm:px-[24px] lg:px-[32px] 3xl:px-[40px] sm:pb-[96px] xl:pb-[96px] xl:pt-[16px]',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default HorizontalLayout;
