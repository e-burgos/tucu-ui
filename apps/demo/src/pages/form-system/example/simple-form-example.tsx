import React from 'react';
import { defaultValues, formValidations, type FormValues } from './validations';
import { countryOptions, genderOptions } from './constants';

import {
  Button,
  Form,
  FormField,
  Input,
  Checkbox,
  Textarea,
  InputSelect,
  RadioGroup,
  Radio,
  useToastStore,
} from '@e-burgos/tucu-ui';

export const SimpleFormExample: React.FC = () => {
  const { addToast } = useToastStore();
  const handleSubmit = (values: FormValues) => {
    addToast({
      id: Date.now().toString(),
      title: 'Form submitted successfully!',
      message: JSON.stringify(values, null, 2),
      variant: 'success',
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="p-6 bg-white dark:bg-light-dark rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Form Example</h2>
        <Form<FormValues>
          onSubmit={handleSubmit}
          validationSchema={formValidations}
          useFormProps={{
            defaultValues: defaultValues,
            mode: 'onChange',
          }}
          className={'grid grid-cols-1 gap-4'}
        >
          <div className="w-full space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField<FormValues> name="name" label="Name">
                <Input placeholder="Ingresa tu nombre" />
              </FormField>

              <FormField<FormValues> name="email" label="Email">
                <Input type="email" placeholder="ejemplo@correo.com" />
              </FormField>
            </div>

            <FormField<FormValues> name="password" label="Password">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </FormField>

            <FormField<FormValues>
              name="message"
              label="Message"
              helperText="Write a detailed message"
              showHelper
            >
              <Textarea
                label="Message"
                placeholder="Write your message here"
                rows={4}
              />
            </FormField>

            <FormField<FormValues> name="country" label="Country">
              <InputSelect label="Country" options={countryOptions} />
            </FormField>

            <FormField<FormValues> name="age" label="Age">
              <Input type="number" placeholder="Enter your age" />
            </FormField>

            <FormField<FormValues> name="gender" label="Gender">
              <RadioGroup label="Gender" options={genderOptions} />
            </FormField>

            <FormField<FormValues>
              name="isDeveloper"
              label="Are you a developer?"
            >
              <Radio label="Yes" />
            </FormField>

            <FormField<FormValues> name="acceptTerms" hideError>
              <Checkbox label="I accept the terms and conditions" />
            </FormField>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SimpleFormExample;
