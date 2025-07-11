import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { AuthLayout } from '../../../components/layouts/authentication/layout';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof AuthLayout> = {
  title: '3. UI COMPONENTS/Layout/AuthLayout',
  tags: ['autodocs'],
  component: AuthLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The AuthLayout component provides a simple layout for authentication pages with a full-height container.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the layout container',
    },
    children: {
      description: 'The content of the layout',
    },
  },
};

export default meta;

const Template: StoryFn<typeof AuthLayout> = (args) => {
  return (
    <StoryContainer className="p-0 h-[800px]">
      <AuthLayout {...args} />
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  ),
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'bg-gray-50 dark:bg-gray-900',
  children: (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Create a password"
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
            Create Account
          </button>
        </div>
      </div>
    </div>
  ),
};
