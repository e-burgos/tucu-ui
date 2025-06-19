import React, { useState, Fragment } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import {
  Dialog,
  TransitionChild,
  Transition,
} from '../../../components/headlessui';
import { StoryContainer } from '../../components/StoryContainer';
import Button from '../../../components/buttons/button';
import { DialogPanel, DialogTitle } from '@headlessui/react';

const meta: Meta<typeof Dialog> = {
  title: 'EXTERNAL LIBS/HeadlessUI/Dialog',
  tags: ['autodocs'],
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'The Dialog component is a primitive modal dialog that renders content on top of the page. It uses Headless UI to manage accessibility and focus.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dialog is open or closed',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the dialog is closed',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the dialog',
    },
  },
};

export default meta;

// Basic Dialog Template
const DialogTemplate: StoryFn<typeof Dialog> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <StoryContainer className="justify-center items-center">
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

      <Dialog
        open={isOpen}
        className="relative z-10"
        {...args}
        onClose={closeDialog}
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Payment Successful
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully processed. We've sent you an
                email with your order details.
              </p>
            </div>

            <div className="mt-4">
              <Button onClick={closeDialog}>Got it, thanks!</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </StoryContainer>
  );
};

export const Default = DialogTemplate.bind({});

// Dialog with Transition
export const WithTransition = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog with Transition
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-xs" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subscription Confirmed
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your subscription has been confirmed. We've sent you an
                      email with all of the details.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </StoryContainer>
  );
};

// Dialog with custom design
export const CustomDesign = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Button onClick={() => setIsOpen(true)}>Open Custom Dialog</Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" className="text-xl font-bold text-white">
                    Congratulations! 🎉
                  </DialogTitle>
                  <div className="mt-4">
                    <p className="text-white/90">
                      You've unlocked a new achievement in your journey.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-white text-blue-600 hover:bg-white/90"
                    >
                      Claim Reward
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </StoryContainer>
  );
};

// Confirmation Dialog
export const ConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setIsOpen(false);
  };

  return (
    <StoryContainer className="justify-center items-center">
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)} className="mb-4">
          Delete Account
        </Button>
        {confirmed && (
          <p className="text-red-600 text-sm mt-2">
            Account deletion process has started.
          </p>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-xs" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Account?
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your account? All of your
                      data will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleConfirm}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </StoryContainer>
  );
};
