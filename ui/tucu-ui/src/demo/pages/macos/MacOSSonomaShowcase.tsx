import React, { lazy, useEffect } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';
import { useTheme } from '../../../themes';

const sections: SectionConfig[] = [
  {
    id: 'macos-colors',
    label: 'Colors',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/MacOSColorsSection')),
  },
  {
    id: 'macos-materials',
    label: 'Materials',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/MacOSMaterialsSection')),
  },
  {
    id: 'macos-text-styles',
    label: 'Text Styles',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/MacOSTextStylesSection')),
  },
  {
    id: 'macos-backgrounds',
    label: 'Backgrounds',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/MacOSBackgroundsSection')),
  },
  {
    id: 'macos-window',
    label: 'Window',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/MacOSWindowSection')),
  },
  {
    id: 'macos-sidebar',
    label: 'Sidebar',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/MacOSSidebarSection')),
  },
  {
    id: 'macos-toolbar',
    label: 'Toolbar',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/MacOSToolbarSection')),
  },
  {
    id: 'macos-widget',
    label: 'Widget',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/MacOSWidgetSection')),
  },
  {
    id: 'macos-segmented-control',
    label: 'Segmented Control',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/MacOSSegmentedControlSection')
    ),
  },
  {
    id: 'macos-search-bar',
    label: 'Search Bar',
    category: 'Controls',
    component: lazy(() => import('./macos-sections/MacOSSearchBarSection')),
  },
  {
    id: 'macos-notification-banner',
    label: 'Notification Banner',
    category: 'Feedback',
    component: lazy(
      () => import('./macos-sections/MacOSNotificationBannerSection')
    ),
  },
  {
    id: 'macos-command-palette',
    label: 'Command Palette',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/MacOSCommandPaletteSection')
    ),
  },
  {
    id: 'macos-popover',
    label: 'Popover',
    category: 'Feedback',
    component: lazy(() => import('./macos-sections/MacOSPopoverSection')),
  },
];

export function MacOSSonomaShowcase() {
  const { applyMacOSTheme, layout } = useTheme();

  useEffect(() => {
    if (layout !== 'macos') applyMacOSTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="macOS Sonoma"
          description="Apple HIG-compliant components for macOS Sonoma 14. Spatial aurora backgrounds, vibrancy materials, segmented controls, traffic-light windows, widgets, and more — all powered by CSS custom properties and Tailwind v4."
          githubButton
          getStartedButton
          icon={
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[22%] flex items-center justify-center shadow-lg border border-white/20"
              style={{
                background: 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)',
              }}
            >
              <LucideIcons.Monitor className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default MacOSSonomaShowcase;
