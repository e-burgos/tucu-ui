import React, { useState } from 'react';
import {
  MacOSLayout,
  Button,
  InputSearcher,
  Switch,
  Alert,
  Checkbox,
  LucideIcons,
} from '../../../../index';

const TahoeDemoContent = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto h-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Left Column: Glass Settings Panel */}
        <div
          data-tucu="drawer-content"
          className="p-6 flex flex-col gap-5 bg-[var(--macos-glass-regular-bg)] backdrop-blur-xl border border-[var(--macos-glass-regular-border)] rounded-2xl shadow-xl"
        >
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-[var(--macos-label)] font-semibold mb-0">
              System Preferences
            </h3>
            <p className="text-[var(--macos-secondary-label)] text-xs mb-0">
              Manage liquid glass settings in Tahoe
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--macos-label)]">
              Enable Notifications
            </span>
            <Switch checked={true} onChange={() => {}} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--macos-label)]">
              Auto-play content
            </span>
            <Checkbox defaultChecked />
          </div>

          <div className="w-full">
            <InputSearcher
              variant="ghost"
              options={[
                { name: 'Wi-Fi', value: 'wifi' },
                { name: 'Bluetooth', value: 'bt' },
              ]}
              placeholder="Search settings..."
              className="w-full"
            />
          </div>

          <div className="mt-auto">
            <Button variant="solid" fullWidth>
              Apply Changes
            </Button>
          </div>
        </div>

        {/* Right Column: Alerts and Panels */}
        <div className="flex flex-col gap-5 justify-between">
          <div data-tucu="panel-card" className="p-5 flex flex-col gap-3">
            <h4 className="text-[var(--macos-label)] font-medium mb-1">
              Standard Material
            </h4>
            <p className="text-xs text-[var(--macos-secondary-label)] leading-relaxed">
              Reading contents and tables use standard opaque material to keep
              contrast levels High regardless of the background imagery.
            </p>
          </div>

          <Alert variant="info">
            <div className="flex flex-col gap-1">
              <strong>New Update Available</strong>
              <span>
                macOS 26 Tahoe is ready to be installed. Restart to apply
                changes.
              </span>
            </div>
          </Alert>

          <div className="flex gap-2">
            <Button variant="ghost" fullWidth>
              Cancel
            </Button>
            <Button variant="solid" fullWidth>
              Restart Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MacOSTahoeSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold dark:text-white">
          Tahoe Liquid Glass Theme
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The <code>variant="tahoe"</code> setting forces the Layout to use
          Liquid Glass materials and Spatial backgrounds.
        </p>
      </div>

      <div className="relative w-full h-[600px] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 group">
        {!showDemo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={() => setShowDemo(true)} variant="solid">
              Launch Tahoe Demo
            </Button>
          </div>
        ) : (
          <div className="w-full h-full relative p-0 m-0">
            <MacOSLayout
              variant="tahoe"
              menuItems={[
                { name: 'Dashboard', path: '#', icon: <LucideIcons.Home /> },
                { name: 'Settings', path: '#', icon: <LucideIcons.Settings /> },
              ]}
              className="absolute inset-0 rounded-2xl"
            >
              <div className="macos-bg-spatial-aurora absolute inset-0 -z-10 rounded-2xl" />
              <TahoeDemoContent />
            </MacOSLayout>
          </div>
        )}
      </div>
    </div>
  );
}
