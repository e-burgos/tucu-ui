import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import Hamburger from '../../buttons/hamburger';
import { DrawerContainer } from '../../dialog';
import { useIsMobile } from '../../../hooks';
import { useBreakpoint } from '../../../hooks/use-breakpoint';
import { HorizontalNavMenu } from '../menus/horizontal-nav-menu';
import { MacOSTahoeLayoutSidebar } from '../../macos/tahoe/layout/layout-sidebar-tahoe';
import { MacOSTahoeToast } from '../../macos/tahoe/controls/macos-tahoe-toast';
import { ThemeBackground, useTheme } from '../../../themes';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeNavbarLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSTahoeNavbarLayout ────────────────────────────────────

export function MacOSTahoeNavbarLayout({
  children,
  menuItems,
  logo,
  rightButton,
  className,
  headerClassName,
  contentClassName,
}: MacOSTahoeNavbarLayoutProps) {
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
      data-tucu="macos-tahoe-navbar-root"
      data-layout-variant="tahoe-navbar"
      className={cn(
        'flex flex-col h-full w-full overflow-hidden relative bg-transparent p-[12px] min-[500px]:p-[16px]',
        className
      )}
    >
      {/* Background layer */}
      <ThemeBackground mode="absolute" variant={backgroundVariant} />

      {/* Toolbar / Navbar */}
      <header
        data-tucu="macos-tahoe-navbar-toolbar"
        className={cn(
          'relative z-10 flex h-[58px] min-h-[58px] items-center px-[16px] rounded-t-[16px]',
          'bg-(--macos-tahoe-panel-bg) backdrop-blur-xl',
          'border-t border-r border-l border-border',
          'text-foreground',
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
              className="[&_a:not(.active)]:!text-foreground/60 [&_a:not(.active):hover]:!text-foreground [&_a.active]:!text-brand [&_li_li_a.active]:!text-white dark:[&_li_li_a.active]:!text-white [&_span.text-brand]:!text-brand"
              dropboxClassName="bg-(--macos-tahoe-panel-bg)! backdrop-blur-xl!"
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
      <div
        className={cn(
          'relative z-0 flex-1 overflow-hidden rounded-b-[16px]',
          'border border-border'
        )}
      >
        {/* Static blur layer - outside scroll container, never scrolls, not ancestor of fixed children */}
        <div className="absolute inset-0 bg-(--macos-tahoe-toolbar-bg)/60 backdrop-blur-md rounded-b-[16px] pointer-events-none z-0" />
        <main
          data-tucu="macos-tahoe-navbar-content"
          className={cn(
            'relative z-[1] h-full overflow-auto',
            'text-foreground',
            contentClassName
          )}
        >
          <div className="px-[20px] pb-[20px] pt-[20px] min-[500px]:px-[28px] min-[500px]:pb-[28px] [&>*]:max-w-none">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <DrawerContainer
        isOpen={!showHorizontalNav && isSidebarOpen}
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

export default MacOSTahoeNavbarLayout;
