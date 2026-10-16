import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import React, { useState } from 'react';

import { Form } from '../../components/forms/form';
import { FormField } from '../../components/forms/form-field';
import { Input } from '../../components/inputs/input';
import { useTheme } from '../../themes/hooks/use-theme';

const setLang = (lang: 'en' | 'es' | 'fr') =>
  act(() => {
    useTheme.setState({ lang });
  });

describe('Input masks', () => {
  beforeEach(() => setLang('en'));

  it('formats an AR phone while typing (controlled)', () => {
    const Controlled = () => {
      const [value, setValue] = useState('');
      return (
        <Input
          aria-label="phone"
          type="tel"
          mask="phone"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Controlled />);
    const input = screen.getByLabelText('phone') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1123456789' } });
    expect(input.value).toBe('+54 11 2345-6789');
    expect(input).toHaveAttribute('inputmode', 'tel');
  });

  it('emits the raw value with `unmask` and keeps the formatted display', () => {
    const onChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = useState('');
      return (
        <Input
          aria-label="cuit"
          mask="cuit"
          unmask
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValue(e.target.value);
          }}
        />
      );
    };
    render(<Controlled />);
    const input = screen.getByLabelText('cuit') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20123456786' } });
    expect(onChange).toHaveBeenLastCalledWith('20123456786');
    expect(input.value).toBe('20-12345678-6');
  });

  it('formats currency from a raw stored value', () => {
    render(
      <Input
        aria-label="price"
        mask="currency"
        unmask
        maskOptions={{ locale: 'es-AR' }}
        value="1234.5"
        onChange={() => undefined}
      />
    );
    expect((screen.getByLabelText('price') as HTMLInputElement).value).toBe(
      '$ 1.234,5'
    );
  });
});

describe('Input built-in validation', () => {
  beforeEach(() => setLang('en'));

  it('validates type="email" on blur and shows a localized message', () => {
    setLang('es');
    render(<Input aria-label="email" type="email" defaultValue="" />);
    const input = screen.getByLabelText('email');
    fireEvent.change(input, { target: { value: 'ana@' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    fireEvent.blur(input, { target: { value: 'ana@' } });
    expect(screen.getByRole('alert')).toHaveTextContent('email válido');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('revalidates on change after the first blur', () => {
    render(<Input aria-label="email" type="email" />);
    const input = screen.getByLabelText('email');
    fireEvent.blur(input, { target: { value: 'bad' } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'ok@mail.com' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('validates type="tel" by default', () => {
    render(<Input aria-label="tel" type="tel" />);
    const input = screen.getByLabelText('tel');
    fireEvent.blur(input, { target: { value: '123' } });
    expect(screen.getByRole('alert')).toHaveTextContent('valid phone');
  });

  it('respects the error prop and autoValidate={false}', () => {
    const { rerender } = render(
      <Input aria-label="email" type="email" error="Server says no" />
    );
    fireEvent.blur(screen.getByLabelText('email'), {
      target: { value: 'bad' },
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Server says no');
    rerender(<Input aria-label="email" type="email" autoValidate={false} />);
    fireEvent.blur(screen.getByLabelText('email'), {
      target: { value: 'bad' },
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('localizes the password toggle label', () => {
    setLang('es');
    render(<Input aria-label="pwd" type="password" />);
    const toggle = screen.getByRole('button', { name: 'Mostrar contraseña' });
    fireEvent.click(toggle);
    expect(
      screen.getByRole('button', { name: 'Ocultar contraseña' })
    ).toBeInTheDocument();
  });
});

describe('FormField auto validation', () => {
  beforeEach(() => setLang('es'));

  it('blocks submit with an invalid email and shows one message', async () => {
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: { email: 'x@' } }}
      >
        <FormField name="email">
          <Input aria-label="email" type="email" />
        </FormField>
        <button type="submit">Enviar</button>
      </Form>
    );
    fireEvent.click(screen.getByText('Enviar'));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('email válido')
    );
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(onSubmit).not.toHaveBeenCalled();
    const input = screen.getByLabelText('email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('keeps user rules and localizes required: true', async () => {
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <FormField name="phone" rules={{ required: true }}>
          <Input aria-label="phone" type="tel" mask="phone" />
        </FormField>
        <button type="submit">Enviar</button>
      </Form>
    );
    fireEvent.click(screen.getByText('Enviar'));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Este campo es obligatorio.'
      )
    );
  });

  it('submits valid masked values (AR phone, strict)', async () => {
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <FormField name="phone">
          <Input aria-label="phone" mask="phone" unmask />
        </FormField>
        <button type="submit">Enviar</button>
      </Form>
    );
    fireEvent.change(screen.getByLabelText('phone'), {
      target: { value: '1123456789' },
    });
    fireEvent.click(screen.getByText('Enviar'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toEqual({ phone: '+541123456789' });
  });

  it('can be disabled with autoValidate={false}', async () => {
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: { email: 'x@' } }}
      >
        <FormField name="email" autoValidate={false}>
          <Input aria-label="email" type="email" />
        </FormField>
        <button type="submit">Enviar</button>
      </Form>
    );
    fireEvent.click(screen.getByText('Enviar'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
