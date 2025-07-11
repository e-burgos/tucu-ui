import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { TransactionInfo } from '../../../components/blockchain';
import { StoryContainer } from '../../components/StoryContainer';
import CardContainer from '../../../components/cards/card-container';

const meta: Meta<typeof TransactionInfo> = {
  title: '4. BLOCKCHAIN COMPONENTS/TransactionInfo',
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
  <StoryContainer>
    <TransactionInfo {...args} />
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
  <StoryContainer>
    <CardContainer className="w-full max-w-md max-h-fit flex flex-col gap-2">
      <TransactionInfo label="Network" value="Ethereum" />
      <TransactionInfo label="Gas Price" value="21 Gwei" />
      <TransactionInfo label="Transaction Fee" value="0.005 ETH" />
      <TransactionInfo label="Total Amount" value="1.205 ETH" />
    </CardContainer>
  </StoryContainer>
);
