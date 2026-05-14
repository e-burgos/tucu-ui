import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import { MacOSSidebar } from '../../../../components/macos/sidebar';

export const MacOSSidebarSection: React.FC = () => {
  const [activeId, setActiveId] = useState('inbox');

  const sections = [
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

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSSidebar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A macOS-style navigation sidebar with backdrop blur, section labels,
          badge counts, and active-item tinting.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Sidebar" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex h-72 rounded-xl overflow-hidden border border-[var(--color-semantic-line-primary-subtle)] shadow-[var(--shadow-card)]">
              <MacOSSidebar
                sections={sections}
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
              <div className="flex flex-1 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-500">
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
            <div className="flex h-56 rounded-xl overflow-hidden border border-[var(--color-semantic-line-primary-subtle)] shadow-[var(--shadow-card)]">
              <MacOSSidebar
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
                onSelect={() => {
                  return;
                }}
              />
              <div className="flex flex-1 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-400">
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
              code={`import { MacOSSidebar } from '@e-burgos/tucu-ui';

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
      <MacOSSidebar
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
