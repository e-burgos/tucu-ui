import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  RadioGroup,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const RadioGroupSection: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>('');

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          RadioGroup
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A group of radio buttons for selecting one option from multiple
          choices.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic RadioGroup
                </Typography>
                <RadioGroup
                  label="Gender"
                  options={genderOptions}
                  value={radioValue}
                  onChange={(value: string | number) =>
                    setRadioValue(value as string)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <RadioGroup
                  label="Size"
                  helperText="Select your preferred size"
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <RadioGroup
                  label="Priority"
                  error="Please select a priority"
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'high', label: 'High' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <RadioGroup
                  label="Status"
                  disabled
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Horizontal Layout
                </Typography>
                <RadioGroup
                  label="Direction"
                  direction="horizontal"
                  options={[
                    { value: 'vertical', label: 'Vertical' },
                    { value: 'horizontal', label: 'Horizontal' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Different Colors
                </Typography>
                <RadioGroup
                  label="Color"
                  color="danger"
                  options={[
                    { value: 'red', label: 'Red' },
                    { value: 'blue', label: 'Blue' },
                  ]}
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
                <RadioGroup
                  label="Ghost Variant"
                  variant="ghost"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <RadioGroup
                  label="Solid Variant"
                  variant="solid"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <RadioGroup
                  label="Transparent Variant"
                  variant="transparent"
                  options={[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ]}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <AutoPropsTable componentName="RadioGroup" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="typescript"
              code={`import { RadioGroup } from '@e-burgos/tucu-ui';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

<RadioGroup
  label="Gender"
  options={options}
  value={value}
  onChange={(value) => setValue(value)}
/>

// Variants
<RadioGroup label="Ghost" variant="ghost" options={options} />
<RadioGroup label="Solid" variant="solid" options={options} />
<RadioGroup label="Transparent" variant="transparent" options={options} />

// Colors
<RadioGroup label="Primary" color="primary" options={options} />
<RadioGroup label="Danger" color="danger" options={options} />

// Layout
<RadioGroup label="Horizontal" direction="horizontal" options={options} />
<RadioGroup label="Vertical" direction="vertical" options={options} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default RadioGroupSection;
