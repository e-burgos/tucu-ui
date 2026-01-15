import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Alert,
  LucideIcons,
  BasicTable,
} from '../../../../index';

const ValidationSystemSection: React.FC = () => {
  const validationRulesColumns = [
    { key: 'rule', label: 'Rule' },
    { key: 'example', label: 'Example' },
    { key: 'description', label: 'Description' },
  ];

  const validationRulesData = [
    {
      rule: 'required',
      example: "required: 'Field is required'",
      description: 'Makes field required',
    },
    {
      rule: 'minLength',
      example: "minLength: { value: 2, message: '...' }",
      description: 'Minimum string length',
    },
    {
      rule: 'maxLength',
      example: "maxLength: { value: 100, message: '...' }",
      description: 'Maximum string length',
    },
    {
      rule: 'pattern',
      example: "pattern: { value: /regex/, message: '...' }",
      description: 'Regex pattern validation',
    },
    {
      rule: 'min',
      example: "min: { value: 18, message: '...' }",
      description: 'Minimum numeric value',
    },
    {
      rule: 'max',
      example: "max: { value: 100, message: '...' }",
      description: 'Maximum numeric value',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Validation System
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Centralized validation with built-in and custom rules
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Validation Approaches" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              You can define validation in two ways:
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <LucideIcons.FileText className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Centralized Validation Schema
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Define all validation rules in a single schema object and pass
                  it to the Form component. This eliminates the need to define
                  rules on each FormField.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { FormValidations } from '@e-burgos/tucu-ui';

export const formValidations: FormValidations<FormValues> = {
  name: {
    required: 'This is a required field.',
    minLength: {
      value: 2,
      message: 'The name must be at least 2 characters long.',
    },
  },
  email: {
    required: 'This is a required field.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
      message: 'Invalid email address.',
    },
  },
};

// Use in Form component
<Form<FormValues>
  onSubmit={handleSubmit}
  validationSchema={formValidations}
  useFormProps={{ defaultValues }}
>
  {/* FormFields don't need rules prop */}
  <FormField<FormValues> name="name" label="Name">
    <Input />
  </FormField>
</Form>`}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Per-Field Validation
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Define validation rules directly on each FormField using the{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    rules
                  </code>{' '}
                  prop. Useful for field-specific validation.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`<FormField<FormValues>
  name="password"
  label="Password"
  rules={{
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    validate: {
      strength: (value) => {
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\\d/.test(value);
        
        if (!hasUpper || !hasLower || !hasNumber) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return true;
      }
    }
  }}
>
  <Input type="password" />
</FormField>`}
                />
              </div>
            </div>

            <Alert variant="info" dismissible={false}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LucideIcons.Info className="h-4 w-4" />
                  <Typography tag="span" className="font-semibold">
                    Validation Schema vs Rules Prop
                  </Typography>
                </div>
                <Typography tag="p" className="text-sm">
                  <strong>validationSchema:</strong> Centralized validation for
                  all fields. Rules are automatically applied.{' '}
                  <strong>rules prop:</strong> Field-specific validation that
                  overrides schema rules for that field. Both can be used
                  together, with{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    rules
                  </code>{' '}
                  taking precedence.
                </Typography>
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Available Validation Rules" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Complete list of validation rules supported by React Hook Form:
            </Typography>
            <BasicTable
              columns={validationRulesColumns.map((col) => ({
                ...col,
                render: (value: unknown) => {
                  if (col.key === 'rule') {
                    return (
                      <code className="text-xs text-brand">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'example') {
                    return (
                      <code className="text-xs text-gray-600 dark:text-gray-400">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'description') {
                    return (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {String(value ?? '')}
                      </span>
                    );
                  }
                  return String(value ?? '');
                },
              }))}
              data={validationRulesData as Array<Record<string, unknown>>}
              containerClassName="mb-4"
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ValidationSystemSection;
