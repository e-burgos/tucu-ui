import React, { useState, useRef, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';
import ListItem from './list-Item';
import { ListItemProps } from './list-Item';

export interface ListContainerProps {
  items: ListItemProps[];
  label?: string;
  triggerIcon?: React.ReactNode;
  className?: string;
  dropdownClassName?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'end' | 'center';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  keepOpen?: boolean;
  trigger?: 'hover' | 'click';
  /** Delay in ms before closing on mouse leave (default: 1000) */
  closeDelay?: number;
}

// Default three dots vertical icon
const DefaultOptionsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600 dark:text-gray-300"
  >
    <circle cx="8" cy="4" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const ListContainer: React.FC<ListContainerProps> = ({
  label,
  items,
  triggerIcon,
  className,
  dropdownClassName,
  position = 'bottom',
  align = 'end',
  isOpen: controlledIsOpen,
  onOpenChange,
  keepOpen = false,
  trigger = 'hover',
  closeDelay = 500,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (newIsOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Compute dropdown position using fixed positioning (same as Select)
  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 300;
    const dropdownWidth = 280;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldDropUp =
      position === 'top' ||
      (position === 'bottom' &&
        spaceBelow < dropdownHeight &&
        spaceAbove > spaceBelow);

    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
    };

    if (position === 'left' || position === 'right') {
      // Horizontal positioning
      if (position === 'left') {
        style.right = window.innerWidth - rect.left + 4;
      } else {
        style.left = rect.right + 4;
      }
      // Vertical alignment
      if (align === 'start') style.top = rect.top;
      else if (align === 'end') style.bottom = window.innerHeight - rect.bottom;
      else style.top = rect.top + rect.height / 2;
    } else {
      // Vertical positioning (top/bottom)
      if (shouldDropUp) {
        style.bottom = window.innerHeight - rect.top + 4;
      } else {
        style.top = rect.bottom + 4;
      }
      // Horizontal alignment
      if (align === 'start') {
        style.left = rect.left;
      } else if (align === 'end') {
        style.right = window.innerWidth - rect.right;
      } else {
        style.left = rect.left + rect.width / 2;
        style.transform = 'translateX(-50%)';
      }

      // Ensure dropdown doesn't overflow right edge
      if (align !== 'end' && style.left !== undefined) {
        const left = typeof style.left === 'number' ? style.left : 0;
        if (left + dropdownWidth > window.innerWidth) {
          style.left = undefined;
          style.right = 8;
        }
      }
    }

    // Ensure it doesn't overflow left
    if (
      style.left !== undefined &&
      typeof style.left === 'number' &&
      style.left < 0
    ) {
      style.left = 8;
    }

    setDropdownStyle(style);
  }, [position, align]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      clearCloseTimer();
      updateDropdownPosition();
      handleOpenChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && !keepOpen) {
      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        handleOpenChange(false);
      }, closeDelay);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (!isOpen) {
        updateDropdownPosition();
      }
      handleOpenChange(!isOpen);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <div
      className={cn('group/options relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        data-tucu="list-trigger"
        onClick={handleClick}
        className="flex items-center justify-center w-full h-[32px] border border-border bg-light-dark rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-[2px] focus:ring-offset-[2px] focus:ring-brand/50"
        aria-label="Options menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label && (
          <div className="flex items-center justify-between gap-[8px] w-full px-[12px]">
            <span className="text-[14px] font-medium">{label}</span>
            <ChevronDown
              className={cn(
                'w-[10px] h-[10px] transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        )}
        {!label && (triggerIcon || <DefaultOptionsIcon />)}
      </button>

      <ul
        data-tucu="list-dropdown"
        style={
          isOpen
            ? dropdownStyle
            : {
                position: 'fixed',
                zIndex: 9999,
                visibility: 'hidden',
                pointerEvents: 'none',
              }
        }
        onMouseEnter={clearCloseTimer}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'w-auto min-w-[200px] max-w-[280px] border border-border overflow-hidden rounded-lg bg-light-dark p-[8px] shadow-large transition-opacity duration-200',
          isOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none',
          dropdownClassName
        )}
        role="menu"
        aria-orientation="vertical"
      >
        {items.map((item) => (
          <ListItem key={item.id} {...{ ...item, onClick: handleClick }} />
        ))}
      </ul>
    </div>
  );
};

export default ListContainer;
