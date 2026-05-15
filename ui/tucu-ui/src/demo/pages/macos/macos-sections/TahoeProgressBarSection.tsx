import React, { useState, useEffect } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { MacOSTahoeProgressBar } from '../../../../components/macos/tahoe/progress-bar-tahoe';

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
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Progress Bar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Determinate and indeterminate progress indicators with glass material
          track, accent fill, and optional label/value display.
        </Typography>
      </div>

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
        <CardTitle title="Usage" className="mt-2 mb-2">
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
    </>
  );
};

export default TahoeProgressBarSection;
