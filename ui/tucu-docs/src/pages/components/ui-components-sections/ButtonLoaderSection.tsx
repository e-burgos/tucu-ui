import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Button,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const ButtonLoaderSection: React.FC = () => {
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

  const propsData = [
    {
      prop: 'size',
      type: "'large' | 'medium' | 'small'",
      default: 'required',
      description: 'Size of the loader',
    },
    {
      prop: 'variant',
      type: "'blink' | 'scaleUp' | 'moveUp'",
      default: 'required',
      description: 'Animation variant of the loader',
    },
  ];

  return (
    <>
      <HeroCard
        title="ButtonLoader"
        description="A loader component designed specifically for buttons, providing visual
          feedback during loading states."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with Loading State
                </Typography>
                <Button isLoading />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Button with Custom Loader
                </Typography>
                <Button isLoading loaderSize="small" loaderVariant="blink" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Large Button with Loader
                </Typography>
                <Button isLoading size="large" loaderSize="large"></Button>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Small Button with Loader
                </Typography>
                <Button isLoading size="small" loaderSize="small"></Button>
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
                  Blink Variant
                </Typography>
                <Button isLoading loaderVariant="blink" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Scale Up Variant
                </Typography>
                <Button isLoading loaderVariant="scaleUp" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Move Up Variant
                </Typography>
                <Button isLoading loaderVariant="moveUp" />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="Button"
        title="Button Loader Playground"
        defaultValues={{
          variant: 'solid',
          color: 'primary',
          size: 'medium',
          isLoading: true,
          loaderSize: 'small',
          loaderVariant: 'scaleUp',
        }}
        excludeProps={[
          'onClick',
          'aria-label',
          'aria-describedby',
          'tooltip',
          'tooltipArrow',
          'tooltipColor',
          'tooltipPlacement',
          'shape',
          'fullWidth',
          'disabled',
        ]}
      >
        {(props) => <Button {...props}>Loading...</Button>}
      </PropPlayground>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Button } from '@e-burgos/tucu-ui';

// Basic usage with loading state
<Button isLoading>Loading...</Button>

// With custom loader size
<Button 
  isLoading 
  loaderSize="small"
  loaderVariant="blink"
>
  Processing
</Button>

// Large button with loader
<Button 
  isLoading 
  size="large" 
  loaderSize="large"
>
  Saving...
</Button>

// Different loader variants
<Button isLoading loaderVariant="blink">Blink</Button>
<Button isLoading loaderVariant="scaleUp">Scale Up</Button>
<Button isLoading loaderVariant="moveUp">Move Up</Button>

// ButtonLoader is used internally by Button component
// when isLoading prop is set to true`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ButtonLoaderSection;
