import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { PanelCard } from '../../../components/cards';

const meta: Meta<typeof PanelCard> = {
  title: 'UI COMPONENTS/Cards/Panel Card',
  tags: ['autodocs'],
  component: PanelCard,
  parameters: {
    docs: {
      description: {
        component:
          'PanelCard is a card component that displays a title and a content. It is a wrapper for the SimpleBar component.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
  },
  args: {
    title: 'Panel Card',
    className: 'w-full max-w-md',
    children: <div>Hello</div>,
  },
};

export default meta;

export const Default: StoryFn<typeof PanelCard> = (args) => (
  <StoryContainer>
    <PanelCard {...args}>
      <div className="p-3">
        <ul className="space-y-2">
          {[...Array(15)].map((_, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
            >
              Item {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </PanelCard>
  </StoryContainer>
);
