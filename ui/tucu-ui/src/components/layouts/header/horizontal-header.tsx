import Logo, { LogoPropTypes } from '../../logos/logo';
import cn from 'classnames';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { IMenuItem } from '../menus/menu-item';
import HorizontalNavMenu from '../menus/horizontal-nav-menu';
import { PRESET_LABEL_COLORS, useTheme } from '../../../themes';
import { HorizontalRightArea } from './horizontal-right-area';

export function HorizontalHeader({
  className,
  menuItems,
  rightButton,
  logo,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  const { primaryPreset } = useTheme();
  return (
    <nav
      className={cn(
        // 'sticky top-0 z-30 flex w-full max-w-screen overflow-x-auto overflow-y-hidden backdrop-blur-lg shadow-md items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        'sticky top-0 z-30 flex w-full border-b border-transparent dark:border-gray-800 items-center justify-between px-[16px] transition-all duration-300 backdrop-blur-lg shadow-md ltr:right-0 rtl:left-0 sm:px-[24px] lg:px-[32px] 3xl:px-[40px]',
        isMounted && windowScroll.y > 17
          ? 'min-h-[72px] shadow-card'
          : '',
        className
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-[24px]">
          {logo && (
            <Logo
              isoType={breakpoint === 'xs' ? true : false}
              preset={primaryPreset?.label as PRESET_LABEL_COLORS}
              {...(logo as LogoPropTypes)}
            />
          )}
          {isMounted && ['xs', 'sm', 'md'].indexOf(breakpoint) === -1 && (
            <HorizontalNavMenu menuItems={menuItems} />
          )}
        </div>
        <HorizontalRightArea
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
