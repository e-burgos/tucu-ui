import { useState, useEffect } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useMeasure } from '../../../hooks';
import ActiveLink from '../../links/active-link';
import { ChevronDown } from '../../icons/chevron-down';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMenuItem } from '../../common/menu-item';

export function CollapsibleMenu({
  name,
  icon,
  href,
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
  useEffect(() => {
    if (isChildrenActive) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      {dropdownItems?.length ? (
        <>
          <div
            className={cn(
              'relative flex h-12 cursor-pointer items-center justify-between whitespace-nowrap  rounded-lg px-4 text-sm transition-all',
              isChildrenActive
                ? 'text-white'
                : 'text-gray-500 hover:text-brand dark:hover:text-white'
            )}
            onClick={() => setIsOpen(!isOpen)}
            onTouchStart={() => setIsOpen(!isOpen)}
          >
            <span className="z-[1] flex items-center ltr:mr-3 rtl:ml-3">
              <span className={cn('ltr:mr-3 rtl:ml-3')}>{icon}</span>
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
                <li className="first:pt-2" key={index}>
                  <ActiveLink
                    onClick={() => {
                      navigate(item.href);
                      onClick && onClick();
                    }}
                    onTouchStart={() => {
                      navigate(item.href);
                      onClick &&
                        setTimeout(() => {
                          onClick();
                        }, 200);
                    }}
                    href={item.href}
                    to={item.href}
                    className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 before:ltr:mr-5 rtl:pr-6 before:rtl:ml-5 dark:hover:text-white"
                    activeClassName="!text-brand dark:!text-white dark:before:!bg-white before:!bg-brand before:!w-2 before:!h-2 before:-ml-0.5 before:ltr:!mr-[18px] before:rtl:!ml-[18px] !font-medium"
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
            navigate(href);
            onClick && onClick();
          }}
          onTouchStart={() => {
            navigate(href);
            onClick &&
              setTimeout(() => {
                onClick();
              }, 200);
          }}
          href={href}
          to={href}
          className={cn(
            'relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white',
            {
              'bg-brand': isActive,
            }
          )}
          activeClassName="!text-white"
        >
          <span
            className={cn(
              'relative z-[1] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-3 rtl:ml-3',
              {
                'text-white': isActive,
                'text-gray-500': !isActive && !name,
              }
            )}
          >
            {icon}
          </span>
          <span className="relative z-[1] "> {name}</span>

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
    </div>
  );
}

export default CollapsibleMenu;
