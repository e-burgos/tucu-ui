import React, { lazy, useEffect } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';
import { useTheme } from '../../../themes';

const sections: SectionConfig[] = [
  {
    id: 'tahoe-liquid-glass',
    label: 'Liquid Glass',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/MacOSTahoeSection')),
  },
  {
    id: 'tahoe-window',
    label: 'Window',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeWindowSection')),
  },
  {
    id: 'tahoe-search-bar',
    label: 'Search Bar',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeSearchBarSection')),
  },
  {
    id: 'tahoe-segmented-control',
    label: 'Segmented Control',
    category: 'Components',
    component: lazy(
      () => import('./macos-sections/TahoeSegmentedControlSection')
    ),
  },
  {
    id: 'tahoe-widget',
    label: 'Widget',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeWidgetSection')),
  },
  {
    id: 'tahoe-popover',
    label: 'Popover',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoePopoverSection')),
  },
  {
    id: 'tahoe-notification-banner',
    label: 'Notification Banner',
    category: 'Components',
    component: lazy(
      () => import('./macos-sections/TahoeNotificationBannerSection')
    ),
  },
  {
    id: 'tahoe-progress-bar',
    label: 'Progress Bar',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeProgressBarSection')),
  },
  {
    id: 'tahoe-dialog',
    label: 'Dialog',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeDialogSection')),
  },
  {
    id: 'tahoe-command-palette',
    label: 'Command Palette',
    category: 'Components',
    component: lazy(
      () => import('./macos-sections/TahoeCommandPaletteSection')
    ),
  },
  {
    id: 'tahoe-dock',
    label: 'Dock',
    category: 'Components',
    component: lazy(() => import('./macos-sections/TahoeDockSection')),
  },
];

export function MacOSTahoeShowcase() {
  const { applyMacOSTahoeTheme, layout } = useTheme();

  useEffect(() => {
    if (layout !== 'macos-tahoe' && layout !== 'macos-tahoe-dock')
      applyMacOSTahoeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="macOS Tahoe"
          description="Apple HIG-compliant components for macOS Tahoe 26. Liquid Glass materials, translucent surfaces, spatial depth, and the next generation of macOS design — all powered by CSS custom properties and Tailwind v4."
          githubButton
          getStartedButton
          icon={
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[22%] flex items-center justify-center shadow-lg border border-white/20"
              style={{
                background:
                  'linear-gradient(135deg, #30d158 0%, #00c7be 50%, #007aff 100%)',
              }}
            >
              <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default MacOSTahoeShowcase;
