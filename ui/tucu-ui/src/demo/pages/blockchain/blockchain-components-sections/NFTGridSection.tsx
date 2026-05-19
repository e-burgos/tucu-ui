import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  NFTGrid,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const NFTGridSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="NFTGrid"
        description="Grid card component for displaying NFT items with author information, image, collection, and price."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border border-cyan-500/50">
            <LucideIcons.Grid3x3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Grid Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <NFTGrid
                author="CryptoPunk"
                authorImage="https://i.pravatar.cc/80?img=1"
                image="https://picsum.photos/seed/nft1/400/300"
                name="CryptoPunk #1234"
                collection="Crypto Punks"
                price="45 ETH"
              />
              <NFTGrid
                author="BoredApe"
                authorImage="https://i.pravatar.cc/80?img=12"
                image="https://picsum.photos/seed/nft2/400/300"
                name="Bored Ape #8821"
                collection="BAYC"
                price="72 ETH"
              />
              <NFTGrid
                author="Azuki"
                authorImage="https://i.pravatar.cc/80?img=25"
                image="https://picsum.photos/seed/nft3/400/300"
                name="Azuki #5501"
                collection="Azuki"
                price="18.5 ETH"
              />
              <NFTGrid
                author="Doodles"
                authorImage="https://i.pravatar.cc/80?img=33"
                image="https://picsum.photos/seed/nft4/400/300"
                name="Doodle #3120"
                collection="Doodles"
                price="8.2 ETH"
              />
              <NFTGrid
                author="CloneX"
                authorImage="https://i.pravatar.cc/80?img=44"
                image="https://picsum.photos/seed/nft5/400/300"
                name="CloneX #12882"
                collection="CloneX"
                price="5.8 ETH"
              />
              <NFTGrid
                author="Moonbird"
                authorImage="https://i.pravatar.cc/80?img=56"
                image="https://picsum.photos/seed/nft6/400/300"
                name="Moonbird #7744"
                collection="Moonbirds"
                price="12 ETH"
                profilePath="/profile/moonbird"
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="NFTGrid"
        defaultValues={{
          author: 'CryptoPunk',
          authorImage: 'https://i.pravatar.cc/80?img=1',
          image: 'https://picsum.photos/seed/nft1/400/300',
          name: 'CryptoPunk #1234',
          collection: 'Crypto Punks',
          price: '45 ETH',
          profilePath: '',
        }}
        controlOverrides={[
          {
            name: 'author',
            type: 'text',
            description: 'NFT author name',
          },
          {
            name: 'name',
            type: 'text',
            description: 'NFT item name',
          },
          {
            name: 'collection',
            type: 'text',
            description: 'Collection name',
          },
          {
            name: 'price',
            type: 'text',
            description: 'Price display text',
          },
        ]}
        includeProps={['author', 'name', 'collection', 'price', 'profilePath']}
      >
        {(props) => (
          <div className="w-full max-w-xs">
            <NFTGrid
              {...props}
              authorImage="https://i.pravatar.cc/80?img=1"
              image="https://picsum.photos/seed/nft1/400/300"
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="NFTGrid" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { NFTGrid } from '@e-burgos/tucu-ui';

// Single card
<NFTGrid
  author="CryptoPunk"
  authorImage="/avatars/cryptopunk.jpg"
  image="/nfts/punk-1234.jpg"
  name="CryptoPunk #1234"
  collection="Crypto Punks"
  price="45 ETH"
  profilePath="/profile/cryptopunk"
/>

// Grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  <NFTGrid {...nft1} />
  <NFTGrid {...nft2} />
  <NFTGrid {...nft3} />
</div>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default NFTGridSection;
