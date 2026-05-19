import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
} from '../../../../../index';
import { MacOSCommandPalette } from '../../../../../components/macos/sonoma/feedback/command-palette';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

const SAMPLE_ITEMS = [
  { id: 'new-file', label: 'New File', group: 'File', shortcut: ['⌘', 'N'], icon: <LucideIcons.FilePlus className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'open-file', label: 'Open File', group: 'File', shortcut: ['⌘', 'O'], icon: <LucideIcons.FolderOpen className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'save', label: 'Save', group: 'File', shortcut: ['⌘', 'S'], icon: <LucideIcons.Save className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'settings', label: 'Settings', group: 'Navigation', shortcut: ['⌘', ','], icon: <LucideIcons.Settings className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'theme', label: 'Toggle Theme', group: 'Navigation', icon: <LucideIcons.Moon className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'terminal', label: 'Open Terminal', group: 'Tools', shortcut: ['⌘', '`'], icon: <LucideIcons.Terminal className="w-4 h-4" />, onSelect: () => undefined },
  { id: 'search', label: 'Search in Files', group: 'Tools', shortcut: ['⌘', 'Shift', 'F'], icon: <LucideIcons.Search className="w-4 h-4" />, onSelect: () => undefined },
];

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function CommandPalettePlayground(props: {
  placeholder?: string;
  triggerKey?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="solid" size="medium" onClick={() => setOpen(true)}>
        <LucideIcons.Search size={14} className="mr-2" />
        Open Command Palette
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Or press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">⌘{props.triggerKey?.toUpperCase() ?? 'K'}</kbd>
      </p>
      <MacOSCommandPalette
        open={open}
        onOpenChange={setOpen}
        items={SAMPLE_ITEMS}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export const MacOSCommandPaletteSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroCard
        title="CommandPalette"
        description="A native macOS Spotlight-style command palette with Liquid Glass, grouped results, keyboard navigation, shortcut display, and fuzzy search. Triggered via ⌘K by default."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-orange-500/50">
            <LucideIcons.Command className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Demo" className="mt-2 mb-2">
          <div className="p-6 flex flex-col items-center gap-4">
            <Button variant="solid" size="medium" onClick={() => setOpen(true)}>
              <LucideIcons.Search size={14} className="mr-2" />
              Open Command Palette
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Or press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">⌘K</kbd>{' '}
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

      <PropPlayground
        componentName="MacOSCommandPalette"
        defaultValues={{
          placeholder: 'Search or type a command…',
          triggerKey: 'k',
        }}
        controlOverrides={[
          { name: 'placeholder', type: 'text', description: 'Search input placeholder' },
          { name: 'triggerKey', type: 'text', description: 'Keyboard shortcut letter (Meta+key)' },
        ]}
        includeProps={['placeholder', 'triggerKey']}
        excludeProps={['className', 'items', 'open', 'onOpenChange']}
      >
        {(props) => <CommandPalettePlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSCommandPalette" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSCommandPalette } from '@e-burgos/tucu-ui';

const items = [
  {
    id: 'new-file',
    label: 'New File',
    group: 'File',
    shortcut: ['⌘', 'N'],
    icon: <FilePlusIcon />,
    onSelect: () => { /* … */ },
  },
  {
    id: 'settings',
    label: 'Settings',
    group: 'Navigation',
    shortcut: ['⌘', ','],
    onSelect: () => navigate('/settings'),
  },
];

function App() {
  const [open, setOpen] = useState(false);

  return (
    <MacOSCommandPalette
      items={items}
      placeholder="Search commands…"
      open={open}
      onOpenChange={setOpen}
      triggerKey="k"   // default: Meta+K
    />
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSCommandPaletteSection;
