import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatCard } from '../../components/cards/stat-card';

describe('StatCard', () => {
  it('renders title, value, subtitle and icon on a plain div', () => {
    render(
      <StatCard
        title="Users"
        value="42"
        subtitle="active"
        icon={<i data-testid="ic" />}
        data-testid="c"
      />
    );
    const el = screen.getByTestId('c');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveAttribute('data-tucu', 'stat-card');
    expect(el).toHaveAttribute('data-tone', 'brand');
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('does not guess the tone from the title', () => {
    render(<StatCard title="Offline errors" value="1" data-testid="c" />);
    expect(screen.getByTestId('c')).toHaveAttribute('data-tone', 'brand');
  });

  it('infers the trend direction and sentiment', () => {
    const { container, rerender } = render(
      <StatCard title="t" value="1" trend={{ value: 5, label: 'vs last' }} />
    );
    let trend = container.querySelector(
      '[data-tucu="stat-card-trend"]'
    ) as HTMLElement;
    expect(trend).toHaveAttribute('data-direction', 'up');
    expect(trend).toHaveAttribute('data-sentiment', 'good');
    expect(screen.getByText('Increase')).toBeInTheDocument();
    expect(screen.getByText('vs last')).toBeInTheDocument();

    rerender(<StatCard title="t" value="1" trend={{ value: -2 }} />);
    trend = container.querySelector(
      '[data-tucu="stat-card-trend"]'
    ) as HTMLElement;
    expect(trend).toHaveAttribute('data-direction', 'down');
    expect(trend).toHaveAttribute('data-sentiment', 'bad');
    expect(screen.getByText('Decrease')).toBeInTheDocument();
  });

  it('positiveIsGood=false flips the sentiment and flat is neutral', () => {
    const { container, rerender } = render(
      <StatCard
        title="t"
        value="1"
        trend={{ value: '3%', direction: 'down', positiveIsGood: false }}
      />
    );
    expect(
      container.querySelector('[data-tucu="stat-card-trend"]')
    ).toHaveAttribute('data-sentiment', 'good');
    rerender(
      <StatCard
        title="t"
        value="1"
        trend={{ value: '0%', direction: 'flat' }}
      />
    );
    expect(
      container.querySelector('[data-tucu="stat-card-trend"]')
    ).toHaveAttribute('data-sentiment', 'neutral');
    expect(screen.getByText('No change')).toBeInTheDocument();
  });

  it('renders progress with progressbar semantics', () => {
    render(
      <StatCard
        title="t"
        value="1"
        progress={{ value: 25, max: 100, label: 'Quota' }}
      />
    );
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '25');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('Quota')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('is a button when onClick is given', () => {
    const onClick = vi.fn();
    render(<StatCard title="t" value="1" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is a link when href is given', () => {
    render(<StatCard title="t" value="1" href="/x" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/x');
  });

  it('shows skeletons while loading and merges className', () => {
    render(
      <StatCard
        title="Hidden"
        value="9"
        loading
        className="mine"
        data-testid="c"
      />
    );
    const el = screen.getByTestId('c');
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).toHaveClass('mine');
    expect(screen.queryByText('Hidden')).toBeNull();
  });
});
