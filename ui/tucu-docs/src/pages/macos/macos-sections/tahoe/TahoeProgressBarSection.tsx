import React, { useState, useEffect } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { MacOSTahoeProgressBar } from '@tucu-ui-internal/components/macos/tahoe/controls/progress-bar-tahoe';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

export const TahoeProgressBarSection: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeroCard
        title="Progress Bar"
        description="Determinate and indeterminate progress indicators with glass material track, accent fill, and optional label/value display."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.Activity className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="flex flex-col gap-5 max-w-md">
            <MacOSTahoeProgressBar
              value={35}
              size="sm"
              label="Small"
              showValue
            />
            <MacOSTahoeProgressBar
              value={60}
              size="md"
              label="Medium (default)"
              showValue
            />
            <MacOSTahoeProgressBar
              value={85}
              size="lg"
              label="Large"
              showValue
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Animated (Determinate)" className="mt-2 mb-2">
          <div className="max-w-md">
            <MacOSTahoeProgressBar
              value={progress}
              size="md"
              label="Downloading update..."
              showValue
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Indeterminate" className="mt-2 mb-2">
          <div className="flex flex-col gap-5 max-w-md">
            <MacOSTahoeProgressBar indeterminate size="sm" />
            <MacOSTahoeProgressBar indeterminate size="md" label="Loading..." />
            <MacOSTahoeProgressBar
              indeterminate
              size="lg"
              label="Processing files..."
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Static Values" className="mt-2 mb-2">
          <div className="flex flex-col gap-4 max-w-md">
            <MacOSTahoeProgressBar value={0} label="0%" showValue />
            <MacOSTahoeProgressBar value={25} label="25%" showValue />
            <MacOSTahoeProgressBar value={50} label="50%" showValue />
            <MacOSTahoeProgressBar value={75} label="75%" showValue />
            <MacOSTahoeProgressBar value={100} label="Complete" showValue />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeProgressBar } from '@e-burgos/tucu-ui';

// Determinate
<MacOSTahoeProgressBar
  value={65}
  size="md"
  label="Uploading..."
  showValue
/>

// Indeterminate
<MacOSTahoeProgressBar
  indeterminate
  size="md"
  label="Loading..."
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeProgressBar"
        defaultValues={{
          value: 65,
          size: 'md',
          label: 'Loading...',
          showValue: true,
          indeterminate: false,
        }}
        includeProps={['value', 'size', 'label', 'showValue', 'indeterminate']}
        excludeProps={['className']}
      >
        {(props) => (
          <div className="max-w-md w-full">
            <MacOSTahoeProgressBar {...props} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeProgressBar" />
    </>
  );
};

export default TahoeProgressBarSection;
