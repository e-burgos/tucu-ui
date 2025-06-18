import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Modal } from '../../../components/headlessui/modal';
import { StoryContainer } from '../../components/StoryContainer';
import Button from '../../../components/buttons/button';

const meta: Meta<typeof Modal> = {
  title: 'UI COMPONENTS/HeadlessUI/Modal',
  tags: ['autodocs'],
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'The Modal component displays content that temporarily blocks interactions with the main view. It is commonly used for dialogs, forms, or confirmation messages.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed',
    },
    closeable: {
      control: 'boolean',
      description:
        'Whether the modal can be closed by clicking outside or on the X button',
    },
    hideButtons: {
      control: 'boolean',
      description: 'Whether to hide the default buttons (accept/close)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal container',
    },
    text: {
      control: 'object',
      description: 'Object containing title, content and button text',
    },
    buttonContainer: {
      control: 'object',
      description: 'Custom button container component',
    },
  },
  args: {
    isOpen: true,
    closeable: true,
    hideButtons: false,
  },
};

export default meta;

// Modal with trigger button template
const ModalTemplate: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} setIsOpen={setIsOpen} />
    </StoryContainer>
  );
};

export const Default = ModalTemplate.bind({});
Default.args = {
  text: {
    title: 'Modal Title',
    content: 'This is the content of the modal dialog.',
    button: 'Accept',
    backButton: 'Cancel',
  },
  children: (
    <div className="p-4">
      <p>This is the main content area of the modal.</p>
      <p className="mt-2">You can put any components or content here.</p>
    </div>
  ),
};

export const WithoutTitle = ModalTemplate.bind({});
WithoutTitle.args = {
  text: {
    content: 'This modal has no title, only content.',
    button: 'OK',
    backButton: 'Cancel',
  },
  children: (
    <div className="p-4">
      <p>This is a simple modal without a title.</p>
    </div>
  ),
};

export const HiddenButtons = ModalTemplate.bind({});
HiddenButtons.args = {
  text: {
    title: 'Custom Actions',
    content: 'This modal has hidden default buttons and uses custom ones.',
  },
  hideButtons: true,
  children: (
    <div className="p-4">
      <p>This modal uses custom buttons instead of the default ones.</p>
      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="ghost" size="small">
          Cancel
        </Button>
        <Button size="small">Custom Action</Button>
      </div>
    </div>
  ),
};

export const NonCloseable = ModalTemplate.bind({});
NonCloseable.args = {
  text: {
    title: 'Important Action',
    content: 'This modal cannot be closed by clicking outside.',
    button: 'Proceed',
    backButton: 'Go Back',
  },
  closeable: false,
  children: (
    <div className="p-4">
      <p>You must use one of the buttons to close this modal.</p>
      <p className="mt-2">Clicking outside will not close it.</p>
    </div>
  ),
};

export const WithCustomContent = ModalTemplate.bind({});
WithCustomContent.args = {
  text: {
    title: 'Form Modal',
    button: 'Submit',
    backButton: 'Cancel',
  },
  children: (
    <div className="p-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Enter your message"
        />
      </div>
    </div>
  ),
};

export const ConfirmationDialog = ModalTemplate.bind({});
ConfirmationDialog.args = {
  text: {
    title: 'Confirm Action',
    content:
      'Are you sure you want to perform this action? This cannot be undone.',
    button: 'Yes, Proceed',
    backButton: 'No, Cancel',
  },
};

export const AlertDialog = ModalTemplate.bind({});
AlertDialog.args = {
  text: {
    title: 'Alert',
    content: 'An error occurred while processing your request.',
    button: 'OK',
    backButton: 'Try Again',
  },
  children: (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-600">Error code: 500 - Internal Server Error</p>
      <p className="mt-2 text-red-600">
        Please try again later or contact support if the problem persists.
      </p>
    </div>
  ),
};
