import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import {
  MacOSTahoeWidget,
  MacOSTahoeWidgetHeader,
} from '../../../../components/macos/tahoe/widget-tahoe';

export const TahoeWidgetSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Widget
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Glass-material widget cards in four fixed sizes, matching Apple HIG
          widget dimensions. Includes an optional header with icon, title,
          subtitle, and actions.
        </Typography>
      </div>

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
        <CardTitle title="Usage" className="mt-2 mb-2">
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
    </>
  );
};

export default TahoeWidgetSection;
