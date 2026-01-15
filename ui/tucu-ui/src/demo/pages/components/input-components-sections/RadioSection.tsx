import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Radio,
} from '../../../../index';

const RadioSection: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>('');

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

  const radioPropsData = [
    {
      prop: 'label',
      type: 'React.ReactNode',
      default: '-',
      description: 'Radio button label',
    },
    {
      prop: 'value',
      type: 'string',
      default: 'required',
      description: 'Radio button value',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the radio button',
    },
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the radio button',
    },
    {
      prop: 'color',
      type: "'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'",
      default: "'primary'",
      description: 'Color theme of the radio button',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the radio button',
    },
    {
      prop: 'labelPlacement',
      type: "'start' | 'end'",
      default: "'end'",
      description: 'Position of the label relative to the radio',
    },
    {
      prop: 'error',
      type: 'string',
      default: '-',
      description: 'Error message to display',
    },
    {
      prop: 'helperText',
      type: 'React.ReactNode',
      default: '-',
      description: 'Helper text displayed below the radio',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Radio
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A single radio button component for binary choices.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Radio
                </Typography>
                <Radio
                  label="Option 1"
                  value="option1"
                  checked={radioValue === 'option1'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Radio label="Disabled option" value="disabled" disabled />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Colors
                </Typography>
                <div className="space-y-2">
                  <Radio label="Primary" value="primary" color="primary" />
                  <Radio label="Danger" value="danger" color="danger" />
                  <Radio label="Success" value="success" color="success" />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="space-y-2">
                  <Radio label="Small" value="sm" size="sm" />
                  <Radio label="Medium" value="md" size="md" />
                  <Radio label="Large" value="lg" size="lg" />
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Ghost (default)
                </Typography>
                <Radio
                  label="Ghost Variant"
                  value="ghost"
                  variant="ghost"
                  checked={radioValue === 'ghost'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Radio
                  label="Solid Variant"
                  value="solid"
                  variant="solid"
                  checked={radioValue === 'solid'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Radio
                  label="Transparent Variant"
                  value="transparent"
                  variant="transparent"
                  checked={radioValue === 'transparent'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={radioPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Radio } from '@e-burgos/tucu-ui';

<Radio
  label="Option 1"
  value="option1"
  checked={value === 'option1'}
  onChange={(e) => setValue(e.target.value)}
/>

// Variants
<Radio label="Ghost" variant="ghost" value="ghost" />
<Radio label="Solid" variant="solid" value="solid" />
<Radio label="Transparent" variant="transparent" value="transparent" />

// Colors
<Radio label="Primary" color="primary" />
<Radio label="Danger" color="danger" />
<Radio label="Success" color="success" />

// Sizes
<Radio label="Small" size="sm" />
<Radio label="Medium" size="md" />
<Radio label="Large" size="lg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default RadioSection;
