import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Badge, Button, useTheme } from '../../../../index';

const SettingsPanelSection: React.FC = () => {
  const {
    mode,
    layout,
    primaryPreset,
    secondaryPreset,
    accentPreset,
    direction,
    setMode,
    setIsSettingsOpen,
    isSettingsOpen,
  } = useTheme();

  return (
    <CardContainer>
      <CardTitle title="Settings Panel" className="mt-2 mb-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
              <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
            </div>
            <Typography tag="h4" className="font-semibold">
              Built-in Settings UI
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400"
              >
                The theme system includes a built-in settings panel that
                allows users to:
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography tag="h5" className="font-medium mb-2">
                    Core Settings
                  </Typography>
                  <ul className="space-y-1">
                    {[
                      'Toggle between light and dark modes',
                      'Switch between LTR and RTL text direction',
                      'Choose between Clean, Admin, and Horizontal layouts',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <LucideIcons.Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Typography tag="h5" className="font-medium mb-2">
                    Color Management
                  </Typography>
                  <ul className="space-y-1">
                    {[
                      'Select from 34 predefined color presets',
                      'Configure primary, secondary, and accent colors',
                      'Customize dark and light theme colors',
                      'Manage muted colors and background variants',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <LucideIcons.Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography tag="h5" className="font-medium">
                Current Settings
              </Typography>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Mode</span>
                    <Badge variant="outline" className="text-xs">
                      {mode}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Layout</span>
                    <Badge variant="outline" className="text-xs">
                      {layout === 'horizontal'
                        ? 'Horizontal'
                        : layout === 'clean'
                        ? 'Clean'
                        : 'Admin'}{' '}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Primary</span>
                    <Badge variant="outline" className="text-xs">
                      {primaryPreset?.label || 'DEFAULT_PRIMARY'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Secondary</span>
                    <Badge variant="outline" className="text-xs">
                      {secondaryPreset?.label || 'DEFAULT_SECONDARY'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Accent</span>
                    <Badge variant="outline" className="text-xs">
                      {accentPreset?.label || 'DEFAULT_ACCENT'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium">Direction</span>
                    <Badge variant="outline" className="text-xs">
                      {direction || 'LTR'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-4">
                  <Button
                    size="small"
                    onClick={() =>
                      setMode(mode === 'dark' ? 'light' : 'dark')
                    }
                    className="flex-1"
                  >
                    Toggle {mode === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                  <Button
                    size="small"
                    variant="ghost"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex-1"
                  >
                    {isSettingsOpen ? 'Close' : 'Open'} Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default SettingsPanelSection;

