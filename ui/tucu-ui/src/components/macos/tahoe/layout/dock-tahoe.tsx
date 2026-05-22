import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { IMenuItem } from '../../../layouts/menus/menu-item';
import { matchesPath } from '../../../layouts/macos-layout/utils';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeDockProps {
  /** Menu items to display in the dock */
  items: IMenuItem[];
  /** Index to place a separator before (splits "pinned" vs "recent") */
  separatorBeforeIndex?: number;
  /** Position of the dock */
  position?: 'bottom' | 'left';
  /** Enable icon magnification on hover */
  magnification?: boolean;
  /** Max scale factor for magnification (default 1.12) */
  maxScale?: number;
  /** Show labels as tooltips */
  showTooltips?: boolean;
  /** Whether to auto-hide the dock */
  autoHide?: boolean;
  /** Render inline instead of fixed positioning (useful for demos) */
  inline?: boolean;
  /** Show a hide button as the last dock item */
  showHideButton?: boolean;
  /** Callback when the hide button is clicked */
  onHide?: () => void;
  /** Extra class name for the dock container */
  className?: string;
}

// ─── Constants ─────────────────────────────────────────────────

const ICON_SIZE = 40;

// ─── Sub-components ────────────────────────────────────────────

interface DockItemProps {
  item: IMenuItem;
  isActive: boolean;
  showTooltip: boolean;
  onClick: () => void;
  isVertical: boolean;
}

function DockItem({
  item,
  isActive,
  showTooltip,
  onClick,
  isVertical,
}: DockItemProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hasChildren =
    item.dropdownItems && item.dropdownItems.filter((d) => !d.hide).length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setPopoverOpen((prev) => !prev);
    } else {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (showTooltip && !popoverOpen) setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // Close popover on outside click
  useEffect(() => {
    if (!popoverOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoverOpen]);

  // Close popover on Escape
  useEffect(() => {
    if (!popoverOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopoverOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [popoverOpen]);

  return (
    <div ref={popoverRef} className="relative flex flex-col items-center">
      {/* Tooltip */}
      {tooltipVisible && !popoverOpen && (
        <div
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-[8px] px-[10px] py-[4px] text-[12px] font-medium shadow-lg',
            'bg-(--macos-tahoe-panel-bg) text-(--macos-tahoe-text) border border-border backdrop-blur-xl',
            isVertical
              ? 'left-full ml-[8px] top-1/2 -translate-y-1/2'
              : 'bottom-full mb-[8px] left-1/2 -translate-x-1/2'
          )}
        >
          {item.name}
        </div>
      )}

      {/* Popover for children */}
      {popoverOpen && hasChildren && (
        <div
          className={cn(
            'absolute z-50 min-w-[180px] rounded-[16px] p-[6px]',
            'bg-(--macos-glass-prominent-bg) backdrop-blur-xl backdrop-saturate-[1.8]',
            'border border-border',
            'shadow-(--macos-glass-shadow,0_8px_32px_rgba(0,0,0,0.15))',
            'animate-in fade-in slide-in-from-bottom-2 duration-200',
            isVertical
              ? 'left-full ml-[8px] top-0'
              : 'bottom-full mb-[8px] left-1/2 -translate-x-1/2'
          )}
        >
          {item.dropdownItems
            ?.filter((d) => !d.hide)
            .map((child) => (
              <DockPopoverItem
                key={child.path}
                item={child}
                onClose={() => setPopoverOpen(false)}
              />
            ))}
        </div>
      )}

      {/* Dock icon button */}
      <button
        type="button"
        aria-label={item.name}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative flex items-center justify-center rounded-[12px] transition-all duration-150 ease-out',
          isActive
            ? 'bg-(--color-brand) shadow-sm'
            : 'hover:bg-(--color-brand)/15 hover:scale-110',
          popoverOpen && 'bg-(--color-brand)/15 scale-110'
        )}
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      >
        <span
          className={cn(
            'flex items-center justify-center [&>svg]:w-[20px] [&>svg]:h-[20px] transition-colors duration-150',
            isActive
              ? 'text-white'
              : 'text-(--macos-tahoe-sidebar-item-icon) dark:text-white/50'
          )}
        >
          {item.icon}
        </span>
        {/* Dropdown arrow indicator */}
        {hasChildren && (
          <ChevronUp
            className={cn(
              'absolute w-[10px] h-[10px] transition-all duration-200 ease-out',
              isVertical
                ? 'left-[2px] top-1/2 -translate-y-1/2 -rotate-90'
                : 'top-[2px] left-1/2 -translate-x-1/2',
              popoverOpen && !isVertical && 'top-0 -translate-y-[2px]',
              popoverOpen && isVertical && 'left-0 -translate-x-[2px]',
              isActive
                ? 'text-white/70'
                : 'text-(--macos-tahoe-sidebar-item-icon)/50 dark:text-white/30'
            )}
            strokeWidth={2.5}
          />
        )}
      </button>

      {/* Active indicator dot */}
      {isActive && (
        <div
          className={cn(
            'absolute rounded-full bg-(--color-brand)',
            isVertical
              ? 'right-0 top-1/2 -translate-y-1/2 translate-x-[4px] h-[4px] w-[4px]'
              : 'bottom-0 left-1/2 -translate-x-1/2 translate-y-[4px] h-[4px] w-[4px]'
          )}
        />
      )}
    </div>
  );
}

interface DockPopoverItemProps {
  item: IMenuItem;
  onClose: () => void;
}

function DockPopoverItem({ item, onClose }: DockPopoverItemProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = matchesPath(pathname, item.path, true);

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    const href = item.href ?? item.path;
    if (/^https?:\/\//i.test(href)) {
      window.location.href = href;
    } else {
      navigate(href);
    }
    onClose();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex w-full items-center gap-[10px] rounded-[8px] px-[10px] py-[6px] text-left text-[13px] transition-colors',
        isActive
          ? 'bg-(--macos-tahoe-sidebar-item-active-bg) text-(--macos-tahoe-sidebar-item-active-text) font-semibold'
          : 'text-(--macos-tahoe-text) hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
      )}
    >
      {item.icon && (
        <span
          className={cn(
            'flex h-[16px] w-[16px] shrink-0 items-center justify-center [&>svg]:h-[16px] [&>svg]:w-[16px]',
            isActive
              ? 'text-(--macos-tahoe-sidebar-item-active-icon)'
              : 'text-(--macos-tahoe-sidebar-item-icon)'
          )}
        >
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.name}</span>
    </button>
  );
}

// ─── Dock Separator ────────────────────────────────────────────

function DockSeparator({ isVertical }: { isVertical: boolean }) {
  return (
    <div
      className={cn(
        'shrink-0 rounded-full bg-(--macos-tahoe-toolbar-bg) opacity-60',
        isVertical
          ? 'mx-auto my-[4px] h-px w-[32px]'
          : 'my-auto mx-[4px] h-[32px] w-px'
      )}
    />
  );
}

// ─── MacOSTahoeDock ────────────────────────────────────────────

export function MacOSTahoeDock({
  items,
  separatorBeforeIndex,
  position = 'bottom',
  magnification = true,
  maxScale = 1.12,
  showTooltips = true,
  autoHide = false,
  inline = false,
  showHideButton = false,
  onHide,
  className,
}: MacOSTahoeDockProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dockRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(!autoHide);
  const isVertical = position === 'left';

  const visibleItems = items.filter((item) => !item.hide);

  // Auto-hide logic
  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }
    if (isHovered) {
      setIsVisible(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 8;
      if (
        position === 'bottom' &&
        e.clientY >= window.innerHeight - threshold
      ) {
        setIsVisible(true);
      } else if (position === 'left' && e.clientX <= threshold) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => setIsVisible(false), 800);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [autoHide, isHovered, position]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isItemActive = (item: IMenuItem): boolean => {
    if (item.isActive) return true;
    if (matchesPath(pathname, item.path, false)) return true;
    if (
      item.dropdownItems?.some(
        (child) => child.isActive || matchesPath(pathname, child.path, true)
      )
    ) {
      return true;
    }
    return false;
  };

  const handleItemClick = (item: IMenuItem) => {
    if (item.onClick) item.onClick();
    const href = item.href ?? item.path;
    if (/^https?:\/\//i.test(href)) {
      window.location.href = href;
    } else {
      navigate(href);
    }
  };

  // Build items with separators
  const renderItems = () => {
    const elements: React.ReactNode[] = [];

    visibleItems.forEach((item, i) => {
      if (separatorBeforeIndex !== undefined && i === separatorBeforeIndex) {
        elements.push(
          <DockSeparator key={`sep-${i}`} isVertical={isVertical} />
        );
      }

      elements.push(
        <DockItem
          key={item.path}
          item={item}
          isActive={isItemActive(item)}
          showTooltip={showTooltips}
          onClick={() => handleItemClick(item)}
          isVertical={isVertical}
        />
      );
    });

    return elements;
  };

  const dockScale = magnification && isHovered ? maxScale : 1;

  return (
    <div
      data-tucu="tahoe-dock"
      ref={dockRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex items-end justify-center',
        inline
          ? isVertical
            ? 'relative flex-col'
            : 'relative flex-row'
          : isVertical
          ? 'fixed left-[12px] top-1/2 z-50 -translate-y-1/2 flex-col'
          : 'fixed bottom-[12px] left-1/2 z-50 -translate-x-1/2 flex-row',
        'transition-all duration-300',
        autoHide &&
          !isVisible &&
          (isVertical
            ? '-translate-x-full opacity-0'
            : 'translate-y-full opacity-0'),
        className
      )}
    >
      <div
        data-tucu="tahoe-dock-bar"
        className={cn(
          'flex items-center rounded-[16px] origin-bottom',
          'bg-(--macos-glass-regular-bg) backdrop-blur-[68px] backdrop-saturate-[1.8]',
          'border border-border',
          'shadow-(--macos-glass-shadow,0_0_6px_rgba(0,0,0,0.15))',
          isVertical
            ? 'flex-col gap-[4px] px-[6px] py-[8px] origin-left'
            : 'flex-row gap-[4px] px-[8px] py-[6px] origin-bottom'
        )}
        style={{
          transform: `scale(${dockScale})`,
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {renderItems()}
        {showHideButton && onHide && (
          <>
            <DockSeparator isVertical={isVertical} />
            <button
              type="button"
              aria-label="Hide dock"
              onClick={onHide}
              className={cn(
                'group relative flex items-center justify-center rounded-[10px] transition-colors duration-150',
                'text-(--macos-tahoe-text-muted) hover:text-(--macos-tahoe-text)',
                'hover:bg-white/8 dark:hover:bg-white/10'
              )}
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              <ChevronDown className="h-[16px] w-[16px]" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MacOSTahoeDock;
