import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';
import { MacOSTahoeDock } from '@tucu-ui-internal/components/macos/tahoe/layout/dock-tahoe';
import { IMenuItem } from '@tucu-ui-internal/components/layouts/menus/menu-item';

const dockItems: IMenuItem[] = [
  {
    name: 'Finder',
    icon: <LucideIcons.FolderOpen className="h-5 w-5" />,
    path: '/macos-tahoe/finder',
  },
  {
    name: 'Safari',
    icon: <LucideIcons.Globe className="h-5 w-5" />,
    path: '/macos-tahoe/safari',
  },
  {
    name: 'Mail',
    icon: <LucideIcons.Mail className="h-5 w-5" />,
    path: '/macos-tahoe/mail',
  },
  {
    name: 'Messages',
    icon: <LucideIcons.MessageCircle className="h-5 w-5" />,
    path: '/macos-tahoe/messages',
  },
  {
    name: 'Maps',
    icon: <LucideIcons.Map className="h-5 w-5" />,
    path: '/macos-tahoe/maps',
  },
  {
    name: 'Photos',
    icon: <LucideIcons.Image className="h-5 w-5" />,
    path: '/macos-tahoe/photos',
  },
  {
    name: 'Music',
    icon: <LucideIcons.Music className="h-5 w-5" />,
    path: '/macos-tahoe/music',
  },
  {
    name: 'Calendar',
    icon: <LucideIcons.Calendar className="h-5 w-5" />,
    path: '/macos-tahoe/calendar',
  },
  {
    name: 'Notes',
    icon: <LucideIcons.FileText className="h-5 w-5" />,
    path: '/macos-tahoe/notes',
  },
  {
    name: 'Launchpad',
    icon: <LucideIcons.LayoutGrid className="h-5 w-5" />,
    path: '/macos-tahoe/launchpad',
    dropdownItems: [
      {
        name: 'Calculator',
        icon: <LucideIcons.Calculator className="h-4 w-4" />,
        path: '/macos-tahoe/launchpad/calculator',
      },
      {
        name: 'Clock',
        icon: <LucideIcons.Clock className="h-4 w-4" />,
        path: '/macos-tahoe/launchpad/clock',
      },
      {
        name: 'Weather',
        icon: <LucideIcons.CloudSun className="h-4 w-4" />,
        path: '/macos-tahoe/launchpad/weather',
      },
    ],
  },
  {
    name: 'Settings',
    icon: <LucideIcons.Settings className="h-5 w-5" />,
    path: '/macos-tahoe/settings',
    dropdownItems: [
      {
        name: 'General',
        icon: <LucideIcons.Sliders className="h-4 w-4" />,
        path: '/macos-tahoe/settings/general',
      },
      {
        name: 'Appearance',
        icon: <LucideIcons.Palette className="h-4 w-4" />,
        path: '/macos-tahoe/settings/appearance',
      },
      {
        name: 'Privacy',
        icon: <LucideIcons.Shield className="h-4 w-4" />,
        path: '/macos-tahoe/settings/privacy',
      },
    ],
  },
];

const dockRecentItems: IMenuItem[] = [
  {
    name: 'Terminal',
    icon: <LucideIcons.Terminal className="h-5 w-5" />,
    path: '/macos-tahoe/terminal',
  },
  {
    name: 'Downloads',
    icon: <LucideIcons.Download className="h-5 w-5" />,
    path: '/macos-tahoe/downloads',
  },
];

const allItems = [...dockItems, ...dockRecentItems];

export const TahoeDockSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Dock"
        description="macOS Tahoe Dock with Liquid Glass material, icon magnification on hover, active indicators, tooltips, and separator for recent apps. Accepts the same IMenuItem[] used by all tucu-ui menus."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-sky-400/50">
            <LucideIcons.Dock className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Interactive Demo — inline, not fixed */}
      <CardContainer>
        <CardTitle title="Interactive Dock" className="mt-2 mb-2">
          <div className="relative flex items-end justify-center min-h-30 rounded-2xl bg-linear-to-b from-transparent to-black/5 dark:to-white/5 overflow-visible py-6">
            <MacOSTahoeDock
              items={allItems}
              separatorBeforeIndex={dockItems.length}
              inline
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Without magnification */}
      <CardContainer>
        <CardTitle title="Without Magnification" className="mt-2 mb-2">
          <div className="relative flex items-end justify-center min-h-25 rounded-2xl bg-linear-to-b from-transparent to-black/5 dark:to-white/5 overflow-visible py-6">
            <MacOSTahoeDock
              items={dockItems.slice(0, 6)}
              magnification={false}
              inline
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* With items that have children (popover) */}
      <CardContainer>
        <CardTitle title="With Dropdown Items" className="mt-2 mb-2">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-4"
          >
            Click the Settings icon to see the dropdown popover with sub-items.
          </Typography>
          <div className="relative flex items-end justify-center min-h-25 rounded-2xl bg-linear-to-b from-transparent to-black/5 dark:to-white/5 overflow-visible py-6">
            <MacOSTahoeDock
              items={dockItems.slice(-3)}
              magnification={false}
              inline
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Features grid */}
      <CardContainer>
        <CardTitle title="Features" className="mt-2 mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
            {[
              [
                'IMenuItem Compatible',
                'Uses the same IMenuItem[] type as all tucu-ui menus',
              ],
              [
                'Magnification',
                'macOS-style icon scaling on hover with configurable maxScale',
              ],
              ['Tooltips', 'Hover over an icon to see the item name tooltip'],
              [
                'Separator',
                'Visual separator to divide pinned apps from recent',
              ],
              [
                'Dropdown Children',
                'Items with dropdownItems show a popover on click',
              ],
              [
                'Active Indicator',
                'Dot indicator below active item (matches current route)',
              ],
              ['Auto-Hide', 'Optional auto-hide with mouse-edge reveal'],
              [
                'Liquid Glass',
                'Uses --macos-glass-* tokens for backdrop-blur and translucency',
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-(--macos-glass-border-subtle) bg-(--macos-glass-clear-bg) p-3 backdrop-blur-sm"
              >
                <div className="font-semibold text-(--macos-tahoe-text)">
                  {title}
                </div>
                <div className="mt-0.5 text-(--macos-tahoe-text-muted)">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Usage" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeDock } from '@e-burgos/tucu-ui';

const menuItems = [
  { name: 'Finder', icon: <FolderIcon />, path: '/finder' },
  { name: 'Safari', icon: <GlobeIcon />, path: '/safari' },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings',
    dropdownItems: [
      { name: 'General', icon: <SlidersIcon />, path: '/settings/general' },
      { name: 'Privacy', icon: <ShieldIcon />, path: '/settings/privacy' },
    ],
  },
];

{/* Fixed at bottom (default) */}
<MacOSTahoeDock items={menuItems} />

{/* With separator and magnification */}
<MacOSTahoeDock
  items={[...pinnedItems, ...recentItems]}
  separatorBeforeIndex={pinnedItems.length}
  magnification={true}
  maxScale={1.6}
/>

{/* Vertical dock on the left */}
<MacOSTahoeDock items={menuItems} position="left" />

{/* Auto-hide dock */}
<MacOSTahoeDock items={menuItems} autoHide />`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TahoeDockSection;
