import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { RadarChart } from '@tucu-ui-internal/components/charts';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const sampleData = [
  { subject: 'Performance', teamA: 85, teamB: 70, teamC: 60 },
  { subject: 'Reliability', teamA: 90, teamB: 80, teamC: 75 },
  { subject: 'Scalability', teamA: 70, teamB: 85, teamC: 90 },
  { subject: 'Security', teamA: 95, teamB: 75, teamC: 80 },
  { subject: 'Usability', teamA: 80, teamB: 90, teamC: 70 },
  { subject: 'Efficiency', teamA: 75, teamB: 65, teamC: 85 },
];

const RadarChartSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-base md:text-base font-semibold">
          RadarChart
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Radar chart component for comparing multiple variables across
          categories, ideal for skill assessments and performance comparisons.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Radar Chart" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <RadarChart
              data={sampleData}
              series={[{ dataKey: 'teamA', name: 'Team A' }]}
              height={350}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Multiple Series Comparison" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <RadarChart
              data={sampleData}
              series={[
                { dataKey: 'teamA', name: 'Team A' },
                { dataKey: 'teamB', name: 'Team B' },
                { dataKey: 'teamC', name: 'Team C' },
              ]}
              height={350}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Higher Fill Opacity" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <RadarChart
              data={sampleData}
              series={[
                { dataKey: 'teamA', name: 'Team A' },
                { dataKey: 'teamB', name: 'Team B' },
              ]}
              fillOpacity={0.6}
              height={350}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              code={`import { RadarChart } from '@e-burgos/tucu-ui';

const data = [
  { subject: 'Performance', teamA: 85, teamB: 70 },
  { subject: 'Reliability', teamA: 90, teamB: 80 },
  { subject: 'Scalability', teamA: 70, teamB: 85 },
  { subject: 'Security', teamA: 95, teamB: 75 },
  { subject: 'Usability', teamA: 80, teamB: 90 },
];

<RadarChart
  data={data}
  series={[
    { dataKey: 'teamA', name: 'Team A' },
    { dataKey: 'teamB', name: 'Team B' },
  ]}
  height={350}
  fillOpacity={0.3}
  showTooltip
  showLegend
/>`}
              language="tsx"
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="RadarChart"
        defaultValues={{
          height: 350,
          fillOpacity: 0.3,
          showTooltip: true,
          showLegend: true,
          animate: true,
        }}
        excludeProps={['data', 'series', 'colors', 'className', 'emptyMessage']}
      >
        {(props) => (
          <RadarChart
            data={sampleData}
            series={[
              { dataKey: 'teamA', name: 'Team A' },
              { dataKey: 'teamB', name: 'Team B' },
            ]}
            {...props}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="RadarChart" />
    </>
  );
};

export default RadarChartSection;
