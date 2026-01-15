import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CollectionSelectList,
} from '../../../../index';
import avatar1Img from '../../../assets/images/avatar/1.png';

const CollectionSelectListSection: React.FC = () => {
  const collectionList = [
    { icon: avatar1Img, name: 'Crypto Punks', value: 'crypto-punks' },
    { icon: avatar1Img, name: 'Bored Ape', value: 'bored-ape' },
    { icon: avatar1Img, name: 'Azuki', value: 'azuki' },
  ];

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

  // CollectionSelectList props data
  const collectionSelectListPropsData = [
    {
      prop: 'collectionList',
      type: 'CollectionList[]',
      default: 'required',
      description: 'Array of collection items',
    },
    {
      prop: 'onSelect',
      type: '(value: string) => void',
      default: 'required',
      description: 'Callback when a collection is selected',
    },
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
          Searchable list component for selecting NFT collections with avatars
          and search functionality.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic List
                </Typography>
                <CollectionSelectList
                  collectionList={collectionList}
                  onSelect={(value) => {
                    console.log('Selected collection:', value);
                  }}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={collectionSelectListPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CollectionSelectList } from '@e-burgos/tucu-ui';

const collectionList = [
  { icon: '/icons/crypto-punks.jpg', name: 'Crypto Punks', value: 'crypto-punks' },
  { icon: '/icons/bored-ape.jpg', name: 'Bored Ape', value: 'bored-ape' },
  { icon: '/icons/azuki.jpg', name: 'Azuki', value: 'azuki' },
];

<CollectionSelectList
  collectionList={collectionList}
  onSelect={(value) => {
    console.log('Selected:', value);
  }}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CollectionSelectListSection;
