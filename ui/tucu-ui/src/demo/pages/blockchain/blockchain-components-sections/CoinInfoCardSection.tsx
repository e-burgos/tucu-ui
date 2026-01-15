import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CoinInfoCard,
} from '../../../../index';
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../../assets/images/coin/tether.svg';

const CoinInfoCardSection: React.FC = () => {
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

  // CoinInfoCard props data
  const coinInfoCardPropsData = [
    {
      prop: 'item',
      type: 'ItemType',
      default: 'required',
      description: 'Coin information object',
    },
    {
      prop: 'className',
      type: 'string',
      default: "''",
      description: 'Custom CSS classes for the card',
    },
    {
      prop: 'variant',
      type: "'small' | 'medium' | 'large'",
      default: "'small'",
      description: 'Size variant of the coin icon',
    },
    {
      prop: 'imageClassName',
      type: 'string',
      default: "'bg-brand rounded p-1'",
      description: 'Custom CSS classes for the coin image',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CoinInfoCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Compact card component for displaying coin information with icon,
          name, and balance.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Coin Info
                </Typography>
                <CoinInfoCard
                  item={{
                    id: 'bitcoin',
                    name: 'Bitcoin',
                    logo: bitcoinImg,
                    balance: '1.25 BTC',
                  }}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Coin Type
                </Typography>
                <CoinInfoCard
                  item={{
                    id: 'ethereum',
                    name: 'Ethereum',
                    logo: ethereumImg,
                    balance: '5.5 ETH',
                    coinType: 'ERC-20',
                  }}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Small (default)
                </Typography>
                <CoinInfoCard
                  item={{
                    id: 'bitcoin',
                    name: 'Bitcoin',
                    logo: bitcoinImg,
                    balance: '1.25 BTC',
                  }}
                  variant="small"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Medium
                </Typography>
                <CoinInfoCard
                  item={{
                    id: 'bitcoin',
                    name: 'Bitcoin',
                    logo: bitcoinImg,
                    balance: '1.25 BTC',
                  }}
                  variant="medium"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Large
                </Typography>
                <CoinInfoCard
                  item={{
                    id: 'bitcoin',
                    name: 'Bitcoin',
                    logo: bitcoinImg,
                    balance: '1.25 BTC',
                  }}
                  variant="large"
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
              data={coinInfoCardPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CoinInfoCard } from '@e-burgos/tucu-ui';

<CoinInfoCard
  item={{
    id: 'bitcoin',
    name: 'Bitcoin',
    logo: '/icons/bitcoin.svg',
    balance: '1.25 BTC',
    coinType: 'ERC-20', // Optional
  }}
  variant="small" // 'small' | 'medium' | 'large'
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CoinInfoCardSection;
