import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { AnimatedTabs } from '../../components/tabs/animated-tabs';

const tabs = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two', disabled: true },
  { id: 'three', label: 'Three', badge: <span>9</span> },
];

describe('AnimatedTabs', () => {
  it('renders tablist/tab with aria-selected and roving tabindex', () => {
    render(<AnimatedTabs tabs={tabs} activeTab="one" onChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    const [one, , three] = screen.getAllByRole('tab');
    expect(one).toHaveAttribute('aria-selected', 'true');
    expect(one).toHaveAttribute('tabindex', '0');
    expect(three).toHaveAttribute('tabindex', '-1');
    expect(three).toHaveTextContent('9');
  });

  it('selects on click and ignores disabled tabs', () => {
    const onChange = vi.fn();
    render(<AnimatedTabs tabs={tabs} activeTab="one" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: /Three/ }));
    expect(onChange).toHaveBeenCalledWith('three');
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports arrow keys with wrap, skipping disabled, plus Home/End', () => {
    const onChange = vi.fn();
    render(<AnimatedTabs tabs={tabs} activeTab="one" onChange={onChange} className="extra" />);
    const one = screen.getByRole('tab', { name: 'One' });
    fireEvent.keyDown(one, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('three');
    fireEvent.keyDown(one, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith('three');
    fireEvent.keyDown(one, { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith('three');
    fireEvent.keyDown(screen.getByRole('tab', { name: /Three/ }), { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith('one');
    expect(document.querySelector('[data-tucu="animated-tabs"]')).toHaveClass('extra');
  });

  it('delegates to useTabParam when queryParamKey is set', () => {
    const Probe = () => <div data-testid="loc">{useLocation().search}</div>;
    const onChange = vi.fn();
    render(
      <MemoryRouter initialEntries={['/x?view=three']}>
        <AnimatedTabs tabs={tabs} activeTab="one" onChange={onChange} queryParamKey="view" />
        <Probe />
      </MemoryRouter>
    );
    expect(screen.getByRole('tab', { name: /Three/ })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'One' }));
    expect(screen.getByTestId('loc')).toHaveTextContent('?view=one');
    expect(onChange).toHaveBeenCalledWith('one');
  });
});
