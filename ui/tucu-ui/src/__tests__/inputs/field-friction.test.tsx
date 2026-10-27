import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Input } from '../../components/inputs/input';
import { Textarea } from '../../components/inputs/textarea';
import { Select } from '../../components/inputs/select';
import { Radio } from '../../components/inputs/radio';
import { Checkbox } from '../../components/inputs/checkbox';

describe('Input friction fixes', () => {
  it('omits aria-invalid without error and sets it to true with error', () => {
    const { rerender } = render(<Input placeholder="field" />);
    expect(screen.getByPlaceholderText('field')).not.toHaveAttribute(
      'aria-invalid'
    );
    rerender(<Input placeholder="field" error="Required" />);
    expect(screen.getByPlaceholderText('field')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('applies compact xs classes and lets inputClassName override the height', () => {
    render(<Input placeholder="xs" size="xs" inputClassName="h-12" />);
    const input = screen.getByPlaceholderText('xs');
    expect(input.className).toContain('text-xs');
    expect(input.className).toContain('h-12');
    expect(input.className).not.toContain('h-7');
  });

  it('keeps the default size classes', () => {
    render(<Input placeholder="md" />);
    expect(screen.getByPlaceholderText('md').className).toContain('sm:h-12');
  });

  it('passes aria and data attributes to the input element', () => {
    render(<Input placeholder="attrs" aria-label="Custom" data-testid="i" />);
    const input = screen.getByTestId('i');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('aria-label', 'Custom');
  });
});

describe('Textarea friction fixes', () => {
  it('omits aria-invalid without error and sets it with error', () => {
    const { rerender } = render(<Textarea placeholder="area" />);
    expect(screen.getByPlaceholderText('area')).not.toHaveAttribute(
      'aria-invalid'
    );
    rerender(<Textarea placeholder="area" error="Bad" />);
    expect(screen.getByPlaceholderText('area')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('applies xs classes and inputClassName override', () => {
    render(<Textarea placeholder="xs" size="xs" inputClassName="min-h-40" />);
    const area = screen.getByPlaceholderText('xs');
    expect(area.className).toContain('text-xs');
    expect(area.className).toContain('min-h-40');
    expect(area.className).not.toContain('min-h-14');
  });

  it('routes className and wrapperClassName to the wrapper and inputClassName to the element', () => {
    const { container } = render(
      <Textarea
        placeholder="route"
        className="outer-a"
        wrapperClassName="outer-b"
        inputClassName="inner-a"
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('outer-a');
    expect(wrapper.className).toContain('outer-b');
    const area = screen.getByPlaceholderText('route');
    expect(area.className).toContain('inner-a');
    expect(area.className).not.toContain('outer-a');
  });

  it('passes aria and data attributes to the textarea', () => {
    render(<Textarea aria-label="Notes" data-testid="t" />);
    const area = screen.getByTestId('t');
    expect(area.tagName).toBe('TEXTAREA');
    expect(area).toHaveAttribute('aria-label', 'Notes');
  });
});

describe('Select native variant', () => {
  const options = [
    { name: 'Apple', value: 'apple' },
    { name: 'Banana', value: 'banana' },
  ];

  it('renders a real select with options and calls onChange with the option', () => {
    const onChange = vi.fn();
    render(
      <Select
        native
        label="Fruit"
        options={options}
        onChange={onChange}
        helperText="Pick one"
      />
    );
    const select = screen.getByLabelText('Fruit') as HTMLSelectElement;
    expect(select.tagName).toBe('SELECT');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'banana' } });
    expect(onChange).toHaveBeenCalledWith(options[1]);
    expect(select.value).toBe('banana');
  });

  it('links aria-describedby to helper and error text and marks invalid on error', () => {
    const { rerender } = render(
      <Select native label="Fruit" options={options} helperText="Pick one" />
    );
    let select = screen.getByLabelText('Fruit');
    const helperId = select.getAttribute('aria-describedby');
    expect(helperId).toBeTruthy();
    expect(document.getElementById(helperId as string)).toHaveTextContent(
      'Pick one'
    );
    expect(select).not.toHaveAttribute('aria-invalid');
    rerender(
      <Select native label="Fruit" options={options} errorMessage="Nope" />
    );
    select = screen.getByLabelText('Fruit');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(
      document.getElementById(select.getAttribute('aria-describedby') as string)
    ).toHaveTextContent('Nope');
  });

  it('supports disabled, children options and aria/data passthrough', () => {
    render(
      <Select native label="Fruit" options={options} disabled data-testid="s">
        <option value="kiwi">Kiwi</option>
      </Select>
    );
    const select = screen.getByTestId('s');
    expect(select).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Kiwi' })).toBeInTheDocument();
  });

  it('links aria-describedby on the custom trigger when helper text exists', () => {
    render(<Select label="Fruit" options={options} helperText="Pick one" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby');
  });
});

describe('Select trigger accessibility wiring', () => {
  const options = [{ name: 'Apple', value: 'apple' }];

  it('applies id to the trigger so an external label works', () => {
    render(
      <>
        <label htmlFor="fruit">Fruit</label>
        <Select id="fruit" options={options} />
      </>
    );
    expect(screen.getByLabelText('Fruit')).toBe(screen.getByRole('combobox'));
  });

  it('generates an id when absent and accepts aria-label', () => {
    render(<Select options={options} aria-label="Pick fruit" />);
    const trigger = screen.getByRole('combobox', { name: 'Pick fruit' });
    expect(trigger.id).toBeTruthy();
  });

  it('merges external aria-labelledby and aria-describedby on the custom trigger', () => {
    render(
      <Select
        label="Fruit"
        options={options}
        helperText="Pick one"
        aria-labelledby="ext-label"
        aria-describedby="ext-desc"
      />
    );
    const trigger = screen.getByRole('combobox');
    const describedBy = (trigger.getAttribute('aria-describedby') ?? '').split(' ');
    expect(describedBy[0]).toBe('ext-desc');
    expect(describedBy).toHaveLength(2);
    const labelledBy = (trigger.getAttribute('aria-labelledby') ?? '').split(' ');
    expect(labelledBy[0]).toBe('ext-label');
    expect(labelledBy).toHaveLength(2);
  });

  it('merges external aria-describedby on the native select', () => {
    render(
      <Select
        native
        label="Fruit"
        options={options}
        errorMessage="Nope"
        aria-describedby="ext-desc"
        aria-label="Fruit select"
      />
    );
    const select = screen.getByRole('combobox');
    const parts = (select.getAttribute('aria-describedby') ?? '').split(' ');
    expect(parts[0]).toBe('ext-desc');
    expect(parts).toHaveLength(2);
    expect(select).toHaveAttribute('aria-label', 'Fruit select');
  });
});

describe('Radio and Checkbox alignment', () => {
  it('Radio generates an id, connects the label and aligns to the first line', () => {
    render(<Radio label="Option A" />);
    const radio = screen.getByRole('radio');
    expect(radio.id).toBeTruthy();
    const label = screen.getByText('Option A').closest('label') as HTMLElement;
    expect(label).toHaveAttribute('for', radio.id);
    expect(label.className).toContain('items-start');
    fireEvent.click(screen.getByText('Option A'));
    expect(radio).toBeChecked();
  });

  it('Radio honors a consumer id and passes aria/data attributes', () => {
    render(<Radio id="mine" label="B" aria-label="bee" data-testid="r" />);
    const radio = screen.getByTestId('r');
    expect(radio).toHaveAttribute('id', 'mine');
    expect(radio).toHaveAttribute('aria-label', 'bee');
  });

  it('Checkbox aligns to the first line and omits aria-invalid without error', () => {
    const { rerender } = render(
      <Checkbox label="Accept" data-testid="c" aria-label="acc" />
    );
    const checkbox = screen.getByTestId('c');
    expect(checkbox).not.toHaveAttribute('aria-invalid');
    expect(checkbox).toHaveAttribute('aria-label', 'acc');
    expect(
      (screen.getByText('Accept').closest('label') as HTMLElement).className
    ).toContain('items-start');
    rerender(<Checkbox label="Accept" data-testid="c" error="Required" />);
    expect(screen.getByTestId('c')).toHaveAttribute('aria-invalid', 'true');
  });
});
