import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import {
  MacOSWidget,
  MacOSWidgetHeader,
} from '../../../../components/macos/widget';

export const MacOSWidgetSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSWidget
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Sonoma-inspired widget containers on a 170 px base grid. Four sizes:
          sm (1×1), md (2×1), lg (1×2), xl (2×2). Optional glass vibrancy mode.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="All Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex flex-wrap gap-4 items-start">
              {/* SM */}
              <MacOSWidget size="sm">
                <MacOSWidgetHeader
                  title="Weather"
                  icon={<LucideIcons.Cloud className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-1 flex-col items-center justify-center pb-4">
                  <p className="text-4xl font-thin text-gray-800 dark:text-gray-100">
                    22°
                  </p>
                  <p className="text-xs text-gray-400">Partly cloudy</p>
                </div>
              </MacOSWidget>

              {/* MD */}
              <MacOSWidget size="md">
                <MacOSWidgetHeader
                  title="Activity"
                  icon={<LucideIcons.Activity className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-1 items-center justify-around px-4 pb-4">
                  {[
                    {
                      label: 'Move',
                      value: '420',
                      unit: 'cal',
                      color: '#ff3b30',
                    },
                    {
                      label: 'Exercise',
                      value: '28',
                      unit: 'min',
                      color: '#34c759',
                    },
                    {
                      label: 'Stand',
                      value: '10',
                      unit: 'hrs',
                      color: '#007aff',
                    },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p
                        className="text-2xl font-semibold"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>
                      <p className="text-[10px] text-gray-400">{item.unit}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </MacOSWidget>

              {/* LG */}
              <MacOSWidget size="lg">
                <MacOSWidgetHeader
                  title="Reminders"
                  icon={<LucideIcons.CheckSquare className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-col gap-1.5 px-4 pb-4">
                  {[
                    'Design review',
                    'Write tests',
                    'Update docs',
                    'Ship v2.0',
                    'Team standup',
                  ].map((task) => (
                    <div key={task} className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#007aff] shrink-0" />
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </MacOSWidget>

              {/* XL */}
              <MacOSWidget size="xl">
                <MacOSWidgetHeader
                  title="Photos"
                  subtitle="Last import"
                  icon={<LucideIcons.Image className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-1 items-center justify-center p-4">
                  <div className="grid grid-cols-2 gap-2 w-full h-full">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-xl flex-1"
                        style={{
                          background: `hsl(${200 + i * 40}, 60%, ${
                            70 + i * 5
                          }%)`,
                          minHeight: 100,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </MacOSWidget>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Glass Mode (vibrancy)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div
              className="rounded-2xl p-6 flex flex-wrap gap-4 items-start"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <MacOSWidget size="sm" glass>
                <MacOSWidgetHeader
                  title="Glass SM"
                  icon={<LucideIcons.Sparkles className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-1 items-center justify-center pb-4">
                  <p className="text-3xl font-thin text-gray-800 dark:text-gray-100">
                    ✦
                  </p>
                </div>
              </MacOSWidget>

              <MacOSWidget size="md" glass>
                <MacOSWidgetHeader
                  title="Glass MD"
                  subtitle="Vibrancy mode"
                  icon={<LucideIcons.Layers className="w-3.5 h-3.5" />}
                />
                <div className="flex flex-1 items-center justify-center pb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Semi-transparent + backdrop-blur-2xl
                  </p>
                </div>
              </MacOSWidget>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSWidget, MacOSWidgetHeader } from '@e-burgos/tucu-ui';

// Small widget (170×170)
<MacOSWidget size="sm">
  <MacOSWidgetHeader title="Weather" icon={<CloudIcon />} />
  <div className="flex flex-1 items-center justify-center">
    <p className="text-4xl font-thin">22°</p>
  </div>
</MacOSWidget>

// Medium widget (364×170)
<MacOSWidget size="md">
  <MacOSWidgetHeader title="Activity" subtitle="Today" />
  {/* content */}
</MacOSWidget>

// Large (170×364), Extra-large (364×364) — same API

// Glass / vibrancy mode
<MacOSWidget size="md" glass>
  <MacOSWidgetHeader title="Vibrancy" />
</MacOSWidget>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSWidgetSection;
