import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const TypographySection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Typography"
        description="A comprehensive typography component system with semantic HTML tags
          and predefined text styles."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Type className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Headings
                </Typography>
                <div className="space-y-2">
                  <Typography tag="h1">Heading 1</Typography>
                  <Typography tag="h2">Heading 2</Typography>
                  <Typography tag="h3">Heading 3</Typography>
                  <Typography tag="h4">Heading 4</Typography>
                  <Typography tag="h5">Heading 5</Typography>
                  <Typography tag="h6">Heading 6</Typography>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Text Variants
                </Typography>
                <div className="space-y-2">
                  <Typography tag="headline">Headline Text</Typography>
                  <Typography tag="body">Body Text</Typography>
                  <Typography tag="label-1">Label 1</Typography>
                  <Typography tag="label-2">Label 2</Typography>
                  <Typography tag="caption">Caption Text</Typography>
                  <Typography tag="legal">Legal Text</Typography>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Semantic Elements
                </Typography>
                <div className="space-y-2">
                  <Typography tag="p">Paragraph text</Typography>
                  <Typography tag="strong">Strong text</Typography>
                  <Typography tag="em">Emphasized text</Typography>
                  <Typography tag="code">Code text</Typography>
                  <Typography tag="pre">Preformatted text</Typography>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Tooltip
                </Typography>
                <div className="flex flex-wrap gap-4 items-center">
                  <Typography
                    tag="span"
                    tooltip="This is an abbreviation"
                    tooltipPlacement="top"
                    className="underline decoration-dotted cursor-help"
                  >
                    Hover this text
                  </Typography>
                  <Typography
                    tag="strong"
                    tooltip="Important information"
                    tooltipPlacement="right"
                    tooltipColor="light"
                  >
                    Bold with tooltip
                  </Typography>
                  <Typography
                    tag="code"
                    tooltip="Copied!"
                    tooltipPlacement="bottom"
                  >
                    Code with tooltip
                  </Typography>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Typography"
        defaultValues={{ tag: 'p', color: 'default' }}
        excludeProps={[
          'tooltip',
          'tooltipArrow',
          'tooltipColor',
          'tooltipPlacement',
          'title',
        ]}
      >
        {(props) => (
          <Typography {...props}>
            The quick brown fox jumps over the lazy dog.
          </Typography>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Typography" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Typography } from '@e-burgos/tucu-ui';

// Headings
<Typography tag="h1">Heading 1</Typography>
<Typography tag="h2">Heading 2</Typography>
<Typography tag="h3">Heading 3</Typography>

// Text variants
<Typography tag="headline">Headline Text</Typography>
<Typography tag="body">Body Text</Typography>
<Typography tag="label-1">Label 1</Typography>
<Typography tag="label-2">Label 2</Typography>
<Typography tag="caption">Caption Text</Typography>

// Semantic elements
<Typography tag="p">Paragraph text</Typography>
<Typography tag="strong">Strong text</Typography>
<Typography tag="em">Emphasized text</Typography>
<Typography tag="code">Code text</Typography>

// With custom className
<Typography tag="h1" className="text-blue-500">
  Custom Styled Heading
</Typography>

// With tooltip
<Typography tag="span" tooltip="Extra info" tooltipPlacement="top">
  Hover me
</Typography>
<Typography tag="strong" tooltip="Details" tooltipPlacement="right" tooltipColor="light">
  Bold with tooltip
</Typography>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TypographySection;
