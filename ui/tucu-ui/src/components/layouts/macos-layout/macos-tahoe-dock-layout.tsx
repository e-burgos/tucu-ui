import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import { useIsMobile } from '../../../hooks';
import { MacOSToolbarTahoe as MacOSToolbar } from '../../macos/toolbar/toolbar-tahoe';
import { MacOSTahoeDock } from '../../macos/tahoe/dock-tahoe';
import { findCurrentPageTitle } from './utils';

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
  const [isDockVisible, setIsDockVisible] = useState(true);
  const currentPageTitle = findCurrentPageTitle(menuItems, pathname);

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
        className={cn(
          'flex min-w-0 flex-1 flex-col overflow-hidden rounded-[34px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-panel-bg) backdrop-blur-[34px]',
          'transition-[margin] duration-300 ease-in-out',
          isDockVisible ? 'mb-[56px]' : 'mb-0'
        )}
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
            logo ? (
              <Logo
                {...logo}
                size="small"
                className={cn('w-auto shrink-0', logo.className)}
              />
            ) : undefined
          }
          trailing={rightButton}
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
            className="px-5 pb-6 pt-4 min-[500px]:px-7 min-[500px]:pb-8 *:max-w-none"
          >
            {children}
          </div>
        </main>
      </div>

      {/* Dock — bottom, mobile + desktop */}
      <div
        data-tucu="tahoe-dock-wrapper"
        className={cn(
          'fixed bottom-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
          isDockVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <MacOSTahoeDock
          items={menuItems}
          showTooltips={!isMobile}
          magnification={!isMobile}
          inline
          showHideButton
          onHide={() => setIsDockVisible(false)}
        />
      </div>

      {/* Floating restore dock button — when dock is hidden */}
      {!isDockVisible && (
        <button
          type="button"
          aria-label="Show dock"
          onClick={() => setIsDockVisible(true)}
          className={cn(
            'fixed bottom-3 left-1/2 z-50 -translate-x-1/2',
            'flex h-10 w-14 items-center justify-center rounded-2xl',
            'bg-(--macos-glass-regular-bg) backdrop-blur-[68px] backdrop-saturate-[1.8]',
            'border border-(--macos-glass-border)',
            'shadow-(--macos-glass-shadow,0_4px_16px_rgba(0,0,0,0.12))',
            'transition-all duration-300 hover:scale-105 hover:bg-(--macos-glass-prominent-bg)',
            'animate-in fade-in slide-in-from-bottom-2 duration-300'
          )}
        >
          <div className="relative flex flex-col items-center gap-0.75">
            <span className="h-1.25 w-5.5 rounded-full bg-(--macos-tahoe-text-muted) opacity-70" />
            <span className="h-1.25 w-5.5 rounded-full bg-(--macos-tahoe-text-muted) opacity-40" />
            <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </div>
        </button>
      )}
    </div>
  );
}

export default MacOSTahoeDockLayout;
