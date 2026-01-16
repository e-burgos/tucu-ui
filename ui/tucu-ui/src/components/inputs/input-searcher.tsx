import React, { useState, useRef, useEffect } from 'react';
import Input from './input';
import { SearchIcon, Check, Close } from '../icons';
import { Transition } from '@headlessui/react';
import { SelectOption } from './select';
import cn from 'classnames';

export function InputSearcher({
  label,
  onOptionSelect,
  options = [],
  initialValue,
  noMatchesMessage,
  multiple = false,
  variant = 'ghost',
  disabled = false,
  ...props
}: {
  label?: string;
  initialValue?: string | number;
  onOptionSelect?: (option: SelectOption | SelectOption[]) => void;
  options?: SelectOption[];
  noMatchesMessage?: string;
  multiple?: boolean;
  variant?: 'ghost' | 'solid' | 'transparent';
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const [value, setValue] = useState<string>(initialValue?.toString() || '');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousInitialValueRef = useRef<string | number | undefined>(
    initialValue
  );

  // Update value when initialValue changes (only if it actually changed)
  useEffect(() => {
    const newValue = initialValue?.toString() || '';
    const previousValue = previousInitialValueRef.current?.toString() || '';

    // Only update if initialValue actually changed
    if (newValue !== previousValue) {
      previousInitialValueRef.current = initialValue;
      setTimeout(() => {
        setValue(newValue);
      }, 100);

      // If no value, clear selected option(s)
      if (!newValue) {
        setTimeout(() => {
          setSelectedOption(null);
        }, 100);
        setTimeout(() => {
          setSelectedOptions([]);
        }, 100);
      }
    }
  }, [initialValue]);

  // Filter options based on current value
  useEffect(() => {
    if (options?.length > 0) {
      // Show all options initially, or filter if there's text to search
      const filtered = value.trim()
        ? options.filter((option) =>
            option.name.toLowerCase().includes(value.toLowerCase())
          )
        : options;
      if (filtered.length > 0) {
        setTimeout(() => {
          setFilteredOptions(filtered);
        }, 100);

        // Show/hide dropdown based on matches and character count
        if (value.trim().length > 3) {
          if (filtered.length === 0) {
            // Hide dropdown if no matches found
            setTimeout(() => {
              setShowDropdown(false);
            }, 100);
          } else {
            // Show dropdown if there are matches
            setTimeout(() => {
              setShowDropdown(true);
            }, 100);
          }
        }
      } else {
        setTimeout(() => {
          setFilteredOptions([]);
        }, 100);
        setTimeout(() => {
          setShowDropdown(false);
        }, 100);
      }
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setShowDropdown(false);
        }, 100);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Handle option selection
  const handleOptionSelect = (option: SelectOption) => {
    if (multiple) {
      // Toggle selection in multiple mode
      const isSelected = selectedOptions.some(
        (opt) => opt.value === option.value
      );
      let newSelectedOptions: SelectOption[];

      if (isSelected) {
        // Remove option if already selected
        newSelectedOptions = selectedOptions.filter(
          (opt) => opt.value !== option.value
        );
      } else {
        // Add option if not selected
        newSelectedOptions = [...selectedOptions, option];
      }

      setSelectedOptions(newSelectedOptions);
      setValue(''); // Clear input value in multiple mode
      onOptionSelect?.(newSelectedOptions);
    } else {
      // Single selection mode
      setSelectedOption(option);
      setValue(option.name);
      setShowDropdown(false);
      onOptionSelect?.(option);
    }
  };

  // Handle removing a selected option in multiple mode
  const handleRemoveOption = (
    e: React.MouseEvent,
    optionToRemove: SelectOption
  ) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter(
      (opt) => opt.value !== optionToRemove.value
    );
    setSelectedOptions(newSelectedOptions);
    onOptionSelect?.(newSelectedOptions);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // If user is typing and there's a selected option (single mode), clear it
    if (!multiple && selectedOption && newValue !== selectedOption.name) {
      setSelectedOption(null);
    }
  };

  // Calculate error message when no matches found (only if more than 3 characters typed)
  const errorMessage =
    value.trim().length > 3 &&
    options.length > 0 &&
    filteredOptions.length === 0 &&
    (multiple ? selectedOptions.length === 0 : !selectedOption)
      ? noMatchesMessage || 'Not found matches'
      : undefined;

  // Highlight matching text in option name
  const highlightMatch = (text: string, searchValue: string) => {
    if (!searchValue.trim()) {
      return <span>{text}</span>;
    }

    const lowerText = text.toLowerCase();
    const lowerSearch = searchValue.toLowerCase();
    const parts: Array<{ text: string; isMatch: boolean }> = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerSearch, lastIndex);

    while (index !== -1) {
      // Add non-matching part before the match
      if (index > lastIndex) {
        parts.push({
          text: text.substring(lastIndex, index),
          isMatch: false,
        });
      }

      // Add matching part
      parts.push({
        text: text.substring(index, index + searchValue.length),
        isMatch: true,
      });

      lastIndex = index + searchValue.length;
      index = lowerText.indexOf(lowerSearch, lastIndex);
    }

    // Add remaining non-matching part
    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isMatch: false,
      });
    }

    return (
      <span>
        {parts.map((part, idx) =>
          part.isMatch ? (
            <span key={idx} className="font-semibold text-brand">
              {part.text}
            </span>
          ) : (
            <span key={idx}>{part.text}</span>
          )
        )}
      </span>
    );
  };

  // Check if option is selected (for both single and multiple modes)
  const isOptionSelected = (option: SelectOption) => {
    if (multiple) {
      return selectedOptions.some((opt) => opt.value === option.value);
    }
    return selectedOption?.value === option.value;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          label={label}
          variant={variant}
          disabled={disabled}
          icon={<SearchIcon className="h-4 w-4 dark:text-white text-current" />}
          value={value}
          onChange={handleInputChange}
          error={errorMessage}
          onFocus={() => {
            // Show dropdown if there are filtered options available
            if (filteredOptions.length > 0) {
              setShowDropdown(true);
            }
          }}
          {...props}
        />
      </div>

      {/* Selected chips in multiple mode - displayed below input */}
      {multiple && selectedOptions.length > 0 && (
        <div className="mt-[8px] flex flex-wrap items-center gap-[8px]">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-[4px] px-[8px] py-[2px] text-xs font-medium bg-brand/10 text-brand rounded-md"
            >
              {option.name}
              <button
                type="button"
                onClick={(e) => handleRemoveOption(e, option)}
                onTouchStart={(e) =>
                  handleRemoveOption(e as unknown as React.MouseEvent, option)
                }
                className="hover:bg-brand/20 rounded-full p-[2px] transition-colors"
                aria-label={`Remove ${option.name}`}
              >
                <Close className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown with filtered options */}
      {filteredOptions.length > 0 && (
        <Transition
          show={showDropdown}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute top-full left-0 z-50 mt-[4px] w-full max-h-[240px] overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="grid">
              {filteredOptions.map((option, index) => (
                <button
                  key={`${option.value}-${index}`}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  onTouchStart={() => handleOptionSelect(option)}
                  className={cn(
                    'w-full px-[16px] py-[8px] text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                    'flex items-center justify-between',
                    isOptionSelected(option) &&
                      'bg-brand/10 text-brand font-semibold',
                    options.length > 1 &&
                      index !== filteredOptions.length - 1 &&
                      isOptionSelected(option) &&
                      'border-b border-white dark:border-gray-800'
                  )}
                >
                  <span>{highlightMatch(option.name, value.trim())}</span>
                  {isOptionSelected(option) && (
                    <Check className="h-4 w-4 text-brand" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
}

export default InputSearcher;
