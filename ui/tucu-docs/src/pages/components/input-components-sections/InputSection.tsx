import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Input,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const InputSection: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [playgroundInputValue, setPlaygroundInputValue] = useState('');
  const inputColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const inputSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  return (
    <>
      <HeroCard
        title="Input"
        description="A versatile input component that supports various input types including text, email, password, date, and more."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.TextCursorInput className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Input
                </Typography>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="We'll never share your email"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error="Password is required"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Input label="Disabled" placeholder="Disabled input" disabled />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Date Input
                </Typography>
                <Input label="Date" type="date" dateFormat="DD-MM-YYYY" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Number Input
                </Typography>
                <Input label="Age" type="number" placeholder="Enter age" />
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
                <Typography tag="h5" className="mb-3">
                  Ghost (default)
                </Typography>
                <Input
                  label="Ghost Variant"
                  placeholder="Enter text"
                  variant="ghost"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Input
                  label="Solid Variant"
                  placeholder="Enter text"
                  variant="solid"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Input
                  label="Transparent Variant"
                  placeholder="Enter text"
                  variant="transparent"
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {inputColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Input
                    label={`${label} Input`}
                    placeholder="Enter text"
                    color={color}
                  />
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
              {inputSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Input
                    label={`${label} Input`}
                    placeholder="Enter text"
                    size={size}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Input"
        defaultValues={{
          label: 'Preview Input',
          placeholder: 'Enter text',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          type: 'text',
          dateFormat: 'DD/MM/YYYY',
          locale: 'en-US',
          helperText: '',
          error: '',
          useUppercaseLabel: false,
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Placeholder text rendered inside the input',
          },
          {
            name: 'color',
            type: 'select',
            options: [
              'primary',
              'secondary',
              'danger',
              'info',
              'success',
              'warning',
            ],
            description: 'Color treatment applied to the control',
          },
          {
            name: 'type',
            type: 'select',
            options: ['text', 'email', 'password', 'number', 'date'],
            description: 'Native input type used for the preview',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the input and prevents interaction',
          },
        ]}
        includeProps={[
          'label',
          'placeholder',
          'variant',
          'color',
          'size',
          'type',
          'dateFormat',
          'locale',
          'helperText',
          'error',
          'useUppercaseLabel',
          'disabled',
        ]}
        excludeProps={[
          'inputClassName',
          'labelClassName',
          'suffix',
          'suffixClassName',
          'icon',
          'dateFormat',
          'locale',
        ]}
      >
        {(props) => (
          <div className="w-full max-w-lg">
            <Input
              {...props}
              placeholder={props.placeholder || 'Enter text'}
              value={playgroundInputValue}
              onChange={(e) => setPlaygroundInputValue(e.target.value)}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="Input" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Input } from '@e-burgos/tucu-ui';

// Basic usage
<Input
  label="Name"
  placeholder="Enter your name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With helper text
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With error
<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  error="Password is required"
/>

// Variants
<Input label="Ghost" variant="ghost" />
<Input label="Solid" variant="solid" />
<Input label="Transparent" variant="transparent" />

// Colors
<Input label="Primary" color="primary" />
<Input label="Secondary" color="secondary" />
<Input label="Danger" color="danger" />
<Input label="Info" color="info" />
<Input label="Success" color="success" />
<Input label="Warning" color="warning" />

// Sizes
<Input label="Small" size="sm" />
<Input label="Medium" size="md" />
<Input label="Large" size="lg" />

// Date input
<Input
  label="Date"
  type="date"
  dateFormat="DD-MM-YYYY"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default InputSection;
