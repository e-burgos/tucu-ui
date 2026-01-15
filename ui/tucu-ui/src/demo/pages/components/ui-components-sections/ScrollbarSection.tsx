import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Scrollbar,
} from '../../../../index';

const ScrollbarSection: React.FC = () => {
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
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Content to display inside the scrollbar',
    },
    {
      prop: 'autoHide',
      type: "'never' | 'scroll' | 'leave' | 'move'",
      default: "'scroll'",
      description: 'When to hide the scrollbar',
    },
    {
      prop: 'direction',
      type: "'horizontal' | 'vertical' | 'both'",
      default: "'vertical'",
      description: 'Scroll direction',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes',
    },
    {
      prop: 'scrollbarStyle',
      type: '{ track?: CSSProperties; thumb?: CSSProperties }',
      default: '-',
      description: 'Custom styles for scrollbar track and thumb',
    },
  ];

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
