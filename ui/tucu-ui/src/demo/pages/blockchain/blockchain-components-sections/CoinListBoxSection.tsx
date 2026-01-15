import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Bitcoin,
} from '../../../../index';
import CoinListBox from '../../../../components/blockchain/coin-listbox';
import { Ethereum } from '../../../../components/icons/ethereum';
import { Tether } from '../../../../components/icons/tether';

const CoinListBoxSection: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState({
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

  // CoinListBox props data
  const coinListBoxPropsData = [
    {
      prop: 'coins',
      type: 'CoinTypes[]',
      default: 'required',
      description: 'Array of available coins',
    },
    {
      prop: 'selectedCoin',
      type: 'CoinTypes',
      default: 'required',
      description: 'Currently selected coin',
    },
    {
      prop: 'setSelectedCoin',
      type: '(coin: CoinTypes) => void',
      default: 'required',
      description: 'Callback when coin selection changes',
    },
    {
      prop: 'className',
      type: 'string',
      default: "''",
      description: 'Custom CSS classes',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the listbox',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CoinListBox
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Dropdown listbox component for selecting cryptocurrencies with icons
          and names.
        </Typography>
      </div>

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={coinListBoxPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

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
