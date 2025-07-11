import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CollectionCard } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

// @ts-expect-error - Image is not a valid module
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
// @ts-expect-error - Image is not a valid module
import collection2Img from '../../../assets/images/collection/collection-2.jpg';
// @ts-expect-error - Image is not a valid module
import collection3Img from '../../../assets/images/collection/collection-3.jpg';
// @ts-expect-error - Image is not a valid module
import collection4Img from '../../../assets/images/collection/collection-4.jpg';
// @ts-expect-error - Image is not a valid module
import collection5Img from '../../../assets/images/collection/collection-5.jpg';
// @ts-expect-error - Image is not a valid module
import avatar1Img from '../../../assets/images/avatar/1.png';
// @ts-expect-error - Image is not a valid module
import avatar2Img from '../../../assets/images/avatar/2.png';
// @ts-expect-error - Image is not a valid module
import avatar3Img from '../../../assets/images/avatar/3.png';
// @ts-expect-error - Image is not a valid module
import avatar10Img from '../../../assets/images/avatar/10.jpg';
// @ts-expect-error - Image is not a valid module
import avatar11Img from '../../../assets/images/avatar/11.jpg';

const sampleCollection = {
  id: '1',
  name: 'Abstract Art',
  slug: 'abstract-art',
  title: 'Abstract Shapes Collection',
  cover_image: collection1Img,
  number_of_artwork: 8,
  user: {
    avatar: avatar1Img,
    name: 'John Doe',
    slug: 'john-doe',
  },
};

const secondCollection = {
  id: '2',
  name: 'Digital Landscapes',
  slug: 'digital-landscapes',
  title: 'Virtual Reality Views',
  cover_image: collection2Img,
  number_of_artwork: 12,
  user: {
    avatar: avatar2Img,
    name: 'Jane Smith',
    slug: 'jane-smith',
  },
};

const thirdCollection = {
  id: '3',
  name: 'Crypto Artifacts',
  slug: 'crypto-artifacts',
  title: 'Historical Blockchain Items',
  cover_image: collection3Img,
  number_of_artwork: 5,
  user: {
    avatar: avatar3Img,
    name: 'Alex Johnson',
    slug: 'alex-johnson',
  },
};

const meta: Meta<typeof CollectionCard> = {
  title: '4. BLOCKCHAIN COMPONENTS/CollectionCard',
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
  <StoryContainer>
    <CollectionCard {...args} />
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
    cover_image: collection4Img,
    image: collection4Img,
    user: {
      ...sampleCollection.user,
      avatar: avatar10Img,
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
    cover_image: collection5Img,
    image: collection5Img,
    number_of_artwork: 24,
    user: {
      avatar: avatar11Img,
      name: 'Michael Chen',
      slug: 'michael-chen',
    },
  },
};
