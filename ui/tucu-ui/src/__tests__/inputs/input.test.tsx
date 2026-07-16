import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Input } from '../../components/inputs/input';

describe('Input', () => {
  it('renders without crashing', () => {
    const { container } = render(<Input placeholder="Enter text" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders with a given variant', () => {
    const { container } = render(
      <Input variant="ghost" placeholder="ghost input" />
    );
    expect(
      container.querySelector('[data-variant="ghost"]')
    ).toBeInTheDocument();
  });

  describe('date type (uncontrolled, no value prop)', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('does not warn about switching from uncontrolled to controlled when a date is picked', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<Input label="Date" type="date" />);

      fireEvent.click(screen.getByLabelText('Open date picker'));
      fireEvent.click(screen.getByText('15'));

      const uncontrolledWarnings = errorSpy.mock.calls.filter(([msg]) =>
        String(msg).includes('changing an uncontrolled input to be controlled')
      );
      expect(uncontrolledWarnings).toHaveLength(0);
    });
  });
});
