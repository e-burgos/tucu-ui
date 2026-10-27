import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedControl } from '../../components/inputs/segmented-control';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta', disabled: true },
  { value: 'c', label: 'Gamma' },
];

describe('SegmentedControl', () => {
  it('renders a radiogroup with checked state and roving tabindex', () => {
    render(<SegmentedControl options={options} value="a" onChange={vi.fn()} aria-label="Letters" />);
    expect(screen.getByRole('radiogroup', { name: 'Letters' })).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[0]).toHaveAttribute('tabindex', '0');
    expect(radios[2]).toHaveAttribute('tabindex', '-1');
  });

  it('uses label as accessible name fallback', () => {
    render(<SegmentedControl options={options} value="a" onChange={vi.fn()} label="Pick" />);
    expect(screen.getByRole('radiogroup', { name: 'Pick' })).toBeInTheDocument();
  });

  it('calls onChange on click but not for disabled options', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Gamma' }));
    expect(onChange).toHaveBeenCalledWith('c');
    fireEvent.click(screen.getByRole('radio', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('moves with arrows skipping disabled, wraps, and supports Home/End', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="a" onChange={onChange} />);
    const first = screen.getByRole('radio', { name: 'Alpha' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Gamma' }), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('a');
    fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(first, { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Gamma' }), { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith('a');
  });

  it('disables every segment and merges className', () => {
    render(
      <SegmentedControl options={options} value="a" onChange={vi.fn()} disabled className="extra" data-testid="root" />
    );
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
    expect(screen.getByTestId('root')).toHaveClass('extra');
    expect(screen.getByTestId('root')).toHaveAttribute('data-tucu', 'segmented-control');
  });

  it('renders without crashing when scrollable in jsdom', () => {
    render(<SegmentedControl options={options} value="a" onChange={vi.fn()} scrollable fullWidth />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });
});
