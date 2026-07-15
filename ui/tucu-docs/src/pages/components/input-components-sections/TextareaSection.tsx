import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Textarea,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const TextareaSection: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const [playgroundTextareaValue, setPlaygroundTextareaValue] = useState('');
  const textareaColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const textareaSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  return (
    <>
      <HeroCard
        title="Textarea"
        description="A multi-line text input component for longer text content."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg border border-rose-500/50">
            <LucideIcons.AlignLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Textarea
                </Typography>
                <Textarea
                  label="Message"
                  placeholder="Write your message here"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  helperText="Provide a detailed description"
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Textarea
                  label="Comments"
                  placeholder="Enter comments"
                  error="Comments are required"
                  rows={4}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Textarea
                  label="Notes"
                  placeholder="Disabled textarea"
                  disabled
                  rows={4}
                />
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
                <Textarea
                  label="Ghost Variant"
                  placeholder="Enter text"
                  variant="ghost"
                  rows={3}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Textarea
                  label="Solid Variant"
                  placeholder="Enter text"
                  variant="solid"
                  rows={3}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Textarea
                  label="Transparent Variant"
                  placeholder="Enter text"
                  variant="transparent"
                  rows={3}
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
              {textareaColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Textarea
                    label={`${label} Textarea`}
                    placeholder="Enter text"
                    rows={3}
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
              {textareaSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Textarea
                    label={`${label} Textarea`}
                    placeholder="Enter text"
                    rows={3}
                    size={size}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Textarea"
        defaultValues={{
          label: 'Preview Textarea',
          placeholder: 'Enter text',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          rows: 4,
          helperText: '',
          error: '',
          useUppercaseLabel: false,
          disabled: false,
        }}
        controlOverrides={[
          {
            name: 'placeholder',
            type: 'text',
            description: 'Placeholder text rendered inside the textarea',
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
            name: 'rows',
            type: 'number',
            description: 'Visible row count for the textarea preview',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables the textarea and prevents interaction',
          },
        ]}
        includeProps={[
          'label',
          'placeholder',
          'variant',
          'color',
          'size',
          'rows',
          'helperText',
          'error',
          'useUppercaseLabel',
          'disabled',
        ]}
        excludeProps={['inputClassName']}
      >
        {(props) => (
          <div className="w-full max-w-lg">
            <Textarea
              {...props}
              rows={typeof props.rows === 'number' ? props.rows : 4}
              placeholder={props.placeholder || 'Enter text'}
              value={playgroundTextareaValue}
              onChange={(e) => setPlaygroundTextareaValue(e.target.value)}
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="Textarea" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Textarea } from '@e-burgos/tucu-ui';

<Textarea
  label="Message"
  placeholder="Write your message here"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
/>

<Textarea
  label="Description"
  placeholder="Enter description"
  helperText="Provide a detailed description"
  rows={4}
/>

// Variants
<Textarea label="Ghost" variant="ghost" rows={4} />
<Textarea label="Solid" variant="solid" rows={4} />
<Textarea label="Transparent" variant="transparent" rows={4} />

// Colors
<Textarea label="Primary" color="primary" rows={4} />
<Textarea label="Secondary" color="secondary" rows={4} />
<Textarea label="Danger" color="danger" rows={4} />
<Textarea label="Info" color="info" rows={4} />
<Textarea label="Success" color="success" rows={4} />
<Textarea label="Warning" color="warning" rows={4} />

// Sizes
<Textarea label="Small" size="sm" rows={3} />
<Textarea label="Medium" size="md" rows={4} />
<Textarea label="Large" size="lg" rows={5} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TextareaSection;
