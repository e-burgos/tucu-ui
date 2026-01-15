import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Button,
} from '../../../../index';

const ButtonDripSection: React.FC = () => {
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
      prop: 'x',
      type: 'number',
      default: '0',
      description: 'X coordinate for the drip effect',
    },
    {
      prop: 'y',
      type: 'number',
      default: '0',
      description: 'Y coordinate for the drip effect',
    },
    {
      prop: 'color',
      type: 'string',
      default: 'required',
      description: 'Color of the drip effect',
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is full width',
    },
    {
      prop: 'onCompleted',
      type: '() => void',
      default: 'required',
      description: 'Callback when animation completes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ButtonDrip
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A button effect component that creates a ripple animation on click.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with Drip Effect
                </Typography>
                <Button>Click me</Button>
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
              code={`import { ButtonDrip } from '@e-burgos/tucu-ui';

// ButtonDrip is typically used internally by Button component
// It creates a ripple effect when a button is clicked

<ButtonDrip
  x={50}
  y={50}
  color="#3b82f6"
  fullWidth={false}
  onCompleted={() => console.log('Animation completed')}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ButtonDripSection;
