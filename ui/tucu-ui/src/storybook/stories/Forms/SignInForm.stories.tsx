import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignInForm } from '../../../components/auth/sign-in-form';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof SignInForm> = {
  title: '3. UI COMPONENTS/Auth/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The SignInForm component provides a complete sign-in form with email, password fields, remember me checkbox, and forgot password link.',
      },
    },
  },

  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the sign-in form',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the submit button',
    },
    forgetPasswordPath: {
      control: 'text',
      description: 'Path to the forgot password page',
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
    children: {
      description: 'Additional content to render above the form',
    },
    className: {
      control: 'text',
      description: 'Additional class name to apply to the form',
    },
  },
  args: {
    title: 'Sign In',
    description: 'Please sign in to your account to continue',
    buttonText: 'Sign In',
    className: 'w-full max-w-md mx-auto',
    isLoading: false,
    error: 'Invalid email or password. Please try again.',
    forgetPasswordPath: '/forgot-password',
    onSubmit: (data) => {
      alert(JSON.stringify(data));
    },
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
          Use demo@example.com / password123 for testing
        </div>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignInForm {...args} />
    </StoryContainer>
  ),
  args: {
    forgetPasswordPath: '/forgot-password',
  },
};

export const WithError: Story = {
  args: {
    title: 'Sign In with error',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    forgetPasswordPath: '/forgot-password',
    error: 'Invalid email or password. Please try again.',
  },
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignInForm {...args} />
    </StoryContainer>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignInForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Sign In',
    description: undefined,
    buttonText: undefined,
    children: undefined,
    error: undefined,
    forgetPasswordPath: '/forgot-password',
    isLoading: true,
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignInForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Welcome Back',
    description: 'Please sign in to your account to continue',
    buttonText: 'Sign In Now',
    className: 'w-full max-w-md mx-auto',
    isLoading: false,
    error: undefined,
    forgetPasswordPath: '/forgot-password',
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
          This is a custom content
        </div>
      </div>
    ),
  },
};
