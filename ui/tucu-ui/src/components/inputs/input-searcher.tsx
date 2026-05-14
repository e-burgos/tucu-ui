import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import Input from './input';
import { SearchIcon, Check, Close } from '../icons';
import { SelectOption } from './select';
import cn from 'classnames';
import {
  type ControlColor,
  controlAccentChipClasses,
  controlAccentTextClasses,
} from './helpers/control-colors';
import { type TextControlSize } from './helpers/control-sizes';

export interface InputSearcherProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'size'
  > {
  label?: string;
  initialValue?: string | number;
  onOptionSelect?: (option: SelectOption | SelectOption[]) => void;
  options?: SelectOption[];
  noMatchesMessage?: string;
  multiple?: boolean;
  variant?: 'ghost' | 'solid' | 'transparent';
  color?: ControlColor;
  size?: TextControlSize;
  disabled?: boolean;
}

export function InputSearcher({
  label,
  onOptionSelect,
  options = [],
  initialValue,
  noMatchesMessage,
  multiple = false,
  variant = 'ghost',
  color,
  size = 'md',
  disabled = false,
  ...props
}: InputSearcherProps) {
  const [value, setValue] = useState<string>(initialValue?.toString() || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousInitialValueRef = useRef<string | number | undefined>(
    initialValue
  );

  // Dropdown position state (for portal)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const accentTextClass = color
    ? controlAccentTextClasses[color]
    : 'text-brand';
  const accentChipClass = color
    ? controlAccentChipClasses[color]
    : 'bg-brand/10 text-brand hover:bg-brand/20';

  // Update value when initialValue changes (only if it actually changed)
  useEffect(() => {
    const newValue = initialValue?.toString() || '';
    const previousValue = previousInitialValueRef.current?.toString() || '';

    if (newValue !== previousValue) {
      previousInitialValueRef.current = initialValue;
      setValue(newValue);

      if (!newValue) {
        setSelectedOption(null);
        setSelectedOptions([]);
      }
    }
  }, [initialValue]);

  // Filter options based on current value
  const filteredOptions = useMemo(() => {
    if (!options || options.length === 0) return [];
    if (!value.trim()) return options;
    const q = value.toLowerCase();
    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q) ||
        option.description?.toLowerCase().includes(q)
    );
  }, [value, options]);

  // Compute dropdown position relative to the input (with drop-up detection)
  const updateDropdownPosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = 260;
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
    setHighlightedIndex(-1);
    setIsClosing(false);
    setShowDropdown(true);
  }, [disabled, updateDropdownPosition]);

  // Close with leave animation
  const closeDropdown = useCallback(() => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setShowDropdown(false);
      setIsClosing(false);
      setHighlightedIndex(-1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Click outside handler
  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown, closeDropdown]);

  // Escape key handler
  useEffect(() => {
    if (!showDropdown) return;

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showDropdown, closeDropdown]);

  // Reposition on scroll / resize while open
  useEffect(() => {
    if (!showDropdown) return;

    const reposition = () => updateDropdownPosition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [showDropdown, updateDropdownPosition]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        const isSelected = selectedOptions.some(
          (opt) => opt.value === option.value
        );
        const newSelectedOptions = isSelected
          ? selectedOptions.filter((opt) => opt.value !== option.value)
          : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        setValue('');
        onOptionSelect?.(newSelectedOptions);
        inputRef.current?.focus();
      } else {
        setSelectedOption(option);
        setValue(option.name);
        closeDropdown();
        onOptionSelect?.(option);
      }
    },
    [multiple, selectedOptions, onOptionSelect, closeDropdown]
  );

  // Handle removing a selected option in multiple mode
  const handleRemoveOption = useCallback(
    (e: React.MouseEvent, optionToRemove: SelectOption) => {
      e.stopPropagation();
      const newSelectedOptions = selectedOptions.filter(
        (opt) => opt.value !== optionToRemove.value
      );
      setSelectedOptions(newSelectedOptions);
      onOptionSelect?.(newSelectedOptions);
      inputRef.current?.focus();
    },
    [selectedOptions, onOptionSelect]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (!multiple && selectedOption && newValue !== selectedOption.name) {
        setSelectedOption(null);
      }

      // Open dropdown when typing
      if (!showDropdown && newValue.trim()) {
        openDropdown();
      }
    },
    [multiple, selectedOption, showDropdown, openDropdown]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          openDropdown();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => {
            let next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
            // Skip disabled options
            while (filteredOptions[next]?.disabled && next !== prev) {
              next = next < filteredOptions.length - 1 ? next + 1 : 0;
            }
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => {
            let next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
            while (filteredOptions[next]?.disabled && next !== prev) {
              next = next > 0 ? next - 1 : filteredOptions.length - 1;
            }
            return next;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (
            highlightedIndex >= 0 &&
            filteredOptions[highlightedIndex] &&
            !filteredOptions[highlightedIndex].disabled
          ) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeDropdown();
          break;
        case 'Tab':
          closeDropdown();
          break;
      }
    },
    [
      showDropdown,
      filteredOptions,
      highlightedIndex,
      handleOptionSelect,
      openDropdown,
      closeDropdown,
    ]
  );

  // Error message when no matches found
  const errorMessage = useMemo(
    () =>
      value.trim().length > 3 &&
      options.length > 0 &&
      filteredOptions.length === 0 &&
      (multiple ? selectedOptions.length === 0 : !selectedOption)
        ? noMatchesMessage || 'No matches found'
        : undefined,
    [
      value,
      options.length,
      filteredOptions.length,
      multiple,
      selectedOptions.length,
      selectedOption,
      noMatchesMessage,
    ]
  );

  // Highlight matching text in option name
  const highlightMatch = useCallback(
    (text: string) => {
      const searchValue = value.trim();
      if (!searchValue) return <span>{text}</span>;

      const lowerText = text.toLowerCase();
      const lowerSearch = searchValue.toLowerCase();
      const parts: Array<{ text: string; isMatch: boolean }> = [];
      let lastIndex = 0;
      let index = lowerText.indexOf(lowerSearch, lastIndex);

      while (index !== -1) {
        if (index > lastIndex) {
          parts.push({
            text: text.substring(lastIndex, index),
            isMatch: false,
          });
        }
        parts.push({
          text: text.substring(index, index + searchValue.length),
          isMatch: true,
        });
        lastIndex = index + searchValue.length;
        index = lowerText.indexOf(lowerSearch, lastIndex);
      }

      if (lastIndex < text.length) {
        parts.push({ text: text.substring(lastIndex), isMatch: false });
      }

      return (
        <span>
          {parts.map((part, idx) =>
            part.isMatch ? (
              <span key={idx} className={cn('font-semibold', accentTextClass)}>
                {part.text}
              </span>
            ) : (
              <span key={idx}>{part.text}</span>
            )
          )}
        </span>
      );
    },
    [value, accentTextClass]
  );

  // Check if option is selected
  const isOptionSelected = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        return selectedOptions.some((opt) => opt.value === option.value);
      }
      return selectedOption?.value === option.value;
    },
    [multiple, selectedOptions, selectedOption]
  );

  // Portal dropdown
  const dropdown =
    showDropdown &&
    filteredOptions.length > 0 &&
    createPortal(
      <div
        data-tucu="select-menu"
        ref={dropdownRef}
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={
          highlightedIndex >= 0
            ? `searcher-option-${highlightedIndex}`
            : undefined
        }
        style={dropdownStyle}
        className={cn(
          'max-h-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-large outline-hidden dark:border-gray-700 dark:bg-gray-800',
          'transition ease-in duration-100',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="max-h-56 overflow-auto grid gap-0.5 p-1 min-[500px]:p-2">
          {filteredOptions.map((option, index) => {
            const isSelected = isOptionSelected(option);
            const isHighlighted = index === highlightedIndex;
            const isDisabled = option.disabled;
            return (
              <div
                data-tucu="select-option"
                data-selected={isSelected ? 'true' : undefined}
                data-highlighted={isHighlighted ? 'true' : undefined}
                key={`${option.value}-${index}`}
                id={`searcher-option-${index}`}
                ref={(el) => {
                  optionsRef.current[index] = el;
                }}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                onClick={() => !isDisabled && handleOptionSelect(option)}
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
                  <span className="block truncate">
                    {highlightMatch(option.name)}
                  </span>
                  {option.description && (
                    <span className="block text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {option.description}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check
                    className={cn('h-4 w-4 shrink-0 ml-2', accentTextClass)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>,
      document.body
    );

  return (
    <div
      data-tucu="input-searcher"
      data-color={color}
      className="relative"
      ref={containerRef}
    >
      <Input
        ref={inputRef}
        label={label}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        icon={<SearchIcon className="h-4 w-4 dark:text-white text-current" />}
        value={value}
        onChange={handleInputChange}
        error={errorMessage}
        onFocus={() => {
          if (filteredOptions.length > 0) {
            openDropdown();
          }
        }}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        {...props}
      />

      {/* Selected chips in multiple mode */}
      {multiple && selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md',
                accentChipClass
              )}
            >
              {option.icon && <span className="shrink-0">{option.icon}</span>}
              {option.name}
              <button
                type="button"
                onClick={(e) => handleRemoveOption(e, option)}
                className="rounded-full p-0.5 transition-opacity hover:opacity-80"
                aria-label={`Remove ${option.name}`}
              >
                <Close className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {dropdown as React.ReactPortal}
    </div>
  );
}

export default InputSearcher;
