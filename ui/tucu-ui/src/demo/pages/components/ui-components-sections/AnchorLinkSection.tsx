import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  AnchorLink,
  GITHUB_URL,
} from '../../../../index';

const AnchorLinkSection: React.FC = () => {
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
      prop: 'to',
      type: 'string',
      default: 'required',
      description: 'Link destination (internal or external URL)',
    },
    {
      prop: '...LinkProps',
      type: 'LinkProps',
      default: '-',
      description: 'All React Router Link props are supported',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          AnchorLink
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A smart link component that automatically handles both internal routes
          and external URLs.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Internal Link
                </Typography>
                <AnchorLink to="/components">Go to Components</AnchorLink>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  External Link
                </Typography>
                <AnchorLink to={GITHUB_URL} target="_blank">
                  External Link
                </AnchorLink>
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
              code={`import { AnchorLink } from '@e-burgos/tucu-ui';

// Internal link (uses React Router Link)
<AnchorLink to="/components">
  Go to Components
</AnchorLink>

// External link (uses native <a> tag)
<AnchorLink to="https://example.com" target="_blank">
  External Link
</AnchorLink>

// With all Link props
<AnchorLink
  to="/about"
  className="text-blue-500 hover:underline"
>
  About Us
</AnchorLink>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AnchorLinkSection;
