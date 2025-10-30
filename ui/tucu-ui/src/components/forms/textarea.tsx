import { forwardRef } from 'react';
import cn from 'classnames';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  useUppercaseLabel?: boolean;
  helperText?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      required,
      label,
      error,
      className,
      inputClassName,
      useUppercaseLabel,
      helperText,
      ...props
    },
    ref
  ) => (
    <div className={cn('text-sm sm:text-sm', className)}>
      <label>
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
        <textarea
          ref={ref}
          {...props}
          className={cn(
            'mt-1 block h-24 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-shadow duration-200  invalid:border-red-500 invalid:text-red-600 focus:border-gray-900 focus:outline-hidden focus:ring-1 focus:ring-gray-900 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:h-28 sm:rounded-lg',
            inputClassName
          )}
        />
      </label>
      {error && <FieldError error={error} size="DEFAULT" />}
      {!error && helperText && (
        <FieldHelperText size="DEFAULT">{helperText}</FieldHelperText>
      )}
    </div>
  )
);

export default Textarea;
