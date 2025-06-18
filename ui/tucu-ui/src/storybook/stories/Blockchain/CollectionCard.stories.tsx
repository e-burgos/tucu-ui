import type { Meta, StoryFn } from '@storybook/react-vite';
import { CollectionCard } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

import Collection1 from '../../../assets/images/collection/collection-1.jpg';
import Collection2 from '../../../assets/images/collection/collection-2.jpg';
import Collection3 from '../../../assets/images/collection/collection-3.jpg';
import Collection4 from '../../../assets/images/collection/collection-4.jpg';
import Collection5 from '../../../assets/images/collection/collection-5.jpg';

import Avatar1 from '../../../assets/images/avatar/1.png';
import Avatar2 from '../../../assets/images/avatar/2.png';
import Avatar3 from '../../../assets/images/avatar/3.png';
import Avatar4 from '../../../assets/images/avatar/10.jpg';
import Avatar5 from '../../../assets/images/avatar/11.jpg';

const sampleCollection = {
  id: '1',
  name: 'Abstract Art',
  slug: 'abstract-art',
  title: 'Abstract Shapes Collection',
  cover_image: Collection1,
  image: Collection1,
  number_of_artwork: 8,
  user: {
    avatar: Avatar1,
    name: 'John Doe',
    slug: 'john-doe',
  },
};

const secondCollection = {
  id: '2',
  name: 'Digital Landscapes',
  slug: 'digital-landscapes',
  title: 'Virtual Reality Views',
  cover_image: Collection2,
  image: Collection2,
  number_of_artwork: 12,
  user: {
    avatar: Avatar2,
    name: 'Jane Smith',
    slug: 'jane-smith',
  },
};

const thirdCollection = {
  id: '3',
  name: 'Crypto Artifacts',
  slug: 'crypto-artifacts',
  title: 'Historical Blockchain Items',
  cover_image: Collection3,
  image: Collection3,
  number_of_artwork: 5,
  user: {
    avatar: Avatar3,
    name: 'Alex Johnson',
    slug: 'alex-johnson',
  },
};

const meta: Meta<typeof CollectionCard> = {
  title: 'UI COMPONENTS/Blockchain/CollectionCard',
  tags: ['autodocs'],
  component: CollectionCard,
  parameters: {
    docs: {
      description: {
        component:
          'The CollectionCard component displays an NFT collection with cover image, collection name, title, number of artworks and creator information.',
      },
    },
  },
  argTypes: {
    item: {
      description:
        'Collection item data object with details about the NFT collection',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
  },
  args: {
    item: sampleCollection,
  },
};

export default meta;

const Template: StoryFn<typeof CollectionCard> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-sm h-full">
      <CollectionCard {...args} className="h-full" />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const DigitalLandscapes = Template.bind({});
DigitalLandscapes.args = {
  item: secondCollection,
};

export const CryptoArtifacts = Template.bind({});
CryptoArtifacts.args = {
  item: thirdCollection,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  className: 'shadow-xl rounded-xl border-2 border-indigo-500',
  item: {
    ...sampleCollection,
    cover_image: Collection4,
    image: Collection4,
    user: {
      ...sampleCollection.user,
      avatar: Avatar4,
    },
  },
};

export const LargeArtworkCollection = Template.bind({});
LargeArtworkCollection.args = {
  item: {
    id: '4',
    name: 'Premium Art',
    slug: 'premium-art',
    title: 'Exclusive Premium Collection',
    cover_image: Collection5,
    image: Collection5,
    number_of_artwork: 24,
    user: {
      avatar: Avatar5,
      name: 'Michael Chen',
      slug: 'michael-chen',
    },
  },
};
