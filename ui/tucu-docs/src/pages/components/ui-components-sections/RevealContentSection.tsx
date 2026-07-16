import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  RevealContent,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

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
      <HeroCard
        title="RevealContent"
        description={'A component that automatically collapses long content and provides a "Show More" / "Show Less" button.'}
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
