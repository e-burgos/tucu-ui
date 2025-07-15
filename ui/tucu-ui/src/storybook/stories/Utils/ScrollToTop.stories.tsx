import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta = {
  title: '3. UI COMPONENTS/Utils/ScrollToTop',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A utility component that automatically scrolls to the top of the page when the route changes. This component renders nothing visible but provides smooth scrolling behavior for better user experience during navigation.',
      },
    },
  },
};

export default meta;

// Demo wrapper component to simulate scroll behavior
const ScrollToTopDemo = () => {
  const [currentRoute, setCurrentRoute] = useState('/page1');

  // Simulate the scroll-to-top behavior manually
  const simulateScrollToTop = (newRoute: string) => {
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative space-y-6">
      <div className="sticky top-0 left-0 w-full bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
          ScrollToTop Demo
        </h3>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          Current route:{' '}
          <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
            {currentRoute}
          </code>
        </p>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          Click the buttons below to simulate route changes and see the
          scroll-to-top behavior:
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => simulateScrollToTop('/page1')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Page 1
          </button>
          <button
            onClick={() => simulateScrollToTop('/page2')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Page 2
          </button>
          <button
            onClick={() => simulateScrollToTop('/page3')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Page 3
          </button>
        </div>
      </div>

      {/* Long content to demonstrate scrolling */}
      <div className="space-y-6">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Content Section {i + 1}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              This is a demonstration of long content that requires scrolling.
              The ScrollToTop component will automatically scroll to the top
              when the route changes, providing a better user experience.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Template: StoryFn = () => (
  <StoryContainer className="flex justify-start items-center">
    <ScrollToTopDemo />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story:
        'Basic demonstration of the ScrollToTop component behavior. Click the route buttons to simulate navigation and observe the smooth scroll to top behavior.',
    },
  },
};

export const WithLongContent = Template.bind({});
WithLongContent.parameters = {
  docs: {
    description: {
      story:
        'Demonstration with extensive content to better showcase the scroll-to-top functionality. Scroll down and then click the route buttons to see the effect.',
    },
  },
};
