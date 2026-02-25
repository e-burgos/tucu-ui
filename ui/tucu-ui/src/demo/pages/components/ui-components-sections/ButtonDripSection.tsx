import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ButtonDripSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ButtonDrip
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A button effect component that creates a ripple animation on click.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with Drip Effect
                </Typography>
                <Button>Click me</Button>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with Tooltip
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Button tooltip="Save changes" tooltipPlacement="top">
                    Top
                  </Button>
                  <Button
                    tooltip="Delete item"
                    tooltipPlacement="bottom"
                    tooltipColor="light"
                    color="danger"
                  >
                    Bottom (light)
                  </Button>
                  <Button
                    tooltip="Go back"
                    tooltipPlacement="left"
                    variant="ghost"
                  >
                    Left
                  </Button>
                  <Button
                    tooltip="More info"
                    tooltipPlacement="right"
                    variant="ghost"
                    color="info"
                  >
                    Right
                  </Button>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Button"
        defaultValues={{
          variant: 'solid',
          color: 'primary',
          size: 'medium',
          shape: 'rounded',
          tooltip: '',
          tooltipPlacement: 'top',
        }}
        excludeProps={[
          'onClick',
          'loaderSize',
          'loaderVariant',
          'aria-label',
          'aria-describedby',
        ]}
      >
        {(props) => <Button {...props}>Click me</Button>}
      </PropPlayground>

      <AutoPropsTable componentName="Button" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ButtonDrip } from '@e-burgos/tucu-ui';

// ButtonDrip is typically used internally by Button component
// It creates a ripple effect when a button is clicked

<ButtonDrip
  x={50}
  y={50}
  color="#3b82f6"
  fullWidth={false}
  onCompleted={() => console.log('Animation completed')}
/>

// Button with tooltip (portal-based, renders above all DOM)
<Button tooltip="Save changes" tooltipPlacement="top">
  Save
</Button>

<Button tooltip="Delete" tooltipPlacement="bottom" tooltipColor="light" color="danger">
  Delete
</Button>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ButtonDripSection;
