import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Toast,
  Button,
} from '../../../../index';
import { useToastStore } from '../../../../hooks/use-toast-store';

const ToastSection: React.FC = () => {
  const { addToast } = useToastStore();

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
      prop: 'Toast Component',
      type: 'React.FC',
      default: '-',
      description:
        'The Toast component renders automatically from the toast store',
    },
    {
      prop: 'useToastStore',
      type: 'Hook',
      default: '-',
      description: 'Hook to manage toast notifications',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Toast
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A toast notification system for displaying temporary messages with
          multiple variants and auto-dismiss functionality.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Success Toast
                </Typography>
                <Button
                  onClick={() =>
                    addToast({
                      id: Date.now().toString(),
                      title: 'Success!',
                      message: 'Operation completed successfully.',
                      variant: 'success',
                    })
                  }
                >
                  Show Success Toast
                </Button>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Error Toast
                </Typography>
                <Button
                  onClick={() =>
                    addToast({
                      id: Date.now().toString(),
                      title: 'Error!',
                      message: 'Something went wrong.',
                      variant: 'destructive',
                    })
                  }
                >
                  Show Error Toast
                </Button>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Warning Toast
                </Typography>
                <Button
                  onClick={() =>
                    addToast({
                      id: Date.now().toString(),
                      title: 'Warning!',
                      message: 'Please review this information.',
                      variant: 'warning',
                    })
                  }
                >
                  Show Warning Toast
                </Button>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Info Toast
                </Typography>
                <Button
                  onClick={() =>
                    addToast({
                      id: Date.now().toString(),
                      title: 'Info',
                      message: 'Here is some information.',
                      variant: 'info',
                    })
                  }
                >
                  Show Info Toast
                </Button>
              </CardContainer>
            </div>
            <Toast />
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
              code={`import { Toast, useToastStore } from '@e-burgos/tucu-ui';

function MyComponent() {
  const { addToast } = useToastStore();

  const showSuccess = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Success!',
      message: 'Operation completed successfully.',
      variant: 'success',
    });
  };

  const showError = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Error!',
      message: 'Something went wrong.',
      variant: 'destructive',
    });
  };

  return (
    <>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
      <Toast />
    </>
  );
}

// Toast variants
addToast({ id: Date.now().toString(), variant: 'success', title: 'Success', message: '...' });
addToast({ id: Date.now().toString(), variant: 'destructive', title: 'Error', message: '...' });
addToast({ id: Date.now().toString(), variant: 'warning', title: 'Warning', message: '...' });
addToast({ id: Date.now().toString(), variant: 'info', title: 'Info', message: '...' });`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ToastSection;
