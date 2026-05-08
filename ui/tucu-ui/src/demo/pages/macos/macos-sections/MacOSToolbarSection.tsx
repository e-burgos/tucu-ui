import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, LucideIcons } from '../../../../index';
import { MacOSToolbar } from '../../../../components/macos/toolbar';
import { MacOSSearchBar } from '../../../../components/macos/search-bar';

const MacOSToolbarSection: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSToolbar
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A macOS-style toolbar with leading, center, and trailing slots. Supports vibrancy
          backdrop blur, a transparent mode, and an optional bottom border.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Title + Leading + Trailing" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-[var(--color-semantic-line-primary-subtle)] shadow-[var(--shadow-card)]">
              <MacOSToolbar
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
              <div className="h-24 bg-[var(--color-semantic-bg)] flex items-center justify-center text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Search Bar in Center" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-[var(--color-semantic-line-primary-subtle)] shadow-[var(--shadow-card)]">
              <MacOSToolbar
                leading={
                  <LucideIcons.Mail className="w-4 h-4 text-gray-500" />
                }
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
              <div className="h-24 bg-[var(--color-semantic-bg)] flex items-center justify-center text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Transparent (no background)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-xl overflow-hidden border border-[var(--color-semantic-line-primary-subtle)] shadow-[var(--shadow-card)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
              <MacOSToolbar
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
