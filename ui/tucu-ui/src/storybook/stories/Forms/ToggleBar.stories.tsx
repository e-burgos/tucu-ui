import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { ToggleBar } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import { Bell, Moon, Wifi, Volume2, Lock, Bluetooth } from 'lucide-react';

const meta: Meta<typeof ToggleBar> = {
  title: 'UI COMPONENTS/Forms/ToggleBar',
  tags: ['autodocs'],
  component: ToggleBar,
  parameters: {
    docs: {
      description: {
        component:
          'The ToggleBar component provides a full-width toggle control with a title, optional subtitle, and an icon. It can also contain additional content.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the toggle bar',
    },
    subTitle: {
      control: 'text',
      description: 'Optional subtitle to display below the title',
    },
    icon: {
      control: 'object',
      description: 'Optional icon to display alongside the title',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked (on)',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the toggle is clicked',
    },
    children: {
      control: 'text',
      description: 'Optional content to display below the toggle',
    },
  },
  args: {
    title: 'Toggle Feature',
    subTitle: 'Enable or disable this feature',
    checked: false,
  },
};

export default meta;

const Template: StoryFn<typeof ToggleBar> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || false);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md">
        <ToggleBar
          {...args}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Bell className="h-5 w-5" />,
  title: 'Notifications',
  subTitle: 'Receive notifications for important updates',
};

export const WithoutSubtitle = Template.bind({});
WithoutSubtitle.args = {
  title: 'Airplane Mode',
  subTitle: undefined,
  icon: <Wifi className="h-5 w-5" />,
};

export const WithContent = Template.bind({});
WithContent.args = {
  title: 'Sound Settings',
  subTitle: 'Adjust volume level',
  icon: <Volume2 className="h-5 w-5" />,
  children: (
    <div className="py-3">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="75"
        className="w-full h-2 rounded-lg appearance-none bg-gray-300 dark:bg-gray-600"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs">0%</span>
        <span className="text-xs">50%</span>
        <span className="text-xs">100%</span>
      </div>
    </div>
  ),
};

export const SettingsExample = () => {
  const [settings, setSettings] = React.useState({
    darkMode: true,
    notifications: false,
    bluetooth: true,
    lockScreen: false,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold mb-4">Device Settings</h2>

        <ToggleBar
          title="Dark Mode"
          subTitle="Use dark theme throughout the app"
          icon={<Moon className="h-5 w-5" />}
          checked={settings.darkMode}
          onChange={() => toggleSetting('darkMode')}
        />

        <ToggleBar
          title="Notifications"
          subTitle="Allow app to send you notifications"
          icon={<Bell className="h-5 w-5" />}
          checked={settings.notifications}
          onChange={() => toggleSetting('notifications')}
        />

        <ToggleBar
          title="Bluetooth"
          subTitle="Connect to nearby devices"
          icon={<Bluetooth className="h-5 w-5" />}
          checked={settings.bluetooth}
          onChange={() => toggleSetting('bluetooth')}
        />

        <ToggleBar
          title="Lock Screen"
          subTitle="Automatically lock screen after inactivity"
          icon={<Lock className="h-5 w-5" />}
          checked={settings.lockScreen}
          onChange={() => toggleSetting('lockScreen')}
          children={
            settings.lockScreen && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-3">
                <p className="text-sm mb-2">Lock screen after:</p>
                <select className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                  <option>1 minute</option>
                  <option>5 minutes</option>
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                </select>
              </div>
            )
          }
        />
      </div>
    </StoryContainer>
  );
};
