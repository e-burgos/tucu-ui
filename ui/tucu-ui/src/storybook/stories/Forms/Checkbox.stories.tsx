import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Checkbox } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Checkbox> = {
  title: 'UI COMPONENTS/Forms/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'The Checkbox component allows users to select one or more items from a set. It can be used for binary choices or multiple selections.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the checkbox',
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the label relative to the checkbox',
    },
    variant: {
      control: 'select',
      options: ['outline', 'flat', 'active'],
      description: 'Visual style variant of the checkbox',
    },
    size: {
      control: 'select',
      options: ['sm', 'DEFAULT', 'lg', 'xl'],
      description: 'Size of the checkbox',
    },
    color: {
      control: 'select',
      options: [
        'DEFAULT',
        'primary',
        'secondary',
        'danger',
        'info',
        'success',
        'warning',
      ],
      description: 'Color theme of the checkbox',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'DEFAULT', 'lg', 'circle'],
      description: 'Border radius of the checkbox',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component container',
    },
  },
  args: {
    label: 'Checkbox label',
    variant: 'outline',
    size: 'DEFAULT',
    color: 'DEFAULT',
    rounded: 'DEFAULT',
    labelPlacement: 'end',
  },
};

export default meta;

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || false);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md">
        <Checkbox
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  disabled: true,
  checked: true,
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'This field is required',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'Additional information about this field',
};

export const LabelStart = Template.bind({});
LabelStart.args = {
  labelPlacement: 'start',
};

export const FlatVariant = Template.bind({});
FlatVariant.args = {
  variant: 'flat',
};

export const ActiveVariant = Template.bind({});
ActiveVariant.args = {
  variant: 'active',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: 'lg',
};

export const ExtraLargeSize = Template.bind({});
ExtraLargeSize.args = {
  size: 'xl',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  color: 'primary',
  checked: true,
};

export const DangerColor = Template.bind({});
DangerColor.args = {
  color: 'danger',
  checked: true,
};

export const CircleRounded = Template.bind({});
CircleRounded.args = {
  rounded: 'circle',
};

export const NoRounded = Template.bind({});
NoRounded.args = {
  rounded: 'none',
};

export const CheckboxGroup = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
  ];

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Select options:</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
            />
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p>
            Selected options:{' '}
            {selectedOptions.length ? selectedOptions.join(', ') : 'None'}
          </p>
        </div>
      </div>
    </StoryContainer>
  );
};

export const FormExample = () => {
  const [terms, setTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>

        <Checkbox
          label="I agree to the terms and conditions"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          color="primary"
          error={!terms ? 'You must accept the terms to continue' : undefined}
        />

        <Checkbox
          label="Subscribe to our newsletter"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          helperText="We'll send you updates about our products and offers"
        />

        <button
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            terms
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!terms}
        >
          Continue
        </button>
      </div>
    </StoryContainer>
  );
};
