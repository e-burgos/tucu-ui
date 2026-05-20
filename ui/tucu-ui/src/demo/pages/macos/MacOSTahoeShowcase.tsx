import React, { lazy, useEffect } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';
import { useTheme } from '../../../themes';

const sections: SectionConfig[] = [
  // ── Foundations ──────────────────────────────────────────────
  {
    id: 'tahoe-liquid-glass',
    label: 'Liquid Glass',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/tahoe/MacOSTahoeSection')),
  },
  {
    id: 'macos-colors',
    label: 'Colors',
    category: 'Foundations',
    component: lazy(() => import('./macos-sections/tahoe/MacOSColorsSection')),
  },
  {
    id: 'macos-materials',
    label: 'Materials',
    category: 'Foundations',
    component: lazy(
      () => import('./macos-sections/tahoe/MacOSMaterialsSection')
    ),
  },
  {
    id: 'macos-text-styles',
    label: 'Text Styles',
    category: 'Foundations',
    component: lazy(
      () => import('./macos-sections/tahoe/MacOSTextStylesSection')
    ),
  },
  {
    id: 'macos-backgrounds',
    label: 'Backgrounds',
    category: 'Foundations',
    component: lazy(
      () => import('./macos-sections/tahoe/MacOSBackgroundsSection')
    ),
  },
  // ── Layouts ───────────────────────────────────────────────────
  {
    id: 'tahoe-dock',
    label: 'Dock',
    category: 'Layouts',
    component: lazy(() => import('./macos-sections/tahoe/TahoeDockSection')),
  },
  {
    id: 'tahoe-toolbar',
    label: 'Toolbar',
    category: 'Layouts',
    component: lazy(() => import('./macos-sections/tahoe/TahoeToolbarSection')),
  },
  {
    id: 'tahoe-layout-sidebar',
    label: 'Layout Sidebar',
    category: 'Layouts',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeLayoutSidebarSection')
    ),
  },
  {
    id: 'tahoe-layout-content',
    label: 'Layout Content',
    category: 'Layouts',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeLayoutContentSection')
    ),
  },
  // ── Containers ───────────────────────────────────────────────
  {
    id: 'tahoe-window',
    label: 'Window',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/tahoe/TahoeWindowSection')),
  },
  {
    id: 'tahoe-widget',
    label: 'Widget',
    category: 'Containers',
    component: lazy(() => import('./macos-sections/tahoe/TahoeWidgetSection')),
  },
  // ── Controls ─────────────────────────────────────────────────
  {
    id: 'tahoe-search-bar',
    label: 'Search Bar',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeSearchBarSection')
    ),
  },
  {
    id: 'tahoe-segmented-control',
    label: 'Segmented Control',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeSegmentedControlSection')
    ),
  },
  {
    id: 'tahoe-command-palette',
    label: 'Command Palette',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeCommandPaletteSection')
    ),
  },
  {
    id: 'tahoe-progress-bar',
    label: 'Progress Bar',
    category: 'Controls',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeProgressBarSection')
    ),
  },
  // ── Feedback ─────────────────────────────────────────────────
  {
    id: 'tahoe-dialog',
    label: 'Dialog',
    category: 'Feedback',
    component: lazy(() => import('./macos-sections/tahoe/TahoeDialogSection')),
  },
  {
    id: 'tahoe-notification-banner',
    label: 'Notification Banner',
    category: 'Feedback',
    component: lazy(
      () => import('./macos-sections/tahoe/TahoeNotificationBannerSection')
    ),
  },
  {
    id: 'tahoe-popover',
    label: 'Popover',
    category: 'Feedback',
    component: lazy(() => import('./macos-sections/tahoe/TahoePopoverSection')),
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
      hideHeroInSubSections
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
