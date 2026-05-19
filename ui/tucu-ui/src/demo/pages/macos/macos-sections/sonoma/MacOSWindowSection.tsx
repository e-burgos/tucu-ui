import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import { MacOSWindow } from '../../../../../components/macos/sonoma/containers/window';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function WindowPlayground(props: {
  title?: string;
  draggable?: boolean;
  resizable?: boolean;
  showTrafficLights?: boolean;
  trafficLightsPosition?: 'left' | 'right';
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  minWidth?: number;
  minHeight?: number;
}) {
  return (
    <div
      className="relative rounded-xl bg-gray-100 dark:bg-gray-800/50 p-8"
      style={{ minHeight: 220 }}
    >
      <MacOSWindow {...props} defaultWidth={props.defaultWidth ?? 380}>
        <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
          Interactive window — adjust props above.
        </div>
      </MacOSWindow>
    </div>
  );
}

export const MacOSWindowSection: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HeroCard
        title="Window"
        description="A macOS-style window container with vibrancy title bar, traffic-light buttons, drag & resize support, maximize/minimize states, and optional action slots."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <LucideIcons.AppWindow className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Interactive — Drag, Resize, Maximize"
          className="mt-2 mb-2"
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ height: 400 }}
          >
            <MacOSWindow
              title="Drag & Resize Me"
              defaultWidth={420}
              defaultHeight={220}
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-2 font-medium">Try these interactions:</p>
                <ul className="list-disc pl-5 space-y-1 text-[12px]">
                  <li>Drag the title bar to move the window</li>
                  <li>Drag any edge or corner to resize</li>
                  <li>Double-click the title bar to maximize</li>
                  <li>Click the green traffic light to maximize/restore</li>
                  <li>
                    Click the yellow traffic light to restore default size
                  </li>
                </ul>
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Traffic Lights — Left (default)"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6">
            <MacOSWindow
              title="My Application"
              draggable={false}
              resizable={false}
              onClose={() => alert('close')}
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Window content goes here. The title bar uses vibrancy material
                and the traffic lights appear on hover.
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Traffic Lights — Right" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSWindow
              title="Settings"
              trafficLightsPosition="right"
              draggable={false}
              resizable={false}
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Traffic lights positioned on the right side of the title bar.
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Without Traffic Lights + Custom Actions"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6">
            <MacOSWindow
              title="Document"
              showTrafficLights={false}
              draggable={false}
              resizable={false}
              actions={
                <Button size="mini" shape="rounded" color="info">
                  Save
                </Button>
              }
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Traffic lights hidden. A custom action button appears in the
                trailing slot.
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Toggle Visibility" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Button onClick={() => setOpen((v) => !v)}>
              {open ? 'Hide Window' : 'Show Window'}
            </Button>
            {open && (
              <MacOSWindow
                title="Toggled Window"
                draggable={false}
                resizable={false}
                onClose={() => setOpen(false)}
              >
                <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                  Click the red traffic light or the button above to close.
                </div>
              </MacOSWindow>
            )}
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSWindow"
        defaultValues={{
          title: 'My Window',
          draggable: true,
          resizable: true,
          showTrafficLights: true,
          trafficLightsPosition: 'left',
          defaultWidth: 380,
          defaultHeight: 200,
          minWidth: 200,
          minHeight: 120,
        }}
        controlOverrides={[
          {
            name: 'title',
            type: 'text',
            description: 'Window title displayed in the title bar',
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Allow drag-moving by the title bar',
          },
          {
            name: 'resizable',
            type: 'boolean',
            description: 'Allow resizing from edges/corners',
          },
          {
            name: 'showTrafficLights',
            type: 'boolean',
            description: 'Show close/minimize/maximize buttons',
          },
          {
            name: 'trafficLightsPosition',
            type: 'select',
            options: ['left', 'right'],
            description: 'Position of traffic light buttons',
          },
          {
            name: 'defaultWidth',
            type: 'text',
            description: 'Initial width (px or CSS value)',
          },
          {
            name: 'defaultHeight',
            type: 'text',
            description: 'Initial height (px or CSS value)',
          },
          {
            name: 'minWidth',
            type: 'text',
            description: 'Minimum width in pixels',
          },
          {
            name: 'minHeight',
            type: 'text',
            description: 'Minimum height in pixels',
          },
        ]}
        includeProps={[
          'title',
          'draggable',
          'resizable',
          'showTrafficLights',
          'trafficLightsPosition',
          'defaultWidth',
          'defaultHeight',
          'minWidth',
          'minHeight',
        ]}
        excludeProps={[
          'className',
          'titleBarClassName',
          'actions',
          'onClose',
          'onMinimize',
          'onMaximize',
        ]}
      >
        {(props) => <WindowPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSWindow" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSWindow } from '@e-burgos/tucu-ui';

// Interactive window — drag, resize, maximize
<MacOSWindow
  title="My Application"
  defaultWidth={500}
  defaultHeight={300}
  minWidth={200}
  minHeight={120}
>
  <div className="p-6">Drag, resize, or double-click title bar</div>
</MacOSWindow>

// Static window (no drag/resize)
<MacOSWindow title="Static" draggable={false} resizable={false}>
  <div className="p-6">Content</div>
</MacOSWindow>

// Traffic lights on the right
<MacOSWindow title="Settings" trafficLightsPosition="right">
  <div className="p-6">Content</div>
</MacOSWindow>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSWindowSection;
