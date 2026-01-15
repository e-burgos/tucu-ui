import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
  Button,
  Modal,
} from '../../../../index';

const KeyboardNavigationSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keyboardShortcuts = [
    { key: 'Tab', action: 'Navigate to next focusable element' },
    { key: 'Shift + Tab', action: 'Navigate to previous focusable element' },
    { key: 'Enter', action: 'Activate buttons and links' },
    { key: 'Space', action: 'Activate buttons and checkboxes' },
    { key: 'Arrow Keys', action: 'Navigate within components' },
    { key: 'Escape', action: 'Close modals and dropdowns' },
    { key: 'Home/End', action: 'Navigate to first/last item' },
    { key: 'Page Up/Down', action: 'Navigate through large lists' },
  ];

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Keyboard Navigation" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Keyboard Shortcuts
              </Typography>
            </div>

            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              All interactive elements are fully accessible via keyboard
              navigation.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyboardShortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-light-dark rounded"
                >
                  <Badge variant="outline" className="font-mono">
                    {shortcut.key}
                  </Badge>
                  <Typography tag="p" className="text-sm">
                    {shortcut.action}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="p-4 border rounded-lg">
              <Typography tag="h4" className="font-semibold mb-3">
                Try Keyboard Navigation
              </Typography>
              <div className="flex gap-4 flex-wrap">
                <Button color="primary">First Button</Button>
                <Button color="info">Second Button</Button>
                <Button variant="ghost">Third Button</Button>
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
              </div>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400 mt-3"
              >
                Use Tab to navigate between buttons, Enter or Space to activate
                them.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Modal for testing */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        text={{
          title: 'Accessibility Test Modal',
          content:
            'This modal demonstrates focus trapping and keyboard navigation. Try using Tab, Shift+Tab, and Escape keys.',
        }}
      />
    </div>
  );
};

export default KeyboardNavigationSection;

