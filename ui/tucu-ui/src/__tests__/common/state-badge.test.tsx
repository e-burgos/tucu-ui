import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StateBadge } from '../../components/common/state-badge';
import { Badge } from '../../components/common/badge';

describe('StateBadge', () => {
  it('renders label with a decorative dot by default', () => {
    render(<StateBadge tone="green">Paid</StateBadge>);
    const el = screen
      .getByText('Paid')
      .closest('[data-state-tone]') as HTMLElement;
    expect(el).toHaveAttribute('data-state-tone', 'green');
    expect(el).toHaveAttribute('data-tone', 'green');
    expect(el).toHaveAttribute('data-variant', 'soft');
    expect(el.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('hides the dot and strikes the label', () => {
    render(
      <StateBadge tone="red" dot={false} struck>
        Cancelled
      </StateBadge>
    );
    const el = screen.getByText('Cancelled');
    expect(el.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(el).toHaveClass('line-through');
    expect(el).toHaveAttribute('data-struck', 'true');
  });

  it.each(['green', 'orange', 'red', 'teal', 'purple', 'neutral'] as const)(
    'supports tone %s',
    (tone) => {
      render(<StateBadge tone={tone}>{tone}</StateBadge>);
      expect(screen.getByText(tone)).toHaveAttribute('data-state-tone', tone);
    }
  );

  it('uses state tokens for neutral and merges className', () => {
    render(
      <StateBadge tone="neutral" size="sm" className="mine">
        N
      </StateBadge>
    );
    const el = screen.getByText('N');
    expect(el.className).toContain('--tucu-state-neutral-soft');
    expect(el).toHaveClass('mine');
  });
});

describe('Badge extensions', () => {
  it('accepts teal and purple tones and struck', () => {
    render(
      <Badge tone="teal" variant="soft" struck>
        T
      </Badge>
    );
    const el = screen.getByText('T');
    expect(el).toHaveAttribute('data-tone', 'teal');
    expect(el).toHaveClass('line-through');
  });
});
