import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';

const TypographySection: React.FC = () => {
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
      prop: 'tag',
      type: 'string',
      default: 'required',
      description: 'HTML tag or typography variant to render',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display',
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
          Typography
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A comprehensive typography component system with semantic HTML tags
          and predefined text styles.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Headings
                </Typography>
                <div className="space-y-2">
                  <Typography tag="h1">Heading 1</Typography>
                  <Typography tag="h2">Heading 2</Typography>
                  <Typography tag="h3">Heading 3</Typography>
                  <Typography tag="h4">Heading 4</Typography>
                  <Typography tag="h5">Heading 5</Typography>
                  <Typography tag="h6">Heading 6</Typography>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Text Variants
                </Typography>
                <div className="space-y-2">
                  <Typography tag="headline">Headline Text</Typography>
                  <Typography tag="body">Body Text</Typography>
                  <Typography tag="label-1">Label 1</Typography>
                  <Typography tag="h5">Label 2</Typography>
                  <Typography tag="caption">Caption Text</Typography>
                  <Typography tag="legal">Legal Text</Typography>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Semantic Elements
                </Typography>
                <div className="space-y-2">
                  <Typography tag="p">Paragraph text</Typography>
                  <Typography tag="strong">Strong text</Typography>
                  <Typography tag="em">Emphasized text</Typography>
                  <Typography tag="code">Code text</Typography>
                  <Typography tag="pre">Preformatted text</Typography>
                </div>
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
              code={`import { Typography } from '@e-burgos/tucu-ui';

// Headings
<Typography tag="h1">Heading 1</Typography>
<Typography tag="h2">Heading 2</Typography>
<Typography tag="h3">Heading 3</Typography>

// Text variants
<Typography tag="headline">Headline Text</Typography>
<Typography tag="body">Body Text</Typography>
<Typography tag="label-1">Label 1</Typography>
<Typography tag="h5">Label 2</Typography>
<Typography tag="caption">Caption Text</Typography>

// Semantic elements
<Typography tag="p">Paragraph text</Typography>
<Typography tag="strong">Strong text</Typography>
<Typography tag="em">Emphasized text</Typography>
<Typography tag="code">Code text</Typography>

// With custom className
<Typography tag="h1" className="text-blue-500">
  Custom Styled Heading
</Typography>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TypographySection;
