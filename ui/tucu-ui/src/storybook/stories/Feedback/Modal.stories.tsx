import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Modal } from '../../../components/dialog/modal';
import { StoryContainer } from '../../components/StoryContainer';
import Button from '../../../components/buttons';
import { Check, AlertTriangle, Info } from 'lucide-react';

const meta: Meta<typeof Modal> = {
  title: 'UI COMPONENTS/Feedback/Modal',
  tags: ['autodocs'],
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'The Modal component displays content in a layer that appears above the rest of the page content. It is commonly used for confirmations, alerts, or custom content that requires user attention or interaction.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open or closed',
    },
    closeable: {
      control: 'boolean',
      description:
        'Whether the modal can be closed by clicking outside or the X button',
      defaultValue: true,
    },
    hideButtons: {
      control: 'boolean',
      description: 'Whether to hide the default action buttons',
      defaultValue: false,
    },
    text: {
      control: 'object',
      description: 'Text content for the modal title, content, and buttons',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal container',
    },
    setIsOpen: {
      action: 'setIsOpen',
      description: 'Function to control the modal open state',
    },
    onClose: {
      action: 'onClose',
      description: 'Function called when the modal is closed',
    },
    onBack: {
      action: 'onBack',
      description: 'Function called when the back/cancel button is clicked',
    },
    onSubmit: {
      action: 'onSubmit',
      description: 'Function called when the submit/accept button is clicked',
    },
  },
  args: {
    isOpen: false,
    closeable: true,
    hideButtons: false,
  },
};

export default meta;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StoryContainer>
      <Button
        variant="solid"
        size="medium"
        className="mt-4"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </Button>
      <Modal {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
        {args.children}
      </Modal>
    </StoryContainer>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  text: {
    title: 'Basic Modal',
    content: 'This is a basic modal with default settings.',
    button: 'Accept',
    backButton: 'Cancel',
  },
  children: (
    <div className="text-center p-4">
      <p>This is the main content area of the modal.</p>
      <p className="mt-2">You can add any content here.</p>
    </div>
  ),
};

export const Confirmation = Template.bind({});
Confirmation.args = {
  text: {
    title: 'Confirm Action',
    content: 'Are you sure you want to perform this action?',
    button: 'Confirm',
    backButton: 'Cancel',
  },
  children: (
    <div className="flex flex-col items-center justify-center p-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <p className="text-center">This action cannot be undone.</p>
    </div>
  ),
};

export const Success = Template.bind({});
Success.args = {
  text: {
    title: 'Success!',
    button: 'Close',
  },
  hideButtons: false,
  children: (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <Check className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">Operation Successful</h3>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Your changes have been saved successfully.
      </p>
    </div>
  ),
};

export const WithForm = Template.bind({});
WithForm.args = {
  text: {
    title: 'Contact Form',
    button: 'Submit',
    backButton: 'Cancel',
  },
  children: (
    <div className="w-full p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter your message"
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomButtons = Template.bind({});
CustomButtons.args = {
  text: {
    title: 'Custom Buttons',
  },
  hideButtons: true,
  buttonContainer: (
    <div className="flex flex-col gap-2 w-full">
      <Button variant="solid" color="success" fullWidth>
        Approve
      </Button>
      <Button variant="solid" color="danger" fullWidth>
        Reject
      </Button>
      <Button variant="ghost" fullWidth>
        Review Later
      </Button>
    </div>
  ),
  children: (
    <div className="text-center p-4">
      <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
      <p className="mb-2">Please select an action for this request.</p>
    </div>
  ),
};

export const NotCloseable = Template.bind({});
NotCloseable.args = {
  text: {
    title: 'Important Notice',
    content: 'This modal cannot be closed by clicking outside or the X button.',
    button: 'I Understand',
  },
  closeable: false,
  children: (
    <div className="text-center p-4">
      <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
      <p className="font-medium mb-2">
        You must acknowledge this notice to continue.
      </p>
      <p>Click the "I Understand" button to proceed.</p>
    </div>
  ),
};

export const LargeContent = Template.bind({});
LargeContent.args = {
  text: {
    title: 'Terms and Conditions',
    button: 'Accept',
    backButton: 'Decline',
  },
  className: 'max-w-2xl',
  children: (
    <div className="p-4">
      <h3 className="font-medium mb-2">1. Introduction</h3>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <p key={i} className="mb-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis
            aliquam nisl nunc quis nisl. Nullam euismod, nisl eget ultricies
            aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>
        ))}
      <h3 className="font-medium mb-2 mt-4">2. Privacy Policy</h3>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <p key={i + 10} className="mb-4 text-sm">
            Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc,
            quis aliquam nisl nunc quis nisl. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        ))}
    </div>
  ),
};
