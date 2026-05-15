import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { DrawerContainer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSToolbarTahoe as MacOSToolbar } from '../../macos/toolbar/toolbar-tahoe';
import AnchorLink from '../../links/anchor-link';
import { Close } from '../../icons/close';
import { matchesPath, findCurrentPageTitle } from './utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSTahoeLayout ──────────────────────────────────────────

export function MacOSTahoeLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
}: MacOSTahoeLayoutProps) {
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
          ? 'h-8 rounded-xl border border-(--macos-tahoe-sidebar-item-active-stroke) px-3 text-[12px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text)'
          : 'h-8 rounded-xl px-3 text-[12px] font-normal text-(--macos-tahoe-sidebar-item-text) dark:text-white/[.88] hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
        : active
        ? 'h-9 rounded-xl border border-(--macos-tahoe-sidebar-item-active-stroke) px-3 text-[13px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text)'
        : 'h-9 rounded-xl px-3 text-[13px] font-normal text-(--macos-tahoe-sidebar-item-text) dark:text-white/[.88] hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
    );

  const getSidebarIconClassName = (active: boolean, compact = false) =>
    cn(
      compact
        ? 'h-3.5 w-3.5 shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5'
        : 'h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4',
      active
        ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
        : 'text-(--macos-tahoe-sidebar-item-icon) dark:text-white/50 group-hover:text-(--macos-tahoe-sidebar-item-text) dark:group-hover:text-white/[.88]'
    );

  const renderSidebarPanel = (mobile = false) => (
    <aside
      data-tucu={mobile ? 'macos-tahoe-drawer' : 'macos-tahoe-sidebar'}
      className={cn(
        'flex h-full flex-col rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]',
        mobile
          ? 'pointer-events-auto w-80 max-w-[calc(100vw-24px)]'
          : 'mr-4 w-[240px] xl:w-[var(--macos-tahoe-sidebar-width,280px)] shrink-0'
      )}
    >
      <div
        data-tucu="macos-tahoe-sidebar-top"
        className="flex h-(--macos-toolbar-height,58px) shrink-0 items-center border-b border-(--macos-tahoe-border) px-5"
      >
        <div className="flex w-full items-center justify-between gap-3">
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
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
            >
              <Close className="h-3.5 w-3.5" width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pt-3 pb-5">
        <ul className="space-y-1">{renderSidebarItems()}</ul>
      </nav>
    </aside>
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
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-(--macos-tahoe-sidebar-item-hover-bg)"
                >
                  <svg
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform duration-150',
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
              <ul className="mt-1 ml-3 space-y-1 pl-3">
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
      data-tucu="macos-tahoe-root"
      data-layout-variant="tahoe"
      className={cn(
        'flex h-full w-full overflow-hidden relative bg-transparent p-3 min-[500px]:p-4',
        className
      )}
    >
      {/* Sidebar */}
      {!isMobile && renderSidebarPanel()}

      {/* Main area */}
      <div
        data-tucu="macos-tahoe-shell"
        className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[34px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-panel-bg) backdrop-blur-[34px]"
      >
        <MacOSToolbar
          center={
            <div
              data-tucu="macos-tahoe-toolbar-center"
              className="truncate px-6 text-center text-[14px] font-semibold tracking-[0.01em] text-(--macos-tahoe-text)"
            >
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
          data-tucu="macos-tahoe-content"
          className={cn(
            'relative flex-1 min-h-0 overflow-auto bg-transparent',
            contentClassName
          )}
        >
          <div
            data-tucu="macos-tahoe-content-inner"
            className="px-5 pb-5 pt-4 min-[500px]:px-7 min-[500px]:pb-7 [&>*]:max-w-none"
          >
            {children}
          </div>
        </main>
      </div>

      <DrawerContainer
        isOpen={isMobile && isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        position="left"
        backdrop={false}
        backdropClassName="backdrop-blur-[2px] bg-transparent"
      >
        <div className="relative h-full w-full">
          <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch p-3 min-[500px]:p-4">
            {renderSidebarPanel(true)}
          </div>
        </div>
      </DrawerContainer>
    </div>
  );
}

export default MacOSTahoeLayout;
