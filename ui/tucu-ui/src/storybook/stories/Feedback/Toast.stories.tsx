import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Toast } from '../../../components/notifications';
import { useToastStore, IToast } from '../../../hooks/use-toast-store';

// Meta for Toast component
const meta: Meta<typeof Toast> = {
  title: '3. UI COMPONENTS/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast notification component for displaying temporary notifications.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'success', 'destructive', 'warning', 'info'],
      },
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Custom component to demonstrate Toast functionality
const ToastDemo: React.FC = () => {
  const { addToast } = useToastStore();

  const showToast = (variant: IToast['variant']) => {
    const title = variant
      ? `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`
      : 'Default Toast';

    addToast({
      id: Date.now().toString(),
      title,
      message: `This is a ${variant || 'default'} toast notification.`,
      variant: variant || 'default',
      timeout: 5000,
      dismissing: false,
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showToast('default')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Show Default Toast
        </button>

        <button
          onClick={() => showToast('success')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Show Success Toast
        </button>

        <button
          onClick={() => showToast('destructive')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Show Error Toast
        </button>

        <button
          onClick={() => showToast('warning')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Show Warning Toast
        </button>

        <button
          onClick={() => showToast('info')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Show Info Toast
        </button>
      </div>

      <Toast />
    </div>
  );
};

// Basic Toast Demo
export const Basic: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Toast Notifications</h2>
        <div className="space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click the buttons below to show different types of toast
            notifications. The toasts will appear at the bottom right of the
            screen and automatically dismiss after 5 seconds, or you can
            manually dismiss them by clicking the X.
          </p>

          <ToastDemo />
        </div>
      </div>
    </StoryContainer>
  ),
};

// Component showing interactive usage of Toast
const InteractiveToastDemo: React.FC = () => {
  const { addToast } = useToastStore();

  const showLoginSuccess = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Login Successful',
      message: 'Welcome back! You have successfully logged in.',
      variant: 'success',
      timeout: 5000,
      dismissing: false,
    });
  };

  const showFormError = () => {
    addToast({
      id: Date.now().toString(),
      title: 'Form Error',
      message: 'Please fill in all required fields before submitting.',
      variant: 'destructive',
      timeout: 5000,
      dismissing: false,
    });
  };

  const showNewMessage = () => {
    addToast({
      id: Date.now().toString(),
      title: 'New Message',
      message: 'You have received a new message from John Doe.',
      variant: 'info',
      timeout: 5000,
      dismissing: false,
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Login Form */}
        <div className="bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4">Login Form</h3>
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
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={showLoginSuccess}
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Form with Validation */}
        <div className="bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4">Form with Validation</h3>
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
                placeholder="email@example.com"
              />
            </div>
            <div className="mt-2">
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={showFormError}
              >
                Submit (Show Error)
              </button>
            </div>
          </div>
        </div>

        {/* Notification Center */}
        <div className="bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4">Notification Center</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </div>
              <span className="text-sm">You have 3 unread notifications</span>
            </div>
            <button
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={showNewMessage}
            >
              Show Message Toast
            </button>
          </div>
        </div>
      </div>

      <Toast />
    </div>
  );
};

// Toast in an interactive context
export const InteractiveContext: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Toast in Interactive Context
        </h2>
        <div className="space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Below are interactive examples showing how toasts can be used in
            real application contexts. Click the buttons to see different toast
            notifications.
          </p>

          <InteractiveToastDemo />
        </div>
      </div>
    </StoryContainer>
  ),
};

// Custom Toast variations
export const CustomToasts: Story = {
  render: () => {
    const ToastCustomDemo = () => {
      const { addToast } = useToastStore();

      const showCustomToast = () => {
        addToast({
          id: Date.now().toString(),
          title: 'Custom Toast',
          message: 'This is a custom toast with longer timeout (10 seconds).',
          variant: 'default',
          timeout: 10000,
          dismissing: false,
        });
      };

      const showLongToast = () => {
        addToast({
          id: Date.now().toString(),
          title: 'Long Content Toast',
          message:
            'This toast contains a longer message to demonstrate how the component handles larger content. It might wrap to multiple lines depending on the screen size and content length.',
          variant: 'info',
          timeout: 7000,
          dismissing: false,
        });
      };

      return (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={showCustomToast}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Show Custom Timeout Toast
          </button>

          <button
            onClick={showLongToast}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Show Long Content Toast
          </button>
        </div>
      );
    };

    return (
      <StoryContainer>
        <div className="flex flex-col gap-8 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Custom Toast Variations
          </h2>
          <div className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              These examples demonstrate custom variations of toast
              notifications with different timeout durations and content
              lengths.
            </p>

            <ToastCustomDemo />
            <Toast />
          </div>
        </div>
      </StoryContainer>
    );
  },
};
