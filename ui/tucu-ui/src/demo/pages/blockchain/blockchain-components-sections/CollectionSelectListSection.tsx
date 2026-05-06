import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CollectionSelectList,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

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
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CollectionSelectList
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A searchable list with keyboard navigation for selecting NFT
          collections. Supports filtering, highlight, and ARIA roles.
        </Typography>
      </div>

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
