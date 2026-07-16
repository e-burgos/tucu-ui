import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Modal,
  Button,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const ModalSection: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeroCard
        title="Modal"
        description="A modal dialog component for displaying content in an overlay with
          customizable buttons and close functionality."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Maximize2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Modal
                </Typography>
                <Button onClick={() => setIsOpen1(true)}>Open Modal</Button>
                <Modal
                  isOpen={isOpen1}
                  setIsOpen={setIsOpen1}
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
                <Button onClick={() => setIsOpen2(true)}>
                  Open Custom Modal
                </Button>
                <Modal
                  isOpen={isOpen2}
                  setIsOpen={setIsOpen2}
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
        defaultValues={{
          isOpen: isOpen,
          setIsOpen: setIsOpen,
          closeable: true,
          hideButtons: false,
        }}
        excludeProps={['setIsOpen', 'onBack', 'onClose', 'onSubmit']}
      >
        {(props) => (
          <Modal
            {...props}
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
