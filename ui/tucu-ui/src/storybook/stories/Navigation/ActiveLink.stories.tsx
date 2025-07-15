import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { ActiveLink } from '../../../components/links';

const meta: Meta<typeof ActiveLink> = {
  title: '3. UI COMPONENTS/Navigation/Links/ActiveLink',
  component: ActiveLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ActiveLink component for navigation in the application.',
      },
    },
  },
  argTypes: {
    to: {
      control: 'object',
    },
    href: {
      control: 'object',
    },
    className: {
      control: 'object',
    },
    activeClassName: {
      control: 'object',
    },
    children: {
      control: 'object',
    },
  },
  args: {
    to: '/',
    href: '/',
    className: 'text-blue-600 hover:underline',
    activeClassName: 'font-bold text-blue-600',
    children: <span>Active Link</span>,
  },
};

export default meta;
type Story = StoryObj<typeof ActiveLink>;

// ActiveLink stories
export const DefaultActiveLink: Story = {};

// ActiveLink stories
export const ActiveLinkExample: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-xl font-semibold mb-4">ActiveLink Component</h2>
        <p className="text-sm text-gray-600 mb-4">
          The ActiveLink below will be highlighted when the current path matches
          its href. In this Storybook environment, you can't see the active
          state unless the story path matches the link path.
        </p>
        <div className="flex gap-4">
          <ActiveLink
            to="/"
            href="/"
            className="text-gray-600 hover:text-blue-600"
            activeClassName="font-bold text-blue-600"
          >
            Home Link
          </ActiveLink>
          <ActiveLink
            to="/about"
            href="/about"
            className="text-gray-600 hover:text-blue-600"
            activeClassName="font-bold text-blue-600"
          >
            About Link
          </ActiveLink>
          <ActiveLink
            to="/contact"
            href="/contact"
            className="text-gray-600 hover:text-blue-600"
            activeClassName="font-bold text-blue-600"
          >
            Contact Link
          </ActiveLink>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const CustomStyledActiveLinks: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Custom Styled ActiveLinks
        </h2>
        <div className="flex flex-col gap-6">
          {/* Navigation Menu Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium mb-4">Navigation Menu</h3>
            <div className="flex gap-4">
              <ActiveLink
                to="/"
                href="/"
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              >
                Dashboard
              </ActiveLink>
              <ActiveLink
                to="/profile"
                href="/profile"
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              >
                Profile
              </ActiveLink>
              <ActiveLink
                to="/settings"
                href="/settings"
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              >
                Settings
              </ActiveLink>
            </div>
          </div>

          {/* Tab Navigation Example */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Tab Navigation</h3>
            <div className="flex">
              <ActiveLink
                to="/tab1"
                href="/tab1"
                className="py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                activeClassName="text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              >
                Tab 1
              </ActiveLink>
              <ActiveLink
                to="/tab2"
                href="/tab2"
                className="py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                activeClassName="text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              >
                Tab 2
              </ActiveLink>
              <ActiveLink
                to="/tab3"
                href="/tab3"
                className="py-2 px-4 text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                activeClassName="text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              >
                Tab 3
              </ActiveLink>
            </div>
          </div>

          {/* Sidebar Navigation Example */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Sidebar Navigation</h3>
            <div className="flex flex-col w-64 gap-1">
              <ActiveLink
                to="/dashboard"
                href="/dashboard"
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-600 text-white dark:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </ActiveLink>
              <ActiveLink
                to="/analytics"
                href="/analytics"
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-600 text-white dark:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 17V5"></path>
                  <path d="M8 17v-3"></path>
                </svg>
                Analytics
              </ActiveLink>
              <ActiveLink
                to="/reports"
                href="/reports"
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700"
                activeClassName="bg-blue-600 text-white dark:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Reports
              </ActiveLink>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
