import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Textarea,
} from '../../../../index';

const TextareaSection: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState('');

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

  const textareaPropsData = [
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
      description: 'Visual variant of the textarea',
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
      description: 'Helper text displayed below the textarea',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the textarea field',
    },
    {
      prop: 'rows',
      type: 'number',
      default: '-',
      description: 'Number of visible text lines',
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
      description: 'Custom CSS classes for the textarea element',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Textarea
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A multi-line text input component for longer text content.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Textarea
                </Typography>
                <Textarea
                  label="Message"
                  placeholder="Write your message here"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  helperText="Provide a detailed description"
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Textarea
                  label="Comments"
                  placeholder="Enter comments"
                  error="Comments are required"
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Textarea
                  label="Notes"
                  placeholder="Disabled textarea"
                  disabled
                  rows={4}
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
                <Textarea
                  label="Ghost Variant"
                  placeholder="Enter text"
                  variant="ghost"
                  rows={3}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Textarea
                  label="Solid Variant"
                  placeholder="Enter text"
                  variant="solid"
                  rows={3}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Textarea
                  label="Transparent Variant"
                  placeholder="Enter text"
                  variant="transparent"
                  rows={3}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={textareaPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Textarea } from '@e-burgos/tucu-ui';

<Textarea
  label="Message"
  placeholder="Write your message here"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
/>

<Textarea
  label="Description"
  placeholder="Enter description"
  helperText="Provide a detailed description"
  rows={4}
/>

// Variants
<Textarea label="Ghost" variant="ghost" rows={4} />
<Textarea label="Solid" variant="solid" rows={4} />
<Textarea label="Transparent" variant="transparent" rows={4} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TextareaSection;
