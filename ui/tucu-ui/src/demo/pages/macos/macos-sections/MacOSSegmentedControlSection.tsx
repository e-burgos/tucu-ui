import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, LucideIcons } from '../../../../index';
import { MacOSSegmentedControl } from '../../../../components/macos/segmented-control';

const MacOSSegmentedControlSection: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid' | 'columns'>('list');
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSSegmentedControl
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A native-style segmented control for mutually exclusive selections, available in three
          sizes with optional icons.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Icons" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <MacOSSegmentedControl
              options={[
                { value: 'list', label: 'List', icon: <LucideIcons.List className="w-3.5 h-3.5" /> },
                { value: 'grid', label: 'Grid', icon: <LucideIcons.Grid3X3 className="w-3.5 h-3.5" /> },
                { value: 'columns', label: 'Columns', icon: <LucideIcons.Columns className="w-3.5 h-3.5" /> },
              ]}
              value={view}
              onChange={(v) => setView(v as typeof view)}
            />
            <p className="text-sm text-gray-500">Selected: <strong>{view}</strong></p>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Text Only — Full Width" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSSegmentedControl
              fullWidth
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              value={period}
              onChange={(v) => setPeriod(v as typeof period)}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Small</p>
              <MacOSSegmentedControl
                size="sm"
                options={[
                  { value: 'small', label: 'Option A' },
                  { value: 'medium', label: 'Option B' },
                  { value: 'large', label: 'Option C' },
                ]}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Medium (default)</p>
              <MacOSSegmentedControl
                size="md"
                options={[
                  { value: 'small', label: 'Option A' },
                  { value: 'medium', label: 'Option B' },
                  { value: 'large', label: 'Option C' },
                ]}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Large</p>
              <MacOSSegmentedControl
                size="lg"
                options={[
                  { value: 'small', label: 'Option A' },
                  { value: 'medium', label: 'Option B' },
                  { value: 'large', label: 'Option C' },
                ]}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Disabled Option" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSSegmentedControl
              options={[
                { value: 'read', label: 'Read' },
                { value: 'write', label: 'Write' },
                { value: 'admin', label: 'Admin', disabled: true },
              ]}
              value="read"
              onChange={() => { return; }}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSegmentedControl } from '@e-burgos/tucu-ui';

function ViewSwitcher() {
  const [view, setView] = useState<'list' | 'grid'>('list');

  return (
    <MacOSSegmentedControl
      options={[
        { value: 'list', label: 'List', icon: <ListIcon /> },
        { value: 'grid', label: 'Grid', icon: <GridIcon /> },
      ]}
      value={view}
      onChange={setView}
      size="md"       // 'sm' | 'md' | 'lg'
      fullWidth       // optional — fills container
    />
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSSegmentedControlSection;
