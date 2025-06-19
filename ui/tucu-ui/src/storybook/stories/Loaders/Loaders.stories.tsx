import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { Loader, Progressbar, Spinner } from '../../../components/loaders';

// Meta for Loader
const meta: Meta<typeof Loader> = {
  title: 'UI COMPONENTS/Loaders',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading components for indicating progress and loading states in the application.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

// Loader stories
export const DefaultLoader: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Loader</h2>
        <div className="flex items-center justify-center">
          <Loader className="text-blue-600" />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderVariants: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">MoveUp (Default)</h3>
            <Loader variant="moveUp" className="text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Blink</h3>
            <Loader variant="blink" className="text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">ScaleUp</h3>
            <Loader variant="scaleUp" className="text-blue-600" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Loader size="small" className="text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Medium (Default)</h3>
            <Loader size="medium" className="text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Loader size="large" className="text-blue-600" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const LoaderColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loader Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Blue</h3>
            <Loader className="text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Green</h3>
            <Loader className="text-green-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Red</h3>
            <Loader className="text-red-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Yellow</h3>
            <Loader className="text-yellow-500" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Purple</h3>
            <Loader className="text-purple-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Gray</h3>
            <Loader className="text-gray-600" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// Progressbar stories
export const DefaultProgressbar: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Progressbar</h2>
        <div className="w-full">
          <Progressbar value={50} />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Sizes</h2>
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Progressbar value={70} size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Default</h3>
            <Progressbar value={70} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Progressbar value={70} size="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Extra Large (with label)</h3>
            <Progressbar value={70} size="xl" label="70%" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Colors</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Default</h3>
            <Progressbar value={60} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Primary</h3>
            <Progressbar value={65} color="primary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Secondary</h3>
            <Progressbar value={70} color="secondary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Success</h3>
            <Progressbar value={75} color="success" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Danger</h3>
            <Progressbar value={80} color="danger" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Info</h3>
            <Progressbar value={85} color="info" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Warning</h3>
            <Progressbar value={90} color="warning" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarVariants: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Variants</h2>
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Solid (Default)</h3>
            <div className="space-y-4">
              <Progressbar value={60} color="primary" variant="solid" />
              <Progressbar value={70} color="secondary" variant="solid" />
              <Progressbar value={80} color="success" variant="solid" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Flat</h3>
            <div className="space-y-4">
              <Progressbar value={60} color="primary" variant="flat" />
              <Progressbar value={70} color="secondary" variant="flat" />
              <Progressbar value={80} color="success" variant="flat" />
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const ProgressbarRounded: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Progressbar Rounded</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">None</h3>
            <Progressbar value={75} color="primary" rounded-sm="none" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Progressbar value={75} color="primary" rounded-sm="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Medium</h3>
            <Progressbar value={75} color="primary" rounded-sm="md" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Large</h3>
            <Progressbar value={75} color="primary" rounded-sm="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Full (Default)</h3>
            <Progressbar value={75} color="primary" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// Spinner stories
export const DefaultSpinner: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Default Spinner</h2>
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    </StoryContainer>
  ),
};

export const SpinnerSizes: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Spinner Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Small</h3>
            <Spinner size="sm" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Medium</h3>
            <Spinner size="md" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Large (Default)</h3>
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const SpinnerColors: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Spinner Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Brand (Default)</h3>
            <Spinner />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Blue</h3>
            <Spinner color="blue-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Green</h3>
            <Spinner color="green-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Red</h3>
            <Spinner color="red-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Yellow</h3>
            <Spinner color="yellow-600" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-base font-medium">Purple</h3>
            <Spinner color="purple-600" />
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

// Combined usage example
export const LoadingStates: Story = {
  render: () => (
    <StoryContainer>
      <div className="flex flex-col gap-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Loading States Examples</h2>

        {/* Button with spinner */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Button Loading State</h3>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
              <Spinner size="sm" />
              Loading...
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>

        {/* Form submission */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Form Submission</h3>
          <div className="bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="email@example.com"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                  placeholder="********"
                />
              </div>
              <div className="mt-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                  <Spinner size="sm" />
                  Signing in...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card loading state */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Card Loading State</h3>
          <div className="bg-white p-6 rounded-lg shadow-xs flex flex-col items-center justify-center min-h-[200px] dark:bg-gray-800">
            <Loader className="text-blue-600" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading content...
            </p>
          </div>
        </div>

        {/* Page loading progress */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Page Loading Progress</h3>
          <div className="bg-white p-6 rounded-lg shadow-xs dark:bg-gray-800">
            <div className="flex flex-col gap-4">
              <Progressbar value={75} color="primary" />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Loading assets: 75%
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
