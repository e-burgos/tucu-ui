import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
} from '../../../../index';
import { MacOSTahoeCommandPalette } from '../../../../components/macos/tahoe/command-palette-tahoe';

const sampleItems = [
  {
    id: '1',
    label: 'New File',
    icon: <LucideIcons.FilePlus className="h-4 w-4" />,
    shortcut: '⌘N',
    group: 'File',
  },
  {
    id: '2',
    label: 'Open File...',
    icon: <LucideIcons.FolderOpen className="h-4 w-4" />,
    shortcut: '⌘O',
    group: 'File',
  },
  {
    id: '3',
    label: 'Save',
    icon: <LucideIcons.Save className="h-4 w-4" />,
    shortcut: '⌘S',
    group: 'File',
  },
  {
    id: '4',
    label: 'Find & Replace',
    icon: <LucideIcons.Search className="h-4 w-4" />,
    shortcut: '⌘⇧F',
    group: 'Edit',
  },
  {
    id: '5',
    label: 'Toggle Sidebar',
    icon: <LucideIcons.PanelLeft className="h-4 w-4" />,
    shortcut: '⌘B',
    group: 'View',
  },
  {
    id: '6',
    label: 'Toggle Dark Mode',
    icon: <LucideIcons.Moon className="h-4 w-4" />,
    group: 'View',
  },
  {
    id: '7',
    label: 'Open Terminal',
    icon: <LucideIcons.Terminal className="h-4 w-4" />,
    shortcut: '⌘`',
    group: 'Tools',
  },
  {
    id: '8',
    label: 'Run Build',
    icon: <LucideIcons.Play className="h-4 w-4" />,
    shortcut: '⌘⇧B',
    group: 'Tools',
  },
  {
    id: '9',
    label: 'Git: Commit',
    icon: <LucideIcons.GitCommitHorizontal className="h-4 w-4" />,
    group: 'Git',
  },
  {
    id: '10',
    label: 'Git: Push',
    icon: <LucideIcons.ArrowUpFromLine className="h-4 w-4" />,
    group: 'Git',
  },
];

export const TahoeCommandPaletteSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Command Palette
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Spotlight-style command palette with glass material, real-time search
          filtering, grouped results, keyboard navigation, and customizable
          trigger key.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="Interactive Demo" className="mt-2 mb-2">
          <div className="space-y-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg border border-[var(--macos-glass-border)] bg-[var(--macos-glass-clear-bg)] px-4 py-2 text-[13px] text-[var(--macos-tahoe-text)] backdrop-blur-sm transition-colors hover:bg-[var(--macos-tahoe-hover)]"
            >
              Open Command Palette
            </button>
            <p className="text-[12px] text-[var(--macos-tahoe-text-muted)]">
              Or press{' '}
              <kbd className="rounded border border-[var(--macos-glass-border)] px-1.5 py-0.5 text-[11px]">
                ⌘K
              </kbd>{' '}
              to toggle
            </p>
          </div>

          <MacOSTahoeCommandPalette
            items={sampleItems}
            open={open}
            onOpenChange={setOpen}
            placeholder="Type a command or search..."
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Features" className="mt-2 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <LucideIcons.Search className="h-4 w-4" />,
                title: 'Real-time Filtering',
                desc: 'Fuzzy search across labels and groups',
              },
              {
                icon: <LucideIcons.Keyboard className="h-4 w-4" />,
                title: 'Keyboard Navigation',
                desc: 'Arrow keys to move, Enter to select, Esc to close',
              },
              {
                icon: <LucideIcons.Layers className="h-4 w-4" />,
                title: 'Grouped Results',
                desc: 'Items organized by category with headers',
              },
              {
                icon: <LucideIcons.Sparkles className="h-4 w-4" />,
                title: 'Glass Material',
                desc: 'Prominent blur, translucent background, spatial depth',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="flex gap-3 rounded-lg bg-[var(--macos-glass-clear-bg)] p-3 backdrop-blur-sm border border-[var(--macos-glass-border-subtle)]"
              >
                <div className="mt-0.5 text-[var(--macos-tahoe-accent)]">
                  {feat.icon}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[var(--macos-tahoe-text)]">
                    {feat.title}
                  </p>
                  <p className="text-[12px] text-[var(--macos-tahoe-text-muted)]">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Usage" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeCommandPalette } from '@e-burgos/tucu-ui';

const items = [
  {
    id: '1',
    label: 'New File',
    icon: <FilePlusIcon />,
    shortcut: '⌘N',
    group: 'File',
    onSelect: () => createFile(),
  },
  // ...more items
];

<MacOSTahoeCommandPalette
  items={items}
  open={isOpen}
  onOpenChange={setIsOpen}
  placeholder="Type a command..."
  triggerKey="k"  // ⌘K to toggle
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TahoeCommandPaletteSection;
