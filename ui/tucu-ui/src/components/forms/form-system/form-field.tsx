import React from 'react';
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  FieldError as FormFieldError,
  RegisterOptions,
  FieldErrors,
} from 'react-hook-form';
import { FieldError } from '../field-error-text';
import { FieldHelperText } from '../field-helper-text';
import { InputSelect } from '../input-select';
import { Checkbox } from '../checkbox';
import { Radio } from '../radio';
import { PinCode } from '../pin-code';

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
        render={({ field }) => {
          // Check if the child is an InputSelect component
          const isInputSelect = children.type === InputSelect;
          // Check if the child is a Checkbox component
          const isCheckbox = children.type === Checkbox;
          // Check if the child is a Radio component
          const isRadio = children.type === Radio;
          // Check if the child is a PinCode component
          const isPinCode = children.type === PinCode;
          // Clone the child element with the field props
          const childProps = {
            ...field,
            id: name,
            label: label || children.props.label,
            ...children.props,
            // For InputSelect, ensure we're passing the value correctly
            ...(isInputSelect && {
              value: field.value,
              onChange: (option: any) => {
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
              value: field.value || '',
              onChange: (value: string) => field.onChange(value),
            }),
          };

          return React.cloneElement(children, childProps);
        }}
      />

      {!hideError && errorMessage && (
        <FieldError error={errorMessage as string} size="DEFAULT" />
      )}

      {!errorMessage && showHelper && helperText && (
        <FieldHelperText size="DEFAULT">{helperText}</FieldHelperText>
      )}
    </div>
  );
};

export default FormField;
