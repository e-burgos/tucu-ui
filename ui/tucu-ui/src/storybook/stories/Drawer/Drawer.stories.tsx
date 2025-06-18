import type { Meta, StoryFn } from '@storybook/react-vite';
import { Drawer } from '../../../components/drawer';
import { StoryContainer } from '../../components/StoryContainer';
import {
  Home,
  Settings,
  User,
  ShoppingCart,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const meta: Meta<typeof Drawer> = {
  title: 'UI COMPONENTS/Drawer/Drawer',
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
    buttonProps: {
      control: 'object',
      description: 'Props for the button that toggles the drawer',
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
    title: 'Drawer Title',
    backdrop: true,
    buttonProps: { children: 'Open Drawer' },
  },
};

export default meta;

const Template: StoryFn<typeof Drawer> = (args) => (
  <StoryContainer className="justify-center items-center">
    <Drawer {...args}>
      <div className="p-4">
        <p className="mb-4">This is the content of the drawer.</p>
        <p>You can put any content here.</p>
      </div>
    </Drawer>
  </StoryContainer>
);

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

export const CustomButton = Template.bind({});
CustomButton.args = {
  buttonProps: {
    children: 'Custom Button',
    variant: 'ghost',
    color: 'primary',
    className: 'border border-primary',
  },
};

// Menu items for the SidebarMenu example
const menuItems = [
  {
    name: 'Home',
    icon: <Home className="h-4 w-4" />,
    href: '/',
  },
  {
    name: 'Profile',
    icon: <User className="h-4 w-4" />,
    href: '/profile',
  },
  {
    name: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    href: '/settings',
    dropdownItems: [
      {
        name: 'Account',
        href: '/settings/account',
      },
      {
        name: 'Notifications',
        href: '/settings/notifications',
      },
      {
        name: 'Security',
        href: '/settings/security',
      },
    ],
  },
  {
    name: 'Shopping',
    icon: <ShoppingCart className="h-4 w-4" />,
    href: '/shopping',
  },
  {
    name: 'Help',
    icon: <HelpCircle className="h-4 w-4" />,
    href: '/help',
  },
];

export const SidebarMenuType = Template.bind({});
SidebarMenuType.args = {
  type: 'sidebar-menu',
  menuItems,
  buttonProps: { children: 'Open Menu Drawer' },
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
