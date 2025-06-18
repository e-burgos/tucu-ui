import type { Meta, StoryFn } from '@storybook/react-vite';
import { TopupButton } from '../../../components/buttons';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof TopupButton> = {
  title: 'UI COMPONENTS/Buttons/TopupButton',
  tags: ['autodocs'],
  component: TopupButton,
  parameters: {
    docs: {
      description: {
        component:
          'The TopupButton is a specialized button component designed for "Top Up Balance" actions, featuring a plus icon, descriptive text, and a forward chevron. Commonly used in cryptocurrency, wallet, or payment interfaces.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the button',
    },
  },
  args: {},
};

export default meta;

const Template: StoryFn<typeof TopupButton> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <TopupButton {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  className:
    'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700',
};

export const InCard = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md rounded-xl bg-white dark:bg-light-dark p-5 shadow-card">
      <h3 className="mb-4 text-lg font-medium">Wallet Balance</h3>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-400">
          Current Balance
        </span>
        <span className="font-medium">$1,250.00</span>
      </div>
      <TopupButton />
    </div>
  </StoryContainer>
);

export const ConstrainedWidth = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-[200px]">
      <TopupButton />
    </div>
  </StoryContainer>
);
