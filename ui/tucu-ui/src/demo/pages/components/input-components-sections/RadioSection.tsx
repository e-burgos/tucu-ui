import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Radio,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const RadioSection: React.FC = () => {
  const [radioValue, setRadioValue] = useState<string>('');
  const [playgroundRadioValue, setPlaygroundRadioValue] = useState('a');
  const radioColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const radioSizes = [
    { label: 'Small', size: 'sm' as const },
    { label: 'Medium', size: 'md' as const },
    { label: 'Large', size: 'lg' as const },
    { label: 'Extra Large', size: 'xl' as const },
  ];

  return (
    <>
      <HeroCard
        title="Radio"
        description="A single radio button component for binary choices."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
            <LucideIcons.Circle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Radio
                </Typography>
                <Radio
                  label="Option 1"
                  value="option1"
                  checked={radioValue === 'option1'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Radio label="Disabled option" value="disabled" disabled />
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
                <Radio
                  label="Ghost Variant"
                  value="ghost"
                  variant="ghost"
                  checked={radioValue === 'ghost'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Radio
                  label="Solid Variant"
                  value="solid"
                  variant="solid"
                  checked={radioValue === 'solid'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Radio
                  label="Transparent Variant"
                  value="transparent"
                  variant="transparent"
                  checked={radioValue === 'transparent'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRadioValue(e.target.value)
                  }
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
              {radioColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Radio label={`${label} Radio`} value={color} color={color} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {radioSizes.map(({ label, size }) => (
                <CardContainer key={size} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Radio label={`${label} Radio`} value={size} size={size} />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Radio"
        defaultValues={{
          label: 'Preview Radio',
          variant: 'ghost',
          color: 'primary',
          size: 'md',
          disabled: false,
          labelPlacement: 'end',
        }}
        includeProps={[
          'label',
          'variant',
          'color',
          'size',
          'disabled',
          'labelPlacement',
        ]}
        excludeProps={['checked', 'onChange', 'value']}
      >
        {(props) => {
          const baseLabel =
            typeof props.label === 'string' && props.label.length > 0
              ? props.label
              : 'Preview Radio';

          return (
            <div className="space-y-3">
              <Radio
                {...props}
                label={`${baseLabel} A`}
                value="a"
                checked={playgroundRadioValue === 'a'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlaygroundRadioValue(e.target.value)
                }
              />
              <Radio
                {...props}
                label={`${baseLabel} B`}
                value="b"
                checked={playgroundRadioValue === 'b'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlaygroundRadioValue(e.target.value)
                }
              />
            </div>
          );
        }}
      </PropPlayground>

      <AutoPropsTable componentName="Radio" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Radio } from '@e-burgos/tucu-ui';

<Radio
  label="Option 1"
  value="option1"
  checked={value === 'option1'}
  onChange={(e) => setValue(e.target.value)}
/>

// Variants
<Radio label="Ghost" variant="ghost" value="ghost" />
<Radio label="Solid" variant="solid" value="solid" />
<Radio label="Transparent" variant="transparent" value="transparent" />

// Colors
<Radio label="Primary" color="primary" />
<Radio label="Secondary" color="secondary" />
<Radio label="Danger" color="danger" />
<Radio label="Info" color="info" />
<Radio label="Success" color="success" />
<Radio label="Warning" color="warning" />

// Sizes
<Radio label="Small" size="sm" />
<Radio label="Medium" size="md" />
<Radio label="Large" size="lg" />
<Radio label="Extra Large" size="xl" />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default RadioSection;
