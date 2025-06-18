import type { Meta, StoryFn } from '@storybook/react-vite';
import { Sidebar } from '../../../components/drawer';
import { StoryContainer } from '../../components/StoryContainer';
import { LogOut, UserPlus } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'UI COMPONENTS/Drawer/Sidebar',
  tags: ['autodocs'],
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component:
          'The Sidebar component is a container used within DrawerContainer to display content in a sidebar layout. It includes a header with optional title, scrollable content area, and an optional action area at the bottom.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the sidebar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the sidebar',
    },
    children: {
      control: 'text',
      description: 'The content of the sidebar',
    },
    actionContent: {
      control: 'text',
      description: 'Content to render at the bottom of the sidebar',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the close button is clicked',
    },
  },
  args: {
    title: 'Sidebar Title',
    children: (
      <div className="space-y-4">
        <p>This is the content of the sidebar.</p>
        <p>You can put any content here.</p>
      </div>
    ),
  },
};

export default meta;

const Template: StoryFn<typeof Sidebar> = (args) => (
  <StoryContainer className="justify-center items-start h-screen">
    <div className="w-full max-w-xs border border-gray-200 dark:border-gray-700 h-[600px] relative">
      <Sidebar {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  title: undefined,
};

export const WithActionContent = Template.bind({});
WithActionContent.args = {
  actionContent: (
    <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-2">
      <LogOut size={16} />
      Logout
    </button>
  ),
};

export const WithMultipleActions = Template.bind({});
WithMultipleActions.args = {
  actionContent: (
    <>
      <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2">
        <UserPlus size={16} />
        Invite
      </button>
      <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-2">
        <LogOut size={16} />
        Logout
      </button>
    </>
  ),
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className:
    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  children: (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sidebar Content</h3>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h4 className="font-medium">Item {i + 1}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a sample item to demonstrate scrolling in the sidebar.
          </p>
        </div>
      ))}
    </div>
  ),
};
