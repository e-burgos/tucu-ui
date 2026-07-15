import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Spinner,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const SpinnerSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Spinner"
        description="A simple spinning loader component for indicating loading states with
          customizable sizes and colors."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-600 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Spinner
                </Typography>
                <Spinner />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Small Spinner
                </Typography>
                <Spinner size="sm" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Large Spinner
                </Typography>
                <Spinner size="lg" />
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
                <div className="flex items-center gap-4">
                  <Spinner color="primary" />
                  <Spinner color="success" />
                  <Spinner color="danger" />
                  <Spinner color="info" />
                  <Spinner color="warning" />
                  <Spinner color="gray" />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Spinner"
        defaultValues={{ size: 'md', color: 'primary' }}
        excludeProps={[]}
      >
        {(props) => <Spinner {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="Spinner" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Spinner } from '@e-burgos/tucu-ui';

// Basic usage
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Different colors
<Spinner color="primary" />
<Spinner color="success" />
<Spinner color="danger" />
<Spinner color="info" />
<Spinner color="warning" />
<Spinner color="gray" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SpinnerSection;
