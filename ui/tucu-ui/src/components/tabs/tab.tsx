import {
  FC,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  useId,
  KeyboardEvent,
  ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, LayoutGroup } from 'framer-motion';
import cn from 'classnames';
import { useBreakpoint } from '../../hooks';
import { useIsMounted } from '../../hooks/use-is-mounted';
import { ChevronDown } from '../icons/chevron-down';

/* ─── Types ─────────────────────────────────────────────────── */

type VariantNames = 'underline' | 'pills' | 'bordered' | 'solid';
type SizeNames = 'small' | 'medium' | 'large';
type ColorNames = 'primary' | 'secondary' | 'success' | 'danger';

/* ─── Style Tokens ──────────────────────────────────────────── */

const variants: Record<
  VariantNames,
  { base: string; selected: string; unselected: string }
> = {
  underline: {
    base: 'relative pb-2 border-b-2 border-transparent',
    selected: 'border-brand text-brand dark:border-brand dark:text-brand',
    unselected: 'hover:border-gray-300 dark:hover:border-gray-600',
  },
  pills: {
    base: 'rounded-full px-4 py-2 transition-all duration-200',
    selected: 'bg-brand text-white shadow-sm',
    unselected: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
  bordered: {
    base: 'rounded-lg border-2 px-4 py-2 transition-all duration-200',
    selected: 'border-brand bg-brand/10 text-brand dark:bg-brand/20',
    unselected:
      'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
  },
  solid: {
    base: 'rounded-lg px-4 py-2 transition-all duration-200',
    selected: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white',
    unselected: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
};

const sizes: Record<SizeNames, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

const colors: Record<ColorNames, string> = {
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  danger: 'text-red-600 dark:text-red-400',
};

/* ─── Context ───────────────────────────────────────────────── */

interface TabsContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  tabCount: number;
  baseId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const TabsContext = createContext<TabsContextValue>({
  selectedIndex: 0,
  setSelectedIndex: noop,
  tabCount: 0,
  baseId: '',
});

/* ─── TabGroup ──────────────────────────────────────────────── */

export interface TabGroupExtendedProps {
  variant?: VariantNames;
  className?: string;
  selectedIndex?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  children?: ReactNode;
}

export const TabGroup: FC<TabGroupExtendedProps> = ({
  variant = 'underline',
  className,
  children,
  selectedIndex: controlledIndex,
  defaultIndex = 0,
  onChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const baseId = useId();

  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex : internalIndex;

  const setSelectedIndex = useCallback(
    (index: number) => {
      if (!isControlled) setInternalIndex(index);
      onChange?.(index);
    },
    [isControlled, onChange]
  );

  // Count direct TabItem children inside TabList
  let tabCount = 0;
  Children.forEach(children, (child) => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === TabList
    ) {
      Children.forEach(child.props.children, (tabChild) => {
        if (isValidElement(tabChild)) tabCount++;
      });
    }
  });

  return (
    <TabsContext.Provider
      value={{ selectedIndex, setSelectedIndex, tabCount, baseId }}
    >
      <div className={cn('w-full', className)} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/* ─── TabList ───────────────────────────────────────────────── */

export interface TabListExtendedProps {
  variant?: VariantNames;
  className?: string;
  children?: ReactNode;
  /** When true, renders a dropdown select on mobile breakpoints (xs, sm). Default: true */
  responsive?: boolean;
}

export const TabList: FC<TabListExtendedProps> = ({
  variant = 'underline',
  className,
  children,
  responsive = true,
}) => {
  const { selectedIndex, setSelectedIndex, baseId } = useContext(TabsContext);
  const listRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const tabElements = Children.toArray(children).filter(isValidElement);
  const count = tabElements.length;

  const isMobile =
    responsive && isMounted && ['xs', 'sm'].indexOf(breakpoint) !== -1;

  // Extract tab item metadata from children for the mobile select
  const tabItems = tabElements.map((child) => {
    if (isValidElement<TabItemExtendedProps>(child)) {
      return {
        label: child.props.children,
        icon: child.props.icon,
        disabled: child.props.disabled,
        color: child.props.color,
      };
    }
    return { label: null, icon: undefined, disabled: false, color: undefined };
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      let newIndex = selectedIndex;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = (selectedIndex + 1) % count;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = (selectedIndex - 1 + count) % count;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = count - 1;
      }
      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
        const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not([disabled])'
        );
        buttons?.[newIndex]?.focus();
      }
    },
    [selectedIndex, setSelectedIndex, count]
  );

  const listClasses = cn(
    'flex',
    {
      'gap-6 border-b border-gray-200 dark:border-gray-700':
        variant === 'underline',
      'gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl': variant === 'pills',
      'gap-2': variant === 'bordered',
      'gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl': variant === 'solid',
    },
    className
  );

  // Mobile: render inline dropdown select
  if (isMobile) {
    return (
      <TabListMobileSelect
        tabItems={tabItems}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      className={listClasses}
      onKeyDown={handleKeyDown}
    >
      {tabElements.map((child, index) =>
        cloneElement(child as React.ReactElement<TabItemExtendedProps>, {
          __index: index,
          __selected: index === selectedIndex,
          __baseId: baseId,
          __onSelect: () => setSelectedIndex(index),
        })
      )}
    </div>
  );
};

/* ─── TabListMobileSelect (internal) ────────────────────────── */

interface MobileTabItem {
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  color?: ColorNames;
}

interface TabListMobileSelectProps {
  tabItems: MobileTabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  variant?: VariantNames;
  className?: string;
}

const mobileVariantButton: Record<VariantNames, string> = {
  underline:
    'border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100  dark:hover:bg-gray-800/50',
  pills:
    'bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800',
  bordered: 'border-2 border-brand rounded-lg bg-brand/5 dark:bg-brand/10',
  solid:
    'bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700',
};

const mobileVariantDropdown: Record<VariantNames, string> = {
  underline: 'rounded-xl border border-gray-200 dark:border-gray-700',
  pills: 'rounded-2xl border border-gray-200 dark:border-gray-700',
  bordered: 'rounded-xl border-2 border-brand/30 dark:border-brand/20',
  solid: 'rounded-xl border border-gray-200 dark:border-gray-700',
};

const mobileVariantOption: Record<
  VariantNames,
  { selected: string; highlighted: string }
> = {
  underline: {
    selected:
      'bg-gray-100 dark:bg-gray-700 font-medium border-l-2 border-brand',
    highlighted: 'bg-gray-100 dark:bg-gray-700/50',
  },
  pills: {
    selected: 'bg-brand text-white font-medium rounded-full',
    highlighted: 'bg-gray-100 dark:bg-gray-700/50 rounded-full',
  },
  bordered: {
    selected:
      'bg-brand/10 dark:bg-brand/20 text-brand font-medium border border-brand/30 rounded-lg',
    highlighted: 'bg-gray-100 dark:bg-gray-700/50 rounded-lg',
  },
  solid: {
    selected:
      'bg-gray-200 dark:bg-gray-700 font-medium text-gray-900 dark:text-white',
    highlighted: 'bg-gray-100 dark:bg-gray-700/50',
  },
};

function TabListMobileSelect({
  tabItems,
  selectedIndex,
  onChange,
  variant = 'underline',
  className,
}: TabListMobileSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndices = tabItems
    .map((item, i) => (!item.disabled ? i : -1))
    .filter((i) => i !== -1);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 200;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldDropUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    setDropdownStyle({
      position: 'fixed',
      ...(shouldDropUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  const openDropdown = useCallback(() => {
    updatePosition();
    setHighlightedIndex(selectedIndex);
    setIsClosing(false);
    setIsOpen(true);
  }, [selectedIndex, updatePosition]);

  const closeDropdown = useCallback(() => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setHighlightedIndex(-1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (isOpen) closeDropdown();
    else openDropdown();
  }, [isOpen, openDropdown, closeDropdown]);

  const handleSelect = useCallback(
    (index: number) => {
      if (tabItems[index]?.disabled) return;
      onChange(index);
      closeDropdown();
      buttonRef.current?.focus();
    },
    [onChange, closeDropdown, tabItems]
  );

  // Navigate to next/prev enabled index
  const nextEnabled = useCallback(
    (current: number, direction: 1 | -1) => {
      const len = tabItems.length;
      let next = (current + direction + len) % len;
      let attempts = 0;
      while (tabItems[next]?.disabled && attempts < len) {
        next = (next + direction + len) % len;
        attempts++;
      }
      return next;
    },
    [tabItems]
  );

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, closeDropdown]);

  // Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeDropdown]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    const reposition = () => updatePosition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [isOpen, updatePosition]);

  // Scroll highlighted into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((p) => nextEnabled(p, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((p) => nextEnabled(p, -1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && !tabItems[highlightedIndex]?.disabled) {
          handleSelect(highlightedIndex);
        }
        break;
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        closeDropdown();
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(enabledIndices[0] ?? 0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(
          enabledIndices[enabledIndices.length - 1] ?? tabItems.length - 1
        );
        break;
    }
  };

  const selectedItem = tabItems[selectedIndex];
  const selectedColor = selectedItem?.color
    ? colors[selectedItem.color]
    : 'text-gray-900 dark:text-gray-100';

  const dropdown =
    isOpen &&
    createPortal(
      <div
        ref={dropdownRef}
        id="tablist-mobile-listbox"
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={
          highlightedIndex >= 0
            ? `tablist-mobile-option-${highlightedIndex}`
            : undefined
        }
        style={dropdownStyle}
        className={cn(
          'max-h-52 overflow-auto bg-white p-1.5 shadow-large dark:bg-gray-800',
          mobileVariantDropdown[variant],
          'transition ease-in duration-100',
          isClosing ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
        )}
      >
        {tabItems.map((item, index) => {
          const isSelected = index === selectedIndex;
          const isHighlighted = index === highlightedIndex;
          const isDisabled = item.disabled;
          const itemColor = item.color ? colors[item.color] : '';

          return (
            <button
              key={index}
              id={`tablist-mobile-option-${index}`}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => handleSelect(index)}
              onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
              className={cn(
                'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                variant !== 'pills' && 'rounded-lg',
                variant === 'pills' && 'rounded-full',
                isDisabled && 'opacity-40 cursor-not-allowed',
                !isDisabled &&
                  isSelected &&
                  mobileVariantOption[variant].selected,
                !isDisabled &&
                  isSelected &&
                  !itemColor &&
                  'text-gray-900 dark:text-white',
                !isDisabled && isSelected && itemColor,
                !isDisabled &&
                  !isSelected &&
                  isHighlighted &&
                  mobileVariantOption[variant].highlighted,
                !isDisabled &&
                  !isSelected &&
                  isHighlighted &&
                  !itemColor &&
                  'text-gray-900 dark:text-gray-100',
                !isDisabled && !isSelected && isHighlighted && itemColor,
                !isDisabled &&
                  !isSelected &&
                  !isHighlighted &&
                  !itemColor &&
                  'text-gray-600 dark:text-gray-400',
                !isDisabled && !isSelected && !isHighlighted && itemColor
              )}
            >
              {item.icon && (
                <span className="shrink-0 flex items-center">{item.icon}</span>
              )}
              <span className="flex-1 truncate">{item.label}</span>
              {isSelected && variant !== 'pills' && (
                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>,
      document.body
    );

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="tablist-mobile-listbox"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 sm:py-3.5',
          mobileVariantButton[variant]
        )}
      >
        <span className={cn('flex items-center gap-2', selectedColor)}>
          {selectedItem?.icon && (
            <span className="shrink-0 flex items-center">
              {selectedItem.icon}
            </span>
          )}
          <span className="truncate">
            {selectedItem?.label ?? tabItems[0]?.label}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-auto w-3.5 shrink-0 transition-transform duration-200 text-gray-500 dark:text-gray-400',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {dropdown as React.ReactPortal}
    </div>
  );
}

/* ─── TabItem ───────────────────────────────────────────────── */

export interface TabItemExtendedProps {
  variant?: VariantNames;
  size?: SizeNames;
  color?: ColorNames;
  className?: string;
  disabled?: boolean;
  showMobileIndicator?: boolean;
  icon?: React.ReactNode;
  children?: ReactNode;
  // Injected by TabList – not part of public API
  __index?: number;
  __selected?: boolean;
  __baseId?: string;
  __onSelect?: () => void;
}

export function TabItem({
  children,
  className,
  disabled,
  showMobileIndicator = true,
  variant = 'underline',
  size = 'medium',
  color,
  icon,
  __index = 0,
  __selected = false,
  __baseId = '',
  __onSelect,
}: TabItemExtendedProps) {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs'].indexOf(breakpoint) !== -1;
  const selected = __selected;

  return (
    <button
      role="tab"
      type="button"
      id={`${__baseId}-tab-${__index}`}
      aria-selected={selected}
      aria-controls={`${__baseId}-panel-${__index}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && __onSelect?.()}
      className={cn(
        'relative font-medium tracking-wide transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant].base,
        sizes[size],
        {
          [variants[variant].selected]: selected,
          [variants[variant].unselected]: !selected,
          'text-sm': isMobile,
        },
        color && !selected && colors[color],
        {
          'text-gray-600 dark:text-gray-400': !selected && !color,
          'text-gray-900 dark:text-white': selected && variant === 'underline',
        },
        className
      )}
    >
      <span className="flex items-center justify-center gap-2 whitespace-nowrap">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
      {selected && variant === 'underline' && showMobileIndicator && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
          layoutId="tab-indicator"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

/* ─── TabPanels ─────────────────────────────────────────────── */

export interface TabPanelsProps {
  className?: string;
  children?: ReactNode;
}

export function TabPanels({ children, className }: TabPanelsProps) {
  const { selectedIndex, baseId } = useContext(TabsContext);
  const panels = Children.toArray(children).filter(isValidElement);

  return (
    <div className={cn('mt-4', className)}>
      <LayoutGroup>
        {panels.map((panel, index) =>
          cloneElement(panel as React.ReactElement<TabPanelProps>, {
            __index: index,
            __selected: index === selectedIndex,
            __baseId: baseId,
          })
        )}
      </LayoutGroup>
    </div>
  );
}

/* ─── TabPanel ──────────────────────────────────────────────── */

export interface TabPanelProps {
  className?: string;
  children?: ReactNode;
  // Injected by TabPanels
  __index?: number;
  __selected?: boolean;
  __baseId?: string;
}

export function TabPanel({
  children,
  className,
  __index = 0,
  __selected = false,
  __baseId = '',
}: TabPanelProps) {
  if (!__selected) return null;

  return (
    <div
      role="tabpanel"
      id={`${__baseId}-panel-${__index}`}
      aria-labelledby={`${__baseId}-tab-${__index}`}
      tabIndex={0}
      className={cn(
        'rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        className
      )}
    >
      {children}
    </div>
  );
}
