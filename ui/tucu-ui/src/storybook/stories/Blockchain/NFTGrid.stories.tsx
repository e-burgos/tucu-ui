import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { NFTGrid } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

// @ts-expect-error - Image is not a valid module
import avatar1Img from '../../../assets/images/avatar/1.png';
// @ts-expect-error - Image is not a valid module
import avatar2Img from '../../../assets/images/avatar/2.png';
// @ts-expect-error - Image is not a valid module
import avatar3Img from '../../../assets/images/avatar/3.png';

// @ts-expect-error - Image is not a valid module
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
// @ts-expect-error - Image is not a valid module
import collection2Img from '../../../assets/images/collection/collection-2.jpg';
// @ts-expect-error - Image is not a valid module
import collection3Img from '../../../assets/images/collection/collection-3.jpg';
// @ts-expect-error - Image is not a valid module
import collection4Img from '../../../assets/images/collection/collection-4.jpg';

const meta: Meta<typeof NFTGrid> = {
  title: '4. BLOCKCHAIN COMPONENTS/NFTGrid',
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
    authorImage: avatar1Img,
    image: collection1Img,
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
  image: collection2Img,
  price: '12.5 ETH',
  name: 'Rare Collectible #7',
  authorImage: avatar2Img,
};

export const LimitedEdition = Template.bind({});
LimitedEdition.args = {
  image: collection3Img,
  name: 'Limited Edition #42',
  collection: 'Exclusive Series',
  price: '3.75 ETH',
  author: 'DigitalMaster',
  authorImage: avatar3Img,
};

export const SpecialEdition = Template.bind({});
SpecialEdition.args = {
  image: collection4Img,
  name: 'Special Edition: Golden Hour',
  collection: 'Premium Collection',
  price: '8.2 ETH',
  author: 'NFTCreator',
  authorImage: avatar2Img,
};
