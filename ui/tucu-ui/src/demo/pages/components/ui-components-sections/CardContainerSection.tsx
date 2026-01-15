import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';

const CardContainerSection: React.FC = () => {
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
          CardContainer
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A container component that provides consistent styling and layout for
          card-based content.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Card
                </Typography>
                <CardContainer>
                  <Typography tag="p">Card content goes here</Typography>
                </CardContainer>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Content
                </Typography>
                <CardContainer>
                  <Typography tag="h3" className="font-bold mb-2">
                    Card Title
                  </Typography>
                  <Typography tag="p">
                    This is a card with custom content including a title and
                    description.
                  </Typography>
                </CardContainer>
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
              code={`import { CardContainer, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<CardContainer>
  <Typography tag="p">Card content goes here</Typography>
</CardContainer>

// With custom content
<CardContainer>
  <Typography tag="h3" className="font-bold mb-2">
    Card Title
  </Typography>
  <Typography tag="p">
    Card description and content
  </Typography>
</CardContainer>

// With custom className
<CardContainer className="bg-blue-50">
  <Typography tag="p">Custom styled card</Typography>
</CardContainer>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CardContainerSection;
