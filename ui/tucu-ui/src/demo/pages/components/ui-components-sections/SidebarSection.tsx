import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Sidebar,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

import { PropPlayground } from '../../../components/prop-playground';
const SidebarSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Sidebar"
        description="A sidebar component with scrollable content, optional logo, title, and
          action buttons."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelLeftOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Sidebar
                </Typography>
                <Typography tag="p" className="mb-4 text-sm text-gray-600">
                  Note: Sidebar is typically used within a Drawer component.
                  This example shows the structure.
                </Typography>
                <Typography tag="p" className="text-sm">
                  The Sidebar component provides a scrollable container with
                  optional header (logo or title) and action buttons at the
                  bottom.
                </Typography>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Sidebar"
        title="Sidebar Playground"
        defaultValues={{
          title: 'Sidebar',
          position: 'left',
        }}
        excludeProps={['onClose', 'actionContent', 'logo', 'className']}
      >
        {(props) => (
          <Sidebar {...props} onClose={() => null}>
            <Typography tag="p">Sidebar content goes here</Typography>
          </Sidebar>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="Sidebar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Sidebar } from '@e-burgos/tucu-ui';

// Basic usage (typically within Drawer)
<Sidebar title="Sidebar Title" onClose={() => setIsOpen(false)}>
  <div>
    <Typography tag="p">Sidebar content</Typography>
  </div>
</Sidebar>

// With logo
<Sidebar
  logo={{ name: 'MyApp' }}
  onClose={() => setIsOpen(false)}
>
  <div>Content</div>
</Sidebar>

// With action buttons
<Sidebar
  title="Sidebar"
  actionContent={<Button>Action</Button>}
  onClose={() => setIsOpen(false)}
>
  <div>Content</div>
</Sidebar>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SidebarSection;
