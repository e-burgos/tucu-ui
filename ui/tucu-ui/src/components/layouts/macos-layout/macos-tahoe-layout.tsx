import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { DrawerContainer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { MacOSTahoeLayoutSidebar } from '../../macos/tahoe/layout/layout-sidebar-tahoe';
import { MacOSTahoeLayoutContent } from '../../macos/tahoe/layout/layout-content-tahoe';
import { MacOSTahoeToast } from '../../macos/tahoe/controls/macos-tahoe-toast';
import { MacOSBackground } from '../../macos/tahoe/foundations/background';
import { useTheme } from '../../../themes';
import { findCurrentPageTitle } from './utils';

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
  const { backgroundVariant } = useTheme();
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
      data-tucu="macos-tahoe-root"
      data-layout-variant="tahoe"
      className={cn(
        'flex h-full w-full overflow-hidden relative bg-transparent p-[12px] min-[500px]:p-[16px]',
        className
      )}
    >
      {/* Background layer */}
      <MacOSBackground
        variant={backgroundVariant}
        className="inset-0 h-full w-full"
        style={{ position: 'absolute', zIndex: -1 }}
      />

      {/* Sidebar — desktop */}
      {!isMobile && (
        <MacOSTahoeLayoutSidebar menuItems={menuItems} logo={logo} />
      )}

      {/* Main area */}
      <MacOSTahoeLayoutContent
        toolbarCenter={
          <div
            data-tucu="macos-tahoe-toolbar-center"
            className="truncate px-[24px] text-center text-[14px] font-semibold tracking-[0.01em] text-(--macos-tahoe-text)"
          >
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
      </MacOSTahoeLayoutContent>

      {/* Mobile drawer */}
      <DrawerContainer
        isOpen={isMobile && isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        position="left"
        backdrop={false}
        backdropClassName="backdrop-blur-[2px] bg-transparent"
      >
        <div className="relative h-full w-full">
          <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch p-[12px] min-[500px]:p-[16px]">
            <MacOSTahoeLayoutSidebar
              menuItems={menuItems}
              logo={logo}
              mobile
              onClose={() => setIsSidebarOpen(false)}
              onItemClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      </DrawerContainer>

      <MacOSTahoeToast />
    </div>
  );
}

export default MacOSTahoeLayout;
