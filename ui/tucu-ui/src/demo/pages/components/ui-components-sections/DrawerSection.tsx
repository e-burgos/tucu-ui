import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Drawer,
  Button,
} from '../../../../index';

const DrawerSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'sidebar' | 'sidebar-menu'>(
    'sidebar'
  );

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
      prop: 'isOpen',
      type: 'boolean',
      default: 'required',
      description: 'Whether the drawer is open',
    },
    {
      prop: 'setIsOpen',
      type: '(isOpen: boolean) => void',
      default: 'required',
      description: 'Function to control drawer state',
    },
    {
      prop: 'type',
      type: "'sidebar' | 'sidebar-menu'",
      default: 'required',
      description: 'Type of drawer to display',
    },
    {
      prop: 'position',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Position of the drawer',
    },
    {
      prop: 'backdrop',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show backdrop',
    },
    {
      prop: 'title',
      type: 'string',
      default: '-',
      description: 'Title for the drawer',
    },
    {
      prop: 'menuItems',
      type: 'IMenuItem[]',
      default: '-',
      description: 'Menu items (required for sidebar-menu type)',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Drawer
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A drawer component that slides in from the side, supporting both
          simple sidebar and sidebar-menu variants.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Sidebar Drawer
                </Typography>
                <Button
                  onClick={() => {
                    setDrawerType('sidebar');
                    setIsOpen(true);
                  }}
                >
                  Open Sidebar
                </Button>
                <Drawer
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  type="sidebar"
                  title="Sidebar Title"
                >
                  <Typography tag="p">Sidebar content goes here</Typography>
                </Drawer>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Right Position
                </Typography>
                <Button
                  onClick={() => {
                    setDrawerType('sidebar');
                    setIsOpen(true);
                  }}
                >
                  Open Right Drawer
                </Button>
                <Drawer
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  type="sidebar"
                  position="right"
                  title="Right Drawer"
                >
                  <Typography tag="p">Content on the right</Typography>
                </Drawer>
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
              code={`import { Drawer, Button } from '@e-burgos/tucu-ui';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="sidebar"
        title="Drawer Title"
      >
        <div>Drawer content</div>
      </Drawer>
    </>
  );
}

// Right position
<Drawer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  type="sidebar"
  position="right"
  title="Right Drawer"
>
  <div>Content</div>
</Drawer>

// Without backdrop
<Drawer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  type="sidebar"
  backdrop={false}
>
  <div>Content</div>
</Drawer>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default DrawerSection;
