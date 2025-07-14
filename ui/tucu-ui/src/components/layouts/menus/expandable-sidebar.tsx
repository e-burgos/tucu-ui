import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Button from '../../buttons/button';
import { Close } from '../../icons/close';
import { useIsMobile, useClickAway } from '../../../hooks';
import { ListIcon } from 'lucide-react';
import { MenuItem, IMenuItem } from '../../common/menu-item';

const sideBarMenuItems = (menuItems: IMenuItem[]) =>
  menuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: item.href,
    hide: item.hide,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
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
    if (isMobile) setOpen(true);
    if (!isMobile) setOpen(false);
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
          ? 'ltr:border-r rtl:border-l border-dashed border-gray-200 xs:w-80 xl:w-72 2xl:w-80'
          : 'w-24 border-dashed border-gray-200 ltr:border-r rtl:border-l 2xl:w-28',
        'top-0 z-40 h-full max-w-full  bg-body duration-200 ltr:left-0 rtl:right-0  dark:border-gray-700 dark:bg-dark xl:fixed',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-24 items-center  overflow-hidden px-6 py-4 pt-0 2xl:px-8 3xl:pt-6',
          open ? 'flex-start' : 'justify-center'
        )}
      >
        {!open ? (
          <div onClick={() => setOpen(!open)}>
            <Logo
              name={logo?.name || ''}
              secondName={logo?.secondName || ''}
              isoType
            />
          </div>
        ) : (
          <Logo name={logo?.name || ''} secondName={logo?.secondName || ''} />
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
              <Close className="h-auto w-2.5" />
            </Button>
          </div>
        )}
      </div>

      <div
        className={cn(
          'custom-scrollbar -mt-4 overflow-hidden overflow-y-auto 2xl:-mt-7',
          open ? 'h-[calc(100%-190px)]' : 'h-[calc(100%-170px)]'
        )}
      >
        <div className="px-6 pb-5 2xl:px-8">
          {!open ? (
            <div className="mt-5 2xl:mt-8" onClick={() => setOpen(!open)}>
              {sideBarMenuItems(menuItems)?.length &&
                !sideBarMenuItems(menuItems).some((item) => item.hide) &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    isActive={
                      item.href === pathname ||
                      (item.dropdownItems &&
                        isSubMenuActive(item.dropdownItems))
                    }
                    key={'drawer' + item.name + index}
                    href={item.href}
                    name={''}
                    icon={
                      <span className="w-6 h-6 flex items-center justify-center">
                        {item?.icon || <ListIcon />}
                      </span>
                    }
                  />
                ))}
            </div>
          ) : (
            <div className="mt-5 2xl:mt-8">
              {sideBarMenuItems(menuItems)?.length &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    onClick={() => setOpen(false)}
                    key={'drawer-full' + item.name + index}
                    name={item.name}
                    href={item.href}
                    icon={
                      <span className="w-6 h-6 flex items-center justify-center">
                        {item?.icon || <ListIcon />}
                      </span>
                    }
                    dropdownItems={item?.dropdownItems}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className={cn('sticky bottom-5 mt-3 2xl:mt-12', open && 'px-8')}>
        {!open && (
          <motion.div
            initial={{ x: 50, y: -5 }}
            animate={{
              x: 0,
              y: 0,
            }}
            className="cursor-pointer pb-2"
          ></motion.div>
        )}
      </div>
    </aside>
  );
}

export default ExpandableSidebar;
