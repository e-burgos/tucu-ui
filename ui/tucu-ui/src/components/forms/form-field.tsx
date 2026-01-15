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
import { ControllerRenderProps } from 'react-hook-form';

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
}: FormFieldProps<TFormValues>) => {
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

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        {...(rules ? { rules } : {})}
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
          const baseProps = {
            ...field,
            id: name,
            label: label || (children.props as { label?: string })?.label,
            ...(children.props as { [key: string]: unknown }),
          };

          // Clone the child element with the field props
          const childProps = {
            ...baseProps,
            // For Select, ensure we're passing the value correctly
            ...(isSelect && {
              value: field.value,
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
            // This must come last to override any conflicting props
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
        <FieldErrorText error={errorMessage as string} size="md" />
      )}

      {!errorMessage && showHelper && helperText && (
        <FieldHelperText size="md">{helperText}</FieldHelperText>
      )}
    </div>
  );
};

export default FormField;
