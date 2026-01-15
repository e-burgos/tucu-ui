import { useState, useEffect } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import ActiveLink from '../../links/active-link';
import { ChevronDown } from '../../icons/chevron-down';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../../hooks/use-is-mobile';
import { useMeasure } from '../../../hooks/use-measure';

type DropdownItemProps = {
  name: string;
  icon?: React.ReactNode;
  path: string;
  href?: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hide?: boolean;
  onClick?: () => void;
};

type IMenuItem = {
  name: string;
  icon?: React.ReactNode;
  path: string;
  href?: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hide?: boolean;
  onClick?: () => void;
};

type MenuItemProps = IMenuItem;

export function MenuItem({
  name,
  icon,
  path,
  href,
  dropdownItems,
  isActive: isActiveProps,
  hide,
  onClick,
}: MenuItemProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();

  const isParentActive =
    path?.toString()?.toLowerCase() === pathname?.toLowerCase();
  const isChildrenActive =
    dropdownItems && dropdownItems.some((item) => pathname.includes(item.path));

  const isActive = isParentActive || isChildrenActive || isActiveProps;

  useEffect(() => {
    if (isChildrenActive) setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChildrenActive]);

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

  const handleTouchStart = (url: string, onClick?: () => void) => {
    handleNavigation(url);
    setIsOpen(false);
    onClick && onClick();
  };

  const hrefToUse = href ? href : path;

  return (
    <div className="mb-[8px] min-h-[48px] list-none last:mb-[0px]">
      {!(dropdownItems?.length && !hide) && (
        <ActiveLink
          onTouchStart={() => {
            handleNavigation(hrefToUse, onClick);
          }}
          onClick={() => {
            handleNavigation(hrefToUse, onClick);
          }}
          path={path}
          href={href}
          to={hrefToUse}
          className={cn(
            'relative flex h-[48px] items-center whitespace-nowrap rounded-lg px-[16px] text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white',
            {
              'bg-brand': isActive,
            }
          )}
          activeClassName="text-white!"
        >
          <span
            className={cn(
              'relative z-1 w-[24px] h-[24px] ml-[-4px] duration-100 before:absolute before:-right-[12px] before:top-[50%] before:h-[4px] before:w-[4px] before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-[12px] rtl:ml-[12px]',
              {
                'text-white': isActive,
                'text-gray-500': !isActive && !name,
              }
            )}
          >
            {icon}
          </span>
          <span className="relative z-1">{name}</span>
          {path === pathname && (
            <motion.span
              className={cn(
                'absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand opacity-0 shadow-large transition-opacity'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </ActiveLink>
      )}
      {dropdownItems?.length && !hide && (
        <div
          onMouseEnter={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsOpen(isChildrenActive ? true : false);
          }}
          onTouchStart={() => setIsOpen(!isOpen)}
        >
          <ActiveLink
            activeClassName="bg-brand text-white"
            className={cn(
              'relative flex h-[48px] cursor-pointer items-center justify-between whitespace-nowrap rounded-lg px-[16px] text-sm transition-all',
              'text-gray-500 hover:text-brand dark:hover:text-white',
              hide && 'hidden',
              isActive && '!text-white !bg-brand'
            )}
            path={path}
            href={href}
            to={hrefToUse}
            onClick={() => {
              handleNavigation(hrefToUse, onClick);
            }}
          >
            <span className="z-1 flex items-center ltr:mr-[12px] rtl:ml-[12px]">
              <span
                className={cn(
                  'relative z-1 w-[24px] h-[24px] ml-[-4px] duration-100 before:absolute before:-right-[12px] before:top-[50%] before:h-[4px] before:w-[4px] before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-[12px] rtl:ml-[12px]'
                )}
              >
                {icon}
              </span>
              {name}
            </span>
            <span
              className={`z-1 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <ChevronDown />
            </span>
            {(isParentActive || isChildrenActive) && (
              <motion.span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand opacity-0 shadow-large transition-opacity'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </ActiveLink>
          <div
            style={{
              height: isOpen ? height : 0,
            }}
            className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] overflow-hidden transition-all duration-350"
          >
            <ul ref={ref as unknown as React.RefObject<HTMLUListElement>}>
              {isMobile && (
                <li
                  className={cn('first:pt-[8px]', hide && 'hidden')}
                  onTouchStart={() => handleTouchStart(hrefToUse, onClick)}
                >
                  <ActiveLink
                    path={path}
                    href={href}
                    to={hrefToUse}
                    className="flex items-center rounded-lg p-[12px] text-sm text-gray-500 transition-all before:h-[4px] before:w-[4px] before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-[24px] ltr:before:mr-[20px] rtl:pr-[24px] rtl:before:ml-[20px] dark:hover:text-white"
                    activeClassName="text-brand! dark:text-white! dark:before:bg-white! before:bg-brand! before:w-[8px]! before:h-[8px]! before:-ml-[2px] ltr:before:mr-[18px]! rtl:before:ml-[18px]! font-medium!"
                    onClick={() => {
                      handleNavigation(hrefToUse, onClick);
                    }}
                  >
                    {name}
                  </ActiveLink>
                </li>
              )}
              {dropdownItems.map((item, index) => {
                const ItemHrefToUse = item.href ? item.href : item.path;
                if (item.hide) return null;
                return (
                  <li
                    key={index}
                    className={cn('first:pt-[8px]', item.hide && 'hidden')}
                    onTouchStart={() =>
                      handleTouchStart(ItemHrefToUse, item?.onClick)
                    }
                  >
                    <ActiveLink
                      path={item.path}
                      href={item.href}
                      to={ItemHrefToUse}
                      className="flex items-center rounded-lg p-[12px] text-sm text-gray-500 transition-all before:h-[4px] before:w-[4px] before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-[24px] ltr:before:mr-[20px] rtl:pr-[24px] rtl:before:ml-[20px] dark:hover:text-white"
                      activeClassName="text-brand! dark:text-white! dark:before:bg-white! before:bg-brand! before:w-2! before:h-2! before:-ml-0.5 ltr:before:mr-[18px]! rtl:before:ml-[18px]! font-medium!"
                      onClick={() => {
                        handleNavigation(ItemHrefToUse, item?.onClick);
                      }}
                    >
                      {item.name}
                    </ActiveLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItem;

export type { IMenuItem, DropdownItemProps };
