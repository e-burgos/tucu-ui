import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../../components/filters/filter-bar';
import { FilterPill } from '../../components/filters/filter-pill';

const statusOptions = [
  { name: 'All', value: '' },
  { name: 'Open', value: 'open' },
];

describe('FilterPill', () => {
  it('exposes aria-pressed and toggles via click', () => {
    const onClick = vi.fn();
    const { rerender } = render(<FilterPill onClick={onClick}>Open</FilterPill>);
    const pill = screen.getByRole('button', { name: 'Open' });
    expect(pill).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(pill);
    expect(onClick).toHaveBeenCalled();
    rerender(<FilterPill active count={3} tone="green" className="x">Open</FilterPill>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button')).toHaveClass('x');
    expect(screen.getByRole('button')).toHaveTextContent('3');
  });
});

describe('FilterBar', () => {
  const base = {
    search: { value: 'abc', onChange: vi.fn() },
    filters: [
      { id: 'status', value: 'open', onChange: vi.fn(), options: statusOptions },
      { id: 'ignored', value: 'open', onChange: vi.fn(), options: statusOptions, ignoreInActiveCount: true },
    ],
  };

  it('counts active filters and clears them', () => {
    const onClear = vi.fn();
    render(<FilterBar {...base} onClear={onClear} />);
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="filter-bar"]')).toHaveAttribute('data-active-count', '2');
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onClear).toHaveBeenCalled();
  });

  it('hides the clear button when nothing is active and honours activeCount', () => {
    const { rerender } = render(
      <FilterBar search={{ value: '', onChange: vi.fn() }} onClear={vi.fn()} />
    );
    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
    rerender(<FilterBar search={{ value: '', onChange: vi.fn() }} onClear={vi.fn()} activeCount={4} />);
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  });

  it('emits search changes and renders pills, toggle and actions', () => {
    const onSearch = vi.fn();
    const onToggle = vi.fn();
    render(
      <FilterBar
        search={{ value: '', onChange: onSearch }}
        pills={<FilterPill>Pill</FilterPill>}
        toggle={{ checked: false, onChange: onToggle, label: 'Mine' }}
        actions={<button>Export</button>}
      />
    );
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'z' } });
    expect(onSearch).toHaveBeenCalledWith('z');
    expect(screen.getByRole('button', { name: 'Pill' })).toBeInTheDocument();
    expect(screen.getByText('Mine')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });

  it('collapses behind a button showing the active count', () => {
    render(<FilterBar {...base} collapsible />);
    const toggle = screen.getByRole('button', { name: /Filters/ });
    expect(toggle).toHaveTextContent('2 active');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const body = document.querySelector('[data-tucu="filter-bar-body"]');
    expect(body).toHaveClass('hidden');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(body).not.toHaveClass('hidden');
  });
});

describe('FilterBar accessible names', () => {
  const filter = {
    value: '',
    onChange: vi.fn(),
    options: statusOptions,
  };

  it('names a select by its label', () => {
    render(<FilterBar filters={[{ ...filter, id: 'status', label: 'Status' }]} />);
    expect(screen.getByRole('combobox', { name: 'Status' })).toBeInTheDocument();
  });

  it('prefers the aria-label field over the id when there is no label', () => {
    render(
      <FilterBar filters={[{ ...filter, id: 'status', 'aria-label': 'Order status' }]} />
    );
    expect(screen.getByRole('combobox', { name: 'Order status' })).toBeInTheDocument();
  });

  it('falls back to the filter id', () => {
    render(<FilterBar filters={[{ ...filter, id: 'branch' }]} />);
    expect(screen.getByRole('combobox', { name: 'branch' })).toBeInTheDocument();
  });

  it('forwards data-testid to the select trigger', () => {
    render(
      <FilterBar filters={[{ ...filter, id: 'status', 'data-testid': 'status-filter' }]} />
    );
    expect(screen.getByTestId('status-filter')).toBe(
      screen.getByRole('combobox', { name: 'status' })
    );
  });

  it('names the search input from the placeholder or the translated default', () => {
    const { rerender } = render(
      <FilterBar search={{ value: '', onChange: vi.fn() }} />
    );
    expect(screen.getByRole('searchbox', { name: 'Search...' })).toBeInTheDocument();
    rerender(
      <FilterBar search={{ value: '', onChange: vi.fn(), placeholder: 'Find order' }} />
    );
    expect(screen.getByRole('searchbox', { name: 'Find order' })).toBeInTheDocument();
  });
});
