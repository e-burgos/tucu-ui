import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { PanelActionCard } from '../../../components/cards';

const meta: Meta<typeof PanelActionCard> = {
  title: 'UI COMPONENTS/Cards/Panel Action Card',
  tags: ['autodocs'],
  component: PanelActionCard,
  parameters: {
    docs: {
      description: {
        component:
          'PanelActionCard is a card component that displays a title and a list of actions. It is a wrapper for the SimpleBar component.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    actions: {
      control: 'object',
    },
  },
  args: {
    title: 'Card with Scrollable Content',
    className: 'w-full max-w-md',
    actions: [
      {
        label: 'Add',
        onClick: () => {
          alert('Add');
        },
      },
      {
        label: 'Edit',
        variant: 'ghost',
        color: 'primary',
        onClick: () => {
          alert('Edit');
        },
      },
      {
        label: 'Delete',
        variant: 'ghost',
        color: 'danger',
        onClick: () => {
          alert('Delete');
        },
      },
    ],
  },
};

export default meta;

export const Default: StoryFn<typeof PanelActionCard> = (args) => (
  <StoryContainer>
    <PanelActionCard {...args}>
      <div className="p-4 bg-white dark:bg-gray-800">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0"
          >
            <h4 className="font-medium mb-1">Item {i + 1}</h4>
            <p className="text-gray-600 dark:text-gray-400">
              This is a scrollable item within a card. SimpleBar provides a
              consistent scrollbar experience across different browsers and
              platforms.
            </p>
          </div>
        ))}
      </div>
    </PanelActionCard>
  </StoryContainer>
);
