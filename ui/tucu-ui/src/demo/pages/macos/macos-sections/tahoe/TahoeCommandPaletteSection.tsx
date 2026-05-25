import { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '../../../../../index';
import { MacOSTahoeCommandPalette } from '../../../../../components/macos/tahoe/feedback/command-palette-tahoe';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

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

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function CommandPlayground(props: {
  placeholder?: string;
  triggerKey?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
      >
        Open Command Palette
      </button>
      <MacOSTahoeCommandPalette
        {...props}
        items={sampleItems}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}

const TahoeCommandPaletteSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroCard
        title="Command Palette"
        description="Spotlight-style command palette with glass material, real-time search filtering, grouped results, keyboard navigation, and customizable trigger key."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-orange-500/50">
            <LucideIcons.Command className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Interactive Demo" className="mt-2 mb-2">
          <div className="space-y-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg border border-(--macos-glass-border) bg-(--macos-glass-clear-bg) px-4 py-2 text-[13px] text-(--macos-tahoe-text) backdrop-blur-sm transition-colors hover:bg-(--macos-tahoe-hover)"
            >
              Open Command Palette
            </button>
            <p className="text-[12px] text-(--macos-tahoe-text-muted)">
              Or press{' '}
              <kbd className="rounded border border-(--macos-glass-border) px-1.5 py-0.5 text-[11px]">
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
                className="flex gap-3 rounded-lg bg-(--macos-glass-clear-bg) p-3 backdrop-blur-sm border border-(--macos-glass-border-subtle)"
              >
                <div className="mt-0.5 text-(--macos-tahoe-accent)">
                  {feat.icon}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-(--macos-tahoe-text)">
                    {feat.title}
                  </p>
                  <p className="text-[12px] text-(--macos-tahoe-text-muted)">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
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

      <PropPlayground
        componentName="MacOSTahoeCommandPalette"
        defaultValues={{
          placeholder: 'Type a command or search...',
          triggerKey: 'k',
        }}
        includeProps={['placeholder', 'triggerKey']}
        excludeProps={['className', 'items', 'open', 'onOpenChange']}
      >
        {(props) => <CommandPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeCommandPalette" />
    </>
  );
};

export default TahoeCommandPaletteSection;
