import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Logo, LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { PRESET_LABEL_COLORS, useTheme } from '../../../themes';

function HeaderRightArea({ rightButton }: { rightButton?: React.ReactNode }) {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
      {rightButton && rightButton}
    </div>
  );
}

export function ClassicHeader({
  className,
  logo,
  rightButton,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const breakPoint = useBreakpoint();
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  const { preset } = useTheme();

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 backdrop-blur-lg shadow-md h-16 w-full transition-all duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 dark:bg-dark/80 shadow-card'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => (logo?.path ? navigate(logo?.path) : null)}
            className="flex items-center xl:hidden"
          >
            <Logo
              preset={preset?.label as PRESET_LABEL_COLORS}
              isoType={breakPoint === 'sm' || breakPoint === 'xs'}
              {...(logo as LogoPropTypes)}
            />
          </div>
        </div>
        <HeaderRightArea
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={isOpen}
                  onClick={() => setIsOpen && setIsOpen(true)}
                  color="white"
                  className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
                />
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
}

export default function Header({
  logo,
  searchButton,
  isOpen,
  setIsOpen,
  className,
  rightButton,
}: {
  logo?: LogoPropTypes;
  searchButton?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
  rightButton?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  const breakPoint = useBreakpoint();
  const lg = breakPoint === 'lg';

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur-sm transition-shadow duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 shadow-card dark:bg-dark/80'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => (logo?.path ? navigate(logo?.path) : null)}
            className="flex items-center xl:hidden"
          >
            <Logo isoType={lg} {...(logo as LogoPropTypes)} />
          </div>
          {searchButton && searchButton}
        </div>
        <HeaderRightArea
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={isOpen}
                  onClick={() => setIsOpen && setIsOpen(true)}
                  color="white"
                  className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
                />
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
}
