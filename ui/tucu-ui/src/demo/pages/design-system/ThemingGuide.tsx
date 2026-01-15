import { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections
const ThemeArchitectureSection = lazy(
  () => import('./theming-guide-sections/ThemeArchitectureSection')
);
const TailwindConfigSection = lazy(
  () => import('./theming-guide-sections/TailwindConfigSection')
);
const ThemeProviderSection = lazy(
  () => import('./theming-guide-sections/ThemeProviderSection')
);
const ThemeConfigurationSection = lazy(
  () => import('./theming-guide-sections/ThemeConfigurationSection')
);
const UsingThemeSystemSection = lazy(
  () => import('./theming-guide-sections/UsingThemeSystemSection')
);
const ThemeHooksSection = lazy(
  () => import('./theming-guide-sections/ThemeHooksSection')
);
const ColorCustomizationSection = lazy(
  () => import('./theming-guide-sections/ColorCustomizationSection')
);
const SettingsPanelSection = lazy(
  () => import('./theming-guide-sections/SettingsPanelSection')
);
const BestPracticesSection = lazy(
  () => import('./theming-guide-sections/BestPracticesSection')
);
const AdvancedColorSystemSection = lazy(
  () => import('./theming-guide-sections/AdvancedColorSystemSection')
);
const CustomColorPaletteSection = lazy(
  () => import('./theming-guide-sections/CustomColorPaletteSection')
);
const FileStructureSection = lazy(
  () => import('./theming-guide-sections/FileStructureSection')
);
const AdvancedFeaturesSection = lazy(
  () => import('./theming-guide-sections/AdvancedFeaturesSection')
);

export function ThemingGuide() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'theme-architecture', label: 'Theme Architecture' },
    { id: 'tailwind-config', label: 'Tailwind CSS Configuration' },
    { id: 'theme-provider', label: 'ThemeProvider Component' },
    { id: 'theme-configuration', label: 'Theme Configuration' },
    { id: 'using-theme-system', label: 'Using the Theme System' },
    { id: 'theme-hooks', label: 'Theme Hooks' },
    { id: 'color-customization', label: 'Color Customization' },
    { id: 'settings-panel', label: 'Settings Panel' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'advanced-color-system', label: 'Advanced Color System' },
    { id: 'custom-color-palette', label: 'Custom Color Palette' },
    { id: 'file-structure', label: 'File Structure & Important Notes' },
    { id: 'advanced-features', label: 'Advanced Features' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="theme-architecture"
            component={ThemeArchitectureSection}
          />
          <LazyComponentSection
            id="tailwind-config"
            component={TailwindConfigSection}
          />
          <LazyComponentSection
            id="theme-provider"
            component={ThemeProviderSection}
          />
          <LazyComponentSection
            id="theme-configuration"
            component={ThemeConfigurationSection}
          />
          <LazyComponentSection
            id="using-theme-system"
            component={UsingThemeSystemSection}
          />
          <LazyComponentSection
            id="theme-hooks"
            component={ThemeHooksSection}
          />
          <LazyComponentSection
            id="color-customization"
            component={ColorCustomizationSection}
          />
          <LazyComponentSection
            id="settings-panel"
            component={SettingsPanelSection}
          />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
          />
          <LazyComponentSection
            id="advanced-color-system"
            component={AdvancedColorSystemSection}
          />
          <LazyComponentSection
            id="custom-color-palette"
            component={CustomColorPaletteSection}
          />
          <LazyComponentSection
            id="file-structure"
            component={FileStructureSection}
          />
          <LazyComponentSection
            id="advanced-features"
            component={AdvancedFeaturesSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default ThemingGuide;
