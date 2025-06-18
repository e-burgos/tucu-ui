import type { Meta, StoryFn } from '@storybook/react-vite';
import { CardTitle, CardContainer } from '../../../components/cards';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof CardTitle> = {
  title: 'UI COMPONENTS/Cards/CardTitle',
  tags: ['autodocs'],
  component: CardTitle,
  parameters: {
    docs: {
      description: {
        component:
          "The CardTitle component provides a styled container with an optional title that floats over the top border. It's designed to be used as a section header or to group related content together.",
      },
    },
  },
  argTypes: {
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the card title container',
    },
    title: {
      control: 'text',
      description: 'The title text to display at the top of the container',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to be displayed inside the card title container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
    },
  },
  args: {
    border: true,
    title: 'Section Title',
    children: 'Card content goes here',
  },
};

export default meta;

const Template: StoryFn<typeof CardTitle> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <CardTitle {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
  border: false,
  title: 'Borderless Title',
  children: 'This card has no border, only the title is visible.',
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  title: undefined,
  children: 'This card has a border but no title floating above it.',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'bg-blue-50 dark:bg-blue-900/20',
  title: 'Custom Styled',
  children: 'This card has custom background styling.',
};

export const WithComplexContent = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <CardTitle title="User Statistics">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Total Users
            </span>
            <span className="font-medium">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Active Users
            </span>
            <span className="font-medium">857</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              New Signups
            </span>
            <span className="font-medium">42</span>
          </div>
        </div>
      </CardTitle>
    </div>
  </StoryContainer>
);

export const CustomTitleStyles = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md space-y-6">
      <CardTitle
        title="Primary"
        className="border-blue-500 dark:border-blue-700"
      >
        <p className="py-2">Card with a primary color border</p>
      </CardTitle>

      <CardTitle
        title="Success"
        className="border-green-500 dark:border-green-700"
      >
        <p className="py-2">Card with a success color border</p>
      </CardTitle>

      <CardTitle
        title="Warning"
        className="border-yellow-500 dark:border-yellow-700"
      >
        <p className="py-2">Card with a warning color border</p>
      </CardTitle>

      <CardTitle title="Danger" className="border-red-500 dark:border-red-700">
        <p className="py-2">Card with a danger color border</p>
      </CardTitle>
    </div>
  </StoryContainer>
);
