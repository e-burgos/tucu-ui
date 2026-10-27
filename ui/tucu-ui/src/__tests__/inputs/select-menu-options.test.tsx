import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../../components/inputs/select';

const options = [
  {
    name: 'Apple',
    value: 'apple',
    description: 'A long description for the apple option',
    triggerLabel: <b data-testid="apple-short">Ap</b>,
  },
  { name: 'Banana', value: 'banana' },
];

const open = () => fireEvent.click(screen.getByRole('combobox'));

describe('Select menu options', () => {
  it('sizes the menu to the trigger by default', () => {
    render(<Select options={options} />);
    open();
    const menu = screen.getByRole('listbox');
    expect(menu).not.toHaveClass('w-max');
    expect(menu.style.minWidth).toBe('');
  });

  it('menuWidth="content" sizes to content with a trigger min-width', () => {
    render(<Select options={options} menuWidth="content" />);
    open();
    const menu = screen.getByRole('listbox');
    expect(menu).toHaveClass('w-max');
    expect(menu.style.minWidth).not.toBe('');
  });

  it('truncates descriptions by default and wraps with wrapDescription', () => {
    const { rerender } = render(<Select options={options} />);
    open();
    expect(screen.getByText(options[0].description as string)).toHaveClass('truncate');
    rerender(
      <Select options={options} wrapDescription descriptionClassName="custom-desc" />
    );
    const description = screen.getByText(options[0].description as string);
    expect(description).not.toHaveClass('truncate');
    expect(description).toHaveClass('whitespace-normal', 'custom-desc');
  });

  it('uses max-h-44 by default and a custom maxMenuHeight', () => {
    const { rerender } = render(<Select options={options} />);
    open();
    const list = () => screen.getAllByRole('option')[0].parentElement as HTMLElement;
    expect(list()).toHaveClass('max-h-44');
    rerender(<Select options={options} maxMenuHeight={120} />);
    expect(list()).not.toHaveClass('max-h-44');
    expect(list().style.maxHeight).toBe('120px');
    rerender(<Select options={options} maxMenuHeight="30vh" />);
    expect(list().style.maxHeight).toBe('30vh');
  });

  it('maxMenuHeight="auto" fits the available viewport space', () => {
    render(<Select options={options} maxMenuHeight="auto" />);
    open();
    const list = screen.getAllByRole('option')[0].parentElement as HTMLElement;
    expect(list.style.maxHeight).toMatch(/px$/);
  });

  it('shows triggerLabel for the selected option, name otherwise', () => {
    render(<Select options={options} value="apple" />);
    expect(screen.getByTestId('apple-short')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).not.toHaveTextContent('Apple');
  });

  it('renderValue takes precedence over triggerLabel', () => {
    render(
      <Select
        options={options}
        value="apple"
        renderValue={(option) => <i data-testid="custom">{option.value}</i>}
      />
    );
    expect(screen.getByTestId('custom')).toHaveTextContent('apple');
    expect(screen.queryByTestId('apple-short')).not.toBeInTheDocument();
  });

  it('merges triggerClassName with buttonClassName', () => {
    render(
      <Select options={options} buttonClassName="btn-extra" triggerClassName="trigger-extra" />
    );
    expect(screen.getByRole('combobox')).toHaveClass('btn-extra', 'trigger-extra');
  });
});
