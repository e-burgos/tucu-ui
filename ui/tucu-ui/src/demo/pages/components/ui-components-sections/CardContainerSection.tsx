import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const CardContainerSection: React.FC = () => {

  return (
    <>
      <HeroCard
        title="CardContainer"
        description="A container component that provides consistent styling and layout for
          card-based content."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Card
                </Typography>
                <CardContainer>
                  <Typography tag="p">Card content goes here</Typography>
                </CardContainer>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Content
                </Typography>
                <CardContainer>
                  <Typography tag="h3" className="font-bold mb-2">
                    Card Title
                  </Typography>
                  <Typography tag="p">
                    This is a card with custom content including a title and
                    description.
                  </Typography>
                </CardContainer>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <AutoPropsTable componentName="CardContainer" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CardContainer, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<CardContainer>
  <Typography tag="p">Card content goes here</Typography>
</CardContainer>

// With custom content
<CardContainer>
  <Typography tag="h3" className="font-bold mb-2">
    Card Title
  </Typography>
  <Typography tag="p">
    Card description and content
  </Typography>
</CardContainer>

// With custom className
<CardContainer className="bg-blue-50">
  <Typography tag="p">Custom styled card</Typography>
</CardContainer>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CardContainerSection;
