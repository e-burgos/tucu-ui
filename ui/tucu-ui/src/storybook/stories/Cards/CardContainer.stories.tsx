import type { Meta, StoryFn } from '@storybook/react-vite';
import { CardContainer } from '../../../components/cards/card-container';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof CardContainer> = {
  title: 'UI COMPONENTS/Cards/CardContainer',
  tags: ['autodocs'],
  component: CardContainer,
  parameters: {
    docs: {
      description: {
        component:
          'The CardContainer component is a wrapper that provides consistent styling for card-based UI elements. It includes background, shadow, padding and border radius styling.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to be displayed inside the card container',
    },
  },
  args: {
    children: 'Card content goes here',
  },
};

export default meta;

const Template: StoryFn<typeof CardContainer> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <CardContainer {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'border-2 border-blue-500',
  children: 'Card with custom border styling',
};

export const WithComplexContent = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <CardContainer>
        <div className="w-full">
          <h3 className="text-lg font-bold mb-4">Card Title</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a card with more complex content, including a title, text,
            and action buttons.
          </p>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Confirm
            </button>
          </div>
        </div>
      </CardContainer>
    </div>
  </StoryContainer>
);

export const GridOfCards = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <CardContainer className="bg-blue-50 dark:bg-blue-900/20 gap-4">
        <h3 className="font-bold">Statistics</h3>
        <p className="mt-2">User activity metrics</p>
      </CardContainer>

      <CardContainer className="bg-green-50 dark:bg-green-900/20 gap-4">
        <h3 className="font-bold">Performance</h3>
        <p className="mt-2">System performance metrics</p>
      </CardContainer>

      <CardContainer className="bg-purple-50 dark:bg-purple-900/20 gap-4">
        <h3 className="font-bold">Engagement</h3>
        <p className="mt-2">User engagement data</p>
      </CardContainer>

      <CardContainer className="bg-amber-50 dark:bg-amber-900/20 gap-4">
        <h3 className="font-bold">Revenue</h3>
        <p className="mt-2">Financial information</p>
      </CardContainer>
    </div>
  </StoryContainer>
);

export const NestedCards = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-2xl">
      <CardContainer>
        <h2 className="text-xl font-bold mb-4">Parent Card</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CardContainer className=" bg-white gap-4">
            <h3 className="font-medium">Nested Card 1</h3>
            <p className="mt-2 text-sm">This is a nested card example</p>
          </CardContainer>
          <CardContainer className="bg-gray-50  gap-4">
            <h3 className="font-medium">Nested Card 2</h3>
            <p className="mt-2 text-sm">
              Cards can be nested within other cards
            </p>
          </CardContainer>
        </div>
      </CardContainer>
    </div>
  </StoryContainer>
);
