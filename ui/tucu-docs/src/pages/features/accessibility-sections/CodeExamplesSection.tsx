import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  CodeBlock,
  CardContainer,
} from '@e-burgos/tucu-ui';

const CodeExamplesSection: React.FC = () => {
  const examples = [
    {
      title: 'Accessible Input with Error',
      description:
        'Input automatically connects label, error, and helper text via aria attributes.',
      code: `import { Input } from '@e-burgos/tucu-ui';

// Input auto-generates IDs with useId()
// label uses htmlFor → input id
// helperText → aria-describedby
// error → aria-invalid="true"
// required → aria-required="true"
<Input
  label="Email Address"
  placeholder="you@example.com"
  required
  error="Please enter a valid email"
  helperText="We'll never share your email"
  variant="ghost"
/>`,
    },
    {
      title: 'Accessible Modal',
      description:
        'Modal provides dialog semantics, Escape key, and focus restoration. Note: lacks focus trapping.',
      code: `import { Modal } from '@e-burgos/tucu-ui';

// role="dialog" + aria-modal="true"
// aria-labelledby → title text
// aria-describedby → content text
// Escape key closes
// Focus restores to trigger on close
// ⚠️ Tab can escape modal (no focus trap)
<Modal
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  onClose={() => console.log('closed')}
  text={{
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    button: 'Confirm',
    backButton: 'Cancel',
  }}
/>`,
    },
    {
      title: 'Accessible Alert',
      description:
        'Alert uses live regions so screen readers announce content changes immediately.',
      code: `import { Alert } from '@e-burgos/tucu-ui';

// role="alert" → immediate announcement
// aria-live="assertive" + aria-atomic="true"
// Dismiss button has aria-label="Dismiss alert"
// Supports custom aria-label
<Alert
  variant="warning"
  dismissible={true}
  aria-label="Important notification"
>
  Your session will expire in 5 minutes.
</Alert>`,
    },
    {
      title: 'Form with FormField',
      description:
        'FormField wraps react-hook-form Controller and auto-wires errors to child components.',
      code: `import { Form, FormField, Input, Select } from '@e-burgos/tucu-ui';

<Form onSubmit={handleSubmit}>
  {/* FormField auto-injects error prop from form state */}
  <FormField
    name="email"
    label="Email"
    rules={{ required: 'Email is required' }}
  >
    <Input variant="ghost" placeholder="Enter email" />
  </FormField>

  <FormField
    name="role"
    label="Role"
    rules={{ required: 'Role is required' }}
  >
    <Select
      options={roleOptions}
      variant="ghost"
      placeholder="Select role"
    />
  </FormField>
</Form>`,
    },
  ];

  return (
    <>
      <HeroCard
        title="Code Examples"
        description="Practical code examples showing how to use accessibility features in tucu-ui components. Each example includes comments explaining the ARIA behavior."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Accessible Component Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Copy-paste examples with built-in accessibility
          </Typography>
        </div>

        <div className="space-y-6">
          {examples.map((example, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-4">
                <div>
                  <Typography tag="h3" className="font-semibold text-lg mb-1">
                    {example.title}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {example.description}
                  </Typography>
                </div>
                <CodeBlock language="tsx" code={example.code} />
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default CodeExamplesSection;
