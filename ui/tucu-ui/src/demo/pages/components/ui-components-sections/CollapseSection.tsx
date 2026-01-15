import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Collapse,
} from '../../../../index';

const CollapseSection: React.FC = () => {
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
      prop: 'label',
      type: 'string',
      default: 'required',
      description: 'Label text for the collapse header',
    },
    {
      prop: 'initialOpen',
      type: 'boolean',
      default: 'false',
      description: 'Whether the collapse is initially open',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display when expanded',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Collapse
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A collapsible content panel component with smooth animations for
          showing and hiding content.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Collapse
                </Typography>
                <Collapse label="Click to expand">
                  <div className="p-4">
                    <Typography tag="p">
                      This is the content that appears when the collapse is
                      expanded.
                    </Typography>
                  </div>
                </Collapse>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Initially Open
                </Typography>
                <Collapse label="Pre-expanded" initialOpen>
                  <div className="p-4">
                    <Typography tag="p">
                      This collapse starts in the open state.
                    </Typography>
                  </div>
                </Collapse>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Rich Content
                </Typography>
                <Collapse label="Rich Content Example">
                  <div className="p-4 space-y-2">
                    <Typography tag="p" className="font-semibold">
                      Section Title
                    </Typography>
                    <Typography tag="p">
                      This collapse can contain any React content including
                      images, lists, and other components.
                    </Typography>
                    <ul className="list-disc list-inside">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                </Collapse>
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
              code={`import { Collapse, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<Collapse label="Click to expand">
  <div className="p-4">
    <Typography tag="p">Content here</Typography>
  </div>
</Collapse>

// Initially open
<Collapse label="Pre-expanded" initialOpen>
  <div className="p-4">
    <Typography tag="p">Content starts visible</Typography>
  </div>
</Collapse>

// With rich content
<Collapse label="Rich Content">
  <div className="p-4 space-y-2">
    <Typography tag="p" className="font-semibold">Title</Typography>
    <Typography tag="p">Description</Typography>
    <ul className="list-disc list-inside">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</Collapse>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CollapseSection;
