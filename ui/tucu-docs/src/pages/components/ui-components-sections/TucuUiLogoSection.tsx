import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  TucuUiLogo,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const TucuUiLogoSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="TucuUiLogo"
        description="The core logo icon component featuring the distinctive double T design with 'ui' text, representing the Tucu UI design system."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Hexagon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Size
                </Typography>
                <TucuUiLogo />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="flex items-center gap-4 flex-wrap">
                  <TucuUiLogo size={60} />
                  <TucuUiLogo size={120} />
                  <TucuUiLogo size={180} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Classes
                </Typography>
                <TucuUiLogo
                  size={100}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="TucuUiLogo"
        defaultValues={{ size: 60 }}
        excludeProps={['props']}
      >
        {(props) => <TucuUiLogo {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="TucuUiLogo" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { TucuUiLogo } from '@e-burgos/tucu-ui';

// Basic usage (default 120x120)
<TucuUiLogo />

// Custom sizes
<TucuUiLogo size={60} />
<TucuUiLogo size={120} />
<TucuUiLogo size={180} />

// With custom classes
<TucuUiLogo 
  size={100} 
  className="opacity-80 hover:opacity-100 transition-opacity" 
/>

// With SVG attributes
<TucuUiLogo 
  size={80} 
  className="custom-class"
  props={{ viewBox: '0 0 240 240' }}
/>

// The component automatically:
// - Adapts to light/dark mode
// - Shows the double T design with "ui" text`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TucuUiLogoSection;
