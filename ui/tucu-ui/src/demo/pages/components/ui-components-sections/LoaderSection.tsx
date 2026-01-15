import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Loader,
} from '../../../../index';

const LoaderSection: React.FC = () => {
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
      type: "'div' | 'span'",
      default: "'div'",
      description: 'HTML tag to render',
    },
    {
      prop: 'size',
      type: "'large' | 'medium' | 'small'",
      default: "'medium'",
      description: 'Size of the loader',
    },
    {
      prop: 'variant',
      type: "'blink' | 'scaleUp' | 'moveUp'",
      default: "'moveUp'",
      description: 'Animation variant',
    },
    {
      prop: 'color',
      type: "'primary' | 'gray' | 'success' | 'danger' | 'info' | 'warning'",
      default: "'primary'",
      description: 'Color of the loader',
    },
    {
      prop: 'showOnlyThreeDots',
      type: 'boolean',
      default: 'false',
      description: 'Show only three dots instead of four',
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
          Loader
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A versatile loader component with multiple animation variants and
          sizes for indicating loading states.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Loader
                </Typography>
                <Loader />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Small Loader
                </Typography>
                <Loader size="small" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Large Loader
                </Typography>
                <Loader size="large" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Three Dots Only
                </Typography>
                <Loader showOnlyThreeDots />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Blink Variant
                </Typography>
                <Loader variant="blink" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Scale Up Variant
                </Typography>
                <Loader variant="scaleUp" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Move Up Variant
                </Typography>
                <Loader variant="moveUp" />
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
              code={`import { Loader } from '@e-burgos/tucu-ui';

// Basic usage
<Loader />

// Different sizes
<Loader size="small" />
<Loader size="medium" />
<Loader size="large" />

// Different variants
<Loader variant="blink" />
<Loader variant="scaleUp" />
<Loader variant="moveUp" />

// Different colors
<Loader color="primary" />
<Loader color="success" />
<Loader color="danger" />

// Three dots only
<Loader showOnlyThreeDots />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default LoaderSection;
