import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { RadioGroup, Radio } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof RadioGroup> = {
  title: '3. UI COMPONENTS/Inputs/RadioGroup',
  tags: ['autodocs'],
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The RadioGroup component allows users to select one option from a set. It provides a container for Radio components with shared state management.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the radio group',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire radio group is disabled',
    },
    value: {
      control: 'text',
      description: 'The currently selected value (controlled component)',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value (uncontrolled component)',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the radio group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the radio group',
    },
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction for the radio options',
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Gap between radio options',
    },
    variant: {
      control: 'select',
      options: ['outline', 'flat', 'active'],
      description: 'Visual style variant of the radio buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the radio buttons',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info', 'success', 'warning'],
      description: 'Color theme of the radio buttons',
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the label relative to the radio buttons',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component container',
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the radio options container',
    },
  },
  args: {
    label: 'Select an option',
    direction: 'vertical',
    gap: 'md',
    variant: 'outline',
    size: 'md',
    color: 'primary',
    labelPlacement: 'end',
  },
};

export default meta;

const Template: StoryFn<typeof RadioGroup> = (args) => {
  const [value, setValue] = React.useState(args.value || args.defaultValue);

  const handleChange = (newValue: string | number) => {
    setValue(newValue);
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <RadioGroup
          {...args}
          value={args.value !== undefined ? args.value : value}
          onChange={handleChange}
        />
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  defaultValue: '2',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  direction: 'horizontal',
};

export const WithError = Template.bind({});
WithError.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  error: 'Please select a valid option',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  helperText: 'Select the option that best describes your preference',
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  disabled: true,
  defaultValue: '1',
};

export const WithSomeDisabled = Template.bind({});
WithSomeDisabled.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
  ],
};

export const FlatVariant = Template.bind({});
FlatVariant.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  variant: 'flat',
};

export const ActiveVariant = Template.bind({});
ActiveVariant.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  variant: 'active',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  color: 'primary',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  size: 'lg',
};

export const WithChildren = () => {
  const [value, setValue] = React.useState('option1');

  const handleChange = (newValue: string | number) => {
    setValue(newValue.toString());
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <RadioGroup
          label="Select an option"
          value={value}
          onChange={handleChange}
          color="primary"
        >
          <Radio label="Option 1" value="option1" />
          <Radio label="Option 2" value="option2" />
          <Radio label="Option 3" value="option3" />
        </RadioGroup>
      </div>
    </StoryContainer>
  );
};

export const FormExample = () => {
  const [formData, setFormData] = React.useState({
    gender: '',
    experience: '',
  });

  const handleGenderChange = (value: string | number) => {
    setFormData((prev) => ({ ...prev, gender: value.toString() }));
  };

  const handleExperienceChange = (value: string | number) => {
    setFormData((prev) => ({ ...prev, experience: value.toString() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Form submitted with:\nGender: ${formData.gender}\nExperience: ${formData.experience}`
    );
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold">Survey Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup
            label="Gender"
            value={formData.gender}
            onChange={handleGenderChange}
            error={!formData.gender ? 'Please select your gender' : undefined}
            color="primary"
          >
            <Radio label="Male" value="male" />
            <Radio label="Female" value="female" />
            <Radio label="Non-binary" value="non-binary" />
            <Radio label="Prefer not to say" value="not-specified" />
          </RadioGroup>

          <RadioGroup
            label="Years of experience"
            value={formData.experience}
            onChange={handleExperienceChange}
            error={
              !formData.experience
                ? 'Please select your experience level'
                : undefined
            }
            color="primary"
            direction="horizontal"
          >
            <Radio label="0-1" value="0-1" />
            <Radio label="1-3" value="1-3" />
            <Radio label="3-5" value="3-5" />
            <Radio label="5+" value="5+" />
          </RadioGroup>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md transition-colors ${
              formData.gender && formData.experience
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!formData.gender || !formData.experience}
          >
            Submit
          </button>
        </form>
      </div>
    </StoryContainer>
  );
};
