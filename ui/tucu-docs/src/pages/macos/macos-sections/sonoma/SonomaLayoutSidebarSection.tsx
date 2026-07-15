import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { MacOSSonomaLayoutSidebar } from '@tucu-ui-internal/components/macos/sonoma/layout/layout-sidebar-sonoma';
import { IMenuItem } from '@tucu-ui-internal/components/layouts/menus/menu-item';

const menuItems: IMenuItem[] = [
  {
    name: 'Dashboard',
    icon: <LucideIcons.LayoutDashboard className="h-4 w-4" />,
    path: '/dashboard',
    isActive: true,
  },
  {
    name: 'Projects',
    icon: <LucideIcons.FolderKanban className="h-4 w-4" />,
    path: '/projects',
    dropdownItems: [
      {
        name: 'Active',
        icon: <LucideIcons.Play className="h-4 w-4" />,
        path: '/projects/active',
      },
      {
        name: 'Archived',
        icon: <LucideIcons.Archive className="h-4 w-4" />,
        path: '/projects/archived',
      },
    ],
  },
  {
    name: 'Analytics',
    icon: <LucideIcons.BarChart2 className="h-4 w-4" />,
    path: '/analytics',
  },
  {
    name: 'Team',
    icon: <LucideIcons.Users className="h-4 w-4" />,
    path: '/team',
  },
  {
    name: 'Settings',
    icon: <LucideIcons.Settings className="h-4 w-4" />,
    path: '/settings',
  },
];

export const SonomaLayoutSidebarSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="MacOSSonomaLayoutSidebar"
        description="Full-app navigation sidebar for Sonoma layouts. Supports nested items with expandable groups, logo slot, route-aware active highlighting, and backdrop blur vibrancy."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border border-teal-400/50">
            <LucideIcons.PanelLeftClose className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Preview" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-80 rounded-xl overflow-hidden border border-(--color-semantic-line-primary-subtle) shadow-(--shadow-card)">
              <MacOSSonomaLayoutSidebar menuItems={menuItems} />
              <div className="flex flex-1 items-center justify-center bg-(--color-semantic-bg) text-sm text-gray-400">
                Main content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSonomaLayoutSidebar } from '@e-burgos/tucu-ui';

const menuItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  {
    name: 'Projects',
    icon: <FolderIcon />,
    path: '/projects',
    dropdownItems: [
      { name: 'Active', icon: <PlayIcon />, path: '/projects/active' },
      { name: 'Archived', icon: <ArchiveIcon />, path: '/projects/archived' },
    ],
  },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function App() {
  return (
    <div className="flex h-screen">
      <MacOSSonomaLayoutSidebar
        menuItems={menuItems}
        logo={{ logoDark: '/logo.svg', logoLight: '/logo.svg' }}
      />
      <main className="flex-1">Content</main>
    </div>
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SonomaLayoutSidebarSection;
