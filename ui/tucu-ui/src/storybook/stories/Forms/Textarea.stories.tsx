import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Textarea } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Textarea> = {
  title: 'UI COMPONENTS/Forms/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          'The Textarea component is used for multi-line text input. It supports various features like labels, error messages, and custom styling.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when the textarea is empty',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component container',
    },
    inputClassName: {
      control: 'text',
      description: 'Additional CSS classes for the textarea element',
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
  },
};

export default meta;

const Template: StoryFn<typeof Textarea> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Textarea {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Please enter at least 10 characters',
  value: 'Hello',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'This textarea is disabled and cannot be edited.',
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const WithCustomHeight = Template.bind({});
WithCustomHeight.args = {
  inputClassName: 'h-40',
  placeholder: 'This textarea has a custom height...',
};

export const WithCharacterCounter = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <CharacterCounterExample />
    </div>
  </StoryContainer>
);

// Example with character counter
function CharacterCounterExample() {
  const maxLength = 150;
  const [value, setValue] = React.useState('');
  const charsLeft = maxLength - value.length;

  return (
    <div className="w-full">
      <Textarea
        label="Your bio"
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
      />
      <div
        className={`text-right text-xs mt-1 ${
          charsLeft < 10 ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {charsLeft} characters left
      </div>
    </div>
  );
}

export const FormExample = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
      <Textarea
        label="Your Feedback"
        placeholder="Please share your thoughts..."
        required
      />
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Submit Feedback
        </button>
      </div>
    </div>
  </StoryContainer>
);
