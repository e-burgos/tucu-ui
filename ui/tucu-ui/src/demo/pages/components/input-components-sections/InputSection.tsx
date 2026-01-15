import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Input,
} from '../../../../index';

const InputSection: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

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

  const inputPropsData = [
    {
      prop: 'label',
      type: 'string',
      default: '-',
      description: 'Field label text',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the input',
    },
    {
      prop: 'type',
      type: 'string',
      default: "'text'",
      description: 'Input type (text, email, password, date, number, etc.)',
    },
    {
      prop: 'error',
      type: 'string',
      default: '-',
      description: 'Error message to display',
    },
    {
      prop: 'helperText',
      type: 'string',
      default: '-',
      description: 'Helper text displayed below the input',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the input field',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      default: '-',
      description: 'Icon displayed on the left side',
    },
    {
      prop: 'suffix',
      type: 'React.ReactNode',
      default: '-',
      description: 'Content displayed on the right side',
    },
    {
      prop: 'dateFormat',
      type: "'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD'",
      default: "'DD-MM-YYYY'",
      description: 'Date format for date type inputs',
    },
    {
      prop: 'useUppercaseLabel',
      type: 'boolean',
      default: 'false',
      description: 'Display label in uppercase',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the container',
    },
    {
      prop: 'inputClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the input element',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Input
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A versatile input component that supports various input types
          including text, email, password, date, and more.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Input
                </Typography>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="We'll never share your email"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error="Password is required"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Input label="Disabled" placeholder="Disabled input" disabled />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Date Input
                </Typography>
                <Input label="Date" type="date" dateFormat="DD-MM-YYYY" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Number Input
                </Typography>
                <Input label="Age" type="number" placeholder="Enter age" />
              </CardContainer>
            </div>
          </div>

          <div>
            <Typography tag="headline" className="mb-4">
              Variants
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Ghost (default)
                </Typography>
                <Input
                  label="Ghost Variant"
                  placeholder="Enter text"
                  variant="ghost"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Input
                  label="Solid Variant"
                  placeholder="Enter text"
                  variant="solid"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Input
                  label="Transparent Variant"
                  placeholder="Enter text"
                  variant="transparent"
                />
              </CardContainer>
            </div>
          </div>

          <div>
            <Typography tag="headline" className="mb-4">
              Props
            </Typography>
            <BasicTable
              columns={propsTableColumns}
              data={inputPropsData}
              containerClassName="mb-4"
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Input } from '@e-burgos/tucu-ui';

// Basic usage
<Input
  label="Name"
  placeholder="Enter your name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With helper text
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With error
<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  error="Password is required"
/>

// Variants
<Input label="Ghost" variant="ghost" />
<Input label="Solid" variant="solid" />
<Input label="Transparent" variant="transparent" />

// Date input
<Input
  label="Date"
  type="date"
  dateFormat="DD-MM-YYYY"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default InputSection;
