import React, { forwardRef } from 'react';

import cn from 'classnames';
import FieldError from './field-error-text';
import FieldHelperText from './field-helper-text';

const inputClasses = {
  base: 'disabled:bg-gray-50 disabled:border-gray-200',
  size: {
    sm: 'h-4 w-4',
    DEFAULT: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  },
  variant: {
    outline: {
      base: 'border-2 bg-gray-200/70 hover:enabled:bg-gray-200/90 ',
      color: {
        DEFAULT: 'border-brand focus:ring-brand/30 checked:!bg-brand',
        primary: 'border-brand focus:ring-brand/30 checked:!bg-brand',
        secondary:
          'border-gray-500 focus:ring-gray-500/30 checked:!bg-gray-500',
        danger: 'border-red-500 focus:ring-red-500/30 checked:!bg-red-500',
        info: 'border-blue-500 focus:ring-blue-500/30 checked:!bg-blue-500',
        success:
          'border-green-500 focus:ring-green-500/30 checked:!bg-green-500',
        warning:
          'border-orange-500 focus:ring-orange-500/30 checked:!bg-orange-500',
      },
    },
    flat: {
      base: 'border-2',
      color: {
        DEFAULT:
          'bg-brand/10 hover:enabled:bg-brand/20 focus:ring-brand/30 checked:!bg-brand/70',
        primary:
          'bg-brand/70 hover:enabled:bg-brand/90 focus:ring-brand/30 checked:!bg-brand',
        secondary:
          'bg-gray-500/70 hover:enabled:bg-gray-500/90 focus:ring-gray-500/30 checked:!bg-gray-500',
        danger:
          'bg-red-500/70 hover:enabled:bg-red-500/90 focus:ring-red-500/30 checked:!bg-red-500',
        info: 'bg-blue-500/70 hover:enabled:bg-blue-500/90 focus:ring-blue-500/30 checked:!bg-blue-500',
        success:
          'bg-green-500/70 hover:enabled:bg-green-500/90 focus:ring-green-500/30 checked:!bg-green-500',
        warning:
          'bg-orange-500/80 hover:enabled:bg-orange-500/90 focus:ring-orange-500/30 checked:!bg-orange-500',
      },
    },
    active: {
      base: 'border',
      color: {
        DEFAULT: 'border-brand focus:ring-brand/30 checked:!bg-brand',
        primary: 'border-brand focus:ring-brand/30 checked:!bg-brand',
        secondary:
          'border-gray-500 focus:ring-gray-500/30 checked:!bg-gray-500',
        danger: 'border-red-500 focus:ring-red-500/30 checked:!bg-red-500',
        info: 'border-blue-500 focus:ring-blue-500/30 checked:!bg-blue-500',
        success:
          'border-green-500 focus:ring-green-500/30 checked:!bg-green-500',
        warning:
          'border-orange-500 focus:ring-orange-500/30 checked:!bg-orange-500',
      },
    },
  },
};

const labelClasses = {
  size: {
    text: {
      sm: 'text-sm',
      DEFAULT: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    margin: {
      start: {
        sm: 'mr-1 rtl:ml-1',
        DEFAULT: 'mr-1.5 rtl:ml-1.5',
        lg: 'mr-2 rtl:ml-2',
        xl: 'mr-2 rlt:ml-2',
      },
      end: {
        sm: 'ml-1 rtl:mr-1',
        DEFAULT: 'ml-1.5 rtl:mr-1.5',
        lg: 'ml-2 rtl:mr-2',
        xl: 'ml-2 rtl:mr-2',
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
  color?: keyof (typeof inputClasses.variant)['outline']['color'];
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
      variant = 'outline',
      size = 'DEFAULT',
      color = 'DEFAULT',
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
        <input
          type="radio"
          ref={ref}
          disabled={disabled}
          className={cn(
            '!bg-transparent',
            inputClasses.base,
            inputClasses.size[size],
            inputClasses.variant[variant].base,
            inputClasses.variant[variant].color[color],
            inputClassName
          )}
          {...radioProps}
        />

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
        <FieldHelperText size={'DEFAULT'} className={helperClassName}>
          {helperText}
        </FieldHelperText>
      )}
      {error && (
        <FieldError size={'DEFAULT'} error={error} className={errorClassName} />
      )}
    </div>
  )
);

export default Radio;
