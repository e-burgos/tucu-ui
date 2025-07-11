import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from '../../../components/auth/sign-up-form';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof SignUpForm> = {
  title: '3. UI COMPONENTS/Auth/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The SignUpForm component provides a complete registration form with first name, last name, email, password fields, and terms agreement checkbox.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the sign-up form',
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
    termsOfServicePath: {
      control: 'text',
      description: 'Path to the terms of service page',
    },
    privacyPolicyPath: {
      control: 'text',
      description: 'Path to the privacy policy page',
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
    title: 'Sign Up',
    description: 'Please sign up to your account to continue',
    buttonText: 'Sign Up',
    className: 'w-full max-w-md mx-auto',
    isLoading: false,
    error: undefined,
    children: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignUpForm {...args} />
    </StoryContainer>
  ),
  args: {
    termsOfServicePath: '/terms',
    privacyPolicyPath: '/privacy',
  },
};

export const WithError: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignUpForm {...args} />
    </StoryContainer>
  ),
  args: {
    termsOfServicePath: '/terms',
    privacyPolicyPath: '/privacy',
    error: 'Email address is already registered. Please use a different email.',
  },
};

export const Loading: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignUpForm {...args} />
    </StoryContainer>
  ),
  args: {
    termsOfServicePath: '/terms',
    privacyPolicyPath: '/privacy',
    isLoading: true,
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <StoryContainer className="justify-start">
      <SignUpForm {...args} />
    </StoryContainer>
  ),
  args: {
    title: 'Join Our Community',
    description: 'Create your account to get started with our platform',
    buttonText: 'Create Account',
    termsOfServicePath: '/terms',
    privacyPolicyPath: '/privacy',
    children: (
      <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Free account with unlimited access to basic features
        </div>
      </div>
    ),
  },
};
