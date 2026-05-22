import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';

export interface TabSelectMenuItem {
  title: React.ReactNode;
  path: string;
}

export const TabSelect = forwardRef(
  (
    {
      tabMenu,
      selectedTabIndex,
      onChange,
    }: {
      tabMenu: TabSelectMenuItem[];
      selectedTabIndex: number;
      onChange: (index: number) => void;
    },
    ref: React.Ref<HTMLElement | null>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => containerRef.current!);

    // Compute dropdown position relative to the button (with drop-up detection)
    const updateDropdownPosition = useCallback(() => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 200;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const shouldDropUp =
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
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

    // Open
    const openDropdown = useCallback(() => {
      updateDropdownPosition();
      setHighlightedIndex(selectedTabIndex);
      setIsClosing(false);
      setIsOpen(true);
    }, [selectedTabIndex, updateDropdownPosition]);

    // Close with animation
    const closeDropdown = useCallback(() => {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        setHighlightedIndex(-1);
      }, 100);
      return () => clearTimeout(timer);
    }, []);

    // Toggle
    const toggleDropdown = useCallback(() => {
      if (isOpen) closeDropdown();
      else openDropdown();
    }, [isOpen, openDropdown, closeDropdown]);

    // Handle selecting
    const handleSelect = useCallback(
      (index: number) => {
        onChange(index);
        closeDropdown();
        buttonRef.current?.focus();
      },
      [onChange, closeDropdown]
    );

    // Click outside
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          closeDropdown();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeDropdown]);

    // Escape key
    useEffect(() => {
      if (!isOpen) return;
      const handleEscape = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeDropdown();
          buttonRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeDropdown]);

    // Reposition on scroll/resize
    useEffect(() => {
      if (!isOpen) return;
      const reposition = () => updateDropdownPosition();
      window.addEventListener('scroll', reposition, true);
      window.addEventListener('resize', reposition);
      return () => {
        window.removeEventListener('scroll', reposition, true);
        window.removeEventListener('resize', reposition);
      };
    }, [isOpen, updateDropdownPosition]);

    // Scroll highlighted into view
    useEffect(() => {
      if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
        optionsRef.current[highlightedIndex]?.scrollIntoView({
          block: 'nearest',
        });
      }
    }, [highlightedIndex]);

    // Keyboard navigation on button
    const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (!isOpen) {
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowUp':
          case 'Enter':
          case ' ':
            e.preventDefault();
            openDropdown();
            break;
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < tabMenu.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : tabMenu.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (highlightedIndex >= 0) {
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
          setHighlightedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setHighlightedIndex(tabMenu.length - 1);
          break;
      }
    };

    // Dropdown portal
    const dropdown =
      isOpen &&
      createPortal(
        <div
          ref={dropdownRef}
          id="tab-select-listbox"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `tab-select-option-${highlightedIndex}`
              : undefined
          }
          style={dropdownStyle}
          className={cn(
            'max-h-52 overflow-auto rounded-xl border border-border bg-white p-1.5 shadow-large dark:bg-gray-800',
            'transition ease-in duration-100',
            isClosing ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
          )}
        >
          {tabMenu.map((item, index) => {
            const isSelected = index === selectedTabIndex;
            const isHighlighted = index === highlightedIndex;
            return (
              <button
                key={`${item.path}-${index}`}
                id={`tab-select-option-${index}`}
                ref={(el) => {
                  optionsRef.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'w-full cursor-pointer rounded-lg px-4 py-2.5 text-left text-sm transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  isSelected &&
                    'bg-gray-100 dark:bg-gray-700 font-medium text-gray-900 dark:text-white',
                  !isSelected &&
                    isHighlighted &&
                    'bg-gray-200/70 dark:bg-gray-600/60 text-gray-900 dark:text-gray-100',
                  !isSelected &&
                    !isHighlighted &&
                    'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>,
        document.body
      );

    return (
      <div ref={containerRef}>
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="tab-select-listbox"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between rounded-lg border-2 border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:px-5 sm:py-3.5"
        >
          <span className="text-gray-900 dark:text-gray-100">
            {tabMenu[selectedTabIndex]?.title ?? tabMenu[0]?.title}
          </span>
          <ChevronDown
            className={cn(
              'h-auto w-3.5 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {dropdown as React.ReactPortal}
      </div>
    );
  }
);

TabSelect.displayName = 'TabSelect';

export default TabSelect;
