import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Disclosure } from '../../../components/headlessui';
import { StoryContainer } from '../../components/StoryContainer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const meta: Meta<typeof Disclosure> = {
  title: 'UI COMPONENTS/HeadlessUI/Disclosure',
  tags: ['autodocs'],
  component: Disclosure,
  parameters: {
    docs: {
      description: {
        component:
          'The Disclosure component is used to create expandable sections of content. This allows you to show or hide content based on user interaction.',
      },
    },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the disclosure is open by default',
    },
    as: {
      control: 'text',
      description: 'The element to render as',
    },
  },
};

export default meta;

const Template: StoryFn<typeof Disclosure> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Disclosure {...args}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>What is Tucu UI?</span>
              {open ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Tucu UI is a component library built with React and Tailwind CSS
              that provides a set of accessible, reusable, and customizable
              components.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  defaultOpen: true,
};

export const MultipleDisclosures = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md mx-auto space-y-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>What is Tucu UI?</span>
              {open ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Tucu UI is a component library built with React and Tailwind CSS
              that provides a set of accessible, reusable, and customizable
              components.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>How do I use Tucu UI?</span>
              {open ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              You can import components from the library and use them in your
              React application. Each component is highly customizable using
              props and Tailwind CSS classes.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>Is Tucu UI accessible?</span>
              {open ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Yes! Tucu UI is built on top of Headless UI, which provides fully
              accessible components. All components support keyboard navigation,
              focus management, and screen readers.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </StoryContainer>
);

export const CustomStyling = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`
              flex w-full justify-between rounded-md 
              ${
                open
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-900'
              } 
              px-4 py-3 text-left font-medium shadow transition-all duration-200
              hover:${open ? 'bg-indigo-700' : 'bg-indigo-200'} 
              focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75
            `}
            >
              <span>Advanced Settings</span>
              {open ? (
                <ChevronUp
                  className={`h-5 w-5 ${
                    open ? 'text-white' : 'text-indigo-500'
                  }`}
                />
              ) : (
                <ChevronDown
                  className={`h-5 w-5 ${
                    open ? 'text-white' : 'text-indigo-500'
                  }`}
                />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 px-4 pt-4 pb-2 text-sm rounded-md bg-gray-50 shadow-inner">
              <div className="space-y-3">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Enable developer mode</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Show advanced options</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Enable experimental features</span>
                  </label>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </StoryContainer>
);

export const NestedDisclosures = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Disclosure>
        {({ open: parentOpen }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span>Account Settings</span>
              {parentOpen ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <p className="mb-4">
                Manage your account settings and preferences.
              </p>

              <div className="ml-4 space-y-2">
                <Disclosure>
                  {({ open: childOpen1 }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                        <span>Profile Information</span>
                        {childOpen1 ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                        <p>Edit your name, email, and profile picture.</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open: childOpen2 }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                        <span>Security Settings</span>
                        {childOpen2 ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                        <p>
                          Change your password and enable two-factor
                          authentication.
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </StoryContainer>
);
