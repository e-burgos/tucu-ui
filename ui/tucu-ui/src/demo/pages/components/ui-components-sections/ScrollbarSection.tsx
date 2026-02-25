import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Scrollbar,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ScrollbarSection: React.FC = () => {
  const longContent = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="p-4 border-b">
      <Typography tag="p">Content item {i + 1}</Typography>
    </div>
  ));

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Scrollbar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A customizable scrollbar component with auto-hide functionality and
          custom styling options.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Vertical Scrollbar
                </Typography>
                <Scrollbar className="h-48">
                  <div>{longContent.slice(0, 10)}</div>
                </Scrollbar>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Auto Hide on Leave
                </Typography>
                <Scrollbar className="h-48" autoHide="leave">
                  <div>{longContent.slice(0, 10)}</div>
                </Scrollbar>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Never Hide
                </Typography>
                <Scrollbar className="h-48" autoHide="never">
                  <div>{longContent.slice(0, 10)}</div>
                </Scrollbar>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Styled
                </Typography>
                <Scrollbar
                  className="h-48"
                  scrollbarStyle={{
                    track: { backgroundColor: 'transparent' },
                    thumb: { borderRadius: '8px', width: '8px' },
                  }}
                >
                  <div>{longContent.slice(0, 10)}</div>
                </Scrollbar>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="Scrollbar"
        defaultValues={{ autoHide: 'scroll', direction: 'vertical' }}
        excludeProps={['scrollbarStyle', 'style']}
      >
        {(props) => (
          <Scrollbar {...props} style={{ height: 200 }}>
            <div style={{ height: 600, padding: 16 }}>
              <p>Scroll down to see more content...</p>
              <p style={{ marginTop: 200 }}>Middle content</p>
              <p style={{ marginTop: 200 }}>End of content</p>
            </div>
          </Scrollbar>
        )}
      </PropPlayground>
      <AutoPropsTable componentName="Scrollbar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Scrollbar } from '@e-burgos/tucu-ui';

// Basic usage
<Scrollbar className="h-48">
  <div>
    {/* Your content here */}
  </div>
</Scrollbar>

// Auto hide on leave
<Scrollbar className="h-48" autoHide="leave">
  <div>{content}</div>
</Scrollbar>

// Never hide
<Scrollbar className="h-48" autoHide="never">
  <div>{content}</div>
</Scrollbar>

// Custom styled
<Scrollbar
  className="h-48"
  scrollbarStyle={{
    track: { backgroundColor: 'transparent' },
    thumb: { borderRadius: '8px', width: '8px' },
  }}
>
  <div>{content}</div>
</Scrollbar>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ScrollbarSection;
