import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { Drawer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSToolbarSonoma } from '../../macos/toolbar/toolbar-sonoma';
import Toast from '../../notifications/toast';
import AnchorLink from '../../links/anchor-link';
import { matchesPath, findCurrentPageTitle } from './utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSonomaLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSSonomaLayout ─────────────────────────────────────────

export function MacOSSonomaLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
}: MacOSSonomaLayoutProps) {
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const currentPageTitle = findCurrentPageTitle(menuItems, pathname);

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

  useEffect(() => {
    if (!isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [pathname, isMobile]);

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
    if (isMobile) setIsSidebarOpen(false);
  };

  const getSidebarItemClassName = (active: boolean, compact = false) =>
    cn(
      'group flex w-full items-center gap-2 transition-colors duration-150 select-none',
      compact
        ? active
          ? 'h-7 rounded-md px-2 text-[12px] font-medium bg-[var(--color-semantic-bg-primary)]/12 text-[var(--color-semantic-bg-primary)]'
          : 'h-7 rounded-md px-2 text-[12px] text-gray-600 hover:bg-gray-500/8 dark:text-gray-400 dark:hover:bg-white/6'
        : active
        ? 'h-8 rounded-md px-2 text-[13px] font-medium bg-[var(--color-semantic-bg-primary)]/12 text-[var(--color-semantic-bg-primary)]'
        : 'h-8 rounded-md px-2 text-[13px] font-normal text-gray-700 hover:bg-gray-500/8 dark:text-gray-300 dark:hover:bg-white/6'
    );

  const getSidebarIconClassName = (active: boolean, compact = false) =>
    cn(
      compact
        ? 'h-3.5 w-3.5 shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5'
        : 'h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4',
      active
        ? 'text-[var(--color-semantic-bg-primary)]'
        : compact
        ? 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
        : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'
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
                  className="flex min-w-0 flex-1 items-center gap-2"
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
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/4 dark:hover:bg-white/8"
                >
                  <svg
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform duration-150 text-gray-400',
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
              <ul className="mt-0.5 ml-4 space-y-0.5 border-l border-gray-200/60 pl-2 dark:border-gray-700/60">
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
    <div
      data-layout-variant="sonoma"
      className={cn('flex h-full w-full overflow-hidden', className)}
    >
      {/* Sidebar */}
      {!isMobile && (
        <aside className="flex h-full flex-col w-80 shrink-0 border-r border-black/10 dark:border-white/8 bg-(--macos-material-toolbar,rgba(255,255,255,0.72)) backdrop-blur-xl">
          <div className="flex h-[58px] shrink-0 items-center border-b border-black/10 dark:border-white/8 px-3">
            {logo && <Logo {...logo} size="small" />}
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-3">
            <ul className="space-y-0.5">{renderSidebarItems()}</ul>
          </nav>
        </aside>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-visible">
        <MacOSToolbarSonoma
          center={
            <div className="truncate px-6 text-center text-[14px] font-semibold tracking-[0.01em] text-gray-800 dark:text-gray-100">
              {currentPageTitle ?? 'Overview'}
            </div>
          }
          leading={
            isMobile && logo ? (
              <Logo
                {...logo}
                size="small"
                className={cn('w-auto shrink-0', logo.className)}
              />
            ) : undefined
          }
          trailing={
            isMobile ? (
              <>
                {rightButton}
                {menuItems.length > 0 && (
                  <Hamburger
                    isOpen={isSidebarOpen}
                    variant="ghost"
                    size="small"
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                  />
                )}
              </>
            ) : (
              rightButton
            )
          }
          className={headerClassName}
        />

        <main
          data-tucu="main-content"
          className={cn(
            'relative flex-1 min-h-0 overflow-auto bg-(--macos-window-bg)',
            contentClassName
          )}
        >
          <div data-tucu="macos-layout-content-inner" className="p-6">
            {children}
          </div>
        </main>
      </div>

      <Drawer
        type="sidebar"
        position="left"
        backdrop={true}
        className="min-[500px]:w-64"
        isOpen={isMobile && isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        logo={logo}
      >
        <div>
          <ul className="space-y-0.5">{renderSidebarItems()}</ul>
        </div>
      </Drawer>

      <Toast />
    </div>
  );
}

export default MacOSSonomaLayout;
