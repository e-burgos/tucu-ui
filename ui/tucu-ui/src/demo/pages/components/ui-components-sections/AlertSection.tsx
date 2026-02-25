import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Alert,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const AlertSection: React.FC = () => {
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
      <PropPlayground
        componentName="Alert"
        defaultValues={{ variant: 'info', dismissible: true }}
        excludeProps={['onDismiss', 'aria-label']}
      >
        {(props) => (
          <Alert {...props}>
            This is an alert message for the playground preview.
          </Alert>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Alert" />

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
