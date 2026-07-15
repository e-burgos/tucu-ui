import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  CollectionCard,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import collection1Img from '../../../assets/images/collection/collection-1.jpg';
import avatar1Img from '../../../assets/images/avatar/1.png';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

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

  return (
    <>
      <HeroCard
        title="CollectionCard"
        description="NFT collection preview with statistics, cover image, and creator information for marketplace interfaces."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.LayoutGrid className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CollectionCard item={collectionData} />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="CollectionCard"
        defaultValues={{
          className: '',
        }}
        controlOverrides={[
          {
            name: 'className',
            type: 'text',
            description: 'Additional CSS classes for the card',
          },
        ]}
        includeProps={['className']}
      >
        {(props) => (
          <div className="w-full max-w-sm">
            <CollectionCard item={collectionData} className={props.className} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CollectionCard" />

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
