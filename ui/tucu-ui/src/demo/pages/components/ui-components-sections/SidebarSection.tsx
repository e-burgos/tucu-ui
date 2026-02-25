import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Sidebar,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const SidebarSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Sidebar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A sidebar component with scrollable content, optional logo, title, and
          action buttons.
        </Typography>
      </div>

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
