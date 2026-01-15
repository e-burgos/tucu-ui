import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Badge } from '../../../../index';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

const LayoutPrinciplesSection: React.FC = () => {
  const breakpoints = [
    { name: 'xs', varName: '--breakpoint-xs', value: '500px', description: 'Extra small devices' },
    { name: 'sm', varName: '--breakpoint-sm', value: '640px', description: 'Small devices (landscape phones)' },
    { name: 'md', varName: '--breakpoint-md', value: '768px', description: 'Medium devices (tablets)' },
    { name: 'lg', varName: '--breakpoint-lg', value: '1024px', description: 'Large devices (desktops)' },
    { name: 'xl', varName: '--breakpoint-xl', value: '1280px', description: 'Extra large devices' },
    { name: '2xl', varName: '--breakpoint-2xl', value: '1440px', description: '2X large screens' },
    { name: '3xl', varName: '--breakpoint-3xl', value: '1780px', description: '3X large screens' },
    { name: '4xl', varName: '--breakpoint-4xl', value: '1920px', description: '4X large screens (Full HD)' },
    { name: '5xl', varName: '--breakpoint-5xl', value: '2160px', description: '5X large screens (2K)' },
    { name: '6xl', varName: '--breakpoint-6xl', value: '2560px', description: '6X large screens (WQHD)' },
    { name: '4k', varName: '--breakpoint-4k', value: '3840px', description: '4K Ultra HD screens' },
  ];

  const zIndexLayers = [
    { name: 'Base', value: '0', description: 'Default layer for most elements' },
    { name: 'Dropdown', value: '10', description: 'Dropdown menus and popovers' },
    { name: 'Sticky', value: '20', description: 'Sticky positioned elements' },
    { name: 'Fixed', value: '30', description: 'Fixed positioned elements' },
    { name: 'Modal Backdrop', value: '40', description: 'Modal overlay backgrounds' },
    { name: 'Modal', value: '50', description: 'Modal dialogs and drawers' },
    { name: 'Popover', value: '60', description: 'Tooltips and popovers' },
    { name: 'Toast', value: '70', description: 'Toast notifications' },
    { name: 'Tooltip', value: '80', description: 'Tooltips (highest priority)' },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Layout Principles
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Responsive design patterns and layout guidelines for consistent experiences
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Breakpoints */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Responsive Breakpoints" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                  <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Responsive Breakpoints
                </Typography>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {breakpoints.map((breakpoint) => {
                  const breakpointValue = getColorHex(breakpoint.varName);
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
                          <Typography tag="h4" className="text-muted text-xs break-all font-mono">
                            {breakpoint.varName}
                          </Typography>
                          <Typography tag="h4" className="text-muted text-sm font-semibold">
                            Min-width: {breakpointValue || breakpoint.value}
                          </Typography>
                          {breakpointValue && breakpointValue !== breakpoint.value && (
                            <Typography tag="h4" className="text-muted text-[10px] break-all">
                              CSS Value: {breakpointValue}
                            </Typography>
                          )}
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
                <Typography tag="h3" className="text-xl font-semibold">
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
                      <Badge variant="outline" className="font-mono w-12 justify-center">
                        {layer.value}
                      </Badge>
                      <div>
                        <div className="font-semibold">{layer.name}</div>
                        <div className="text-sm text-muted-foreground">{layer.description}</div>
                      </div>
                    </div>
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

export default LayoutPrinciplesSection;

