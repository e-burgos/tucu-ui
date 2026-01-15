import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  DefiAppLogo,
} from '../../../../index';

const DefiAppLogoSection: React.FC = () => {
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
      prop: '...SVGAttributes',
      type: 'React.SVGAttributes<SVGElement>',
      default: '-',
      description: 'All standard SVG attributes are supported',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          DefiAppLogo
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          An animated brain-inspired logo component designed for DeFi
          applications, featuring pulsing nodes and signal flows that represent
          financial data processing.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Animated Logo
                </Typography>
                <div className="flex items-center justify-center">
                  <DefiAppLogo width={100} height={100} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <DefiAppLogo width={60} height={60} />
                  <DefiAppLogo width={100} height={100} />
                  <DefiAppLogo width={150} height={150} />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Classes
                </Typography>
                <div className="flex items-center justify-center">
                  <DefiAppLogo
                    width={120}
                    height={120}
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
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
              code={`import { DefiAppLogo } from '@e-burgos/tucu-ui';

// Basic usage
<DefiAppLogo width={100} height={100} />

// Different sizes
<DefiAppLogo width={60} height={60} />
<DefiAppLogo width={100} height={100} />
<DefiAppLogo width={150} height={150} />

// With custom classes
<DefiAppLogo 
  width={120} 
  height={120} 
  className="opacity-90 hover:opacity-100 transition-opacity" 
/>

// With SVG attributes
<DefiAppLogo 
  width={80} 
  height={80} 
  className="custom-class"
  viewBox="0 0 100 100"
/>

// Perfect for DeFi applications
<div className="flex items-center gap-2">
  <DefiAppLogo width={40} height={40} />
  <span>My DeFi App</span>
</div>

// Features:
// - Animated pulsing nodes
// - Signal flow animations
// - Gradient colors (blue, purple, pink)
// - Perfect for financial/blockchain apps`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default DefiAppLogoSection;
