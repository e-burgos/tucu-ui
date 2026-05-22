import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
  Button,
  FeatureCard,
  useTheme,
} from '../../../../index';

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

  const coreFeatures = [
    {
      icon: (
        <LucideIcons.Moon className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Mode Switching',
      description: 'Toggle between light and dark modes.',
      iconBgClassName: 'from-blue-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Globe className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'RTL/LTR Direction',
      description: 'Switch text direction for international apps.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Layout Options',
      description: 'Choose between Clean, Admin, and Horizontal layouts.',
      iconBgClassName: 'from-orange-500 to-red-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Color Management',
      description:
        'Organized in groups: Brand (primary, accent), Surfaces (secondary, backgrounds), Text (primary, muted, border), and Status (success, warning, error, info).',
      iconBgClassName: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Settings Panel"
        description="Built-in UI for users to customize theme mode, layout, direction, and all color presets at runtime."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Settings className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Panel Features
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            What users can customize through the settings panel
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {coreFeatures.map((item) => (
            <FeatureCard key={item.title} layout="horizontal" {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Live Preview
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Current theme state and interactive controls
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Current Settings">
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium">Mode</span>
                  <Badge variant="outline" className="text-xs">
                    {mode}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium">Layout</span>
                  <Badge variant="outline" className="text-xs">
                    {layout}
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
                  onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
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
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default SettingsPanelSection;
