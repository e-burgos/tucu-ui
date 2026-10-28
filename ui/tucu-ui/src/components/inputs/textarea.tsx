'use client';

import { forwardRef, useId } from 'react';
import { cn } from '../../libs/cn';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';
import {
  type ControlColor,
  textControlToneAttributes,
  textControlToneClasses,
} from './helpers/control-colors';
import {
  type TextControlSize,
  textControlSizeClasses,
} from './helpers/control-sizes';

export const textareaVariantClasses = {
  ghost:
    'transition-shadow border border-border bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100',
  solid:
    'transition-colors bg-gray-200/70 hover:bg-gray-300 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  transparent: '',
};

const compactTextareaSizeClasses = 'min-h-14 px-2 py-1 text-xs';

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
  color?: ControlColor;
  /** Control size. `xs` is a compact control. Defaults to `md`. */
  size?: TextControlSize | 'xs';
  /** Extra classes for the outer container (merged with `className`) */
  wrapperClassName?: string;
  labelTextClassName?: string;
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
      wrapperClassName,
      labelTextClassName,
      useUppercaseLabel,
      helperText,
      color,
      size = 'md',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const messageId = `${textareaId}-message`;
    return (
    <div className={cn('text-sm sm:text-sm', className, wrapperClassName)}>
      <label>
        {label && (
          <span
            className={cn(
              'block font-medium text-gray-800 dark:text-gray-100',
              useUppercaseLabel
                ? 'mb-[8px] uppercase tracking-widest sm:mb-[12px]'
                : 'mb-[6px] ml-[6px]',
              labelTextClassName
            )}
          >
            {label}
            {required && (
              <sup className="inline-block text-[13px] text-red-600 dark:text-red-400 ltr:ml-[4px] rtl:mr-[4px]">
                *
              </sup>
            )}
          </span>
        )}
        <textarea
          ref={ref}
          data-tucu="textarea"
          data-variant={variant}
          data-color={color}
          data-size={size}
          id={textareaId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helperText ? messageId : undefined}
          {...props}
          {...textControlToneAttributes(variant, color)}
          className={cn(
            'block w-full placeholder-gray-500 transition-shadow duration-200 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-brand aria-invalid:border-red-500 dark:aria-invalid:border-red-400 user-invalid:border-red-500 dark:user-invalid:border-red-400 disabled:border-border disabled:bg-muted/10 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed dark:text-gray-100 rounded-xl',
            !color && 'focus:border-brand',
            size === 'xs'
              ? compactTextareaSizeClasses
              : textControlSizeClasses.textarea[size],
            color
              ? cn(textControlToneClasses[variant], 'text-gray-900')
              : textareaVariantClasses[variant],
            props.disabled ? 'bg-muted/10! cursor-not-allowed' : '',
            inputClassName
          )}
        />
      </label>
      {error && <FieldError id={messageId} error={error} size="md" />}
      {!error && helperText && (
        <FieldHelperText id={messageId} size="md">
          {helperText}
        </FieldHelperText>
      )}
    </div>
    );
  }
);

export default Textarea;
