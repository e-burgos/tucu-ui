import { forwardRef, useId } from 'react';
import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

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

const checkboxVariantClasses = {
  ghost:
    'transition-shadow border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
  solid:
    'transition-colors  bg-gray-200/70 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
  transparent: '',
};

const checkboxShapeClasses = {
  rounded: 'rounded-xl',
  square: 'rounded-md',
};

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
  /** The variant of the component */
  variant?: 'ghost' | 'solid' | 'transparent';
  /** The shape of the component */
  shape?: 'rounded' | 'square';
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
      variant = 'ghost',
      shape = 'square',
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
      sm: 'h-[16px] w-[16px]',
      md: 'h-[20px] w-[20px]',
      lg: 'h-[24px] w-[24px]',
    };

    // Color classes that change based on state
    // Note: base classes don't include border/bg to allow variants to define structure
    const getColorClasses = (color: string) => {
      const colorMap = {
        primary: {
          base: '',
          checked: 'checked:border-brand checked:bg-brand',
          hover: 'hover:enabled:border-brand',
          checkedHover:
            'checked:hover:enabled:bg-brand/90 checked:hover:enabled:border-brand/90 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-brand focus:ring-brand/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
          icon: 'bg-brand',
        },
        secondary: {
          base: '',
          checked: 'checked:border-gray-900 checked:bg-gray-900',
          hover: 'hover:enabled:border-gray-900',
          checkedHover:
            'checked:hover:enabled:bg-gray-800 checked:hover:enabled:border-gray-800 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-gray-900 focus:ring-gray-900/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
          icon: 'bg-gray-500',
        },
        danger: {
          base: '',
          checked: 'checked:border-red-500 checked:bg-red-500',
          hover: 'hover:enabled:border-red-500',
          checkedHover:
            'checked:hover:enabled:bg-red-600 checked:hover:enabled:border-red-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-red-500 focus:ring-red-500/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
          icon: 'bg-red-500',
        },
        info: {
          base: '',
          checked: 'checked:border-blue-500 checked:bg-blue-500',
          hover: 'hover:enabled:border-blue-500',
          checkedHover:
            'checked:hover:enabled:bg-blue-600 checked:hover:enabled:border-blue-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-blue-500 focus:ring-blue-500/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
          icon: 'bg-blue-500',
        },
        success: {
          base: '',
          checked: 'checked:border-green-500 checked:bg-green-500',
          hover: 'hover:enabled:border-green-500',
          checkedHover:
            'checked:hover:enabled:bg-green-600 checked:hover:enabled:border-green-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-green-500 focus:ring-green-500/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
          icon: 'bg-green-500',
        },
        warning: {
          base: '',
          checked: 'checked:border-orange-500 checked:bg-orange-500',
          hover: 'hover:enabled:border-orange-500',
          checkedHover:
            'checked:hover:enabled:bg-orange-600 checked:hover:enabled:border-orange-600 checked:hover:enabled:scale-105',
          focus: 'focus:enabled:border-orange-500 focus:ring-orange-500/30',
          disabled: 'disabled:bg-muted/10 disabled:border-gray-300',
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
      sm:
        labelPlacement === 'start'
          ? 'mr-[4px] rtl:ml-[4px]'
          : 'ml-[4px] rtl:mr-[4px]',
      md:
        labelPlacement === 'start'
          ? 'mr-[6px] rtl:ml-[6px]'
          : 'ml-[6px] rtl:mr-[6px]',
      lg:
        labelPlacement === 'start'
          ? 'mr-[8px] rtl:ml-[8px]'
          : 'ml-[8px] rtl:mr-[8px]',
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
                'peer appearance-none cursor-pointer disabled:cursor-not-allowed transition-all duration-200 ease-in-out',
                checkboxShapeClasses[shape],
                checkboxVariantClasses[variant],
                'focus:outline-none focus:ring-0',
                'checked:ring-0',
                sizeClasses[size],
                colorClasses.base,
                colorClasses.checked,
                colorClasses.hover,
                colorClasses.checkedHover,
                colorClasses.focus,
                colorClasses.disabled,
                disabled &&
                  'bg-muted/10! border-gray-200! dark:border-gray-700!',
                inputClassName
              )}
              {...checkboxProps}
            />
            <CheckmarkIcon
              className={cn(
                `peer-checked:opacity-100 ${checkboxShapeClasses[shape]} absolute opacity-0 text-white top-0 left-0 pointer-events-none`,
                sizeClasses[size],
                disabled
                  ? 'bg-muted/10! border-gray-200! dark:border-gray-700!'
                  : colorClasses.icon,
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
          <FieldHelperText id={helperId} size="md" className={helperClassName}>
            {helperText}
          </FieldHelperText>
        )}
        {error && (
          <FieldError
            id={errorId}
            className={errorClassName}
            size="md"
            error={error}
          />
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
