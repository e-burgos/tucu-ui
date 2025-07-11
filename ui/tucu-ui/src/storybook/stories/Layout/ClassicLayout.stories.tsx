import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { ClassicLayout } from '../../../components/layouts/classic/layout';
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

const meta: Meta<typeof ClassicLayout> = {
  title: '3. UI COMPONENTS/Layout/ClassicLayout',
  tags: ['autodocs'],
  component: ClassicLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The ClassicLayout component provides a standard application layout with a header, expandable sidebar, and main content area. It includes responsive behavior with a drawer menu for mobile devices.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    menuItems: {
      description: 'Array of menu items to display in the sidebar',
    },
    rightButton: {
      description: 'Optional button or component to display in the header',
    },
    logo: {
      description: 'Logo component to display in the header and sidebar',
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

const Template: StoryFn<typeof ClassicLayout> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryContainer className="p-0 h-[800px]">
      <ClassicLayout {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="mb-4">
            This is the main content area of the Classic Layout.
          </p>
          <p>
            The layout includes a header with optional logo and right button, an
            expandable sidebar for desktop, and a drawer menu for mobile
            devices.
          </p>
        </div>
      </ClassicLayout>
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
