import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';
import { Check, Search, X } from 'lucide-react';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';
import {
  type ControlColor,
  controlAccentTextClasses,
  textControlColorClasses,
} from './helpers/control-colors';
import {
  type TextControlSize,
  textControlSizeClasses,
} from './helpers/control-sizes';

export type SelectOption = {
  name: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
};

export interface SelectTypes {
  options: SelectOption[];
  selectedOption?: SelectOption;
  onChange?:
    | React.Dispatch<React.SetStateAction<SelectOption>>
    | ((value: SelectOption) => void);
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
  variant?: 'ghost' | 'solid' | 'transparent';
  className?: string;
  disabled?: boolean;
  label?: string;
  useUppercaseLabel?: boolean;
  required?: boolean;
  color?: ControlColor;
  value?: string;
  name?: string;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  buttonClassName?: string;
  size?: TextControlSize;
  /** Enable search/filter input inside the dropdown */
  searchable?: boolean;
  /** Placeholder for the search input */
  searchPlaceholder?: string;
  /** Show a check icon next to the selected option */
  showCheck?: boolean;
}

const selectVariantClasses = {
  ghost:
    'transition-shadow rounded-xl border border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:ring-1 hover:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600',
  solid:
    'transition-colors rounded-xl bg-gray-200/70 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
  transparent: '',
};

export function Select({
  options,
  onChange,
  onSelect,
  variant = 'ghost',
  selectedOption: propSelectedOption,
  className,
  children,
  disabled,
  label,
  useUppercaseLabel,
  required,
  color,
  value,
  name,
  errorMessage,
  helperText,
  placeholder,
  buttonClassName,
  size = 'md',
  searchable = false,
  searchPlaceholder = 'Search...',
  showCheck = false,
}: SelectTypes) {
  // Resolve the option corresponding to a string `value` (e.g. from react-hook-form)
  const resolveOption = useCallback(
    (val: string | undefined): SelectOption | undefined =>
      val !== undefined ? options.find((opt) => opt.value === val) : undefined,
    [options]
  );

  // State to handle the selected option — initialise immediately so the
  // component is always "controlled" from the first render (avoids the
  // React "uncontrolled to controlled" warning).
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    SelectOption | undefined
  >(propSelectedOption ?? resolveOption(value));

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isClosing, setIsClosing] = useState(false);
  const [search, setSearch] = useState('');

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // Dropdown position state (for portal)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const accentTextClass = color
    ? controlAccentTextClasses[color]
    : 'text-brand';

  // Keep internal state in sync when `value` changes externally
  useEffect(() => {
    if (value !== undefined) {
      const option = resolveOption(value);
      if (option) {
        setInternalSelectedOption(option);
      }
    }
  }, [value, resolveOption]);

  // Use either the prop selectedOption or the internal state
  const selectedOption = propSelectedOption || internalSelectedOption;

  // Calculate which index is currently selected
  const selectedIndex = useMemo(
    () =>
      selectedOption
        ? options.findIndex((o) => o.value === selectedOption.value)
        : -1,
    [options, selectedOption]
  );

  // Compute dropdown position relative to the button (with drop-up detection)
  const updateDropdownPosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 220; // approximate max-h + search bar
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

  // Open the dropdown
  const openDropdown = useCallback(() => {
    if (disabled) return;
    updateDropdownPosition();
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsClosing(false);
    setSearch('');
    setIsOpen(true);
  }, [disabled, selectedIndex, updateDropdownPosition]);

  // Close with leave animation
  const closeDropdown = useCallback(() => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setHighlightedIndex(-1);
    }, 100); // matches leave transition duration
    return () => clearTimeout(timer);
  }, []);

  // Toggle open/close
  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [isOpen, openDropdown, closeDropdown]);

  // Handle selecting an option
  const handleSelect = useCallback(
    (option: SelectOption) => {
      setInternalSelectedOption(option);

      if (onChange && typeof onChange === 'function') {
        onChange(option);
      }

      if (onSelect) {
        onSelect(option.value);
      }

      closeDropdown();
      // Return focus to the trigger button
      buttonRef.current?.focus();
    },
    [onChange, onSelect, closeDropdown]
  );

  // Click outside handler
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  // Escape key handler
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

  // Reposition on scroll / resize while open
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

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
    if (!isOpen) setSearch('');
  }, [isOpen, searchable]);

  // Filtered options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);

  // Unified keyboard navigation — focus stays on the button at all times
  const handleButtonKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      // Open the dropdown on arrow / enter / space
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

    // Dropdown is open — navigate / select / close
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          filteredOptions[highlightedIndex] &&
          !filteredOptions[highlightedIndex].disabled
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        closeDropdown();
        break;
    }
  };

  // Hidden input for form compatibility
  const hiddenInput = name ? (
    <input type="hidden" name={name} value={selectedOption?.value ?? ''} />
  ) : null;

  // Dropdown portal content
  const dropdown =
    isOpen &&
    createPortal(
      <div
        data-tucu="select-menu"
        ref={dropdownRef}
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={
          highlightedIndex >= 0
            ? `select-option-${highlightedIndex}`
            : undefined
        }
        style={dropdownStyle}
        className={cn(
          'max-h-55 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-large outline-hidden dark:border-gray-700 dark:bg-gray-800',
          'transition ease-in duration-100',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
      >
        {/* Search input */}
        {searchable && (
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
            <input
              data-tucu="select-search"
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Escape') {
                  if (search) {
                    setSearch('');
                  } else {
                    closeDropdown();
                    buttonRef.current?.focus();
                  }
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                  );
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                  );
                }
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (
                    highlightedIndex >= 0 &&
                    filteredOptions[highlightedIndex] &&
                    !filteredOptions[highlightedIndex].disabled
                  ) {
                    handleSelect(filteredOptions[highlightedIndex]);
                  }
                }
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="shrink-0 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
        {/* Options list */}
        <div className="max-h-44 overflow-auto grid gap-0.5 p-1 min-[500px]:p-2">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              No results
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = selectedOption?.value === option.value;
              const isHighlighted = index === highlightedIndex;
              const isDisabled = option.disabled;
              return (
                <div
                  data-tucu="select-option"
                  data-selected={isSelected ? 'true' : undefined}
                  data-highlighted={isHighlighted ? 'true' : undefined}
                  key={`${option.value}-${index}`}
                  id={`select-option-${index}`}
                  ref={(el) => {
                    optionsRef.current[index] = el;
                  }}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  onClick={() => !isDisabled && handleSelect(option)}
                  onTouchStart={() => !isDisabled && handleSelect(option)}
                  onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 text-sm transition',
                    isDisabled
                      ? 'cursor-not-allowed opacity-50 text-gray-400 dark:text-gray-600'
                      : 'cursor-pointer text-gray-900 dark:text-gray-100',
                    !isDisabled &&
                      isSelected &&
                      'bg-gray-200/70 font-medium dark:bg-gray-600/60',
                    !isDisabled &&
                      !isSelected &&
                      isHighlighted &&
                      'bg-gray-300 dark:bg-gray-600',
                    !isDisabled &&
                      !isSelected &&
                      !isHighlighted &&
                      'hover:bg-gray-300 dark:hover:bg-gray-600'
                  )}
                >
                  {option.icon && (
                    <span className="mr-2 shrink-0">{option.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{option.name}</span>
                    {option.description && (
                      <span className="block text-[11px] text-gray-500 dark:text-gray-400 truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {showCheck && isSelected && (
                    <Check
                      className={cn('h-4 w-4 shrink-0 ml-2', accentTextClass)}
                    />
                  )}
                </div>
              );
            })
          )}
          {/* any custom / external link or element */}
          {children && children}
        </div>
      </div>,
      document.body
    );

  return (
    <div
      data-tucu="select"
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={cn('relative text-sm sm:text-sm', className)}
    >
      {hiddenInput}
      {label && (
        <span
          className={cn(
            'block font-medium tracking-widest dark:text-gray-100',
            useUppercaseLabel ? 'mb-2 uppercase sm:mb-3' : 'mb-1.5 ml-1.5'
          )}
        >
          {label}

          {required && (
            <sup className="inline-block text-[13px] text-red-500 ltr:ml-1 rtl:mr-1">
              *
            </sup>
          )}
        </span>
      )}
      <button
        data-tucu="select-trigger"
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-listbox"
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          'text-case-inherit letter-space-inherit flex w-full items-center justify-between font-medium outline-hidden duration-200',
          textControlSizeClasses.select[size],
          selectVariantClasses[variant],
          color && textControlColorClasses[variant][color],
          disabled && 'cursor-not-allowed bg-muted/10!',
          buttonClassName
        )}
      >
        <div className={cn('flex items-center', disabled && 'text-gray-500')}>
          {selectedOption?.icon && (
            <span className="mr-1">{selectedOption.icon}</span>
          )}
          {selectedOption?.name || placeholder || 'Select an option'}
        </div>
        <ChevronDown
          className={cn(
            'transition-transform duration-200',
            disabled && 'text-gray-500',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {dropdown as React.ReactPortal}
      {errorMessage && <FieldError error={errorMessage} size="md" />}
      {!errorMessage && helperText && (
        <FieldHelperText size="md">{helperText}</FieldHelperText>
      )}
    </div>
  );
}

export default Select;
