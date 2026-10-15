import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

import { Select } from '../../components/inputs/select';
import { Textarea } from '../../components/inputs/textarea';
import { PinCode } from '../../components/inputs/pin-code';
import Button from '../../components/buttons';
import { useTheme } from '../../themes/hooks/use-theme';

beforeEach(() => act(() => useTheme.setState({ lang: 'es' })));

describe('audit fixes', () => {
  it('Select: named by its label, exposes the error and has a localized placeholder', () => {
    render(
      <Select
        label="Sucursal"
        options={[{ name: 'Centro', value: 'c' }]}
        onChange={vi.fn()}
        errorMessage="Elegí una sucursal"
      />
    );
    const trigger = screen.getByRole('combobox', { name: 'Sucursal' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.getAttribute('aria-describedby')).toBe(
      screen.getByText('Elegí una sucursal').id
    );
    expect(trigger).toHaveTextContent('Seleccioná una opción');
    fireEvent.click(trigger);
    expect(document.getElementById(trigger.getAttribute('aria-controls') as string)).toHaveAttribute(
      'role',
      'listbox'
    );
  });

  it('Textarea: forwards required and links the error', () => {
    render(<Textarea label="Notas" required error="Requerido" />);
    const textarea = screen.getByRole('textbox', { name: /Notas/ });
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea.getAttribute('aria-describedby')).toBe(
      screen.getByText('Requerido').id
    );
  });

  it('PinCode: every digit has an accessible name', () => {
    render(<PinCode length={4} value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Dígito 1 de 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Dígito 4 de 4')).toBeInTheDocument();
  });

  it('Button: a loading button does not fire onClick or submit', () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" isLoading onClick={onClick}>
          Guardar
        </Button>
      </form>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
