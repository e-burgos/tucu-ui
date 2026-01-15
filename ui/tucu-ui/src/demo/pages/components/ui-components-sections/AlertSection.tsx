import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Alert,
} from '../../../../index';

const AlertSection: React.FC = () => {
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display in the alert',
    },
    {
      prop: 'variant',
      type: "'info' | 'warning' | 'error' | 'success'",
      default: "'info'",
      description: 'Visual variant of the alert',
    },
    {
      prop: 'dismissible',
      type: 'boolean',
      default: 'true',
      description: 'Whether the alert can be dismissed',
    },
    {
      prop: 'onDismiss',
      type: '() => void',
      default: '-',
      description: 'Callback when alert is dismissed',
    },
    {
      prop: 'aria-label',
      type: 'string',
      default: '-',
      description: 'Accessibility label',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Alert
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          An alert component for displaying important messages and notifications
          with different variants and dismissible functionality.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Info Alert
                </Typography>
                <Alert variant="info">
                  <Typography tag="p">
                    This is an informational message.
                  </Typography>
                </Alert>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Success Alert
                </Typography>
                <Alert variant="success">
                  <Typography tag="p">
                    Operation completed successfully!
                  </Typography>
                </Alert>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Warning Alert
                </Typography>
                <Alert variant="warning">
                  <Typography tag="p">
                    Please review this information carefully.
                  </Typography>
                </Alert>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Error Alert
                </Typography>
                <Alert variant="error">
                  <Typography tag="p">
                    An error occurred. Please try again.
                  </Typography>
                </Alert>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Non-dismissible Alert
                </Typography>
                <Alert variant="info" dismissible={false}>
                  <Typography tag="p">
                    This alert cannot be dismissed.
                  </Typography>
                </Alert>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom onDismiss
                </Typography>
                <Alert
                  variant="success"
                  onDismiss={() => console.log('Alert dismissed')}
                >
                  <Typography tag="p">
                    This alert has a custom dismiss handler.
                  </Typography>
                </Alert>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Alert, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<Alert variant="info">
  <Typography tag="p">This is an informational message.</Typography>
</Alert>

// Different variants
<Alert variant="info">Info message</Alert>
<Alert variant="success">Success message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="error">Error message</Alert>

// Non-dismissible
<Alert variant="info" dismissible={false}>
  <Typography tag="p">Cannot be dismissed</Typography>
</Alert>

// With custom dismiss handler
<Alert
  variant="success"
  onDismiss={() => handleDismiss()}
>
  <Typography tag="p">Custom dismiss handler</Typography>
</Alert>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AlertSection;
