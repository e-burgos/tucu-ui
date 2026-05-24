import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { Drawer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { useBreakpoint } from '../../../hooks/use-breakpoint';
import { HorizontalNavMenu } from '../menus/horizontal-nav-menu';
import { MacOSSonomaLayoutSidebar } from '../../macos/sonoma/layout/layout-sidebar-sonoma';
import { MacOSSonomaToast } from '../../macos/sonoma/feedback/macos-sonoma-toast';
import { ThemeBackground, useTheme } from '../../../themes';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSonomaNavbarLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSSonomaNavbarLayout ───────────────────────────────────

export function MacOSSonomaNavbarLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
}: MacOSSonomaNavbarLayoutProps) {
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();
  const breakpoint = useBreakpoint();
  const { backgroundVariant } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showHorizontalNav = ['lg', 'xl', '2xl', '3xl', '4xl'].includes(
    breakpoint
  );

  useEffect(() => {
    if (!isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [pathname, isMobile]);

  return (
    <div
      data-tucu="macos-sonoma-navbar-root"
      data-layout-variant="sonoma-navbar"
      className={cn(
        'flex flex-col h-full w-full overflow-hidden relative',
        className
      )}
    >
      {/* Background layer */}
      <ThemeBackground mode="absolute" variant={backgroundVariant} />

      {/* Toolbar / Navbar */}
      <header
        data-tucu="macos-sonoma-navbar-toolbar"
        className={cn(
          'relative z-10 flex h-[58px] min-h-[58px] items-center px-[16px]',
          'bg-(--macos-glass-regular-bg) backdrop-blur-xl',
          'border-b border-border',
          headerClassName
        )}
      >
        {/* Leading: Logo */}
        {logo && (
          <Logo
            {...logo}
            size="small"
            className={cn('w-auto shrink-0 mr-[16px]', logo.className)}
          />
        )}

        {/* Center: Horizontal Nav (hidden below lg) */}
        {showHorizontalNav && menuItems.length > 0 && (
          <div className="flex-1 min-w-0 flex justify-center">
            <HorizontalNavMenu
              menuItems={menuItems}
              className="[&_a:not(.active)]:!text-gray-600 dark:[&_a:not(.active)]:!text-gray-300 dark:[&_a:not(.active):hover]:!text-white [&_a:not(.active):hover]:!text-black [&_a.active]:!text-brand [&_li_a.active]:!text-white dark:[&_li_a.active]:!text-white [&_span.text-brand]:!text-brand"
              dropboxClassName="bg-(--macos-glass-regular-bg)! backdrop-blur-xl!"
            />
          </div>
        )}

        {/* Spacer when nav hidden */}
        {!showHorizontalNav && <div className="flex-1" />}

        {/* Trailing: rightButton + hamburger */}
        <div className="flex items-center gap-[8px] shrink-0 ml-[16px]">
          {rightButton}
          {!showHorizontalNav && menuItems.length > 0 && (
            <Hamburger
              isOpen={isSidebarOpen}
              variant="ghost"
              size="small"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
          )}
        </div>
      </header>

      {/* Content Area */}
      <main
        data-tucu="macos-sonoma-navbar-content"
        className={cn('relative z-0 flex-1 overflow-auto', contentClassName)}
      >
        {children}
      </main>

      {/* Mobile drawer */}
      <Drawer
        type="sidebar"
        position="left"
        backdrop={true}
        className="min-[500px]:w-[300px]"
        isOpen={!showHorizontalNav && isSidebarOpen}
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

export default MacOSSonomaNavbarLayout;
