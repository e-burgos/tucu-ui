import React from 'react';
import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

const switchVariantClasses = {
  ghost: {
    unchecked:
      'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
    checked: 'bg-brand',
  },
  solid: {
    unchecked: 'bg-gray-200/70 dark:bg-gray-800',
    checked: 'bg-brand',
  },
  transparent: {
    unchecked: 'bg-transparent border border-gray-200 dark:border-gray-700',
    checked: 'bg-brand',
  },
};

export interface SwitchProps {
  label?: string | React.ReactNode;
  offLabel?: string | React.ReactNode;
  onLabel?: string | React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'ghost' | 'solid' | 'transparent';
  className?: string;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  offLabel,
  onLabel,
  checked,
  onChange,
  variant = 'ghost',
  className,
  errorMessage,
  helperText,
  disabled,
}) => {
  return (
    <div className="flex flex-col">
      <label
        className={cn(
          'flex items-center relative w-max cursor-pointer select-none',
          disabled && 'cursor-not-allowed',
          className
        )}
      >
        {label && (
          <span
            className={cn(
              'text-sm mr-[12px]',
              disabled && 'text-gray-500 cursor-not-allowed'
            )}
          >
            {typeof label === 'string'
              ? label
              : React.cloneElement(
                  label as React.ReactElement<{ className: string }>,
                  { className: 'text-sm mr-[12px]' }
                )}
          </span>
        )}
        <input
          style={{
            backgroundImage: `url(${checked ? '' : ''})`,
          }}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={cn(
            'appearance-none transition-colors cursor-pointer w-[56px] h-[28px] rounded-full focus:outline-hidden focus:ring-[2px] focus:ring-offset-[2px] focus:ring-offset-black focus:ring-brand/50',
            disabled &&
              'cursor-not-allowed! bg-muted/10! border-gray-200! dark:border-gray-700!',
            checked
              ? switchVariantClasses[variant].checked
              : switchVariantClasses[variant].unchecked
          )}
        />
        <span
          className={cn(
            'absolute font-medium text-sm uppercase right-[4px] transition-colors',
            disabled && 'text-gray-500 cursor-not-allowed',
            checked
              ? 'text-white'
              : variant === 'ghost'
              ? 'text-gray-600 dark:text-gray-300'
              : variant === 'solid'
              ? 'text-gray-700 dark:text-gray-300'
              : 'text-gray-600 dark:text-gray-300'
          )}
        >
          {offLabel || 'OFF'}
        </span>
        <span
          className={cn(
            'absolute font-medium text-sm uppercase right-[32px] transition-colors',
            disabled && 'text-gray-500 cursor-not-allowed',
            checked
              ? 'text-white'
              : variant === 'ghost'
              ? 'text-gray-600 dark:text-gray-300'
              : variant === 'solid'
              ? 'text-gray-700 dark:text-gray-300'
              : 'text-gray-600 dark:text-gray-300'
          )}
        >
          {onLabel || 'ON'}
        </span>
        <span
          className={cn(
            'w-[28px] h-[28px] right-[28px] absolute rounded-full transform transition-transform bg-gray-200 dark:bg-gray-300',
            checked ? 'translate-x-[28px]' : 'translate-x-0',
            disabled && 'bg-gray-200 dark:bg-gray-300 cursor-not-allowed'
          )}
        />
      </label>
      {errorMessage && <FieldError error={errorMessage} size="md" />}
      {helperText && <FieldHelperText size="md">{helperText}</FieldHelperText>}
    </div>
  );
};

export default Switch;
