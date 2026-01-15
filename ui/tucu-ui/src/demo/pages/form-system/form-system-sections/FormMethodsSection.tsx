import React from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, LucideIcons } from '../../../../index';

const FormMethodsSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Form Methods
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Access React Hook Form methods through useFormContext
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Using Form Methods" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              You can access all React Hook Form methods through{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded text-xs">
                useFormContext
              </code>
              . This allows you to programmatically control the form.
            </Typography>

            <CodeBlock
              language="tsx"
              code={`import { useFormContext } from '@e-burgos/tucu-ui';

function FormMethodsExample() {
  const {
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext<FormValues>();

  // Watch specific field
  const nameValue = watch('name');

  // Reset form
  const handleReset = () => {
    reset(defaultValues);
  };

  // Validate all fields
  const handleValidate = async () => {
    const result = await trigger();
    console.log('Validation result:', result);
  };

  // Set value programmatically
  const handleSetValue = () => {
    setValue('name', 'John Doe', { shouldValidate: true });
  };

  // Get all values
  const handleGetValues = () => {
    const values = getValues();
    console.log('Current values:', values);
  };

  return (
    <div className="space-y-4">
      <p>Name value: {nameValue}</p>
      <p>Is dirty: {isDirty ? 'Yes' : 'No'}</p>
      <p>Is valid: {isValid ? 'Yes' : 'No'}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleValidate}>Validate</button>
      <button onClick={handleSetValue}>Set Value</button>
      <button onClick={handleGetValues}>Get Values</button>
    </div>
  );
}

// Usage inside Form component
<Form<FormValues> onSubmit={handleSubmit}>
  <FormMethodsExample />
  {/* Your form fields */}
</Form>`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold text-sm">
                  Form State Properties
                </Typography>
                <ul className="space-y-2 text-sm">
                  {[
                    'errors - Object containing all field errors',
                    'isDirty - True if any field has been modified',
                    'isValid - True if form passes all validations',
                    'isSubmitting - True during form submission',
                    'isLoading - True if form is loading',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 text-primary mt-1 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold text-sm">
                  Form Methods
                </Typography>
                <ul className="space-y-2 text-sm">
                  {[
                    'reset() - Reset form to default values',
                    'trigger() - Manually trigger validation',
                    'setValue() - Set field value programmatically',
                    'getValues() - Get current form values',
                    'watch() - Watch specific field changes',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <LucideIcons.Circle className="w-3 h-3 text-primary mt-1 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default FormMethodsSection;

