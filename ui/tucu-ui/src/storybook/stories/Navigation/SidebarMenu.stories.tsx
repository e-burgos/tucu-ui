import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { SidebarMenu } from '../../../components/dialog/sidebar-menu';
import { StoryContainer } from '../../components/StoryContainer';
import { LogOut, Plus } from 'lucide-react';
import { Button } from '../../../components';
import { menuItems, menuItemsWithDropdown } from '../../hooks/useDummy';

const meta: Meta<typeof SidebarMenu> = {
  title: '3. UI COMPONENTS/Navigation/SidebarMenu',
  tags: ['autodocs'],
  component: SidebarMenu,
  parameters: {
    docs: {
      description: {
        component:
          'The SidebarMenu component is a specialized sidebar that includes navigation menu items. It is used within DrawerContainer to provide a navigation menu with support for dropdowns and icons.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the sidebar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the sidebar',
    },
    menuItems: {
      control: 'object',
      description: 'Array of navigation menu items',
    },
    children: {
      control: 'text',
      description: 'Additional content to display before the menu items',
    },
    actionContent: {
      control: 'text',
      description: 'Content to render at the bottom of the sidebar',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the close button is clicked',
    },
  },
  args: {
    title: 'Navigation',
    onClose: () => console.log('Closed'),
  },
};

export default meta;

// Menu items for all examples

const Template: StoryFn<typeof SidebarMenu> = (args) => (
  <StoryContainer className="!bg-brand/20">
    <div className="w-full max-w-xs h-[600px] relative">
      <SidebarMenu {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  menuItems,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Navigation Menu',
  menuItems,
};

export const WithActionContent = Template.bind({});
WithActionContent.args = {
  menuItems,
  actionContent: (
    <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-2">
      <LogOut size={16} />
      Logout
    </button>
  ),
};

export const WithAdditionalContent = Template.bind({});
WithAdditionalContent.args = {
  menuItems,
  children: (
    <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-sm">Welcome back, User!</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Last login: Today at 10:30 AM
      </p>
    </div>
  ),
};

export const WithComplexDropdowns = Template.bind({});
WithComplexDropdowns.args = {
  menuItems: menuItemsWithDropdown,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  menuItems,
  className:
    'bg-gradient-to-r from-brand/50 to-brand/10 !border-brand/20 dark:!border-brand/80',
};

export const WithMultipleActions = Template.bind({});
WithMultipleActions.args = {
  menuItems,
  title: 'Admin Panel',
  actionContent: (
    <>
      <Button fullWidth variant="solid" shape="rounded">
        <span className="flex items-center justify-center gap-2">
          <Plus size={16} />
          New
        </span>
      </Button>
      <Button fullWidth variant="solid" shape="rounded" color="danger">
        <span className="flex items-center justify-center gap-2">
          <LogOut size={16} />
          Exit
        </span>
      </Button>
    </>
  ),
};
