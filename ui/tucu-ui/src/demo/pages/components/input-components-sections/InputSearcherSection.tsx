import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  InputSearcher,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const InputSearcherSection: React.FC = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState<
    { name: string; value: string } | undefined
  >(undefined);
  const searcherColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const searcherSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  const searchOptions = [
    { name: 'React', value: 'react' },
    { name: 'Vue', value: 'vue' },
    { name: 'Angular', value: 'angular' },
    { name: 'Svelte', value: 'svelte' },
    { name: 'Next.js', value: 'nextjs' },
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
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {searcherColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <InputSearcher
                    label={`${label} Search`}
                    placeholder="Search..."
                    color={color}
                    options={searchOptions}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {searcherSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <InputSearcher
                    label={`${label} Search`}
                    placeholder="Search frameworks"
                    size={size}
                    options={searchOptions}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="InputSearcher"
        defaultValues={{
          label: 'Preview Search',
          placeholder: 'Search frameworks',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          multiple: false,
          noMatchesMessage: 'No results found',
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Placeholder text rendered inside the search input',
          },
        ]}
        includeProps={[
          'label',
          'placeholder',
          'variant',
          'color',
          'size',
          'multiple',
          'noMatchesMessage',
          'disabled',
        ]}
        excludeProps={['options', 'initialValue', 'onOptionSelect']}
      >
        {(props) => (
          <div className="w-full max-w-lg">
            <InputSearcher
              {...props}
              placeholder={props.placeholder || 'Search frameworks'}
              options={searchOptions}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="InputSearcher" />

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
<InputSearcher label="Transparent" variant="transparent" options={options} />

// Colors
<InputSearcher label="Primary" color="primary" options={options} />
<InputSearcher label="Secondary" color="secondary" options={options} />
<InputSearcher label="Danger" color="danger" options={options} />
<InputSearcher label="Info" color="info" options={options} />
<InputSearcher label="Success" color="success" options={options} />
<InputSearcher label="Warning" color="warning" options={options} />

// Sizes
<InputSearcher label="Small" size="sm" options={options} />
<InputSearcher label="Medium" size="md" options={options} />
<InputSearcher label="Large" size="lg" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default InputSearcherSection;
