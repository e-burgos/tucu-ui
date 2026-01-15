import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  TucuUiLogo,
} from '../../../../index';

const TucuUiLogoSection: React.FC = () => {
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
      prop: 'size',
      type: 'number | string',
      default: '120',
      description: 'Size of the logo icon',
    },
    {
      prop: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes',
    },
    {
      prop: 'props',
      type: 'React.SVGAttributes<SVGElement>',
      default: '-',
      description: 'Additional SVG attributes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TucuUiLogo
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          The core logo icon component featuring the distinctive double T design
          with "ui" text, representing the Tucu UI design system.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Size
                </Typography>
                <TucuUiLogo />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="flex items-center gap-4 flex-wrap">
                  <TucuUiLogo size={60} />
                  <TucuUiLogo size={120} />
                  <TucuUiLogo size={180} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Classes
                </Typography>
                <TucuUiLogo
                  size={100}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
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
              code={`import { TucuUiLogo } from '@e-burgos/tucu-ui';

// Basic usage (default 120x120)
<TucuUiLogo />

// Custom sizes
<TucuUiLogo size={60} />
<TucuUiLogo size={120} />
<TucuUiLogo size={180} />

// With custom classes
<TucuUiLogo 
  size={100} 
  className="opacity-80 hover:opacity-100 transition-opacity" 
/>

// With SVG attributes
<TucuUiLogo 
  size={80} 
  className="custom-class"
  props={{ viewBox: '0 0 240 240' }}
/>

// The component automatically:
// - Adapts to light/dark mode
// - Shows the double T design with "ui" text`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TucuUiLogoSection;
