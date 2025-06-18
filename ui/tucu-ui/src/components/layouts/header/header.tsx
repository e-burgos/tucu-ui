import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Logo, LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { useBreakpoint, useIsMounted, useWindowScroll } from '../../../hooks';
import { SearchIcon } from 'lucide-react';
import { FlashIcon } from '../../icons/flash';

function HeaderRightArea({
  notificationButton,
  rightButton,
}: {
  notificationButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
      {notificationButton && notificationButton}
      {rightButton && rightButton}
    </div>
  );
}

export function ClassicHeader({
  className,
  logo,
  rightButton,
  onClickNotification,
  onClickSearch,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const breakPoint = useBreakpoint();
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-all duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 dark:bg-dark/80 shadow-card'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => navigate('/')}
            className="flex items-center xl:hidden"
          >
            <Logo
              name={logo?.name || ''}
              secondName={logo?.secondName || ''}
              isoType={breakPoint === 'lg'}
            />
          </div>

          {onClickSearch && <SearchIcon onClick={onClickSearch} />}
        </div>
        <HeaderRightArea
          notificationButton={
            onClickNotification && (
              <FlashIcon
                className="h-auto w-3 sm:w-auto"
                onClick={onClickNotification}
              />
            )
          }
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={false}
                  onClick={() => setIsOpen && setIsOpen(!isOpen)}
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
  notificationButton,
  rightButton,
}: {
  logo?: { name: string; secondName: string };
  searchButton?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
  notificationButton?: React.ReactNode;
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
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-shadow duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 shadow-card dark:bg-dark/80'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => navigate('/')}
            className="flex items-center xl:hidden"
          >
            <Logo
              name={logo?.name || ''}
              secondName={logo?.secondName || ''}
              isoType={lg}
            />
          </div>
          {searchButton && searchButton}
        </div>
        <HeaderRightArea
          notificationButton={notificationButton}
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={isOpen}
                  onClick={() => setIsOpen && setIsOpen(!isOpen)}
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
