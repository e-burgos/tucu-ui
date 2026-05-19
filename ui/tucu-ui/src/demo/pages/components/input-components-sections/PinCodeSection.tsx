import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  PinCode,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const PinCodeSection: React.FC = () => {
  const [pinCodeValue, setPinCodeValue] = useState('');
  const [playgroundPinCodeValue, setPlaygroundPinCodeValue] = useState('');
  const pinCodeColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const pinCodeSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];
  const pinCodeShapes = [
    { label: 'Square', rounded: 'none' as const },
    { label: 'Soft', rounded: 'sm' as const },
    { label: 'Default', rounded: 'md' as const },
    { label: 'Large', rounded: 'lg' as const },
    { label: 'Pill', rounded: 'full' as const },
  ];

  return (
    <>
      <HeroCard
        title="PinCode"
        description="A pin code input component for entering numeric codes digit by digit."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-amber-500/50">
            <LucideIcons.Hash className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  4 Digit PinCode
                </Typography>
                <div>
                  <Typography tag="h5" className="mb-2">
                    Pin Code
                  </Typography>
                  <PinCode
                    length={4}
                    value={pinCodeValue}
                    onChange={setPinCodeValue}
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  6 Digit PinCode
                </Typography>
                <div>
                  <Typography tag="h5" className="mb-2">
                    Verification Code
                  </Typography>
                  <PinCode
                    length={6}
                    value={pinCodeValue}
                    onChange={setPinCodeValue}
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <div>
                  <Typography tag="h5" className="mb-2">
                    Security Code
                  </Typography>
                  <PinCode
                    length={4}
                    helperText="Enter the 4-digit code"
                    value={pinCodeValue}
                    onChange={setPinCodeValue}
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <div>
                  <Typography tag="h5" className="mb-2">
                    Pin Code
                  </Typography>
                  <PinCode
                    length={4}
                    error="Invalid pin code"
                    value={pinCodeValue}
                    onChange={setPinCodeValue}
                  />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <div>
                  <Typography tag="h5" className="mb-2">
                    Pin Code
                  </Typography>
                  <PinCode length={4} disabled />
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  Ghost (default)
                </Typography>
                <PinCode length={4} variant="ghost" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  Solid
                </Typography>
                <PinCode length={4} variant="solid" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  Transparent
                </Typography>
                <PinCode length={4} variant="transparent" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pinCodeColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-2 text-sm">
                    {label}
                  </Typography>
                  <PinCode length={4} color={color} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {pinCodeSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-2 text-sm">
                    {label}
                  </Typography>
                  <PinCode length={4} size={size} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shapes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pinCodeShapes.map(({ label, rounded }) => (
                <CardContainer key={rounded} className="p-4">
                  <Typography tag="h5" className="mb-2 text-sm">
                    {label}
                  </Typography>
                  <PinCode length={4} rounded={rounded} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="PinCode"
        defaultValues={{
          length: 4,
          type: 'text',
          placeholder: '-',
          mask: false,
          center: true,
          size: 'md',
          rounded: 'md',
          variant: 'ghost',
          color: 'primary',
          helperText: '',
          error: '',
          fullWidth: false,
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Character placeholder rendered in each box',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the pin input and prevents interaction',
          },
        ]}
        includeProps={[
          'length',
          'type',
          'placeholder',
          'mask',
          'center',
          'size',
          'rounded',
          'variant',
          'color',
          'helperText',
          'error',
          'fullWidth',
          'disabled',
        ]}
        excludeProps={[
          'value',
          'onChange',
          'inputClassName',
          'errorClassName',
          'helperTextClassName',
          'className',
        ]}
      >
        {(props) => (
          <div className="w-full max-w-lg flex justify-center">
            <PinCode
              {...props}
              value={playgroundPinCodeValue}
              onChange={setPlaygroundPinCodeValue}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="PinCode" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { PinCode } from '@e-burgos/tucu-ui';

<PinCode
  length={4}
  value={value}
  onChange={setValue}
/>

// Variants
<PinCode length={4} variant="ghost" />
<PinCode length={4} variant="solid" />
<PinCode length={4} variant="transparent" />

// Colors
<PinCode length={4} color="primary" />
<PinCode length={4} color="secondary" />
<PinCode length={4} color="danger" />
<PinCode length={4} color="info" />
<PinCode length={4} color="success" />
<PinCode length={4} color="warning" />

// Sizes
<PinCode length={4} size="sm" />
<PinCode length={4} size="md" />
<PinCode length={4} size="lg" />

// Shapes
<PinCode length={4} rounded="none" />
<PinCode length={4} rounded="sm" />
<PinCode length={4} rounded="md" />
<PinCode length={4} rounded="lg" />
<PinCode length={4} rounded="full" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PinCodeSection;
