import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  PanelCard,
} from '../../../../index';

const PanelCardSection: React.FC = () => {
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'title',
      type: 'string',
      default: 'required',
      description: 'Title of the panel',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display in the scrollable area',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          PanelCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A simple panel card component with a title header and scrollable
          content area.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Panel Card
                </Typography>
                <PanelCard title="Panel Title">
                  <div className="space-y-2">
                    <Typography tag="p">Content line 1</Typography>
                    <Typography tag="p">Content line 2</Typography>
                    <Typography tag="p">Content line 3</Typography>
                    <Typography tag="p">Content line 4</Typography>
                    <Typography tag="p">Content line 5</Typography>
                  </div>
                </PanelCard>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { PanelCard, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<PanelCard title="Panel Title">
  <div className="space-y-2">
    <Typography tag="p">Content line 1</Typography>
    <Typography tag="p">Content line 2</Typography>
    <Typography tag="p">Content line 3</Typography>
  </div>
</PanelCard>

// With custom className
<PanelCard title="Custom Panel" className="max-w-md">
  <Typography tag="p">Custom styled panel</Typography>
</PanelCard>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PanelCardSection;
