import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Switch,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const switchColors = [
  { label: 'Primary', color: 'primary' as const },
  { label: 'Secondary', color: 'secondary' as const },
  { label: 'Danger', color: 'danger' as const },
  { label: 'Info', color: 'info' as const },
  { label: 'Success', color: 'success' as const },
  { label: 'Warning', color: 'warning' as const },
];

type SwitchColor = (typeof switchColors)[number]['color'];

const SwitchSection: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [playgroundSwitchChecked, setPlaygroundSwitchChecked] = useState(true);
  const [switchColorsState, setSwitchColorsState] = useState<
    Record<SwitchColor, boolean>
  >({
    primary: true,
    secondary: true,
    danger: true,
    info: true,
    success: true,
    warning: true,
  });

  const handleColorChange = (color: SwitchColor) => (checked: boolean) => {
    setSwitchColorsState((currentState) => ({
      ...currentState,
      [color]: checked,
    }));
  };

  return (
    <>
      <HeroCard
        title="Switch"
        description="A toggle switch component for binary on/off states."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
            <LucideIcons.ToggleLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Switch
                </Typography>
                <Switch
                  label="Enable notifications"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Custom Labels
                </Typography>
                <Switch
                  label="Dark mode"
                  onLabel="ON"
                  offLabel="OFF"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Helper Text
                </Typography>
                <Switch
                  label="Auto-save"
                  helperText="Automatically save your work"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Error
                </Typography>
                <Switch
                  label="Required switch"
                  errorMessage="This field is required"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <Switch
                  label="Disabled switch"
                  disabled
                  checked={switchChecked}
                  onChange={setSwitchChecked}
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
                <Switch
                  label="Ghost Variant"
                  variant="ghost"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Solid
                </Typography>
                <Switch
                  label="Solid Variant"
                  variant="solid"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Transparent
                </Typography>
                <Switch
                  label="Transparent Variant"
                  variant="transparent"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
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
              {switchColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <Switch
                    label={`${label} Switch`}
                    color={color}
                    checked={switchColorsState[color]}
                    onChange={handleColorChange(color)}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Switch"
        defaultValues={{
          label: 'Preview Switch',
          onLabel: 'ON',
          offLabel: 'OFF',
          variant: 'ghost',
          color: 'primary',
          helperText: '',
          errorMessage: '',
          disabled: false,
        }}
        includeProps={[
          'label',
          'onLabel',
          'offLabel',
          'variant',
          'color',
          'helperText',
          'errorMessage',
          'disabled',
        ]}
        excludeProps={['checked', 'onChange']}
      >
        {(props) => (
          <Switch
            {...props}
            checked={playgroundSwitchChecked}
            onChange={setPlaygroundSwitchChecked}
          />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="Switch" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Switch } from '@e-burgos/tucu-ui';

<Switch
  label="Enable notifications"
  checked={checked}
  onChange={setChecked}
/>

<Switch
  label="Dark mode"
  onLabel="ON"
  offLabel="OFF"
  checked={checked}
  onChange={setChecked}
/>

// Variants
<Switch label="Ghost" variant="ghost" checked={checked} onChange={setChecked} />
<Switch label="Solid" variant="solid" checked={checked} onChange={setChecked} />
<Switch label="Transparent" variant="transparent" checked={checked} onChange={setChecked} />

// Colors
<Switch label="Primary" color="primary" checked={checked} onChange={setChecked} />
<Switch label="Secondary" color="secondary" checked={checked} onChange={setChecked} />
<Switch label="Danger" color="danger" checked={checked} onChange={setChecked} />
<Switch label="Info" color="info" checked={checked} onChange={setChecked} />
<Switch label="Success" color="success" checked={checked} onChange={setChecked} />
<Switch label="Warning" color="warning" checked={checked} onChange={setChecked} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SwitchSection;
