import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Select,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Globe, Zap, Shield, Star } from 'lucide-react';

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
    { name: 'Perú', value: 'pe' },
    { name: 'Uruguay', value: 'uy' },
    { name: 'Venezuela', value: 've' },
  ];

  const planOptions = [
    {
      name: 'Free',
      value: 'free',
      description: 'Basic features, 1 user',
      icon: <Star className="h-4 w-4 text-gray-400" />,
    },
    {
      name: 'Pro',
      value: 'pro',
      description: 'Advanced features, 5 users',
      icon: <Zap className="h-4 w-4 text-brand" />,
    },
    {
      name: 'Enterprise',
      value: 'enterprise',
      description: 'Custom features, unlimited',
      icon: <Shield className="h-4 w-4 text-green-500" />,
    },
    {
      name: 'Legacy',
      value: 'legacy',
      description: 'No longer available',
      disabled: true,
    },
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
          A dropdown select component with search, descriptions, disabled
          options, and check indicators.
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
                  Searchable
                </Typography>
                <Select
                  label="Country"
                  placeholder="Search and select..."
                  options={countryOptions}
                  searchable
                  searchPlaceholder="Type to filter..."
                  showCheck
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Descriptions & Icons
                </Typography>
                <Select
                  label="Plan"
                  placeholder="Choose a plan"
                  options={planOptions}
                  showCheck
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
                    {
                      name: 'English',
                      value: 'en',
                      icon: <Globe className="h-4 w-4" />,
                    },
                    {
                      name: 'Spanish',
                      value: 'es',
                      icon: <Globe className="h-4 w-4" />,
                    },
                    {
                      name: 'French',
                      value: 'fr',
                      icon: <Globe className="h-4 w-4" />,
                    },
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

// Basic
<Select
  label="Country"
  placeholder="Select a country"
  options={options}
  selectedOption={selectedOption}
  onChange={setSelectedOption}
/>

// Searchable with check
<Select
  label="Country"
  placeholder="Search..."
  options={options}
  searchable
  searchPlaceholder="Type to filter..."
  showCheck
/>

// With descriptions, icons, and disabled options
const plans = [
  { name: 'Free', value: 'free', description: 'Basic features' },
  { name: 'Pro', value: 'pro', description: 'Advanced', icon: <Zap /> },
  { name: 'Legacy', value: 'legacy', disabled: true },
];
<Select label="Plan" options={plans} showCheck />

// Variants
<Select variant="ghost" options={options} />
<Select variant="solid" options={options} />
<Select variant="transparent" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SelectSection;
