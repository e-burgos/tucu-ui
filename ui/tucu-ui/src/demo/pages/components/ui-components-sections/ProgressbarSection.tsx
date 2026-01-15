import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Progressbar,
} from '../../../../index';

const ProgressbarSection: React.FC = () => {
  const [progress, setProgress] = useState(45);

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
      prop: 'value',
      type: 'number',
      default: '-',
      description: 'Percentage value (0-100)',
    },
    {
      prop: 'label',
      type: 'React.ReactNode',
      default: "''",
      description: 'Label to display inside the bar',
    },
    {
      prop: 'size',
      type: "'sm' | 'DEFAULT' | 'lg' | 'xl'",
      default: "'DEFAULT'",
      description: 'Size of the progressbar',
    },
    {
      prop: 'rounded',
      type: "'none' | 'sm' | 'md' | 'lg' | 'DEFAULT'",
      default: "'DEFAULT'",
      description: 'Border radius',
    },
    {
      prop: 'color',
      type: "'DEFAULT' | 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'",
      default: "'DEFAULT'",
      description: 'Color variant',
    },
    {
      prop: 'variant',
      type: "'solid' | 'flat'",
      default: "'solid'",
      description: 'Visual variant',
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
          Progressbar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A progress bar component for displaying completion status with
          customizable colors, sizes, and variants.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Progressbar
                </Typography>
                <Progressbar value={progress} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Label
                </Typography>
                <Progressbar
                  value={progress}
                  label={`${progress}%`}
                  size="xl"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Interactive Example
                </Typography>
                <div className="space-y-2">
                  <Progressbar
                    value={progress}
                    label={`${progress}%`}
                    size="xl"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      className="px-3 py-1 bg-light-dark rounded border border-gray-300 dark:border-gray-600 hover:opacity-80 transition-opacity"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      className="px-3 py-1 bg-light-dark rounded border border-gray-300 dark:border-gray-600 hover:opacity-80 transition-opacity"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <Typography tag="h5" className="mb-3">
                  Colors
                </Typography>
                <div className="space-y-2">
                  <Progressbar value={60} color="primary" />
                  <Progressbar value={60} color="success" />
                  <Progressbar value={60} color="danger" />
                  <Progressbar value={60} color="info" />
                  <Progressbar value={60} color="warning" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Variants
                </Typography>
                <div className="space-y-2">
                  <Progressbar value={60} variant="solid" />
                  <Progressbar value={60} variant="flat" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Sizes
                </Typography>
                <div className="space-y-2">
                  <Progressbar value={60} size="sm" />
                  <Progressbar value={60} size="DEFAULT" />
                  <Progressbar value={60} size="lg" />
                  <Progressbar value={60} size="xl" />
                </div>
              </div>
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
              code={`import { Progressbar } from '@e-burgos/tucu-ui';

// Basic usage
<Progressbar value={45} />

// With label
<Progressbar value={45} label="45%" size="xl" />

// Different colors
<Progressbar value={60} color="primary" />
<Progressbar value={60} color="success" />
<Progressbar value={60} color="danger" />

// Different variants
<Progressbar value={60} variant="solid" />
<Progressbar value={60} variant="flat" />

// Different sizes
<Progressbar value={60} size="sm" />
<Progressbar value={60} size="lg" />
<Progressbar value={60} size="xl" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ProgressbarSection;
