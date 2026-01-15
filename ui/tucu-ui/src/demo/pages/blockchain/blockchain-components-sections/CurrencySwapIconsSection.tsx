import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  CurrencySwapIcons,
} from '../../../../index';

const CurrencySwapIconsSection: React.FC = () => {
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

  // CurrencySwapIcons props data
  const currencySwapIconsPropsData = [
    {
      prop: 'from',
      type: "CoinList ('BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE')",
      default: 'required',
      description: 'Source currency',
    },
    {
      prop: 'to',
      type: "CoinList ('BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE')",
      default: 'required',
      description: 'Target currency',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          CurrencySwapIcons
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Component for displaying currency swap pairs with overlapping icons
          and pair label.
        </Typography>
      </div>

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={currencySwapIconsPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

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
