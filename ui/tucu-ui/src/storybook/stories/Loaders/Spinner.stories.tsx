import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Loader, Progressbar, Spinner } from '../../../components/loaders';

// Meta for Loader
const meta: Meta<typeof Spinner> = {
  title: '3. UI COMPONENTS/Loaders/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading components for indicating progress and loading states in the application.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the spinner',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'info', 'warning'],
      description: 'The color of the spinner',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// Spinner stories
export const DefaultSpinner: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  render: (args) => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Spinner</h2>
        <div className="flex items-center justify-center">
          <Spinner {...args} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const SpinnerSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Spinner Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Spinner size="sm" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Medium</h3>
            <Spinner size="md" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Large (Default)</h3>
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const SpinnerColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Spinner Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Brand (Default)</h3>
            <Spinner />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Blue</h3>
            <Spinner color="info" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Green</h3>
            <Spinner color="success" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Red</h3>
            <Spinner color="danger" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Yellow</h3>
            <Spinner color="warning" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Purple</h3>
            <Spinner color="gray" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// Combined usage example
export const LoadingStates: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loading States Examples</h2>

        {/* Button with spinner */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Button Loading State</h3>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
              <Spinner size="sm" />
              Loading...
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>

        {/* Form submission */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Form Submission</h3>
          <div className="bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="email@example.com"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="********"
                />
              </div>
              <div className="mt-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                  <Spinner size="sm" />
                  Signing in...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card loading state */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Card Loading State</h3>
          <div className="bg-white p-6 rounded-lg shadow-xs flex flex-col items-center justify-center min-h-[200px] dark:bg-gray-800">
            <Loader className="text-blue-600" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading content...
            </p>
          </div>
        </div>

        {/* Page loading progress */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Page Loading Progress</h3>
          <div className="bg-white p-6 rounded-lg shadow-xs dark:bg-gray-800">
            <div className="flex flex-col gap-4">
              <Progressbar value={75} color="primary" />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Loading assets: 75%
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
