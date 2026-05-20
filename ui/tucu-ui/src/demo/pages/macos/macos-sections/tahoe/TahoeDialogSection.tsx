import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '../../../../../index';
import {
  MacOSTahoeDialog,
  MacOSTahoeDialogButton,
} from '../../../../../components/macos/tahoe/containers/dialog-tahoe';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function DialogPlayground(props: {
  title?: string;
  width?: number | string;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
      >
        Open Dialog
      </button>
      <MacOSTahoeDialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <MacOSTahoeDialogButton
            variant="primary"
            onClick={() => setOpen(false)}
          >
            Close
          </MacOSTahoeDialogButton>
        }
      >
        <p className="text-[13px] text-(--macos-tahoe-text-muted) leading-relaxed">
          Adjust the props above to see changes reflected here.
        </p>
      </MacOSTahoeDialog>
    </div>
  );
}

export const TahoeDialogSection: React.FC = () => {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState(false);

  return (
    <>
      <HeroCard
        title="Dialog"
        description="Modal dialog with prominent glass material, overlay blur, focus trapping, and footer action buttons."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg border border-rose-500/50">
            <LucideIcons.MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Basic Dialog" className="mt-2 mb-2">
          <button
            onClick={() => setBasic(true)}
            className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
          >
            Open Dialog
          </button>
          <MacOSTahoeDialog
            open={basic}
            onClose={() => setBasic(false)}
            title="About This Mac"
            footer={
              <MacOSTahoeDialogButton
                variant="primary"
                onClick={() => setBasic(false)}
              >
                OK
              </MacOSTahoeDialogButton>
            }
          >
            <div className="space-y-3 text-(--macos-tahoe-text)">
              <div className="flex items-center gap-3">
                <LucideIcons.Laptop className="h-10 w-10 text-(--macos-tahoe-accent)" />
                <div>
                  <p className="text-[15px] font-semibold">macOS Tahoe</p>
                  <p className="text-[13px] text-(--macos-tahoe-text-muted)">
                    Version 26.0
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-(--macos-tahoe-text-muted) leading-relaxed">
                MacBook Pro (16-inch, 2024)
                <br />
                Apple M4 Max — 48 GB Memory
              </p>
            </div>
          </MacOSTahoeDialog>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Confirmation Dialog" className="mt-2 mb-2">
          <button
            onClick={() => setConfirm(true)}
            className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
          >
            Delete Item
          </button>
          <MacOSTahoeDialog
            open={confirm}
            onClose={() => setConfirm(false)}
            title="Are you sure?"
            width={380}
            footer={
              <>
                <MacOSTahoeDialogButton onClick={() => setConfirm(false)}>
                  Cancel
                </MacOSTahoeDialogButton>
                <MacOSTahoeDialogButton
                  variant="destructive"
                  onClick={() => setConfirm(false)}
                >
                  Delete
                </MacOSTahoeDialogButton>
              </>
            }
          >
            <p className="text-[13px] text-(--macos-tahoe-text-muted) leading-relaxed">
              This will permanently delete the selected item. This action cannot
              be undone.
            </p>
          </MacOSTahoeDialog>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Form Dialog" className="mt-2 mb-2">
          <button
            onClick={() => setForm(true)}
            className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
          >
            Save As...
          </button>
          <MacOSTahoeDialog
            open={form}
            onClose={() => setForm(false)}
            title="Save As"
            width={460}
            footer={
              <>
                <MacOSTahoeDialogButton onClick={() => setForm(false)}>
                  Cancel
                </MacOSTahoeDialogButton>
                <MacOSTahoeDialogButton
                  variant="primary"
                  onClick={() => setForm(false)}
                >
                  Save
                </MacOSTahoeDialogButton>
              </>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-(--macos-tahoe-text)">
                  Save As:
                </label>
                <input
                  defaultValue="Untitled"
                  className="w-full rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-3 py-2 text-[13px] text-(--macos-tahoe-text) outline-none backdrop-blur-sm focus:ring-2 focus:ring-(--macos-tahoe-accent)/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-(--macos-tahoe-text)">
                  Tags:
                </label>
                <input
                  placeholder="Add tags..."
                  className="w-full rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-3 py-2 text-[13px] text-(--macos-tahoe-text) outline-none backdrop-blur-sm placeholder:text-(--macos-tahoe-text-muted) focus:ring-2 focus:ring-(--macos-tahoe-accent)/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-(--macos-tahoe-text)">
                  File Format:
                </label>
                <select className="w-full rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-3 py-2 text-[13px] text-(--macos-tahoe-text) outline-none backdrop-blur-sm focus:ring-2 focus:ring-(--macos-tahoe-accent)/40">
                  <option>Rich Text Document</option>
                  <option>Plain Text</option>
                  <option>HTML</option>
                </select>
              </div>
            </div>
          </MacOSTahoeDialog>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeDialog, MacOSTahoeDialogButton } from '@e-burgos/tucu-ui';

<MacOSTahoeDialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Save As"
  width={420}
  closeOnOverlay
  closeOnEscape
  footer={
    <>
      <MacOSTahoeDialogButton onClick={cancel}>
        Cancel
      </MacOSTahoeDialogButton>
      <MacOSTahoeDialogButton variant="primary" onClick={save}>
        Save
      </MacOSTahoeDialogButton>
    </>
  }
>
  <p>Dialog content</p>
</MacOSTahoeDialog>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeDialog"
        defaultValues={{
          title: 'My Dialog',
          width: 420,
          closeOnEscape: true,
          closeOnOverlay: true,
        }}
        includeProps={['title', 'width', 'closeOnEscape', 'closeOnOverlay']}
        excludeProps={['className', 'open', 'onClose', 'footer']}
      >
        {(props) => <DialogPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeDialog" />
    </>
  );
};

export default TahoeDialogSection;
