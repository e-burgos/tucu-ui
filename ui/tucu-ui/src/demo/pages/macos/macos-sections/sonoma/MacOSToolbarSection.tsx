import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import {
  MacOSSearchBar,
  MacOSToolbarSonoma,
} from '../../../../../components/macos/sonoma';

export const MacOSToolbarSection: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <HeroCard
        title="MacOSToolbar"
        description="A macOS-style toolbar with leading, center, and trailing slots. Supports vibrancy backdrop blur, a transparent mode, and an optional bottom border."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-sky-400/50">
            <LucideIcons.PanelTop className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Title + Leading + Trailing" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-(--color-semantic-line-primary-subtle) shadow-(--shadow-card)">
              <MacOSToolbarSonoma
                title="Documents"
                leading={
                  <button className="flex items-center gap-1 text-xs text-[#007aff] hover:opacity-80">
                    <LucideIcons.ChevronLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                }
                trailing={
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-md hover:bg-gray-500/10 text-gray-600 dark:text-gray-400">
                      <LucideIcons.Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-gray-500/10 text-gray-600 dark:text-gray-400">
                      <LucideIcons.MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                }
              />
              <div className="h-24 bg-(--color-semantic-bg) flex items-center justify-center text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Search Bar in Center" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-(--color-semantic-line-primary-subtle) shadow-(--shadow-card)">
              <MacOSToolbarSonoma
                leading={<LucideIcons.Mail className="w-4 h-4 text-gray-500" />}
                center={
                  <MacOSSearchBar
                    value={search}
                    onChange={setSearch}
                    onClear={() => setSearch('')}
                    className="w-56"
                    placeholder="Search messages"
                  />
                }
                trailing={
                  <button className="p-1.5 rounded-md hover:bg-gray-500/10 text-gray-600 dark:text-gray-400">
                    <LucideIcons.SlidersHorizontal className="w-4 h-4" />
                  </button>
                }
              />
              <div className="h-24 bg-(--color-semantic-bg) flex items-center justify-center text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Transparent (no background)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-(--color-semantic-line-primary-subtle) shadow-(--shadow-card) bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
              <MacOSToolbarSonoma
                title="Transparent Toolbar"
                transparent
                bordered={false}
              />
              <div className="h-24 flex items-center justify-center text-sm text-gray-500">
                Toolbar blends into background
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
              code={`import { MacOSToolbar, MacOSSearchBar } from '@e-burgos/tucu-ui';

// Title with leading and trailing slots
<MacOSToolbar
  title="Documents"
  leading={<BackButton />}
  trailing={<MoreButton />}
/>

// Search bar in center slot
<MacOSToolbar
  center={
    <MacOSSearchBar
      value={search}
      onChange={setSearch}
      onClear={() => setSearch('')}
    />
  }
  trailing={<FilterButton />}
/>

// Transparent — blends into parent background
<MacOSToolbar title="Overlay" transparent bordered={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSToolbarSection;
