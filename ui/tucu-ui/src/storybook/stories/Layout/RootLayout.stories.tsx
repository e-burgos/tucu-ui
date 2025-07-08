import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { RootLayout } from '../../../components/layouts/root-layout';
import { StoryContainer } from '../../components/StoryContainer';
import { Home, Settings, Users, CreditCard, Bell, Menu } from 'lucide-react';
import { Button } from '../../../components/buttons/button';
import { IMenuItem } from '../../../components/common/menu-item';
import { LAYOUT_OPTIONS } from '../../../themes/config';

const menuItems: IMenuItem[] = [
  {
    name: 'Home',
    icon: <Home className="h-[18px] w-[18px]" />,
    href: '#',
  },
  {
    name: 'Users',
    icon: <Users className="h-[18px] w-[18px]" />,
    href: '#',
  },
  {
    name: 'Payments',
    icon: <CreditCard className="h-[18px] w-[18px]" />,
    href: '#',
  },
  {
    name: 'Settings',
    icon: <Settings className="h-[18px] w-[18px]" />,
    href: '#',
  },
  {
    name: 'Notifications',
    icon: <Bell className="h-[18px] w-[18px]" />,
    href: '#',
  },
];

const meta: Meta<typeof RootLayout> = {
  title: 'UI COMPONENTS/Layout/RootLayout',
  tags: ['autodocs'],
  component: RootLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The RootLayout component is a wrapper that provides different layout options (Classic, Minimal, or Auth) based on the layout prop. It also handles theme mode changes.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    layout: {
      control: 'select',
      options: Object.values(LAYOUT_OPTIONS),
      description: 'The layout type to use',
    },
    menuItems: {
      description: 'Array of menu items to display in the navigation menu',
    },
    rightButton: {
      description: 'Optional button or component to display in the header',
    },
    logo: {
      description: 'Logo component to display in the header',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the layout container',
    },
    children: {
      description: 'The main content of the layout',
    },
  },
};

export default meta;

const Template: StoryFn<typeof RootLayout> = (args) => {
  return (
    <StoryContainer className="p-0 h-[800px]">
      <RootLayout {...args}>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="mb-4">This is the main content area of the layout.</p>
          <p>
            The layout type can be changed using the layout control in the
            Storybook controls panel.
          </p>
        </div>
      </RootLayout>
    </StoryContainer>
  );
};

export const ClassicLayout = Template.bind({});
ClassicLayout.args = {
  layout: LAYOUT_OPTIONS.CLASSIC,
  menuItems,
  logo: {
    icon: true,
    href: '#',
  },
  rightButton: (
    <Button size="small" variant="ghost" className="flex items-center gap-2">
      <Menu className="h-4 w-4" />
      Menu
    </Button>
  ),
};

export const MinimalLayout = Template.bind({});
MinimalLayout.args = {
  layout: LAYOUT_OPTIONS.MINIMAL,
  menuItems,
  logo: {
    icon: true,
    href: '#',
  },
  rightButton: (
    <Button size="small" variant="ghost" className="flex items-center gap-2">
      <Menu className="h-4 w-4" />
      Menu
    </Button>
  ),
};

export const AuthenticationLayout = Template.bind({});
AuthenticationLayout.args = {
  layout: LAYOUT_OPTIONS.NONE,
  menuItems,
  children: (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Authentication</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  ),
};
