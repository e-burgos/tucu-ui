import type { Meta, StoryFn } from '@storybook/react-vite';
import { NFTGrid } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

import Collection1 from '../../../assets/images/collection/collection-1.jpg';
import Collection2 from '../../../assets/images/collection/collection-2.jpg';
import Collection3 from '../../../assets/images/collection/collection-3.jpg';
import Collection4 from '../../../assets/images/collection/collection-4.jpg';

import Avatar1 from '../../../assets/images/avatar/1.png';
import Avatar2 from '../../../assets/images/avatar/2.png';
import Avatar3 from '../../../assets/images/avatar/3.png';

const meta: Meta<typeof NFTGrid> = {
  title: 'UI COMPONENTS/Blockchain/NFTGrid',
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
    authorImage: Avatar1,
    image: Collection1,
    name: 'Abstract Digital Art #123',
    collection: 'Abstract Wonders',
    price: '0.45 ETH',
    profilePath: '/profile/cryptoartist',
  },
};

export default meta;

const Template: StoryFn<typeof NFTGrid> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-[250px]">
      <NFTGrid {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const HighPrice = Template.bind({});
HighPrice.args = {
  image: Collection2,
  price: '12.5 ETH',
  name: 'Rare Collectible #7',
  authorImage: Avatar2,
};

export const LimitedEdition = Template.bind({});
LimitedEdition.args = {
  image: Collection3,
  name: 'Limited Edition #42',
  collection: 'Exclusive Series',
  price: '3.75 ETH',
  author: 'DigitalMaster',
  authorImage: Avatar3,
};

export const SpecialEdition = Template.bind({});
SpecialEdition.args = {
  image: Collection4,
  name: 'Special Edition: Golden Hour',
  collection: 'Premium Collection',
  price: '8.2 ETH',
  author: 'NFTCreator',
  authorImage: Avatar2,
};
