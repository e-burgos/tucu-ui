import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { FormField } from '../../../components/forms/form-system';
import { Form } from '../../../components/forms/form-system';
import {
  Input,
  Checkbox,
  Textarea,
  Radio,
  RadioGroup,
} from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import { User, Mail } from 'lucide-react';

interface ExampleFormValues {
  name: string;
  email: string;
  message: string;
  acceptTerms: boolean;
  gender: string;
}

const meta: Meta<typeof FormField> = {
  title: '3. UI COMPONENTS/Forms/FormField',
  tags: ['autodocs'],
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'The FormField component is a wrapper for form inputs that integrates with react-hook-form. It handles displaying labels, error messages, and helper text for form inputs. It must be used within a Form component.',
      },
    },
  },
};

export default meta;

// We need to wrap FormField in a Form since it requires FormContext
const FormFieldTemplate: StoryFn<typeof FormField> = (args) => {
  return (
    <StoryContainer>
      <div className="w-full max-w-md">
        <Form onSubmit={(data) => console.log(data)} className="space-y-4">
          <FormField {...args} />
        </Form>
      </div>
    </StoryContainer>
  );
};

export const WithInput = FormFieldTemplate.bind({});
WithInput.args = {
  name: 'name',
  label: 'Full Name',
  helperText: 'Enter your full name',
  showHelper: true,
  children: (
    <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
  ),
};

export const WithTextarea = FormFieldTemplate.bind({});
WithTextarea.args = {
  name: 'message',
  label: 'Your Message',
  helperText: 'Please provide detailed feedback',
  showHelper: true,
  children: <Textarea placeholder="Type your message here..." rows={4} />,
};

export const WithCheckbox = FormFieldTemplate.bind({});
WithCheckbox.args = {
  name: 'acceptTerms',
  hideError: true,
  children: <Checkbox label="I accept the terms and conditions" />,
};

export const WithRadio = FormFieldTemplate.bind({});
WithRadio.args = {
  name: 'subscribe',
  label: 'Subscribe to newsletter',
  children: <Radio label="Yes, I want to subscribe" />,
};

export const WithRadioGroup = FormFieldTemplate.bind({});
WithRadioGroup.args = {
  name: 'gender',
  label: 'Gender',
  children: (
    <RadioGroup
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ]}
    />
  ),
};

export const WithError = FormFieldTemplate.bind({});
WithError.args = {
  name: 'email',
  label: 'Email',
  children: (
    <Input
      type="email"
      placeholder="example@domain.com"
      icon={<Mail className="h-4 w-4" />}
    />
  ),
  rules: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
};

export const CompleteFormExample = () => {
  const [formData, setFormData] = React.useState<ExampleFormValues>({
    name: '',
    email: '',
    message: '',
    acceptTerms: false,
    gender: '',
  });

  const handleSubmit = (values: ExampleFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
        <Form<ExampleFormValues> onSubmit={handleSubmit} className="space-y-4">
          <FormField<ExampleFormValues>
            name="name"
            label="Full Name"
            helperText="Enter your full name"
            showHelper
            rules={{ required: 'Name is required' }}
          >
            <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
          </FormField>

          <FormField<ExampleFormValues>
            name="email"
            label="Email Address"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          >
            <Input
              type="email"
              placeholder="example@domain.com"
              icon={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <FormField<ExampleFormValues>
            name="message"
            label="Message"
            helperText="Please provide detailed information"
            showHelper
            rules={{ required: 'Message is required' }}
          >
            <Textarea placeholder="Type your message here..." rows={4} />
          </FormField>

          <FormField<ExampleFormValues>
            name="gender"
            label="Gender"
            rules={{ required: 'Please select your gender' }}
          >
            <RadioGroup
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </FormField>

          <FormField<ExampleFormValues> name="acceptTerms" hideError>
            <Checkbox label="I accept the terms and conditions" />
          </FormField>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};
