import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import FieldError from './field-error-text';
import FieldHelperText from './field-helper-text';
// import FieldError from '../field-error-text';

const containerClasses = {
  base: 'flex flex-row',
  center: 'justify-center align-center',
};

const inputClasses = {
  base: 'block peer text-center bg-transparent mr-2 focus:placeholder:opacity-0 focus:outline-hidden transition duration-200 disabled:bg-gray-50 disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200',
  error:
    'border-red hover:enabled:!border-red-500 focus:enabled:!border-red-500 focus:!ring-red-500',
  size: {
    sm: 'px-1 py-1 text-sm h-8 w-8',
    DEFAULT: 'px-2 py-2 text-sm h-10 w-10',
    lg: 'px-2 py-2 text-base h-12 w-12',
    xl: 'px-2.5 py-2.5 text-lg h-14 w-14',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-xs',
    DEFAULT: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  },
  variant: {
    active: {
      base: 'border border-gray-700 focus:ring-[1px] bg-gray-0 placeholder:opacity-80',
      color: {
        DEFAULT:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-brand text-current',
        primary:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-brand text-current',
        secondary:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-blue-500 text-current',
        danger:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-red-500 text-current',
        info: 'not-read-only:focus:enabled:border-gray-1000 focus:ring-blue-500 text-current',
        success:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-green-500 text-current',
        warning:
          'not-read-only:focus:enabled:border-gray-1000 focus:ring-orange-500 text-current',
      },
    },
    flat: {
      base: 'border focus:ring-2 border-0 placeholder:opacity-90',
      color: {
        DEFAULT:
          'bg-brand/10 not-read-only:hover:enabled:bg-brand/20 focus:ring-brand/30 text-brand placeholder:text-brand/60',
        primary:
          'bg-brand/70 not-read-only:hover:enabled:bg-brand/90 focus:ring-brand/30 text-brand',
        secondary:
          'bg-gray-500/70 not-read-only:hover:enabled:bg-gray-500/90 focus:ring-gray-500/30 text-gray-500',
        danger:
          'bg-red-500/70 not-read-only:hover:enabled:bg-red-500/90 focus:ring-red-500/30 text-red-500',
        info: 'bg-blue-500/70 not-read-only:hover:enabled:bg-blue-500/90 focus:ring-blue-500/30 text-blue-500',
        success:
          'bg-green-500/70 not-read-only:hover:enabled:bg-green-500/90 focus:ring-green-500/30 text-green-500',
        warning:
          'bg-orange-500/90 not-read-only:hover:enabled:bg-orange-500 focus:ring-orange-500/30 text-orange-500',
      },
    },
    outline: {
      base: 'bg-transparent focus:ring-[0.6px] border border-gray-300 placeholder:text-gray-500',
      color: {
        DEFAULT:
          'not-read-only:hover:enabled:border-brand not-read-only:focus:enabled:border-brand focus:ring-brand',
        primary:
          'not-read-only:hover:enabled:border-brand not-read-only:focus:enabled:border-brand focus:ring-brand',
        secondary:
          'not-read-only:hover:enabled:border-gray-500 not-read-only:focus:enabled:border-gray-500 focus:ring-gray-500',
        danger:
          'not-read-only:hover:enabled:border-red-500 not-read-only:focus:enabled:border-red-500 focus:ring-red-500',
        info: 'not-read-only:hover:enabled:border-blue not-read-only:focus:enabled:border-blue focus:ring-blue',
        success:
          'not-read-only:hover:enabled:border-green-500 not-read-only:focus:enabled:border-green-500 focus:ring-green-500',
        warning:
          'not-read-only:hover:enabled:border-orange-500 not-read-only:focus:enabled:border-orange-500 focus:ring-orange-500',
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
  color?: keyof (typeof inputClasses.variant)['active']['color'];
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
  size = 'DEFAULT',
  rounded = 'DEFAULT',
  variant = 'outline',
  color = 'DEFAULT',
  placeholder = '-',
  error,
  className,
  inputClassName,
  errorClassName,
  helperText,
  helperTextClassName,
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
      if (input) {
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
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          containerClasses.base,
          center && containerClasses.center,
          className
        )}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={addInputRefs(index)}
            type={type}
            inputMode={type === 'text' ? type : 'numeric'}
            defaultValue={value.split('')[index] || ''}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            placeholder={placeholder}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            className={cn(
              inputClasses.base,
              inputClasses.size[size],
              inputClasses.rounded[rounded],
              inputClasses.variant[variant].base,
              inputClasses.variant[variant].color[color],
              error && inputClasses.error,
              mask && 'password-dot',
              inputClassName
            )}
            {...props}
          />
        ))}
      </div>

      {!error && helperText && (
        <FieldHelperText size="DEFAULT" className={helperTextClassName}>
          {helperText}
        </FieldHelperText>
      )}
      {error && (
        <FieldError className={errorClassName} error={error} size="DEFAULT" />
      )}
    </div>
  );
}

export default PinCode;
