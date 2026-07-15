import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Collapse,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const CollapseSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Collapse"
        description="A collapsible content panel component with smooth animations for
          showing and hiding content."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ChevronsUpDown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Collapse
                </Typography>
                <Collapse label="Click to expand">
                  <div className="p-4">
                    <Typography tag="p">
                      This is the content that appears when the collapse is
                      expanded.
                    </Typography>
                  </div>
                </Collapse>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Initially Open
                </Typography>
                <Collapse label="Pre-expanded" initialOpen>
                  <div className="p-4">
                    <Typography tag="p">
                      This collapse starts in the open state.
                    </Typography>
                  </div>
                </Collapse>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Rich Content
                </Typography>
                <Collapse label="Rich Content Example">
                  <div className="p-4 space-y-2">
                    <Typography tag="p" className="font-semibold">
                      Section Title
                    </Typography>
                    <Typography tag="p">
                      This collapse can contain any React content including
                      images, lists, and other components.
                    </Typography>
                    <ul className="list-disc list-inside">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                </Collapse>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Collapse"
        defaultValues={{ label: 'Click to expand', initialOpen: false }}
      >
        {(props) => (
          <Collapse {...props}>
            <p className="text-sm text-gray-600 dark:text-gray-400 p-4">
              This is the collapsed content that can be expanded.
            </p>
          </Collapse>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Collapse" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Collapse, Typography } from '@e-burgos/tucu-ui';

// Basic usage
<Collapse label="Click to expand">
  <div className="p-4">
    <Typography tag="p">Content here</Typography>
  </div>
</Collapse>

// Initially open
<Collapse label="Pre-expanded" initialOpen>
  <div className="p-4">
    <Typography tag="p">Content starts visible</Typography>
  </div>
</Collapse>

// With rich content
<Collapse label="Rich Content">
  <div className="p-4 space-y-2">
    <Typography tag="p" className="font-semibold">Title</Typography>
    <Typography tag="p">Description</Typography>
    <ul className="list-disc list-inside">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</Collapse>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CollapseSection;
