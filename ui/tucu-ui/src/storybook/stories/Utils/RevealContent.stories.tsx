import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { RevealContent } from '../../../components/utils';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof RevealContent> = {
  title: '3. UI COMPONENTS/Utils/RevealContent',
  tags: ['autodocs'],
  component: RevealContent,
  parameters: {
    docs: {
      description: {
        component:
          'A component that initially shows content up to a specified height and provides a "Show More" button to reveal the full content. Perfect for long text, descriptions, or any content that needs progressive disclosure.',
      },
    },
  },
  argTypes: {
    defaultHeight: {
      control: 'number',
      description:
        'The initial height in pixels before showing the "Show More" button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
    children: {
      control: 'text',
      description: 'The content to be revealed',
    },
  },
};

export default meta;

const Template: StoryFn<typeof RevealContent> = (args) => (
  <StoryContainer>
    <RevealContent {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  defaultHeight: 100,
  children: (
    <div className="text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold mb-4">Long Content Example</h3>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p className="mb-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p className="mb-4">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <p className="mb-4">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </p>
    </div>
  ),
};

export const ShortContent = Template.bind({});
ShortContent.args = {
  defaultHeight: 200,
  children: (
    <div className="text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold mb-4">Short Content</h3>
      <p>
        This is a short content that doesn't exceed the default height, so no
        "Show More" button will be displayed.
      </p>
    </div>
  ),
};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  defaultHeight: 150,
  children: (
    <div className="text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold mb-4">Custom Height Example</h3>
      <p className="mb-4">
        This example uses a custom height of 150px. The content will be clipped
        at this height and show a "Show More" button.
      </p>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <p className="mb-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident.
      </p>
    </div>
  ),
};

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  defaultHeight: 120,
  className:
    'bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800',
  children: (
    <div className="text-blue-900 dark:text-blue-100">
      <h3 className="text-lg font-semibold mb-4">Styled Content</h3>
      <p className="mb-4">
        This example shows how to apply custom styling to the RevealContent
        component using the className prop.
      </p>
      <p className="mb-4">
        The background, padding, and border styles are applied to create a
        visually distinct container for the content.
      </p>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  ),
};

export const ListContent = Template.bind({});
ListContent.args = {
  defaultHeight: 100,
  children: (
    <div className="text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold mb-4">Feature List</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Responsive design with mobile-first approach
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          TypeScript support for better development experience
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Dark mode support with automatic theme switching
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Accessibility features following WCAG guidelines
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Customizable styling with Tailwind CSS
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Comprehensive component library
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Performance optimized with lazy loading
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Extensive documentation and examples
        </li>
      </ul>
    </div>
  ),
};
