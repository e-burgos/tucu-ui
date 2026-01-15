import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  LivePriceFeed,
  Bitcoin,
} from '../../../../index';
import { Ethereum } from '../../../../components/icons/ethereum';

const LivePriceFeedSection: React.FC = () => {
  const priceData = [
    { name: 1, value: 45000 },
    { name: 2, value: 45200 },
    { name: 3, value: 44800 },
    { name: 4, value: 45100 },
    { name: 5, value: 45300 },
  ];

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

  const livePriceFeedPropsData = [
    {
      prop: 'id',
      type: 'string',
      default: 'required',
      description: 'Unique identifier for the price feed',
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
      description: 'Cryptocurrency symbol',
    },
    {
      prop: 'icon',
      type: 'React.ReactElement',
      default: 'required',
      description: 'Icon element for the cryptocurrency',
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
      description: 'Price change percentage',
    },
    {
      prop: 'isChangePositive',
      type: 'boolean',
      default: 'required',
      description: 'Whether the price change is positive',
    },
    {
      prop: 'prices',
      type: 'Price[]',
      default: 'required',
      description: 'Array of price data points for the chart',
    },
    {
      prop: 'isBorder',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show border instead of shadow',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          LivePriceFeed
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Real-time price display with integrated chart visualization for
          cryptocurrency price tracking.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Chart
                </Typography>
                <LivePriceFeed
                  id="bitcoin"
                  name="Bitcoin"
                  symbol="BTC"
                  icon={<Bitcoin className="w-6 h-6" />}
                  balance="1.25"
                  usdBalance="45,000"
                  change="+2.5%"
                  isChangePositive={true}
                  prices={priceData}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Negative Change
                </Typography>
                <LivePriceFeed
                  id="ethereum"
                  name="Ethereum"
                  symbol="ETH"
                  icon={<Ethereum className="w-6 h-6" />}
                  balance="5.5"
                  usdBalance="16,500"
                  change="-1.8%"
                  isChangePositive={false}
                  prices={[
                    { name: 1, value: 3000 },
                    { name: 2, value: 2950 },
                    { name: 3, value: 2980 },
                    { name: 4, value: 2920 },
                    { name: 5, value: 2900 },
                  ]}
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
              data={livePriceFeedPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { LivePriceFeed } from '@e-burgos/tucu-ui';

const priceData = [
  { name: 1, value: 45000 },
  { name: 2, value: 45200 },
  { name: 3, value: 44800 },
  { name: 4, value: 45100 },
];

<LivePriceFeed
  id="bitcoin"
  name="Bitcoin"
  symbol="BTC"
  icon={<Bitcoin />}
  balance="1.25"
  usdBalance="45,000"
  change="+2.5%"
  isChangePositive={true}
  prices={priceData}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default LivePriceFeedSection;
