import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CoinCard } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

// @ts-expect-error - Image is not a valid module
import binanceImg from '../../../assets/images/coin/binance.svg';

const meta: Meta<typeof CoinCard> = {
  title: '4. BLOCKCHAIN COMPONENTS/CoinCard',
  tags: ['autodocs'],
  component: CoinCard,
  parameters: {
    docs: {
      description: {
        component:
          'The CoinCard component displays cryptocurrency information including name, symbol, balance, and price change.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the coin',
    },
    name: {
      control: 'text',
      description: 'Name of the cryptocurrency',
    },
    symbol: {
      control: 'text',
      description: 'Symbol of the cryptocurrency',
    },
    logo: {
      control: 'text',
      description: 'URL to the cryptocurrency logo',
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
    color: {
      control: 'color',
      description: 'Background color of the card',
    },
  },
  args: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: binanceImg,
    balance: '0.2231345',
    usdBalance: '10,123.45',
    change: '2.5%',
    isChangePositive: true,
    color: '#FDEDD4',
  },
};

export default meta;

const Template: StoryFn<typeof CoinCard> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-sm">
      <CoinCard {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const NegativeChange = Template.bind({});
NegativeChange.args = {
  isChangePositive: false,
  change: '1.8%',
  color: '#FDE4E4',
};
