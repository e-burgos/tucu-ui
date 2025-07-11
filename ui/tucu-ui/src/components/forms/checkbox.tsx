import { forwardRef, useId } from 'react';
import cn from 'classnames';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const inputClasses = {
  base: 'peer cursor-pointer transition duration-200 ease-in-out checked:ring-0 focus:ring-0 focus:outline-hidden',
  size: {
    sm: 'h-4 w-4',
    DEFAULT: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded',
    lg: 'rounded-md',
    xl: 'rounded-lg',
  },
  variant: {
    outline: {
      base: 'border-2 border-gray-300 bg-transparent checked:!border-gray-900 hover:enabled:border-gray-900 focus:enabled:border-gray-900 checked:enabled:bg-gray-900 disabled:!bg-gray-100 disabled:!border-gray-300 dark:border-gray-600 dark:checked:!border-gray-400 dark:hover:enabled:border-gray-400 dark:focus:enabled:border-gray-400 dark:checked:enabled:bg-gray-400 dark:disabled:!bg-gray-700 dark:disabled:!border-gray-600',
      color: {
        DEFAULT:
          'hover:enabled:border-brand focus:enabled:border-brand checked:enabled:!border-brand checked:enabled:!bg-brand focus:ring-brand/30',
        primary:
          'hover:enabled:border-brand focus:enabled:border-brand checked:enabled:!border-brand checked:enabled:!bg-brand focus:ring-brand/30',
        secondary:
          'hover:enabled:border-gray-900 focus:enabled:border-gray-900 checked:enabled:!border-gray-900 checked:enabled:!bg-gray-900 focus:ring-gray-900/30',
        danger:
          'hover:enabled:border-red-500 focus:enabled:border-red-500 checked:enabled:!border-red-500 checked:enabled:!bg-red-500 focus:ring-red-500/30',
        info: 'hover:enabled:border-blue-500 focus:enabled:border-blue-500 checked:enabled:!border-blue-500 checked:enabled:!bg-blue-500 focus:ring-blue-500/30',
        success:
          'hover:enabled:border-green-500 focus:enabled:border-green-500 checked:enabled:!border-green-500 checked:enabled:!bg-green-500 focus:ring-green-500/30',
        warning:
          'hover:enabled:border-orange-500 focus:enabled:border-orange-500 checked:enabled:!border-orange-500 checked:enabled:!bg-orange-500 focus:ring-orange-500/30',
      },
    },
    flat: {
      base: 'border-0 ring-0 checked:ring-0 focus:ring-0',
      color: {
        DEFAULT:
          'bg-brand/70 hover:enabled:bg-brand/90 focus:ring-brand/30 checked:!bg-brand',
        primary:
          'bg-brand/70 hover:enabled:bg-brand/90 focus:ring-brand/30 checked:!bg-brand',
        secondary:
          'bg-secondary-lighter/70 hover:enabled:bg-secondary-lighter/90 focus:ring-secondary/30 checked:!bg-gray-900',
        danger:
          'bg-red-lighter/70 hover:enabled:bg-red-lighter/90 focus:ring-red/30 checked:!bg-red-500',
        info: 'bg-blue-lighter/70 hover:enabled:bg-blue-lighter/90 focus:ring-blue/30 checked:!bg-blue-500',
        success:
          'bg-green-lighter/70 hover:enabled:bg-green-lighter/90 focus:ring-green/30 checked:!bg-green-500',
        warning:
          'bg-orange-lighter/80 hover:enabled:bg-orange-lighter/90 focus:ring-orange/30 checked:!bg-orange-500',
      },
    },
    active: {
      base: 'border',
      color: {
        DEFAULT:
          'border-brand bg-brand checked:enabled:border-brand focus:ring-brand/30',
        primary:
          'border-brand bg-brand checked:enabled:border-brand focus:ring-brand/30',
        secondary:
          'border-gray-900 bg-gray-500 checked:enabled:border-gray-900 focus:ring-gray-900/30',
        danger:
          'border-red-500 bg-red-500 checked:enabled:border-red-500 focus:ring-red-500/30',
        info: 'border-blue-500 bg-blue-500 checked:enabled:border-blue-500 focus:ring-blue-500/30',
        success:
          'border-green-500 bg-green-500 checked:enabled:border-green-500 focus:ring-green-500/30',
        warning:
          'border-orange-500 bg-orange-500 checked:enabled:border-orange-500 focus:ring-orange-500/30',
      },
    },
  },
};

const iconClasses = {
  base: 'peer-checked:opacity-100 absolute opacity-0 text-white top-0 left-0',
  color: {
    DEFAULT: 'text-brand',
    primary: 'text-brand',
    secondary: 'text-gray-900',
    danger: 'text-red-500',
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-orange-500',
  },
};

const labelClasses = {
  size: {
    text: {
      sm: 'text-xs',
      DEFAULT: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    margin: {
      start: {
        sm: 'mr-1 rtl:ml-1',
        DEFAULT: 'mr-1.5 rtl:ml-1.5',
        lg: 'mr-2 rtl:ml-2',
        xl: 'mr-2 rtl:ml-2',
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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The variants of the component are: */
  variant?: keyof typeof inputClasses.variant;
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof inputClasses.size;
  /** Change input color */
  color?: keyof (typeof inputClasses.variant)['outline']['color'];
  /** The rounded variants are: */
  rounded?: keyof typeof inputClasses.rounded;
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
  /** Use activeClassName prop to apply style on active component from checkboxGroup */
  activeClassName?: string;
  /** Use containerClassName prop to apply some additional style for label and checkbox container */
  containerClassName?: string;
  /** Use iconClassName prop to apply some additonal style for check mark icon */
  iconClassName?: string;
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
 * A basic widget for getting the user input of checkbox. Here is the API documentation of the Checkbox component.
 * And the rest of the props of Checkbox are the same as the original html input field.
 * You can use props like `value`, `disabled`, `onChange`, `onFocus`, `onBlur` etc.
 */

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'outline',
      size = 'DEFAULT',
      rounded = 'DEFAULT',
      color = 'DEFAULT',
      labelPlacement = 'end',
      label,
      disabled,
      error,
      helperText,
      className,
      activeClassName,
      containerClassName,
      iconClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      id,
      ...checkboxProps
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const checkboxId = useId();
    const finalId = id || checkboxId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    // Build aria-describedby string
    const describedBy =
      [error ? errorId : null, helperText ? helperId : null]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div className={cn('flex flex-col', className, activeClassName)}>
        <label
          htmlFor={finalId}
          className={cn(
            'flex flex-row items-center',
            disabled && 'cursor-not-allowed',
            containerClassName
          )}
        >
          <div className="relative leading-none">
            <input
              type="checkbox"
              ref={ref}
              id={finalId}
              disabled={disabled}
              aria-describedby={describedBy}
              aria-invalid={error ? 'true' : 'false'}
              className={cn(
                inputClasses.base,
                inputClasses.size[size],
                inputClasses.rounded[rounded],
                inputClasses.variant[variant].base,
                inputClasses.variant[variant].color[color],
                inputClassName
              )}
              {...checkboxProps}
            />
            <CheckmarkIcon
              className={cn(
                iconClasses.base,
                inputClasses.size[size],
                size === 'sm' && 'top-0.5',
                variant === 'active' && iconClasses.color[color],
                iconClassName
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
          <FieldHelperText
            id={helperId}
            size={'DEFAULT'}
            className={helperClassName}
          >
            {helperText}
          </FieldHelperText>
        )}
        {error && (
          <FieldError
            id={errorId}
            className={errorClassName}
            size={'DEFAULT'}
            error={error}
          />
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
