import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Collapse } from '../../../components/common';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Collapse> = {
  title: 'UI COMPONENTS/Data Display/Collapse',
  tags: ['autodocs'],
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component:
          "The Collapse component is an accordion-style expandable container that can show or hide content with an animated transition. It's useful for FAQs, settings panels, or any place where space needs to be conserved.",
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'The title or label displayed in the header of the collapse component',
    },
    initialOpen: {
      control: 'boolean',
      description:
        'Whether the collapse component should be initially expanded',
    },
    children: {
      control: 'text',
      description:
        'The content to be displayed when the collapse component is expanded',
    },
  },
  args: {
    label: 'Collapse Title',
    initialOpen: false,
    children: (
      <div className="p-5">
        <p>This is the content inside the collapse component.</p>
      </div>
    ),
  },
};

export default meta;

const Template: StoryFn<typeof Collapse> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <Collapse {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const InitiallyOpen = Template.bind({});
InitiallyOpen.args = {
  initialOpen: true,
};

export const LongContent = Template.bind({});
LongContent.args = {
  label: 'Detailed Information',
  children: (
    <div className="p-5">
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
        mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
        neque eu tellus rhoncus ut eleifend nibh porttitor.
      </p>
      <p>
        Ut in nulla enim. Phasellus molestie magna non est bibendum non
        venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
        Mauris iaculis porttitor posuere.
      </p>
    </div>
  ),
};

export const WithList = Template.bind({});
WithList.args = {
  label: 'Features',
  children: (
    <div className="p-5">
      <ul className="list-disc pl-5 space-y-2">
        <li>Responsive design</li>
        <li>Dark mode support</li>
        <li>Accessible components</li>
        <li>Customizable themes</li>
        <li>Performance optimized</li>
      </ul>
    </div>
  ),
};

export const MultipleCollapses = () => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <Collapse label="Section 1" initialOpen={true}>
        <div className="p-5">
          <p>Content for section 1</p>
        </div>
      </Collapse>

      <Collapse label="Section 2">
        <div className="p-5">
          <p>Content for section 2</p>
        </div>
      </Collapse>

      <Collapse label="Section 3">
        <div className="p-5">
          <p>Content for section 3</p>
        </div>
      </Collapse>
    </div>
  </StoryContainer>
);

export const FAQ = () => (
  <StoryContainer>
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>

      <Collapse label="What is Tucu UI?">
        <div className="p-5">
          <p>
            Tucu UI is a React component library that provides a set of
            customizable UI components for building modern web applications.
          </p>
        </div>
      </Collapse>

      <Collapse label="How do I install Tucu UI?">
        <div className="p-5">
          <p className="mb-2">You can install Tucu UI using npm or yarn:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-sm">
            npm install tucu-ui
          </pre>
        </div>
      </Collapse>

      <Collapse label="Is Tucu UI compatible with Next.js?">
        <div className="p-5">
          <p>
            Yes, Tucu UI is fully compatible with Next.js and other React
            frameworks.
          </p>
        </div>
      </Collapse>

      <Collapse label="Is Tucu UI open source?">
        <div className="p-5">
          <p>Yes, Tucu UI is an open-source project available on GitHub.</p>
        </div>
      </Collapse>
    </div>
  </StoryContainer>
);
