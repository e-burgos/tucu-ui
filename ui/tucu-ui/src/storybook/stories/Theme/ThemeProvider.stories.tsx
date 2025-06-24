import type { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from '../../../themes/components/theme-provider';
import React from 'react';
import Button from '../../../components/buttons';
import { HomeIcon } from '../../../components/icons';
import {
  KeyboardIcon,
  MonitorIcon,
  MousePointer2Icon,
  SettingsIcon,
} from 'lucide-react';

const meta: Meta<typeof ThemeProvider> = {
  title: 'THEME PROVIDER/ThemeProvider',
  tags: ['autodocs'],
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          'The ThemeProvider component is a versatile and customizable button that supports various shapes, sizes, variants, and colors. It includes loading states, animations, and tooltip support.',
      },
    },
  },
  argTypes: {
    layout: {
      control: {
        type: 'select',
        options: ['classic', 'none', 'minimal'],
      },
    },
    rightButton: {
      control: {
        type: 'object',
      },
    },
    logo: {
      control: {
        type: 'object',
      },
    },
    brandColor: {
      control: {
        type: 'select',
        options: ['Green', 'Black', 'Blue', 'Red', 'Purple', 'Orange'],
      },
    },
    showSettings: {
      control: {
        type: 'boolean',
      },
    },
    settingActions: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    menuItems: [
      {
        name: 'Home',
        href: '/',
        icon: <HomeIcon />,
        component: <div>Home</div>,
      },
      {
        name: 'About',
        href: '/about',
        component: <div>About</div>,
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: <SettingsIcon />,
        component: <div>Settings</div>,
        dropdownItems: [
          {
            name: 'Display',
            href: '/settings/display',
            icon: <MonitorIcon />,
            component: (
              <div>
                Display
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
                <div>Display</div>
              </div>
            ),
          },
          {
            name: 'Keyboard',
            href: '/settings/keyboard',
            icon: <KeyboardIcon />,

            component: <div>Keyboard</div>,
          },
          {
            name: 'Mouse',
            href: '/settings/mouse',
            icon: <MousePointer2Icon />,
            component: <div>Mouse</div>,
          },
        ],
      },
    ],
    rightButton: <Button>Right Button</Button>,
    logo: {
      name: 'Tucu',
      secondName: 'UI',
      isoType: false,
    },

    showSettings: true,
    settingActions: {
      disabledMode: false,
      disabledLayout: false,
      disabledDirection: false,
      disabledPreset: false,
    },
    customRoutes: undefined,
    withRouterProvider: false,
  },
};

export default meta;

const Template: StoryFn<typeof ThemeProvider> = (args) => (
  <ThemeProvider {...args} />
);

export const Default = Template.bind({});
Default.args = {};
