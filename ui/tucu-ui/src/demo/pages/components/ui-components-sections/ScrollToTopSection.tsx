import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  ScrollToTop,
} from '../../../../index';

const ScrollToTopSection: React.FC = () => {
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'top',
      type: 'string | number',
      default: 'undefined',
      description:
        'Distance from the top of the viewport (in pixels or Tailwind class). If undefined, uses bottom instead.',
    },
    {
      prop: 'right',
      type: 'string | number',
      default: '24',
      description:
        'Distance from the right of the viewport (in pixels or Tailwind class).',
    },
    {
      prop: 'bottom',
      type: 'string | number',
      default: '24',
      description:
        'Distance from the bottom of the viewport (in pixels or Tailwind class).',
    },
    {
      prop: 'left',
      type: 'string | number',
      default: 'undefined',
      description:
        'Distance from the left of the viewport (in pixels or Tailwind class). If undefined, uses right instead.',
    },
    {
      prop: 'showAfter',
      type: 'number',
      default: '400',
      description: 'Minimum scroll position (in pixels) to show the button.',
    },
    {
      prop: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Size of the button.',
    },
    {
      prop: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Custom className for the button.',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ScrollToTop
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A utility component that displays a floating button to scroll back to
          the top of the page. It automatically scrolls to top when the route
          changes and shows a button when the user scrolls down.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Usage
                </Typography>
                <Typography tag="p" className="mb-4">
                  Add this component to your router or app component. By
                  default, it displays a button in the bottom-right corner (24px
                  from edges) that appears when you scroll down more than 400px.
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  The button automatically scrolls to the top when clicked and
                  also scrolls to top whenever the route changes.
                </Typography>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  {/* <ScrollToTop /> */}
                  <Typography tag="p" className="text-sm">
                    Scroll down on this page to see the button appear in the
                    bottom-right corner.
                  </Typography>
                </div>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Position
                </Typography>
                <Typography tag="p" className="mb-4">
                  You can customize the button position using the position
                  props.
                </Typography>
                <div className="space-y-2 text-sm">
                  <Typography tag="p">
                    <code className="text-brand">top-left:</code>{' '}
                    <code>{'<ScrollToTop top={20} left={20} />'}</code>
                  </Typography>
                  <Typography tag="p">
                    <code className="text-brand">top-right:</code>{' '}
                    <code>{'<ScrollToTop top={20} right={20} />'}</code>
                  </Typography>
                  <Typography tag="p">
                    <code className="text-brand">bottom-left:</code>{' '}
                    <code>{'<ScrollToTop bottom={20} left={20} />'}</code>
                  </Typography>
                  <Typography tag="p">
                    <code className="text-brand">bottom-right:</code>{' '}
                    <code>{'<ScrollToTop bottom={20} right={20} />'}</code>
                  </Typography>
                </div>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Size and Threshold
                </Typography>
                <Typography tag="p" className="mb-4">
                  Control when the button appears and its size.
                </Typography>
                <div className="space-y-2 text-sm">
                  <Typography tag="p">
                    <code className="text-brand">Small button:</code>{' '}
                    <code>{'<ScrollToTop size="small" />'}</code>
                  </Typography>
                  <Typography tag="p">
                    <code className="text-brand">Large button:</code>{' '}
                    <code>{'<ScrollToTop size="large" />'}</code>
                  </Typography>
                  <Typography tag="p">
                    <code className="text-brand">Show after 200px:</code>{' '}
                    <code>{'<ScrollToTop showAfter={200} />'}</code>
                  </Typography>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ScrollToTop } from '@e-burgos/tucu-ui';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Default: bottom-right, 24px from edges */}
      <ScrollToTop />
      
      {/* Custom position: top-left */}
      <ScrollToTop top={20} left={20} />
      
      {/* Custom size and threshold */}
      <ScrollToTop size="large" showAfter={200} />
      
      {/* Custom position with all props */}
      <ScrollToTop
        bottom={32}
        right={32}
        size="small"
        showAfter={300}
        className="custom-class"
      />
      
      {/* Your routes */}
    </BrowserRouter>
  );
}

// The component:
// - Displays a floating button when user scrolls down
// - Automatically scrolls to top when route changes
// - Uses smooth scrolling behavior
// - Works with React Router
// - Button appears after scrolling showAfter pixels (default: 400px)
// - Position is fixed, customizable via props`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ScrollToTopSection;
