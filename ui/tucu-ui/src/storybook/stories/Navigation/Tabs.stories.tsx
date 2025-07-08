import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from '../../../components/tabs/tab';
import { Home, Settings, Users } from 'lucide-react';

const meta: Meta<typeof TabGroup> = {
  title: 'UI COMPONENTS/Navigation/Tabs',
  component: TabGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tab components for creating tabbed interfaces in the application.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

export const BasicTabs: Story = {
  render: () => (
    <StoryContainer>
      <div className="w-full max-w-3xl mx-auto">
        <TabGroup defaultIndex={0}>
          <TabList className="relative mb-6 bg-body text-sm uppercase before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-xs before:bg-gray-200 dark:bg-dark dark:before:bg-gray-800 sm:gap-8 sm:rounded-none md:before:h-0.5">
            <div className="flex gap-6 md:gap-8 xl:gap-10 3xl:gap-12">
              <TabItem>Dashboard</TabItem>
              <TabItem>Profile</TabItem>
              <TabItem>Settings</TabItem>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <p>
                  This is the dashboard content. You can put any content here.
                </p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <p>
                  This is the profile content. You can put any content here.
                </p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <p>
                  This is the settings content. You can put any content here.
                </p>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </StoryContainer>
  ),
};

export const TabsWithIcons: Story = {
  render: () => (
    <StoryContainer>
      <div className="w-full max-w-3xl mx-auto">
        <TabGroup defaultIndex={0}>
          <TabList className="relative mb-6 bg-body text-sm uppercase before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-xs before:bg-gray-200 dark:bg-dark dark:before:bg-gray-800 sm:gap-8 sm:rounded-none md:before:h-0.5">
            <div className="flex gap-6 md:gap-8 xl:gap-10 3xl:gap-12">
              <TabItem>
                <span className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </span>
              </TabItem>
              <TabItem>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users
                </span>
              </TabItem>
              <TabItem>
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </span>
              </TabItem>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <p>
                  This is the dashboard content. You can put any content here.
                </p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <p>This is the users content. You can put any content here.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <p>
                  This is the settings content. You can put any content here.
                </p>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </StoryContainer>
  ),
};

export const CustomStyledTabs: Story = {
  render: () => (
    <StoryContainer>
      <div className="w-full max-w-3xl mx-auto">
        <TabGroup defaultIndex={0}>
          <TabList className="relative mb-6 bg-gray-100 rounded-lg p-1 dark:bg-gray-800 sm:gap-8">
            <div className="flex gap-4 px-4">
              <TabItem className="!py-2 !text-sm !tracking-normal">
                Dashboard
              </TabItem>
              <TabItem className="!py-2 !text-sm !tracking-normal">
                Analytics
              </TabItem>
              <TabItem className="!py-2 !text-sm !tracking-normal">
                Reports
              </TabItem>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <p>This is the dashboard content with custom styled tabs.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Analytics</h2>
                <p>This is the analytics content with custom styled tabs.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Reports</h2>
                <p>This is the reports content with custom styled tabs.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </StoryContainer>
  ),
};
