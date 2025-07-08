import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { SimpleBar } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof SimpleBar> = {
  title: 'UI COMPONENTS/Utils/SimpleBar',
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
  <StoryContainer>
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
