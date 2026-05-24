import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ListContainer,
  LucideIcons,
  HeroCard,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

import { PropPlayground } from '../../../components/prop-playground';
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

  return (
    <>
      <HeroCard
        title="ListContainer"
        description="A dropdown container component for displaying lists of items with
          customizable trigger and positioning."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.List className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="ListContainer"
        title="ListContainer Playground"
        defaultValues={{
          label: 'Select an option',
          position: 'bottom',
          align: 'start',
          trigger: 'click',
          isOpen: true,
          keepOpen: false,
        }}
        excludeProps={[
          'items',
          'onOpenChange',
          'triggerIcon',
          'className',
          'dropdownClassName',
        ]}
      >
        {(props) => (
          <ListContainer
            {...props}
            items={[
              {
                label: 'Option 1',
                onClick: () => {
                  /* noop */
                },
              },
              {
                label: 'Option 2',
                onClick: () => {
                  /* noop */
                },
              },
              {
                label: 'Option 3',
                onClick: () => {
                  /* noop */
                },
              },
            ]}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="ListContainer" />

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
