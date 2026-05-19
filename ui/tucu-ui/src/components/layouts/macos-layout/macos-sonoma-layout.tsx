import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { Drawer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSSonomaLayoutSidebar } from '../../macos/sonoma/layout/layout-sidebar-sonoma';
import { MacOSSonomaLayoutContent } from '../../macos/sonoma/layout/layout-content-sonoma';
import { MacOSSonomaToast } from '../../macos/sonoma/feedback/macos-sonoma-toast';
import { findCurrentPageTitle } from './utils';

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
  const currentPageTitle = findCurrentPageTitle(menuItems, pathname);

  useEffect(() => {
    if (!isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [pathname, isMobile]);

  return (
    <div
      data-layout-variant="sonoma"
      className={cn('flex h-full w-full overflow-hidden', className)}
    >
      {/* Sidebar — desktop */}
      {!isMobile && (
        <MacOSSonomaLayoutSidebar menuItems={menuItems} logo={logo} />
      )}

      {/* Main area */}
      <MacOSSonomaLayoutContent
        toolbarCenter={
          <div className="truncate px-[24px] text-center text-[14px] font-semibold tracking-[0.01em] text-gray-800 dark:text-gray-100">
            {currentPageTitle ?? 'Overview'}
          </div>
        }
        toolbarLeading={
          isMobile && logo ? (
            <Logo
              {...logo}
              size="small"
              className={cn('w-auto shrink-0', logo.className)}
            />
          ) : undefined
        }
        toolbarTrailing={
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
        headerClassName={headerClassName}
        contentClassName={contentClassName}
      >
        {children}
      </MacOSSonomaLayoutContent>

      {/* Mobile drawer */}
      <Drawer
        type="sidebar"
        position="left"
        backdrop={true}
        className="min-[500px]:w-[300px]"
        isOpen={isMobile && isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        logo={logo}
      >
        <MacOSSonomaLayoutSidebar
          menuItems={menuItems}
          logo={logo}
          onItemClick={() => setIsSidebarOpen(false)}
          className="w-full border-r-0"
        />
      </Drawer>

      <MacOSSonomaToast />
    </div>
  );
}

export default MacOSSonomaLayout;
