import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  ListContainer,
  ListItem,
  LucideIcons,
} from '../../../../index';

const ListContainerSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const listItems = [
    {
      id: '1',
      label: 'Edit',
      icon: <LucideIcons.Edit className="w-4 h-4" />,
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: '2',
      label: 'Delete',
      icon: <LucideIcons.Trash className="w-4 h-4" />,
      onClick: () => console.log('Delete clicked'),
    },
    {
      id: '3',
      label: 'Share',
      icon: <LucideIcons.Share className="w-4 h-4" />,
      onClick: () => console.log('Share clicked'),
    },
  ];

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
      prop: 'items',
      type: 'ListItemProps[]',
      default: 'required',
      description: 'Array of list items to display',
    },
    {
      prop: 'label',
      type: 'string',
      default: '-',
      description: 'Label for the trigger button',
    },
    {
      prop: 'triggerIcon',
      type: 'React.ReactNode',
      default: '-',
      description: 'Custom icon for the trigger',
    },
    {
      prop: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'bottom'",
      description: 'Position of the dropdown',
    },
    {
      prop: 'align',
      type: "'start' | 'end' | 'center'",
      default: "'end'",
      description: 'Alignment of the dropdown',
    },
    {
      prop: 'trigger',
      type: "'hover' | 'click'",
      default: "'hover'",
      description: 'Trigger type for opening the dropdown',
    },
    {
      prop: 'keepOpen',
      type: 'boolean',
      default: 'false',
      description: 'Whether to keep dropdown open after item click',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ListContainer
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A dropdown container component for displaying lists of items with
          customizable trigger and positioning.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Hover Trigger
                </Typography>
                <ListContainer items={listItems} trigger="hover" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Click Trigger
                </Typography>
                <ListContainer
                  items={listItems}
                  trigger="click"
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Icon
                </Typography>
                <ListContainer
                  items={listItems}
                  triggerIcon={<LucideIcons.Activity className="w-4! h-4!" />}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Positions
                </Typography>
                <div className="flex gap-4">
                  <ListContainer items={listItems} position="top" />
                  <ListContainer items={listItems} position="right" />
                  <ListContainer items={listItems} position="left" />
                </div>
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
              code={`import { ListContainer, ListItem, LucideIcons } from '@e-burgos/tucu-ui';

const items = [
  {
    id: '1',
    label: 'Edit',
    icon: <LucideIcons.Edit className="w-4 h-4" />,
    onClick: () => handleEdit(),
  },
  {
    id: '2',
    label: 'Delete',
    icon: <LucideIcons.Trash className="w-4 h-4" />,
    onClick: () => handleDelete(),
  },
];

// Hover trigger
<ListContainer items={items} trigger="hover" />

// Click trigger
<ListContainer
  items={items}
  trigger="click"
  isOpen={isOpen}
  onOpenChange={setIsOpen}
/>

// With custom icon
<ListContainer
  items={items}
  triggerIcon={<LucideIcons.MoreVertical className="w-5 h-5" />}
/>

// Different positions
<ListContainer items={items} position="top" />
<ListContainer items={items} position="right" />
<ListContainer items={items} position="bottom" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ListContainerSection;
