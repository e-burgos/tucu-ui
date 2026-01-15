import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Sidebar,
  Button,
} from '../../../../index';

const SidebarSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display in the sidebar',
    },
    {
      prop: 'title',
      type: 'string',
      default: '-',
      description: 'Title for the sidebar',
    },
    {
      prop: 'logo',
      type: 'LogoPropTypes',
      default: '-',
      description: 'Logo configuration',
    },
    {
      prop: 'actionContent',
      type: 'React.ReactNode',
      default: '-',
      description: 'Action buttons at the bottom',
    },
    {
      prop: 'onClose',
      type: '() => void',
      default: '-',
      description: 'Callback when sidebar closes',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes',
    },
  ];

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

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
