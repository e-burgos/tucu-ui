import type { Meta, StoryFn } from '@storybook/react-vite';
import { SidebarMenu } from '../../../components/drawer';
import { StoryContainer } from '../../components/StoryContainer';
import {
  Home,
  Settings,
  User,
  ShoppingCart,
  HelpCircle,
  LogOut,
  Bell,
  Bookmark,
  Calendar,
  Mail,
  Plus,
} from 'lucide-react';

const meta: Meta<typeof SidebarMenu> = {
  title: 'UI COMPONENTS/Drawer/SidebarMenu',
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

const Template: StoryFn<typeof SidebarMenu> = (args) => (
  <StoryContainer className="justify-center items-start h-screen">
    <div className="w-full max-w-xs border border-gray-200 dark:border-gray-700 h-[600px] relative">
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
  menuItems: [
    {
      name: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/dashboard',
    },
    {
      name: 'Messages',
      icon: <Mail className="h-4 w-4" />,
      href: '/messages',
      dropdownItems: [
        {
          name: 'Inbox',
          href: '/messages/inbox',
        },
        {
          name: 'Sent',
          href: '/messages/sent',
        },
        {
          name: 'Drafts',
          href: '/messages/drafts',
        },
      ],
    },
    {
      name: 'Calendar',
      icon: <Calendar className="h-4 w-4" />,
      href: '/calendar',
    },
    {
      name: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      href: '/notifications',
      dropdownItems: [
        {
          name: 'All',
          href: '/notifications/all',
        },
        {
          name: 'Unread',
          href: '/notifications/unread',
        },
        {
          name: 'Mentions',
          href: '/notifications/mentions',
        },
      ],
    },
    {
      name: 'Bookmarks',
      icon: <Bookmark className="h-4 w-4" />,
      href: '/bookmarks',
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
          name: 'Privacy',
          href: '/settings/privacy',
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
  ],
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  menuItems,
  className:
    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
};

export const WithMultipleActions = Template.bind({});
WithMultipleActions.args = {
  menuItems,
  title: 'Admin Panel',
  actionContent: (
    <>
      <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2">
        <Plus size={16} />
        New
      </button>
      <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-2">
        <LogOut size={16} />
        Exit
      </button>
    </>
  ),
};
