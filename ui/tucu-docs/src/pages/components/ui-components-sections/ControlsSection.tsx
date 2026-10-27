import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  SegmentedControl,
  FilterPill,
  FilterBar,
  AnimatedTabs,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const statusOptions = [
  { name: 'All', value: 'all' },
  { name: 'Paid', value: 'paid' },
  { name: 'Pending', value: 'pending' },
];

const ControlsSection: React.FC = () => {
  const [view, setView] = useState('list');
  const [pill, setPill] = useState<string | null>('pending');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [tab, setTab] = useState('overview');

  return (
    <>
      <HeroCard
        title="Controls"
        description="SegmentedControl, FilterPill, FilterBar and AnimatedTabs: compact controls for switching views and filtering lists."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.SlidersHorizontal className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="SegmentedControl" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            {(['xs', 'sm', 'md'] as const).map((size) => (
              <SegmentedControl
                key={size}
                aria-label={`View ${size}`}
                size={size}
                value={view}
                onChange={setView}
                options={[
                  { value: 'list', label: 'List' },
                  { value: 'grid', label: 'Grid' },
                  { value: 'map', label: 'Map', disabled: true },
                ]}
              />
            ))}
            <SegmentedControl
              aria-label="Panel tabs"
              semantics="tabs"
              idBase="controls-demo"
              value={view}
              onChange={setView}
              options={[
                { value: 'list', label: 'List' },
                { value: 'grid', label: 'Grid' },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="FilterPill and FilterBar" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['paid', 'green', 12],
                  ['pending', 'orange', 4],
                  ['late', 'red', 1],
                ] as const
              ).map(([id, tone, count]) => (
                <FilterPill
                  key={id}
                  tone={tone}
                  count={count}
                  active={pill === id}
                  onClick={() => setPill(pill === id ? null : id)}
                >
                  {id}
                </FilterPill>
              ))}
            </div>
            <FilterBar
              search={{
                value: query,
                onChange: setQuery,
                placeholder: 'Search orders',
              }}
              filters={[
                {
                  id: 'status',
                  label: 'Status',
                  value: status,
                  onChange: setStatus,
                  options: statusOptions,
                  ignoreInActiveCount: false,
                },
              ]}
              toggle={{
                checked: onlyOpen,
                onChange: setOnlyOpen,
                label: 'Only open',
              }}
              onClear={() => {
                setQuery('');
                setStatus('all');
                setOnlyOpen(false);
              }}
              collapsible
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="AnimatedTabs" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <AnimatedTabs
              activeTab={tab}
              onChange={setTab}
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'activity', label: 'Activity', badge: 3 },
                { id: 'settings', label: 'Settings' },
                { id: 'billing', label: 'Billing', disabled: true },
              ]}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="SegmentedControl" />
      <AutoPropsTable componentName="FilterPill" />
      <AutoPropsTable componentName="FilterBar" />
      <AutoPropsTable componentName="AnimatedTabs" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { SegmentedControl, FilterPill, FilterBar, AnimatedTabs } from '@e-burgos/tucu-ui';

<SegmentedControl
  aria-label="View"
  value={view}
  onChange={setView}
  options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]}
/>

<FilterPill active={status === 'pending'} count={4} tone="orange" onClick={toggle}>
  Pending
</FilterPill>

<FilterBar
  search={{ value: query, onChange: setQuery }}
  filters={[{ id: 'status', value: status, onChange: setStatus, options }]}
  onClear={reset}
  collapsible
/>

<AnimatedTabs
  activeTab={tab}
  onChange={setTab}
  tabs={[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity', badge: 3 }]}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ControlsSection;
