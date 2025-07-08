import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { ParamTab, TabPanel } from '../../../components/tabs/param-tab';
import { StoryContainer } from '../../components/StoryContainer';
import { Home, Users, Bell, CreditCard } from 'lucide-react';
import { Button } from '../../../components/buttons/button';
import Badge from '../../../components/common/badge';

const meta: Meta<typeof ParamTab> = {
  title: 'UI COMPONENTS/Navigation/ParamTab',
  component: ParamTab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ParamTab component for creating URL parameter-based tabs that sync with the browser URL.',
      },
    },
  },
};

export default meta;

const tabMenu = [
  {
    title: 'Overview',
    path: '/overview',
  },
  {
    title: 'Analytics',
    path: '/analytics',
  },
  {
    title: 'Reports',
    path: '/reports',
  },
  {
    title: 'Notifications',
    path: '/notifications',
  },
];

const tabMenuWithIcons = [
  {
    title: (
      <span className="flex items-center gap-2">
        <Home className="h-4 w-4" />
        Overview
      </span>
    ),
    path: '/overview',
  },
  {
    title: (
      <span className="flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        Analytics
      </span>
    ),
    path: '/analytics',
  },
  {
    title: (
      <span className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Reports
      </span>
    ),
    path: '/reports',
  },
  {
    title: (
      <span className="flex items-center gap-2">
        <Bell className="h-4 w-4" />
        Notifications
      </span>
    ),
    path: '/notifications',
  },
];

const Template: StoryFn<typeof ParamTab> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-3xl mx-auto">
      <ParamTab {...args}>
        <TabPanel>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p className="mb-4">
              This is the overview content. You can put any content here.
            </p>
            <Button variant="solid" color="primary" size="small">
              Get Started
            </Button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <div className="space-y-4">
              <p>
                This is the analytics content. You can put any content here.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                  <h3 className="font-medium mb-1">Total Users</h3>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                  <h3 className="font-medium mb-1">Revenue</h3>
                  <p className="text-2xl font-bold">$5,678</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                  <h3 className="font-medium mb-1">Conversion</h3>
                  <p className="text-2xl font-bold">12.3%</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Reports</h2>
            <p className="mb-4">
              This is the reports content. You can put any content here.
            </p>
            <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Report #1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge size="sm" variant="outline">
                        Completed
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">$250.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Report #2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">$125.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow flex items-start gap-4">
                <Bell className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">New update available</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Version 2.0 is now available. Click to update.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    5 minutes ago
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow flex items-start gap-4">
                <Users className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium">New user registered</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    User John Doe has registered.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </ParamTab>
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  tabMenu,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  tabMenu: tabMenuWithIcons,
};

export const CustomTabListStyle = Template.bind({});
CustomTabListStyle.args = {
  tabMenu,
  tabListClassName: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-2 before:h-0',
};
