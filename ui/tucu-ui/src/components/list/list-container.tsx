import React, { useState } from 'react';
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
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

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

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      handleOpenChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && !keepOpen) {
      handleOpenChange(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      handleOpenChange(!isOpen);
    }
  };
  const getPositionClasses = () => {
    const baseClasses = 'absolute';
    const positionMap = {
      bottom: {
        start: 'top-full left-0 mt-[2px]',
        end: 'top-full right-0 mt-[2px]',
        center: 'top-full left-1/2 -translate-x-1/2 mt-[2px]',
      },
      top: {
        start: 'bottom-full left-0 mb-[2px]',
        end: 'bottom-full right-0 mb-[2px]',
        center: 'bottom-full left-1/2 -translate-x-1/2 mb-[2px]',
      },
      left: {
        start: 'right-full top-0 mr-[2px]',
        end: 'right-full bottom-0 mr-[2px]',
        center: 'right-full top-1/2 -translate-y-1/2 mr-[2px]',
      },
      right: {
        start: 'left-full top-0 ml-[2px]',
        end: 'left-full bottom-0 ml-[2px]',
        center: 'left-full top-1/2 -translate-y-1/2 ml-[2px]',
      },
    };

    return `${baseClasses} ${
      positionMap[position]?.[align] || positionMap.bottom.end
    }`;
  };

  return (
    <div
      className={cn('group/options relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        data-tucu="list-trigger"
        onClick={handleClick}
        className="flex items-center justify-center w-full h-[32px] border border-gray-200 dark:border-gray-700 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-[2px] focus:ring-offset-[2px] focus:ring-brand/50"
        aria-label="Options menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label && (
          <div className="flex items-center justify-between gap-[8px] w-full px-[12px]">
            <span className="text-[14px font-medium">{label}</span>
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
        className={cn(
          'absolute w-auto min-w-[200px] max-w-[280px] overflow-hidden rounded-lg bg-light-dark p-[8px] shadow-large transition-all z-50',
          getPositionClasses(),
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
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
