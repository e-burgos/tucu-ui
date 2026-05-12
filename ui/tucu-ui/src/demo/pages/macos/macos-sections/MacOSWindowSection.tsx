import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
} from '../../../../index';
import { MacOSWindow } from '../../../../components/macos/window';

const MacOSWindowSection: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSWindow
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A macOS-style window container with vibrancy title bar, traffic-light
          buttons, and optional action slots. Supports drag, resize, maximize
          and minimize.
        </Typography>
      </div>

      <CardContainer>
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

      <CardContainer>
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
                and the traffic lights appear on hover with ×, −, ⤢ icons.
              </div>
            </MacOSWindow>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
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

      <CardContainer>
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

      <CardContainer>
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
                  Click the red traffic light or the button above to close this
                  window.
                </div>
              </MacOSWindow>
            )}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
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
<MacOSWindow
  title="Static"
  draggable={false}
  resizable={false}
>
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
