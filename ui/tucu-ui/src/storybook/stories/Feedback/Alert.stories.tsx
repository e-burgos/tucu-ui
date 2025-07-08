import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Alert } from '../../../components/notifications';

// Meta for Alert component
const meta: Meta<typeof Alert> = {
  title: 'UI COMPONENTS/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Alert component for displaying important information that can be dismissed.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Basic Alert
export const Default: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Alert</h2>
        <Alert>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This is a simple alert message. Click the X to dismiss.
          </p>
        </Alert>
      </div>
    </StoryContainer>
  ),
};

// Alert with title
export const WithTitle: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Alert with Title</h2>
        <Alert>
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
              Important Notice
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This alert contains a title and a message. Click the X to dismiss.
            </p>
          </div>
        </Alert>
      </div>
    </StoryContainer>
  ),
};

// Alert variants
export const Variants: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Alert Variants</h2>

        <div className="space-y-4">
          {/* Success Alert */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Success Alert</h3>
            <div className="rounded-lg bg-green-50 border border-green-200 py-4 px-6 dark:bg-green-900/20 dark:border-green-800">
              <Alert>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="h-4 w-4 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Your changes have been saved successfully.
                    </p>
                  </div>
                </div>
              </Alert>
            </div>
          </div>

          {/* Error Alert */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Error Alert</h3>
            <div className="rounded-lg bg-red-50 border border-red-200 py-4 px-6 dark:bg-red-900/20 dark:border-red-800">
              <Alert>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="h-4 w-4 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-400">
                      An error occurred while processing your request.
                    </p>
                  </div>
                </div>
              </Alert>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Warning Alert</h3>
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 py-4 px-6 dark:bg-yellow-900/20 dark:border-yellow-800">
              <Alert>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="h-4 w-4 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Please review your information before proceeding.
                    </p>
                  </div>
                </div>
              </Alert>
            </div>
          </div>

          {/* Info Alert */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Info Alert</h3>
            <div className="rounded-lg bg-blue-50 border border-blue-200 py-4 px-6 dark:bg-blue-900/20 dark:border-blue-800">
              <Alert>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      A new software update is available. See what's new in
                      version 2.0.4.
                    </p>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// Component for the form context example
const FormContextExample: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Alert in Form Context</h2>

        <div className="bg-white p-6 rounded-lg shadow-xs dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            {showAlert && (
              <Alert>
                <div className="flex items-center">
                  <div className="shrink-0">
                    <svg
                      className="h-4 w-4 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Please fill out all required fields before submitting.
                    </p>
                  </div>
                </div>
              </Alert>
            )}

            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Name *</label>
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="mt-2 flex gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowAlert(false)}
                >
                  Dismiss Alert
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setShowAlert(true)}
                >
                  Show Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  );
};

// Alert in a form context
export const InFormContext: Story = {
  render: () => <FormContextExample />,
};
