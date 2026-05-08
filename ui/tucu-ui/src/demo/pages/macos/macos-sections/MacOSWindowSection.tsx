import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, Button } from '../../../../index';
import { MacOSWindow } from '../../../../components/macos/window';

const MacOSWindowSection: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSWindow
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A macOS-style window container with vibrancy title bar, traffic-light buttons, and
          optional action slots.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Traffic Lights — Left (default)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSWindow
              title="My Application"
              onClose={() => alert('close')}
              onMinimize={() => alert('minimize')}
              onMaximize={() => alert('maximize')}
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Window content goes here. The title bar uses vibrancy material and the traffic
                lights appear on hover with ×, −, ⤢ icons.
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
              onClose={() => {}}
              onMinimize={() => {}}
              onMaximize={() => {}}
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Traffic lights positioned on the right side of the title bar.
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Without Traffic Lights + Custom Actions" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <MacOSWindow
              title="Document"
              showTrafficLights={false}
              actions={
                <Button size="mini" shape="rounded" color="info">
                  Save
                </Button>
              }
            >
              <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                Traffic lights hidden. A custom action button appears in the trailing slot.
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
              <MacOSWindow title="Toggled Window" onClose={() => setOpen(false)}>
                <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
                  Click the red traffic light or the button above to close this window.
                </div>
              </MacOSWindow>
            )}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSWindow } from '@e-burgos/tucu-ui';

// Basic window with traffic lights
<MacOSWindow
  title="My Application"
  onClose={() => {}}
  onMinimize={() => {}}
  onMaximize={() => {}}
>
  <div className="p-6">Content goes here</div>
</MacOSWindow>

// Traffic lights on the right
<MacOSWindow title="Settings" trafficLightsPosition="right">
  <div className="p-6">Content</div>
</MacOSWindow>

// No traffic lights, custom action
<MacOSWindow
  title="Document"
  showTrafficLights={false}
  actions={<button>Save</button>}
>
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
