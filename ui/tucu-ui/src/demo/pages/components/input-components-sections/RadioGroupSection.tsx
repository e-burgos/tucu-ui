import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  RadioGroup,
} from '../../../../index';

const RadioGroupSection: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>('');

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

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

  const radioGroupPropsData = [
    {
      prop: 'options',
      type: '{ value: string | number, label: string }[]',
      default: 'required',
      description: 'Array of radio options',
    },
    {
      prop: 'value',
      type: 'string | number',
      default: '-',
      description: 'Currently selected value',
    },
    {
      prop: 'onChange',
      type: '(value: string | number) => void',
      default: '-',
      description: 'Callback when selection changes',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the radio buttons',
    },
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the radio buttons',
    },
    {
      prop: 'color',
      type: "'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'",
      default: "'primary'",
      description: 'Color theme of the radio buttons',
    },
    {
      prop: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'vertical'",
      description: 'Layout direction of radio buttons',
    },
    {
      prop: 'label',
      type: 'React.ReactNode',
      default: '-',
      description: 'Group label text',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all radio buttons in the group',
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
      description: 'Helper text displayed below the group',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          RadioGroup
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A group of radio buttons for selecting one option from multiple
          choices.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic RadioGroup
                </Typography>
                <RadioGroup
                  label="Gender"
                  options={genderOptions}
                  value={radioValue}
                  onChange={(value: string | number) =>
                    setRadioValue(value as string)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <RadioGroup
                  label="Size"
                  helperText="Select your preferred size"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <RadioGroup
                  label="Priority"
                  error="Please select a priority"
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'high', label: 'High' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <RadioGroup
                  label="Status"
                  disabled
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Horizontal Layout
                </Typography>
                <RadioGroup
                  label="Direction"
                  direction="horizontal"
                  options={[
                    { value: 'vertical', label: 'Vertical' },
                    { value: 'horizontal', label: 'Horizontal' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Colors
                </Typography>
                <RadioGroup
                  label="Color"
                  color="danger"
                  options={[
                    { value: 'red', label: 'Red' },
                    { value: 'blue', label: 'Blue' },
                  ]}
                />
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
                <RadioGroup
                  label="Ghost Variant"
                  variant="ghost"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <RadioGroup
                  label="Solid Variant"
                  variant="solid"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <RadioGroup
                  label="Transparent Variant"
                  variant="transparent"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={radioGroupPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="typescript"
              code={`import { RadioGroup } from '@e-burgos/tucu-ui';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

<RadioGroup
  label="Gender"
  options={options}
  value={value}
  onChange={(value) => setValue(value)}
/>

// Variants
<RadioGroup label="Ghost" variant="ghost" options={options} />
<RadioGroup label="Solid" variant="solid" options={options} />
<RadioGroup label="Transparent" variant="transparent" options={options} />

// Colors
<RadioGroup label="Primary" color="primary" options={options} />
<RadioGroup label="Danger" color="danger" options={options} />

// Layout
<RadioGroup label="Horizontal" direction="horizontal" options={options} />
<RadioGroup label="Vertical" direction="vertical" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default RadioGroupSection;
