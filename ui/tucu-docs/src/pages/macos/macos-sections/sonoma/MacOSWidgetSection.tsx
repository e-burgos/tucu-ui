import React from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import {
  MacOSWidget,
  MacOSWidgetHeader,
} from '@tucu-ui-internal/components/macos/sonoma/containers/widget';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

export const MacOSWidgetSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Widget"
        description="macOS-style widget cards in four sizes with optional glass/vibrancy backdrop, icon header, and subtitle. Perfect for dashboards, quick-glance info, and control center items."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
            <LucideIcons.LayoutGrid className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="All Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap gap-6 items-start justify-center">
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <MacOSWidget key={size} size={size}>
                  <MacOSWidgetHeader
                    title={`Widget ${size.toUpperCase()}`}
                    subtitle="Description"
                    icon={<LucideIcons.Cloud className="w-4 h-4" />}
                  />
                  <div className="px-3 pb-3 text-xs text-gray-500 dark:text-gray-400">
                    Content area for the {size} widget.
                  </div>
                </MacOSWidget>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Glass Mode" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 bg-linear-to-br from-purple-600/30 via-blue-500/30 to-cyan-400/30 rounded-lg">
            <div className="flex flex-wrap gap-6 items-start justify-center">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <MacOSWidget key={size} size={size} glass>
                  <MacOSWidgetHeader
                    title={`Glass ${size.toUpperCase()}`}
                    icon={<LucideIcons.Sparkles className="w-4 h-4" />}
                  />
                  <div className="px-3 pb-3 text-xs text-gray-300">
                    Glass vibrancy mode — blurred background.
                  </div>
                </MacOSWidget>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSWidget"
        defaultValues={{
          size: 'md',
          glass: false,
        }}
        controlOverrides={[
          {
            name: 'size',
            type: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Widget size preset',
          },
          {
            name: 'glass',
            type: 'boolean',
            description: 'Enable glass/vibrancy backdrop',
          },
        ]}
        includeProps={['size', 'glass']}
        excludeProps={['className']}
      >
        {(props) => (
          <div className="flex items-center justify-center p-6 rounded-lg bg-linear-to-br from-purple-600/20 via-blue-500/20 to-cyan-400/20">
            <MacOSWidget {...props}>
              <MacOSWidgetHeader
                title="Preview Widget"
                subtitle="Subtitle text"
                icon={<LucideIcons.Activity className="w-4 h-4" />}
              />
              <div className="px-3 pb-3 text-xs text-gray-600 dark:text-gray-400">
                Widget content — adjust props above.
              </div>
            </MacOSWidget>
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSWidget" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSWidget, MacOSWidgetHeader } from '@e-burgos/tucu-ui';

// Basic widget
<MacOSWidget size="md">
  <MacOSWidgetHeader
    title="Weather"
    subtitle="San Francisco"
    icon={<CloudIcon />}
  />
  <div className="px-3 pb-3">72°F — Sunny</div>
</MacOSWidget>

// Glass mode on gradient background
<MacOSWidget size="lg" glass>
  <MacOSWidgetHeader title="Music" icon={<MusicIcon />} />
  <div className="px-3 pb-3">Now Playing — Song Title</div>
</MacOSWidget>

// Sizes: 'sm' | 'md' | 'lg' | 'xl'`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSWidgetSection;
