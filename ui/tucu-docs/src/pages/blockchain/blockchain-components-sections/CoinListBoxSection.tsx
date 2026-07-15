import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Bitcoin,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import CoinListBox from '@tucu-ui-internal/components/blockchain/coin-listbox';
import { CoinTypes } from '@tucu-ui-internal/components/blockchain/coin-listbox';
import { Ethereum } from '@tucu-ui-internal/components/icons/ethereum';
import { Tether } from '@tucu-ui-internal/components/icons/tether';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const CoinListBoxSection: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<CoinTypes>({
    icon: <Bitcoin className="w-6 h-6" />,
    code: 'BTC',
    name: 'Bitcoin',
    price: 45000,
  });

  const coins = [
    {
      icon: <Bitcoin className="w-6 h-6" />,
      code: 'BTC',
      name: 'Bitcoin',
      price: 45000,
    },
    {
      icon: <Ethereum className="w-6 h-6" />,
      code: 'ETH',
      name: 'Ethereum',
      price: 3000,
    },
    {
      icon: <Tether className="w-6 h-6" />,
      code: 'USDT',
      name: 'Tether',
      price: 1,
    },
  ];

  return (
    <>
      <HeroCard
        title="CoinListBox"
        description="Dropdown listbox component for selecting cryptocurrencies with icons and names. Supports disabled state and custom styling."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
            <LucideIcons.List className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic ListBox
                </Typography>
                <CoinListBox
                  coins={coins}
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                  className="z-50"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <CoinListBox
                  coins={coins}
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                  disabled
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="CoinListBox"
        defaultValues={{
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the listbox interaction',
          },
        ]}
        includeProps={['disabled']}
      >
        {(props) => (
          <div className="w-full max-w-sm">
            <CoinListBox
              coins={coins}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
              disabled={props.disabled}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="CoinListBox" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { CoinListBox } from '@e-burgos/tucu-ui';

const coins = [
  {
    icon: <Bitcoin />,
    code: 'BTC',
    name: 'Bitcoin',
    price: 45000,
  },
  {
    icon: <Ethereum />,
    code: 'ETH',
    name: 'Ethereum',
    price: 3000,
  },
];

const [selectedCoin, setSelectedCoin] = useState(coins[0]);

<CoinListBox
  coins={coins}
  selectedCoin={selectedCoin}
  setSelectedCoin={setSelectedCoin}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CoinListBoxSection;
