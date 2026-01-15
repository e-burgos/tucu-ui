import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Logo,
} from '../../../../index';

const LogoSection: React.FC = () => {
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
      prop: 'name',
      type: 'string',
      default: '-',
      description: 'Primary logo text. Defaults to "TUCU" if not provided',
    },
    {
      prop: 'secondName',
      type: 'string',
      default: '-',
      description: 'Secondary logo text. Defaults to "UI" if not provided',
    },
    {
      prop: 'path',
      type: 'string',
      default: "'/'",
      description: 'Link path for the logo anchor link',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes for the logo container',
    },
    {
      prop: 'size',
      type: "'small' | 'medium' | 'large' | 'xlarge'",
      default: "'medium'",
      description: 'Size of the logo. Affects both icon and text sizes',
    },
    {
      prop: 'logo',
      type: 'React.ReactNode | null',
      default: 'null',
      description: 'Custom logo component to replace the default TucuUiLogo',
    },
    {
      prop: 'isoType',
      type: 'boolean',
      default: 'false',
      description: 'Show only the first letter of each name (isotype mode)',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Logo
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A flexible logo component that automatically adapts to light/dark mode
          and supports various sizes and configurations.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Default Logo (uses defaults)
                </Typography>
                <Logo />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Names
                </Typography>
                <Logo name="Custom" secondName="App" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="flex items-center gap-4 flex-wrap">
                  <Logo name="TUCU" size="small" />
                  <Logo name="TUCU" size="medium" />
                  <Logo name="TUCU" size="large" />
                  <Logo name="TUCU" size="xlarge" />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Link Path
                </Typography>
                <Logo name="TUCU" path="/home" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Isotype Mode (First Letters Only)
                </Typography>
                <Logo name="TUCU" secondName="UI" isoType />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Custom Classes
                </Typography>
                <Logo
                  name="TUCU"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Logo Component
                </Typography>
                <Logo
                  name="MY"
                  secondName="APP"
                  logo={
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      M
                    </div>
                  }
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Advanced Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Logo with SVG Icon
                </Typography>
                <Logo
                  name="COMPANY"
                  secondName="LLC"
                  logo={
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="rounded-lg"
                    >
                      <rect
                        width="64"
                        height="64"
                        rx="12"
                        fill="url(#gradient)"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0"
                          y1="0"
                          x2="64"
                          y2="64"
                        >
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <path d="M32 20L40 28L32 36L24 28L32 20Z" fill="white" />
                      <path
                        d="M20 32L28 40L36 32L28 24L20 32Z"
                        fill="white"
                        opacity="0.8"
                      />
                    </svg>
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Logo with Image
                </Typography>
                <Logo
                  name="COMPANY"
                  secondName=""
                  logo={
                    <div className="w-16 h-16 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-white/20">
                      C
                    </div>
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Only Primary Name
                </Typography>
                <Logo name="MYAPP" secondName={''} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Only Secondary Name
                </Typography>
                <Logo name="" secondName="BRAND" />
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
              code={`import { Logo } from '@e-burgos/tucu-ui';

// Default usage (uses "TUCU" and "UI" as defaults)
<Logo />

// Custom names
<Logo name="Custom" secondName="App" />

// Different sizes
<Logo name="TUCU" size="small" />
<Logo name="TUCU" size="medium" />
<Logo name="TUCU" size="large" />
<Logo name="TUCU" size="xlarge" />

// With custom link path
<Logo name="TUCU" path="/home" />

// Isotype mode (shows only first letters)
<Logo name="TUCU" secondName="UI" isoType />

// With custom CSS classes
<Logo 
  name="TUCU" 
  className="opacity-80 hover:opacity-100 transition-opacity" 
/>

// With custom logo component (ReactNode)
<Logo
  name="MY"
  secondName="APP"
  logo={
    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
      M
    </div>
  }
/>

// With custom SVG logo
<Logo
  name="COMPANY"
  secondName="LLC"
  logo={
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg"
    >
      <rect
        width="64"
        height="64"
        rx="12"
        fill="url(#gradient)"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
        >
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path d="M32 20L40 28L32 36L24 28L32 20Z" fill="white" />
      <path
        d="M20 32L28 40L36 32L28 24L20 32Z"
        fill="white"
        opacity="0.8"
      />
    </svg>
  }
/>

// Custom logo with image/div component
<Logo
  name="COMPANY"
  secondName=""
  logo={
    <div className="w-16 h-16 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-white/20">
      C
    </div>
  }
/>

// Only primary name (empty secondName)
<Logo name="MYAPP" secondName="" />

// Only secondary name (empty name)
<Logo name="" secondName="BRAND" />

// The component automatically:
// - Adapts to light/dark mode
// - Shows TucuUiLogo icon when no custom logo is provided
// - Defaults to "TUCU" and "UI" if names are undefined
// - Handles empty strings for name or secondName`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default LogoSection;
