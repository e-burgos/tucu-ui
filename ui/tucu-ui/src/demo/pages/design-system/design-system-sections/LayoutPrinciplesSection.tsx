import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
  HeroCard,
} from '../../../../index';

const LayoutPrinciplesSection: React.FC = () => {
  const breakpoints = [
    {
      name: 'xs',
      value: '480px',
      description: 'Extra small devices',
    },
    {
      name: 'sm',
      value: '640px',
      description: 'Small devices (landscape phones)',
    },
    {
      name: 'md',
      value: '768px',
      description: 'Medium devices (tablets)',
    },
    {
      name: 'lg',
      value: '1024px',
      description: 'Large devices (desktops)',
    },
    {
      name: 'xl',
      value: '1280px',
      description: 'Extra large devices',
    },
    {
      name: '2xl',
      value: '1440px',
      description: '2X large screens',
    },
    {
      name: '3xl',
      value: '1780px',
      description: '3X large screens',
    },
    {
      name: '4xl',
      value: '2160px',
      description: '4X large screens (4K UHD)',
    },
  ];

  const zIndexLayers = [
    {
      name: 'Base',
      value: '0',
      description: 'Default layer for most elements',
    },
    {
      name: 'Dropdown',
      value: '10',
      description: 'Dropdown menus and popovers',
    },
    { name: 'Sticky', value: '20', description: 'Sticky positioned elements' },
    { name: 'Fixed', value: '30', description: 'Fixed positioned elements' },
    {
      name: 'Modal Backdrop',
      value: '40',
      description: 'Modal overlay backgrounds',
    },
    { name: 'Modal', value: '50', description: 'Modal dialogs and drawers' },
    { name: 'Popover', value: '60', description: 'Tooltips and popovers' },
    { name: 'Toast', value: '70', description: 'Toast notifications' },
    {
      name: 'Tooltip',
      value: '80',
      description: 'Tooltips (highest priority)',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Layout Principles"
        description="Responsive design patterns and layout guidelines for consistent experiences."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layout className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="space-y-8">
        {/* Breakpoints */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Responsive Breakpoints" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                  <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-base font-semibold">
                  Responsive Breakpoints
                </Typography>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {breakpoints.map((breakpoint) => {
                  return (
                    <div
                      key={breakpoint.name}
                      className="space-y-3 p-4 bg-muted/20 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {breakpoint.name}
                          </Badge>
                          <Typography tag="h3" className="font-semibold">
                            {breakpoint.description}
                          </Typography>
                        </div>
                        <div className="space-y-1">
                          <Typography
                            tag="h4"
                            className="text-muted text-sm font-semibold"
                          >
                            Min-width: {breakpoint.value}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        {/* Z-Index Scale */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Z-Index Scale" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-cyan-500 via-teal-500 to-blue-500 shadow-md">
                  <LucideIcons.Layers3 className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-base font-semibold">
                  Z-Index Scale
                </Typography>
              </div>
              <div className="space-y-2">
                {zIndexLayers.map((layer) => (
                  <div
                    key={layer.name}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded"
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="outline"
                        className="font-mono w-12 justify-center"
                      >
                        {layer.value}
                      </Badge>
                      <div>
                        <div className="font-semibold">{layer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {layer.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </div>
  );
};

export default LayoutPrinciplesSection;
