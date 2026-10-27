import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';

import { Select } from '../../components/inputs/select';

const groupedOptions = [
  { name: 'Apple', value: 'apple', group: 'Fruit' },
  { name: 'Banana', value: 'banana', group: 'Fruit' },
  { name: 'Carrot', value: 'carrot', group: 'Veg' },
  { name: 'Water', value: 'water' },
];

describe('Select extras', () => {
  it('passes data-testid and id to the custom trigger', () => {
    render(
      <Select
        options={groupedOptions}
        id="fruit-select"
        data-testid="fruit-trigger"
        aria-describedby="ext"
        helperText="hint"
      />
    );
    const trigger = screen.getByTestId('fruit-trigger');
    expect(trigger).toHaveAttribute('id', 'fruit-select');
    expect(trigger.getAttribute('aria-describedby')).toContain('ext');
  });

  it('renders groups with headers and skips them in keyboard navigation', () => {
    const onChange = vi.fn();
    render(<Select options={groupedOptions} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(within(groups[0]).getByText('Fruit')).toBeInTheDocument();
    expect(groups[0]).toHaveAttribute(
      'aria-labelledby',
      within(groups[0]).getByText('Fruit').id
    );
    expect(screen.getAllByRole('option')).toHaveLength(4);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'carrot' })
    );
  });

  it('renders optgroup in native mode', () => {
    const { container } = render(<Select native options={groupedOptions} />);
    const groups = container.querySelectorAll('optgroup');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAttribute('label', 'Fruit');
    expect(groups[0].querySelectorAll('option')).toHaveLength(2);
  });

  it('applies xs size and listboxClassName', () => {
    render(
      <Select
        options={groupedOptions}
        size="xs"
        listboxClassName="custom-listbox"
      />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('h-7');
    expect(trigger.className).toContain('text-xs');
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox').className).toContain('custom-listbox');
    expect(screen.getAllByRole('option')[0].className).toContain('py-1');
  });

  it('does not call onChange when re-selecting the selected option', () => {
    const onChange = vi.fn();
    render(
      <Select
        options={groupedOptions}
        selectedOption={groupedOptions[0]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getAllByRole('option')[0]);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('truncates the trigger label', () => {
    render(<Select options={groupedOptions} selectedOption={groupedOptions[0]} />);
    expect(screen.getByText('Apple').className).toContain('truncate');
  });
});
