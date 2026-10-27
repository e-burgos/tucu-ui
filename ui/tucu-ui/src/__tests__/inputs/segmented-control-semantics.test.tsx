import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  SegmentedControl,
  segmentedControlPanelId,
  segmentedControlTabId,
} from '../../components/inputs/segmented-control';

const options = [
  { value: 'a', label: 'Alpha', 'data-testid': 'opt-a' },
  { value: 'b', label: 'Beta', disabled: true },
  {
    value: 'c',
    label: 'Gamma',
    'aria-label': 'Gamma option',
    labelClassName: 'extra-label',
  },
];

describe('SegmentedControl semantics="radio"', () => {
  it('is the default and keeps arrow-key selection skipping disabled options', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={options}
        value="a"
        onChange={onChange}
        aria-label="L"
      />
    );
    expect(screen.getByRole('radiogroup', { name: 'L' })).toHaveAttribute(
      'data-tucu',
      'segmented-control-track'
    );
    fireEvent.keyDown(screen.getAllByRole('radio')[0], { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('c');
    fireEvent.keyDown(screen.getAllByRole('radio')[0], { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith('c');
  });

  it('forwards per-option test id, aria-label and label class', () => {
    render(<SegmentedControl options={options} value="a" onChange={vi.fn()} />);
    expect(screen.getByTestId('opt-a')).toBeInTheDocument();
    const gamma = screen.getByRole('radio', { name: 'Gamma option' });
    expect(gamma.querySelector('.extra-label')).toHaveTextContent('Gamma');
  });
});

describe('SegmentedControl semantics="tabs"', () => {
  it('renders a tablist of tabs wired to deterministic panel ids', () => {
    render(
      <SegmentedControl
        semantics="tabs"
        idBase="demo"
        options={options}
        value="c"
        onChange={vi.fn()}
        aria-label="Sections"
      />
    );
    expect(
      screen.getByRole('tablist', { name: 'Sections' })
    ).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('id', 'demo-tab-c');
    expect(tabs[2]).toHaveAttribute('aria-controls', 'demo-panel-c');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs.map((t) => t.getAttribute('tabindex'))).toEqual([
      '-1',
      '-1',
      '0',
    ]);
    expect(segmentedControlTabId('demo', 'c')).toBe('demo-tab-c');
    expect(segmentedControlPanelId('demo', 'c')).toBe('demo-panel-c');
  });

  it('falls back to a generated idBase', () => {
    render(
      <SegmentedControl
        semantics="tabs"
        options={options}
        value="a"
        onChange={vi.fn()}
      />
    );
    const tab = screen.getAllByRole('tab')[0];
    expect(tab.id).toMatch(/-tab-a$/);
    expect(tab.getAttribute('aria-controls')).toMatch(/-panel-a$/);
    expect(tab.id.replace(/-tab-a$/, '')).toBe(
      String(tab.getAttribute('aria-controls')).replace(/-panel-a$/, '')
    );
  });

  it('moves with arrow keys, Home and End, skipping disabled tabs', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        semantics="tabs"
        options={options}
        value="a"
        onChange={onChange}
      />
    );
    const first = screen.getAllByRole('tab')[0];
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(first, { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith('c');
    fireEvent.keyDown(screen.getAllByRole('tab')[2], { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith('a');
  });
});

describe('SegmentedControl semantics="nav"', () => {
  it('renders a nav with aria-current on the active option and anchors for href', () => {
    const items = [
      { value: 'home', label: 'Home', href: '/home' },
      { value: 'docs', label: 'Docs', href: '/docs' },
      { value: 'soon', label: 'Soon' },
    ];
    render(
      <SegmentedControl
        semantics="nav"
        options={items}
        value="docs"
        onChange={vi.fn()}
        aria-label="Primary"
      />
    );
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(nav.tagName).toBe('NAV');
    const docs = screen.getByRole('link', { name: 'Docs' });
    expect(docs).toHaveAttribute('href', '/docs');
    expect(docs).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
      'aria-current'
    );
    expect(screen.getByRole('button', { name: 'Soon' })).toBeInTheDocument();
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.queryByRole('tab')).toBeNull();
  });

  it('keeps every option in the tab order and activates on click', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        semantics="nav"
        options={[
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
        ]}
        value="x"
        onChange={onChange}
      />
    );
    const [x, y] = screen.getAllByRole('button');
    expect(x).not.toHaveAttribute('tabindex');
    expect(y).not.toHaveAttribute('tabindex');
    fireEvent.keyDown(x, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(y);
    expect(onChange).toHaveBeenCalledWith('y');
  });
});

describe('SegmentedControl emphasis', () => {
  const thumbOf = (emphasis?: 'default' | 'strong' | 'subtle') => {
    const { container, unmount } = render(
      <SegmentedControl
        options={options}
        value="a"
        onChange={vi.fn()}
        emphasis={emphasis}
      />
    );
    const thumb = container.querySelector(
      '[data-tucu="segmented-control-thumb"]'
    )!;
    const root = container.querySelector(
      '[data-tucu="segmented-control"]'
    ) as Element;
    const result = {
      thumb: thumb.className,
      emphasis: root.getAttribute('data-emphasis'),
    };
    unmount();
    return result;
  };

  it('styles the thumb per emphasis', () => {
    expect(thumbOf()).toMatchObject({ emphasis: 'default' });
    expect(thumbOf().thumb).toContain('shadow-sm');
    expect(thumbOf('strong').thumb).toContain('shadow-md');
    expect(thumbOf('strong').thumb).toContain('segmented-thumb-border');
    expect(thumbOf('subtle').thumb).toContain('opacity-70');
    expect(thumbOf('subtle').thumb).not.toContain('shadow');
  });
});
