import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Alert } from '../../components/notifications/alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    const { container } = render(<Alert>Test message</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Alert>Hello World</Alert>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with role="alert"', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with data-variant attribute', () => {
    render(<Alert variant="error">Error!</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-variant', 'error');
  });

  it('renders dismiss button when dismissible', () => {
    render(<Alert dismissible>Dismissible alert</Alert>);
    expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
  });

  it('does not render dismiss button by default', () => {
    render(<Alert>Non-dismissible</Alert>);
    expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument();
  });
});
