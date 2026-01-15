import React, { forwardRef } from 'react';

import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

const inputClasses = {
  base: 'appearance-none cursor-pointer rounded-full disabled:bg-muted/10 disabled:border-gray-200 disabled:cursor-not-allowed transition-all duration-200',
  size: {
    sm: 'h-[16px] w-[16px]',
    md: 'h-[20px] w-[20px]',
    lg: 'h-[24px] w-[24px]',
    xl: 'h-[28px] w-[28px]',
  },
  variant: {
    ghost: {
      base: 'border-[2px] bg-white dark:bg-gray-800 hover:enabled:bg-gray-50 dark:hover:enabled:bg-gray-700 transition-colors',
      color: {
        primary:
          'border-brand focus:ring-[2px] focus:ring-brand/30 checked:border-brand checked:bg-brand checked:hover:enabled:bg-brand/90 checked:hover:enabled:border-brand/90 checked:hover:enabled:scale-105',
        secondary:
          'border-gray-500 focus:ring-[2px] focus:ring-gray-500/30 checked:border-gray-500 checked:bg-gray-500 checked:hover:enabled:bg-gray-600 checked:hover:enabled:border-gray-600 checked:hover:enabled:scale-105',
        danger:
          'border-red-500 focus:ring-[2px] focus:ring-red-500/30 checked:border-red-500 checked:bg-red-500 checked:hover:enabled:bg-red-600 checked:hover:enabled:border-red-600 checked:hover:enabled:scale-105',
        info: 'border-blue-500 focus:ring-[2px] focus:ring-blue-500/30 checked:border-blue-500 checked:bg-blue-500 checked:hover:enabled:bg-blue-600 checked:hover:enabled:border-blue-600 checked:hover:enabled:scale-105',
        success:
          'border-green-500 focus:ring-[2px] focus:ring-green-500/30 checked:border-green-500 checked:bg-green-500 checked:hover:enabled:bg-green-600 checked:hover:enabled:border-green-600 checked:hover:enabled:scale-105',
        warning:
          'border-orange-500 focus:ring-[2px] focus:ring-orange-500/30 checked:border-orange-500 checked:bg-orange-500 checked:hover:enabled:bg-orange-600 checked:hover:enabled:border-orange-600 checked:hover:enabled:scale-105',
      },
    },
    solid: {
      base: 'border-[2px] bg-gray-200/70 dark:bg-gray-800 hover:enabled:bg-gray-300 dark:hover:enabled:bg-gray-700 transition-colors',
      color: {
        primary:
          'border-transparent focus:ring-[2px] focus:ring-brand/30 checked:border-brand checked:bg-brand checked:hover:enabled:bg-brand/90 checked:hover:enabled:border-brand/90 checked:hover:enabled:scale-105',
        secondary:
          'border-transparent focus:ring-[2px] focus:ring-gray-500/30 checked:border-gray-500 checked:bg-gray-500 checked:hover:enabled:bg-gray-600 checked:hover:enabled:border-gray-600 checked:hover:enabled:scale-105',
        danger:
          'border-transparent focus:ring-[2px] focus:ring-red-500/30 checked:border-red-500 checked:bg-red-500 checked:hover:enabled:bg-red-600 checked:hover:enabled:border-red-600 checked:hover:enabled:scale-105',
        info: 'border-transparent focus:ring-[2px] focus:ring-blue-500/30 checked:border-blue-500 checked:bg-blue-500 checked:hover:enabled:bg-blue-600 checked:hover:enabled:border-blue-600 checked:hover:enabled:scale-105',
        success:
          'border-transparent focus:ring-[2px] focus:ring-green-500/30 checked:border-green-500 checked:bg-green-500 checked:hover:enabled:bg-green-600 checked:hover:enabled:border-green-600 checked:hover:enabled:scale-105',
        warning:
          'border-transparent focus:ring-[2px] focus:ring-orange-500/30 checked:border-orange-500 checked:bg-orange-500 checked:hover:enabled:bg-orange-600 checked:hover:enabled:border-orange-600 checked:hover:enabled:scale-105',
      },
    },
    transparent: {
      base: '',
      color: {
        primary:
          'border-[2px] border-transparent focus:ring-[2px] focus:ring-brand/30 checked:border-brand checked:bg-brand checked:hover:enabled:bg-brand/90 checked:hover:enabled:border-brand/90 checked:hover:enabled:scale-105',
        secondary:
          'border-[2px] border-transparent focus:ring-[2px] focus:ring-gray-500/30 checked:border-gray-500 checked:bg-gray-500 checked:hover:enabled:bg-gray-600 checked:hover:enabled:border-gray-600 checked:hover:enabled:scale-105',
        danger:
          'border-[2px] border-transparent focus:ring-[2px] focus:ring-red-500/30 checked:border-red-500 checked:bg-red-500 checked:hover:enabled:bg-red-600 checked:hover:enabled:border-red-600 checked:hover:enabled:scale-105',
        info: 'border-[2px] border-transparent focus:ring-[2px] focus:ring-blue-500/30 checked:border-blue-500 checked:bg-blue-500 checked:hover:enabled:bg-blue-600 checked:hover:enabled:border-blue-600 checked:hover:enabled:scale-105',
        success:
          'border-[2px] border-transparent focus:ring-[2px] focus:ring-green-500/30 checked:border-green-500 checked:bg-green-500 checked:hover:enabled:bg-green-600 checked:hover:enabled:border-green-600 checked:hover:enabled:scale-105',
        warning:
          'border-[2px] border-transparent focus:ring-[2px] focus:ring-orange-500/30 checked:border-orange-500 checked:bg-orange-500 checked:hover:enabled:bg-orange-600 checked:hover:enabled:border-orange-600 checked:hover:enabled:scale-105',
      },
    },
  },
};

const labelClasses = {
  size: {
    text: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    margin: {
      start: {
        sm: 'mr-[4px] rtl:ml-[4px]',
        md: 'mr-[6px] rtl:ml-[6px]',
        lg: 'mr-[8px] rtl:ml-[8px]',
        xl: 'mr-[8px] rlt:ml-[8px]',
      },
      end: {
        sm: 'ml-[4px] rtl:mr-[4px]',
        md: 'ml-[6px] rtl:mr-[6px]',
        lg: 'ml-[8px] rtl:mr-[8px]',
        xl: 'ml-[8px] rtl:mr-[8px]',
      },
    },
  },
};

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The variants of the component are: */
  variant?: keyof typeof inputClasses.variant;
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof inputClasses.size;
  /** Change radio button color */
  color?: keyof typeof inputClasses.variant.ghost.color;
  /** Available directions of the label are: */
  labelPlacement?: 'start' | 'end';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Set field label */
  label?: React.ReactNode;
  /** Show error message using this prop */
  error?: string;
  /** Add helper text. It could be string or a React component */
  helperText?: React.ReactNode;
  /** Use className prop to apply style for entire component */
  className?: string;
  /** Use activeClassName prop to apply style on active component from radioGroup */
  activeClassName?: string;
  /** Use containerClassName prop to apply some additional style for label and radio container */
  containerClassName?: string;
  /** Use labelClassName prop to apply some addition style for the field label */
  labelClassName?: string;
  /** Add custom classes for the input filed extra style */
  inputClassName?: string;
  /** This prop allows you to customize the error message style */
  errorClassName?: string;
  /** This prop allows you to customize the helper message style */
  helperClassName?: string;
}

/**
 * A basic widget for getting the user input of radio. Here is the API documentation of the Radio component.
 * And the rest of the props of Checkbox are the same as the original html input field.
 * You can use props like `value`, `disabled`, `onChange`, `onFocus`, `onBlur` etc.
 */

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      color = 'primary',
      labelPlacement = 'end',
      label,
      disabled,
      error,
      helperText,
      className,
      activeClassName,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      ...radioProps
    },
    ref
  ) => (
    <div className={cn('flex flex-col', className, activeClassName)}>
      <label
        className={cn(
          'flex flex-row items-center',
          disabled && 'cursor-not-allowed',
          containerClassName
        )}
      >
        <div className="relative inline-flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            className={cn(
              inputClasses.base,
              inputClasses.size[size],
              inputClasses.variant[variant].base,
              inputClasses.variant[variant].color[color],
              disabled &&
                'cursor-not-allowed bg-muted/10! border-gray-200! dark:border-gray-700!',
              'peer',
              inputClassName
            )}
            {...radioProps}
          />
          <span
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none',
              'peer-checked:block peer-checked:bg-white',
              'peer-checked:transition-all',
              size === 'sm' && 'w-[6px] h-[6px]',
              size === 'md' && 'w-[8px] h-[8px]',
              size === 'lg' && 'w-[10px] h-[10px]',
              size === 'xl' && 'w-[12px] h-[12px]',
              'hidden'
            )}
          />
        </div>

        {label && (
          <span
            className={cn(
              labelClasses.size.text[size],
              labelClasses.size.margin[labelPlacement][size],
              labelPlacement === 'start' && 'order-first',
              labelClassName
            )}
          >
            {label}
          </span>
        )}
      </label>

      {!error && helperText && (
        <FieldHelperText size="md" className={helperClassName}>
          {helperText}
        </FieldHelperText>
      )}
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
);

export default Radio;
