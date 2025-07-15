/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type {
  SubmitHandler,
  UseFormProps,
  FieldValues,
  UseFormReturn,
} from './hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValidations } from './types/validations.type';
import cn from 'classnames';

export type RenderFunction<TFormValues extends FieldValues> = (
  methods: UseFormReturn<TFormValues>
) => React.ReactNode;

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode | RenderFunction<TFormValues>;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: FormValidations<TFormValues>;
  className?: string;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  className,
  ...formProps
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
  });

  const { register } = methods;

  if (validationSchema) {
    Object.entries(validationSchema).forEach(([fieldName, rules]) => {
      if (rules) {
        register(fieldName as any, rules as any);
      }
    });
  }

  const renderChildren = () => {
    if (typeof children === 'function') {
      return (children as RenderFunction<TFormValues>)(methods);
    }
    return children;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        {...formProps}
        className={cn('space-y-4', className)}
      >
        {renderChildren()}
      </form>
    </FormProvider>
  );
};

export default Form;
