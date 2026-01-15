import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  NFTGrid,
} from '../../../../index';
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
import avatar1Img from '../../../assets/images/avatar/1.png';

const NFTGridSection: React.FC = () => {
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

  // NFTGrid props data
  const nftGridPropsData = [
    {
      prop: 'author',
      type: 'string',
      default: 'required',
      description: 'NFT author/creator name',
    },
    {
      prop: 'authorImage',
      type: 'string',
      default: 'required',
      description: 'URL to author avatar image',
    },
    {
      prop: 'image',
      type: 'string',
      default: 'required',
      description: 'URL to NFT image',
    },
    {
      prop: 'name',
      type: 'string',
      default: 'required',
      description: 'NFT name',
    },
    {
      prop: 'collection',
      type: 'string',
      default: 'required',
      description: 'Collection name',
    },
    {
      prop: 'price',
      type: 'string',
      default: 'required',
      description: 'NFT price',
    },
    {
      prop: 'profilePath',
      type: 'string',
      default: "'/'",
      description: 'Path to profile page',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          NFTGrid
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Grid card component for displaying NFT items with author information,
          image, collection, and price.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic NFT
                </Typography>
                <NFTGrid
                  author="CryptoPunk"
                  authorImage={avatar1Img}
                  image={collection1Img}
                  name="CryptoPunk #1234"
                  collection="Crypto Punks"
                  price="45 ETH"
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={nftGridPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { NFTGrid } from '@e-burgos/tucu-ui';

<NFTGrid
  author="CryptoPunk"
  authorImage="/avatars/cryptopunk.jpg"
  image="/nfts/punk-1234.jpg"
  name="CryptoPunk #1234"
  collection="Crypto Punks"
  price="45 ETH"
  profilePath="/profile/cryptopunk" // Optional
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default NFTGridSection;
