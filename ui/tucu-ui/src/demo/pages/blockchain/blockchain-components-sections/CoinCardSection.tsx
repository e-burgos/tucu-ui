import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CoinCard,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../../assets/images/coin/tether.svg';
import cardanoImg from '../../../assets/images/coin/cardano.svg';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const CoinCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="CoinCard"
        description="Display cryptocurrency information in a clean, card format with customizable background colors, price changes, and balance information."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-amber-500/50">
            <LucideIcons.Coins className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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

      <PropPlayground
        componentName="CoinCard"
        defaultValues={{
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          balance: '1.25',
          usdBalance: '45,000',
          change: '+2.5%',
          isChangePositive: true,
          color: '#FDEDD4',
        }}
        controlOverrides={[
          {
            name: 'isChangePositive',
            type: 'boolean',
            description: 'Whether the price change is positive',
          },
          {
            name: 'color',
            type: 'text',
            description: 'Background color of the card (hex)',
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
          'color',
        ]}
      >
        {(props) => (
          <div className="w-full max-w-sm">
            <CoinCard {...props} logo={bitcoinImg} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CoinCard" />

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
