import type { Meta, StoryFn } from '@storybook/react-vite';
import { SimpleBar } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof SimpleBar> = {
  title: 'UI COMPONENTS/Common/SimpleBar',
  tags: ['autodocs'],
  component: SimpleBar,
  parameters: {
    docs: {
      description: {
        component:
          'The SimpleBar component provides a custom scrollbar that looks consistent across browsers and platforms. It is a thin wrapper around the simplebar-react library.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content to be displayed inside the scrollable area',
    },
    style: {
      control: 'object',
      description: 'CSS styles to apply to the SimpleBar component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    style: { maxHeight: '200px' },
    children: <div className="p-4">Scrollable content goes here</div>,
  },
};

export default meta;

const Template: StoryFn<typeof SimpleBar> = (args) => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md">
      <SimpleBar {...args} />
    </div>
  </StoryContainer>
);

// Create a long text content for the examples
const LongContent = () => (
  <div className="p-4">
    <h3 className="text-lg font-medium mb-4">Scrollable Content</h3>
    {[...Array(10)].map((_, i) => (
      <p key={i} className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
        mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
        neque eu tellus rhoncus ut eleifend nibh porttitor.
      </p>
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <LongContent />,
};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  style: { maxHeight: '300px' },
  children: <LongContent />,
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  style: { maxHeight: '200px', width: '350px' },
  children: <LongContent />,
};

export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  style: { maxHeight: '200px' },
  className: 'bg-gray-100 dark:bg-gray-800 rounded-lg',
  children: <LongContent />,
};

export const CardWithScroll = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium">Card with Scrollable Content</h3>
      </div>
      <SimpleBar style={{ maxHeight: '250px' }}>
        <div className="p-4 bg-white dark:bg-gray-800">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0"
            >
              <h4 className="font-medium mb-1">Item {i + 1}</h4>
              <p className="text-gray-600 dark:text-gray-400">
                This is a scrollable item within a card. SimpleBar provides a
                consistent scrollbar experience across different browsers and
                platforms.
              </p>
            </div>
          ))}
        </div>
      </SimpleBar>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          View All
        </button>
      </div>
    </div>
  </StoryContainer>
);

export const TwoColumnLayout = () => (
  <StoryContainer className="justify-center items-center">
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium">Left Panel</h3>
        </div>
        <SimpleBar style={{ height: '300px' }}>
          <div className="p-3">
            <ul className="space-y-2">
              {[...Array(15)].map((_, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                >
                  Item {i + 1}
                </li>
              ))}
            </ul>
          </div>
        </SimpleBar>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium">Right Panel</h3>
        </div>
        <SimpleBar style={{ height: '300px' }}>
          <div className="p-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0"
              >
                <h4 className="font-medium mb-1">Content {i + 1}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  This is a detailed description of the content. It provides
                  more information about the item selected from the left panel.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Additional details can be provided here to give more context
                  to the user.
                </p>
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  </StoryContainer>
);
