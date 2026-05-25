/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import ActiveLink from '../../links/active-link';
import { ChevronDown } from '../../icons/chevron-down';
import { ChevronRight } from '../../icons/chevron-right';
import cn from 'classnames';
import { IMenuItem } from './menu-item';
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
    path: item.path,
    href: item.href,
    hide: item.hide,
    isActive: isActive(item.path),
    onClick: item.onClick,
    dropdownItems: item.dropdownItems,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        path: dropdownItem.path,
        href: dropdownItem.href,
        hide: dropdownItem.hide,
        isActive: isActive(dropdownItem.path),
        onClick: dropdownItem.onClick,
        ...(item.dropdownItems && {
          dropdownItems: dropdownItem?.dropdownItems?.map((subItem) => ({
            name: subItem.name,
            ...(subItem?.icon && { icon: subItem.icon }),
            path: subItem.path,
            href: subItem.href,
            hide: subItem.hide,
            isActive: isActive(subItem.path),
            onClick: subItem.onClick,
          })),
        }),
      })),
    }),
  }));
};

export function HorizontalNavMenu({
  menuItems,
  className,
  dropboxClassName,
}: {
  menuItems: IMenuItem[];
  className?: string;
  dropboxClassName?: string;
}) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className={cn(
        'flex items-center min-w-0 overflow-visible xl:px-[36px] 2xl:px-[56px] min-[1780px]:px-[64px]',
        className
      )}
    >
      <ul className="relative flex items-center min-w-0 gap-[16px] 2xl:gap-[24px]">
        {handleMenuItems(menuItems, pathname).map((item, index) => {
          const hrefToUse = item.href ? item.href : item.path;
          return (
            <Fragment key={`layout-${item.name}-${index}`}>
              {item.dropdownItems && !item.hide ? (
                <li
                  className={cn(
                    'group/parent relative min-w-0',
                    item.isActive && 'text-brand'
                  )}
                >
                  <ActiveLink
                    path={item.path}
                    href={item.href}
                    to={hrefToUse}
                    className="flex w-full items-center text-sm font-medium uppercase text-foreground/60 transition hover:text-foreground hover:cursor-pointer"
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          'w-[16px] h-[16px] flex items-center justify-center mr-[6px]',
                          item.isActive && 'text-brand'
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        'text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] overflow-hidden text-ellipsis whitespace-nowrap',
                        item.isActive && 'text-brand'
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="z-[1] transition-transform duration-200 ltr:ml-[12px] rtl:mr-[12px]">
                      <ChevronDown
                        className={cn(
                          'h-[10px] w-[10px]',
                          item.isActive && 'text-brand'
                        )}
                      />
                    </span>
                  </ActiveLink>
                  <ul
                    className={cn(
                      'invisible absolute right-0 z-50 border border-border top-[130%] mt-[8px] w-[256px] rounded-[8px] bg-light-dark p-[12px] opacity-0 shadow-large transition-all group-hover/parent:visible group-hover/parent:top-full group-hover/parent:opacity-100 ltr:right-0 rtl:left-0',
                      dropboxClassName
                    )}
                  >
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
                            <div className="flex w-full items-center justify-between rounded-[8px] px-[12px] py-[8px] text-sm font-medium uppercase text-foreground/60 transition hover:text-foreground dark:hover:bg-gray-700/50">
                              <span
                                className={cn(
                                  'text-[12px]',
                                  dropDownItem.isActive && 'text-brand'
                                )}
                              >
                                {dropDownItem.name}
                              </span>
                              <span className="z-[1] -mt-[4px] transition-transform duration-200 ltr:ml-[12px] rtl:mr-[12px]">
                                <ChevronRight className="h-[10px] w-[10px]" />
                              </span>
                            </div>
                            <ul className="invisible absolute left-[107%] right-0 top-[130%] w-[256px] rounded-[8px] bg-white p-[12px] opacity-0 shadow-large transition-all group-hover:visible group-hover/parent:top-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-gray-800">
                              {dropDownItem?.dropdownItems?.map(
                                (subMenu, index) => {
                                  const SubMenuHrefToUse = subMenu.href
                                    ? subMenu.href
                                    : subMenu.path;
                                  return (
                                    <li key={subMenu.name + index.toString()}>
                                      <ActiveLink
                                        path={subMenu.path}
                                        href={subMenu.href}
                                        to={SubMenuHrefToUse}
                                        className="block rounded-[8px] px-[12px] py-[8px] text-sm font-medium uppercase text-foreground/60 transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-700/50"
                                        activeClassName={cn(
                                          'bg-gray-100 dark:bg-gray-700 my-[4px] last:mb-[0px] first:mt-[0px] !text-foreground',
                                          subMenu.isActive &&
                                            '!bg-brand !text-white'
                                        )}
                                      >
                                        <span className={cn('text-[12px]')}>
                                          {subMenu.name}
                                        </span>
                                      </ActiveLink>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </>
                        ) : (
                          <ActiveLink
                            to={
                              dropDownItem.href
                                ? dropDownItem.href
                                : dropDownItem.path
                            }
                            path={dropDownItem.path}
                            href={dropDownItem.href}
                            onClick={dropDownItem.onClick}
                            onTouchStart={dropDownItem.onClick}
                            className="flex items-center gap-[4px] rounded-[8px] px-[12px] py-[8px] text-sm font-medium uppercase text-foreground/60 transition hover:bg-gray-200 hover:text-foreground dark:hover:bg-gray-700/50"
                            activeClassName={cn(
                              'bg-gray-100 dark:bg-gray-700 my-[4px] last:mb-[0px] first:mt-[0px] !text-foreground',
                              dropDownItem.isActive && '!bg-brand !text-white'
                            )}
                          >
                            {dropDownItem.icon && (
                              <span className="w-[16px] h-[16px] flex items-center justify-center mr-[6px]">
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
                <li
                  className={cn('min-w-0', item.isActive && 'text-brand')}
                  data-active={item.isActive}
                >
                  <ActiveLink
                    path={item.path}
                    href={item.href}
                    to={item.href ? item.href : item.path}
                    className="mx-[8px] text-[13px] font-medium uppercase transition first:ml-[0px] last:mr-[0px] hover:text-brand text-gray-600 dark:text-gray-300 dark:hover:text-brand 2xl:mx-[12px] 2xl:text-sm min-[1780px]:mx-[16px]"
                    activeClassName={cn('!text-brand dark:!text-brand')}
                  >
                    <span className="z-1 flex items-center ltr:mr-[12px] rtl:ml-[12px]">
                      {item.icon && (
                        <span className="w-[16px] h-[16px] flex items-center justify-center mr-[6px]">
                          {item.icon}
                        </span>
                      )}
                      <span className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </span>
                    </span>
                  </ActiveLink>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default HorizontalNavMenu;
