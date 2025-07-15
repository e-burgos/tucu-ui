import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { AnchorLink } from '../../../components/links';

const meta: Meta<typeof AnchorLink> = {
  title: '3. UI COMPONENTS/Navigation/Links/AnchorLink',
  component: AnchorLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Link components for navigation in the application.',
      },
    },
  },
  argTypes: {
    to: {
      control: 'object',
    },
    className: {
      control: 'object',
    },
    children: {
      control: 'object',
    },
  },
  args: {
    to: '/',
    className: 'text-blue-600 hover:underline',
    children: <span>Home Link</span>,
  },
};

export default meta;
type Story = StoryObj<typeof AnchorLink>;

// AnchorLink stories
export const DefaultAnchorLink: Story = {};

export const StyledAnchorLinks: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Styled AnchorLinks</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <AnchorLink
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Primary Button Link
            </AnchorLink>
            <AnchorLink
              to="/about"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Secondary Button Link
            </AnchorLink>
          </div>
          <div className="flex gap-4">
            <AnchorLink
              to="/contact"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
              Icon Link
            </AnchorLink>
            <AnchorLink
              to="/dashboard"
              className="text-blue-600 border-b border-dashed border-blue-600 hover:border-solid"
            >
              Underlined Link
            </AnchorLink>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
