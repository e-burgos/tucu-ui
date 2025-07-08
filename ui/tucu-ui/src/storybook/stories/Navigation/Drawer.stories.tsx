import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Drawer } from '../../../components/dialog/drawer';
import { StoryContainer } from '../../components/StoryContainer';
import { LogOut } from 'lucide-react';
import Button from '../../../components/buttons';
import { menuItems } from '../../hooks/useDummy';

const meta: Meta<typeof Drawer> = {
  title: 'UI COMPONENTS/Navigation/Drawer',
  tags: ['autodocs'],
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'The Drawer component provides a side panel that slides in from the edge of the screen. It can be configured as a simple sidebar or a menu-based sidebar with navigation items.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['sidebar', 'sidebar-menu'],
      description: 'The type of drawer to render',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The position from which the drawer slides in',
    },
    title: {
      control: 'text',
      description: 'The title displayed at the top of the drawer',
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether to show a backdrop behind the drawer',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the drawer',
    },
    menuItems: {
      control: 'object',
      description: 'Navigation items for the sidebar-menu type drawer',
    },
    actionContent: {
      control: 'text',
      description: 'Content to render at the bottom of the drawer',
    },
  },
  args: {
    type: 'sidebar',
    position: 'left',
    title: 'Drawer',
  },
};

export default meta;

const Template: StoryFn<typeof Drawer> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StoryContainer>
      <Button
        variant="ghost"
        size="small"
        className="mt-4 w-full"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </Button>
      <Drawer {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4 mb-2">
          <p>This is the content of the drawer.</p>
          <p>You can put any content here.</p>
        </div>
      </Drawer>
    </StoryContainer>
  );
};

export const Basic = Template.bind({});
Basic.args = {};

export const RightPosition = Template.bind({});
RightPosition.args = {
  position: 'right',
  buttonProps: { children: 'Open Right Drawer' },
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
  backdrop: false,
  buttonProps: { children: 'Open Without Backdrop' },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Custom Title',
  buttonProps: { children: 'Open With Title' },
};

export const SidebarMenuType = Template.bind({});
SidebarMenuType.args = {
  type: 'sidebar-menu',
  menuItems,
};

export const WithActionContent = Template.bind({});
WithActionContent.args = {
  type: 'sidebar-menu',
  menuItems,
  actionContent: (
    <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-2">
      <LogOut size={16} />
      Logout
    </button>
  ),
  buttonProps: { children: 'Open With Action' },
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  className:
    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  buttonProps: { children: 'Styled Drawer' },
};
