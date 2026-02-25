import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Modal,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ModalSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <PropPlayground
        componentName="Modal"
        defaultValues={{ isOpen: true, closeable: true, hideButtons: false }}
        excludeProps={[
          'setIsOpen',
          'onBack',
          'onClose',
          'onSubmit',
          'buttonContainer',
          'text',
          'contentClassName',
          'titleContainerClassName',
        ]}
      >
        {(props) => (
          <Modal
            {...props}
            setIsOpen={() => {}}
            text={{
              title: 'Modal Preview',
              content: 'This is a preview of the modal component.',
            }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modal body content
            </p>
          </Modal>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Modal" />

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
