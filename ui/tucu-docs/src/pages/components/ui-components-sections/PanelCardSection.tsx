import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  PanelCard,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const PanelCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="PanelCard"
        description="A simple panel card component with a title header and scrollable
          content area."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelTop className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Panel Card
                </Typography>
                <PanelCard title="Panel Title">
                  <div className="space-y-2">
                    <Typography tag="p">Content line 1</Typography>
                    <Typography tag="p">Content line 2</Typography>
                    <Typography tag="p">Content line 3</Typography>
                    <Typography tag="p">Content line 4</Typography>
                    <Typography tag="p">Content line 5</Typography>
                  </div>
                </PanelCard>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="PanelCard"
        defaultValues={{ title: 'Panel Card' }}
      >
        {(props) => (
          <PanelCard {...props}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Panel content goes here
            </p>
          </PanelCard>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="PanelCard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { PanelCard, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<PanelCard title="Panel Title">
  <div className="space-y-2">
    <Typography tag="p">Content line 1</Typography>
    <Typography tag="p">Content line 2</Typography>
    <Typography tag="p">Content line 3</Typography>
  </div>
</PanelCard>

// With custom className
<PanelCard title="Custom Panel" className="max-w-md">
  <Typography tag="p">Custom styled panel</Typography>
</PanelCard>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PanelCardSection;
