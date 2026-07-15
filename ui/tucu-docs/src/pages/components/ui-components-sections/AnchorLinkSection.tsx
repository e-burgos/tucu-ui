import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  AnchorLink,
  GITHUB_URL,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const AnchorLinkSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="AnchorLink"
        description="A smart link component that automatically handles both internal routes
          and external URLs."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ExternalLink className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Internal Link
                </Typography>
                <AnchorLink to="/components">Go to Components</AnchorLink>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  External Link
                </Typography>
                <AnchorLink to={GITHUB_URL} target="_blank">
                  External Link
                </AnchorLink>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="AnchorLink"
        defaultValues={{}}
        excludeProps={['state', 'to']}
      >
        {(props) => (
          <AnchorLink {...props} to="#">
            Anchor Link Example
          </AnchorLink>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="AnchorLink" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { AnchorLink } from '@e-burgos/tucu-ui';

// Internal link (uses React Router Link)
<AnchorLink to="/components">
  Go to Components
</AnchorLink>

// External link (uses native <a> tag)
<AnchorLink to="https://example.com" target="_blank">
  External Link
</AnchorLink>

// With all Link props
<AnchorLink
  to="/about"
  className="text-blue-500 hover:underline"
>
  About Us
</AnchorLink>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default AnchorLinkSection;
