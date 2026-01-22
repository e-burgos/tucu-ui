import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Logo, LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { PRESET_LABEL_COLORS, useTheme } from '../../../themes';
import { AdminRightArea } from './admin-right-area';

export function AdminHeader({
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
  const { primaryPreset } = useTheme();

  const isExternalUrl = (url: string): boolean => {
    return /^https?:\/\//i.test(url);
  };

  const handleNavigation = (url: string) => {
    if (isExternalUrl(url)) {
      window.location.href = url;
    } else {
      navigate(url);
    }
  };

  const smallScreen = breakPoint === 'sm' || breakPoint === 'xs' || breakPoint === 'md' || breakPoint === 'lg';

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 backdrop-blur-lg min-h-[72px] h-[72px] w-full transition-all duration-300 ltr:right-0 rtl:left-0',
        ((isMounted && windowScroll.y) as number) > 2 && 'shadow-card',
        smallScreen ? 'shadow-card border-b border-transparent dark:border-gray-800' : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-[16px] sm:px-[24px] lg:px-[32px] 3xl:px-[40px]">
        <div className="flex items-center">
          <div
            onClick={() => (logo?.path ? handleNavigation(logo.path) : null)}
            className="flex items-center xl:hidden"
          >
            {breakPoint === 'sm' || breakPoint === 'xs' ? (
              <Logo
                preset={primaryPreset?.label as PRESET_LABEL_COLORS}
                {...(logo as LogoPropTypes)}
                name=""
                secondName=""
              />
            ) : (
              <Logo
                preset={primaryPreset?.label as PRESET_LABEL_COLORS}
                isoType={breakPoint === 'sm' || breakPoint === 'xs'}
                {...(logo as LogoPropTypes)}
              />
            )}
          </div>
        </div>
        <AdminRightArea
          rightButton={
            <div className="flex flex-row items-center justify-center">
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
