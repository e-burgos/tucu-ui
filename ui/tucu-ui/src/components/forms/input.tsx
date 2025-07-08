/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import cn from 'classnames';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  useUppercaseLabel?: boolean;
  helperText?: string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = 'text',
      className,
      inputClassName,
      labelClassName,
      helperText,
      suffix,
      suffixClassName,
      useUppercaseLabel = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('text-xs sm:text-sm', className)}>
        <div className={cn('relative', labelClassName)}>
          {label && (
            <span
              className={cn(
                'block font-medium tracking-widest dark:text-gray-100',
                useUppercaseLabel ? 'mb-2 uppercase sm:mb-3' : 'mb-1.5 ml-1.5'
              )}
            >
              {label}
              {props.required && (
                <sup className="inline-block text-[13px] text-red-500 ltr:ml-1 rtl:mr-1">
                  *
                </sup>
              )}
            </span>
          )}
          <div className="relative">
            <input
              type={type}
              ref={ref}
              {...props}
              className={cn(
                'mt-1 block h-10 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-shadow duration-200 dark:invalid:border-red-500 dark:invalid:text-red-600 invalid:border-red-500 invalid:text-red-600 focus:border-gray-900 focus:outline-hidden focus:ring-1 focus:ring-gray-900 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:h-12 sm:rounded-lg',
                icon && 'pl-10',
                type === 'date' && 'bg-white text-black',
                props.disabled
                  ? 'bg-gray-50 dark:bg-light-dark cursor-not-allowed dark:cursor-not-allowed'
                  : '',
                inputClassName,
                (suffix || icon) && 'pl-10'
              )}
            />
            {(suffix || icon) && (
              <span
                className={cn(
                  'w-10 h-10 flex items-center justify-center absolute top-1/2 -translate-y-1/2  whitespace-nowrap leading-normal text-gray-400 dark:text-white',
                  suffixClassName
                )}
              >
                {suffix || icon}
              </span>
            )}
          </div>
        </div>
        {error && <FieldError error={error} size="DEFAULT" />}
        {helperText && (
          <FieldHelperText size="DEFAULT">{helperText}</FieldHelperText>
        )}
      </div>
    );
  }
);

export default Input;
