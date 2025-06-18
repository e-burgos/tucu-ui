import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { NotificationCard } from '../../../components/notifications';

// Meta for NotificationCard component
const meta: Meta<typeof NotificationCard> = {
  title: 'UI COMPONENTS/Notifications/NotificationCard',
  component: NotificationCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'NotificationCard component for displaying user activity notifications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

// Basic NotificationCard
export const Default: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Default Notification Card
        </h2>
        <div className="max-w-md">
          <NotificationCard
            type="followed"
            actor={{
              name: 'johndoe',
              avatar: 'https://i.pravatar.cc/100?img=1',
            }}
            time="5 minutes ago"
            url="#"
            notifier="you"
          />
        </div>
      </div>
    </StoryContainer>
  ),
};

// NotificationCard types
export const Types: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Notification Card Types</h2>
        <div className="max-w-md space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Follow Notification</h3>
            <NotificationCard
              type="followed"
              actor={{
                name: 'johndoe',
                avatar: 'https://i.pravatar.cc/100?img=1',
              }}
              time="5 minutes ago"
              url="#"
              notifier="you"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Like Notification</h3>
            <NotificationCard
              type="liked"
              actor={{
                name: 'janedoe',
                avatar: 'https://i.pravatar.cc/100?img=5',
              }}
              time="2 hours ago"
              url="#"
              notifier="your post"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Purchase Notification</h3>
            <NotificationCard
              type="purchased"
              actor={{
                name: 'alexsmith',
                avatar: 'https://i.pravatar.cc/100?img=3',
              }}
              time="1 day ago"
              url="#"
              notifier="your product"
            />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// NotificationCard with different actors
export const DifferentActors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Notification Cards with Different Actors
        </h2>
        <div className="max-w-md space-y-4">
          <NotificationCard
            type="followed"
            actor={{
              name: 'johndoe',
              avatar: 'https://i.pravatar.cc/100?img=1',
            }}
            time="5 minutes ago"
            url="#"
            notifier="you"
          />

          <NotificationCard
            type="followed"
            actor={{
              name: 'janedoe',
              avatar: 'https://i.pravatar.cc/100?img=5',
            }}
            time="10 minutes ago"
            url="#"
            notifier="you"
          />

          <NotificationCard
            type="followed"
            actor={{
              name: 'alexsmith',
              avatar: 'https://i.pravatar.cc/100?img=3',
            }}
            time="15 minutes ago"
            url="#"
            notifier="you"
          />
        </div>
      </div>
    </StoryContainer>
  ),
};

// NotificationCard with different timestamps
export const TimeVariations: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Notification Cards with Different Timestamps
        </h2>
        <div className="max-w-md space-y-4">
          <NotificationCard
            type="liked"
            actor={{
              name: 'johndoe',
              avatar: 'https://i.pravatar.cc/100?img=1',
            }}
            time="Just now"
            url="#"
            notifier="your post"
          />

          <NotificationCard
            type="liked"
            actor={{
              name: 'janedoe',
              avatar: 'https://i.pravatar.cc/100?img=5',
            }}
            time="2 hours ago"
            url="#"
            notifier="your post"
          />

          <NotificationCard
            type="liked"
            actor={{
              name: 'alexsmith',
              avatar: 'https://i.pravatar.cc/100?img=3',
            }}
            time="Yesterday"
            url="#"
            notifier="your post"
          />

          <NotificationCard
            type="liked"
            actor={{
              name: 'sarahparker',
              avatar: 'https://i.pravatar.cc/100?img=9',
            }}
            time="Last week"
            url="#"
            notifier="your post"
          />
        </div>
      </div>
    </StoryContainer>
  ),
};

// NotificationCard in a notification center
export const NotificationCenter: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Notification Center Example
        </h2>
        <div className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-medium">Notifications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Mark all as read
            </button>
          </div>

          <div className="p-4 space-y-4">
            <NotificationCard
              type="followed"
              actor={{
                name: 'johndoe',
                avatar: 'https://i.pravatar.cc/100?img=1',
              }}
              time="5 minutes ago"
              url="#"
              notifier="you"
            />

            <NotificationCard
              type="liked"
              actor={{
                name: 'janedoe',
                avatar: 'https://i.pravatar.cc/100?img=5',
              }}
              time="2 hours ago"
              url="#"
              notifier="your post"
            />

            <NotificationCard
              type="purchased"
              actor={{
                name: 'alexsmith',
                avatar: 'https://i.pravatar.cc/100?img=3',
              }}
              time="1 day ago"
              url="#"
              notifier="your product"
            />
          </div>

          <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              View all notifications
            </button>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
