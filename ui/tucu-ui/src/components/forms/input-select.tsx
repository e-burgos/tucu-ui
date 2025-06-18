import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import cn from 'classnames';
import { Transition } from '../headlessui/transition';
import { ChevronDown } from '../icons/chevron-down';

export type InputSelectOption = {
  name: string;
  value: string;
};

export interface InputSelectTypes {
  options: InputSelectOption[];
  selectedOption?: InputSelectOption;
  onChange?: React.Dispatch<React.SetStateAction<InputSelectOption>>;
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
  variant?: 'ghost' | 'solid' | 'transparent';
  className?: string;
  disabled?: boolean;
  label?: string;
  useUppercaseLabel?: boolean;
  required?: boolean;
}

const inputSelectVariantClasses = {
  ghost:
    'transition-shadow border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600',
  solid:
    'transition-colors bg-gray-100 hover:bg-gray-200/70 dark:bg-gray-800 dark:hover:bg-gray-700',
  transparent: '',
};

export function InputSelect({
  options,
  onChange,
  onSelect,
  variant = 'ghost',
  selectedOption,
  className,
  children,
  disabled,
  label,
  useUppercaseLabel,
  required,
}: InputSelectTypes) {
  return (
    <div className={cn('relative text-xs sm:text-sm', className)}>
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
      <Listbox value={selectedOption} onChange={onChange} disabled={disabled}>
        <Listbox.Button
          className={cn(
            'text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg px-4 text-sm font-medium outline-none duration-200 sm:h-12 sm:px-5',
            inputSelectVariantClasses[variant],
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="flex items-center">{selectedOption?.name}</div>
          <ChevronDown />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute max-h-44 overflow-auto left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
            {options.map((option, index) => (
              <Listbox.Option key={`${option.value}-${index}`} value={option}>
                {({ selected }) => (
                  <div
                    onClick={() => onSelect && onSelect(option.value)}
                    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                      selected
                        ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                    }`}
                  >
                    {option.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
            {/* any custom / external link or element */}
            {children && children}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export default InputSelect;
