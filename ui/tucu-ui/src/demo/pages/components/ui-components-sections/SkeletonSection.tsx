import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Skeleton,
} from '../../../../index';

const SkeletonSection: React.FC = () => {
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
      prop: 'animation',
      type: "'pulse' | 'wave' | 'shimmer' | 'none'",
      default: "'shimmer'",
      description: 'Animation type for the skeleton',
    },
    {
      prop: 'shape',
      type: "'rectangle' | 'circle' | 'text' | 'rounded'",
      default: "'rounded'",
      description: 'Shape of the skeleton',
    },
    {
      prop: 'size',
      type: "'tiny' | 'small' | 'medium' | 'large' | 'full'",
      default: "'medium'",
      description: 'Predefined size of the skeleton',
    },
    {
      prop: 'width',
      type: 'string',
      default: '-',
      description: 'Width of the skeleton (overrides size)',
    },
    {
      prop: 'height',
      type: 'string',
      default: '-',
      description: 'Height of the skeleton (overrides size)',
    },
    {
      prop: 'count',
      type: 'number',
      default: '1',
      description: 'Number of skeleton lines to render',
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
          Skeleton
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A skeleton loader component for displaying placeholder content while
          data is loading.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Default Skeleton
                </Typography>
                <Skeleton />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  With Text Lines
                </Typography>
                <Skeleton shape="text" count={3} />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Circle Shape
                </Typography>
                <div className="flex gap-3">
                  <Skeleton shape="circle" size="small" width="2rem" />
                  <Skeleton shape="circle" size="medium" width="4rem" />
                  <Skeleton shape="circle" size="large" width="6rem" />
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="space-y-2">
                  <Skeleton size="tiny" />
                  <Skeleton size="small" />
                  <Skeleton size="medium" />
                  <Skeleton size="large" />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Animations" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Shimmer Animation (Default)
                </Typography>
                <Skeleton animation="shimmer" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Wave Animation
                </Typography>
                <Skeleton animation="wave" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Pulse Animation
                </Typography>
                <Skeleton animation="pulse" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  No Animation
                </Typography>
                <Skeleton animation="none" />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shapes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Rounded (Default)
                </Typography>
                <Skeleton shape="rounded" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Rectangle
                </Typography>
                <Skeleton shape="rectangle" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Circle
                </Typography>
                <Skeleton shape="circle" width="8rem" height="8rem" />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Text Lines
                </Typography>
                <Skeleton shape="text" count={4} />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Common Patterns" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Card Skeleton
                </Typography>
                <CardContainer className="p-4">
                  <Skeleton size="large" className="mb-3" />
                  <Skeleton shape="text" count={3} />
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Profile Skeleton
                </Typography>
                <CardContainer className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton shape="circle" width="4rem" height="4rem" />
                    <div className="flex-1 space-y-2">
                      <Skeleton width="60%" height="1rem" />
                      <Skeleton width="40%" height="0.875rem" />
                    </div>
                  </div>
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  List Skeleton
                </Typography>
                <CardContainer className="p-4 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Skeleton shape="circle" width="2.5rem" height="2.5rem" />
                      <div className="flex-1 space-y-2">
                        <Skeleton width="70%" height="0.875rem" />
                        <Skeleton width="50%" height="0.75rem" />
                      </div>
                    </div>
                  ))}
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Article Skeleton
                </Typography>
                <CardContainer className="p-4">
                  <Skeleton size="large" className="mb-4" />
                  <Skeleton width="80%" className="mb-2 h-6" />
                  <Skeleton width="60%" className="mb-4 h-6" />
                  <Skeleton shape="text" count={5} />
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Grid Skeleton
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <CardContainer key={item} className="p-4">
                      <Skeleton height="10rem" className="mb-3" />
                      <Skeleton width="80%" className="mb-2 h-5" />
                      <Skeleton shape="text" count={2} />
                    </CardContainer>
                  ))}
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
              code={`import { Skeleton } from '@e-burgos/tucu-ui';

// Basic usage
<Skeleton />

// Different animations
<Skeleton animation="shimmer" />
<Skeleton animation="wave" />
<Skeleton animation="pulse" />
<Skeleton animation="none" />

// Different shapes
<Skeleton shape="rounded" />
<Skeleton shape="rectangle" />
<Skeleton shape="circle" width="4rem" height="4rem" />
<Skeleton shape="text" count={3} />

// Different sizes
<Skeleton size="tiny" />
<Skeleton size="small" />
<Skeleton size="medium" />
<Skeleton size="large" />

// Custom dimensions
<Skeleton width="80%" height="2rem" />

// Multiple lines
<Skeleton count={5} />

// Card skeleton pattern
<div>
  <Skeleton size="large" className="mb-3" />
  <Skeleton shape="text" count={3} />
</div>

// Profile skeleton pattern
<div className="flex items-center gap-4">
  <Skeleton shape="circle" width="4rem" height="4rem" />
  <div className="flex-1 space-y-2">
    <Skeleton width="60%" height="1rem" />
    <Skeleton width="40%" height="0.875rem" />
  </div>
</div>

// List item skeleton pattern
<div className="flex items-center gap-3">
  <Skeleton shape="circle" width="2.5rem" height="2.5rem" />
  <div className="flex-1 space-y-2">
    <Skeleton width="70%" height="0.875rem" />
    <Skeleton width="50%" height="0.75rem" />
  </div>
</div>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SkeletonSection;
