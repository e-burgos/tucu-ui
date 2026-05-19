import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IMenuItem } from '../menus/menu-item';
import Logo, { LogoPropTypes } from '../../logos/logo';
import { useIsMobile } from '../../../hooks';
import { MacOSTahoeLayoutContent } from '../../macos/tahoe/layout/layout-content-tahoe';
import { MacOSTahoeDock } from '../../macos/tahoe/layout/dock-tahoe';
import { MacOSBackground } from '../../macos/tahoe/foundations/background';
import { useTheme } from '../../../themes';
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
  const { backgroundVariant } = useTheme();
  const [isDockVisible, setIsDockVisible] = useState(true);
  const currentPageTitle = findCurrentPageTitle(menuItems, pathname);

  return (
    <div
      data-tucu="macos-tahoe-root"
      data-layout-variant="tahoe-dock"
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

      {/* Main area — full width, no sidebar */}
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
          logo ? (
            <Logo
              {...logo}
              size="small"
              className={cn('w-auto shrink-0', logo.className)}
            />
          ) : undefined
        }
        toolbarTrailing={rightButton}
        headerClassName={headerClassName}
        contentClassName={contentClassName}
        className={cn(
          'transition-[margin] duration-300 ease-in-out',
          isDockVisible ? 'mb-[56px]' : 'mb-[0px]'
        )}
      >
        {children}
      </MacOSTahoeLayoutContent>

      {/* Dock — bottom, mobile + desktop */}
      <div
        data-tucu="tahoe-dock-wrapper"
        className={cn(
          'fixed bottom-[12px] left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
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
            'fixed bottom-[12px] left-1/2 z-50 -translate-x-1/2',
            'flex h-[40px] w-[56px] items-center justify-center rounded-[16px]',
            'bg-(--macos-glass-regular-bg) backdrop-blur-[68px] backdrop-saturate-[1.8]',
            'border border-(--macos-glass-border)',
            'shadow-(--macos-glass-shadow,0_4px_16px_rgba(0,0,0,0.12))',
            'transition-all duration-300 hover:scale-105 hover:bg-(--macos-glass-prominent-bg)',
            'animate-in fade-in slide-in-from-bottom-2 duration-300'
          )}
        >
          <svg
            className="h-[20px] w-[20px] text-(--macos-tahoe-text-muted)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSTahoeDockLayout;
