import type { Meta, StoryFn } from '@storybook/react-vite';
import { Paper } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Paper> = {
  title: 'UI COMPONENTS/Common/Paper',
  tags: ['autodocs'],
  component: Paper,
  parameters: {
    docs: {
      description: {
        component:
          'The Paper component is a simple container that provides a relative positioning context for its children. It can be used as a base building block for other components.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to be displayed inside the Paper component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling the Paper component',
    },
  },
  args: {
    children: 'Paper content',
  },
};

export default meta;

const Template: StoryFn<typeof Paper> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Paper {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithStyling = Template.bind({});
WithStyling.args = {
  className: 'p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md',
  children: 'Styled Paper component',
};

export const WithAbsoluteChildren = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Paper className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full">
          Top Right
        </div>
        <div className="absolute bottom-2 left-2 bg-green-500 text-white p-2 rounded-full">
          Bottom Left
        </div>
        <div className="h-full flex items-center justify-center">
          Main Content
        </div>
      </Paper>
    </div>
  </StoryContainer>
);

export const WithOverlay = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Paper className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="h-full flex items-center justify-center p-4">
          Content with Overlay
        </div>
        <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            Overlay Content
          </div>
        </div>
      </Paper>
    </div>
  </StoryContainer>
);

export const CardWithBadge = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <Paper className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
        <div className="absolute -top-3 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
          New
        </div>
        <h3 className="text-lg font-medium mb-2">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This card demonstrates using Paper for relative positioning of a
          badge.
        </p>
      </Paper>
    </div>
  </StoryContainer>
);

export const MultipleUses = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <Paper className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Basic Card</h3>
        <p className="text-gray-600 dark:text-gray-300">
          A simple card using Paper
        </p>
      </Paper>

      <Paper className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          ⋮
        </div>
        <h3 className="text-lg font-medium mb-2">With Menu</h3>
        <p className="text-gray-600 dark:text-gray-300">Card with menu icon</p>
      </Paper>

      <Paper className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="absolute -top-3 left-3 bg-blue-100 dark:bg-blue-800 px-2 py-0.5 text-xs rounded-sm">
          Info
        </div>
        <p className="text-blue-700 dark:text-blue-300 mt-1">
          This is an information message.
        </p>
      </Paper>

      <Paper className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="h-24 bg-linear-to-r from-purple-500 to-pink-500"></div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">With Header</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Card with gradient header
          </p>
        </div>
      </Paper>
    </div>
  </StoryContainer>
);
