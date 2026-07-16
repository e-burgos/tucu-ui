import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  InfoCard,
  Badge,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const { DollarSign, TrendingUp, Activity, Clock } = LucideIcons;

const InfoCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="InfoCard"
        description="A structured card for displaying key-value data in columns, with
          optional header, footer tags, and tooltips."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-violet-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Info className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-6">
            <InfoCard
              title="Revenue Summary"
              subtitle="Q4 2025 Financial Report"
              icon={<DollarSign className="h-4 w-4 text-brand" />}
              headerRight={
                <Badge color="success" size="small">
                  +12%
                </Badge>
              }
              columns={[
                {
                  key: 'revenue',
                  label: 'Revenue',
                  icon: <DollarSign className="h-3 w-3" />,
                  items: [
                    { label: 'Total', value: '$1,234,567' },
                    {
                      label: 'Growth',
                      value: '+12.3%',
                      color: 'text-green-500',
                    },
                    { label: 'Target', value: '$1,500,000' },
                  ],
                },
                {
                  key: 'metrics',
                  label: 'Metrics',
                  accent: 'bg-blue-500',
                  accentText: 'text-blue-500',
                  icon: <TrendingUp className="h-3 w-3" />,
                  items: [
                    { label: 'Customers', value: '8,432' },
                    { label: 'Conversion', value: '3.2%' },
                    { label: 'Avg. Order', value: '$146' },
                  ],
                },
                {
                  key: 'performance',
                  label: 'Performance',
                  accent: 'bg-orange-500',
                  accentText: 'text-orange-500',
                  icon: <Activity className="h-3 w-3" />,
                  items: [
                    {
                      label: 'Uptime',
                      value: '99.9%',
                      color: 'text-green-500',
                    },
                    { label: 'Latency', value: '45ms' },
                    { label: 'Errors', value: '0.01%' },
                  ],
                },
              ]}
              gridCols={3}
              footerLabel="Tags"
              footerTags={[
                { label: 'Quarterly', tooltip: 'Q4 2025 data' },
                {
                  label: 'Verified',
                  className:
                    'bg-green-200 dark:bg-green-900/30 border border-green-300/50 dark:border-green-700/50 text-green-700 dark:text-green-400',
                },
                {
                  label: 'Updated 2h ago',
                  icon: <Clock className="h-3 w-3" />,
                },
              ]}
            />

            <InfoCard
              title="Simple Card"
              columns={[
                {
                  key: 'info',
                  label: 'Basic Info',
                  items: [
                    { label: 'Name', value: 'John Doe' },
                    { label: 'Email', value: 'john@example.com' },
                    { label: 'Role', value: 'Admin' },
                  ],
                },
                {
                  key: 'stats',
                  label: 'Statistics',
                  items: [
                    { label: 'Projects', value: '12' },
                    { label: 'Tasks', value: '48' },
                    {
                      label: 'Completed',
                      value: '89%',
                      color: 'text-green-500',
                    },
                  ],
                },
              ]}
              gridCols={2}
            />

            <InfoCard
              title="Custom Content"
              subtitle="Without columns — just children"
              icon={<Activity className="h-4 w-4 text-brand" />}
              headerRight={
                <Badge color="info" size="small">
                  Live
                </Badge>
              }
              footer={
                <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                  <Typography tag="span" className="text-[11px] text-gray-500">
                    Last synced 5 min ago
                  </Typography>
                  <Typography
                    tag="span"
                    className="text-[11px] text-brand font-medium cursor-pointer hover:underline"
                  >
                    Refresh
                  </Typography>
                </div>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <Typography
                    tag="p"
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    2.4k
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-[11px] text-gray-500 mt-1"
                  >
                    Active Users
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography
                    tag="p"
                    className="text-2xl font-bold text-green-500"
                  >
                    98.2%
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-[11px] text-gray-500 mt-1"
                  >
                    Uptime
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography
                    tag="p"
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    12ms
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-[11px] text-gray-500 mt-1"
                  >
                    Avg Latency
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography
                    tag="p"
                    className="text-2xl font-bold text-orange-500"
                  >
                    3
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-[11px] text-gray-500 mt-1"
                  >
                    Warnings
                  </Typography>
                </div>
              </div>
            </InfoCard>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="InfoCard"
        title="InfoCard Playground"
        defaultValues={{
          title: 'Info Card Title',
          subtitle: 'Subtitle text here',
          gridCols: 2,
        }}
        excludeProps={[
          'columns',
          'children',
          'footer',
          'footerLabel',
          'footerTags',
          'headerRight',
          'icon',
          'className',
        ]}
      >
        {(props) => (
          <InfoCard
            {...props}
            columns={[
              { label: 'Status', value: 'Active' },
              { label: 'Type', value: 'Premium' },
              { label: 'Created', value: '2024-01-01' },
              { label: 'Updated', value: '2024-06-15' },
            ]}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="InfoCard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { InfoCard, Badge } from '@e-burgos/tucu-ui';
import { DollarSign, TrendingUp } from 'lucide-react';

<InfoCard
  title="Revenue"
  subtitle="Q4 Report"
  icon={<DollarSign className="h-4 w-4 text-brand" />}
  headerRight={<Badge color="success">+12%</Badge>}
  columns={[
    {
      key: 'revenue',
      label: 'Revenue',
      icon: <DollarSign className="h-3 w-3" />,
      items: [
        { label: 'Total', value: '$1,234,567' },
        { label: 'Growth', value: '+12%', color: 'text-green-500' },
      ],
    },
    {
      key: 'metrics',
      label: 'Metrics',
      accent: 'bg-blue-500',
      accentText: 'text-blue-500',
      icon: <TrendingUp className="h-3 w-3" />,
      items: [
        { label: 'Users', value: '8,432' },
        { label: 'Conversion', value: '3.2%' },
      ],
    },
  ]}
  gridCols={2}
  footerLabel="Tags"
  footerTags={[
    { label: 'Quarterly', tooltip: 'Q4 2025' },
    { label: 'Verified', className: 'bg-green-200 dark:bg-green-900/30 border border-green-300/50 dark:border-green-700/50 text-green-700 dark:text-green-400' },
  ]}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default InfoCardSection;
