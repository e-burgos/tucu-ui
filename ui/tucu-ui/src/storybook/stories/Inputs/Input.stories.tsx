import type { Meta, StoryFn } from '@storybook/react-vite';
import { Input } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import { Mail, User, Calendar, Search } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: '3. UI COMPONENTS/Inputs/Input',
  tags: ['autodocs'],
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'The Input component is a building block for creating text fields, number inputs, and other form controls. It supports various features like labels, error messages, icons, and masks.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'date', 'tel'],
      description: 'The type of input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when the input is empty',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    icon: {
      control: 'object',
      description: 'Icon element to display inside the input',
    },
    suffix: {
      control: 'text',
      description: 'Content to display at the end of the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component container',
    },
    inputClassName: {
      control: 'text',
      description: 'Additional CSS classes for the input element',
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    placeholder: 'Placeholder text',
  },
};

export default meta;

const Template: StoryFn<typeof Input> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <Input {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Mail className="h-4 w-4" />,
  placeholder: 'Enter your email',
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: 'Kg',
  placeholder: 'Enter weight',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  label: 'Email',
  placeholder: 'example@domain.com',
  icon: <Mail className="h-4 w-4" />,
};

export const Date = Template.bind({});
Date.args = {
  type: 'date',
  label: 'Birth Date',
  icon: <Calendar className="h-4 w-4" />,
};

export const WithUppercaseLabel = Template.bind({});
WithUppercaseLabel.args = {
  label: 'Username',
  useUppercaseLabel: true,
  icon: <User className="h-4 w-4" />,
};

export const SearchInput = Template.bind({});
SearchInput.args = {
  label: 'Search',
  placeholder: 'Search...',
  icon: <Search className="h-4 w-4" />,
};

export const FormExample = () => (
  <StoryContainer>
    <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
      <Input
        label="Full Name"
        placeholder="John Doe"
        icon={<User className="h-4 w-4" />}
        required
      />
      <Input
        label="Email"
        type="email"
        error="This field is required"
        placeholder="example@domain.com"
        icon={<Mail className="h-4 w-4" />}
        required
      />
      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
        Submit
      </button>
    </div>
  </StoryContainer>
);
