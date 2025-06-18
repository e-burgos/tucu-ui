import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { InputSwitch } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof InputSwitch> = {
  title: 'UI COMPONENTS/Forms/InputSwitch',
  tags: ['autodocs'],
  component: InputSwitch,
  parameters: {
    docs: {
      description: {
        component:
          'The InputSwitch component provides a toggle control that can be switched between on and off states. It includes on/off labels and supports custom styling.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the switch',
    },
    onLabel: {
      control: 'text',
      description: 'Text to display for the "on" state',
    },
    offLabel: {
      control: 'text',
      description: 'Text to display for the "off" state',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (on)',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the switch is toggled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component',
    },
  },
  args: {
    label: 'Switch Label',
    onLabel: 'ON',
    offLabel: 'OFF',
    checked: false,
  },
};

export default meta;

const Template: StoryFn<typeof InputSwitch> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || false);

  return (
    <StoryContainer className="justify-center items-center">
      <InputSwitch {...args} checked={checked} onChange={setChecked} />
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  onLabel: 'YES',
  offLabel: 'NO',
};

export const WithoutMainLabel = Template.bind({});
WithoutMainLabel.args = {
  label: undefined,
};

export const FeatureToggleExample = () => {
  const [features, setFeatures] = React.useState({
    darkMode: true,
    notifications: false,
    autoSave: true,
  });

  const handleToggle = (feature: keyof typeof features) => {
    setFeatures({
      ...features,
      [feature]: !features[feature],
    });
  };

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Feature Settings</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">
                Enable dark theme for the application
              </p>
            </div>
            <InputSwitch
              checked={features.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive notifications about updates
              </p>
            </div>
            <InputSwitch
              checked={features.notifications}
              onChange={() => handleToggle('notifications')}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Auto Save</h3>
              <p className="text-sm text-gray-500">
                Automatically save your progress
              </p>
            </div>
            <InputSwitch
              checked={features.autoSave}
              onChange={() => handleToggle('autoSave')}
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-sm">
            Active features:{' '}
            {Object.entries(features)
              .filter(([_, value]) => value)
              .map(([key]) => key)
              .join(', ')}
          </p>
        </div>
      </div>
    </StoryContainer>
  );
};

export const FormExample = () => {
  const [enableNotifications, setEnableNotifications] = React.useState(false);
  const [receiveUpdates, setReceiveUpdates] = React.useState(false);
  const [marketingEmails, setMarketingEmails] = React.useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>

        <div className="space-y-6">
          <InputSwitch
            label="Enable notifications"
            checked={enableNotifications}
            onChange={setEnableNotifications}
          />

          <InputSwitch
            label="Receive product updates"
            checked={receiveUpdates}
            onChange={setReceiveUpdates}
          />

          <InputSwitch
            label="Marketing emails"
            checked={marketingEmails}
            onChange={setMarketingEmails}
          />
        </div>

        <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Save Preferences
        </button>
      </div>
    </StoryContainer>
  );
};
