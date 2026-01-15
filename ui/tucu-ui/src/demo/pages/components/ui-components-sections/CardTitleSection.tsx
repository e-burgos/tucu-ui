import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';

const CardTitleSection: React.FC = () => {
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
      default: '-',
      description: 'Title text to display',
    },
    {
      prop: 'border',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show border',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: '-',
      description: 'Content to display inside the card',
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
          CardTitle
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A card component with an integrated title that appears above the card
          border.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Title
                </Typography>
                <CardTitle title="Card Title">
                  <Typography tag="p">Card content goes here</Typography>
                </CardTitle>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <CardTitle title="No Border" border={false}>
                  <Typography tag="p">Card without border</Typography>
                </CardTitle>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Rich Content
                </Typography>
                <CardTitle title="Rich Content">
                  <div className="space-y-2">
                    <Typography tag="p">First paragraph</Typography>
                    <Typography tag="p">Second paragraph</Typography>
                  </div>
                </CardTitle>
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
              code={`import { CardTitle, Typography } from '@e-burgos/tucu-ui';

// With title
<CardTitle title="Card Title">
  <Typography tag="p">Card content goes here</Typography>
</CardTitle>

// Without border
<CardTitle title="No Border" border={false}>
  <Typography tag="p">Card without border</Typography>
</CardTitle>

// With rich content
<CardTitle title="Rich Content">
  <div className="space-y-2">
    <Typography tag="p">First paragraph</Typography>
    <Typography tag="p">Second paragraph</Typography>
  </div>
</CardTitle>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CardTitleSection;
