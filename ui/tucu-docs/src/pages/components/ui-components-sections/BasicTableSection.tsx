import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';
const BasicTableSection: React.FC = () => {

  const exampleColumns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' },
  ];

  const exampleData = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { name: 'Bob Johnson', age: 35, city: 'Chicago' },
  ];

  return (
    <>
      <HeroCard
        title="BasicTable"
        description="A flexible and customizable table component with support for custom
          rendering, styling, and interactions."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Table2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Table
                </Typography>
                <BasicTable columns={exampleColumns} data={exampleData} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Striped Table
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  striped
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  border={false}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="BasicTable"
        title="BasicTable Playground"
        defaultValues={{
          'border': false,
          'hoverable': true,
          'rounded': true,
          'striped': false,
          'showHeader': true,
          'resizable': false
}}
        excludeProps={['columns', 'data', 'className', 'containerClassName', 'headerClassName', 'tableClassName', 'rowClassName', 'maxRows']}
      >
        {(props) => (
          <BasicTable
            {...props}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status' },
            ]}
            data={[
              { name: 'Alice', role: 'Developer', status: 'Active' },
              { name: 'Bob', role: 'Designer', status: 'Inactive' },
              { name: 'Carol', role: 'Manager', status: 'Active' },
            ]}
          />
        )}
      </PropPlayground>


      <AutoPropsTable componentName="BasicTable" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { BasicTable } from '@e-burgos/tucu-ui';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
];

const data = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { name: 'Bob Johnson', age: 35, city: 'Chicago' },
];

// Basic usage
<BasicTable columns={columns} data={data} />

// With custom render
const columnsWithRender = [
  {
    key: 'name',
    label: 'Name',
    render: (value) => <strong>{value}</strong>,
  },
  { key: 'age', label: 'Age' },
];

// Striped table
<BasicTable columns={columns} data={data} striped />

// Without border
<BasicTable columns={columns} data={data} border={false} />

// Without hover effect
<BasicTable columns={columns} data={data} hoverable={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default BasicTableSection;
