import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ScrollToTop,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ScrollToTopSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="ScrollToTop"
        description="A utility component that displays a floating button to scroll back to
          the top of the page. It automatically scrolls to top when the route
          changes and shows a button when the user scrolls down."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ArrowUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="ScrollToTop"
        defaultValues={{
          size: 'large',
          showAfter: 400,
          bottom: '45%',
          right: 50,
          behavior: 'smooth',
        }}
        excludeProps={['scrollContainer']}
      >
        {(props) => <ScrollToTop {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="ScrollToTop" />

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
