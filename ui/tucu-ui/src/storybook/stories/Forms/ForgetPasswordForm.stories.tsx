import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ForgetPasswordForm } from '../../../components/auth/forget-password-form';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof ForgetPasswordForm> = {
  title: '3. UI COMPONENTS/Auth/ForgetPasswordForm',
  component: ForgetPasswordForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The ForgetPasswordForm component provides a form for users to request a password reset by entering their email address.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the forget password form',
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
    isLoading: {
      control: 'boolean',
      description: 'Whether the form is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    successMessage: {
      control: 'text',
      description: 'Success message to display after form submission',
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
    title: 'Forgot Password',
    description: "Enter your email address and we'll send you a reset code",
    buttonText: 'Send Reset Code',
    className: 'w-full max-w-md mx-auto',
    isLoading: false,
    error: undefined,
    successMessage: undefined,
    children: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof ForgetPasswordForm>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ForgetPasswordForm {...args} />
    </StoryContainer>
  ),
  args: {},
};

export const WithError: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ForgetPasswordForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Forgot Password with error',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    successMessage: undefined,
    error: 'Email address not found. Please check your email and try again.',
  },
};

export const WithSuccess: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ForgetPasswordForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Forgot Password',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    error: undefined,
    successMessage:
      'Reset code sent! Please check your email for further instructions.',
  },
};

export const Loading: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ForgetPasswordForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Forgot Password',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    error: undefined,
    successMessage: undefined,
    isLoading: true,
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <ForgetPasswordForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Reset Your Password',
    description: "No worries! Enter your email and we'll help you reset it",
    buttonText: 'Send Recovery Email',
    children: (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Make sure to check your spam folder for the reset email
        </div>
      </div>
    ),
  },
};
