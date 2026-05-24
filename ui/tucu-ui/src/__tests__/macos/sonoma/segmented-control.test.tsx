import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSSegmentedControl } from '../../../components/macos/sonoma/controls/segmented-control';

describe('MacOSSegmentedControl', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  it('renders all options', () => {
    render(
      <MacOSSegmentedControl options={options} value="a" onChange={() => {}} />
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('marks active option with aria-checked', () => {
    render(
      <MacOSSegmentedControl options={options} value="b" onChange={() => {}} />
    );
    const activeBtn = screen.getByRole('radio', { name: 'Option B' });
    expect(activeBtn).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when clicking an option', () => {
    const onChange = vi.fn();
    render(
      <MacOSSegmentedControl options={options} value="a" onChange={onChange} />
    );
    fireEvent.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange for disabled option', () => {
    const onChange = vi.fn();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(
      <MacOSSegmentedControl options={opts} value="a" onChange={onChange} />
    );
    fireEvent.click(screen.getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has role=group', () => {
    render(
      <MacOSSegmentedControl options={options} value="a" onChange={() => {}} />
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
