import type { Meta, StoryFn } from '@storybook/react-vite';
import ButtonLoader from '../../../components/buttons/button/button-loader';
import { StoryContainer } from '../../components/StoryContainer';
import {
  LoaderSizeTypes,
  LoaderVariantTypes,
} from '../../../components/loaders/loader';

const meta: Meta<typeof ButtonLoader> = {
  title: '3. UI COMPONENTS/Buttons/ButtonLoader',
  tags: ['autodocs'],
  component: ButtonLoader,
  parameters: {
    docs: {
      description: {
        component:
          'The ButtonLoader component is used within buttons to display a loading indicator. It renders a spinner or dots animation to indicate that the button action is in progress.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xsmall'],
      description: 'The size of the loader',
    },
    variant: {
      control: 'select',
      options: ['scaleUp', 'moveUp', 'blink'],
      description: 'The animation variant of the loader',
    },
  },
  args: {
    size: 'small' as LoaderSizeTypes,
    variant: 'scaleUp' as LoaderVariantTypes,
  },
};

export default meta;

interface ButtonLoaderArgs {
  size: LoaderSizeTypes;
  variant: LoaderVariantTypes;
}

const Template: StoryFn<typeof ButtonLoader> = (args: ButtonLoaderArgs) => (
  <StoryContainer>
    <div className="relative w-48 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
      <span className="invisible">Button Text</span>
      <ButtonLoader {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  size: 'large' as LoaderSizeTypes,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium' as LoaderSizeTypes,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small' as LoaderSizeTypes,
};

export const XSmall = Template.bind({});
XSmall.args = {
  size: 'xsmall' as LoaderSizeTypes,
};

export const ScaleUpVariant = Template.bind({});
ScaleUpVariant.args = {
  variant: 'scaleUp' as LoaderVariantTypes,
};

export const MoveUpVariant = Template.bind({});
MoveUpVariant.args = {
  variant: 'moveUp' as LoaderVariantTypes,
};

export const BlinkVariant = Template.bind({});
BlinkVariant.args = {
  variant: 'blink' as LoaderVariantTypes,
};

export const WithinButton = () => (
  <StoryContainer>
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="relative px-6 py-2 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
        <span className="invisible">Submit</span>
        <ButtonLoader size="small" variant="scaleUp" />
      </div>

      <div className="relative px-6 py-2 bg-green-500 rounded-lg flex items-center justify-center text-white font-medium">
        <span className="invisible">Confirm</span>
        <ButtonLoader size="small" variant="moveUp" />
      </div>

      <div className="relative px-6 py-2 bg-purple-500 rounded-lg flex items-center justify-center text-white font-medium">
        <span className="invisible">Loading</span>
        <ButtonLoader size="small" variant="blink" />
      </div>
    </div>
  </StoryContainer>
);
