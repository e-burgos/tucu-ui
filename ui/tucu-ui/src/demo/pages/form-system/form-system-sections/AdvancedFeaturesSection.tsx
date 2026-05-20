import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
  FeatureCard,
} from '../../../../index';

const AdvancedFeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Conditional Fields',
      description:
        'Show/hide fields based on other values using watch(). Validation adapts dynamically when fields appear or disappear.',
      icon: <LucideIcons.GitBranch className="w-6 h-6" />,
    },
    {
      title: 'Custom Validation',
      description:
        'Use the validate option for async server-side checks, cross-field validation, or complex business rules.',
      icon: <LucideIcons.Zap className="w-6 h-6" />,
    },
    {
      title: 'Form State Access',
      description:
        'Real-time access to isDirty, isValid, errors, touchedFields via useFormContext from any child component.',
      icon: <LucideIcons.Eye className="w-6 h-6" />,
    },
    {
      title: 'Programmatic Control',
      description:
        'Set values, trigger validation, reset forms, and clear errors programmatically from anywhere in the tree.',
      icon: <LucideIcons.Settings className="w-6 h-6" />,
    },
    {
      title: 'Validation Modes',
      description:
        'Choose when validation triggers: onChange (real-time), onBlur (on field exit), onSubmit (only on submit), or all.',
      icon: <LucideIcons.Clock className="w-6 h-6" />,
    },
    {
      title: 'Error Customization',
      description:
        'FormField auto-displays errors, but you can hide them with hideError and render custom error UI using formState.errors.',
      icon: <LucideIcons.AlertTriangle className="w-6 h-6" />,
    },
  ];

  const conditionalCode = `import { Form, FormField, Input, Select, useFormContext } from '@e-burgos/tucu-ui';

function ConditionalForm() {
  return (
    <Form<FormValues> onSubmit={handleSubmit} useFormProps={{ defaultValues }}>
      <FormField name="hasCompany" label="Do you have a company?">
        <Select options={[
          { name: 'Yes', value: 'yes' },
          { name: 'No', value: 'no' },
        ]} />
      </FormField>
      
      {/* Conditional field rendered via watch */}
      <CompanyField />
      
      <Button type="submit">Submit</Button>
    </Form>
  );
}

function CompanyField() {
  const { watch } = useFormContext<FormValues>();
  const hasCompany = watch('hasCompany');

  if (hasCompany !== 'yes') return null;

  return (
    <FormField name="companyName" label="Company Name" rules={{ required: 'Required' }}>
      <Input placeholder="Enter company name" />
    </FormField>
  );
}`;

  return (
    <>
      <HeroCard
        title="Advanced Features"
        description="Patterns for complex form scenarios: conditional fields, async validation, programmatic control, and custom error handling — all powered by react-hook-form via tucu-ui."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-pink-500 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Capabilities
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Advanced patterns available through the form system
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Conditional Fields Example
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Show/hide fields based on form values using watch + useFormContext
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock language="tsx" code={conditionalCode} />
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default AdvancedFeaturesSection;
