import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { MacOSTahoeWindow } from '@tucu-ui-internal/components/macos/tahoe/containers/window-tahoe';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── Helper: restore button ────────────────────────────────────

function RestoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex items-center gap-2 rounded-lg bg-(--color-brand) px-3 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
    >
      <LucideIcons.RotateCcw className="h-3.5 w-3.5" />
      Restore Window
    </button>
  );
}

// ─── Hook for restorable window state ──────────────────────────

function useWindowState() {
  const [key, setKey] = useState(0);
  const [closed, setClosed] = useState(false);
  const onClose = () => setClosed(true);
  const restore = () => {
    setClosed(false);
    setKey((k) => k + 1);
  };
  return { key, closed, onClose, restore };
}

export const TahoeWindowSection: React.FC = () => {
  const defaultWin = useWindowState();
  const behaviorWin = useWindowState();
  const disabledWin = useWindowState();
  const leftWin = useWindowState();
  const rightWin = useWindowState();
  const cleanWin = useWindowState();
  const dragWin = useWindowState();

  return (
    <>
      <HeroCard
        title="Window"
        description="Liquid Glass window with translucent title bar, traffic lights, and optional resize handles. Supports close, minimize, fullscreen, and portal rendering."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-slate-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-slate-500/50">
            <LucideIcons.AppWindow className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Default Window" className="mt-2 mb-2">
          <div
            className="relative w-full overflow-hidden rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 p-8"
            style={{ minHeight: 320 }}
          >
            <MacOSTahoeWindow
              key={defaultWin.key}
              title="Liquid Glass Window"
              width={420}
              defaultState={defaultWin.closed ? 'closed' : 'normal'}
              onClose={defaultWin.onClose}
            >
              <div className="p-6 text-sm text-(--macos-tahoe-text)">
                <p className="mb-2 font-medium">Glass Material Window</p>
                <p className="text-[12px] text-(--macos-tahoe-text-muted) leading-relaxed">
                  This window uses <code>--macos-glass-regular-bg</code> for its
                  translucent background and <code>--macos-glass-clear-bg</code>{' '}
                  for the title bar, creating the characteristic Tahoe layered
                  glass effect.
                </p>
              </div>
            </MacOSTahoeWindow>
            {defaultWin.closed && (
              <RestoreButton onClick={defaultWin.restore} />
            )}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Traffic Lights Behavior" className="mt-2 mb-2">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-4"
          >
            🔴 Close hides the window &nbsp;·&nbsp; 🟡 Minimize collapses to
            header only &nbsp;·&nbsp; 🟢 Maximize restores or toggles fullscreen
            (with <code>fullSize</code>). Use <code>defaultState</code> to
            restore programmatically.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 p-6">
              <MacOSTahoeWindow
                key={behaviorWin.key}
                title="Try the buttons"
                width="100%"
                fullSize
                defaultState={behaviorWin.closed ? 'closed' : 'normal'}
                onClose={behaviorWin.onClose}
              >
                <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                  Click 🔴 to close, 🟡 to minimize, 🟢 to fullscreen.
                </div>
              </MacOSTahoeWindow>
              {behaviorWin.closed && (
                <RestoreButton onClick={behaviorWin.restore} />
              )}
            </div>
            <div className="rounded-xl bg-linear-to-br from-teal-500/20 to-green-500/20 p-6">
              <MacOSTahoeWindow
                key={disabledWin.key}
                title="Disabled Close"
                width="100%"
                disableClose
                defaultState={disabledWin.closed ? 'closed' : 'normal'}
                onClose={disabledWin.onClose}
              >
                <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                  The close button is disabled. Minimize and maximize still
                  work.
                </div>
              </MacOSTahoeWindow>
              {disabledWin.closed && (
                <RestoreButton onClick={disabledWin.restore} />
              )}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Traffic Lights Positions" className="mt-2 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 p-6">
              <MacOSTahoeWindow
                key={leftWin.key}
                title="Left (default)"
                width="100%"
                defaultState={leftWin.closed ? 'closed' : 'normal'}
                onClose={leftWin.onClose}
              >
                <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                  Traffic lights on the left side.
                </div>
              </MacOSTahoeWindow>
              {leftWin.closed && <RestoreButton onClick={leftWin.restore} />}
            </div>
            <div className="rounded-xl bg-linear-to-br from-teal-500/20 to-green-500/20 p-6">
              <MacOSTahoeWindow
                key={rightWin.key}
                title="Right"
                width="100%"
                trafficLightsPosition="right"
                defaultState={rightWin.closed ? 'closed' : 'normal'}
                onClose={rightWin.onClose}
              >
                <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                  Traffic lights on the right side.
                </div>
              </MacOSTahoeWindow>
              {rightWin.closed && <RestoreButton onClick={rightWin.restore} />}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="No Traffic Lights" className="mt-2 mb-2">
          <div className="rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 p-6">
            <MacOSTahoeWindow
              key={cleanWin.key}
              title="Clean Window"
              width={360}
              showTrafficLights={false}
              defaultState={cleanWin.closed ? 'closed' : 'normal'}
              onClose={cleanWin.onClose}
            >
              <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                Window without traffic light controls — ideal for utility panels
                or embedded views.
              </div>
            </MacOSTahoeWindow>
            {cleanWin.closed && <RestoreButton onClick={cleanWin.restore} />}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Draggable Window" className="mt-2 mb-2">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-4"
          >
            With <code>draggable</code>, grab the title bar to move the window
            freely across the viewport. It automatically portals when dragged.
          </Typography>
          <div
            className="relative w-full overflow-hidden rounded-xl bg-linear-to-br from-rose-500/20 to-pink-500/20 p-8"
            style={{ minHeight: 280 }}
          >
            <MacOSTahoeWindow
              key={dragWin.key}
              title="Drag me!"
              width={380}
              draggable
              defaultState={dragWin.closed ? 'closed' : 'normal'}
              onClose={dragWin.onClose}
            >
              <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                Grab the title bar and drag this window anywhere on the screen.
              </div>
            </MacOSTahoeWindow>
            {dragWin.closed && <RestoreButton onClick={dragWin.restore} />}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeWindow } from '@e-burgos/tucu-ui';

<MacOSTahoeWindow
  title="My Window"
  showTrafficLights
  trafficLightsPosition="left"   // 'left' | 'right'
  resizable
  fullSize                        // 🟢 second click = fullscreen
  portal                          // renders via portal
  defaultState="normal"           // 'normal' | 'minimized' | 'fullscreen' | 'closed'
  width={480}
  height={320}
  minWidth={200}
  minHeight={120}
  disableClose                    // disable 🔴
  disableMinimize                 // disable 🟡
  disableMaximize                 // disable 🟢
  draggable                        // drag by title bar
  onClose={() => setClosed(true)}
  onMinimize={() => console.log('minimize')}
  onMaximize={() => console.log('maximize')}
>
  <div className="p-6">Window content</div>
</MacOSTahoeWindow>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeWindow"
        defaultValues={{
          title: 'My Window',
          defaultState: 'normal',
          trafficLightsPosition: 'left',
          showTrafficLights: true,
          disableClose: false,
          disableMinimize: false,
          disableMaximize: false,
          draggable: false,
          fullSize: false,
          resizable: false,
          portal: false,
          width: 380,
          minWidth: 200,
          minHeight: 120,
        }}
        includeProps={[
          'title',
          'defaultState',
          'trafficLightsPosition',
          'showTrafficLights',
          'disableClose',
          'disableMinimize',
          'disableMaximize',
          'draggable',
          'fullSize',
          'resizable',
          'portal',
          'width',
          'minWidth',
          'minHeight',
        ]}
        excludeProps={[
          'className',
          'height',
          'titleBarClassName',
          'onClose',
          'onMinimize',
          'onMaximize',
        ]}
      >
        {(props) => (
          <div
            className="relative rounded-xl bg-linear-to-br from-slate-500/20 to-indigo-500/20 p-8"
            style={{ minHeight: 220 }}
          >
            <MacOSTahoeWindow {...props}>
              <div className="p-4 text-[13px] text-(--macos-tahoe-text)">
                Interactive window — adjust props above.
              </div>
            </MacOSTahoeWindow>
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeWindow" />
    </>
  );
};

export default TahoeWindowSection;
