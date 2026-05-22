import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
  BasicTable,
} from '../../../../index';

const ValidationSystemSection: React.FC = () => {
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
    {
      rule: 'validate',
      example: "validate: { custom: (v) => v > 0 || '...' }",
      description: 'Custom validation function(s)',
    },
  ];

  const validationRulesColumns = [
    {
      key: 'rule',
      label: 'Rule',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'example',
      label: 'Example',
      render: (value: unknown) => (
        <code className="text-xs text-gray-600 dark:text-gray-400">
          {String(value)}
        </code>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: unknown) => (
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {String(value)}
        </span>
      ),
    },
  ];

  const centralizedCode = `import { FormValidations } from '@e-burgos/tucu-ui';

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

// Pass to Form — rules auto-applied to all FormFields
<Form<FormValues>
  onSubmit={handleSubmit}
  validationSchema={formValidations}
  useFormProps={{ defaultValues }}
>
  <FormField<FormValues> name="name" label="Name">
    <Input />
  </FormField>
</Form>`;

  const perFieldCode = `<FormField<FormValues>
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
          return 'Must contain uppercase, lowercase, and number';
        }
        return true;
      }
    }
  }}
>
  <Input type="password" />
</FormField>`;

  return (
    <>
      <HeroCard
        title="Validation System"
        description="Centralized or per-field validation powered by react-hook-form rules. Supports required, pattern, min/max, and custom async validators."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Validation Approaches
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Two ways to define validation — centralized schema or per-field
            rules
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Centralized Schema" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <LucideIcons.FileText className="w-5 h-5 text-white" />
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Define all rules in one{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      FormValidations
                    </code>{' '}
                    object, pass to Form via{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      validationSchema
                    </code>
                    .
                  </Typography>
                </div>
                <CodeBlock language="tsx" code={centralizedCode} />
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer className="overflow-hidden">
            <CardTitle title="Per-Field Rules" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white" />
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Define rules directly on{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      FormField
                    </code>{' '}
                    via the{' '}
                    <code className="px-1 py-0.5 border border-border rounded text-xs">
                      rules
                    </code>{' '}
                    prop. Overrides schema for that field.
                  </Typography>
                </div>
                <CodeBlock language="tsx" code={perFieldCode} />
              </div>
            </CardTitle>
          </CardContainer>
        </div>

        <Alert variant="info" dismissible={false}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LucideIcons.Info className="h-4 w-4" />
              <Typography tag="span" className="font-semibold">
                Priority
              </Typography>
            </div>
            <Typography tag="p" className="text-sm">
              Both approaches can be used together. The{' '}
              <code className="px-1 py-0.5 border border-border rounded text-xs">
                rules
              </code>{' '}
              prop on FormField takes precedence over{' '}
              <code className="px-1 py-0.5 border border-border rounded text-xs">
                validationSchema
              </code>{' '}
              for that specific field.
            </Typography>
          </div>
        </Alert>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Rules
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            All validation rules supported by the form system
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={validationRulesColumns}
              data={validationRulesData as Array<Record<string, unknown>>}
            />
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default ValidationSystemSection;
