import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CoinCard,
} from '../../../../index';
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../../assets/images/coin/tether.svg';
import cardanoImg from '../../../assets/images/coin/cardano.svg';
import { AutoPropsTable } from '../../../components/auto-props-table';

const CoinCardSection: React.FC = () => {
  // Table columns definition for props tables

  // CoinCard props data

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
