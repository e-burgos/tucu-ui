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
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

export type SelectOption = {
  name: string;
  value: string;
  icon?: React.ReactNode;
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
  value?: string;
  name?: string;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  buttonClassName?: string;
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
  value,
  name,
  errorMessage,
  helperText,
  placeholder,
  buttonClassName,
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

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Dropdown position state (for portal)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

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

  // Compute dropdown position relative to the button
  const updateDropdownPosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 4,
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
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
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
          'max-h-[176px] overflow-auto grid gap-[2px] rounded-xl border border-gray-200 bg-white p-[4px] shadow-large outline-hidden dark:border-gray-700 dark:bg-gray-800 xs:p-[8px]',
          'transition ease-in duration-100',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
      >
        {options.map((option, index) => {
          const isSelected = selectedOption?.value === option.value;
          const isHighlighted = index === highlightedIndex;
          return (
            <div
              key={`${option.value}-${index}`}
              id={`select-option-${index}`}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(option)}
              onTouchStart={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                'flex cursor-pointer items-center rounded-md px-[12px] py-[8px] text-sm text-gray-900 transition dark:text-gray-100',
                isSelected && 'bg-gray-200/70 font-medium dark:bg-gray-600/60',
                !isSelected && isHighlighted && 'bg-gray-300 dark:bg-gray-600',
                !isSelected &&
                  !isHighlighted &&
                  'hover:bg-gray-300 dark:hover:bg-gray-600'
              )}
            >
              {option.icon && <span className="mr-[4px]">{option.icon}</span>}
              <span>{option.name}</span>
            </div>
          );
        })}
        {/* any custom / external link or element */}
        {children && children}
      </div>,
      document.body
    );

  return (
    <div className={cn('relative text-sm sm:text-sm', className)}>
      {hiddenInput}
      {label && (
        <span
          className={cn(
            'block font-medium tracking-widest dark:text-gray-100',
            useUppercaseLabel
              ? 'mb-[8px] uppercase sm:mb-[12px]'
              : 'mb-[6px] ml-[6px]'
          )}
        >
          {label}

          {required && (
            <sup className="inline-block text-[13px] text-red-500 ltr:ml-[4px] rtl:mr-[4px]">
              *
            </sup>
          )}
        </span>
      )}
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          'text-case-inherit letter-space-inherit flex h-[40px] w-full items-center justify-between px-[16px] text-sm font-medium outline-hidden duration-200 sm:h-[48px] sm:px-[20px]',
          selectVariantClasses[variant],
          disabled && 'cursor-not-allowed bg-muted/10!',
          buttonClassName
        )}
      >
        <div className={cn('flex items-center', disabled && 'text-gray-500')}>
          {selectedOption?.icon && (
            <span className="mr-[4px]">{selectedOption.icon}</span>
          )}
          {selectedOption?.name || placeholder || 'Select an option'}
        </div>
        <ChevronDown className={cn(disabled && 'text-gray-500')} />
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
