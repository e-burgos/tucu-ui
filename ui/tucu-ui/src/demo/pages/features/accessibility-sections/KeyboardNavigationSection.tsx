import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const KeyboardNavigationSection: React.FC = () => {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { key: 'Tab', action: 'Move focus to next interactive element' },
        { key: 'Shift + Tab', action: 'Move focus to previous element' },
        { key: 'Enter / Space', action: 'Activate focused button or link' },
        { key: 'Escape', action: 'Close Modal, Drawer, Select dropdown' },
      ],
    },
    {
      category: 'Tabs Component',
      items: [
        { key: 'ArrowRight', action: 'Focus next tab' },
        { key: 'ArrowLeft', action: 'Focus previous tab' },
        { key: 'Home', action: 'Focus first tab' },
        { key: 'End', action: 'Focus last tab' },
      ],
    },
    {
      category: 'Select / Dropdown',
      items: [
        { key: 'ArrowDown', action: 'Open dropdown / highlight next option' },
        { key: 'ArrowUp', action: 'Highlight previous option' },
        { key: 'Enter / Space', action: 'Select highlighted option' },
        { key: 'Escape', action: 'Close dropdown, restore focus to trigger' },
      ],
    },
    {
      category: 'Modal & Drawer',
      items: [
        { key: 'Escape', action: 'Close the dialog' },
        { key: 'Tab (Drawer)', action: 'Cycles within focus trap' },
        { key: 'Shift+Tab (Drawer)', action: 'Reverse cycle within trap' },
        { key: 'Tab (Modal)', action: 'Standard focus movement (no trap)' },
      ],
    },
  ];

  const codeExample = `// Button keyboard interaction
<Button onClick={handleAction} aria-label="Submit form">
  Submit
</Button>
// Enter or Space activates, Tab navigates

// Select keyboard interaction
<Select
  options={options}
  value={selected}
  onSelect={handleSelect}
  label="Choose option"
/>
// ArrowDown opens, Arrow keys navigate, Enter selects, Escape closes

// Tabs keyboard interaction
<TabGroup defaultIndex={0}>
  <TabList>
    <TabItem>Tab 1</TabItem>
    <TabItem>Tab 2</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</TabGroup>
// ArrowRight/Left cycles tabs, Home/End jumps to first/last`;

  return (
    <>
      <HeroCard
        title="Keyboard Navigation"
        description="Every interactive component supports full keyboard operation. Users can navigate, activate, and dismiss elements without a mouse."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Keyboard className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Keyboard Shortcuts
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Keyboard mappings for each component category
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {shortcuts.map((group, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-3">
                <Typography tag="h3" className="font-semibold text-lg">
                  {group.category}
                </Typography>
                <div className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between gap-2 py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <code className="text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono whitespace-nowrap">
                        {item.key}
                      </code>
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400 text-right"
                      >
                        {item.action}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Usage Examples
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Components that respond to keyboard interactions
          </Typography>
        </div>

        <CodeBlock language="tsx" code={codeExample} />
      </section>
    </>
  );
};

export default KeyboardNavigationSection;
