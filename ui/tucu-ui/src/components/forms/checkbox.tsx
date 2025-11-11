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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The size of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Change input color */
  color?: 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning';
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
 * A simplified checkbox component that uses a single color-based styling approach.
 * The checkbox changes appearance based on its state (unchecked, checked, hover, focus, disabled).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
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

    // Size classes
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    // Color classes that change based on state
    const getColorClasses = (color: string) => {
      const colorMap = {
        primary: {
          base: 'border border-brand rounded bg-transparent',
          checked: 'checked:border-brand checked:bg-brand',
          hover: 'hover:enabled:border-brand',
          checkedHover:
            'checked:hover:enabled:bg-brand/90 checked:hover:enabled:border-brand/90 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-brand focus:ring-brand/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-brand',
        },
        secondary: {
          base: 'border border-gray-500 bg-transparent',
          checked: 'checked:border-gray-900 checked:bg-gray-900',
          hover: 'hover:enabled:border-gray-900',
          checkedHover:
            'checked:hover:enabled:bg-gray-800 checked:hover:enabled:border-gray-800 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-gray-900 focus:ring-gray-900/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-gray-500',
        },
        danger: {
          base: 'border border-red-500 bg-transparent',
          checked: 'checked:border-red-500 checked:bg-red-500',
          hover: 'hover:enabled:border-red-500',
          checkedHover:
            'checked:hover:enabled:bg-red-600 checked:hover:enabled:border-red-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-red-500 focus:ring-red-500/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-red-500',
        },
        info: {
          base: 'border border-blue-500 bg-transparent',
          checked: 'checked:border-blue-500 checked:bg-blue-500',
          hover: 'hover:enabled:border-blue-500',
          checkedHover:
            'checked:hover:enabled:bg-blue-600 checked:hover:enabled:border-blue-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-blue-500 focus:ring-blue-500/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-blue-500',
        },
        success: {
          base: 'border border-green-500 bg-transparent',
          checked: 'checked:border-green-500 checked:bg-green-500',
          hover: 'hover:enabled:border-green-500',
          checkedHover:
            'checked:hover:enabled:bg-green-600 checked:hover:enabled:border-green-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-green-500 focus:ring-green-500/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-green-500',
        },
        warning: {
          base: 'border border-orange-500 bg-transparent',
          checked: 'checked:border-orange-500 checked:bg-orange-500',
          hover: 'hover:enabled:border-orange-500',
          checkedHover:
            'checked:hover:enabled:bg-orange-600 checked:hover:enabled:border-orange-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-orange-500 focus:ring-orange-500/30',
          disabled: 'disabled:bg-gray-100 disabled:border-gray-300',
          icon: 'bg-orange-500',
        },
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.primary;
    };

    const colorClasses = getColorClasses(color);

    // Label size classes
    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    };

    const labelMarginClasses = {
      sm: labelPlacement === 'start' ? 'mr-1 rtl:ml-1' : 'ml-1 rtl:mr-1',
      md:
        labelPlacement === 'start' ? 'mr-1.5 rtl:ml-1.5' : 'ml-1.5 rtl:mr-1.5',
      lg: labelPlacement === 'start' ? 'mr-2 rtl:ml-2' : 'ml-2 rtl:mr-2',
    };

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
          <div className={cn('relative leading-none')}>
            <input
              type="checkbox"
              ref={ref}
              id={finalId}
              disabled={disabled}
              aria-describedby={describedBy}
              aria-invalid={error ? 'true' : 'false'}
              className={cn(
                '!rounded !bg-transparent peer cursor-pointer transition-all duration-200 ease-in-out',
                'focus:outline-none focus:ring-0',
                'checked:ring-0',
                sizeClasses[size],
                colorClasses.base,
                colorClasses.checked,
                colorClasses.hover,
                colorClasses.checkedHover,
                colorClasses.focus,
                colorClasses.disabled,
                inputClassName
              )}
              {...checkboxProps}
            />
            <CheckmarkIcon
              className={cn(
                `peer-checked:opacity-100 rounded absolute opacity-0 text-white top-0 left-0`,
                sizeClasses[size],
                disabled ? 'bg-gray-300' : colorClasses.icon,
                iconClassName
              )}
            />
          </div>

          {label && (
            <span
              className={cn(
                labelSizeClasses[size],
                labelMarginClasses[size],
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
