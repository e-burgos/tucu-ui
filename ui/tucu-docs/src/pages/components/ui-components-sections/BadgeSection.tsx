import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Badge,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const BadgeSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Badge"
        description="A badge component for displaying status indicators and labels with
          various styles and sizes."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Badge"
        defaultValues={{
          variant: 'solid',
          size: 'small',
          shape: 'pill',
          color: 'primary',
          withDot: false,
        }}
        excludeProps={['status']}
      >
        {(props) => <Badge {...props}>Badge</Badge>}
      </PropPlayground>
      <AutoPropsTable componentName="Badge" />

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
