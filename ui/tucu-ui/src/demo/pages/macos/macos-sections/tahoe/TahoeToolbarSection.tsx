import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import { MacOSToolbarTahoe } from '../../../../../components/macos/tahoe/layout/toolbar-tahoe';

export const TahoeToolbarSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="MacOSToolbarTahoe"
        description="Tahoe-style toolbar with Liquid Glass blur, leading / center / trailing slots, optional border, and a title shorthand."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-sky-400/50">
            <LucideIcons.PanelTop className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Leading & Trailing" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-[14px] overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <MacOSToolbarTahoe
                leading={
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <LucideIcons.ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                }
                title="Dashboard"
                trailing={
                  <div className="flex items-center gap-2">
                    <button className="rounded-[8px] p-1.5 text-gray-500 hover:bg-black/5 dark:hover:bg-white/8">
                      <LucideIcons.Search className="h-4 w-4" />
                    </button>
                    <button className="rounded-[8px] p-1.5 text-gray-500 hover:bg-black/5 dark:hover:bg-white/8">
                      <LucideIcons.Bell className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1.5 rounded-[10px] px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600">
                      <LucideIcons.Plus className="h-3.5 w-3.5" />
                      New
                    </button>
                  </div>
                }
              />
              <div className="flex h-24 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Center Slot (Custom Content)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-[14px] overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <MacOSToolbarTahoe
                center={
                  <div className="flex items-center gap-2 rounded-[10px] bg-black/5 dark:bg-white/8 px-3 py-1.5">
                    <LucideIcons.Search className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-400">Search…</span>
                  </div>
                }
                trailing={
                  <button className="rounded-[8px] p-1.5 text-gray-500 hover:bg-black/5 dark:hover:bg-white/8">
                    <LucideIcons.Settings className="h-4 w-4" />
                  </button>
                }
              />
              <div className="flex h-24 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-400">
                Content area
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Without Border" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="rounded-[14px] overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <MacOSToolbarTahoe title="No Border" bordered={false} />
              <div className="flex h-24 items-center justify-center bg-[var(--color-semantic-bg)] text-sm text-gray-400">
                Content area
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
              code={`import { MacOSToolbarTahoe } from '@e-burgos/tucu-ui';

function Page() {
  return (
    <div className="flex flex-col h-full">
      <MacOSToolbarTahoe
        leading={<BackButton />}
        title="Dashboard"
        trailing={<NewButton />}
        bordered
      />
      <main className="flex-1 overflow-auto p-6">
        <YourContent />
      </main>
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

export default TahoeToolbarSection;
