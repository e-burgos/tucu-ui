import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  KeyValueRow,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
const KeyValueRowSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="KeyValueRow"
        description="A simple row component for displaying label-value pairs, ideal for
          detail panels, summaries, and settings views."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Rows3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Usage
                </Typography>
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <KeyValueRow label="Name" value="John Doe" />
                  <KeyValueRow label="Email" value="john@example.com" />
                  <KeyValueRow label="Role" value="Administrator" />
                  <KeyValueRow label="Status" value="Active" />
                </div>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Monospace & Accent
                </Typography>
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <KeyValueRow label="Balance" value="$12,450.00" mono />
                  <KeyValueRow label="Interest Rate" value="3.5%" mono accent />
                  <KeyValueRow label="Account ID" value="ACC-0042891" mono />
                  <KeyValueRow
                    label="Next Payment"
                    value="Jun 15, 2026"
                    accent
                  />
                </div>
              </CardContainer>

              <CardContainer className="p-4 md:col-span-2">
                <Typography tag="h5" className="mb-3">
                  With Custom Values (ReactNode)
                </Typography>
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  <KeyValueRow
                    label="Health"
                    value={
                      <span className="inline-flex items-center gap-1.5 text-green-500 text-xs font-medium">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Healthy
                      </span>
                    }
                  />
                  <KeyValueRow
                    label="Progress"
                    value={
                      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-brand rounded-full" />
                      </div>
                    }
                  />
                  <KeyValueRow
                    label="Tags"
                    value={
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-brand/10 text-brand">
                          React
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500/10 text-blue-500">
                          TypeScript
                        </span>
                      </div>
                    }
                  />
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="KeyValueRow"
        title="KeyValueRow Playground"
        defaultValues={{
          'label': 'Status',
          'value': 'Active',
          'accent': false,
          'mono': false
}}
        excludeProps={['className']}
      >
        {(props) => <KeyValueRow {...props} />}
      </PropPlayground>



      <AutoPropsTable componentName="KeyValueRow" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { KeyValueRow } from '@e-burgos/tucu-ui';

// Basic
<KeyValueRow label="Name" value="John Doe" />

// Monospace numbers
<KeyValueRow label="Balance" value="$12,450.00" mono />

// Accent color
<KeyValueRow label="Rate" value="3.5%" mono accent />

// Custom ReactNode value
<KeyValueRow
  label="Status"
  value={<span className="text-green-500">Active</span>}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default KeyValueRowSection;
