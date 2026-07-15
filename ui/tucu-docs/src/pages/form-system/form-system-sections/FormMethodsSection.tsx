import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const FormMethodsSection: React.FC = () => {
  const methodsCode = `import { useFormContext } from '@e-burgos/tucu-ui';

function FormActions() {
  const {
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext<FormValues>();

  // Watch specific field changes
  const nameValue = watch('name');

  // Reset to default values
  const handleReset = () => reset(defaultValues);

  // Trigger validation on all fields
  const handleValidate = async () => {
    const result = await trigger();
    console.log('All fields valid:', result);
  };

  // Set value programmatically (triggers validation)
  const handleSetValue = () => {
    setValue('name', 'John Doe', { shouldValidate: true });
  };

  // Get current values snapshot
  const handleGetValues = () => {
    const values = getValues();
    console.log('Current values:', values);
  };

  return (
    <div className="space-y-4">
      <p>Name: {nameValue}</p>
      <p>Dirty: {isDirty ? 'Yes' : 'No'}</p>
      <p>Valid: {isValid ? 'Yes' : 'No'}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleValidate}>Validate</button>
      <button onClick={handleSetValue}>Set Value</button>
      <button onClick={handleGetValues}>Get Values</button>
    </div>
  );
}

// Must be inside <Form> to access context
<Form<FormValues> onSubmit={handleSubmit}>
  <FormActions />
  {/* form fields */}
</Form>`;

  const stateProperties = [
    { name: 'errors', description: 'Object containing all field errors' },
    { name: 'isDirty', description: 'True if any field has been modified' },
    { name: 'isValid', description: 'True if form passes all validations' },
    {
      name: 'isSubmitting',
      description: 'True during async form submission',
    },
    {
      name: 'dirtyFields',
      description: 'Object of fields that have been modified',
    },
    {
      name: 'touchedFields',
      description: 'Object of fields that have been focused/blurred',
    },
  ];

  const methods = [
    {
      name: 'reset(values?)',
      description: 'Reset form to defaults or provided values',
    },
    {
      name: 'trigger(name?)',
      description: 'Trigger validation for all fields or a specific field',
    },
    {
      name: 'setValue(name, value, options?)',
      description: 'Set a field value programmatically',
    },
    {
      name: 'getValues(name?)',
      description: 'Get current form values (all or specific field)',
    },
    {
      name: 'watch(name?)',
      description: 'Subscribe to field changes (causes re-render)',
    },
    {
      name: 'setError(name, error)',
      description: 'Manually set an error on a field',
    },
    {
      name: 'clearErrors(name?)',
      description: 'Clear errors for all fields or a specific field',
    },
  ];

  return (
    <>
      <HeroCard
        title="Form Methods"
        description="Access react-hook-form methods via useFormContext inside any child of Form. Programmatically control values, trigger validation, and read form state."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Terminal className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            useFormContext Example
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Access form state and methods from any component inside Form
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock language="tsx" code={methodsCode} />
          </div>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            API Reference
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Form state properties and available methods
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <LucideIcons.Activity className="w-5 h-5 text-brand" />
                <Typography tag="h3" className="font-semibold">
                  formState Properties
                </Typography>
              </div>
              <div className="space-y-2">
                {stateProperties.map((prop, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <LucideIcons.Circle className="w-3 h-3 text-brand mt-1.5 shrink-0" />
                    <div>
                      <code className="text-xs text-brand font-semibold">
                        {prop.name}
                      </code>
                      <Typography
                        tag="span"
                        className="text-xs text-gray-500 dark:text-gray-400 ml-2"
                      >
                        — {prop.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContainer>

          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <LucideIcons.Wrench className="w-5 h-5 text-brand" />
                <Typography tag="h3" className="font-semibold">
                  Methods
                </Typography>
              </div>
              <div className="space-y-2">
                {methods.map((method, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <LucideIcons.Circle className="w-3 h-3 text-brand mt-1.5 shrink-0" />
                    <div>
                      <code className="text-xs text-brand font-semibold">
                        {method.name}
                      </code>
                      <Typography
                        tag="span"
                        className="text-xs text-gray-500 dark:text-gray-400 ml-2"
                      >
                        — {method.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default FormMethodsSection;
