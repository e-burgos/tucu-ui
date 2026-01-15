import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Modal,
  Button,
} from '../../../../index';

const ModalSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      prop: 'isOpen',
      type: 'boolean',
      default: 'required',
      description: 'Whether the modal is open',
    },
    {
      prop: 'setIsOpen',
      type: '(isOpen: boolean) => void',
      default: 'required',
      description: 'Function to control modal state',
    },
    {
      prop: 'closeable',
      type: 'boolean',
      default: 'true',
      description: 'Whether the modal can be closed',
    },
    {
      prop: 'hideButtons',
      type: 'boolean',
      default: 'false',
      description: 'Hide default buttons',
    },
    {
      prop: 'text',
      type: '{ title?: string; content?: string; button?: string; backButton?: string }',
      default: '-',
      description: 'Text content for modal',
    },
    {
      prop: 'onClose',
      type: '() => void',
      default: '-',
      description: 'Callback when modal closes',
    },
    {
      prop: 'onSubmit',
      type: '() => void',
      default: '-',
      description: 'Callback when submit button is clicked',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Modal
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A modal dialog component for displaying content in an overlay with
          customizable buttons and close functionality.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Modal
                </Typography>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  text={{
                    title: 'Modal Title',
                    content: 'This is the modal content.',
                    button: 'Confirm',
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Modal with Custom Content
                </Typography>
                <Button onClick={() => setIsOpen(true)}>
                  Open Custom Modal
                </Button>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  text={{ title: 'Custom Modal' }}
                >
                  <Typography tag="p">Custom content goes here</Typography>
                </Modal>
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
              code={`import { Modal, Button } from '@e-burgos/tucu-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={{
          title: 'Modal Title',
          content: 'This is the modal content.',
          button: 'Confirm',
        }}
      />
    </>
  );
}

// With custom content
<Modal isOpen={isOpen} setIsOpen={setIsOpen} text={{ title: 'Custom Modal' }}>
  <div>Custom content here</div>
</Modal>

// Non-closeable
<Modal isOpen={isOpen} setIsOpen={setIsOpen} closeable={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ModalSection;
