import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  TucuUiLogo,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const TucuUiLogoSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TucuUiLogo
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          The core logo icon component featuring the distinctive double T design
          with "ui" text, representing the Tucu UI design system.
        </Typography>
      </div>

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
