import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Switch,
} from '../../../../index';

const SwitchSection: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(false);

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

  const switchPropsData = [
    {
      prop: 'checked',
      type: 'boolean',
      default: 'required',
      description: 'Whether the switch is checked',
    },
    {
      prop: 'onChange',
      type: '(checked: boolean) => void',
      default: 'required',
      description: 'Callback when switch state changes',
    },
    {
      prop: 'label',
      type: 'string | React.ReactNode',
      default: '-',
      description: 'Switch label text',
    },
    {
      prop: 'variant',
      type: "'ghost' | 'solid' | 'transparent'",
      default: "'ghost'",
      description: 'Visual variant of the switch',
    },
    {
      prop: 'onLabel',
      type: 'string | React.ReactNode',
      default: "'ON'",
      description: 'Label text when switch is on',
    },
    {
      prop: 'offLabel',
      type: 'string | React.ReactNode',
      default: "'OFF'",
      description: 'Label text when switch is off',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the switch',
    },
    {
      prop: 'errorMessage',
      type: 'string',
      default: '-',
      description: 'Error message to display',
    },
    {
      prop: 'helperText',
      type: 'string',
      default: '-',
      description: 'Helper text displayed below the switch',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Switch
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A toggle switch component for binary on/off states.
        </Typography>
      </div>

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
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={switchPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

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
<Switch label="Transparent" variant="transparent" checked={checked} onChange={setChecked} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SwitchSection;
