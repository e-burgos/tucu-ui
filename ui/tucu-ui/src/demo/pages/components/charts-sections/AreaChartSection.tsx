import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { AreaChart } from '../../../../components/charts';
import { PropPlayground } from '../../../components/prop-playground';
import { AutoPropsTable } from '../../../components/auto-props-table';

const sampleData = [
  { name: 'Jan', users: 400, sessions: 2400, pageViews: 4400 },
  { name: 'Feb', users: 300, sessions: 1398, pageViews: 3210 },
  { name: 'Mar', users: 500, sessions: 3800, pageViews: 5400 },
  { name: 'Apr', users: 780, sessions: 3908, pageViews: 6200 },
  { name: 'May', users: 890, sessions: 4800, pageViews: 7100 },
  { name: 'Jun', users: 1200, sessions: 5800, pageViews: 9400 },
  { name: 'Jul', users: 1500, sessions: 6300, pageViews: 11000 },
];

const AreaChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          AreaChart
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Area chart component for visualizing volume and trends over time with
          gradient fills, stacking, and smooth curves.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Area Chart with Gradient" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <AreaChart
              data={sampleData}
              series={[
                { dataKey: 'users', name: 'Users' },
                { dataKey: 'sessions', name: 'Sessions' },
              ]}
              height={300}
              gradient
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Stacked Area Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <AreaChart
              data={sampleData}
              series={[
                { dataKey: 'users', name: 'Users', stackId: 'a' },
                { dataKey: 'sessions', name: 'Sessions', stackId: 'a' },
                { dataKey: 'pageViews', name: 'Page Views', stackId: 'a' },
              ]}
              stacked
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Without Gradient (Flat)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <AreaChart
              data={sampleData}
              series={[
                { dataKey: 'users', name: 'Users' },
                { dataKey: 'sessions', name: 'Sessions' },
              ]}
              gradient={false}
              curved={false}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { AreaChart } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Jan', users: 400, sessions: 2400 },
  { name: 'Feb', users: 300, sessions: 1398 },
  { name: 'Mar', users: 500, sessions: 3800 },
];

<AreaChart
  data={data}
  series={[
    { dataKey: 'users', name: 'Users' },
    { dataKey: 'sessions', name: 'Sessions' },
  ]}
  height={300}
  curved
  gradient
  stacked={false}
  showGrid
  showTooltip
  showLegend
/>`}
              language="tsx"
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="AreaChart"
        defaultValues={{
          height: 300,
          curved: true,
          gradient: true,
          stacked: false,
          showGrid: true,
          showTooltip: true,
          showLegend: true,
          animate: true,
        }}
        excludeProps={[
          'data',
          'series',
          'colors',
          'className',
          'xAxisKey',
          'emptyMessage',
        ]}
      >
        {(props) => (
          <AreaChart
            data={sampleData}
            series={[
              { dataKey: 'users', name: 'Users' },
              { dataKey: 'sessions', name: 'Sessions' },
            ]}
            {...props}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="AreaChart" />
    </>
  );
};

export default AreaChartSection;
