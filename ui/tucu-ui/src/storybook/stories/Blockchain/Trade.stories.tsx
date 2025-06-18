import type { Meta, StoryFn } from '@storybook/react-vite';
import { TradeMenu } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof TradeMenu> = {
  title: 'UI COMPONENTS/Blockchain/Trade',
  tags: ['autodocs'],
  component: TradeMenu,
  parameters: {
    docs: {
      description: {
        component:
          'The Trade component provides a UI container for cryptocurrency trading functionality with navigation tabs.',
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof TradeMenu> = (args) => (
  <StoryContainer>
    <TradeMenu {...args}>
      <div className="p-5">
        <h3 className="text-lg font-medium mb-4">Trading Interface</h3>
        <p className="text-gray-500 mb-4">
          This is a placeholder for the trading interface content. The actual
          content will depend on which tab is selected (Swap, Liquidity, or
          Vote).
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm">Selected trading pair: BTC/ETH</p>
          <p className="text-sm">Current price: 14.5 ETH per BTC</p>
        </div>
      </div>
    </TradeMenu>
  </StoryContainer>
);

export const Default = Template.bind({});
