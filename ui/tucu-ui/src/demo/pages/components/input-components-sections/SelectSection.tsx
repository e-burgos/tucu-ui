import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Select,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';
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
  const selectColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const selectSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];
  const [playgroundSelectedOption, setPlaygroundSelectedOption] = useState<
    { name: string; value: string } | undefined
  >(countryOptions[0]);

  return (
    <>
      <HeroCard
        title="Select"
        description="A dropdown select component with search, descriptions, disabled options, and check indicators."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-500 via-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg border border-teal-500/50">
            <LucideIcons.ChevronDown className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {selectColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Select
                    label={`${label} Select`}
                    placeholder="Select option"
                    color={color}
                    options={countryOptions}
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
              {selectSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Select
                    label={`${label} Select`}
                    placeholder="Select option"
                    size={size}
                    options={countryOptions}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Select"
        defaultValues={{
          label: 'Preview Select',
          placeholder: 'Select a country',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          helperText: '',
          errorMessage: '',
          searchable: false,
          searchPlaceholder: 'Search...',
          showCheck: true,
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Placeholder text rendered before selecting an option',
          },
        ]}
        includeProps={[
          'label',
          'placeholder',
          'variant',
          'color',
          'size',
          'helperText',
          'errorMessage',
          'searchable',
          'searchPlaceholder',
          'showCheck',
          'disabled',
        ]}
        excludeProps={[
          'options',
          'selectedOption',
          'onChange',
          'onSelect',
          'value',
          'name',
          'buttonClassName',
          'children',
        ]}
      >
        {(props) => (
          <div className="w-full max-w-lg">
            <Select
              {...props}
              placeholder={props.placeholder || 'Select a country'}
              options={countryOptions}
              selectedOption={playgroundSelectedOption}
              onChange={(option: { name: string; value: string } | undefined) =>
                setPlaygroundSelectedOption(option)
              }
            />
          </div>
        )}
      </PropPlayground>

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
<Select variant="transparent" options={options} />

// Colors
<Select color="primary" options={options} />
<Select color="secondary" options={options} />
<Select color="danger" options={options} />
<Select color="info" options={options} />
<Select color="success" options={options} />
<Select color="warning" options={options} />

// Sizes
<Select size="sm" options={options} />
<Select size="md" options={options} />
<Select size="lg" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SelectSection;
