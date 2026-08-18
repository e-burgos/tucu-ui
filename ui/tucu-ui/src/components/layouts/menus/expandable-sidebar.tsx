import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Button from '../../buttons/button';
import { Close } from '../../icons/close';
import { LockIcon } from '../../icons/lock-icon';
import { Unlocked } from '../../icons/unlocked';
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
    onClick: item.onClick,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        path: dropdownItem.path,
        href: dropdownItem.href,
        hide: dropdownItem.hide,
        onClick: dropdownItem.onClick,
      })),
    }),
  }));

export interface ExpandableSidebarProps {
  logo?: LogoPropTypes;
  /**
   * Logo rendered in the collapsed rail when provided. Falls back to the
   * default `isoType` rendering of `logo` when omitted.
   */
  collapsedLogo?: LogoPropTypes;
  className?: string;
  menuItems: IMenuItem[];
  /**
   * Controlled pinned state. When set, the toggle button and internal
   * pin state are ignored in favor of this value. Persisting the pinned
   * state (e.g. localStorage) is the consumer's responsibility.
   */
  pinned?: boolean;
  /**
   * Initial pinned state for uncontrolled usage. Ignored when `pinned`
   * is provided.
   */
  defaultPinned?: boolean;
  /**
   * Called with the next pinned state on every toggle, both controlled
   * and uncontrolled. Pair with `pinned` to persist the choice.
   */
  onPinnedChange?: (pinned: boolean) => void;
}

export function ExpandableSidebar({
  logo,
  collapsedLogo,
  className,
  menuItems,
  pinned,
  defaultPinned = false,
  onPinnedChange,
}: ExpandableSidebarProps) {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [internalPinned, setInternalPinned] = useState(defaultPinned);
  const isPinned = pinned !== undefined ? pinned : internalPinned;
  const isOpen = open || isPinned;
  const { isMobile } = useIsMobile();

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, () => {
    if (!isPinned) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        setOpen(true);
      }, 100);
    } else if (!isPinned) {
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }, [isMobile, isPinned]);

  function togglePinned() {
    const nextPinned = !isPinned;
    if (pinned === undefined) {
      setInternalPinned(nextPinned);
    }
    onPinnedChange?.(nextPinned);
  }

  function isSubMenuActive(submenu: IMenuItem[]) {
    return submenu?.map((item) => item.href).includes(pathname);
  }

  const items = sideBarMenuItems(menuItems).filter((item) => !item.hide);

  return (
    <aside
      ref={ref}
      data-tucu="expandable-sidebar"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !isPinned && setOpen(false)}
      onTouchStart={() => setOpen(true)}
      className={cn(
        isOpen
          ? 'ltr:border-r rtl:border-l border-dashed border-border min-[500px]:w-[320px] xl:w-[288px] 2xl:w-[320px] bg-light-dark'
          : 'w-[96px] border-dashed border-border ltr:border-r rtl:border-l 2xl:w-[112px]',
        'top-0 z-40 h-full max-w-full duration-200 ltr:left-0 rtl:right-0 dark:border-border xl:fixed bg-light-dark',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-[96px] items-center  overflow-hidden px-[24px] py-[16px] pt-[0px] 2xl:px-[32px] min-[1780px]:pt-[24px]',
          isOpen ? 'flex-start' : 'justify-center'
        )}
      >
        {!isOpen ? (
          <div onClick={() => setOpen(!open)}>
            {collapsedLogo ? (
              <Logo {...(collapsedLogo as LogoPropTypes)} />
            ) : (
              <Logo
                {...(logo as LogoPropTypes)}
                isoType={true}
                name={''}
                secondName={''}
              />
            )}
          </div>
        ) : (
          <Logo {...(logo as LogoPropTypes)} />
        )}

        {isOpen && (
          <>
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
            <Button
              title={isPinned ? 'Unpin menu' : 'Pin menu'}
              aria-pressed={isPinned}
              data-tucu="sidebar-pin"
              color="white"
              shape="circle"
              variant="transparent"
              size="small"
              onClick={togglePinned}
            >
              {isPinned ? (
                <LockIcon className="h-auto w-[14px]" />
              ) : (
                <Unlocked className="h-auto w-[14px]" />
              )}
            </Button>
          </>
        )}
      </div>

      <div
        className={cn(
          'custom-scrollbar -mt-[16px] overflow-hidden overflow-y-auto 2xl:-mt-[28px]',
          isOpen ? 'h-[calc(100%-190px)]' : 'h-[calc(100%-170px)]'
        )}
      >
        <div className="px-[24px] pb-[20px] 2xl:px-[32px]">
          {!isOpen ? (
            <div
              className="mt-[20px] 2xl:mt-[32px]"
              onClick={() => setOpen(!open)}
            >
              {items.map((item, index) => (
                <MenuItem
                  path={item.path}
                  onClick={item.onClick}
                  isActive={
                    item.href === pathname ||
                    (item.dropdownItems && isSubMenuActive(item.dropdownItems))
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
              {items.map((item, index) => (
                <MenuItem
                  path={item.path}
                  isActive={
                    item.href === pathname ||
                    (item.dropdownItems && isSubMenuActive(item.dropdownItems))
                  }
                  // The consumer's handler runs first; collapsing the
                  // sidebar is layered on top of it, it does not replace it.
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
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
          isOpen && 'px-[32px]'
        )}
      >
        {!isOpen && (
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
