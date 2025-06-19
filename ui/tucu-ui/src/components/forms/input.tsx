/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import cn from 'classnames';

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
          <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-1.5 w-10">
            {icon && (
              <div
                className={cn(
                  'flex justify-center align-middle w-fit dark:text-white text-current',
                  label && 'h-full pt-7 first:*:mt-3.5 first:*:h-4 first:*:w-4'
                )}
              >
                {icon}
              </div>
            )}
          </div>
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
              inputClassName
            )}
          />
          {suffix && (
            <span
              className={cn(
                'absolute whitespace-nowrap leading-normal',
                suffixClassName
              )}
            >
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <span role="alert" className="mt-2 block text-red-500! sm:mt-2.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
