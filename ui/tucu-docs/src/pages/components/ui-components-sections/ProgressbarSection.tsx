import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Progressbar,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const ProgressbarSection: React.FC = () => {
  const [progress, setProgress] = useState(45);

  return (
    <>
      <HeroCard
        title="Progressbar"
        description="A progress bar component for displaying completion status with
          customizable colors, sizes, and variants."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Progressbar
                </Typography>
                <Progressbar value={progress} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Label
                </Typography>
                <Progressbar
                  value={progress}
                  label={`${progress}%`}
                  size="xl"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Interactive Example
                </Typography>
                <div className="space-y-2">
                  <Progressbar
                    value={progress}
                    label={`${progress}%`}
                    size="xl"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      className="px-3 py-1 bg-light-dark rounded border border-border hover:opacity-80 transition-opacity"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      className="px-3 py-1 bg-light-dark rounded border border-border hover:opacity-80 transition-opacity"
                    >
                      +10
                    </button>
                  </div>
                </div>
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
                <div className="space-y-2">
                  <Progressbar value={60} color="primary" />
                  <Progressbar value={60} color="success" />
                  <Progressbar value={60} color="danger" />
                  <Progressbar value={60} color="info" />
                  <Progressbar value={60} color="warning" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Variants
                </Typography>
                <div className="space-y-2">
                  <Progressbar value={60} variant="solid" />
                  <Progressbar value={60} variant="flat" />
                </div>
              </div>
              <div>
                <Typography tag="h5" className="mb-3">
                  Sizes
                </Typography>
                <div className="space-y-2">
                  <Progressbar value={60} size="sm" />
                  <Progressbar value={60} size="DEFAULT" />
                  <Progressbar value={60} size="lg" />
                  <Progressbar value={60} size="xl" />
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Progressbar"
        defaultValues={{
          value: 65,
          variant: 'solid',
          size: 'DEFAULT',
          color: 'primary',
          rounded: 'DEFAULT',
        }}
        excludeProps={['label', 'barClassName', 'labelClassName']}
      >
        {(props) => (
          <div className="w-full">
            <Progressbar {...props} />
          </div>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Progressbar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Progressbar } from '@e-burgos/tucu-ui';

// Basic usage
<Progressbar value={45} />

// With label
<Progressbar value={45} label="45%" size="xl" />

// Different colors
<Progressbar value={60} color="primary" />
<Progressbar value={60} color="success" />
<Progressbar value={60} color="danger" />

// Different variants
<Progressbar value={60} variant="solid" />
<Progressbar value={60} variant="flat" />

// Different sizes
<Progressbar value={60} size="sm" />
<Progressbar value={60} size="lg" />
<Progressbar value={60} size="xl" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ProgressbarSection;
