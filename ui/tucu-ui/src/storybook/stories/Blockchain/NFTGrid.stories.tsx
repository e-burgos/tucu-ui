import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { NFTGrid } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof NFTGrid> = {
  title: 'BLOCKCHAIN COMPONENTS/NFTGrid',
  tags: ['autodocs'],
  component: NFTGrid,
  parameters: {
    docs: {
      description: {
        component:
          'The NFTGrid component displays a single NFT card with author information, image, name, collection and price details.',
      },
    },
  },
  argTypes: {
    author: {
      control: 'text',
      description: 'Name of the NFT creator/author',
    },
    authorImage: {
      description: 'URL or imported image for the author avatar',
    },
    image: {
      description: 'URL or imported image for the NFT',
    },
    name: {
      control: 'text',
      description: 'Name of the NFT',
    },
    collection: {
      control: 'text',
      description: 'Collection name the NFT belongs to',
    },
    price: {
      control: 'text',
      description: 'Price of the NFT',
    },
    profilePath: {
      control: 'text',
      description: 'URL path to the profile page',
    },
  },
  args: {
    author: 'CryptoArtist',
    authorImage: '/src/assets/images/avatar/1.png',
    image: '/src/assets/images/collection/collection-1.jpg',
    name: 'Abstract Digital Art #123',
    collection: 'Abstract Wonders',
    price: '0.45 ETH',
    profilePath: '/profile/cryptoartist',
  },
};

export default meta;

const Template: StoryFn<typeof NFTGrid> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-[250px]">
      <NFTGrid {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const HighPrice = Template.bind({});
HighPrice.args = {
  image: '/src/assets/images/collection/collection-2.jpg',
  price: '12.5 ETH',
  name: 'Rare Collectible #7',
  authorImage: '/src/assets/images/avatar/2.png',
};

export const LimitedEdition = Template.bind({});
LimitedEdition.args = {
  image: '/src/assets/images/collection/collection-3.jpg',
  name: 'Limited Edition #42',
  collection: 'Exclusive Series',
  price: '3.75 ETH',
  author: 'DigitalMaster',
  authorImage: '/src/assets/images/avatar/3.png',
};

export const SpecialEdition = Template.bind({});
SpecialEdition.args = {
  image: '/src/assets/images/collection/collection-4.jpg',
  name: 'Special Edition: Golden Hour',
  collection: 'Premium Collection',
  price: '8.2 ETH',
  author: 'NFTCreator',
  authorImage: '/src/assets/images/avatar/2.png',
};
