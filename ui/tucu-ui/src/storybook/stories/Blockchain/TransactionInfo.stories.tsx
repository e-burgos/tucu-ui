import type { Meta, StoryFn } from '@storybook/react-vite';
import { TransactionInfo } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof TransactionInfo> = {
  title: 'UI COMPONENTS/Blockchain/TransactionInfo',
  tags: ['autodocs'],
  component: TransactionInfo,
  parameters: {
    docs: {
      description: {
        component:
          'The TransactionInfo component displays a label-value pair for transaction details in a horizontal layout.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the transaction detail',
    },
    value: {
      control: 'text',
      description: 'Value text for the transaction detail',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
  },
  args: {
    label: 'Transaction Fee',
    value: '0.005 ETH',
  },
};

export default meta;

const Template: StoryFn<typeof TransactionInfo> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <TransactionInfo {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithoutValue = Template.bind({});
WithoutValue.args = {
  value: undefined,
  label: 'Pending Amount',
};

export const MultipleInfo: StoryFn<typeof TransactionInfo> = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md bg-white dark:bg-light-dark p-4 rounded-lg">
      <TransactionInfo label="Network" value="Ethereum" className="mb-2" />
      <TransactionInfo label="Gas Price" value="21 Gwei" className="mb-2" />
      <TransactionInfo
        label="Transaction Fee"
        value="0.005 ETH"
        className="mb-2"
      />
      <TransactionInfo label="Total Amount" value="1.205 ETH" />
    </div>
  </StoryContainer>
);
