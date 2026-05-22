import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const BasicUsageSection: React.FC = () => {
  const stepOneCode = `export interface FormValues {
  name: string;
  email: string;
  password: string;
  message: string;
  acceptTerms: boolean;
  age: number;
  gender: string;
  country: string;
}`;

  const stepTwoCode = `export const defaultValues: FormValues = {
  name: '',
  email: '',
  password: '',
  message: '',
  acceptTerms: false,
  age: 0,
  gender: '',
  country: 'ar',
};`;

  const stepThreeCode = `import { Form, FormField, Input, Button } from '@e-burgos/tucu-ui';

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
}`;

  return (
    <>
      <HeroCard
        title="Basic Usage"
        description="Get started with the form system in three steps: define your types, set defaults, and compose your form with Form + FormField."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Step by Step
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Three steps to create a fully typed, validated form
          </Typography>
        </div>

        <div className="space-y-6">
          <CardContainer className="overflow-hidden">
            <CardTitle
              title="1. Define Form Values Interface"
              className="mt-2 mb-2"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Start by defining a TypeScript interface for your form data.
                  This enables type-safe field names and submission handlers.
                </Typography>
                <CodeBlock language="tsx" code={stepOneCode} />
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer className="overflow-hidden">
            <CardTitle title="2. Create Default Values" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Define default values matching your interface. These
                  initialize the form and are used by{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    reset()
                  </code>
                  .
                </Typography>
                <CodeBlock language="ts" code={stepTwoCode} />
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer className="overflow-hidden">
            <CardTitle title="3. Compose the Form" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Use{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    {'<Form>'}
                  </code>{' '}
                  as the container and{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    {'<FormField>'}
                  </code>{' '}
                  to wrap each input. FormField handles registration, error
                  display, and labeling.
                </Typography>
                <CodeBlock language="tsx" code={stepThreeCode} />
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default BasicUsageSection;
