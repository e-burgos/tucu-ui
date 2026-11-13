import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Select } from '../../components/inputs/select';

const options = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
];

const trigger = () => screen.getByRole('combobox');

describe('Select close timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays open when reopened before the leave animation ends', () => {
    render(<Select options={options} />);
    fireEvent.click(trigger());
    fireEvent.click(screen.getByText('Banana'));
    fireEvent.click(trigger());
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes after the leave animation when nothing reopens it', () => {
    render(<Select options={options} />);
    fireEvent.click(trigger());
    fireEvent.click(screen.getByText('Banana'));
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('leaves no pending timer after unmounting mid-close', () => {
    const { unmount } = render(<Select options={options} />);
    fireEvent.click(trigger());
    fireEvent.click(screen.getByText('Banana'));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
