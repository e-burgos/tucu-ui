import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CoinCard,
} from '../../../../index';
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../../assets/images/coin/tether.svg';
import cardanoImg from '../../../assets/images/coin/cardano.svg';

const CoinCardSection: React.FC = () => {
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

  // CoinCard props data
  const coinCardPropsData = [
    {
      prop: 'id',
      type: 'string',
      default: 'required',
      description: 'Unique identifier for the coin',
    },
    {
      prop: 'name',
      type: 'string',
      default: 'required',
      description: 'Full name of the cryptocurrency',
    },
    {
      prop: 'symbol',
      type: 'string',
      default: 'required',
      description: 'Cryptocurrency symbol (e.g., BTC, ETH)',
    },
    {
      prop: 'logo',
      type: 'string',
      default: 'required',
      description: 'URL or path to the coin logo image',
    },
    {
      prop: 'balance',
      type: 'string',
      default: 'required',
      description: 'Coin balance amount',
    },
    {
      prop: 'usdBalance',
      type: 'string',
      default: 'required',
      description: 'USD equivalent balance',
    },
    {
      prop: 'change',
      type: 'string',
      default: 'required',
      description: 'Price change percentage (e.g., "+2.5%")',
    },
    {
      prop: 'isChangePositive',
      type: 'boolean',
      default: 'required',
      description: 'Whether the price change is positive',
    },
    {
      prop: 'color',
      type: 'string',
      default: "'#FDEDD4'",
      description: 'Background color for the card',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CoinCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Display cryptocurrency information in a clean, card format with
          customizable background colors, price changes, and balance
          information.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Bitcoin
                </Typography>
                <CoinCard
                  id="bitcoin"
                  name="Bitcoin"
                  symbol="BTC"
                  logo={bitcoinImg}
                  balance="1.25"
                  usdBalance="45,000"
                  change="+2.5%"
                  isChangePositive={true}
                  color="#FDEDD4"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Tether
                </Typography>
                <CoinCard
                  id="tether"
                  name="Tether"
                  symbol="USDT"
                  logo={ethereumImg}
                  balance="10.5"
                  usdBalance="33,600"
                  change="-1.2%"
                  isChangePositive={false}
                  color="#E1F5FE"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Cardano
                </Typography>
                <CoinCard
                  id="cardano"
                  name="Cardano"
                  symbol="ADA"
                  logo={cardanoImg}
                  balance="1,500"
                  usdBalance="975"
                  change="+5.8%"
                  isChangePositive={true}
                  color="#E8F5E8"
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={coinCardPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CoinCard } from '@e-burgos/tucu-ui';

<CoinCard
  id="bitcoin"
  name="Bitcoin"
  symbol="BTC"
  logo="/icons/bitcoin.svg"
  balance="1.25"
  usdBalance="45,000"
  change="+2.5%"
  isChangePositive={true}
  color="#FDEDD4"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CoinCardSection;
