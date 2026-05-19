import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Checkbox,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const CheckboxSection: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [playgroundCheckboxChecked, setPlaygroundCheckboxChecked] =
    useState(true);
  const checkboxColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const checkboxSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
  ];

  return (
    <>
      <HeroCard
        title="Checkbox"
        description="A checkbox component for binary selections."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border border-green-500/50">
            <LucideIcons.CheckSquare className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Checkbox
                </Typography>
                <Checkbox
                  label="I accept the terms and conditions"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Checkbox
                  label="Subscribe to newsletter"
                  helperText="Receive updates via email"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Checkbox
                  label="Required checkbox"
                  error="This field is required"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Checkbox label="Disabled option" disabled />
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
                <Checkbox label="Ghost Variant" variant="ghost" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Checkbox label="Solid Variant" variant="solid" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Checkbox label="Transparent Variant" variant="transparent" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {checkboxColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Checkbox label={`${label} Checkbox`} color={color} />
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
              {checkboxSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Checkbox label={`${label} Checkbox`} size={size} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shapes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Rounded
                </Typography>
                <Checkbox label="Rounded Shape" shape="rounded" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Square (default)
                </Typography>
                <Checkbox label="Square Shape" shape="square" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Checkbox"
        defaultValues={{
          label: 'Preview Checkbox',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          shape: 'square',
          helperText: '',
          error: '',
          disabled: false,
        }}
        includeProps={[
          'label',
          'variant',
          'color',
          'size',
          'shape',
          'helperText',
          'error',
          'disabled',
        ]}
        excludeProps={['checked', 'onChange']}
      >
        {(props) => (
          <Checkbox
            {...props}
            checked={playgroundCheckboxChecked}
            onChange={(e) => setPlaygroundCheckboxChecked(e.target.checked)}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="Checkbox" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Checkbox } from '@e-burgos/tucu-ui';

<Checkbox
  label="I accept the terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Variants
<Checkbox label="Ghost" variant="ghost" />
<Checkbox label="Solid" variant="solid" />
<Checkbox label="Transparent" variant="transparent" />

// Shapes
<Checkbox label="Rounded" shape="rounded" />
<Checkbox label="Square" shape="square" />

// Colors
<Checkbox label="Primary" color="primary" />
<Checkbox label="Secondary" color="secondary" />
<Checkbox label="Danger" color="danger" />
<Checkbox label="Info" color="info" />
<Checkbox label="Success" color="success" />
<Checkbox label="Warning" color="warning" />

// Sizes
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CheckboxSection;
