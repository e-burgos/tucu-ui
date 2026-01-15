import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';
// import FieldError from '../field-error-text';

const containerClasses = {
  base: 'flex flex-row',
  center: 'justify-center align-center',
};

const inputClasses = {
  base: 'block peer text-center mr-[8px] last:mr-0 focus:placeholder:opacity-0 focus:outline-hidden transition duration-200 disabled:bg-muted/10 disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200',
  numberType:
    '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
  error:
    'border-red hover:enabled:!border-red-500 focus:enabled:!border-red-500 focus:!ring-red-500',
  size: {
    sm: 'px-[4px] py-[4px] text-sm h-[32px] w-[32px]',
    md: 'px-[8px] py-[8px] text-sm h-[40px] w-[40px]',
    lg: 'px-[8px] py-[8px] text-base h-[48px] w-[48px]',
    xl: 'px-[10px] py-[10px] text-lg h-[56px] w-[56px]',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-xs',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  },
  variant: {
    ghost: {
      base: 'transition-shadow border border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:ring-1 hover:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600',
      color: {
        primary:
          'hover:enabled:border-brand focus:enabled:border-brand focus:ring-brand',
        secondary:
          'hover:enabled:border-gray-500 focus:enabled:border-gray-500 focus:ring-gray-500',
        danger:
          'hover:enabled:border-red-500 focus:enabled:border-red-500 focus:ring-red-500',
        info: 'hover:enabled:border-blue focus:enabled:border-blue focus:ring-blue',
        success:
          'hover:enabled:border-green-500 focus:enabled:border-green-500 focus:ring-green-500',
        warning:
          'hover:enabled:border-orange-500 focus:enabled:border-orange-500 focus:ring-orange-500',
      },
    },
    solid: {
      base: 'transition-colors bg-gray-200/70 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
      color: {
        primary: 'hover:enabled:bg-brand/70 focus:ring-brand/30',
        secondary: 'hover:enabled:bg-gray-500/70 focus:ring-gray-500/30',
        danger: 'hover:enabled:bg-red-500/70 focus:ring-red-500/30',
        info: 'hover:enabled:bg-blue-500/70 focus:ring-blue-500/30',
        success: 'hover:enabled:bg-green-500/70 focus:ring-green-500/30',
        warning: 'hover:enabled:bg-orange-500/70 focus:ring-orange-500/30',
      },
    },
    transparent: {
      base: 'bg-transparent',
      color: {
        primary:
          'border border-transparent hover:enabled:border-brand focus:enabled:border-brand focus:ring-brand',
        secondary:
          'border border-transparent hover:enabled:border-gray-500 focus:enabled:border-gray-500 focus:ring-gray-500',
        danger:
          'border border-transparent hover:enabled:border-red-500 focus:enabled:border-red-500 focus:ring-red-500',
        info: 'border border-transparent hover:enabled:border-blue focus:enabled:border-blue focus:ring-blue',
        success:
          'border border-transparent hover:enabled:border-green-500 focus:enabled:border-green-500 focus:ring-green-500',
        warning:
          'border border-transparent hover:enabled:border-orange-500 focus:enabled:border-orange-500 focus:ring-orange-500',
      },
    },
  },
};

export interface PinCodeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'onChange'
  > {
  /** Current value of the pin code */
  value?: string;
  /** Callback function called when pin code changes */
  onChange?: (value: string) => void;
  /** This Pin Code component only support these two types */
  type?: 'text' | 'number';
  /** Mask and unmask to hide and show pin code */
  mask?: boolean;
  /** Set pin code length */
  length?: number;
  /** Make pin code horizontally center */
  center?: boolean;
  /** Set placeholder text */
  placeholder?: string;
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: keyof typeof inputClasses.size;
  /** The rounded variants are: */
  rounded?: keyof typeof inputClasses.rounded;
  /** The variants of the component are: */
  variant?: keyof typeof inputClasses.variant;
  /** Change input color */
  color?: keyof (typeof inputClasses.variant)['ghost']['color'];
  /** Show error message using this prop */
  error?: string;
  /** Add custom classes for the input filed extra style */
  inputClassName?: string;
  /** This prop allows you to customize the error message style */
  errorClassName?: string;
  /** This prop allows you to add a helper text to the pin code component */
  helperText?: string;
  /** This prop allows you to add a helper text to the pin code component */
  helperTextClassName?: string;
  /** This prop allows you to make the pin code component full width */
  fullWidth?: boolean;
}

/**
 * A basic widget for getting pin code. Here is the API documentation of the Pin Code component.
 * And the rest of the props of PinCode are the same as the original html input field.
 * You can use props like `disabled`, `placeholder`, `defaultValue` etc.
 */
export function PinCode({
  type = 'text',
  value = '',
  onChange,
  mask = false,
  length = 4,
  center = true,
  size = 'md',
  rounded = 'md',
  variant = 'ghost',
  color,
  placeholder = '-',
  error,
  className,
  inputClassName,
  errorClassName,
  helperText,
  helperTextClassName,
  fullWidth = false,
  ...props
}: PinCodeProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  function addInputRefs(index: number) {
    return (ref: HTMLInputElement) => {
      if (ref) inputRefs.current[index] = ref;
    };
  }

  // Sync external value with internal inputs
  useEffect(() => {
    const valueArray = value.split('');
    inputRefs.current.forEach((input, index) => {
      if (input && input.value !== (valueArray[index] || '')) {
        input.value = valueArray[index] || '';
      }
    });
  }, [value]);

  function updateValue() {
    const newValue = inputRefs.current
      .map((node) => node?.value || '')
      .join('');
    if (onChange) {
      onChange(newValue);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const inputValues = event.target.value.split('');
    inputRefs.current[index].value = inputValues[inputValues.length - 1];
    if (index < length - 1) inputRefs.current[index + 1].focus();
    updateValue();
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const currentValue = inputRefs.current[index].value;

    if (event.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (event.key === 'Backspace') {
      if (currentValue !== '') {
        inputRefs.current[index].value = '';
      } else {
        if (index === 0) return;
        inputRefs.current[index - 1].value = '';
        inputRefs.current[index - 1].focus();
      }
      updateValue();
    }
  }

  function handlePaste(
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) {
    const copiedValue = event.clipboardData.getData('text').split('');
    for (let i = 0; i < length - index; i += 1) {
      inputRefs.current[index + i].value = copiedValue[i] ?? '';
      if (index + i === length - 1) {
        inputRefs.current[index + i].focus();
      } else {
        inputRefs.current[index + i + 1].focus();
      }
    }
    event.preventDefault();
    updateValue();
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        fullWidth && 'w-full'
      )}
    >
      <div
        className={cn(
          containerClasses.base,
          center && containerClasses.center,
          fullWidth && 'w-full! justify-between!',
          className
        )}
      >
        {Array.from({ length }, (_, index) => {
          const currentValue = value.split('')[index] || '';
          return (
            <input
              key={index}
              ref={addInputRefs(index)}
              type={type}
              inputMode={type === 'text' ? type : 'numeric'}
              value={currentValue}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              placeholder={placeholder}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={(event) => handlePaste(event, index)}
              className={cn(
                inputClasses.base,
                type === 'number' && inputClasses.numberType,
                inputClasses.size[size],
                inputClasses.rounded[rounded],
                inputClasses.variant[variant].base,
                color && inputClasses.variant[variant].color[color],
                error && inputClasses.error,
                mask && 'password-dot',
                props.disabled &&
                  'bg-muted/10! cursor-not-allowed border-gray-200! dark:border-gray-700! hover:border-gray-200! dark:hover:border-gray-700!',
                inputClassName
              )}
              {...props}
            />
          );
        })}
      </div>

      {!error && helperText && (
        <FieldHelperText size="md" className={helperTextClassName}>
          {helperText}
        </FieldHelperText>
      )}
      {error && (
        <FieldError
          className={cn('text-left w-full', errorClassName)}
          error={error}
          size="md"
        />
      )}
    </div>
  );
}

export default PinCode;
