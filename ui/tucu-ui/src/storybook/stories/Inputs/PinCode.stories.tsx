import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { PinCode } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof PinCode> = {
  title: 'UI COMPONENTS/Inputs/PinCode',
  tags: ['autodocs'],
  component: PinCode,
  parameters: {
    docs: {
      description: {
        component:
          'The PinCode component allows users to enter a sequence of digits or characters, commonly used for verification codes, passwords, and other security inputs.',
      },
    },
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of input fields in the pin code',
    },
    type: {
      control: 'select',
      options: ['text', 'number'],
      description: 'Type of input: text or number',
    },
    mask: {
      control: 'boolean',
      description: 'Whether to mask the input (like a password)',
    },
    center: {
      control: 'boolean',
      description: 'Whether to center the pin code inputs horizontally',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character for empty inputs',
    },
    size: {
      control: 'select',
      options: ['sm', 'DEFAULT', 'lg', 'xl'],
      description: 'Size of the input fields',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'DEFAULT', 'lg', 'full'],
      description: 'Border radius of the input fields',
    },
    variant: {
      control: 'select',
      options: ['outline', 'flat', 'active'],
      description: 'Visual style variant of the input fields',
    },
    color: {
      control: 'select',
      options: [
        'DEFAULT',
        'primary',
        'secondary',
        'danger',
        'info',
        'success',
        'warning',
      ],
      description: 'Color theme of the input fields',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input fields',
    },
  },
  args: {
    length: 4,
    type: 'text',
    mask: false,
    center: true,
    placeholder: '○',
    size: 'DEFAULT',
    rounded: 'DEFAULT',
    variant: 'outline',
    color: 'DEFAULT',
  },
};

export default meta;

const Template: StoryFn<typeof PinCode> = (args) => {
  const [value, setValue] = React.useState<string | number | undefined>();

  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <PinCode {...args} setValue={setValue} />
        {value && (
          <div className="mt-4 text-center">
            Value: <span className="font-mono">{value}</span>
          </div>
        )}
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const SixDigit = Template.bind({});
SixDigit.args = {
  length: 6,
};

export const Masked = Template.bind({});
Masked.args = {
  mask: true,
};

export const NumberType = Template.bind({});
NumberType.args = {
  type: 'number',
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: '_',
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

export const RoundedFull = Template.bind({});
RoundedFull.args = {
  rounded: 'full',
};

export const FlatVariant = Template.bind({});
FlatVariant.args = {
  variant: 'flat',
};

export const ActiveVariant = Template.bind({});
ActiveVariant.args = {
  variant: 'active',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  color: 'primary',
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Invalid verification code',
};

export const VerificationExample = () => {
  const [pin, setPin] = React.useState<string | number | undefined>();
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const handleVerify = () => {
    setError(undefined);
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, only "1234" is considered valid
      if (pin === '1234') {
        setIsVerified(true);
      } else {
        setError('Invalid verification code. Try 1234.');
      }
    }, 1500);
  };

  const handleReset = () => {
    setPin(undefined);
    setIsVerified(false);
    setError(undefined);
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Verification Code
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please enter the 4-digit code sent to your phone
        </p>

        {isVerified ? (
          <div className="text-center p-4">
            <div className="text-green-500 text-2xl mb-2">✓</div>
            <p className="font-medium text-green-500">
              Verification successful!
            </p>
            <button
              onClick={handleReset}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <PinCode
              length={4}
              type="text"
              variant="active"
              color="primary"
              size="lg"
              setValue={setPin}
              error={error}
            />

            <button
              onClick={handleVerify}
              disabled={!pin || pin.toString().length !== 4 || isVerifying}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                pin && pin.toString().length === 4 && !isVerifying
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        )}
      </div>
    </StoryContainer>
  );
};

export const PasswordExample = () => {
  const [pin, setPin] = React.useState<string | number | undefined>();

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Enter PIN</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please enter your 6-digit security PIN
        </p>

        <PinCode
          length={6}
          type="number"
          mask={true}
          variant="outline"
          color="secondary"
          size="DEFAULT"
          rounded="full"
          setValue={setPin}
        />

        <div className="flex space-x-4">
          <button className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button
            disabled={!pin || pin.toString().length !== 6}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              pin && pin.toString().length === 6
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </StoryContainer>
  );
};
