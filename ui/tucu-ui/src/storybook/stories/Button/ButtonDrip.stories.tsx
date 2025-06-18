import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { ButtonDrip } from '../../../components/buttons';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof ButtonDrip> = {
  title: 'UI COMPONENTS/Buttons/ButtonDrip',
  tags: ['autodocs'],
  component: ButtonDrip,
  parameters: {
    docs: {
      description: {
        component:
          'The ButtonDrip component provides a ripple animation effect when a button is clicked. It is used internally by the Button component but can also be used independently.',
      },
    },
  },
  argTypes: {
    x: {
      control: { type: 'number', min: 0, max: 200, step: 1 },
      description:
        'The X coordinate of the click position relative to the button',
    },
    y: {
      control: { type: 'number', min: 0, max: 200, step: 1 },
      description:
        'The Y coordinate of the click position relative to the button',
    },
    color: {
      control: 'color',
      description: 'The color of the drip effect',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the drip effect should expand to fill the full width of the container',
    },
    onCompleted: {
      action: 'animation completed',
      description: 'Function called when the drip animation is completed',
    },
  },
  args: {
    x: 50,
    y: 50,
    color: 'rgba(0, 0, 0, 0.1)',
    fullWidth: false,
  },
};

export default meta;

const Template: StoryFn<typeof ButtonDrip> = (args) => {
  const [showDrip, setShowDrip] = useState(true);

  const handleCompleted = () => {
    setShowDrip(false);
    setTimeout(() => setShowDrip(true), 100);
    args.onCompleted && args.onCompleted();
  };

  return (
    <StoryContainer className="justify-center items-center">
      <div className="relative w-48 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
        Click Effect Demo
        {showDrip && <ButtonDrip {...args} onCompleted={handleCompleted} />}
      </div>
    </StoryContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const LightColor = Template.bind({});
LightColor.args = {
  color: 'rgba(255, 255, 255, 0.3)',
};

export const DarkColor = Template.bind({});
DarkColor.args = {
  color: 'rgba(0, 0, 0, 0.3)',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const InteractiveDemo = () => {
  const [dripShow, setDripShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('rgba(255, 255, 255, 0.3)');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDripShow(true);
  };

  const handleCompleted = () => {
    setDripShow(false);
  };

  return (
    <StoryContainer className="justify-center items-center flex-col">
      <div className="mb-4 flex gap-4">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => setColor('rgba(255, 255, 255, 0.3)')}
        >
          Light Drip
        </button>
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => setColor('rgba(0, 0, 0, 0.2)')}
        >
          Dark Drip
        </button>
      </div>
      <button
        onClick={handleClick}
        className="relative w-64 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-medium overflow-hidden"
      >
        Click Anywhere On Me
        {dripShow && (
          <ButtonDrip
            x={position.x}
            y={position.y}
            color={color}
            onCompleted={handleCompleted}
          />
        )}
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Click on the button to see the drip effect
      </p>
    </StoryContainer>
  );
};
