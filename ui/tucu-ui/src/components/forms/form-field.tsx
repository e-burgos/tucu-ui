'use client';

import React from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
  FieldErrors,
  FormFieldError,
} from './hook-form';

import { FieldError as FieldErrorText } from '../inputs/helpers/field-error-text';
import { FieldHelperText } from '../inputs/helpers/field-helper-text';
import { Select, SelectOption } from '../inputs/select';
import { Checkbox } from '../inputs/checkbox';
import { Radio } from '../inputs/radio';
import { PinCode } from '../inputs/pin-code';
import { ControllerRenderProps, Validate } from 'react-hook-form';
import { Input } from '../inputs/input';
import { Textarea } from '../inputs/textarea';
import { inferValidationType, validateField } from './validators';
import { useTucuLang } from '../../libs/i18n/use-tucu-messages';
import { getTucuMessages } from '../../libs/i18n/messages';

export interface FormFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: string;
  helperText?: string;
  className?: string;
  rules?: Omit<
    RegisterOptions<TFormValues, Path<TFormValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  children: React.ReactElement;
  hideError?: boolean;
  showHelper?: boolean;
  /**
   * Adds the built-in validator inferred from the child `Input`
   * (`type="email" | "tel" | "url"`, `mask="phone" | "cuit"`,
   * `validationType`) and localizes `required: true`. Your own `rules`
   * still run. Default `true`.
   */
  autoValidate?: boolean;
}

export const FormField = <TFormValues extends FieldValues = FieldValues>({
  name,
  label,
  helperText,
  className,
  rules,
  children,
  hideError = false,
  showHelper = false,
  autoValidate = true,
}: FormFieldProps<TFormValues>) => {
  const lang = useTucuLang();
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  // Get nested error using lodash-like get function
  const getNestedError = (
    obj: FieldErrors<TFormValues>,
    path: string
  ): FormFieldError | undefined => {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = (current as Record<string, unknown>)[key];
    }

    return current as FormFieldError | undefined;
  };

  const error = getNestedError(errors, name);
  const errorMessage = error?.message;

  const childProps = children.props as Record<string, unknown>;
  const isInput = children.type === Input;
  const autoType =
    autoValidate && isInput && childProps.autoValidate !== false
      ? inferValidationType({
          type: childProps.type as string | undefined,
          mask: childProps.mask,
          validationType: childProps.validationType as never,
        })
      : undefined;

  const mergedRules = (() => {
    if (!autoValidate) return rules;
    const next = { ...(rules ?? {}) } as Record<string, unknown>;
    if (next.required === true) {
      const validation = getTucuMessages(lang).validation;
      next.required =
        autoType === 'email' ? validation.requiredEmail : validation.required;
    }
    if (autoType && autoType !== 'required') {
      const mask = childProps.mask;
      const autoValidator: Validate<unknown, TFormValues> = (value) =>
        validateField(autoType, value, {
          lang,
          message: childProps.validationMessage as string | undefined,
          phoneCountry:
            (childProps.phoneCountry as string | undefined) ??
            (mask === 'phone' ? 'AR' : 'INTL'),
        }) ?? true;
      const userValidate = next.validate;
      next.validate =
        typeof userValidate === 'function'
          ? { custom: userValidate, [autoType]: autoValidator }
          : { ...(userValidate as object), [autoType]: autoValidator };
    }
    return Object.keys(next).length > 0 ? (next as typeof rules) : undefined;
  })();

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        {...(mergedRules ? { rules: mergedRules } : {})}
        render={({
          field,
        }: {
          field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
        }) => {
          // Check if the child is an Select component
          const isSelect = children.type === Select;
          // Check if the child is a Checkbox component
          const isCheckbox = children.type === Checkbox;
          // Check if the child is a Radio component
          const isRadio = children.type === Radio;
          // Check if the child is a PinCode component
          const isPinCode = children.type === PinCode;

          // Base props from field and children
          // Normalize field.value to avoid React "uncontrolled to controlled" warnings:
          // when react-hook-form hasn't initialized a field yet, value can be undefined.
          const normalizedValue =
            isCheckbox || isRadio ? !!field.value : field.value ?? '';

          const baseProps = {
            ...field,
            value: normalizedValue,
            id: name,
            label: label || (children.props as { label?: string })?.label,
            // FormField shows the error below the control; the Input only
            // reflects the invalid state and skips its own validation.
            ...(isInput && { autoValidate: false }),
            ...((isInput || children.type === Textarea) && {
              'aria-invalid': errorMessage ? 'true' : 'false',
              ...(errorMessage && { 'aria-describedby': `${name}-error` }),
            }),
            ...(children.props as { [key: string]: unknown }),
          };

          // Clone the child element with the field props
          const childProps = {
            ...baseProps,
            // For Select, ensure we're passing the value correctly
            ...(isSelect && {
              value: field.value ?? '',
              onChange: (option: SelectOption) => {
                // If the option has a value property, use that
                const value =
                  option?.value !== undefined ? option.value : option;
                field.onChange(value);
              },
            }),
            // For Checkbox, ensure we're passing the checked prop correctly
            ...(isCheckbox && {
              checked: !!field.value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.checked);
              },
            }),
            // For Radio, ensure we're passing the checked prop correctly
            ...(isRadio && {
              checked: !!field.value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.checked);
              },
            }),
            // For PinCode, ensure we're passing the value and onChange correctly
            ...(isPinCode && {
              value: field.value ?? '',
              onChange: (value: string) => {
                field.onChange(value);
              },
            }),
          };

          return React.cloneElement(children, childProps);
        }}
      />

      {!hideError && errorMessage && (
        <FieldErrorText
          id={`${name}-error`}
          error={errorMessage as string}
          size="md"
        />
      )}

      {!errorMessage && showHelper && helperText && (
        <FieldHelperText size="md">{helperText}</FieldHelperText>
      )}
    </div>
  );
};

export default FormField;
