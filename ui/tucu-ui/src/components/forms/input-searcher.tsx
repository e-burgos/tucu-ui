import React, { useState, useRef, useEffect } from 'react';
import Input from './input';
import { Search, CheckCircle, X } from 'lucide-react';
import { Transition } from '@headlessui/react';
import cn from 'classnames';
import { InputSelectOption } from './input-select';

export function InputSearcher({
  label,
  onOptionSelect,
  options = [],
  initialValue,
  noMatchesMessage,
  multiple = false,
  ...props
}: {
  label?: string;
  initialValue?: string | number;
  onOptionSelect?: (option: InputSelectOption | InputSelectOption[]) => void;
  options?: InputSelectOption[];
  noMatchesMessage?: string;
  multiple?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const [value, setValue] = useState<string>(initialValue?.toString() || '');
  const [filteredOptions, setFilteredOptions] = useState<InputSelectOption[]>(
    []
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<InputSelectOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<InputSelectOption[]>(
    []
  );
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
      setValue(newValue);

      // If no value, clear selected option(s)
      if (!newValue) {
        setSelectedOption(null);
        setSelectedOptions([]);
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
      setFilteredOptions(filtered);

      // Show/hide dropdown based on matches and character count
      if (value.trim().length > 3) {
        if (filtered.length === 0) {
          // Hide dropdown if no matches found
          setShowDropdown(false);
        } else {
          // Show dropdown if there are matches
          setShowDropdown(true);
        }
      }
    } else {
      setFilteredOptions([]);
      setShowDropdown(false);
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
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
  const handleOptionSelect = (option: InputSelectOption) => {
    if (multiple) {
      // Toggle selection in multiple mode
      const isSelected = selectedOptions.some(
        (opt) => opt.value === option.value
      );
      let newSelectedOptions: InputSelectOption[];

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
    optionToRemove: InputSelectOption
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
  const isOptionSelected = (option: InputSelectOption) => {
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
          icon={<Search className="h-4 w-4 dark:text-white text-current" />}
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
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-brand/10 text-brand rounded-md"
            >
              {option.name}
              <button
                type="button"
                onClick={(e) => handleRemoveOption(e, option)}
                className="hover:bg-brand/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${option.name}`}
              >
                <X className="h-3 w-3" />
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
          <div className="absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="grid">
              {filteredOptions.map((option, index) => (
                <button
                  key={`${option.value}-${index}`}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
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
                    <CheckCircle className="h-4 w-4 text-brand" />
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
