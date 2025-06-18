import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Switch } from '../../../components/headlessui';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Switch> = {
  title: 'UI COMPONENTS/HeadlessUI/Switch',
  tags: ['autodocs'],
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'The Switch component is a toggle that allows users to turn a setting on or off. It follows the WAI-ARIA design pattern for a switch.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked or not',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the switch is toggled',
    },
    as: {
      control: 'text',
      description: 'The element to render as',
    },
  },
};

export default meta;

const BasicTemplate: StoryFn<typeof Switch> = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </StoryContainer>
  );
};

export const Default = BasicTemplate.bind({});

export const WithLabel = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <div className="flex items-center space-x-3">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <span className="text-sm font-medium text-gray-700">
          {enabled ? 'Notifications enabled' : 'Notifications disabled'}
        </span>
      </div>
    </StoryContainer>
  );
};

export const CustomColors = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-green-500' : 'bg-red-500'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle status</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </StoryContainer>
  );
};

export const LargeSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-indigo-600' : 'bg-gray-200'
        } relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <span className="sr-only">Enable feature</span>
        <span
          className={`${
            enabled ? 'translate-x-9' : 'translate-x-1'
          } inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform`}
        />
      </Switch>
    </StoryContainer>
  );
};

export const WithIcons = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <StoryContainer className="justify-center items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-purple-600' : 'bg-gray-300'
        } relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle mode</span>
        <span
          className={`
            ${enabled ? 'translate-x-8' : 'translate-x-1'}
            flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform
          `}
        >
          {enabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </Switch>
    </StoryContainer>
  );
};

export const SwitchGroup = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <StoryContainer className="justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notification Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Email notifications
              </p>
              <p className="text-xs text-gray-500">
                Receive email notifications about account activity
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onChange={() => toggleSetting('emailNotifications')}
              className={`${
                settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Email notifications</span>
              <span
                className={`${
                  settings.emailNotifications
                    ? 'translate-x-6'
                    : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Push notifications
              </p>
              <p className="text-xs text-gray-500">
                Receive push notifications on your mobile device
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onChange={() => toggleSetting('pushNotifications')}
              className={`${
                settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Push notifications</span>
              <span
                className={`${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Marketing emails
              </p>
              <p className="text-xs text-gray-500">
                Receive emails about new features and offers
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onChange={() => toggleSetting('marketingEmails')}
              className={`${
                settings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Marketing emails</span>
              <span
                className={`${
                  settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </StoryContainer>
  );
};
