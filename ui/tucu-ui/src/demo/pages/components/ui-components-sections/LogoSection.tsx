import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Logo,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const LogoSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Logo"
        description="A flexible logo component that automatically adapts to light/dark mode
          and supports various sizes and configurations."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Logo"
        defaultValues={{
          name: 'Tucu',
          secondName: 'UI',
          size: 'medium',
          isoType: false,
        }}
        excludeProps={['path', 'logo', 'preset']}
      >
        {(props) => <Logo {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="Logo" />

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
