import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Form } from '../../components/forms/form';

describe('Form', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <input name="test" defaultValue="hello" />
      </Form>
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders children inside the form', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <button type="submit">Submit</button>
      </Form>
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
