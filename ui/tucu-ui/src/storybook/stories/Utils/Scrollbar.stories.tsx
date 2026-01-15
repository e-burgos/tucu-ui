import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Scrollbar } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Scrollbar> = {
  title: '3. UI COMPONENTS/Utils/Scrollbar',
  tags: ['autodocs'],
  component: Scrollbar,
  parameters: {
    docs: {
      description: {
        component:
          'A custom scrollbar component built without external dependencies. Provides consistent scrollbar styling across browsers and platforms with customizable appearance and behavior.',
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
      description: 'CSS styles to apply to the scrollbar container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    autoHide: {
      control: 'select',
      options: ['never', 'scroll', 'leave', 'move'],
      description: 'Control when scrollbar should be hidden',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scrollbar direction',
    },
    scrollbarStyle: {
      control: 'object',
      description: 'Custom styles for scrollbar track and thumb',
    },
  },
};

export default meta;

const Template: StoryFn<typeof Scrollbar> = (args) => (
  <StoryContainer>
    <Scrollbar {...args}>
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Item {i + 1}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is content item {i + 1} to demonstrate scrolling
              functionality. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
          </div>
        ))}
      </div>
    </Scrollbar>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  style: { height: '400px' },
  autoHide: 'scroll',
  direction: 'vertical',
};

export const AlwaysVisible = Template.bind({});
AlwaysVisible.args = {
  style: { height: '400px' },
  autoHide: 'never',
  direction: 'vertical',
};

export const HorizontalScroll = Template.bind({});
HorizontalScroll.args = {
  style: { width: '400px', height: '200px' },
  autoHide: 'scroll',
  direction: 'horizontal',
  children: (
    <div className="flex space-x-4 p-4" style={{ width: '800px' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="shrink-0 w-48 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Card {i + 1}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Horizontal scrolling content
          </p>
        </div>
      ))}
    </div>
  ),
};

export const BothDirections = Template.bind({});
BothDirections.args = {
  style: { width: '400px', height: '300px' },
  autoHide: 'move',
  direction: 'both',
  children: (
    <div className="grid grid-cols-4 gap-4 p-4" style={{ width: '800px' }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center"
        >
          <span className="text-gray-900 dark:text-white font-medium">
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  style: { height: '400px' },
  autoHide: 'scroll',
  direction: 'vertical',
  scrollbarStyle: {
    track: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '8px',
    },
    thumb: {
      backgroundColor: 'rgb(59, 130, 246)',
      borderRadius: '8px',
    },
  },
};

export const OnHoverShow = Template.bind({});
OnHoverShow.args = {
  style: { height: '400px' },
  autoHide: 'move',
  direction: 'vertical',
};

export const OnLeaveHide = Template.bind({});
OnLeaveHide.args = {
  style: { height: '400px' },
  autoHide: 'leave',
  direction: 'vertical',
};
