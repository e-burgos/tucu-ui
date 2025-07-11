import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CollectionSelectList } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import { fn } from 'storybook/test';

// @ts-expect-error - Image is not a valid module
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
// @ts-expect-error - Image is not a valid module
import collection2Img from '../../../assets/images/collection/collection-2.jpg';
// @ts-expect-error - Image is not a valid module
import collection3Img from '../../../assets/images/collection/collection-3.jpg';

// @ts-expect-error - Image is not a valid module
import collection4Img from '../../../assets/images/collection/collection-4.jpg';

const sampleCollections = [
  {
    icon: collection1Img,
    name: 'Abstract Shapes',
    value: 'abstract-shapes',
  },
  {
    icon: collection2Img,
    name: 'Digital Landscapes',
    value: 'digital-landscapes',
  },
  {
    icon: collection3Img,
    name: 'Crypto Punks',
    value: 'crypto-punks',
  },
  {
    icon: collection4Img,
    name: 'Pixel Art',
    value: 'pixel-art',
  },
];

const meta: Meta<typeof CollectionSelectList> = {
  title: '4. BLOCKCHAIN COMPONENTS/CollectionSelectList',
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
