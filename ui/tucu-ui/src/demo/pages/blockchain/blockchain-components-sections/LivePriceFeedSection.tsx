import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LivePriceFeed,
  Bitcoin,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { Ethereum } from '../../../../components/icons/ethereum';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';
import { Typography } from '../../../../index';

const LivePriceFeedSection: React.FC = () => {
  const priceData = [
    { name: 1, value: 45000 },
    { name: 2, value: 45200 },
    { name: 3, value: 44800 },
    { name: 4, value: 45100 },
    { name: 5, value: 45300 },
  ];

  return (
    <>
      <HeroCard
        title="LivePriceFeed"
        description="Real-time price display with integrated chart visualization for cryptocurrency price tracking."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border border-green-500/50">
            <LucideIcons.TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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

      <PropPlayground
        componentName="LivePriceFeed"
        defaultValues={{
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          balance: '1.25',
          usdBalance: '45,000',
          change: '+2.5%',
          isChangePositive: true,
          isBorder: false,
        }}
        controlOverrides={[
          {
            name: 'isChangePositive',
            type: 'boolean',
            description: 'Whether the price change is positive',
          },
          {
            name: 'isBorder',
            type: 'boolean',
            description: 'Show border around the component',
          },
        ]}
        includeProps={[
          'id',
          'name',
          'symbol',
          'balance',
          'usdBalance',
          'change',
          'isChangePositive',
          'isBorder',
        ]}
      >
        {(props) => (
          <div className="w-full">
            <LivePriceFeed
              {...props}
              icon={<Bitcoin className="w-6 h-6" />}
              prices={priceData}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="LivePriceFeed" />

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
