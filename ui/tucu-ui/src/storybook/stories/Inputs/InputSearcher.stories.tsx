import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { InputSearcher } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import React, { useState } from 'react';
import { InputSelectOption } from '../../../components/forms/input-select';

// Sample options for demonstration
const sampleOptions: InputSelectOption[] = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
  { name: 'Orange', value: 'orange' },
  { name: 'Grape', value: 'grape' },
  { name: 'Pineapple', value: 'pineapple' },
  { name: 'Strawberry', value: 'strawberry' },
  { name: 'Blueberry', value: 'blueberry' },
  { name: 'Raspberry', value: 'raspberry' },
  { name: 'Mango', value: 'mango' },
  { name: 'Kiwi', value: 'kiwi' },
  { name: 'Watermelon', value: 'watermelon' },
  { name: 'Cherry', value: 'cherry' },
];

const meta: Meta<typeof InputSearcher> = {
  title: '3. UI COMPONENTS/Inputs/InputSearcher',
  component: InputSearcher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'InputSearcher is a search input component that manages its own state internally. It allows free text input and provides a dropdown with selectable options. The component handles all value management internally - you only need to provide options and handle option selection via onOptionSelect callback.',
      },
    },
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Initial value for the search input (optional)',
    },
    onOptionSelect: {
      action: 'Option selected',
      description:
        'Callback function called when an option is selected from the dropdown. This is the primary output of the component.',
    },
    options: {
      description:
        'Array of options to display in dropdown when input gains focus. Options are filtered as user types.',
    },
    noMatchesMessage: {
      control: 'text',
      description:
        'Custom error message to display when no matches are found (after typing more than 3 characters). Default: "No se encontraron coincidencias"',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when the input is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    label: {
      control: 'text',
      description: 'The label text for the input',
    },
    multiple: {
      control: 'boolean',
      description:
        'Enable multiple selection mode. When true, allows selecting multiple options and displays them as chips.',
    },
  },
  args: {
    placeholder: 'Search...',
    options: sampleOptions,
    onOptionSelect: fn(),
  },
};

export default meta;

const Template: StoryFn<typeof InputSearcher> = (args) => {
  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4">
        <InputSearcher {...args} />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          The input manages its own state internally. Select an option to see
          the onOptionSelect callback in action.
        </div>
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: sampleOptions,
  placeholder: 'Search...',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Search Fruits',
  placeholder: 'Enter fruit name...',
  options: sampleOptions,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue: 'apple',
  placeholder: 'Search with initial value...',
  label: 'Search',
  options: sampleOptions,
};

export const WithCustomErrorMessage = Template.bind({});
WithCustomErrorMessage.args = {
  label: 'Search Fruits',
  placeholder: 'Type more than 3 characters...',
  options: sampleOptions,
  noMatchesMessage: 'No found fruits with this name',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Disabled search',
  label: 'Search',
};

export const WithOptions = () => {
  const [selectedOption, setSelectedOption] =
    useState<InputSelectOption | null>(null);

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4">
        <InputSearcher
          onOptionSelect={(option) => {
            setSelectedOption(option as InputSelectOption);
            console.log('Option selected:', option);
          }}
          options={sampleOptions}
          placeholder="Search fruits (write freely, options will appear on focus)..."
          label="Fruit Search with Options"
        />

        <div className="space-y-2">
          {selectedOption && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                Selected Option:
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Name: <strong>{selectedOption.name}</strong>
                <br />
                Value: <strong>{selectedOption.value}</strong>
              </p>
            </div>
          )}

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Click on input to see all options. Type to filter them.</p>
            <p>
              The input allows free text and manages its own state internally.
              Selecting an option is what matters - use onOptionSelect to handle
              the selection.
            </p>
            <p>Available options: {sampleOptions.length} fruits</p>
          </div>
        </div>
      </div>
    </StoryContainer>
  );
};

export const MultipleSelection = () => {
  const [selectedOptions, setSelectedOptions] = useState<InputSelectOption[]>(
    []
  );

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4">
        <InputSearcher
          multiple
          onOptionSelect={(options) => {
            setSelectedOptions(options as InputSelectOption[]);
            console.log('Options selected:', options);
          }}
          options={sampleOptions}
          placeholder="Search and select multiple fruits..."
          label="Multiple Fruit Selection"
        />

        <div className="space-y-2">
          {selectedOptions.length > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Selected Options ({selectedOptions.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    className="px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-md"
                  >
                    {option.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              Click on input to see all options. Select multiple options by
              clicking on them.
            </p>
            <p>
              Selected options appear as chips in the input. Click the X icon on
              a chip to remove it, or click the option again in the dropdown to
              toggle it.
            </p>
            <p>Available options: {sampleOptions.length} fruits</p>
          </div>
        </div>
      </div>
    </StoryContainer>
  );
};
