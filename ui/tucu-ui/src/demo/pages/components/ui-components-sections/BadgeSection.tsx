import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Badge,
} from '../../../../index';

const BadgeSection: React.FC = () => {
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
      type: 'ReactNode',
      default: '-',
      description: 'Content to display inside the badge',
    },
    {
      prop: 'status',
      type: "'active' | 'inactive' | 'pending' | 'default'",
      default: '-',
      description: 'Status indicator (overrides color prop)',
    },
    {
      prop: 'color',
      type: "'primary' | 'success' | 'info' | 'warning' | 'danger' | 'gray' | 'white'",
      default: "'gray'",
      description: 'Color of the badge',
    },
    {
      prop: 'size',
      type: "'tiny' | 'small' | 'medium' | 'large'",
      default: "'small'",
      description: 'Size of the badge',
    },
    {
      prop: 'variant',
      type: "'solid' | 'ghost' | 'outline' | 'soft'",
      default: "'solid'",
      description: 'Visual variant of the badge',
    },
    {
      prop: 'shape',
      type: "'rounded' | 'pill' | 'circle'",
      default: "'pill'",
      description: 'Shape of the badge',
    },
    {
      prop: 'withDot',
      type: 'boolean',
      default: 'false',
      description: 'Show a dot indicator (without children shows only dot)',
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
          Badge
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A badge component for displaying status indicators and labels with
          various styles and sizes.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Status Badges
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge status="active">Active</Badge>
                  <Badge status="inactive">Inactive</Badge>
                  <Badge status="pending">Pending</Badge>
                  <Badge status="default">Default</Badge>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Status Indicators (Dots Only)
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge status="active" withDot />
                    <span className="text-sm">Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status="inactive" withDot />
                    <span className="text-sm">Offline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status="pending" withDot />
                    <span className="text-sm">Away</span>
                  </div>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  With Dot Indicator
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge status="active" withDot>
                    Active
                  </Badge>
                  <Badge status="inactive" withDot>
                    Inactive
                  </Badge>
                  <Badge status="pending" withDot>
                    Pending
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge color="primary">Primary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="info">Info</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="danger">Danger</Badge>
              <Badge color="gray">Gray</Badge>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="tiny" color="primary">
                Tiny
              </Badge>
              <Badge size="small" color="primary">
                Small
              </Badge>
              <Badge size="medium" color="primary">
                Medium
              </Badge>
              <Badge size="large" color="primary">
                Large
              </Badge>
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
                  Solid
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="solid" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="solid" color="success">
                    Success
                  </Badge>
                  <Badge variant="solid" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Soft
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="soft" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="soft" color="success">
                    Success
                  </Badge>
                  <Badge variant="soft" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Outline
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="outline" color="success">
                    Success
                  </Badge>
                  <Badge variant="outline" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Ghost
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="ghost" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="ghost" color="success">
                    Success
                  </Badge>
                  <Badge variant="ghost" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shapes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge shape="rounded" color="primary">
                Rounded
              </Badge>
              <Badge shape="pill" color="success">
                Pill
              </Badge>
              <Badge shape="circle" color="danger" size="large" withDot />
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
              code={`import { Badge } from '@e-burgos/tucu-ui';

// Basic usage with status
<Badge status="active">Active</Badge>
<Badge status="inactive">Inactive</Badge>
<Badge status="pending">Pending</Badge>

// Status indicators (dots only)
<Badge status="active" withDot />
<Badge status="inactive" withDot />

// With dot indicator and text
<Badge status="active" withDot>Active</Badge>

// Different colors
<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="info">Info</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="danger">Danger</Badge>

// Different sizes
<Badge size="tiny">Tiny</Badge>
<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
<Badge size="large">Large</Badge>

// Different variants
<Badge variant="solid" color="primary">Solid</Badge>
<Badge variant="soft" color="success">Soft</Badge>
<Badge variant="outline" color="danger">Outline</Badge>
<Badge variant="ghost" color="info">Ghost</Badge>

// Different shapes
<Badge shape="rounded">Rounded</Badge>
<Badge shape="pill">Pill</Badge>
<Badge shape="circle" withDot />

// Combinations
<Badge 
  color="success" 
  variant="soft" 
  size="medium"
  shape="pill"
  withDot
>
  Online
</Badge>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default BadgeSection;
