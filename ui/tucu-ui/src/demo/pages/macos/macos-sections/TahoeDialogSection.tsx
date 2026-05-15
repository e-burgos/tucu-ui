import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import {
  MacOSTahoeDialog,
  MacOSTahoeDialogButton,
} from '../../../../components/macos/tahoe/dialog-tahoe';

export const TahoeDialogSection: React.FC = () => {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Dialog
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Modal dialog with prominent glass material, overlay blur, focus
          trapping, and footer action buttons.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="Basic Dialog" className="mt-2 mb-2">
          <button
            onClick={() => setBasic(true)}
            className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-4 py-2 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm transition-colors hover:bg-[var(--macos-tahoe-hover)]"
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
            <div className="space-y-3 text-[var(--macos-tahoe-text)]">
              <div className="flex items-center gap-3">
                <LucideIcons.Laptop className="h-10 w-10 text-[var(--macos-tahoe-accent)]" />
                <div>
                  <p className="text-[15px] font-semibold">macOS Tahoe</p>
                  <p className="text-[13px] text-[var(--macos-tahoe-text-muted)]">
                    Version 26.0
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-[var(--macos-tahoe-text-muted)] leading-relaxed">
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
            className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-4 py-2 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm transition-colors hover:bg-[var(--macos-tahoe-hover)]"
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
            <p className="text-[13px] text-[var(--macos-tahoe-text-muted)] leading-relaxed">
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
            className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-4 py-2 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm transition-colors hover:bg-[var(--macos-tahoe-hover)]"
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
                <label className="mb-1 block text-[12px] font-medium text-[var(--macos-tahoe-text)]">
                  Save As:
                </label>
                <input
                  defaultValue="Untitled"
                  className="w-full rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-3 py-2 text-[13px] text-[var(--macos-tahoe-text)] outline-none backdrop-blur-sm focus:ring-2 focus:ring-[var(--macos-tahoe-accent)]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[var(--macos-tahoe-text)]">
                  Tags:
                </label>
                <input
                  placeholder="Add tags..."
                  className="w-full rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-3 py-2 text-[13px] text-[var(--macos-tahoe-text)] outline-none backdrop-blur-sm placeholder:text-[var(--macos-tahoe-text-muted)] focus:ring-2 focus:ring-[var(--macos-tahoe-accent)]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[var(--macos-tahoe-text)]">
                  File Format:
                </label>
                <select className="w-full rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-3 py-2 text-[13px] text-[var(--macos-tahoe-text)] outline-none backdrop-blur-sm focus:ring-2 focus:ring-[var(--macos-tahoe-accent)]/40">
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
        <CardTitle title="Usage" className="mt-2 mb-2">
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
    </>
  );
};

export default TahoeDialogSection;
