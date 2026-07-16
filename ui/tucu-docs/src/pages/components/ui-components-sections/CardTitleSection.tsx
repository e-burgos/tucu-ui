import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const CardTitleSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="CardTitle"
        description="A card component with an integrated title that appears above the card
          border."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-purple-600 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Heading className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Title
                </Typography>
                <CardTitle title="Card Title">
                  <Typography tag="p">Card content goes here</Typography>
                </CardTitle>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <CardTitle title="No Border" border={false}>
                  <Typography tag="p">Card without border</Typography>
                </CardTitle>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Rich Content
                </Typography>
                <CardTitle title="Rich Content">
                  <div className="space-y-2">
                    <Typography tag="p">First paragraph</Typography>
                    <Typography tag="p">Second paragraph</Typography>
                  </div>
                </CardTitle>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="CardTitle"
        defaultValues={{ title: 'Card Title', border: true }}
        excludeProps={[]}
      >
        {(props) => (
          <CardTitle {...props}>
            <div className="p-4">Card Content</div>
          </CardTitle>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="CardTitle" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CardTitle, Typography } from '@e-burgos/tucu-ui';

// With title
<CardTitle title="Card Title">
  <Typography tag="p">Card content goes here</Typography>
</CardTitle>

// Without border
<CardTitle title="No Border" border={false}>
  <Typography tag="p">Card without border</Typography>
</CardTitle>

// With rich content
<CardTitle title="Rich Content">
  <div className="space-y-2">
    <Typography tag="p">First paragraph</Typography>
    <Typography tag="p">Second paragraph</Typography>
  </div>
</CardTitle>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CardTitleSection;
