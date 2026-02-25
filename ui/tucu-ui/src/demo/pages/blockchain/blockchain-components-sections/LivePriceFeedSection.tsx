import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LivePriceFeed,
  Bitcoin,
} from '../../../../index';
import { Ethereum } from '../../../../components/icons/ethereum';
import { AutoPropsTable } from '../../../components/auto-props-table';

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
