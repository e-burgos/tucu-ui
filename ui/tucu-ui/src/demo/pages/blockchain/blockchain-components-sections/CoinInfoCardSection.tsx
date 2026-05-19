import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CoinInfoCard,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
import ethereumImg from '../../../assets/images/coin/tether.svg';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const CoinInfoCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="CoinInfoCard"
        description="Compact card component for displaying coin information with icon, name, and balance. Supports multiple size variants."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.Info className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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

      <PropPlayground
        componentName="CoinInfoCard"
        defaultValues={{
          variant: 'small',
        }}
        controlOverrides={[
          {
            name: 'variant',
            type: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Size variant of the card',
          },
        ]}
        includeProps={['variant']}
      >
        {(props) => (
          <div className="w-full max-w-sm">
            <CoinInfoCard
              {...props}
              item={{
                id: 'bitcoin',
                name: 'Bitcoin',
                logo: bitcoinImg,
                balance: '1.25 BTC',
                coinType: 'ERC-20',
              }}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CoinInfoCard" />

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
