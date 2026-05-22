import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import { MacSidebarCard } from '../../../../../components/macos/sonoma/containers/sidebar';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

const DEMO_SECTIONS = [
  {
    label: 'Favorites',
    items: [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: <LucideIcons.Inbox className="w-4 h-4" />,
        badge: 12,
      },
      {
        id: 'starred',
        label: 'Starred',
        icon: <LucideIcons.Star className="w-4 h-4" />,
      },
      {
        id: 'sent',
        label: 'Sent',
        icon: <LucideIcons.Send className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'Folders',
    items: [
      {
        id: 'work',
        label: 'Work',
        icon: <LucideIcons.Briefcase className="w-4 h-4" />,
        badge: 3,
      },
      {
        id: 'personal',
        label: 'Personal',
        icon: <LucideIcons.User className="w-4 h-4" />,
      },
      {
        id: 'archive',
        label: 'Archive',
        icon: <LucideIcons.Archive className="w-4 h-4" />,
        disabled: true,
      },
    ],
  },
];

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function SidebarPlayground(props: { activeId?: string }) {
  const [active, setActive] = useState(props.activeId || 'inbox');
  return (
    <div className="flex h-64 rounded-xl overflow-hidden border border-border">
      <MacSidebarCard
        sections={DEMO_SECTIONS}
        activeId={active}
        onSelect={setActive}
        header={
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Mail
          </p>
        }
      />
      <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500">
        Active:{' '}
        <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
          {active}
        </span>
      </div>
    </div>
  );
}

export const MacOSSidebarSection: React.FC = () => {
  const [activeId, setActiveId] = useState('inbox');

  return (
    <>
      <HeroCard
        title="MacSidebarCard"
        description="A macOS-style navigation sidebar with backdrop blur, section group labels, badge counts, active-item tinting, header/footer slots, and disabled state for items."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-slate-500 via-gray-600 to-zinc-700 rounded-full flex items-center justify-center shadow-lg border border-slate-500/50">
            <LucideIcons.PanelLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Sidebar" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-72 rounded-xl overflow-hidden border border-border shadow-sm">
              <MacSidebarCard
                sections={DEMO_SECTIONS}
                activeId={activeId}
                onSelect={setActiveId}
                header={
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Mail
                  </p>
                }
                footer={
                  <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <LucideIcons.Settings className="w-3.5 h-3.5" />
                    Preferences
                  </button>
                }
              />
              <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-500">
                Active:{' '}
                <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
                  {activeId}
                </span>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Without Section Labels" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-56 rounded-xl overflow-hidden border border-border shadow-sm">
              <MacSidebarCard
                sections={[
                  {
                    items: [
                      {
                        id: 'home',
                        label: 'Home',
                        icon: <LucideIcons.Home className="w-4 h-4" />,
                      },
                      {
                        id: 'search',
                        label: 'Search',
                        icon: <LucideIcons.Search className="w-4 h-4" />,
                      },
                      {
                        id: 'settings',
                        label: 'Settings',
                        icon: <LucideIcons.Settings className="w-4 h-4" />,
                      },
                    ],
                  },
                ]}
                activeId="home"
                onSelect={() => undefined}
              />
              <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-400">
                Main content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="With Badge Counts & Disabled Items"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-64 rounded-xl overflow-hidden border border-border shadow-sm">
              <MacSidebarCard
                sections={[
                  {
                    label: 'Notifications',
                    items: [
                      {
                        id: 'all',
                        label: 'All',
                        icon: <LucideIcons.Bell className="w-4 h-4" />,
                        badge: 42,
                      },
                      {
                        id: 'mentions',
                        label: 'Mentions',
                        icon: <LucideIcons.AtSign className="w-4 h-4" />,
                        badge: 7,
                      },
                      {
                        id: 'muted',
                        label: 'Muted',
                        icon: <LucideIcons.BellOff className="w-4 h-4" />,
                        disabled: true,
                      },
                    ],
                  },
                ]}
                activeId="all"
                onSelect={() => undefined}
              />
              <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 text-sm text-gray-400">
                Badges show count; disabled items appear muted
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSSidebar"
        defaultValues={{
          activeId: 'inbox',
        }}
        controlOverrides={[
          {
            name: 'activeId',
            type: 'select',
            options: [
              'inbox',
              'starred',
              'sent',
              'work',
              'personal',
              'archive',
            ],
            description: 'Currently active item ID',
          },
        ]}
        includeProps={['activeId']}
        excludeProps={['className', 'sections', 'onSelect', 'header', 'footer']}
      >
        {(props) => <SidebarPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSSidebar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacSidebarCard } from '@e-burgos/tucu-ui';

const sections = [
  {
    label: 'Favorites',
    items: [
      { id: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 12 },
      { id: 'starred', label: 'Starred', icon: <StarIcon /> },
    ],
  },
  {
    label: 'Folders',
    items: [
      { id: 'work', label: 'Work', icon: <BriefcaseIcon /> },
      { id: 'archive', label: 'Archive', icon: <ArchiveIcon />, disabled: true },
    ],
  },
];

function App() {
  const [activeId, setActiveId] = useState('inbox');

  return (
    <div className="flex h-screen">
      <MacSidebarCard
        sections={sections}
        activeId={activeId}
        onSelect={setActiveId}
        header={<h2>Mail</h2>}
        footer={<PreferencesButton />}
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

export default MacOSSidebarSection;
