import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Checkbox,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const CheckboxSection: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Checkbox
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A checkbox component for binary selections.
        </Typography>
      </div>

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
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Colors
                </Typography>
                <div className="space-y-2">
                  <Checkbox label="Primary" color="primary" />
                  <Checkbox label="Danger" color="danger" />
                  <Checkbox label="Success" color="success" />
                </div>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Sizes
                </Typography>
                <div className="space-y-2">
                  <Checkbox label="Small" size="sm" />
                  <Checkbox label="Medium" size="md" />
                  <Checkbox label="Large" size="lg" />
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
<Checkbox label="Danger" color="danger" />
<Checkbox label="Success" color="success" />

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
