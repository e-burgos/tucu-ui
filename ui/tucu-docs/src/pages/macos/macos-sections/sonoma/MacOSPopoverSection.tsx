import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import {
  MacOSPopover,
  MacOSPopoverItem,
} from '@tucu-ui-internal/components/macos/sonoma/feedback/popover';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function PopoverPlayground(props: {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  minWidth?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center py-12">
      <MacOSPopover
        isOpen={open}
        onClose={() => setOpen(false)}
        placement={props.placement}
        minWidth={props.minWidth}
        content={
          <div className="py-1">
            <MacOSPopoverItem
              label="New File"
              icon={<LucideIcons.FilePlus className="w-4 h-4" />}
              shortcut="⌘N"
              onClick={() => setOpen(false)}
            />
            <MacOSPopoverItem
              label="Open"
              icon={<LucideIcons.FolderOpen className="w-4 h-4" />}
              shortcut="⌘O"
              onClick={() => setOpen(false)}
            />
            <MacOSPopoverItem
              label="Delete"
              icon={<LucideIcons.Trash2 className="w-4 h-4" />}
              destructive
              onClick={() => setOpen(false)}
            />
          </div>
        }
      >
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-border px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Open Popover ({props.placement})
        </button>
      </MacOSPopover>
    </div>
  );
}

export const MacOSPopoverSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((v) => (v === id ? null : id));
  const close = () => setOpenId(null);

  return (
    <>
      <HeroCard
        title="Popover"
        description="A macOS-style popover / context menu with backdrop blur, placement options, keyboard shortcuts, destructive styling, disabled items, and animated show/hide."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
            <LucideIcons.MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Context Menu" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center pb-40">
            <MacOSPopover
              isOpen={openId === 'context'}
              onClose={close}
              placement="bottom"
              content={
                <div className="py-1">
                  <MacOSPopoverItem
                    label="New File"
                    icon={<LucideIcons.FilePlus className="w-4 h-4" />}
                    shortcut="⌘N"
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Open Recent"
                    icon={<LucideIcons.Clock className="w-4 h-4" />}
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Save As…"
                    icon={<LucideIcons.Save className="w-4 h-4" />}
                    shortcut="⌘⇧S"
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Delete"
                    icon={<LucideIcons.Trash2 className="w-4 h-4" />}
                    destructive
                    onClick={close}
                  />
                </div>
              }
            >
              <button
                onClick={() => toggle('context')}
                className="rounded-lg border border-border px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Right-click Menu
              </button>
            </MacOSPopover>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Four Placements" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-8 p-8">
              {(['bottom', 'top', 'right', 'left'] as const).map(
                (placement) => (
                  <div key={placement} className="flex justify-center">
                    <MacOSPopover
                      isOpen={openId === placement}
                      onClose={close}
                      placement={placement}
                      content={
                        <div className="py-1">
                          <MacOSPopoverItem label="Option A" onClick={close} />
                          <MacOSPopoverItem label="Option B" onClick={close} />
                        </div>
                      }
                    >
                      <button
                        onClick={() => toggle(placement)}
                        className="rounded-lg border border-border px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors capitalize"
                      >
                        {placement}
                      </button>
                    </MacOSPopover>
                  </div>
                )
              )}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Disabled & Destructive Items" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center pb-40">
            <MacOSPopover
              isOpen={openId === 'disabled'}
              onClose={close}
              content={
                <div className="py-1">
                  <MacOSPopoverItem
                    label="Available"
                    icon={<LucideIcons.Check className="w-4 h-4" />}
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Unavailable"
                    icon={<LucideIcons.Lock className="w-4 h-4" />}
                    disabled
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Delete"
                    destructive
                    icon={<LucideIcons.Trash2 className="w-4 h-4" />}
                    onClick={close}
                  />
                </div>
              }
            >
              <button
                onClick={() => toggle('disabled')}
                className="rounded-lg border border-border px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Show Popover
              </button>
            </MacOSPopover>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSPopover"
        defaultValues={{
          placement: 'bottom',
          minWidth: 200,
        }}
        controlOverrides={[
          {
            name: 'placement',
            type: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Popover placement relative to trigger',
          },
          {
            name: 'minWidth',
            type: 'text',
            description: 'Minimum width in pixels',
          },
        ]}
        includeProps={['placement', 'minWidth']}
        excludeProps={[
          'className',
          'contentClassName',
          'isOpen',
          'onClose',
          'content',
        ]}
      >
        {(props) => <PopoverPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSPopover" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSPopover, MacOSPopoverItem } from '@e-burgos/tucu-ui';

function ContextMenu() {
  const [open, setOpen] = useState(false);

  return (
    <MacOSPopover
      isOpen={open}
      onClose={() => setOpen(false)}
      placement="bottom"   // 'top' | 'bottom' | 'left' | 'right'
      minWidth={200}
      content={
        <div className="py-1">
          <MacOSPopoverItem
            label="New File"
            icon={<FilePlusIcon />}
            shortcut="⌘N"
            onClick={() => setOpen(false)}
          />
          <MacOSPopoverItem
            label="Delete"
            icon={<TrashIcon />}
            destructive
            onClick={() => setOpen(false)}
          />
          <MacOSPopoverItem label="Admin Only" disabled />
        </div>
      }
    >
      <button onClick={() => setOpen(true)}>Open Menu</button>
    </MacOSPopover>
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSPopoverSection;
