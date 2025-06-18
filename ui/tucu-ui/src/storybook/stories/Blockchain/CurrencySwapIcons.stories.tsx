import type { Meta, StoryFn } from '@storybook/react-vite';
import {
  CurrencySwapIcons,
  CoinList,
} from '../../../components/blockchain/currency-swap-icons';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof CurrencySwapIcons> = {
  title: 'UI COMPONENTS/Blockchain/CurrencySwapIcons',
  tags: ['autodocs'],
  component: CurrencySwapIcons,
  parameters: {
    docs: {
      description: {
        component:
          'The CurrencySwapIcons component displays a pair of cryptocurrency icons representing a trading pair.',
      },
    },
  },
  argTypes: {
    from: {
      control: 'select',
      options: ['BTC', 'ETH', 'USDT', 'BNB', 'USDC', 'ADA', 'DOGE'],
      description: 'Source cryptocurrency',
    },
    to: {
      control: 'select',
      options: ['BTC', 'ETH', 'USDT', 'BNB', 'USDC', 'ADA', 'DOGE'],
      description: 'Target cryptocurrency',
    },
  },
  args: {
    from: 'BTC' as CoinList,
    to: 'ETH' as CoinList,
  },
};

export default meta;

const Template: StoryFn<typeof CurrencySwapIcons> = (args) => (
  <StoryContainer className="justify-center items-center">
    <CurrencySwapIcons {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const StablecoinPair = Template.bind({});
StablecoinPair.args = {
  from: 'USDT',
  to: 'USDC',
};

export const AltcoinPair = Template.bind({});
AltcoinPair.args = {
  from: 'ADA',
  to: 'DOGE',
};
