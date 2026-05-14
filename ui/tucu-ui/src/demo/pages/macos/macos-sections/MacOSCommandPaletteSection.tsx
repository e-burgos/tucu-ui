import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
} from '../../../../index';
import {
  MacOSCommandPalette,
  type MacOSCommandPaletteItem,
} from '../../../../components/macos/command-palette';
import { LucideIcons } from '../../../../index';

const SAMPLE_ITEMS: MacOSCommandPaletteItem[] = [
  {
    id: 'new-file',
    label: 'New File',
    group: 'File',
    icon: <LucideIcons.FilePlus size={14} />,
    shortcut: ['⌘', 'N'],
    onSelect: () => alert('New File'),
  },
  {
    id: 'open-file',
    label: 'Open File',
    description: 'Browse your workspace',
    group: 'File',
    icon: <LucideIcons.FolderOpen size={14} />,
    shortcut: ['⌘', 'O'],
    onSelect: () => alert('Open File'),
  },
  {
    id: 'save',
    label: 'Save',
    group: 'File',
    icon: <LucideIcons.Save size={14} />,
    shortcut: ['⌘', 'S'],
    onSelect: () => alert('Save'),
  },
  {
    id: 'toggle-theme',
    label: 'Toggle Dark Mode',
    group: 'View',
    icon: <LucideIcons.Moon size={14} />,
    onSelect: () => alert('Toggle Theme'),
  },
  {
    id: 'command-palette',
    label: 'Command Palette',
    description: 'Search commands',
    group: 'View',
    icon: <LucideIcons.Terminal size={14} />,
    shortcut: ['⌘', 'K'],
    onSelect: () => undefined,
  },
  {
    id: 'go-to-docs',
    label: 'Go to Documentation',
    group: 'Navigation',
    icon: <LucideIcons.BookOpen size={14} />,
    onSelect: () => alert('Navigate to Docs'),
  },
  {
    id: 'settings',
    label: 'Open Settings',
    group: 'Navigation',
    icon: <LucideIcons.Settings size={14} />,
    shortcut: ['⌘', ','],
    onSelect: () => alert('Settings'),
  },
];

const MacOSCommandPaletteSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSCommandPalette
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A native macOS Spotlight-style command palette with Liquid Glass,
          grouped results, keyboard navigation, and shortcuts. Triggered via{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">
            ⌘K
          </kbd>{' '}
          by default.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="Interactive Demo" className="mt-2 mb-2">
          <div className="p-6 flex flex-col items-center gap-4">
            <Button variant="solid" size="medium" onClick={() => setOpen(true)}>
              <LucideIcons.Search size={14} className="mr-2" />
              Open Command Palette
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Or press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                ⌘K
              </kbd>{' '}
              anywhere on this page
            </p>
          </div>
        </CardTitle>
      </CardContainer>

      <MacOSCommandPalette
        open={open}
        onOpenChange={setOpen}
        items={SAMPLE_ITEMS}
        placeholder="Search commands, files, navigation…"
      />

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="p-4">
            <CodeBlock
              code={`import { MacOSCommandPalette } from '@e-burgos/tucu-ui';

const items = [
  {
    id: 'new-file',
    label: 'New File',
    group: 'File',
    shortcut: ['⌘', 'N'],
    onSelect: () => { /* ... */ },
  },
];

<MacOSCommandPalette
  items={items}
  placeholder="Search commands…"
  open={open}
  onOpenChange={setOpen}
  triggerKey="k"  // default Cmd+K
/>`}
              language="tsx"
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSCommandPaletteSection;
