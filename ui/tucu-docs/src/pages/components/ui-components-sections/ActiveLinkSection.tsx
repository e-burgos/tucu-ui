import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ActiveLink,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const ActiveLinkSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="ActiveLink"
        description="A link component that automatically applies an active class when the
          current path matches the link path."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Link className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Active Link
                </Typography>
                <div className="flex gap-4">
                  <ActiveLink to="/components" path="/components">
                    Components
                  </ActiveLink>
                  <ActiveLink to="/about" path="/about">
                    About
                  </ActiveLink>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Active Class
                </Typography>
                <ActiveLink
                  to="/home"
                  path="/home"
                  activeClassName="text-brand font-bold"
                >
                  Home
                </ActiveLink>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="ActiveLink"
        defaultValues={{ path: '/demo', activeClassName: 'active' }}
        excludeProps={['state', 'to']}
      >
        {(props) => (
          <ActiveLink {...props} to="#">
            Active Link Example
          </ActiveLink>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="ActiveLink" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ActiveLink } from '@e-burgos/tucu-ui';

// Basic usage
<ActiveLink to="/components" path="/components">
  Components
</ActiveLink>

// With custom active class
<ActiveLink
  to="/home"
  path="/home"
  activeClassName="text-brand font-bold"
>
  Home
</ActiveLink>

// Navigation example
<nav>
  <ActiveLink to="/" path="/">Home</ActiveLink>
  <ActiveLink to="/about" path="/about">About</ActiveLink>
  <ActiveLink to="/contact" path="/contact">Contact</ActiveLink>
</nav>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ActiveLinkSection;
