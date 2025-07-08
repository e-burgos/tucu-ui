import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { InputSelect, InputSelectOption } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import { Globe, MapPin, Flag, Building } from 'lucide-react';
import Button from '../../../components/buttons';
import { AnchorLink } from '../../../components';

const meta: Meta<typeof InputSelect> = {
  title: 'UI COMPONENTS/Inputs/InputSelect',
  tags: ['autodocs'],
  component: InputSelect,
  parameters: {
    docs: {
      description: {
        component:
          'The InputSelect component provides a dropdown selection control with customizable options. It supports icons, different variants, and can be integrated with form libraries.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to display in the dropdown',
    },
    selectedOption: {
      control: 'object',
      description: 'Currently selected option',
    },
    variant: {
      control: 'select',
      options: ['ghost', 'solid', 'transparent'],
      description: 'Visual style variant of the select',
    },
    label: {
      control: 'text',
      description: 'The label text for the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    useUppercaseLabel: {
      control: 'boolean',
      description: 'Whether to display the label in uppercase',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component',
    },
  },
  args: {
    label: 'Select an option',
    variant: 'ghost',
    disabled: false,
    required: false,
    useUppercaseLabel: false,
  },
};

export default meta;

const countryOptions: InputSelectOption[] = [
  { name: 'United States', value: 'us' },
  { name: 'Canada', value: 'ca' },
  { name: 'United Kingdom', value: 'uk' },
  { name: 'Australia', value: 'au' },
  { name: 'Germany', value: 'de' },
  { name: 'France', value: 'fr' },
  { name: 'Japan', value: 'jp' },
  { name: 'Brazil', value: 'br' },
  { name: 'India', value: 'in' },
  { name: 'China', value: 'cn' },
];

const Template: StoryFn<typeof InputSelect> = (args) => {
  const [selectedOption, setSelectedOption] = React.useState<
    InputSelectOption | undefined
  >(args.selectedOption);

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <InputSelect
          {...args}
          options={args.options || countryOptions}
          selectedOption={selectedOption}
          onChange={setSelectedOption}
        />
        {selectedOption && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-sm">
              Selected:{' '}
              <span className="font-medium">{selectedOption.name}</span> (
              {selectedOption.value})
            </p>
          </div>
        )}
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithPreselectedOption = Template.bind({});
WithPreselectedOption.args = {
  selectedOption: countryOptions[0],
};

export const SolidVariant = Template.bind({});
SolidVariant.args = {
  variant: 'solid',
};

export const TransparentVariant = Template.bind({});
TransparentVariant.args = {
  variant: 'transparent',
};

export const WithUppercaseLabel = Template.bind({});
WithUppercaseLabel.args = {
  useUppercaseLabel: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  selectedOption: countryOptions[2],
};

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  options: [
    { name: 'Small', value: 'sm' },
    { name: 'Medium', value: 'md' },
    { name: 'Large', value: 'lg' },
    { name: 'Extra Large', value: 'xl' },
  ],
  label: 'Size',
};

export const WithCustomChild = () => {
  const [selectedOption, setSelectedOption] = React.useState<
    InputSelectOption | undefined
  >(countryOptions[0]);

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <InputSelect
          label="Country"
          options={countryOptions}
          selectedOption={selectedOption}
          onChange={setSelectedOption}
        >
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 mt-1">
            <AnchorLink
              to="#"
              className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-md"
            >
              <Globe className="h-4 w-4 mr-2" />
              View all countries
            </AnchorLink>
          </div>
        </InputSelect>
      </div>
    </StoryContainer>
  );
};

export const LocationSelector = () => {
  const [country, setCountry] = React.useState<InputSelectOption | undefined>();
  const [city, setCity] = React.useState<InputSelectOption | undefined>();

  const cityOptions: Record<string, InputSelectOption[]> = {
    us: [
      { name: 'New York', value: 'ny' },
      { name: 'Los Angeles', value: 'la' },
      { name: 'Chicago', value: 'chi' },
      { name: 'Houston', value: 'hou' },
    ],
    ca: [
      { name: 'Toronto', value: 'tor' },
      { name: 'Vancouver', value: 'van' },
      { name: 'Montreal', value: 'mon' },
      { name: 'Calgary', value: 'cal' },
    ],
    uk: [
      { name: 'London', value: 'lon' },
      { name: 'Manchester', value: 'man' },
      { name: 'Birmingham', value: 'bir' },
      { name: 'Glasgow', value: 'gla' },
    ],
  };

  // Reset city when country changes
  React.useEffect(() => {
    setCity(undefined);
  }, [country]);

  const availableCities =
    country && cityOptions[country.value] ? cityOptions[country.value] : [];

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Location Selector</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <Flag className="h-5 w-5 mr-3 text-gray-500" />
            <div className="flex-1">
              <InputSelect
                label="Country"
                options={countryOptions.slice(0, 3)}
                selectedOption={country}
                onChange={setCountry}
              />
            </div>
          </div>

          <div className="flex items-center">
            <Building className="h-5 w-5 mr-3 text-gray-500" />
            <div className="flex-1">
              <InputSelect
                label="City"
                options={availableCities}
                selectedOption={city}
                onChange={setCity}
                disabled={!country}
              />
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-gray-500" />
            <div className="flex-1">
              <InputSelect
                label="District"
                options={[]}
                disabled={!city}
                selectedOption={undefined}
                onChange={() => {
                  console.log('District selection not implemented');
                }}
              >
                <div className="p-2 text-center text-sm text-gray-500">
                  {city ? 'No districts available' : 'Select a city first'}
                </div>
              </InputSelect>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <Button
            variant="solid"
            size="medium"
            className="w-full"
            disabled={!country || !city}
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </StoryContainer>
  );
};

export const FormExample = () => {
  const [formData, setFormData] = React.useState({
    category: undefined as InputSelectOption | undefined,
    priority: undefined as InputSelectOption | undefined,
  });

  const categoryOptions = [
    { name: 'Bug Report', value: 'bug' },
    { name: 'Feature Request', value: 'feature' },
    { name: 'Question', value: 'question' },
    { name: 'Other', value: 'other' },
  ];

  const priorityOptions = [
    { name: 'Low', value: 'low' },
    { name: 'Medium', value: 'medium' },
    { name: 'High', value: 'high' },
    { name: 'Critical', value: 'critical' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Form submitted with:\nCategory: ${formData.category?.name}\nPriority: ${formData.priority?.name}`
    );
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Support Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputSelect
              label="Category"
              options={categoryOptions}
              selectedOption={formData.category}
              onChange={(option) =>
                setFormData({ ...formData, category: option })
              }
              required
            />
          </div>

          <div>
            <InputSelect
              label="Priority"
              options={priorityOptions}
              selectedOption={formData.priority}
              onChange={(option) =>
                setFormData({ ...formData, priority: option })
              }
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="w-full"
              disabled={!formData.category || !formData.priority}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </StoryContainer>
  );
};
