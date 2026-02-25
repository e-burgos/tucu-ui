import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

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
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          BasicTable
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A flexible and customizable table component with support for custom
          rendering, styling, and interactions.
        </Typography>
      </div>

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
