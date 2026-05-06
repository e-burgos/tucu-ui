import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { ComposedChart } from '../../../../components/charts';
import { PropPlayground } from '../../../components/prop-playground';
import { AutoPropsTable } from '../../../components/auto-props-table';

const sampleData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 5000, expenses: 3200, profit: 1800 },
  { name: 'Apr', revenue: 4780, expenses: 2908, profit: 1872 },
  { name: 'May', revenue: 5890, expenses: 4800, profit: 1090 },
  { name: 'Jun', revenue: 6390, expenses: 3800, profit: 2590 },
];

const ComposedChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ComposedChart
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Composed chart combining line, bar, and area in a single chart for
          complex data visualization needs.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Bar + Line Combination" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <ComposedChart
              data={sampleData}
              series={[
                { dataKey: 'revenue', name: 'Revenue', type: 'bar' },
                { dataKey: 'profit', name: 'Profit', type: 'line' },
              ]}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Area + Bar + Line" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <ComposedChart
              data={sampleData}
              series={[
                { dataKey: 'expenses', name: 'Expenses', type: 'area' },
                { dataKey: 'revenue', name: 'Revenue', type: 'bar' },
                { dataKey: 'profit', name: 'Profit', type: 'line' },
              ]}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { ComposedChart } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 5000, expenses: 3200, profit: 1800 },
];

<ComposedChart
  data={data}
  series={[
    { dataKey: 'expenses', name: 'Expenses', type: 'area' },
    { dataKey: 'revenue', name: 'Revenue', type: 'bar' },
    { dataKey: 'profit', name: 'Profit', type: 'line' },
  ]}
  height={300}
  barRadius={4}
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
        componentName="ComposedChart"
        defaultValues={{
          height: 300,
          barRadius: 4,
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
          <ComposedChart
            data={sampleData}
            series={[
              { dataKey: 'revenue', name: 'Revenue', type: 'bar' },
              { dataKey: 'profit', name: 'Profit', type: 'line' },
            ]}
            {...props}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="ComposedChart" />
    </>
  );
};

export default ComposedChartSection;
