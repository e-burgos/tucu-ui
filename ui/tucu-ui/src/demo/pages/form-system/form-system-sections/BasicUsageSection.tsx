import React from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock } from '../../../../index';

const BasicUsageSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Basic Usage
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Get started with forms in just a few steps
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="1. Define Form Values Interface"
          className="mt-2 mb-2"
        >
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Start by defining a TypeScript interface for your form data:
            </Typography>
            <CodeBlock
              language="tsx"
              code={`export interface FormValues {
  name: string;
  email: string;
  password: string;
  message: string;
  acceptTerms: boolean;
  age: number;
  gender: string;
  country: string;
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="2. Create Default Values" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Define default values for your form fields:
            </Typography>
            <CodeBlock
              language="ts"
              code={`export const defaultValues: FormValues = {
  name: '',
  email: '',
  password: '',
  message: '',
  acceptTerms: false,
  age: 0,
  gender: '',
  country: 'ar',
};`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="3. Basic Form Structure" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Create your form using the Form and FormField components:
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { Form, FormField, Input, Button } from '@e-burgos/tucu-ui';

function ContactForm() {
  const handleSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      useFormProps={{
        defaultValues: defaultValues,
        mode: 'onChange',
      }}
    >
      <FormField<FormValues> name="name" label="Name">
        <Input placeholder="Enter your name" />
      </FormField>

      <FormField<FormValues> name="email" label="Email">
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <Button type="submit">Submit</Button>
    </Form>
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default BasicUsageSection;

