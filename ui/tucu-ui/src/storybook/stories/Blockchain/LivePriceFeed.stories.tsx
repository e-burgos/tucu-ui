import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { LivePriceFeed, Price } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import { Bitcoin } from '../../../components/icons/bitcoin';
import { Ethereum } from '../../../components/icons/ethereum';

// Sample price data for charts
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

const meta: Meta<typeof LivePriceFeed> = {
  title: '4. BLOCKCHAIN COMPONENTS/LivePriceFeed',
  tags: ['autodocs'],
  component: LivePriceFeed,
  parameters: {
    docs: {
      description: {
        component:
          'The LivePriceFeed component displays real-time cryptocurrency price information with a price chart.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the price feed',
    },
    name: {
      control: 'text',
      description: 'Name of the cryptocurrency',
    },
    symbol: {
      control: 'text',
      description: 'Symbol of the cryptocurrency',
    },
    icon: {
      description: 'Icon component for the cryptocurrency',
    },
    balance: {
      control: 'text',
      description: 'Current balance of the cryptocurrency',
    },
    usdBalance: {
      control: 'text',
      description: 'Value of the cryptocurrency in USD',
    },
    change: {
      control: 'text',
      description: 'Percentage change in value',
    },
    isChangePositive: {
      control: 'boolean',
      description: 'Whether the price change is positive or negative',
    },
    prices: {
      description: 'Array of price data points for the chart',
    },
    isBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the component',
    },
  },
  args: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: <Bitcoin />,
    balance: '0.2231345',
    usdBalance: '10,123.45',
    change: '2.5%',
    isChangePositive: true,
    prices: bitcoinPrices,
    isBorder: false,
  },
};

export default meta;

const Template: StoryFn<typeof LivePriceFeed> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-3xl">
      <LivePriceFeed {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Negative = Template.bind({});
Negative.args = {
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  icon: <Ethereum />,
  balance: '3.4521',
  usdBalance: '6,218.32',
  change: '1.2%',
  isChangePositive: false,
  prices: ethereumPrices,
};
