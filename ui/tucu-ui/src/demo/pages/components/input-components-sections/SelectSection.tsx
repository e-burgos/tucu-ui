import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Select,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const SelectSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    { name: string; value: string } | undefined
  >(undefined);

  const countryOptions = [
    { name: 'Argentina', value: 'ar' },
    { name: 'Brasil', value: 'br' },
    { name: 'Chile', value: 'cl' },
    { name: 'Colombia', value: 'co' },
    { name: 'México', value: 'mx' },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Select
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A dropdown select component for choosing from a list of options.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Select
                </Typography>
                <Select
                  label="Country"
                  placeholder="Select a country"
                  options={countryOptions}
                  selectedOption={selectedOption}
                  onChange={setSelectedOption}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Select
                  label="Language"
                  placeholder="Select a language"
                  helperText="Choose your preferred language"
                  options={[
                    { name: 'English', value: 'en' },
                    { name: 'Spanish', value: 'es' },
                    { name: 'French', value: 'fr' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Select
                  label="Category"
                  placeholder="Select a category"
                  errorMessage="Category is required"
                  options={[
                    { name: 'Option 1', value: 'opt1' },
                    { name: 'Option 2', value: 'opt2' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Select
                  label="Status"
                  placeholder="Select status"
                  disabled
                  options={[
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Required Field
                </Typography>
                <Select
                  label="Priority"
                  placeholder="Select priority"
                  required
                  options={[
                    { name: 'Low', value: 'low' },
                    { name: 'Medium', value: 'medium' },
                    { name: 'High', value: 'high' },
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
                <Select
                  label="Ghost Variant"
                  placeholder="Select option"
                  variant="ghost"
                  options={countryOptions}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Select
                  label="Solid Variant"
                  placeholder="Select option"
                  variant="solid"
                  options={countryOptions}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Select
                  label="Transparent Variant"
                  placeholder="Select option"
                  variant="transparent"
                  options={countryOptions}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <AutoPropsTable componentName="Select" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Select } from '@e-burgos/tucu-ui';

const options = [
  { name: 'Argentina', value: 'ar' },
  { name: 'Brasil', value: 'br' },
  { name: 'Chile', value: 'cl' },
];

<Select
  label="Country"
  placeholder="Select a country"
  options={options}
  selectedOption={selectedOption}
  onChange={setSelectedOption}
/>

// Variants
<Select label="Ghost" variant="ghost" options={options} />
<Select label="Solid" variant="solid" options={options} />
<Select label="Transparent" variant="transparent" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SelectSection;
