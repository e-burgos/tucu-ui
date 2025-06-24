/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import ActiveLink from '../../links/active-link';
import { ChevronDown } from '../../icons/chevron-down';
import { ChevronRight } from '../../icons/chevron-right';
import cn from 'classnames';
import { IMenuItem } from '../../common/menu-item';
import { useLocation } from 'react-router-dom';

const handleMenuItems = (layoutMenuItems: IMenuItem[], pathname: string) => {
  const isActive = (href: string) => {
    return (
      (pathname.includes(href) && href !== '/') ||
      (href === '/' && pathname === '/')
    );
  };

  return layoutMenuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: item.href,
    hide: item.hide,
    isActive: isActive(item.href),
    onClick: item.onClick,
    dropdownItems: item.dropdownItems,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href: dropdownItem.href,
        hide: dropdownItem.hide,
        isActive: isActive(dropdownItem.href),
        onClick: dropdownItem.onClick,
        ...(item.dropdownItems && {
          dropdownItems: dropdownItem?.dropdownItems?.map((subItem) => ({
            name: subItem.name,
            ...(subItem?.icon && { icon: subItem.icon }),
            href: subItem.href,
            hide: subItem.hide,
            isActive: isActive(subItem.href),
            onClick: subItem.onClick,
          })),
        }),
      })),
    }),
  }));
};

export function MinimalNavMenu({ menuItems }: { menuItems: IMenuItem[] }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex items-center xl:px-9 2xl:px-14 3xl:px-16">
      <ul className="relative flex items-center gap-4 2xl:gap-6">
        {handleMenuItems(menuItems, pathname).map((item, index) => (
          <Fragment key={`layout-${item.name}-${index}`}>
            {item.dropdownItems && !item.hide ? (
              <li className="group/parent relative">
                <div className="flex w-full items-center text-sm font-medium uppercase text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {item.icon && (
                    <span
                      className={cn(
                        'w-4 h-4 flex items-center justify-center mr-1.5',
                        item.isActive && 'text-brand'
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span
                    className={cn('text-[14px]', item.isActive && 'text-brand')}
                  >
                    {item.name}
                  </span>
                  <span className="z-[1] transition-transform duration-200 ltr:ml-3 rtl:mr-3">
                    <ChevronDown
                      className={cn(
                        'h-2.5 w-2.5',
                        item.isActive && 'text-brand'
                      )}
                    />
                  </span>
                </div>
                <ul className="invisible absolute right-0 top-[130%] mt-2 w-64 rounded-lg bg-white p-3 opacity-0 shadow-large transition-all group-hover/parent:visible group-hover/parent:top-full group-hover/parent:opacity-100 ltr:right-0 rtl:left-0 dark:bg-gray-800">
                  {item.dropdownItems.map((dropDownItem, index) => (
                    <li
                      className={cn(
                        'group relative',
                        dropDownItem.hide && 'hidden',
                        dropDownItem.isActive && 'text-brand'
                      )}
                      key={`${dropDownItem.name}-${index}`}
                    >
                      {dropDownItem.dropdownItems ? (
                        <>
                          <div className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium uppercase text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white">
                            <span
                              className={cn(
                                'text-[12px]',
                                dropDownItem.isActive && 'text-brand'
                              )}
                            >
                              {dropDownItem.name}
                            </span>
                            <span className="z-[1] -mt-1 transition-transform duration-200 ltr:ml-3 rtl:mr-3">
                              <ChevronRight className="h-2.5 w-2.5" />
                            </span>
                          </div>
                          <ul className="invisible absolute left-[107%] right-0 top-[130%] w-64 rounded-lg bg-white p-3 opacity-0 shadow-large transition-all group-hover:visible group-hover/parent:top-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-gray-800">
                            {dropDownItem?.dropdownItems?.map(
                              (subMenu, index) => (
                                <li key={subMenu.name + index.toString()}>
                                  <ActiveLink
                                    href={subMenu.href}
                                    to={subMenu.href}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium uppercase !text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                                    activeClassName={cn(
                                      'bg-gray-100 dark:bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white',
                                      subMenu.isActive && '!bg-brand'
                                    )}
                                  >
                                    <span className={cn('text-[12px]')}>
                                      {subMenu.name}
                                    </span>
                                  </ActiveLink>
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      ) : (
                        <ActiveLink
                          to={dropDownItem.href}
                          href={dropDownItem.href}
                          onClick={dropDownItem.onClick}
                          onTouchStart={dropDownItem.onClick}
                          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium uppercase !text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                          activeClassName={cn(
                            'bg-gray-100 dark:bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white',
                            dropDownItem.isActive && '!bg-brand'
                          )}
                        >
                          {dropDownItem.icon && (
                            <span className="w-4 h-4 flex items-center justify-center mr-1.5">
                              {dropDownItem.icon}
                            </span>
                          )}
                          <span className="text-[14px]">
                            {dropDownItem.name}
                          </span>
                        </ActiveLink>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>
                <ActiveLink
                  to={item.href}
                  href={item.href}
                  className="mx-2 text-[13px] font-medium uppercase  transition first:ml-0 last:mr-0 hover:text-brand dark:text-gray-300 dark:hover:text-brand 2xl:mx-3 2xl:text-sm 3xl:mx-4"
                  activeClassName={cn('!text-brand dark:!text-brand')}
                >
                  <span className="text-[14px]">{item.name}</span>
                </ActiveLink>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default MinimalNavMenu;
