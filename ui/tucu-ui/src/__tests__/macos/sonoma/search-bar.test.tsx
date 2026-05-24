import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSSearchBar } from '../../../components/macos/sonoma/controls/search-bar';

describe('MacOSSearchBar', () => {
  it('renders with default placeholder', () => {
    render(<MacOSSearchBar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<MacOSSearchBar placeholder="Find..." />);
    expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument();
  });

  it('displays value', () => {
    render(<MacOSSearchBar value="test" />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<MacOSSearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('calls onSubmit on Enter key', () => {
    const onSubmit = vi.fn();
    render(<MacOSSearchBar value="query" onSubmit={onSubmit} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('query');
  });

  it('calls onClear on Escape key', () => {
    const onClear = vi.fn();
    render(<MacOSSearchBar value="query" onClear={onClear} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape' });
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<MacOSSearchBar className="my-search" />);
    expect(container.querySelector('.my-search')).toBeInTheDocument();
  });
});
