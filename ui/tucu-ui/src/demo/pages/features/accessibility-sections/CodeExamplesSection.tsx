import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Input,
  Alert,
  CodeBlock,
} from '../../../../index';

const CodeExamplesSection: React.FC = () => {
  const inputExampleCode = `<FormField
  name="email"
  label="Email Address"
  helperText="We'll never share your email"
  required={true}
  error="Please enter a valid email"
>
  <Input
    type="email"
    placeholder="Enter your email"
    // Automatically includes:
    // - aria-describedby for helper text and errors
    // - aria-required="true" when required
    // - aria-invalid when there's an error
    // - proper label association with htmlFor
  />
</FormField>`;

  const modalExampleCode = `<Modal
  isOpen={isOpen}
  onClose={onClose}
  text={{
    title: 'Confirm Action',
    content: 'Are you sure you want to delete this item?',
  }}
>
  {/* Modal content */}
</Modal>`;

  const alertExampleCode = `<Alert variant="warning" dismissible={true} aria-label="Session expiry warning">
  Your session will expire in 5 minutes.
</Alert>`;

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Implementation Examples" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Accessible Component Examples
              </Typography>
            </div>

            <div className="space-y-8">
              {/* Input Example */}
              <div className="space-y-4">
                <Typography
                  tag="h4"
                  className="font-semibold flex items-center gap-2"
                >
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                  Input Fields - Fully Accessible
                </Typography>
                <div className="p-4 border rounded-lg">
                  <div className="mb-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      helperText="We'll never share your email with anyone else."
                      required
                    />
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                  >
                    Features: Label association, ARIA attributes, error
                    handling, helper text
                  </Typography>
                  <CodeBlock code={inputExampleCode} language="tsx" />
                </div>
              </div>

              {/* Modal Example */}
              <div className="space-y-4">
                <Typography
                  tag="h4"
                  className="font-semibold flex items-center gap-2"
                >
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                  Modal Dialogs - Fully Accessible
                </Typography>
                <div className="p-4 border rounded-lg">
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                  >
                    Features: Focus trapping, keyboard navigation, proper ARIA
                    roles
                  </Typography>
                  <CodeBlock code={modalExampleCode} language="tsx" />
                </div>
              </div>

              {/* Alert Example */}
              <div className="space-y-4">
                <Typography
                  tag="h4"
                  className="font-semibold flex items-center gap-2"
                >
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                  Alerts and Notifications - Fully Accessible
                </Typography>
                <div className="p-4 border rounded-lg">
                  <Alert variant="warning">
                    <div className="flex flex-col gap-2">
                      <LucideIcons.AlertTriangle className="h-4 w-4" />
                      <Typography tag="span" className="font-semibold">
                        Your session will expire in 5 minutes.
                      </Typography>
                    </div>
                  </Alert>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 mb-3 mt-3"
                  >
                    Features: Live regions, proper roles, keyboard dismissal
                  </Typography>

                  <CodeBlock
                    noExpand={true}
                    code={alertExampleCode}
                    language="tsx"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default CodeExamplesSection;

