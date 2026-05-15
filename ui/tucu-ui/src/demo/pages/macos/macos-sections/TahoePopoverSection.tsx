import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import {
  MacOSTahoePopover,
  MacOSTahoePopoverItem,
} from '../../../../components/macos/tahoe/popover-tahoe';

export const TahoePopoverSection: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const menuItems = (
    <div className="flex flex-col gap-0.5">
      <MacOSTahoePopoverItem
        label="New File"
        icon={<LucideIcons.FilePlus className="h-4 w-4" />}
        shortcut="⌘N"
        onClick={() => setOpen1(false)}
      />
      <MacOSTahoePopoverItem
        label="Open..."
        icon={<LucideIcons.FolderOpen className="h-4 w-4" />}
        shortcut="⌘O"
        onClick={() => setOpen1(false)}
      />
      <div className="my-1 h-px bg-[var(--macos-glass-border-subtle)]" />
      <MacOSTahoePopoverItem
        label="Save"
        icon={<LucideIcons.Save className="h-4 w-4" />}
        shortcut="⌘S"
        onClick={() => setOpen1(false)}
      />
      <MacOSTahoePopoverItem
        label="Export"
        icon={<LucideIcons.Download className="h-4 w-4" />}
        onClick={() => setOpen1(false)}
      />
      <div className="my-1 h-px bg-[var(--macos-glass-border-subtle)]" />
      <MacOSTahoePopoverItem
        label="Delete"
        icon={<LucideIcons.Trash2 className="h-4 w-4" />}
        destructive
        onClick={() => setOpen1(false)}
      />
    </div>
  );

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Popover
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Glass-material popover with prominent blur, placement options, menu
          items with icons, shortcuts, and destructive actions.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="Basic Menu" className="mt-2 mb-2">
          <MacOSTahoePopover
            isOpen={open1}
            onClose={() => setOpen1(false)}
            placement="bottom-start"
            content={menuItems}
          >
            <button
              onClick={() => setOpen1(!open1)}
              className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-4 py-2 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm transition-colors hover:bg-[var(--macos-tahoe-hover)]"
            >
              File Menu
            </button>
          </MacOSTahoePopover>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Placements" className="mt-2 mb-2">
          <div className="flex flex-wrap gap-3">
            <MacOSTahoePopover
              isOpen={open2}
              onClose={() => setOpen2(false)}
              placement="bottom-start"
              content={
                <div className="p-2 text-[13px] text-[var(--macos-tahoe-text)]">
                  Bottom Start
                </div>
              }
            >
              <button
                onClick={() => setOpen2(!open2)}
                className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-3 py-1.5 text-[12px] text-[var(--macos-tahoe-text)] backdrop-blur-sm"
              >
                bottom-start
              </button>
            </MacOSTahoePopover>

            <MacOSTahoePopover
              isOpen={open3}
              onClose={() => setOpen3(false)}
              placement="bottom-end"
              content={
                <div className="p-2 text-[13px] text-[var(--macos-tahoe-text)]">
                  Bottom End
                </div>
              }
            >
              <button
                onClick={() => setOpen3(!open3)}
                className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-3 py-1.5 text-[12px] text-[var(--macos-tahoe-text)] backdrop-blur-sm"
              >
                bottom-end
              </button>
            </MacOSTahoePopover>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Usage" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoePopover, MacOSTahoePopoverItem } from '@e-burgos/tucu-ui';

<MacOSTahoePopover
  isOpen={open}
  onClose={() => setOpen(false)}
  placement="bottom-start"
  content={
    <>
      <MacOSTahoePopoverItem
        label="New File"
        icon={<FilePlusIcon />}
        shortcut="⌘N"
        onClick={() => {}}
      />
      <MacOSTahoePopoverItem
        label="Delete"
        destructive
        onClick={() => {}}
      />
    </>
  }
>
  <button onClick={() => setOpen(true)}>Open</button>
</MacOSTahoePopover>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TahoePopoverSection;
