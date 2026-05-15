import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import { MacOSTahoeSegmentedControl } from '../../../../components/macos/tahoe/segmented-control-tahoe';

export const TahoeSegmentedControlSection: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid' | 'columns'>('list');
  const [tab, setTab] = useState<'all' | 'active' | 'archived'>('all');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Segmented Control
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Glass-material segmented control with prominent backdrop for the
          active segment. Supports icons, sizes, full-width mode, and disabled
          options.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="flex flex-col gap-4 items-start">
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Small
              </span>
              <MacOSTahoeSegmentedControl
                size="sm"
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                ]}
                value="day"
                onChange={() => undefined}
              />
            </div>
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Medium (default)
              </span>
              <MacOSTahoeSegmentedControl
                size="md"
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                ]}
                value="week"
                onChange={() => undefined}
              />
            </div>
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Large
              </span>
              <MacOSTahoeSegmentedControl
                size="lg"
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                ]}
                value="month"
                onChange={() => undefined}
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="With Icons" className="mt-2 mb-2">
          <MacOSTahoeSegmentedControl
            options={[
              {
                label: 'List',
                value: 'list',
                icon: <LucideIcons.List className="h-3.5 w-3.5" />,
              },
              {
                label: 'Grid',
                value: 'grid',
                icon: <LucideIcons.Grid3x3 className="h-3.5 w-3.5" />,
              },
              {
                label: 'Columns',
                value: 'columns',
                icon: <LucideIcons.Columns3 className="h-3.5 w-3.5" />,
              },
            ]}
            value={view}
            onChange={setView}
          />
          <p className="mt-2 text-[12px] text-[var(--macos-tahoe-text-muted)]">
            Selected: {view}
          </p>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Full Width" className="mt-2 mb-2">
          <div className="max-w-md">
            <MacOSTahoeSegmentedControl
              fullWidth
              options={[
                { label: 'All', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Archived', value: 'archived' },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="With Disabled Option" className="mt-2 mb-2">
          <MacOSTahoeSegmentedControl
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b', disabled: true },
              { label: 'Option C', value: 'c' },
            ]}
            value="a"
            onChange={() => undefined}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Usage" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeSegmentedControl } from '@e-burgos/tucu-ui';

<MacOSTahoeSegmentedControl
  options={[
    { label: 'List', value: 'list', icon: <ListIcon /> },
    { label: 'Grid', value: 'grid', icon: <GridIcon /> },
  ]}
  value={view}
  onChange={setView}
  size="md"
  fullWidth={false}
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TahoeSegmentedControlSection;
