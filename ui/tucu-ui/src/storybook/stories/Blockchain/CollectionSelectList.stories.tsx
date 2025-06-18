import type { Meta, StoryFn } from '@storybook/react-vite';
import { CollectionSelectList } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import { fn } from 'storybook/test';

import Collection1 from '../../../assets/images/collection/collection-1.jpg';
import Collection2 from '../../../assets/images/collection/collection-2.jpg';
import Collection3 from '../../../assets/images/collection/collection-3.jpg';
import Collection4 from '../../../assets/images/collection/collection-4.jpg';

const sampleCollections = [
  {
    icon: Collection1,
    name: 'Abstract Shapes',
    value: 'abstract-shapes',
  },
  {
    icon: Collection2,
    name: 'Digital Landscapes',
    value: 'digital-landscapes',
  },
  {
    icon: Collection3,
    name: 'Crypto Punks',
    value: 'crypto-punks',
  },
  {
    icon: Collection4,
    name: 'Pixel Art',
    value: 'pixel-art',
  },
];

const meta: Meta<typeof CollectionSelectList> = {
  title: 'UI COMPONENTS/Blockchain/CollectionSelectList',
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
  <StoryContainer className="justify-center items-center">
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
