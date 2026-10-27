import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { EmptyState, ErrorState, SystemStatePage } from '../../components/feedback';
import { useTheme } from '../../themes/hooks/use-theme';

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

describe('EmptyState', () => {
  it('renders as a status region with title, description and actions', () => {
    render(
      <EmptyState
        icon={<svg data-testid="ico" />}
        title="No items"
        description="Add one"
        action={<button>Add</button>}
        secondaryAction={<button>Import</button>}
        data-testid="root"
      />
    );
    const root = screen.getByRole('status');
    expect(root).toHaveAttribute('data-tucu', 'empty-state');
    expect(root).toHaveAttribute('data-testid', 'root');
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('Add one')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Import' })).toBeInTheDocument();
  });

  it('applies card by default, plain without chrome, and merges className last', () => {
    const { rerender } = render(<EmptyState title="x" className="custom" />);
    expect(screen.getByRole('status').className).toContain('border');
    expect(screen.getByRole('status').className.endsWith('custom')).toBe(true);
    rerender(<EmptyState title="x" variant="plain" size="lg" />);
    expect(screen.getByRole('status').className).not.toContain('border-[');
    expect(screen.getByRole('status').className).toContain('p-12');
  });
});

describe('ErrorState', () => {
  it('uses localized defaults and role alert', () => {
    render(<ErrorState />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-tucu', 'error-state');
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('uses the Spanish defaults when lang is es', () => {
    useTheme.setState({ lang: 'es' });
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('lets props override title, description and retry label', () => {
    render(
      <ErrorState title="Oops" description="Custom" retryLabel="Again" onRetry={() => undefined} />
    );
    expect(screen.getByText('Oops')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Again' })).toBeInTheDocument();
  });

  it('shows the error message in a details disclosure', () => {
    render(<ErrorState error={new Error('boom')} />);
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
  });
});

describe('SystemStatePage', () => {
  it('renders a main landmark with code, heading and actions', () => {
    render(
      <SystemStatePage
        code="404"
        title="Not found"
        description="Gone"
        tone="error"
        action={<button>Home</button>}
        className="extra"
      />
    );
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('data-tucu', 'system-state-page');
    expect(main).toHaveAttribute('data-tone', 'error');
    expect(main.className).toContain('min-h-[70vh]');
    expect(main.className.endsWith('extra')).toBe(true);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Not found' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });
});
