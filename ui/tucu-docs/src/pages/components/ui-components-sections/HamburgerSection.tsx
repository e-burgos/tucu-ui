import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Hamburger,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const HamburgerSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeroCard
        title="Hamburger"
        description="An animated hamburger menu button component, perfect for mobile
          navigation menus."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Menu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Closed State
                </Typography>
                <Hamburger isOpen={false} onClick={() => setIsOpen(false)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Open State
                </Typography>
                <Hamburger isOpen={true} onClick={() => setIsOpen(true)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Interactive Example
                </Typography>
                <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Different Variants
                </Typography>
                <div className="flex gap-2">
                  <Hamburger variant="solid" color="primary" />
                  <Hamburger variant="ghost" color="primary" />
                  <Hamburger variant="transparent" />
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Hamburger"
        defaultValues={{
          isOpen: false,
          color: 'primary',
          size: 'medium',
          variant: 'solid',
        }}
        excludeProps={[
          'onClick',
          'aria-label',
          'aria-describedby',
          'tooltip',
          'tooltipArrow',
          'tooltipColor',
          'tooltipPlacement',
          'isLoading',
          'loaderSize',
          'loaderVariant',
          'fullWidth',
          'disabled',
        ]}
      >
        {(props) => <Hamburger {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="Hamburger" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Hamburger } from '@e-burgos/tucu-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Hamburger
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
}

// With different variants
<Hamburger variant="solid" color="primary" />
<Hamburger variant="ghost" color="primary" />
<Hamburger variant="transparent" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default HamburgerSection;
