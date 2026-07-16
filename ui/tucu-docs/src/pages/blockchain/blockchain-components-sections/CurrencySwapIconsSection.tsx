import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  CurrencySwapIcons,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const CurrencySwapIconsSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="CurrencySwapIcons"
        description="Component for displaying currency swap pairs with overlapping icons and pair label. Supports all major cryptocurrencies."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-pink-500 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border border-pink-500/50">
            <LucideIcons.ArrowLeftRight className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  BTC to ETH
                </Typography>
                <CurrencySwapIcons from="BTC" to="ETH" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  ETH to USDT
                </Typography>
                <CurrencySwapIcons from="ETH" to="USDT" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  USDT to BNB
                </Typography>
                <CurrencySwapIcons from="USDT" to="BNB" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="CurrencySwapIcons"
        defaultValues={{
          from: 'BTC',
          to: 'ETH',
        }}
        controlOverrides={[
          {
            name: 'from',
            type: 'select',
            options: ['BTC', 'ETH', 'USDT', 'BNB', 'USDC', 'ADA', 'DOGE'],
            description: 'Source currency',
          },
          {
            name: 'to',
            type: 'select',
            options: ['BTC', 'ETH', 'USDT', 'BNB', 'USDC', 'ADA', 'DOGE'],
            description: 'Target currency',
          },
        ]}
        includeProps={['from', 'to']}
      >
        {(props) => (
          <div className="w-full flex justify-center">
            <CurrencySwapIcons from={props.from} to={props.to} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CurrencySwapIcons" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CurrencySwapIcons } from '@e-burgos/tucu-ui';

<CurrencySwapIcons from="BTC" to="ETH" />
<CurrencySwapIcons from="ETH" to="USDT" />
<CurrencySwapIcons from="USDT" to="BNB" />

// Supported coins: 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE'`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CurrencySwapIconsSection;
