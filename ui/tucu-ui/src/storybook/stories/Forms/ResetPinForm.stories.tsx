import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResetPinForm } from '../../../components/auth/reset-pin-form';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof ResetPinForm> = {
  title: '3. UI COMPONENTS/Auth/ResetPinForm',
  component: ResetPinForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The ResetPinForm component provides a form for users to enter a PIN code for password reset verification.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the reset PIN form',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the submit button',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function called when form is submitted',
    },
    signInPath: {
      control: 'text',
      description: 'Path to the sign in page',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the form is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    pinLength: {
      control: 'number',
      description: 'Length of the PIN code',
    },
    children: {
      description: 'Additional content to render above the form',
    },
    className: {
      control: 'text',
      description: 'Additional class name to apply to the form',
    },
  },
  args: {
    title: 'Reset PIN',
    description: 'Enter the PIN code sent to your email to reset your password',
    buttonText: 'Verify PIN',
    signInPath: '/sign-in',
    className: 'w-full max-w-md mx-auto',
    isLoading: false,
    error: undefined,
    pinLength: 5,
    children: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof ResetPinForm>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ResetPinForm {...args} />
    </StoryContainer>
  ),
  args: {},
};

export const WithError: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ResetPinForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Reset PIN with error',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    error: 'Invalid PIN code. Please check and try again.',
    onSubmit: (data) => {
      alert(JSON.stringify(data));
    },
  },
};

export const Loading: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ResetPinForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Reset PIN',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    error: undefined,
    isLoading: true,
  },
};

export const CustomLength: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ResetPinForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Reset PIN - 6 Digits',
    description: 'Enter the 6-digit PIN code sent to your email',
    buttonText: 'Verify 6-Digit PIN',
    pinLength: 6,
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ResetPinForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Verify Your Identity',
    description: 'Enter the security code to continue with password reset',
    buttonText: 'Confirm Identity',
    children: (
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Code expires in 10 minutes
        </div>
      </div>
    ),
  },
};
