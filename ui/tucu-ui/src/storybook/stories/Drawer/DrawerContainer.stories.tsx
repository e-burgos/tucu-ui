import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { DrawerContainer } from '../../../components/drawer';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof DrawerContainer> = {
  title: 'UI COMPONENTS/Drawer/DrawerContainer',
  tags: ['autodocs'],
  component: DrawerContainer,
  parameters: {
    docs: {
      description: {
        component:
          'The DrawerContainer component is a low-level component that handles the sliding animation and backdrop for drawers. It is used internally by the Drawer component but can also be used independently for custom drawer implementations.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is open',
    },
    setIsOpen: {
      action: 'setIsOpen',
      description: 'Function to set the open state of the drawer',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The position from which the drawer slides in',
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether to show a backdrop behind the drawer',
    },
    children: {
      control: 'text',
      description: 'The content of the drawer',
    },
  },
  args: {
    isOpen: true,
    position: 'left',
    backdrop: true,
  },
};

export default meta;

// Helper component to manage state
const DrawerExample = ({
  initialOpen = false,
  position = 'left' as 'left' | 'right',
  backdrop = true,
}: {
  initialOpen?: boolean;
  position?: 'left' | 'right';
  backdrop?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="w-full h-full">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </button>

      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position={position}
        backdrop={backdrop}
      >
        <div className="bg-white dark:bg-gray-800 h-full w-72 p-4">
          <h2 className="text-lg font-medium mb-4">Drawer Content</h2>
          <p className="mb-4">This is a basic drawer container example.</p>
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Close Drawer
          </button>
        </div>
      </DrawerContainer>
    </div>
  );
};

// Since DrawerContainer is controlled by parent state,
// we'll use a wrapper component for the stories
const Template: StoryFn<typeof DrawerContainer> = (args) => (
  <StoryContainer className="justify-center items-center h-screen">
    <DrawerExample
      initialOpen={args.isOpen}
      position={args.position as 'left' | 'right'}
      backdrop={args.backdrop}
    />
  </StoryContainer>
);

export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  isOpen: false,
  position: 'left',
};

export const RightDrawer = Template.bind({});
RightDrawer.args = {
  isOpen: false,
  position: 'right',
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
  isOpen: false,
  backdrop: false,
};

export const InitiallyOpen = Template.bind({});
InitiallyOpen.args = {
  isOpen: true,
};
