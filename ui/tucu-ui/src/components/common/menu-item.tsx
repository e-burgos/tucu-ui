import { useState, useEffect } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useMeasure } from '../../hooks/use-measure';
import ActiveLink from '../links/active-link';
import { ChevronDown } from '../icons/chevron-down';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks';

export type DropdownItemProps = {
  name: string;
  icon?: React.ReactNode;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hide?: boolean;
  onClick?: () => void;
};

export type IMenuItem = {
  name: string;
  icon?: React.ReactNode;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hide?: boolean;
  onClick?: () => void;
};

type MenuItemProps = IMenuItem;

export function MenuItem({
  name,
  icon,
  href,
  dropdownItems,
  isActive: isActiveProps,
  hide,
  onClick,
}: MenuItemProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();

  const isParentActive =
    href?.toString()?.toLowerCase() === pathname?.toLowerCase();
  const isChildrenActive =
    dropdownItems && dropdownItems.some((item) => pathname.includes(item.href));

  const isActive = isParentActive || isChildrenActive || isActiveProps;

  useEffect(() => {
    if (isChildrenActive) setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChildrenActive]);

  const handleTouchStart = (href: string, onClick?: () => void) => {
    navigate(href);
    setIsOpen(false);
    onClick && onClick();
  };

  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      {/* Items without dropdown */}
      {!(dropdownItems?.length && !hide) && (
        <ActiveLink
          onTouchStart={() => {
            navigate(href);
            onClick && onClick();
          }}
          onClick={() => {
            onClick && onClick();
          }}
          href={href}
          to={href}
          className={cn(
            'relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white',
            {
              'bg-brand': isActive,
            }
          )}
          activeClassName="text-white!"
        >
          <span
            className={cn(
              'relative z-1 w-6 h-6 ml-[-4px] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-3 rtl:ml-3',
              {
                'text-white': isActive,
                'text-gray-500': !isActive && !name,
              }
            )}
          >
            {icon}
          </span>
          <span className="relative z-1">{name}</span>
          {href === pathname && (
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
      {/* Items with dropdown */}
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
              'relative flex h-12 cursor-pointer items-center justify-between whitespace-nowrap rounded-lg px-4 text-sm transition-all',
              'text-gray-500 hover:text-brand dark:hover:text-white',
              hide && 'hidden',
              isActive && '!text-white !bg-brand'
            )}
            href={href}
            to={href}
            onClick={() => {
              onClick && onClick();
            }}
          >
            <span className="z-1 flex items-center ltr:mr-3 rtl:ml-3">
              <span
                className={cn(
                  'relative z-1 w-6 h-6 ml-[-4px] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-3 rtl:ml-3'
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
            <ul ref={ref}>
              {isMobile && (
                <li
                  className={cn('first:pt-2', hide && 'hidden')}
                  onTouchStart={() => handleTouchStart(href, onClick)}
                >
                  <ActiveLink
                    href={href}
                    to={href}
                    className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 ltr:before:mr-5 rtl:pr-6 rtl:before:ml-5 dark:hover:text-white"
                    activeClassName="text-brand! dark:text-white! dark:before:bg-white! before:bg-brand! before:w-2! before:h-2! before:-ml-0.5 ltr:before:mr-[18px]! rtl:before:ml-[18px]! font-medium!"
                    onClick={() => {
                      onClick && onClick();
                    }}
                  >
                    {name}
                  </ActiveLink>
                </li>
              )}
              {dropdownItems.map((item, index) => {
                if (item.hide) return null;
                return (
                  <li
                    key={index}
                    className={cn('first:pt-2', item.hide && 'hidden')}
                    onTouchStart={() =>
                      handleTouchStart(item.href, item?.onClick)
                    }
                  >
                    <ActiveLink
                      href={item.href}
                      to={item.href}
                      className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 ltr:before:mr-5 rtl:pr-6 rtl:before:ml-5 dark:hover:text-white"
                      activeClassName="text-brand! dark:text-white! dark:before:bg-white! before:bg-brand! before:w-2! before:h-2! before:-ml-0.5 ltr:before:mr-[18px]! rtl:before:ml-[18px]! font-medium!"
                      onClick={() => {
                        item?.onClick && item?.onClick();
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
