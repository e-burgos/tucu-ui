import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { FormExample } from '../../../components/forms/form-system/example/form-example';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof FormExample> = {
  title: '3. UI COMPONENTS/Forms/FormExample',
  tags: ['autodocs'],
  component: FormExample,
  parameters: {
    docs: {
      description: {
        component:
          'The FormExample component demonstrates how to use the Form and FormField components together with validation rules defined in a central location. This example demonstrates a form with validation rules defined centrally in a separate file. The validation rules are passed to the Form component via the validationSchema prop, eliminating the need to define rules on each FormField component.',
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof FormExample> = () => (
  <StoryContainer className="flex justify-start">
    <FormExample />
  </StoryContainer>
);
