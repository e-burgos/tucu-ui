import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { MacOSSonomaLayoutContent } from '@tucu-ui-internal/components/macos/sonoma/layout/layout-content-sonoma';

export const SonomaLayoutContentSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="MacOSSonomaLayoutContent"
        description="Content shell for Sonoma layouts. Combines a toolbar with leading / center / trailing slots and a scrollable main area with consistent padding."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-400 via-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg border border-emerald-400/50">
            <LucideIcons.LayoutDashboard className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Toolbar Slots" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="h-80 rounded-xl overflow-hidden border border-(--color-semantic-line-primary-subtle) shadow-(--shadow-card)">
              <MacOSSonomaLayoutContent
                toolbarLeading={
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <LucideIcons.ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                }
                toolbarCenter={
                  <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">
                    Dashboard
                  </span>
                }
                toolbarTrailing={
                  <button className="flex items-center gap-1.5 rounded-md px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600">
                    <LucideIcons.Plus className="h-3.5 w-3.5" />
                    New
                  </button>
                }
              >
                <div className="grid grid-cols-3 gap-4">
                  {['Revenue', 'Users', 'Sessions'].map((label) => (
                    <div
                      key={label}
                      className="rounded-[10px] border border-(--color-semantic-line-primary-subtle) bg-white/60 dark:bg-white/5 p-4"
                    >
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        —
                      </p>
                    </div>
                  ))}
                </div>
              </MacOSSonomaLayoutContent>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSonomaLayoutContent } from '@e-burgos/tucu-ui';

function PageLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MacOSSonomaLayoutContent
        toolbarLeading={<BackButton />}
        toolbarCenter={<span>Dashboard</span>}
        toolbarTrailing={<NewButton />}
      >
        <YourPageContent />
      </MacOSSonomaLayoutContent>
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

export default SonomaLayoutContentSection;
