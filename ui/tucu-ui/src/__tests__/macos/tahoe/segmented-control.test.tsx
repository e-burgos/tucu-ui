import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSTahoeSegmentedControl } from '../../../components/macos/tahoe/controls/segmented-control-tahoe';

describe('MacOSTahoeSegmentedControl', () => {
  const options = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
  ];

  it('renders all options', () => {
    render(
      <MacOSTahoeSegmentedControl
        options={options}
        value="tab1"
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('marks active option with aria-checked', () => {
    render(
      <MacOSTahoeSegmentedControl
        options={options}
        value="tab2"
        onChange={() => {}}
      />
    );
    const active = screen.getByRole('radio', { name: 'Tab 2' });
    expect(active).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange on click', () => {
    const onChange = vi.fn();
    render(
      <MacOSTahoeSegmentedControl
        options={options}
        value="tab1"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('Tab 3'));
    expect(onChange).toHaveBeenCalledWith('tab3');
  });

  it('does not fire for disabled option', () => {
    const onChange = vi.fn();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(
      <MacOSTahoeSegmentedControl
        options={opts}
        value="a"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has role=radiogroup', () => {
    render(
      <MacOSTahoeSegmentedControl
        options={options}
        value="tab1"
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('has data-tucu attribute', () => {
    const { container } = render(
      <MacOSTahoeSegmentedControl
        options={options}
        value="tab1"
        onChange={() => {}}
      />
    );
    expect(
      container.querySelector('[data-tucu="tahoe-segmented-control"]')
    ).toBeInTheDocument();
  });
});
