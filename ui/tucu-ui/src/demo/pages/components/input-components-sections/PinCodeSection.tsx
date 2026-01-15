import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  PinCode,
} from '../../../../index';

const PinCodeSection: React.FC = () => {
  const [pinCodeValue, setPinCodeValue] = useState('');

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

  const pinCodePropsData = [
    {
      prop: 'length',
      type: 'number',
      default: 'required',
      description: 'Number of pin code digits',
    },
    {
      prop: 'value',
      type: 'string',
      default: '-',
      description: 'Current pin code value',
    },
    {
      prop: 'onChange',
      type: '(value: string) => void',
      default: '-',
      description: 'Callback when pin code changes',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the pin code inputs',
    },
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the pin code inputs',
    },
    {
      prop: 'color',
      type: "'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'",
      default: "'primary'",
      description: 'Color theme of the pin code inputs',
    },
    {
      prop: 'type',
      type: "'text' | 'number'",
      default: "'text'",
      description: 'Input type for pin code fields',
    },
    {
      prop: 'mask',
      type: 'boolean',
      default: 'false',
      description: 'Mask the pin code values',
    },
    {
      prop: 'center',
      type: 'boolean',
      default: 'false',
      description: 'Center the pin code horizontally',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all pin code inputs',
    },
    {
      prop: 'error',
      type: 'string',
      default: '-',
      description: 'Error message to display',
    },
    {
      prop: 'helperText',
      type: 'string',
      default: '-',
      description: 'Helper text displayed below the pin code',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          PinCode
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A pin code input component for entering numeric codes digit by digit.
        </Typography>
      </div>

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
        <CardTitle title="Colors & Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  Different Colors
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography tag="h5" className="mb-1 text-xs">
                      Primary
                    </Typography>
                    <PinCode length={4} color="primary" />
                  </div>
                  <div>
                    <Typography tag="h5" className="mb-1 text-xs">
                      Danger
                    </Typography>
                    <PinCode length={4} color="danger" />
                  </div>
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  Different Sizes
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography tag="h5" className="mb-1 text-xs">
                      Small
                    </Typography>
                    <PinCode length={4} size="sm" />
                  </div>
                  <div>
                    <Typography tag="h5" className="mb-1 text-xs">
                      Medium
                    </Typography>
                    <PinCode length={4} size="md" />
                  </div>
                  <div>
                    <Typography tag="h5" className="mb-1 text-xs">
                      Large
                    </Typography>
                    <PinCode length={4} size="lg" />
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={pinCodePropsData} />
          </div>
        </CardTitle>
      </CardContainer>

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
<PinCode length={4} color="danger" />
<PinCode length={4} color="success" />

// Sizes
<PinCode length={4} size="sm" />
<PinCode length={4} size="md" />
<PinCode length={4} size="lg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PinCodeSection;
