import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { MinimalLayout } from '../../../components/layouts/minimal/layout';
import { StoryContainer } from '../../components/StoryContainer';
import { Home, Settings, Users, CreditCard, Bell, Menu } from 'lucide-react';
import { Button } from '../../../components/buttons/button';
import { IMenuItem } from '../../../components/common/menu-item';

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

const meta: Meta<typeof MinimalLayout> = {
  title: 'UI COMPONENTS/Layout/MinimalLayout',
  tags: ['autodocs'],
  component: MinimalLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The MinimalLayout component provides a clean application layout with a minimal header and main content area. It includes responsive behavior with a drawer menu for mobile devices.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
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
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the mobile drawer menu is open',
    },
    setIsOpen: {
      action: 'setIsOpen',
      description: 'Function to control the open state of the mobile drawer',
    },
    children: {
      description: 'The main content of the layout',
    },
  },
};

export default meta;

const Template: StoryFn<typeof MinimalLayout> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryContainer className="p-0 h-[800px]">
      <MinimalLayout {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="mb-4">
            This is the main content area of the Minimal Layout.
          </p>
          <p>
            The layout includes a header with navigation menu, optional logo and
            right button, and a drawer menu for mobile devices.
          </p>
        </div>
      </MinimalLayout>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  menuItems,
  logo: {
    icon: true,
    href: '#',
  },
};

export const WithRightButton = Template.bind({});
WithRightButton.args = {
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

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  menuItems,
  logo: {
    icon: true,
    href: '#',
  },
  className: 'bg-gray-50 dark:bg-gray-900',
};
