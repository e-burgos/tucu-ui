import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Price, PriceFeedSlider } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import { Bitcoin } from '../../../components/icons/bitcoin';
import { Ethereum } from '../../../components/icons/ethereum';
import { Doge } from '../../../components/icons/doge';
import { Cardano } from '../../../components/icons/cardano';

const generatePriceData = (
  count: number,
  startValue: number,
  isPositive: boolean
) => {
  const result: Price[] = [];
  let value = startValue;

  for (let i = 0; i < count; i++) {
    // Generate some random movement but with overall trend in the desired direction
    const change =
      Math.random() * 5 * (isPositive ? 1 : -1) + (isPositive ? 2 : -2);
    value = Math.max(1, value + change); // Ensure value doesn't go below 1
    result.push({ name: i, value: Number(value.toFixed(2)) });
  }

  return result;
};

const bitcoinPrices = generatePriceData(20, 100, true);
const ethereumPrices = generatePriceData(20, 80, false);
const cardanoPrices = generatePriceData(20, 60, true);
const dogecoinPrices = generatePriceData(20, 40, false);

const meta: Meta<typeof PriceFeedSlider> = {
  title: '4. BLOCKCHAIN COMPONENTS/PriceFeedSlider',
  tags: ['autodocs'],
  component: PriceFeedSlider,
  parameters: {
    docs: {
      description: {
        component:
          'The PriceFeedSlider component displays a slider of LivePriceFeed components.',
      },
    },
  },
  argTypes: {
    limit: {
      control: 'number',
      description: 'Number of price feeds to display',
    },
    gridClassName: {
      control: 'text',
      description: 'Class name for the grid container',
    },
    priceFeeds: {
      description: 'Array of price feed data',
    },
  },
  args: {
    limit: 4,
    gridClassName: 'grid-cols-4',
    priceFeeds: [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: <Bitcoin />,
        balance: '0.2231345',
        usdBalance: '10,123.45',
        change: '2.5%',
        isChangePositive: true,
        prices: bitcoinPrices,
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: <Ethereum />,
        balance: '0.2231345',
        usdBalance: '10,123.45',
        change: '2.5%',
        isChangePositive: true,
        prices: ethereumPrices,
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        icon: <Cardano />,
        balance: '0.2231345',
        usdBalance: '10,123.45',
        change: '2.5%',
        isChangePositive: true,
        prices: cardanoPrices,
      },
      {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        icon: <Doge />,
        balance: '0.2231345',
        usdBalance: '10,123.45',
        change: '2.5%',
        isChangePositive: true,
        prices: dogecoinPrices,
      },
    ],
  },
};

export default meta;

const Template: StoryFn<typeof PriceFeedSlider> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-3xl">
      <PriceFeedSlider {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Negative = Template.bind({});
Negative.args = {
  limit: 4,
  gridClassName: 'grid-cols-4',
  priceFeeds: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: <Bitcoin />,
      balance: '0.2231345',
      usdBalance: '10,123.45',
      change: '2.5%',
      isChangePositive: false,
      prices: bitcoinPrices,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: <Ethereum />,
      balance: '0.2231345',
      usdBalance: '10,123.45',
      change: '2.5%',
      isChangePositive: false,
      prices: ethereumPrices,
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      icon: <Cardano />,
      balance: '0.2231345',
      usdBalance: '10,123.45',
      change: '2.5%',
      isChangePositive: false,
      prices: cardanoPrices,
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      icon: <Doge />,
      balance: '0.2231345',
      usdBalance: '10,123.45',
      change: '2.5%',
      isChangePositive: false,
      prices: dogecoinPrices,
    },
  ],
};
