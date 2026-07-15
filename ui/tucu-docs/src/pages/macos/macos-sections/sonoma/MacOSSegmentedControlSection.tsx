import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { MacOSSegmentedControl } from '@tucu-ui-internal/components/macos/sonoma/controls/segmented-control';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function SegmentedPlayground(props: {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}) {
  const [val, setVal] = useState('tab1');
  return (
    <div className="w-full max-w-lg mx-auto">
      <MacOSSegmentedControl
        {...props}
        value={val}
        onChange={setVal}
        options={[
          { label: 'General', value: 'tab1' },
          { label: 'Privacy', value: 'tab2' },
          { label: 'Advanced', value: 'tab3' },
        ]}
      />
    </div>
  );
}

export const MacOSSegmentedControlSection: React.FC = () => {
  const [active, setActive] = useState('general');
  const [view, setView] = useState('grid');

  return (
    <>
      <HeroCard
        title="SegmentedControl"
        description="A macOS-style segmented control (tab bar) with animated sliding indicator, icon+text options, keyboard navigation, size variants, and full-width mode."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border border-teal-500/50">
            <LucideIcons.ToggleLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="With Icons" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center">
            <MacOSSegmentedControl
              value={view}
              onChange={setView}
              options={[
                { label: 'Grid', value: 'grid', icon: <LucideIcons.LayoutGrid className="w-3.5 h-3.5" /> },
                { label: 'List', value: 'list', icon: <LucideIcons.List className="w-3.5 h-3.5" /> },
                { label: 'Column', value: 'column', icon: <LucideIcons.Columns3 className="w-3.5 h-3.5" /> },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Text Only — Full Width" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSSegmentedControl
              value={active}
              onChange={setActive}
              fullWidth
              options={[
                { label: 'General', value: 'general' },
                { label: 'Privacy', value: 'privacy' },
                { label: 'Security', value: 'security' },
                { label: 'Advanced', value: 'advanced' },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase w-8">{size}</span>
                <MacOSSegmentedControl
                  size={size}
                  value="a"
                  onChange={() => undefined}
                  options={[
                    { label: 'Alpha', value: 'a' },
                    { label: 'Beta', value: 'b' },
                    { label: 'Gamma', value: 'c' },
                  ]}
                />
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Disabled Option" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center">
            <MacOSSegmentedControl
              value="on"
              onChange={() => undefined}
              options={[
                { label: 'On', value: 'on' },
                { label: 'Off', value: 'off' },
                { label: 'Unavailable', value: 'na', disabled: true },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSSegmentedControl"
        defaultValues={{
          size: 'md',
          fullWidth: false,
        }}
        controlOverrides={[
          { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], description: 'Control size' },
          { name: 'fullWidth', type: 'boolean', description: 'Stretch to fill container width' },
        ]}
        includeProps={['size', 'fullWidth']}
        excludeProps={['className', 'options', 'value', 'onChange']}
      >
        {(props) => <SegmentedPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSSegmentedControl" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSegmentedControl } from '@e-burgos/tucu-ui';

function TabsDemo() {
  const [value, setValue] = useState('general');

  return (
    <MacOSSegmentedControl
      value={value}
      onChange={setValue}
      size="md"        // 'sm' | 'md' | 'lg'
      fullWidth={false}
      options={[
        { label: 'General', value: 'general' },
        { label: 'Privacy', value: 'privacy', icon: <LockIcon /> },
        { label: 'Disabled', value: 'x', disabled: true },
      ]}
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
