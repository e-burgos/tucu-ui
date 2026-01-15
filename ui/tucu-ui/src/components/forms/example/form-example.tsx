import React from 'react';
import { Form } from '../form';
import { FormField } from '../form-field';
import {
  Input,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
} from '../../inputs';
import { defaultValues, formValidations, FormValues } from './validations';
import { Button } from '../../buttons';
import { ErrorContainerExample } from './error-container-example';
import { FormMethodsExample } from './form-methods-example';
import { CardContainer } from '../../cards';

const countryOptions = [
  { name: 'Argentina', value: 'ar' },
  { name: 'Brasil', value: 'br' },
  { name: 'Chile', value: 'cl' },
  { name: 'Colombia', value: 'co' },
  { name: 'México', value: 'mx' },
];

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Disclaimer = () => {
  return (
    <div className="p-[16px] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-[8px]">
        Form with Centralized Validation
      </h3>
      <p className="text-sm text-blue-700 dark:text-blue-400">
        This example demonstrates a form with validation rules defined centrally
        in a separate file. The validation rules are passed to the Form
        component via the validationSchema prop, eliminating the need to define
        rules on each FormField component.
      </p>
    </div>
  );
};

export const FormExample: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!');
  };

  return (
    <div className="w-full space-y-[24px]">
      <Disclaimer />
      <CardContainer className="w-full mx-auto p-[24px]  rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-[24px] text-center">
          Form Example
        </h2>
        <Form<FormValues>
          onSubmit={handleSubmit}
          validationSchema={formValidations}
          useFormProps={{
            defaultValues: defaultValues,
            mode: 'onChange',
          }}
          className="w-full"
        >
          <div className="space-y-[16px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
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
              <Select label="Country" options={countryOptions} />
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
              <Radio label="Are you a developer?" value="yes" />
            </FormField>

            <FormField<FormValues> name="acceptTerms" hideError>
              <Checkbox label="I accept the terms and conditions (with hideError prop)" />
            </FormField>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>

          <ErrorContainerExample />
          <FormMethodsExample />
        </Form>
      </CardContainer>
    </div>
  );
};

export default FormExample;
