import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Form } from '../../components/forms/form';
import { FormField } from '../../components/forms/form-field';
import { Input } from '../../components/inputs/input';

describe('FormField', () => {
  it('renders without crashing inside a Form', () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <FormField name="username">
          <Input placeholder="Username" />
        </FormField>
      </Form>
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders the input child', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <FormField name="email">
          <Input placeholder="Email" />
        </FormField>
      </Form>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });
});
