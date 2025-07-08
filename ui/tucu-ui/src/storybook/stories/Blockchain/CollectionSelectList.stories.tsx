import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CollectionSelectList } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import { fn } from 'storybook/test';

const sampleCollections = [
  {
    icon: '/src/assets/images/collection/collection-1.jpg',
    name: 'Abstract Shapes',
    value: 'abstract-shapes',
  },
  {
    icon: '/src/assets/images/collection/collection-2.jpg',
    name: 'Digital Landscapes',
    value: 'digital-landscapes',
  },
  {
    icon: '/src/assets/images/collection/collection-3.jpg',
    name: 'Crypto Punks',
    value: 'crypto-punks',
  },
  {
    icon: '/src/assets/images/collection/collection-4.jpg',
    name: 'Pixel Art',
    value: 'pixel-art',
  },
];

const meta: Meta<typeof CollectionSelectList> = {
  title: 'BLOCKCHAIN COMPONENTS/CollectionSelectList',
  tags: ['autodocs'],
  component: CollectionSelectList,
  parameters: {
    docs: {
      description: {
        component:
          'The CollectionSelect component provides a searchable list of NFT collections for selection.',
      },
    },
  },
  argTypes: {
    collectionList: {
      description: 'Array of collections to display',
    },
    onSelect: {
      description: 'Function called when a collection is selected',
      action: 'Collection selected',
    },
  },
  args: {
    collectionList: sampleCollections,
    onSelect: fn(),
  },
};

export default meta;

const Template: StoryFn<typeof CollectionSelectList> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <CollectionSelectList {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const EmptyList = Template.bind({});
EmptyList.args = {
  collectionList: [],
};
