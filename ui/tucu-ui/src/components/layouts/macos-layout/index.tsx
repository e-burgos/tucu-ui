import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { Drawer, DrawerContainer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSToolbar } from '../../macos/toolbar';
import Toast from '../../notifications/toast';
import AnchorLink from '../../links/anchor-link';
import { Close } from '../../icons/close';

// ─── Types ─────────────────────────────────────────────────────

type MacOSLayoutVariant = 'sonoma' | 'tahoe';

export interface MacOSLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  variant?: MacOSLayoutVariant;
}

function matchesPath(
  pathname: string,
  targetPath: string,
  includeDescendants = false
) {
  if (pathname === targetPath) {
    return true;
  }

  if (!includeDescendants) {
    return false;
  }

  const normalizedTarget =
    targetPath.length > 1 && targetPath.endsWith('/')
      ? targetPath.slice(0, -1)
      : targetPath;

  if (!normalizedTarget || normalizedTarget === '/') {
    return pathname === normalizedTarget;
  }

  return pathname.startsWith(`${normalizedTarget}/`);
}

function findCurrentPageTitle(
  items: IMenuItem[],
  pathname: string
): string | null {
  for (const item of items) {
    if (item.hide) continue;

    const visibleChildren =
      item.dropdownItems?.filter((child) => !child.hide) ?? [];
    const activeChild = visibleChildren.find(
      (child) => child.isActive || matchesPath(pathname, child.path, true)
    );

    if (activeChild) {
      return activeChild.name;
    }

    if (item.isActive || item.path === pathname) {
      return item.name;
    }

    if (
      visibleChildren.some(
        (child) => child.isActive || matchesPath(pathname, child.path, true)
      )
    ) {
      return item.name;
    }
  }

  return null;
}

// ─── MacOSLayout ───────────────────────────────────────────────

export function MacOSLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
  variant = 'sonoma',
}: MacOSLayoutProps) {
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const isTahoe = variant === 'tahoe';
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
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
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

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const getSidebarItemClassName = (active: boolean, compact = false) =>
    cn(
      'group flex w-full items-center gap-2 transition-colors duration-150 select-none',
      isTahoe
        ? compact
          ? active
            ? 'h-8 rounded-xl border border-(--macos-tahoe-sidebar-item-active-stroke) px-3 text-[12px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text)'
            : 'h-8 rounded-xl px-3 text-[12px] font-normal text-(--macos-tahoe-sidebar-item-text) hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
          : active
          ? 'h-9 rounded-xl border border-(--macos-tahoe-sidebar-item-active-stroke) px-3 text-[13px] font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text)'
          : 'h-9 rounded-xl px-3 text-[13px] font-normal text-(--macos-tahoe-sidebar-item-text) hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
        : compact
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
      isTahoe
        ? active
          ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
          : 'text-(--macos-tahoe-sidebar-item-icon) group-hover:text-(--macos-tahoe-sidebar-item-text)'
        : active
        ? 'text-[var(--color-semantic-bg-primary)]'
        : compact
        ? 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
        : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'
    );

  const renderTahoeTrafficLights = () => (
    <div aria-hidden="true" className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35)]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35)]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35)]" />
    </div>
  );

  const renderTahoeSidebarPanel = (mobile = false) => (
    <aside
      data-tucu={mobile ? 'macos-tahoe-drawer' : 'macos-tahoe-sidebar'}
      className={cn(
        'flex h-full flex-col rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]',
        mobile
          ? 'pointer-events-auto w-[272px] max-w-[calc(100vw-24px)]'
          : 'mr-4 w-[248px] shrink-0'
      )}
    >
      <div
        data-tucu="macos-tahoe-sidebar-top"
        className="shrink-0 px-5 pb-3 pt-4"
      >
        <div className="flex items-center justify-between gap-3">
          {renderTahoeTrafficLights()}
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
        {logo && (
          <div className="pt-4">
            <Logo
              {...logo}
              size="small"
              className={cn('w-auto opacity-90', logo.className)}
            />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">{renderSidebarItems()}</ul>
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
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                    isTahoe
                      ? 'hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
                      : 'hover:bg-black/4 dark:hover:bg-white/8'
                  )}
                >
                  <svg
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform duration-150',
                      isTahoe
                        ? exactParentActive
                          ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
                          : 'text-(--macos-tahoe-sidebar-item-icon)'
                        : 'text-gray-400',
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
              <ul
                className={cn(
                  isTahoe
                    ? 'mt-1 ml-3 space-y-1 pl-3'
                    : 'mt-0.5 ml-4 space-y-0.5 border-l border-gray-200/60 pl-2 dark:border-gray-700/60'
                )}
              >
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
      data-tucu={isTahoe ? 'macos-tahoe-root' : undefined}
      data-layout-variant={variant}
      className={cn(
        'flex h-full w-full overflow-hidden',
        isTahoe && 'relative bg-transparent p-3 min-[500px]:p-4',
        className
      )}
    >
      {/* Sidebar */}
      {!isMobile &&
        (isTahoe ? (
          renderTahoeSidebarPanel()
        ) : (
          <aside
            className={cn(
              'flex h-full flex-col w-[220px] shrink-0 border-r border-[var(--color-semantic-line-primary-subtle)] bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl'
            )}
          >
            <div className="flex h-[52px] shrink-0 items-center border-b border-[var(--color-semantic-line-primary-subtle)] px-3">
              {logo && <Logo {...logo} size="small" />}
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-0.5">{renderSidebarItems()}</ul>
            </nav>
          </aside>
        ))}

      {/* Main area */}
      <div
        data-tucu={isTahoe ? 'macos-tahoe-shell' : undefined}
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          isTahoe
            ? 'overflow-hidden rounded-[34px] border border-[var(--macos-tahoe-border)] bg-[var(--macos-tahoe-panel-bg)] backdrop-blur-[34px]'
            : 'overflow-visible'
        )}
      >
        <MacOSToolbar
          center={
            isTahoe ? (
              <div
                data-tucu="macos-tahoe-toolbar-center"
                className="truncate px-6 text-center text-[14px] font-semibold tracking-[0.01em] text-[var(--macos-tahoe-text)]"
              >
                {currentPageTitle ?? 'Overview'}
              </div>
            ) : undefined
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
          className={cn(
            isTahoe &&
              'border-b border-[var(--macos-tahoe-border)] bg-[var(--macos-tahoe-toolbar-bg)] px-5 min-[500px]:px-6 backdrop-blur-[24px]',
            headerClassName
          )}
        />

        <main
          data-tucu={isTahoe ? 'macos-tahoe-content' : 'main-content'}
          className={cn(
            'relative flex-1 min-h-0 overflow-auto',
            isTahoe ? 'bg-transparent' : 'bg-[var(--macos-window-bg)]',
            contentClassName
          )}
        >
          <div
            data-tucu={
              isTahoe
                ? 'macos-tahoe-content-inner'
                : 'macos-layout-content-inner'
            }
            className={cn(
              isTahoe
                ? 'px-5 pb-5 pt-4 min-[500px]:px-7 min-[500px]:pb-7'
                : 'p-6'
            )}
          >
            {children}
          </div>
        </main>
      </div>

      {isTahoe ? (
        <DrawerContainer
          isOpen={isMobile && isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          position="left"
          backdrop={false}
        >
          <div className="relative h-full w-full">
            <div
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 pointer-events-auto bg-transparent backdrop-blur-[2px]"
            />
            <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch p-3 min-[500px]:p-4">
              {renderTahoeSidebarPanel(true)}
            </div>
          </div>
        </DrawerContainer>
      ) : (
        <Drawer
          type="sidebar"
          position="left"
          backdrop={true}
          className="min-[500px]:w-[220px]"
          isOpen={isMobile && isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          logo={logo}
        >
          <div>
            <ul className="space-y-0.5">{renderSidebarItems()}</ul>
          </div>
        </Drawer>
      )}

      <Toast />
    </div>
  );
}

export default MacOSLayout;
