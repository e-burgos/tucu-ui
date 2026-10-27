'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useId,
  Fragment,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../libs/cn';
import { ChevronDown } from '../icons/chevron-down';
import { Check, Search, X } from 'lucide-react';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
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
  group?: string;
};

export type SelectSize = 'xs' | TextControlSize;

type SelectDomAttributes = {
  [key: `aria-${string}`]: string | number | boolean | undefined;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export interface SelectTypes extends SelectDomAttributes {
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
  size?: SelectSize;
  /** Extra classes for the dropdown listbox container */
  listboxClassName?: string;
  /** Enable search/filter input inside the dropdown */
  searchable?: boolean;
  /** Placeholder for the search input */
  searchPlaceholder?: string;
  /** Show a check icon next to the selected option */
  showCheck?: boolean;
  /** Render a real `<select>` with `<option>` elements instead of the custom listbox. Extra `<option>` children are rendered after `options`. */
  native?: boolean;
  /** Id of the underlying form element (generated when omitted) */
  id?: string;
}

const selectSizeClasses: Record<SelectSize, string> = {
  xs: 'h-7 px-2 text-xs',
  sm: textControlSizeClasses.select.sm,
  md: textControlSizeClasses.select.md,
  lg: textControlSizeClasses.select.lg,
};

const listboxItemSizeClasses: Record<SelectSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-3 py-2.5 text-base',
};

const listboxPaddingClasses: Record<SelectSize, string> = {
  xs: 'p-1',
  sm: 'p-1',
  md: 'p-1 min-[500px]:p-2',
  lg: 'p-1 min-[500px]:p-2',
};

const listboxGroupHeaderClasses: Record<SelectSize, string> = {
  xs: 'px-2 pt-1.5 pb-0.5 text-[10px]',
  sm: 'px-3 pt-2 pb-1 text-xs',
  md: 'px-3 pt-2 pb-1 text-xs',
  lg: 'px-3 pt-2.5 pb-1 text-sm',
};

type OptionEntry = { option: SelectOption; index: number };
type OptionSegment = { group?: string; entries: OptionEntry[] };

function segmentOptionsByGroup(items: SelectOption[]): OptionSegment[] {
  const segments: OptionSegment[] = [];
  items.forEach((option, index) => {
    const last = segments[segments.length - 1];
    if (last && last.group === option.group) {
      last.entries.push({ option, index });
    } else {
      segments.push({ group: option.group, entries: [{ option, index }] });
    }
  });
  return segments;
}

const selectVariantClasses = {
  ghost:
    'transition-shadow rounded-xl border border-border bg-white text-gray-900 hover:border-border hover:ring-1 hover:ring-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600',
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
  searchPlaceholder,
  listboxClassName,
  showCheck = false,
  native = false,
  id,
  'aria-describedby': externalDescribedBy,
  'aria-labelledby': externalLabelledBy,
  ...domAttributes
}: SelectTypes) {
  const t = useTucuMessages().select;
  const uid = useId();
  const controlId = id ?? `${uid}-control`;
  const labelId = `${uid}-label`;
  const listboxId = `${uid}-listbox`;
  const messageId = `${uid}-message`;
  const describedBy =
    [externalDescribedBy, errorMessage || helperText ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;
  const labelledBy =
    [externalLabelledBy, label ? labelId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;
  const optionId = (index: number) => `${uid}-option-${index}`;
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

  const selectedOptionRef = useRef(selectedOption);
  selectedOptionRef.current = selectedOption;

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
      const isReselection = option.value === selectedOptionRef.current?.value;
      setInternalSelectedOption(option);

      if (!isReselection && onChange && typeof onChange === 'function') {
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

  const handleNativeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value;
    const matchingOption =
      options.find((option) => option.value === nextValue) ?? {
        name: event.target.selectedOptions[0]?.text ?? nextValue,
        value: nextValue,
      };
    const isReselection = nextValue === selectedOption?.value;
    setInternalSelectedOption(matchingOption);
    if (!isReselection && onChange && typeof onChange === 'function') {
      onChange(matchingOption);
    }
    onSelect?.(nextValue);
  };

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

  const groupedSegments = useMemo(
    () => segmentOptionsByGroup(filteredOptions),
    [filteredOptions]
  );

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
        id={listboxId}
        tabIndex={-1}
        aria-labelledby={label ? labelId : undefined}
        aria-activedescendant={
          highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined
        }
        style={dropdownStyle}
        className={cn(
          'max-h-55 overflow-hidden rounded-xl border border-border bg-light-dark text-foreground shadow-large outline-hidden',
          'transition ease-in duration-100',
          isClosing ? 'opacity-0' : 'opacity-100',
          listboxClassName
        )}
      >
        {/* Search input */}
        {searchable && (
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
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
              placeholder={searchPlaceholder ?? t.search}
              aria-label={searchPlaceholder ?? t.search}
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
                aria-label={t.clearSearch}
                className="shrink-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
        {/* Options list */}
        <div className={cn(
            'max-h-44 overflow-auto grid gap-0.5',
            listboxPaddingClasses[size]
          )}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              {t.noResults}
            </div>
          ) : (
            groupedSegments.map((segment, segmentIndex) => {
              const headerId = `${uid}-group-${segmentIndex}`;
              const renderedOptions = segment.entries.map(
                ({ option, index }) => {
                  const isSelected = selectedOption?.value === option.value;
                  const isHighlighted = index === highlightedIndex;
                  const isDisabled = option.disabled;
                  return (
                    <div
                      data-tucu="select-option"
                      data-selected={isSelected ? 'true' : undefined}
                      data-highlighted={isHighlighted ? 'true' : undefined}
                      key={`${option.value}-${index}`}
                      id={optionId(index)}
                      ref={(el) => {
                        optionsRef.current[index] = el;
                      }}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      onClick={() => !isDisabled && handleSelect(option)}
                      onMouseEnter={() =>
                        !isDisabled && setHighlightedIndex(index)
                      }
                      className={cn(
                        'flex items-center rounded-md transition',
                        listboxItemSizeClasses[size],
                        isDisabled
                          ? 'cursor-not-allowed opacity-50 text-muted'
                          : 'cursor-pointer text-foreground',
                        !isDisabled &&
                          isSelected &&
                          'bg-foreground/10 font-medium',
                        !isDisabled &&
                          !isSelected &&
                          isHighlighted &&
                          'bg-foreground/15',
                        !isDisabled &&
                          !isSelected &&
                          !isHighlighted &&
                          'hover:bg-foreground/15'
                      )}
                    >
                      {option.icon && (
                        <span className="mr-2 shrink-0">{option.icon}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{option.name}</span>
                        {option.description && (
                          <span className="block text-[11px] text-muted truncate">
                            {option.description}
                          </span>
                        )}
                      </div>
                      {showCheck && isSelected && (
                        <Check
                          className={cn(
                            'h-4 w-4 shrink-0 ml-2',
                            accentTextClass
                          )}
                        />
                      )}
                    </div>
                  );
                }
              );
              if (segment.group === undefined) {
                return (
                  <Fragment key={`segment-${segmentIndex}`}>
                    {renderedOptions}
                  </Fragment>
                );
              }
              return (
                <div
                  key={`segment-${segmentIndex}`}
                  data-tucu="select-group"
                  role="group"
                  aria-labelledby={headerId}
                  className="grid gap-0.5"
                >
                  <div
                    id={headerId}
                    data-tucu="select-group-label"
                    className={cn(
                      'font-semibold uppercase tracking-wide text-muted select-none',
                      listboxGroupHeaderClasses[size]
                    )}
                  >
                    {segment.group}
                  </div>
                  {renderedOptions}
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

  const messageBlock = (
    <>
      {errorMessage && (
        <FieldError id={messageId} error={errorMessage} size="md" />
      )}
      {!errorMessage && helperText && (
        <FieldHelperText id={messageId} size="md">
          {helperText}
        </FieldHelperText>
      )}
    </>
  );

  const labelContent = (
    <>
      {label}
      {required && (
        <sup className="inline-block text-[13px] text-red-600 dark:text-red-400 ltr:ml-1 rtl:mr-1">
          *
        </sup>
      )}
    </>
  );

  const labelClasses = cn(
    'block font-medium tracking-widest text-gray-800 dark:text-gray-100',
    useUppercaseLabel ? 'mb-2 uppercase sm:mb-3' : 'mb-1.5 ml-1.5'
  );

  const nativeSegments = segmentOptionsByGroup(options);

  if (native) {
    return (
      <div
        data-tucu="select"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-native="true"
        className={cn('relative text-sm sm:text-sm', className)}
      >
        {label && (
          <label htmlFor={controlId} className={labelClasses}>
            {labelContent}
          </label>
        )}
        <div className="relative">
          <select
            {...domAttributes}
            data-tucu="select-native"
            id={controlId}
            name={name}
            required={required}
            disabled={disabled}
            value={selectedOption?.value ?? ''}
            onChange={handleNativeChange}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              'tucu-text-case-inherit tucu-letter-space-inherit block w-full appearance-none font-medium outline-hidden duration-200 focus:border-brand focus-visible:outline-2 focus-visible:outline-brand aria-invalid:border-red-500 dark:aria-invalid:border-red-400 ltr:pr-10 rtl:pl-10',
              selectSizeClasses[size],
              selectVariantClasses[variant],
              color && textControlColorClasses[variant][color],
              disabled && 'cursor-not-allowed bg-muted/10!',
              buttonClassName
            )}
          >
            {!selectedOption && (
              <option value="" disabled>
                {placeholder || t.placeholder}
              </option>
            )}
            {nativeSegments.map((segment, segmentIndex) => {
              const nativeOptions = segment.entries.map(({ option }) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.name}
                </option>
              ));
              return segment.group === undefined ? (
                <Fragment key={`segment-${segmentIndex}`}>
                  {nativeOptions}
                </Fragment>
              ) : (
                <optgroup key={`segment-${segmentIndex}`} label={segment.group}>
                  {nativeOptions}
                </optgroup>
              );
            })}
            {children}
          </select>
          <ChevronDown
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3',
              disabled && 'text-gray-500'
            )}
          />
        </div>
        {messageBlock}
      </div>
    );
  }

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
          id={labelId}
          className={cn(
            'block font-medium tracking-widest text-gray-800 dark:text-gray-100',
            useUppercaseLabel ? 'mb-2 uppercase sm:mb-3' : 'mb-1.5 ml-1.5'
          )}
        >
          {label}

          {required && (
            <sup className="inline-block text-[13px] text-red-600 dark:text-red-400 ltr:ml-1 rtl:mr-1">
              *
            </sup>
          )}
        </span>
      )}
      <button
        {...domAttributes}
        data-tucu="select-trigger"
        id={controlId}
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelledBy}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        className={cn(
          'tucu-text-case-inherit tucu-letter-space-inherit flex w-full items-center justify-between gap-2 font-medium outline-hidden duration-200',
          selectSizeClasses[size],
          selectVariantClasses[variant],
          color && textControlColorClasses[variant][color],
          disabled && 'cursor-not-allowed bg-muted/10!',
          buttonClassName
        )}
      >
        <div
          className={cn(
            'flex min-w-0 items-center',
            disabled && 'text-gray-500'
          )}
        >
          {selectedOption?.icon && (
            <span className="mr-1 shrink-0">{selectedOption.icon}</span>
          )}
          <span className="min-w-0 truncate">
            {selectedOption?.name || placeholder || t.placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'shrink-0 transition-transform duration-200',
            disabled && 'text-gray-500',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {dropdown as React.ReactPortal}
      {errorMessage && (
        <FieldError id={messageId} error={errorMessage} size="md" />
      )}
      {!errorMessage && helperText && (
        <FieldHelperText id={messageId} size="md">
          {helperText}
        </FieldHelperText>
      )}
    </div>
  );
}

export default Select;
