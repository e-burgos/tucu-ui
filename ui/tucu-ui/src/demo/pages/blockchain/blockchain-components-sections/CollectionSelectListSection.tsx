import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CollectionSelectList,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const CollectionSelectListSection: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const collectionList = [
    {
      icon: 'https://i.pravatar.cc/80?img=1',
      name: 'CryptoPunks',
      value: 'crypto-punks',
    },
    {
      icon: 'https://i.pravatar.cc/80?img=5',
      name: 'Bored Ape Yacht Club',
      value: 'bayc',
    },
    { icon: 'https://i.pravatar.cc/80?img=12', name: 'Azuki', value: 'azuki' },
    {
      icon: 'https://i.pravatar.cc/80?img=20',
      name: 'Doodles',
      value: 'doodles',
    },
    {
      icon: 'https://i.pravatar.cc/80?img=25',
      name: 'CloneX',
      value: 'clonex',
    },
    {
      icon: 'https://i.pravatar.cc/80?img=30',
      name: 'Moonbirds',
      value: 'moonbirds',
    },
    {
      icon: 'https://i.pravatar.cc/80?img=35',
      name: 'Pudgy Penguins',
      value: 'pudgy-penguins',
    },
    {
      icon: 'https://i.pravatar.cc/80?img=40',
      name: 'World of Women',
      value: 'wow',
    },
  ];

  const shortList = [
    {
      icon: 'https://i.pravatar.cc/80?img=50',
      name: 'Art Blocks',
      value: 'art-blocks',
    },
    { icon: 'https://i.pravatar.cc/80?img=55', name: 'Nouns', value: 'nouns' },
    { icon: 'https://i.pravatar.cc/80?img=60', name: 'Loot', value: 'loot' },
  ];

  return (
    <>
      <HeroCard
        title="CollectionSelectList"
        description="A searchable list with keyboard navigation for selecting NFT collections. Supports filtering, highlight, and ARIA roles."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
            <LucideIcons.ListChecks className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Typography tag="h5">Full Collection (8 items)</Typography>
                {selected && (
                  <div className="text-xs text-brand font-medium bg-brand/10 rounded-lg px-3 py-1.5 inline-block">
                    Selected: {selected}
                  </div>
                )}
                <CollectionSelectList
                  collectionList={collectionList}
                  onSelect={setSelected}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h5">
                  Short List + Custom Placeholder
                </Typography>
                <CollectionSelectList
                  collectionList={shortList}
                  onSelect={(v) => console.log('Selected:', v)}
                  placeholder="Find a collection..."
                  noResultsMessage="No matching collections"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="CollectionSelectList"
        defaultValues={{
          placeholder: 'Search collections...',
          noResultsMessage: 'No collections found',
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Placeholder text for the search input',
          },
          {
            name: 'noResultsMessage',
            type: 'text',
            description: 'Message shown when no results match',
          },
        ]}
        includeProps={['placeholder', 'noResultsMessage']}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <CollectionSelectList
              collectionList={shortList}
              onSelect={(v) => console.log('Selected:', v)}
              placeholder={props.placeholder}
              noResultsMessage={props.noResultsMessage}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CollectionSelectList" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CollectionSelectList } from '@e-burgos/tucu-ui';

const collections = [
  { icon: '/avatars/punks.jpg', name: 'CryptoPunks', value: 'crypto-punks' },
  { icon: '/avatars/bayc.jpg', name: 'Bored Ape Yacht Club', value: 'bayc' },
  { icon: '/avatars/azuki.jpg', name: 'Azuki', value: 'azuki' },
  { icon: '/avatars/doodles.jpg', name: 'Doodles', value: 'doodles' },
];

<CollectionSelectList
  collectionList={collections}
  onSelect={(value) => console.log('Selected:', value)}
  placeholder="Search collections..."
  noResultsMessage="No collections found"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CollectionSelectListSection;
