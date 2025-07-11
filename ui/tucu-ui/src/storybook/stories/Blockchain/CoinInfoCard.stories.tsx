import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { CoinInfoCard } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

// @ts-expect-error - Image is not a valid module
import bitcoinImg from '../../../assets/images/coin/bitcoin.svg';
// @ts-expect-error - Image is not a valid module
import cardanoImg from '../../../assets/images/coin/cardano.svg';

const sampleItem = {
  id: '1',
  name: 'Bitcoin',
  logo: bitcoinImg,
  balance: '0.23456 BTC',
  coinType: 'Cryptocurrency',
};

const sampleItem2 = {
  id: '2',
  name: 'Cardano',
  logo: cardanoImg,
  balance: '2.3456 ADA',
};

const meta: Meta<typeof CoinInfoCard> = {
  title: '4. BLOCKCHAIN COMPONENTS/CoinInfoCard',
  tags: ['autodocs'],
  component: CoinInfoCard,
  parameters: {
    docs: {
      description: {
        component:
          'The ListCard component displays cryptocurrency information in a compact horizontal list item format.',
      },
    },
  },
  argTypes: {
    item: {
      description:
        'Item data object with name, logo, balance and optional coinType',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    variant: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
    },
  },
  args: {
    item: sampleItem,
    variant: 'medium',
    className: 'p-3 tracking-wider rounded-lg sm:p-4',
  },
};

export default meta;

const Template: StoryFn<typeof CoinInfoCard> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <CoinInfoCard {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  variant: 'small',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'large',
};

export const WithoutCoinType = Template.bind({});
WithoutCoinType.args = {
  item: sampleItem2,
};
