import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Loader,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const LoaderSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Loader"
        description="A versatile loader component with multiple animation variants and
          sizes for indicating loading states."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Loader"
        defaultValues={{
          variant: 'moveUp',
          size: 'medium',
          color: 'primary',
          showOnlyThreeDots: false,
          tag: 'div',
        }}
        excludeProps={[]}
      >
        {(props) => <Loader {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="Loader" />

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
