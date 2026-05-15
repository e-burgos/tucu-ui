import { useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { DrawerContainer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSToolbarTahoe as MacOSToolbar } from '../../macos/toolbar/toolbar-tahoe';
import { MacOSTahoeDock } from '../../macos/tahoe/dock-tahoe';
import { findCurrentPageTitle } from './utils';
import { useState } from 'react';
import { Close } from '../../icons/close';
import AnchorLink from '../../links/anchor-link';
import { matchesPath } from './utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeDockLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSTahoeDockLayout ──────────────────────────────────────

export function MacOSTahoeDockLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
}: MacOSTahoeDockLayoutProps) {
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPageTitle = findCurrentPageTitle(menuItems, pathname);

  useEffect(() => {
    if (!isMobile) setIsDrawerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) setIsDrawerOpen(false);
  }, [pathname, isMobile]);

  // ─── Mobile drawer sidebar items ────────────────────────────

  const isItemActive = (
    path: string,
    activeOverride?: boolean,
    includeDescendants = false
  ) =>
    Boolean(activeOverride) || matchesPath(pathname, path, includeDescendants);

  const renderMobileDrawer = () => (
    <aside
      data-tucu="macos-tahoe-drawer"
      className="pointer-events-auto flex h-full w-80 max-w-[calc(100vw-24px)] flex-col rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]"
    >
      <div className="flex h-(--macos-toolbar-height,58px) shrink-0 items-center border-b border-(--macos-tahoe-border) px-5">
        <div className="flex w-full items-center justify-between gap-3">
          {logo && (
            <Logo
              {...logo}
              size="small"
              className={cn('w-auto opacity-90', logo.className)}
            />
          )}
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsDrawerOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
          >
            <Close className="h-3.5 w-3.5" width={14} height={14} />
          </button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pt-3 pb-5">
        <ul className="space-y-1">
          {menuItems
            .filter((item) => !item.hide)
            .map((item) => {
              const href = item.href ?? item.path;
              const active = isItemActive(item.path, item.isActive);
              return (
                <li key={item.path}>
                  <AnchorLink
                    to={href}
                    onClick={() => {
                      item.onClick?.();
                      setIsDrawerOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 h-9 rounded-xl px-3 text-[13px] font-normal transition-colors duration-150 select-none',
                      active
                        ? 'border border-(--macos-tahoe-sidebar-item-active-stroke) font-semibold bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text)'
                        : 'text-(--macos-tahoe-sidebar-item-text) dark:text-white/[.88] hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          'h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4',
                          active
                            ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
                            : 'text-(--macos-tahoe-sidebar-item-icon) dark:text-white/50'
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate text-left">
                      {item.name}
                    </span>
                  </AnchorLink>
                </li>
              );
            })}
        </ul>
      </nav>
    </aside>
  );

  return (
    <div
      data-tucu="macos-tahoe-root"
      data-layout-variant="tahoe-dock"
      className={cn(
        'flex h-full w-full overflow-hidden relative bg-transparent p-3 min-[500px]:p-4',
        className
      )}
    >
      {/* Main area — full width, no sidebar */}
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
                    isOpen={isDrawerOpen}
                    variant="ghost"
                    size="small"
                    onClick={() => setIsDrawerOpen((prev) => !prev)}
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
            className="px-5 pb-20 pt-4 min-[500px]:px-7 min-[500px]:pb-24 [&>*]:max-w-none"
          >
            {children}
          </div>
        </main>
      </div>

      {/* Dock — bottom, only on desktop */}
      {!isMobile && (
        <MacOSTahoeDock items={menuItems} showTooltips magnification />
      )}

      {/* Mobile drawer */}
      <DrawerContainer
        isOpen={isMobile && isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        position="left"
        backdrop={false}
        backdropClassName="backdrop-blur-[2px] bg-transparent"
      >
        <div className="relative h-full w-full">
          <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch p-3 min-[500px]:p-4">
            {renderMobileDrawer()}
          </div>
        </div>
      </DrawerContainer>
    </div>
  );
}

export default MacOSTahoeDockLayout;
