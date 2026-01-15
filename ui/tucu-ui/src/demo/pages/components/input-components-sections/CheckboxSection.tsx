import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Checkbox,
} from '../../../../index';

const CheckboxSection: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

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

  const checkboxPropsData = [
    {
      prop: 'label',
      type: 'React.ReactNode',
      default: '-',
      description: 'Checkbox label',
    },
    {
      prop: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox is checked',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the checkbox',
    },
    {
      prop: 'shape',
      type: "'rounded' | 'square'",
      default: "'square'",
      description: 'Shape of the checkbox',
    },
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the checkbox',
    },
    {
      prop: 'color',
      type: "'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'",
      default: "'primary'",
      description: 'Color theme of the checkbox',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the checkbox',
    },
    {
      prop: 'labelPlacement',
      type: "'start' | 'end'",
      default: "'end'",
      description: 'Position of the label relative to the checkbox',
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
      description: 'Helper text displayed below the checkbox',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Checkbox
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A checkbox component for binary selections.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Checkbox
                </Typography>
                <Checkbox
                  label="I accept the terms and conditions"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Checkbox
                  label="Subscribe to newsletter"
                  helperText="Receive updates via email"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Checkbox
                  label="Required checkbox"
                  error="This field is required"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Checkbox label="Disabled option" disabled />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Colors
                </Typography>
                <div className="space-y-2">
                  <Checkbox label="Primary" color="primary" />
                  <Checkbox label="Danger" color="danger" />
                  <Checkbox label="Success" color="success" />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="space-y-2">
                  <Checkbox label="Small" size="sm" />
                  <Checkbox label="Medium" size="md" />
                  <Checkbox label="Large" size="lg" />
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
                <Checkbox label="Ghost Variant" variant="ghost" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Checkbox label="Solid Variant" variant="solid" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Checkbox label="Transparent Variant" variant="transparent" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shapes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Rounded
                </Typography>
                <Checkbox label="Rounded Shape" shape="rounded" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Square (default)
                </Typography>
                <Checkbox label="Square Shape" shape="square" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={checkboxPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Checkbox } from '@e-burgos/tucu-ui';

<Checkbox
  label="I accept the terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Variants
<Checkbox label="Ghost" variant="ghost" />
<Checkbox label="Solid" variant="solid" />
<Checkbox label="Transparent" variant="transparent" />

// Shapes
<Checkbox label="Rounded" shape="rounded" />
<Checkbox label="Square" shape="square" />

// Colors
<Checkbox label="Primary" color="primary" />
<Checkbox label="Danger" color="danger" />
<Checkbox label="Success" color="success" />

// Sizes
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CheckboxSection;
