import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CollectionCard,
} from '../../../../index';
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
import avatar1Img from '../../../assets/images/avatar/1.png';

const CollectionCardSection: React.FC = () => {
  const collectionData = {
    id: 'collection-1',
    name: 'Crypto Punks',
    slug: 'crypto-punks',
    title: 'Crypto Punks Collection',
    cover_image: collection1Img,
    number_of_artwork: 42,
    user: {
      avatar: avatar1Img,
      name: 'CryptoPunk Studio',
      slug: 'cryptopunk-studio',
    },
  };

  // Table columns definition for props tables
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  // CollectionCard props data
  const collectionCardPropsData = [
    {
      prop: 'item',
      type: 'ItemType',
      default: 'required',
      description: 'Collection data object',
    },
    {
      prop: 'className',
      type: 'string',
      default: "''",
      description: 'Custom CSS classes for the card',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CollectionCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          NFT collection preview with statistics, cover image, and creator
          information for marketplace interfaces.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CollectionCard item={collectionData} />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={collectionCardPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CollectionCard } from '@e-burgos/tucu-ui';

const collectionData = {
  id: 'bayc',
  name: 'BAYC',
  slug: 'bored-ape-yacht-club',
  title: 'Bored Ape Yacht Club',
  cover_image: '/collections/bayc-banner.jpg',
  number_of_artwork: 10000,
   user: {
    avatar: '/avatars/bayc-creator.jpg',
    name: 'Yuga Labs',
    slug: 'yuga-labs',
  },
};

<CollectionCard item={collectionData} className="w-full max-w-sm" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CollectionCardSection;

