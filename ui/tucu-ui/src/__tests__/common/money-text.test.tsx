import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoneyText } from '../../components/common/money-text';

const text = (container: HTMLElement) => container.textContent ?? '';

describe('MoneyText', () => {
  it('formats in USD en-US', () => {
    const { container } = render(<MoneyText value={1234.5} locale="en-US" />);
    expect(text(container)).toBe('$1,234.50');
  });

  it('formats in another locale and currency', () => {
    const { container } = render(
      <MoneyText value="1234.5" currency="EUR" locale="de-DE" />
    );
    expect(text(container).replace(/\s/g, ' ')).toBe('1.234,50 €');
  });

  it('renders an em dash for non-finite values', () => {
    const { container } = render(<MoneyText value={NaN} />);
    expect(text(container)).toBe('—');
    const text2 = render(<MoneyText value="abc" />);
    expect(text(text2.container)).toBe('—');
  });

  it('honours fraction digits and showSign', () => {
    const { container } = render(
      <MoneyText
        value={5}
        locale="en-US"
        minimumFractionDigits={0}
        maximumFractionDigits={0}
        showSign
      />
    );
    expect(text(container)).toBe('+$5');
  });

  it('auto tone follows the sign', () => {
    render(
      <>
        <MoneyText value={-3} tone="auto" data-testid="neg" />
        <MoneyText value={3} tone="auto" data-testid="pos" />
        <MoneyText value={0} tone="auto" data-testid="zero" />
      </>
    );
    expect(screen.getByTestId('neg').className).toContain('state-red-ink');
    expect(screen.getByTestId('pos').className).toContain('state-green-ink');
    expect(screen.getByTestId('zero').className).not.toContain('state-');
  });

  it('uses mono tabular figures, variant, polymorphic tag and className', () => {
    render(
      <MoneyText
        value={1}
        variant="total"
        as="strong"
        className="mine"
        data-testid="m"
      />
    );
    const el = screen.getByTestId('m');
    expect(el.tagName).toBe('STRONG');
    expect(el).toHaveClass('font-mono', 'tabular-nums', 'mine');
    expect(el).toHaveAttribute('data-variant', 'total');
    expect(el).toHaveAttribute('data-tucu', 'money-text');
  });
});
