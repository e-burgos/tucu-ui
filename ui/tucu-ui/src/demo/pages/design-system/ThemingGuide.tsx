import { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  {
    id: 'theme-architecture',
    label: 'Theme Architecture',
    component: lazy(
      () => import('./theming-guide-sections/ThemeArchitectureSection')
    ),
  },
  {
    id: 'tailwind-config',
    label: 'Tailwind CSS Configuration',
    component: lazy(
      () => import('./theming-guide-sections/TailwindConfigSection')
    ),
  },
  {
    id: 'theme-provider',
    label: 'ThemeProvider Component',
    component: lazy(
      () => import('./theming-guide-sections/ThemeProviderSection')
    ),
  },
  {
    id: 'theme-configuration',
    label: 'Theme Configuration',
    component: lazy(
      () => import('./theming-guide-sections/ThemeConfigurationSection')
    ),
  },
  {
    id: 'using-theme-system',
    label: 'Using the Theme System',
    component: lazy(
      () => import('./theming-guide-sections/UsingThemeSystemSection')
    ),
  },
  {
    id: 'theme-hooks',
    label: 'Theme Hooks',
    component: lazy(() => import('./theming-guide-sections/ThemeHooksSection')),
  },
  {
    id: 'color-customization',
    label: 'Color Customization',
    component: lazy(
      () => import('./theming-guide-sections/ColorCustomizationSection')
    ),
  },
  {
    id: 'settings-panel',
    label: 'Settings Panel',
    component: lazy(
      () => import('./theming-guide-sections/SettingsPanelSection')
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./theming-guide-sections/BestPracticesSection')
    ),
  },
  {
    id: 'advanced-color-system',
    label: 'Advanced Color System',
    component: lazy(
      () => import('./theming-guide-sections/AdvancedColorSystemSection')
    ),
  },
  {
    id: 'custom-color-palette',
    label: 'Custom Color Palette',
    component: lazy(
      () => import('./theming-guide-sections/CustomColorPaletteSection')
    ),
  },
  {
    id: 'file-structure',
    label: 'File Structure & Important Notes',
    component: lazy(
      () => import('./theming-guide-sections/FileStructureSection')
    ),
  },
  {
    id: 'advanced-features',
    label: 'Advanced Features',
    component: lazy(
      () => import('./theming-guide-sections/AdvancedFeaturesSection')
    ),
  },
];

export function ThemingGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Theming Guide"
          description="Master the powerful theming system built with Zustand, CSS custom properties, and Tailwind CSS. Create beautiful, consistent themes that adapt to your brand."
          githubButton
          getStartedButton
          docsButton="theming-guide"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
              <LucideIcons.Paintbrush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default ThemingGuide;
