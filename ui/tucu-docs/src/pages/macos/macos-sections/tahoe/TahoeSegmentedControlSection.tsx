import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { MacOSTahoeSegmentedControl } from '@tucu-ui-internal/components/macos/tahoe/controls/segmented-control-tahoe';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function SegmentedPlayground(props: {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}) {
  const [active, setActive] = useState('day');
  return (
    <MacOSTahoeSegmentedControl
      options={[
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
      ]}
      value={active}
      onChange={setActive}
      size={props.size}
      fullWidth={props.fullWidth}
    />
  );
}

export const TahoeSegmentedControlSection: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid' | 'columns'>('list');
  const [tab, setTab] = useState<'all' | 'active' | 'archived'>('all');

  return (
    <>
      <HeroCard
        title="Segmented Control"
        description="Glass-material segmented control with prominent backdrop for the active segment. Supports icons, sizes, full-width mode, and disabled options."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border border-teal-500/50">
            <LucideIcons.ToggleLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="flex flex-col gap-4 items-start">
            <div>
              <span className="text-[12px] text-(--macos-tahoe-text-muted) mb-1 block">
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
              <span className="text-[12px] text-(--macos-tahoe-text-muted) mb-1 block">
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
              <span className="text-[12px] text-(--macos-tahoe-text-muted) mb-1 block">
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
          <p className="mt-2 text-[12px] text-(--macos-tahoe-text-muted)">
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
        <CardTitle title="Code Example" className="mt-2 mb-2">
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

      <PropPlayground
        componentName="MacOSTahoeSegmentedControl"
        defaultValues={{ size: 'md', fullWidth: false }}
        includeProps={['size', 'fullWidth']}
        excludeProps={['className', 'options', 'value', 'onChange']}
      >
        {(props) => <SegmentedPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeSegmentedControl" />
    </>
  );
};

export default TahoeSegmentedControlSection;
