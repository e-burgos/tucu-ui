import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
import { PropPlayground } from '../../../components/prop-playground';
import { AutoPropsTable } from '../../../components/auto-props-table';

const sampleData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 5000, expenses: 3200, profit: 1800 },
  { name: 'Apr', revenue: 4780, expenses: 2908, profit: 1872 },
  { name: 'May', revenue: 5890, expenses: 4800, profit: 1090 },
  { name: 'Jun', revenue: 6390, expenses: 3800, profit: 2590 },
  { name: 'Jul', revenue: 7490, expenses: 4300, profit: 3190 },
];

const LineChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          LineChart
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Line chart component for displaying trends and time-series data with
          multiple series, custom curves, and theme integration.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Line Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <LineChart
              data={sampleData}
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
                { dataKey: 'expenses', name: 'Expenses' },
              ]}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Multiple Series with Dots" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <LineChart
              data={sampleData}
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
                { dataKey: 'expenses', name: 'Expenses' },
                { dataKey: 'profit', name: 'Profit' },
              ]}
              showDots
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Straight Lines (No Curve)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <LineChart
              data={sampleData}
              series={[
                { dataKey: 'revenue', name: 'Revenue' },
                { dataKey: 'profit', name: 'Profit' },
              ]}
              curved={false}
              strokeWidth={3}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { LineChart } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 3200 },
];

<LineChart
  data={data}
  series={[
    { dataKey: 'revenue', name: 'Revenue' },
    { dataKey: 'expenses', name: 'Expenses' },
  ]}
  height={300}
  curved
  showDots
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
        componentName="LineChart"
        defaultValues={{
          height: 300,
          curved: true,
          showDots: false,
          strokeWidth: 2,
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
          <LineChart
            data={sampleData}
            series={[
              { dataKey: 'revenue', name: 'Revenue' },
              { dataKey: 'expenses', name: 'Expenses' },
            ]}
            {...props}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="LineChart" />
    </>
  );
};

export default LineChartSection;
