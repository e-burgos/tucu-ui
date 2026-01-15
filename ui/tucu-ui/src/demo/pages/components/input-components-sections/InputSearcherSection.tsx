import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  InputSearcher,
} from '../../../../index';

const InputSearcherSection: React.FC = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState<
    { name: string; value: string } | undefined
  >(undefined);

  const searchOptions = [
    { name: 'React', value: 'react' },
    { name: 'Vue', value: 'vue' },
    { name: 'Angular', value: 'angular' },
    { name: 'Svelte', value: 'svelte' },
    { name: 'Next.js', value: 'nextjs' },
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

  const inputSearcherPropsData = [
    {
      prop: 'options',
      type: 'SelectOption[]',
      default: '[]',
      description: 'Array of searchable options',
    },
    {
      prop: 'onOptionSelect',
      type: '(option: SelectOption | SelectOption[]) => void',
      default: '-',
      description: 'Callback when an option is selected',
    },
    {
      prop: 'initialValue',
      type: 'string | number',
      default: '-',
      description: 'Initial input value',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the input',
    },
    {
      prop: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allow multiple option selection',
    },
    {
      prop: 'noMatchesMessage',
      type: 'string',
      default: '-',
      description: 'Message to display when no matches found',
    },
    {
      prop: 'label',
      type: 'string',
      default: '-',
      description: 'Field label text',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the input searcher',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          InputSearcher
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A search input component with dropdown suggestions and filtering
          capabilities.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic InputSearcher
                </Typography>
                <InputSearcher
                  label="Search Framework"
                  placeholder="Search frameworks"
                  options={searchOptions}
                  initialValue={selectedSearchOption?.value}
                  onOptionSelect={(option) => {
                    if (!Array.isArray(option)) {
                      setSelectedSearchOption(option);
                    }
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Multiple Selection
                </Typography>
                <InputSearcher
                  label="Select Frameworks"
                  placeholder="Select frameworks"
                  options={searchOptions}
                  multiple
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom No Matches Message
                </Typography>
                <InputSearcher
                  label="Search"
                  placeholder="Search..."
                  options={searchOptions}
                  noMatchesMessage="No results found"
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <InputSearcher
                  label="Search"
                  disabled
                  placeholder="Disabled"
                  options={searchOptions}
                  noMatchesMessage="No results found"
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
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
                <InputSearcher
                  label="Ghost Variant"
                  placeholder="Search..."
                  variant="ghost"
                  options={searchOptions}
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <InputSearcher
                  label="Solid Variant"
                  placeholder="Search..."
                  variant="solid"
                  options={searchOptions}
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <InputSearcher
                  label="Transparent Variant"
                  placeholder="Search..."
                  variant="transparent"
                  options={searchOptions}
                  onOptionSelect={(option) => {
                    console.log('Selected:', option);
                  }}
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
              data={inputSearcherPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { InputSearcher } from '@e-burgos/tucu-ui';

const options = [
  { name: 'React', value: 'react' },
  { name: 'Vue', value: 'vue' },
  { name: 'Angular', value: 'angular' },
];

<InputSearcher
  label="Search Framework"
  options={options}
  initialValue={selectedOption?.value}
  onOptionSelect={(option) => {
    if (!Array.isArray(option)) {
      setSelectedOption(option);
    }
  }}
/>

<InputSearcher
  label="Select Frameworks"
  options={options}
  multiple
  onOptionSelect={(option) => {
    console.log('Selected:', option);
  }}
/>

// Variants
<InputSearcher label="Ghost" variant="ghost" options={options} />
<InputSearcher label="Solid" variant="solid" options={options} />
<InputSearcher label="Transparent" variant="transparent" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default InputSearcherSection;
