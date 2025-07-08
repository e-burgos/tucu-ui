import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { Form, FormField } from '../../../components/forms/form-system';
import {
  Input,
  Checkbox,
  Textarea,
  RadioGroup,
} from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import { User, Mail, Calendar } from 'lucide-react';
import { Button } from '../../../components/buttons/button';

interface BasicFormValues {
  name: string;
  email: string;
}

interface ComplexFormValues extends BasicFormValues {
  message: string;
  birthdate: string;
  acceptTerms: boolean;
  notificationType: string;
}

const meta: Meta<typeof Form> = {
  title: 'UI COMPONENTS/Forms/Form',
  tags: ['autodocs'],
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          'The Form component is a wrapper around react-hook-form that provides an easy way to create forms with validation. It provides FormContext to all its children and handles form submission.',
      },
    },
  },
};

export default meta;

export const Basic: StoryFn<typeof Form> = () => {
  const handleSubmit = (values: BasicFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Form</h2>
        <Form<BasicFormValues> onSubmit={handleSubmit} className="space-y-4">
          <FormField<BasicFormValues>
            name="name"
            label="Full Name"
            rules={{ required: 'Name is required' }}
          >
            <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
          </FormField>

          <FormField<BasicFormValues>
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

          <div className="flex justify-end pt-2">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};

export const WithDefaultValues: StoryFn<typeof Form> = () => {
  const defaultValues = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const handleSubmit = (values: BasicFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Form with Default Values</h2>
        <Form<BasicFormValues>
          onSubmit={handleSubmit}
          className="space-y-4"
          useFormProps={{ defaultValues }}
        >
          <FormField<BasicFormValues>
            name="name"
            label="Full Name"
            rules={{ required: 'Name is required' }}
          >
            <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
          </FormField>

          <FormField<BasicFormValues>
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

          <div className="flex justify-end pt-2">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};

export const WithValidationSchema: StoryFn<typeof Form> = () => {
  const validationSchema = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
  };

  const handleSubmit = (values: BasicFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Form with Validation Schema
        </h2>
        <Form<BasicFormValues>
          onSubmit={handleSubmit}
          className="space-y-4"
          validationSchema={validationSchema}
        >
          <FormField<BasicFormValues> name="name" label="Full Name">
            <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
          </FormField>

          <FormField<BasicFormValues> name="email" label="Email Address">
            <Input
              type="email"
              placeholder="example@domain.com"
              icon={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <div className="flex justify-end pt-2">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};

export const ComplexForm: StoryFn<typeof Form> = () => {
  const validationSchema = {
    name: {
      required: 'Name is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    message: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters',
      },
    },
    birthdate: {
      required: 'Birth date is required',
    },
    acceptTerms: {
      required: 'You must accept the terms and conditions',
    },
    notificationType: {
      required: 'Please select a notification preference',
    },
  };

  const defaultValues = {
    name: '',
    email: '',
    message: '',
    birthdate: '',
    acceptTerms: false,
    notificationType: '',
  };

  const handleSubmit = (values: ComplexFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Complex Form</h2>
        <Form<ComplexFormValues>
          onSubmit={handleSubmit}
          className="space-y-4"
          validationSchema={validationSchema}
          useFormProps={{
            defaultValues,
            mode: 'onChange',
          }}
        >
          <FormField<ComplexFormValues> name="name" label="Full Name">
            <Input placeholder="John Doe" icon={<User className="h-4 w-4" />} />
          </FormField>

          <FormField<ComplexFormValues> name="email" label="Email Address">
            <Input
              type="email"
              placeholder="example@domain.com"
              icon={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <FormField<ComplexFormValues> name="birthdate" label="Birth Date">
            <Input type="date" icon={<Calendar className="h-4 w-4" />} />
          </FormField>

          <FormField<ComplexFormValues>
            name="message"
            label="Message"
            helperText="Tell us what you think"
            showHelper
          >
            <Textarea placeholder="Type your message here..." rows={4} />
          </FormField>

          <FormField<ComplexFormValues>
            name="notificationType"
            label="Notification Preference"
          >
            <RadioGroup
              options={[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'push', label: 'Push Notification' },
                { value: 'none', label: 'No notifications' },
              ]}
              direction="horizontal"
            />
          </FormField>

          <FormField<ComplexFormValues> name="acceptTerms" hideError>
            <Checkbox label="I accept the terms and conditions" />
          </FormField>

          <div className="flex justify-end pt-2">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};

export const FormWithActions: StoryFn<typeof Form> = () => {
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
  });

  const handleSubmit = (values: BasicFormValues) => {
    console.log('Form values:', values);
    alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
  };

  const handleReset = () => {
    setFormValues({ name: '', email: '' });
  };

  const handleFill = () => {
    setFormValues({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  };

  return (
    <StoryContainer>
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Form with Actions</h2>
        <Form<BasicFormValues>
          onSubmit={handleSubmit}
          className="space-y-4"
          useFormProps={{
            defaultValues: formValues,
            values: formValues,
          }}
        >
          <FormField<BasicFormValues>
            name="name"
            label="Full Name"
            rules={{ required: 'Name is required' }}
          >
            <Input
              placeholder="John Doe"
              icon={<User className="h-4 w-4" />}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </FormField>

          <FormField<BasicFormValues>
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
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </FormField>

          <div className="flex justify-between pt-2">
            <div className="space-x-2">
              <Button type="button" variant="ghost" onClick={handleReset}>
                Reset
              </Button>
              <Button type="button" variant="ghost" onClick={handleFill}>
                Fill
              </Button>
            </div>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </StoryContainer>
  );
};
