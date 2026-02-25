import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  RevealContent,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const RevealContentSection: React.FC = () => {
  const longContent = (
    <div className="space-y-2">
      <Typography tag="p">
        This is a long piece of content that will be collapsed by default.
      </Typography>
      <Typography tag="p">
        When the content exceeds the default height, a "Show More" button will
        appear.
      </Typography>
      <Typography tag="p">
        Clicking the button will expand the content to show everything.
      </Typography>
      <Typography tag="p">
        You can then click "Show Less" to collapse it back to the default
        height.
      </Typography>
      <Typography tag="p">
        This is useful for displaying long descriptions, articles, or any
        content that might be too long for the initial view.
      </Typography>
    </div>
  );

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          RevealContent
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A component that automatically collapses long content and provides a
          "Show More" / "Show Less" button.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Height 100px
                </Typography>
                <RevealContent defaultHeight={100}>{longContent}</RevealContent>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Height 150px
                </Typography>
                <RevealContent defaultHeight={150}>{longContent}</RevealContent>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="RevealContent"
        defaultValues={{ defaultHeight: 100 }}
        excludeProps={[]}
      >
        {(props) => (
          <RevealContent {...props}>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is the first paragraph of content that is initially
                visible.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This second paragraph may be hidden depending on the
                defaultHeight value.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This third paragraph is likely hidden and revealed when
                expanded.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                And here is even more content to demonstrate the reveal
                functionality.
              </p>
            </div>
          </RevealContent>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="RevealContent" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { RevealContent, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<RevealContent defaultHeight={100}>
  <div>
    <Typography tag="p">Long content here...</Typography>
    <Typography tag="p">More content...</Typography>
  </div>
</RevealContent>

// With custom height
<RevealContent defaultHeight={150}>
  <div>
    {/* Your long content */}
  </div>
</RevealContent>

// The component automatically:
// - Shows "Show More" if content exceeds defaultHeight
// - Shows "Show Less" when expanded
// - Hides button if content is shorter than defaultHeight`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default RevealContentSection;
