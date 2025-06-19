import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from '../../../components/headlessui';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof TabGroup> = {
  title: 'EXTERNAL LIBS/HeadlessUI/Tab',
  tags: ['autodocs'],
  component: TabGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The Tab component is used to create accessible tabbed interfaces. It manages the active tab state and ensures the correct accessibility attributes are applied.',
      },
    },
  },
  argTypes: {},
};

export default meta;

const BasicTabTemplate: StoryFn<typeof TabGroup> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md mx-auto">
      <TabGroup {...args}>
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden focus:ring-2">
            Tab 1
          </TabItem>
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden focus:ring-2">
            Tab 2
          </TabItem>
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden focus:ring-2">
            Tab 3
          </TabItem>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="rounded-xl bg-white p-3 ring-1 ring-blue-100">
            <h3 className="text-lg font-medium">Tab Panel 1</h3>
            <p className="mt-2 text-sm text-gray-500">
              This is the content of the first tab panel.
            </p>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-1 ring-blue-100">
            <h3 className="text-lg font-medium">Tab Panel 2</h3>
            <p className="mt-2 text-sm text-gray-500">
              This is the content of the second tab panel.
            </p>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-1 ring-blue-100">
            <h3 className="text-lg font-medium">Tab Panel 3</h3>
            <p className="mt-2 text-sm text-gray-500">
              This is the content of the third tab panel.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </StoryContainer>
);

export const Default = BasicTabTemplate.bind({});
Default.args = {};

export const SelectedTab = BasicTabTemplate.bind({});
SelectedTab.args = {
  selectedIndex: 1,
};

// Style variants for tabs
export const VerticalTabs = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-4xl mx-auto">
      <TabGroup vertical>
        <div className="flex space-x-6">
          <TabList className="flex flex-col space-y-1 bg-gray-100 p-2 rounded-lg w-48">
            <TabItem className="px-4 py-2 text-left rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Account Settings
            </TabItem>
            <TabItem className="px-4 py-2 text-left rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Notifications
            </TabItem>
            <TabItem className="px-4 py-2 text-left rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Security
            </TabItem>
          </TabList>
          <TabPanels className="flex-1">
            <TabPanel className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-xs"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Push notifications</span>
                </label>
              </div>
            </TabPanel>
            <TabPanel className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium">Security</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Change your password or enable two-factor authentication.
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Change Password
                </button>
              </div>
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  </StoryContainer>
);

// Tabs with custom styling
export const CustomStyling = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md mx-auto">
      <TabGroup>
        <TabList className="flex border-b border-gray-200">
          {['Recent', 'Popular', 'Trending'].map((category) => (
            <TabItem
              key={category}
              className="w-full py-2.5 text-sm font-medium leading-5 text-gray-700 hover:text-gray-900 focus:outline-hidden"
            >
              {category}
            </TabItem>
          ))}
        </TabList>
        <TabPanels className="mt-4">
          <TabPanel>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Recent Post 1</h3>
                <p className="text-sm text-gray-500">Posted 2 hours ago</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Recent Post 2</h3>
                <p className="text-sm text-gray-500">Posted 4 hours ago</p>
              </li>
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Popular Post 1</h3>
                <p className="text-sm text-gray-500">1.2k views</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Popular Post 2</h3>
                <p className="text-sm text-gray-500">982 views</p>
              </li>
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Trending Post 1</h3>
                <p className="text-sm text-gray-500">Trending for 3 days</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Trending Post 2</h3>
                <p className="text-sm text-gray-500">Trending for 1 day</p>
              </li>
            </ul>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </StoryContainer>
);

// Tabs with icons
export const TabsWithIcons = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md mx-auto">
      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </div>
          </TabItem>
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </div>
          </TabItem>
          <TabItem className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact
            </div>
          </TabItem>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="rounded-xl bg-white p-3 shadow-sm">
            <h3 className="text-lg font-medium">Home</h3>
            <p className="mt-2 text-sm text-gray-500">
              Welcome to the home page of our website.
            </p>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 shadow-sm">
            <h3 className="text-lg font-medium">About</h3>
            <p className="mt-2 text-sm text-gray-500">
              Learn more about our company and our mission.
            </p>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 shadow-sm">
            <h3 className="text-lg font-medium">Contact</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get in touch with our team for any questions or inquiries.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </StoryContainer>
);
