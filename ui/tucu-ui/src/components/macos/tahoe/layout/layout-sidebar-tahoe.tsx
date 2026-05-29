import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../../../layouts/menus/menu-item';
import Logo, { LogoPropTypes } from '../../../logos/logo';
import AnchorLink from '../../../links/anchor-link';
import { Close } from '../../../icons/close';
import { matchesPath } from '../../../layouts/macos-layout/utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeLayoutSidebarProps {
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  className?: string;
  /** When true, renders the mobile (drawer) variant with close button */
  mobile?: boolean;
  onClose?: () => void;
  onItemClick?: () => void;
}

// ─── Component ─────────────────────────────────────────────────

export function MacOSTahoeLayoutSidebar({
  menuItems,
  logo,
  className,
  mobile = false,
  onClose,
  onItemClick,
}: MacOSTahoeLayoutSidebarProps) {
  const { pathname } = useLocation();
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // Auto-expand parent items whose children match current path
  useEffect(() => {
    const newExpanded = new Set<string>();
    menuItems.forEach((item) => {
      if (
        item.dropdownItems?.some(
          (child) => child.isActive || matchesPath(pathname, child.path, true)
        )
      ) {
        newExpanded.add(item.path);
      }
    });
    setExpandedPaths((prev) => {
      const merged = new Set(prev);
      newExpanded.forEach((p) => merged.add(p));
      return merged;
    });
  }, [pathname, menuItems]);

  const toggleExpand = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const isItemActive = (
    path: string,
    activeOverride?: boolean,
    includeDescendants = false
  ) =>
    Boolean(activeOverride) || matchesPath(pathname, path, includeDescendants);

  const isParentActive = (item: IMenuItem) =>
    isItemActive(item.path, item.isActive) ||
    Boolean(
      item.dropdownItems?.some(
        (child) => child.isActive || matchesPath(pathname, child.path, true)
      )
    );

  const handleMenuItemClick = (onClick?: () => void) => {
    onClick?.();
    onItemClick?.();
  };

  const getSidebarItemClassName = (active: boolean, compact = false) =>
    cn(
      'group flex w-full items-center gap-[8px] transition-colors duration-150 select-none',
      compact
        ? active
          ? 'h-[32px] rounded-[12px] border border-(--macos-tahoe-sidebar-item-active-stroke) px-[12px] text-[12px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-brand!'
          : 'h-[32px] rounded-[12px] px-[12px] text-[12px] font-normal text-foreground! hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
        : active
        ? 'h-[36px] rounded-[12px] border border-(--macos-tahoe-sidebar-item-active-stroke) px-[12px] text-[13px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-brand!'
        : 'h-[36px] rounded-[12px] px-[12px] text-[13px] font-normal text-foreground! hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
    );

  const getSidebarIconClassName = (active: boolean, compact = false) =>
    cn(
      compact
        ? 'h-[14px] w-[14px] shrink-0 [&>svg]:h-[14px] [&>svg]:w-[14px]'
        : 'h-[16px] w-[16px] shrink-0 [&>svg]:h-[16px] [&>svg]:w-[16px]',
      active
        ? 'text-brand!'
        : 'text-foreground/50! group-hover:text-foreground/80'
    );

  const renderSidebarItems = () =>
    menuItems
      .filter((item) => !item.hide)
      .map((item) => {
        const childItems = item.dropdownItems?.filter((d) => !d.hide) ?? [];
        const hasChildren = childItems.length > 0;
        const isExpanded = expandedPaths.has(item.path);
        const hasActiveDescendant = childItems.some((child) =>
          isItemActive(child.path, child.isActive, true)
        );
        const exactParentActive =
          isItemActive(item.path, item.isActive) && !hasActiveDescendant;
        const parentActive = isParentActive(item);
        const itemHref = item.href ?? item.path;

        return (
          <li key={item.path}>
            {hasChildren ? (
              <div className={getSidebarItemClassName(exactParentActive)}>
                <AnchorLink
                  to={itemHref}
                  aria-current={exactParentActive ? 'page' : undefined}
                  onClick={() => handleMenuItemClick(item.onClick)}
                  className="flex min-w-0 flex-1 items-center gap-[8px]"
                >
                  {item.icon && (
                    <span
                      className={getSidebarIconClassName(exactParentActive)}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate text-left">{item.name}</span>
                </AnchorLink>
                <button
                  type="button"
                  aria-label={
                    isExpanded ? `Collapse ${item.name}` : `Expand ${item.name}`
                  }
                  aria-expanded={isExpanded}
                  onClick={() => toggleExpand(item.path)}
                  className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors hover:bg-(--macos-tahoe-sidebar-item-hover-bg)"
                >
                  <svg
                    className={cn(
                      'h-[12px] w-[12px] shrink-0 transition-transform duration-150',
                      exactParentActive
                        ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
                        : 'text-(--macos-tahoe-sidebar-item-icon)',
                      isExpanded && 'rotate-90'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <AnchorLink
                to={itemHref}
                aria-current={parentActive ? 'page' : undefined}
                onClick={() => handleMenuItemClick(item.onClick)}
                className={getSidebarItemClassName(parentActive)}
              >
                {item.icon && (
                  <span className={getSidebarIconClassName(parentActive)}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 truncate text-left">{item.name}</span>
              </AnchorLink>
            )}

            {hasChildren && isExpanded && (
              <ul className="mt-[4px] ml-[12px] space-y-[4px] pl-[12px]">
                {childItems.map((child) => {
                  const childHref = child.href ?? child.path;
                  const childActive = isItemActive(
                    child.path,
                    child.isActive,
                    true
                  );

                  return (
                    <li key={child.path}>
                      <AnchorLink
                        to={childHref}
                        aria-current={childActive ? 'page' : undefined}
                        onClick={() => handleMenuItemClick(child.onClick)}
                        className={getSidebarItemClassName(childActive, true)}
                      >
                        {child.icon && (
                          <span
                            className={getSidebarIconClassName(
                              childActive,
                              true
                            )}
                          >
                            {child.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate text-left">
                          {child.name}
                        </span>
                      </AnchorLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      });

  return (
    <aside
      data-tucu={mobile ? 'macos-tahoe-drawer' : 'macos-tahoe-sidebar'}
      className={cn(
        'flex h-full flex-col rounded-[30px] border border-border bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]',
        mobile
          ? 'pointer-events-auto w-[320px] max-w-[calc(100vw-24px)]'
          : 'mr-[16px] w-[240px] xl:w-[var(--macos-tahoe-sidebar-width,280px)] shrink-0',
        className
      )}
    >
      <div
        data-tucu="macos-tahoe-sidebar-top"
        className="flex h-(--macos-toolbar-height,58px) shrink-0 items-center border-b border-border px-[20px]"
      >
        <div className="flex w-full items-center justify-between gap-[12px]">
          {logo && (
            <Logo
              {...logo}
              size="small"
              className={cn('w-auto opacity-90', logo.className)}
            />
          )}
          {mobile && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={onClose}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-border bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
            >
              <Close className="h-[14px] w-[14px]" width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-[12px] pt-[12px] pb-[20px]">
        <ul className="space-y-[4px]">{renderSidebarItems()}</ul>
      </nav>
    </aside>
  );
}

export default MacOSTahoeLayoutSidebar;
