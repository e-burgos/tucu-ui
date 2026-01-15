import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Logo, LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { AdminRightArea } from './admin-right-area';

export function Header({
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

  const isExternalUrl = (url: string): boolean => {
    return /^https?:\/\//i.test(url);
  };

  const handleNavigation = (url: string, onClick?: () => void) => {
    if (isExternalUrl(url)) {
      window.location.href = url;
      onClick && onClick();
    } else {
      navigate(url);
      onClick && onClick();
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-[64px] w-full backdrop-blur-sm transition-shadow duration-300 ltr:right-0 rtl:left-0 sm:h-[80px] 3xl:h-[96px]',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'shadow-card bg-light-dark'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-[16px] sm:px-[24px] lg:px-[32px] 3xl:px-[40px]">
        <div className="flex items-center">
          <div
            onClick={() => (logo?.path ? handleNavigation(logo.path) : null)}
            className="flex items-center xl:hidden"
          >
            <Logo isoType={lg} {...(logo as LogoPropTypes)} />
          </div>
          {searchButton && searchButton}
        </div>
        <AdminRightArea
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-[8px] block sm:mx-[16px] xl:hidden">
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
