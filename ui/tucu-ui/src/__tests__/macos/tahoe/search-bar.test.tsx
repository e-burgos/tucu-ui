import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSTahoeSearchBar } from '../../../components/macos/tahoe/controls/search-bar-tahoe';

describe('MacOSTahoeSearchBar', () => {
  it('renders with default placeholder', () => {
    render(<MacOSTahoeSearchBar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<MacOSTahoeSearchBar placeholder="Find..." />);
    expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument();
  });

  it('displays value', () => {
    render(<MacOSTahoeSearchBar value="test" />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<MacOSTahoeSearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('calls onSubmit on Enter', () => {
    const onSubmit = vi.fn();
    render(<MacOSTahoeSearchBar value="query" onSubmit={onSubmit} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('query');
  });

  it('calls onClear on Escape', () => {
    const onClear = vi.fn();
    render(<MacOSTahoeSearchBar value="query" onClear={onClear} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('has data-tucu attribute', () => {
    const { container } = render(<MacOSTahoeSearchBar />);
    expect(
      container.querySelector('[data-tucu="tahoe-search-bar"]')
    ).toBeInTheDocument();
  });
});
