import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../../../layouts/menus/menu-item';
import Logo, { LogoPropTypes } from '../../../logos/logo';
import AnchorLink from '../../../links/anchor-link';
import { matchesPath } from '../../../layouts/macos-layout/utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSonomaLayoutSidebarProps {
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  className?: string;
  onItemClick?: () => void;
}

// ─── Component ─────────────────────────────────────────────────

export function MacOSSonomaLayoutSidebar({
  menuItems,
  logo,
  className,
  onItemClick,
}: MacOSSonomaLayoutSidebarProps) {
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
          ? 'h-[28px] rounded-[6px] px-[8px] text-[12px] font-medium bg-brand/12 text-brand!'
          : 'h-[28px] rounded-[6px] px-[8px] text-[12px] text-foreground! hover:text-foreground hover:bg-foreground/5'
        : active
        ? 'h-[32px] rounded-[6px] px-[8px] text-[13px] font-medium bg-brand/12 text-brand!'
        : 'h-[32px] rounded-[6px] px-[8px] text-[13px] font-normal text-foreground! hover:text-foreground hover:bg-foreground/5'
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
        const isParentItemActiveColor = exactParentActive || hasActiveDescendant;

        return (
          <li key={item.path}>
            {hasChildren ? (
              <div className={getSidebarItemClassName(exactParentActive)}>
                <AnchorLink
                  to={itemHref}
                  aria-current={exactParentActive ? 'page' : undefined}
                  onClick={() => handleMenuItemClick(item.onClick)}
                  className={cn(
                    'flex min-w-0 flex-1 items-center gap-[8px]',
                    isParentItemActiveColor ? 'text-brand!' : 'text-foreground!'
                  )}
                >
                  {item.icon && (
                    <span
                      className={getSidebarIconClassName(isParentItemActiveColor)}
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
                  className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/4 dark:hover:bg-white/8"
                >
                  <svg
                    className={cn(
                      'h-[12px] w-[12px] shrink-0 transition-transform duration-150 text-foreground/40',
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
              <ul className="mt-[2px] ml-[16px] space-y-[2px] border-l border-border/60 pl-[8px] dark:border-border/60">
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
      data-tucu="macos-sonoma-sidebar"
      className={cn(
        'flex h-full flex-col w-[var(--macos-sidebar-width,300px)] shrink-0 border-r border-border',
        'bg-transparent sm:bg-(--macos-glass-regular-bg) sm:backdrop-blur-xl ',
        className
      )}
    >
      <div className="hidden sm:flex h-[58px] shrink-0 items-center border-b border-border px-[12px]">
        {logo && <Logo {...logo} size="small" />}
      </div>

      <nav className="flex-1 overflow-y-auto px-[8px] py-[12px]">
        <ul className="space-y-[2px]">{renderSidebarItems()}</ul>
      </nav>
    </aside>
  );
}

export default MacOSSonomaLayoutSidebar;
