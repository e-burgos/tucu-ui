import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, LucideIcons } from '../../../../index';
import { MacOSPopover, MacOSPopoverItem } from '../../../../components/macos/popover';

const MacOSPopoverSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((v) => (v === id ? null : id));
  const close = () => setOpenId(null);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSPopover
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A native-feel contextual popover with vibrancy backdrop blur, four placement options, and
          a pre-built <code>MacOSPopoverItem</code> for menu-like lists.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Context Menu (bottom)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center pt-12 pb-48">
            <MacOSPopover
              isOpen={openId === 'menu'}
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
                    label="Open…"
                    icon={<LucideIcons.FolderOpen className="w-4 h-4" />}
                    shortcut="⌘O"
                    onClick={close}
                  />
                  <MacOSPopoverItem
                    label="Save"
                    icon={<LucideIcons.Save className="w-4 h-4" />}
                    shortcut="⌘S"
                    onClick={close}
                  />
                  <div className="my-1 border-t border-[var(--color-semantic-line-primary-subtle)]" />
                  <MacOSPopoverItem
                    label="Move to Trash"
                    icon={<LucideIcons.Trash2 className="w-4 h-4" />}
                    shortcut="⌘⌫"
                    destructive
                    onClick={close}
                  />
                </div>
              }
            >
              <button
                onClick={() => toggle('menu')}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-semantic-line-primary-subtle)] px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-500/10 transition-colors"
              >
                <LucideIcons.MoreHorizontal className="w-4 h-4" />
                File Menu
              </button>
            </MacOSPopover>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Four Placements" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-8 p-8">
              {(['bottom', 'top', 'right', 'left'] as const).map((placement) => (
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
                      className="rounded-lg border border-[var(--color-semantic-line-primary-subtle)] px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-500/10 transition-colors capitalize"
                    >
                      {placement}
                    </button>
                  </MacOSPopover>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Disabled Item" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 flex justify-center pb-40">
            <MacOSPopover
              isOpen={openId === 'disabled'}
              onClose={close}
              content={
                <div className="py-1">
                  <MacOSPopoverItem label="Available" icon={<LucideIcons.Check className="w-4 h-4" />} onClick={close} />
                  <MacOSPopoverItem label="Unavailable" icon={<LucideIcons.Lock className="w-4 h-4" />} disabled onClick={close} />
                  <MacOSPopoverItem label="Delete" destructive icon={<LucideIcons.Trash2 className="w-4 h-4" />} onClick={close} />
                </div>
              }
            >
              <button
                onClick={() => toggle('disabled')}
                className="rounded-lg border border-[var(--color-semantic-line-primary-subtle)] px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-500/10 transition-colors"
              >
                Show Popover
              </button>
            </MacOSPopover>
          </div>
        </CardTitle>
      </CardContainer>

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
          <MacOSPopoverItem
            label="Admin Only"
            disabled
          />
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
