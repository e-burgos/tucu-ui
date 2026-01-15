import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Button from '../../buttons/button';
import { Close } from '../../icons/close';
import { useIsMobile, useClickAway } from '../../../hooks';
import { TagIcon } from '../../icons/tag-icon';
import { MenuItem, IMenuItem } from '../menus/menu-item';

const sideBarMenuItems = (menuItems: IMenuItem[]) =>
  menuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    path: item.path,
    href: item.href,
    hide: item.hide,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        path: dropdownItem.path,
        href: dropdownItem.href,
        hide: dropdownItem.hide,
      })),
    }),
  }));

export function ExpandableSidebar({
  logo,
  className,
  menuItems,
}: {
  logo?: LogoPropTypes;
  className?: string;
  menuItems: IMenuItem[];
}) {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        setOpen(true);
      }, 100);
    } else {
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }, [isMobile]);

  function isSubMenuActive(submenu: IMenuItem[]) {
    return submenu?.map((item) => item.href).includes(pathname);
  }

  return (
    <aside
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onTouchStart={() => setOpen(true)}
      className={cn(
        open
          ? 'ltr:border-r rtl:border-l border-dashed border-gray-200 xs:w-[320px] xl:w-[288px] 2xl:w-[320px] bg-light-dark'
          : 'w-[96px] border-dashed border-gray-200 ltr:border-r rtl:border-l 2xl:w-[112px]',
        'top-0 z-40 h-full max-w-full duration-200 ltr:left-0 rtl:right-0 dark:border-gray-700 xl:fixed bg-light-dark',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-[96px] items-center  overflow-hidden px-[24px] py-[16px] pt-[0px] 2xl:px-[32px] 3xl:pt-[24px]',
          open ? 'flex-start' : 'justify-center'
        )}
      >
        {!open ? (
          <div onClick={() => setOpen(!open)}>
            <Logo
              {...(logo as LogoPropTypes)}
              isoType={true}
              name={''}
              secondName={''}
            />
          </div>
        ) : (
          <Logo {...(logo as LogoPropTypes)} />
        )}

        {open && (
          <div className="md:hidden">
            <Button
              title="Close"
              color="white"
              shape="circle"
              variant="transparent"
              size="small"
              onClick={() => setOpen(false)}
            >
              <Close className="h-auto w-[10px]" />
            </Button>
          </div>
        )}
      </div>

      <div
        className={cn(
          'custom-scrollbar -mt-[16px] overflow-hidden overflow-y-auto 2xl:-mt-[28px]',
          open ? 'h-[calc(100%-190px)]' : 'h-[calc(100%-170px)]'
        )}
      >
        <div className="px-[24px] pb-[20px] 2xl:px-[32px]">
          {!open ? (
            <div
              className="mt-[20px] 2xl:mt-[32px]"
              onClick={() => setOpen(!open)}
            >
              {sideBarMenuItems(menuItems)?.length &&
                !sideBarMenuItems(menuItems).some((item) => item.hide) &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    path={item.path}
                    isActive={
                      item.href === pathname ||
                      (item.dropdownItems &&
                        isSubMenuActive(item.dropdownItems))
                    }
                    key={'drawer' + item.name + index}
                    href={item.href}
                    name={''}
                    icon={
                      <span className="w-[24px] h-[24px] flex items-center justify-center">
                        {item?.icon || <TagIcon />}
                      </span>
                    }
                  />
                ))}
            </div>
          ) : (
            <div className="mt-[20px] 2xl:mt-[32px]">
              {sideBarMenuItems(menuItems)?.length &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    path={item.path}
                    onClick={() => setOpen(false)}
                    key={'drawer-full' + item.name + index}
                    name={item.name}
                    href={item?.href}
                    icon={
                      <span className="w-[24px] h-[24px] flex items-center justify-center">
                        {item?.icon || <TagIcon />}
                      </span>
                    }
                    dropdownItems={item?.dropdownItems}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'sticky bottom-[20px] mt-[12px] 2xl:mt-[48px]',
          open && 'px-[32px]'
        )}
      >
        {!open && (
          <motion.div
            initial={{ x: 50, y: -5 }}
            animate={{
              x: 0,
              y: 0,
            }}
            className="cursor-pointer pb-[8px]"
          ></motion.div>
        )}
      </div>
    </aside>
  );
}

export default ExpandableSidebar;
