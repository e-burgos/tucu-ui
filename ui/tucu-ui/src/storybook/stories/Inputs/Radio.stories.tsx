import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Radio } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Radio> = {
  title: '3. UI COMPONENTS/Inputs/Radio',
  tags: ['autodocs'],
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'The Radio component allows users to select one option from a set. Radio buttons are typically used when there are 2-5 options.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the radio button',
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the label relative to the radio button',
    },
    variant: {
      control: 'select',
      options: ['outline', 'flat', 'active'],
      description: 'Visual style variant of the radio button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the radio button',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info', 'success', 'warning'],
      description: 'Color theme of the radio button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component container',
    },
  },
  args: {
    label: 'Radio button label',
    variant: 'outline',
    size: 'md',
    color: 'primary',
    labelPlacement: 'end',
  },
};

export default meta;

const Template: StoryFn<typeof Radio> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || false);

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <Radio
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  disabled: true,
  checked: true,
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Please select an option',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'Additional information about this option',
};

export const LabelStart = Template.bind({});
LabelStart.args = {
  labelPlacement: 'start',
};

export const FlatVariant = Template.bind({});
FlatVariant.args = {
  variant: 'flat',
};

export const ActiveVariant = Template.bind({});
ActiveVariant.args = {
  variant: 'active',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: 'lg',
};

export const ExtraLargeSize = Template.bind({});
ExtraLargeSize.args = {
  size: 'xl',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  color: 'primary',
  checked: true,
};

export const DangerColor = Template.bind({});
DangerColor.args = {
  color: 'danger',
  checked: true,
};

export const RadioGroup = () => {
  const [selectedOption, setSelectedOption] = React.useState('option1');

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ];

  return (
    <StoryContainer>
      <div className="w-full max-w-md p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Select one option:</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <Radio
              key={option.id}
              name="radio-group-example"
              label={option.label}
              checked={selectedOption === option.id}
              onChange={() => handleRadioChange(option.id)}
            />
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p>
            Selected option:{' '}
            {options.find((o) => o.id === selectedOption)?.label || 'None'}
          </p>
        </div>
      </div>
    </StoryContainer>
  );
};

export const FormExample = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('');

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

        <div className="space-y-3">
          <Radio
            name="payment-method"
            label="Credit Card"
            checked={paymentMethod === 'credit_card'}
            onChange={() => setPaymentMethod('credit_card')}
            color="primary"
          />

          <Radio
            name="payment-method"
            label="PayPal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
            color="primary"
          />

          <Radio
            name="payment-method"
            label="Bank Transfer"
            checked={paymentMethod === 'bank_transfer'}
            onChange={() => setPaymentMethod('bank_transfer')}
            color="primary"
          />
        </div>

        {!paymentMethod && (
          <p className="text-red-500 text-sm">Please select a payment method</p>
        )}

        <button
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            paymentMethod
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!paymentMethod}
        >
          Continue to Payment
        </button>
      </div>
    </StoryContainer>
  );
};
