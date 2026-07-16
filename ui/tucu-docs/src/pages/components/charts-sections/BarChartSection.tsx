import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { BarChart } from '@tucu-ui-internal/components/charts';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const sampleData = [
  { name: 'Jan', sales: 4000, returns: 400, target: 4500 },
  { name: 'Feb', sales: 3000, returns: 300, target: 3500 },
  { name: 'Mar', sales: 5000, returns: 500, target: 4800 },
  { name: 'Apr', sales: 4780, returns: 478, target: 5000 },
  { name: 'May', sales: 5890, returns: 589, target: 5500 },
  { name: 'Jun', sales: 6390, returns: 639, target: 6000 },
];

const BarChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-base md:text-base font-semibold">
          BarChart
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Bar chart component for comparing categorical data with support for
          stacking, horizontal layout, and custom bar styling.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Bar Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BarChart
              data={sampleData}
              series={[
                { dataKey: 'sales', name: 'Sales' },
                { dataKey: 'returns', name: 'Returns' },
              ]}
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Stacked Bars" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BarChart
              data={sampleData}
              series={[
                { dataKey: 'sales', name: 'Sales', stackId: 'a' },
                { dataKey: 'returns', name: 'Returns', stackId: 'a' },
              ]}
              stacked
              height={300}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Horizontal Layout" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BarChart
              data={sampleData}
              series={[{ dataKey: 'sales', name: 'Sales' }]}
              layout="vertical"
              height={350}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { BarChart } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Jan', sales: 4000, returns: 400 },
  { name: 'Feb', sales: 3000, returns: 300 },
  { name: 'Mar', sales: 5000, returns: 500 },
];

<BarChart
  data={data}
  series={[
    { dataKey: 'sales', name: 'Sales' },
    { dataKey: 'returns', name: 'Returns' },
  ]}
  height={300}
  layout="horizontal"
  stacked={false}
  barRadius={4}
  barGap={4}
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
        componentName="BarChart"
        defaultValues={{
          height: 300,
          stacked: false,
          layout: 'horizontal',
          showGrid: true,
          showTooltip: true,
          showLegend: true,
          barRadius: 4,
          barGap: 4,
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
          <BarChart
            data={sampleData}
            series={[
              { dataKey: 'sales', name: 'Sales' },
              { dataKey: 'returns', name: 'Returns' },
            ]}
            {...props}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="BarChart" />
    </>
  );
};

export default BarChartSection;
