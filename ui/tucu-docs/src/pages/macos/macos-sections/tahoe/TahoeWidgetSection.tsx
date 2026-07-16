import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
import {
  MacOSTahoeWidget,
  MacOSTahoeWidgetHeader,
} from '@tucu-ui-internal/components/macos/tahoe/containers/widget-tahoe';

export const TahoeWidgetSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Widget"
        description="Glass-material widget cards in four fixed sizes, matching Apple HIG widget dimensions. Includes an optional header with icon, title, subtitle, and actions."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
            <LucideIcons.LayoutDashboard className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="flex flex-wrap gap-5 items-end">
            <MacOSTahoeWidget size="sm">
              <MacOSTahoeWidgetHeader
                title="Weather"
                icon={<LucideIcons.CloudSun className="h-4 w-4" />}
              />
              <div className="flex flex-1 items-center justify-center">
                <span className="text-3xl font-light text-[var(--macos-tahoe-text)]">
                  24°
                </span>
              </div>
            </MacOSTahoeWidget>

            <MacOSTahoeWidget size="md">
              <MacOSTahoeWidgetHeader
                title="Calendar"
                subtitle="Today"
                icon={<LucideIcons.Calendar className="h-4 w-4" />}
              />
              <div className="flex flex-1 items-center px-4">
                <div className="text-[var(--macos-tahoe-text)]">
                  <p className="text-[20px] font-semibold">December 15</p>
                  <p className="text-[13px] text-[var(--macos-tahoe-text-muted)]">
                    3 upcoming events
                  </p>
                </div>
              </div>
            </MacOSTahoeWidget>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Large & Extra Large" className="mt-2 mb-2">
          <div className="flex flex-wrap gap-5 items-end">
            <MacOSTahoeWidget size="lg">
              <MacOSTahoeWidgetHeader
                title="Activity"
                icon={<LucideIcons.Activity className="h-4 w-4" />}
              />
              <div className="flex flex-1 items-center justify-center p-3">
                <div className="text-center text-[var(--macos-tahoe-text)]">
                  <p className="text-[36px] font-light">520</p>
                  <p className="text-[11px] uppercase tracking-wider text-[var(--macos-tahoe-text-muted)]">
                    calories
                  </p>
                </div>
              </div>
            </MacOSTahoeWidget>

            <MacOSTahoeWidget size="xl">
              <MacOSTahoeWidgetHeader
                title="Notes"
                subtitle="3 notes"
                icon={<LucideIcons.StickyNote className="h-4 w-4" />}
                actions={
                  <button className="text-[12px] text-[var(--macos-tahoe-accent)]">
                    View All
                  </button>
                }
              />
              <div className="flex-1 space-y-2 overflow-auto p-3.5 pt-2">
                {['Meeting notes', 'Shopping list', 'Ideas for project'].map(
                  (note) => (
                    <div
                      key={note}
                      className="rounded-lg bg-[var(--macos-glass-clear-bg)] p-2.5 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm border border-[var(--macos-glass-border-subtle)]"
                    >
                      {note}
                    </div>
                  )
                )}
              </div>
            </MacOSTahoeWidget>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeWidget, MacOSTahoeWidgetHeader } from '@e-burgos/tucu-ui';

<MacOSTahoeWidget size="md">
  <MacOSTahoeWidgetHeader
    title="Calendar"
    subtitle="Today"
    icon={<CalendarIcon />}
    actions={<button>View All</button>}
  />
  <div className="p-4">Widget content</div>
</MacOSTahoeWidget>

// Sizes: 'sm' (170×170), 'md' (364×170), 'lg' (170×364), 'xl' (364×364)`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeWidget"
        defaultValues={{ size: 'md' }}
        includeProps={['size']}
        excludeProps={['className']}
      >
        {(props) => (
          <div className="flex justify-center p-4">
            <MacOSTahoeWidget {...props}>
              <MacOSTahoeWidgetHeader
                title="Preview"
                icon={<LucideIcons.LayoutDashboard className="h-4 w-4" />}
              />
              <div className="flex flex-1 items-center justify-center">
                <span className="text-2xl font-light text-[var(--macos-tahoe-text)]">
                  Content
                </span>
              </div>
            </MacOSTahoeWidget>
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeWidget" />
    </>
  );
};

export default TahoeWidgetSection;
