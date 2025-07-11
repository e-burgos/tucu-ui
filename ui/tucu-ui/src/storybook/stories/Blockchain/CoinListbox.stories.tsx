import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import CoinListBox, {
  CoinTypes,
} from '../../../components/blockchain/coin-listbox';
import { StoryContainer } from '../../components/StoryContainer';
import { Bitcoin } from '../../../components/icons/bitcoin';
import { Ethereum } from '../../../components/icons/ethereum';
import { Tether } from '../../../components/icons/tether';

const coinOptions: CoinTypes[] = [
  {
    icon: <Bitcoin />,
    code: 'BTC',
    name: 'Bitcoin',
    price: 29750.31,
  },
  {
    icon: <Ethereum />,
    code: 'ETH',
    name: 'Ethereum',
    price: 2024.2,
  },
  {
    icon: <Tether />,
    code: 'USDT',
    name: 'Tether USD',
    price: 1.0,
  },
];

const meta: Meta<typeof CoinListBox> = {
  title: '4. BLOCKCHAIN COMPONENTS/CoinListbox',
  tags: ['autodocs'],
  component: CoinListBox,
  parameters: {
    docs: {
      description: {
        component:
          'The CoinListbox component provides a dropdown selector for cryptocurrencies with icons and additional information.',
      },
    },
  },
  argTypes: {
    coins: {
      description: 'Array of available coins to select from',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    selectedCoin: {
      description: 'The currently selected coin',
    },
    setSelectedCoin: {
      description: 'Function to handle coin selection change',
      action: 'Coin selected',
    },
  },
  args: {
    className: 'w-full max-w-[292px]',
    coins: coinOptions,
    disabled: false,
  },
};

export default meta;

const Template: StoryFn<typeof CoinListBox> = (args) => {
  const [selectedCoin, setSelectedCoin] = useState<CoinTypes>(coinOptions[0]);

  return (
    <StoryContainer>
      <div className="w-full max-w-[292px]">
        <CoinListBox
          {...args}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};
