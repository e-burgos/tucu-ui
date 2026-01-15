import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  ToggleBar,
  LucideIcons,
} from '../../../../index';

const ToggleBarSection: React.FC = () => {
  const [toggleBarChecked, setToggleBarChecked] = useState(false);

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

  const toggleBarPropsData = [
    {
      prop: 'title',
      type: 'string',
      default: 'required',
      description: 'Main title text',
    },
    {
      prop: 'subTitle',
      type: 'string',
      default: '-',
      description: 'Subtitle text displayed below the title',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      default: '-',
      description: 'Icon element to display next to the title',
    },
    {
      prop: 'checked',
      type: 'boolean',
      default: 'required',
      description: 'Whether the toggle is checked',
    },
    {
      prop: 'onChange',
      type: '() => void',
      default: 'required',
      description: 'Callback when toggle state changes',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: '-',
      description: 'Content to display below the toggle bar',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ToggleBar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A toggle bar component with title, subtitle, icon, and optional
          content. Perfect for settings panels and feature toggles.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic ToggleBar
                </Typography>
                <ToggleBar
                  title="Enable Notifications"
                  checked={toggleBarChecked}
                  onChange={() => setToggleBarChecked(!toggleBarChecked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Subtitle
                </Typography>
                <ToggleBar
                  title="Dark Mode"
                  subTitle="Switch between light and dark themes"
                  checked={toggleBarChecked}
                  onChange={() => setToggleBarChecked(!toggleBarChecked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Icon
                </Typography>
                <ToggleBar
                  title="Auto Save"
                  subTitle="Automatically save your work"
                  icon={<LucideIcons.Save className="w-5 h-5" />}
                  checked={toggleBarChecked}
                  onChange={() => setToggleBarChecked(!toggleBarChecked)}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Children
                </Typography>
                <ToggleBar
                  title="Advanced Settings"
                  subTitle="Show advanced configuration options"
                  checked={toggleBarChecked}
                  onChange={() => setToggleBarChecked(!toggleBarChecked)}
                >
                  <div className="mt-4 space-y-2">
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Additional content appears here when toggle is enabled.
                    </Typography>
                  </div>
                </ToggleBar>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={toggleBarPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ToggleBar, LucideIcons } from '@e-burgos/tucu-ui';

const [checked, setChecked] = useState(false);

// Basic usage
<ToggleBar
  title="Enable Notifications"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>

// With subtitle
<ToggleBar
  title="Dark Mode"
  subTitle="Switch between light and dark themes"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>

// With icon
<ToggleBar
  title="Auto Save"
  icon={<LucideIcons.Save className="w-5 h-5" />}
  checked={checked}
  onChange={() => setChecked(!checked)}
/>

// With children
<ToggleBar
  title="Advanced Settings"
  checked={checked}
  onChange={() => setChecked(!checked)}
>
  <div className="mt-4">
    <p>Additional content here</p>
  </div>
</ToggleBar>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ToggleBarSection;
