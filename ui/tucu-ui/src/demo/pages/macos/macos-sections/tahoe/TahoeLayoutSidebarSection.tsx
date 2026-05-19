import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import { MacOSTahoeLayoutSidebar } from '../../../../../components/macos/tahoe/layout/layout-sidebar-tahoe';
import { IMenuItem } from '../../../../../components/layouts/menus/menu-item';

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

export const TahoeLayoutSidebarSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="MacOSTahoeLayoutSidebar"
        description="Full-app navigation sidebar for Tahoe layouts. Supports nested items with expandable groups, Liquid Glass vibrancy, route-aware active highlighting, and a mobile drawer variant."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border border-teal-400/50">
            <LucideIcons.PanelLeftClose className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Preview" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-80 rounded-[20px] overflow-hidden border border-[var(--macos-tahoe-border,rgba(0,0,0,0.1))] shadow-[var(--shadow-card)]">
              <MacOSTahoeLayoutSidebar menuItems={menuItems} />
              <div className="flex flex-1 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-400">
                Main content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Mobile Drawer Variant" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-80 rounded-[20px] overflow-hidden border border-[var(--macos-tahoe-border,rgba(0,0,0,0.1))] shadow-[var(--shadow-card)]">
              <MacOSTahoeLayoutSidebar
                menuItems={menuItems}
                mobile
                onClose={() => undefined}
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSTahoeLayoutSidebar } from '@e-burgos/tucu-ui';

const menuItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  {
    name: 'Projects',
    icon: <FolderIcon />,
    path: '/projects',
    dropdownItems: [
      { name: 'Active', icon: <PlayIcon />, path: '/projects/active' },
    ],
  },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <MacOSTahoeLayoutSidebar
        menuItems={menuItems}
        logo={{ logoDark: '/logo.svg', logoLight: '/logo.svg' }}
      />
      {/* Mobile drawer */}
      {drawerOpen && (
        <MacOSTahoeLayoutSidebar
          menuItems={menuItems}
          mobile
          onClose={() => setDrawerOpen(false)}
        />
      )}
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

export default TahoeLayoutSidebarSection;
