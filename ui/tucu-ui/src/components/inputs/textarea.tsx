import { forwardRef } from 'react';
import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

export const textareaVariantClasses = {
  ghost:
    'transition-shadow border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
  solid:
    'transition-colors bg-gray-200/70 hover:bg-gray-300 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  transparent: '',
};

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
  error?: string;
  variant?: 'ghost' | 'solid' | 'transparent';
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
      variant = 'ghost',
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
        <textarea
          ref={ref}
          {...props}
          className={cn(
            'block h-[96px] w-full px-[16px] py-[12px] text-sm placeholder-gray-400 transition-shadow duration-200 invalid:border-red-500 invalid:text-red-600 focus:border-gray-300 focus:outline-hidden focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-muted/10 disabled:text-gray-500 disabled:cursor-not-allowed dark:border-gray-700 dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:h-[112px] rounded-xl',
            textareaVariantClasses[variant],
            props.disabled ? 'bg-muted/10! cursor-not-allowed' : '',
            inputClassName
          )}
        />
      </label>
      {error && <FieldError error={error} size="md" />}
      {!error && helperText && (
        <FieldHelperText size="md">{helperText}</FieldHelperText>
      )}
    </div>
  )
);

export default Textarea;
