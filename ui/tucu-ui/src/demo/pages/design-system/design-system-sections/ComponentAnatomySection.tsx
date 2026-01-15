import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Button } from '../../../../index';

const ComponentAnatomySection: React.FC = () => {
  const componentStates = [
    { name: 'Default', component: <Button>Default</Button> },
    { name: 'Hover', component: <Button className="hover:bg-primary/90">Hover</Button> },
    { name: 'Active', component: <Button className="active:bg-primary/95">Active</Button> },
    { name: 'Disabled', component: <Button disabled>Disabled</Button> },
  ];

  const componentVariants = [
    { name: 'Solid', component: <Button variant="solid">Solid</Button> },
    { name: 'Ghost', component: <Button variant="ghost">Ghost</Button> },
    { name: 'Transparent', component: <Button variant="transparent">Transparent</Button> },
  ];

  const componentSizes = [
    { name: 'Tiny', component: <Button size="tiny">Tiny</Button> },
    { name: 'Mini', component: <Button size="mini">Mini</Button> },
    { name: 'Small', component: <Button size="small">Small</Button> },
    { name: 'Medium', component: <Button size="medium">Medium</Button> },
    { name: 'Large', component: <Button size="large">Large</Button> },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Component Anatomy
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Understanding component states, variants, and sizes for consistent implementation
        </Typography>
      </div>

      <div className="space-y-8">
        {/* States */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Component States" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
                  <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Component States
                </Typography>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {componentStates.map((state) => (
                  <div key={state.name} className="text-center space-y-2">
                    {state.component}
                    <div className="text-sm text-muted-foreground">{state.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        {/* Variants */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Component Variants" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-md">
                  <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Component Variants
                </Typography>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {componentVariants.map((variant) => (
                  <div key={variant.name} className="text-center space-y-2">
                    {variant.component}
                    <div className="text-sm text-muted-foreground">{variant.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        {/* Sizes */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Component Sizes" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-cyan-500 to-sky-500 shadow-md">
                  <LucideIcons.Maximize className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Component Sizes
                </Typography>
              </div>
              <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                {componentSizes.map((size) => (
                  <div key={size.name} className="text-center space-y-2">
                    {size.component}
                    <div className="text-sm text-muted-foreground">{size.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </>
  );
};

export default ComponentAnatomySection;

