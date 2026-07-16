import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import {
  MacOSTahoePopover,
  MacOSTahoePopoverItem,
} from '@tucu-ui-internal/components/macos/tahoe/feedback/popover-tahoe';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function PopoverPlayground(props: {
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  minWidth?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <MacOSTahoePopover
      {...props}
      isOpen={open}
      onClose={() => setOpen(false)}
      content={
        <div className="flex flex-col gap-0.5">
          <MacOSTahoePopoverItem
            label="New File"
            icon={<LucideIcons.FilePlus className="h-4 w-4" />}
            shortcut="⌘N"
            onClick={() => setOpen(false)}
          />
          <MacOSTahoePopoverItem
            label="Open..."
            icon={<LucideIcons.FolderOpen className="h-4 w-4" />}
            shortcut="⌘O"
            onClick={() => setOpen(false)}
          />
          <div className="my-1 h-px bg-(--macos-glass-border-subtle)" />
          <MacOSTahoePopoverItem
            label="Delete"
            icon={<LucideIcons.Trash2 className="h-4 w-4" />}
            destructive
            onClick={() => setOpen(false)}
          />
        </div>
      }
    >
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
      >
        Open Menu
      </button>
    </MacOSTahoePopover>
  );
}

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
      <div className="my-1 h-px bg-(--macos-glass-border-subtle)" />
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
      <div className="my-1 h-px bg-(--macos-glass-border-subtle)" />
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
      <HeroCard
        title="Popover"
        description="Glass-material popover with prominent blur, placement options, menu items with icons, shortcuts, and destructive actions."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg border border-green-500/50">
            <LucideIcons.MousePointerClick className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
              className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
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
                <div className="p-2 text-[13px] text-(--macos-tahoe-text)">
                  Bottom Start
                </div>
              }
            >
              <button
                onClick={() => setOpen2(!open2)}
                className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-3 py-1.5 text-[12px] text-(--macos-tahoe-text) backdrop-blur-sm"
              >
                bottom-start
              </button>
            </MacOSTahoePopover>

            <MacOSTahoePopover
              isOpen={open3}
              onClose={() => setOpen3(false)}
              placement="bottom-end"
              content={
                <div className="p-2 text-[13px] text-(--macos-tahoe-text)">
                  Bottom End
                </div>
              }
            >
              <button
                onClick={() => setOpen3(!open3)}
                className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-3 py-1.5 text-[12px] text-(--macos-tahoe-text) backdrop-blur-sm"
              >
                bottom-end
              </button>
            </MacOSTahoePopover>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
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

      <PropPlayground
        componentName="MacOSTahoePopover"
        defaultValues={{ placement: 'bottom-start', minWidth: 200 }}
        includeProps={['placement', 'minWidth']}
        excludeProps={[
          'className',
          'contentClassName',
          'content',
          'isOpen',
          'onClose',
          'children',
        ]}
      >
        {(props) => <PopoverPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoePopover" />
    </>
  );
};

export default TahoePopoverSection;
