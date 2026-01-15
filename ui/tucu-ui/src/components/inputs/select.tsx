import { Fragment, useEffect, useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
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
  // State to handle the selected option
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    SelectOption | undefined
  >(propSelectedOption);

  // Effect to handle the case when a string value is passed (from react-hook-form)
  useEffect(() => {
    if (value !== undefined) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        setTimeout(() => {
          setInternalSelectedOption(option);
        }, 100);
      }
    }
  }, [value, options]);

  // Use either the prop selectedOption or the internal state
  const selectedOption = propSelectedOption || internalSelectedOption;

  // Handle change for both react-hook-form and regular use
  const handleChange = (option: SelectOption) => {
    setInternalSelectedOption(option);

    if (onChange) {
      // Handle both types of onChange functions
      if (typeof onChange === 'function') {
        onChange(option);
      }
    }

    if (onSelect) {
      onSelect(option.value);
    }
  };

  return (
    <div className={cn('relative text-sm sm:text-sm', className)}>
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
      <Listbox
        name={name}
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
      >
        <ListboxButton
          className={cn(
            'text-case-inherit letter-space-inherit flex h-[40px] w-full items-center justify-between px-[16px] text-sm font-medium outline-hidden duration-200 sm:h-[48px] sm:px-[20px] ',
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
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute max-h-[176px] overflow-auto left-0 z-10 mt-[4px] grid w-full origin-top-right gap-[2px] rounded-xl border border-gray-200 bg-white p-[4px] shadow-large outline-hidden dark:border-gray-700 dark:bg-gray-800 xs:p-[8px]">
            {options.map((option, index) => (
              <ListboxOption key={`${option.value}-${index}`} value={option}>
                {({ selected }) => (
                  <div
                    onClick={() => onSelect && onSelect(option.value)}
                    className={`flex cursor-pointer items-center rounded-md px-[12px] py-[8px] text-sm text-gray-900 transition dark:text-gray-100  ${
                      selected
                        ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.icon && (
                      <span className="mr-[4px]">{option.icon}</span>
                    )}
                    <span>{option.name}</span>
                  </div>
                )}
              </ListboxOption>
            ))}
            {/* any custom / external link or element */}
            {children && children}
          </ListboxOptions>
        </Transition>
      </Listbox>
      {errorMessage && <FieldError error={errorMessage} size="md" />}
      {!errorMessage && helperText && (
        <FieldHelperText size="md">{helperText}</FieldHelperText>
      )}
    </div>
  );
}

export default Select;
