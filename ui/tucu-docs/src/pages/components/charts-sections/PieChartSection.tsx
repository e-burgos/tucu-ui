import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { PieChart } from '@tucu-ui-internal/components/charts';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const sampleData = [
  { name: 'Chrome', value: 62 },
  { name: 'Safari', value: 19 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 6 },
  { name: 'Other', value: 3 },
];

const PieChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-base md:text-base font-semibold">
          PieChart
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Pie and donut chart component for displaying proportions and
          distributions with labels and inner content support.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Pie Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <PieChart data={sampleData} height={300} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Donut Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <PieChart data={sampleData} donut height={300} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Donut with Inner Content" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <PieChart
              data={sampleData}
              donut
              height={300}
              innerContent={
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
              }
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Without Labels" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <PieChart data={sampleData} showLabels={false} height={300} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { PieChart } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Chrome', value: 62 },
  { name: 'Safari', value: 19 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 6 },
  { name: 'Other', value: 3 },
];

<PieChart
  data={data}
  height={300}
  donut
  showLabels
  showTooltip
  showLegend
  innerContent={<p>Center</p>}
/>`}
              language="tsx"
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="PieChart"
        defaultValues={{
          height: 300,
          donut: false,
          showLabels: true,
          showTooltip: true,
          showLegend: true,
          animate: true,
        }}
        excludeProps={[
          'data',
          'colors',
          'className',
          'innerContent',
          'emptyMessage',
        ]}
      >
        {(props) => <PieChart data={sampleData} {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="PieChart" />
    </>
  );
};

export default PieChartSection;
