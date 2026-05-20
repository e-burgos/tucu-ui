import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ToggleBar,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ToggleBarSection: React.FC = () => {
  const [toggleBarChecked, setToggleBarChecked] = useState(false);
  const [playgroundToggleBarChecked, setPlaygroundToggleBarChecked] =
    useState(true);
  const toggleBarColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
  ];
  const [toggleBarColorsState, setToggleBarColorsState] = useState<
    Record<(typeof toggleBarColors)[number]['color'], boolean>
  >({
    primary: true,
    secondary: true,
    danger: true,
    info: true,
    success: true,
    warning: true,
  });

  const handleToggleBarColorChange =
    (color: (typeof toggleBarColors)[number]['color']) => () => {
      setToggleBarColorsState((currentState) => ({
        ...currentState,
        [color]: !currentState[color],
      }));
    };

  return (
    <>
      <HeroCard
        title="ToggleBar"
        description="A toggle bar component with title, subtitle, icon, and optional content. Perfect for settings panels and feature toggles."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-orange-500/50">
            <LucideIcons.ToggleRight className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {toggleBarColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <ToggleBar
                    title={`${label} Toggle`}
                    subTitle="Toggle with inherited Switch color"
                    color={color}
                    checked={toggleBarColorsState[color]}
                    onChange={handleToggleBarColorChange(color)}
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="ToggleBar"
        defaultValues={{
          title: 'Preview ToggleBar',
          subTitle: 'Use the controls to adjust the component',
          color: 'primary',
        }}
        includeProps={['title', 'subTitle', 'color']}
        excludeProps={['checked', 'onChange', 'icon', 'children']}
      >
        {(props) => (
          <div className="w-full max-w-2xl">
            <ToggleBar
              {...props}
              icon={<LucideIcons.Save className="w-5 h-5" />}
              checked={playgroundToggleBarChecked}
              onChange={() =>
                setPlaygroundToggleBarChecked((current) => !current)
              }
            />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="ToggleBar" />

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

// Colors
<ToggleBar title="Primary" color="primary" checked={checked} onChange={() => setChecked(!checked)} />
<ToggleBar title="Secondary" color="secondary" checked={checked} onChange={() => setChecked(!checked)} />
<ToggleBar title="Danger" color="danger" checked={checked} onChange={() => setChecked(!checked)} />
<ToggleBar title="Info" color="info" checked={checked} onChange={() => setChecked(!checked)} />
<ToggleBar title="Success" color="success" checked={checked} onChange={() => setChecked(!checked)} />
<ToggleBar title="Warning" color="warning" checked={checked} onChange={() => setChecked(!checked)} />

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
