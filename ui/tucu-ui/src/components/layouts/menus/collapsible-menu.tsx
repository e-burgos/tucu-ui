import { useState, useEffect } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useMeasure } from '../../../hooks';
import ActiveLink from '../../links/active-link';
import { ChevronDown } from '../../icons/chevron-down';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMenuItem } from './menu-item';

export function CollapsibleMenu({
  name,
  icon,
  href,
  path,
  dropdownItems,
  isActive,
  onClick,
}: IMenuItem) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const isChildrenActive =
    dropdownItems && dropdownItems.some((item) => item.href === pathname);

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
    onClick &&
      setTimeout(() => {
        onClick();
      }, 200);
  };

  useEffect(() => {
    if (isChildrenActive) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mb-[8px] min-h-[48px] list-none last:mb-[0px]">
      {dropdownItems?.length ? (
        <>
          <div
            className={cn(
              'relative flex h-[48px] cursor-pointer items-center justify-between whitespace-nowrap  rounded-lg px-[16px] text-sm transition-all',
              isChildrenActive
                ? 'text-white'
                : 'text-gray-500 hover:text-brand dark:hover:text-white'
            )}
            onClick={() => setIsOpen(!isOpen)}
            onTouchStart={() => setIsOpen(!isOpen)}
          >
            <span className="z-[1] flex items-center ltr:mr-[12px] rtl:ml-[12px]">
              <span className={cn('ltr:mr-[12px] rtl:ml-[12px]')}>{icon}</span>
              {name}
            </span>
            <span
              className={`z-[1] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <ChevronDown />
            </span>

            {isChildrenActive && (
              <motion.span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand opacity-0 shadow-large transition-opacity'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>

          <div
            style={{
              height: isOpen ? height : 0,
            }}
            className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] overflow-hidden transition-all duration-[350ms]"
          >
            <ul ref={ref}>
              {dropdownItems.map((item, index) => (
                <li className="first:pt-[8px]" key={index}>
                  <ActiveLink
                    onClick={() => {
                      handleNavigation(
                        item.href ? item.href : item.path,
                        onClick
                      );
                    }}
                    onTouchStart={() => {
                      handleTouchStart(
                        item.href ? item.href : item.path,
                        onClick
                      );
                    }}
                    path={item.path}
                    href={item.href}
                    to={item.href ? item.href : item.path}
                    className="flex items-center rounded-lg p-[12px] text-sm text-gray-500 transition-all before:h-[4px] before:w-[4px] before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-[24px] before:ltr:mr-[20px] rtl:pr-[24px] before:rtl:ml-[20px] dark:hover:text-white"
                    activeClassName="!text-brand dark:!text-white dark:before:!bg-white before:!bg-brand before:!w-[8px] before:!h-[8px] before:-ml-[2px] before:ltr:!mr-[18px] before:rtl:!ml-[18px] !font-medium"
                  >
                    {item.name}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <ActiveLink
          onClick={() => {
            handleNavigation(href ? href : path, onClick);
          }}
          onTouchStart={() => {
            handleTouchStart(href ? href : path, onClick);
          }}
          path={path}
          href={href}
          to={href ? href : path}
          className={cn(
            'relative flex h-[48px] items-center whitespace-nowrap rounded-lg px-[16px] text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white',
            {
              'bg-brand': isActive,
            }
          )}
          activeClassName="!text-white"
        >
          <span
            className={cn(
              'relative z-[1] duration-100 before:absolute before:-right-[12px] before:top-[50%] before:h-[4px] before:w-[4px] before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-[12px] rtl:ml-[12px]',
              {
                'text-white': isActive,
                'text-gray-500': !isActive && !name,
              }
            )}
          >
            {icon}
          </span>
          <span className="relative z-[1] "> {name}</span>

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
    </div>
  );
}

export default CollapsibleMenu;
