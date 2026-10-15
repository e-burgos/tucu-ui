import { describe, it, expect } from 'vitest';
import {
  getValidationRules,
  inferValidationType,
  isValidEmail,
  isValidUrl,
  validateCuit,
  validateEmail,
  validateNumber,
  validatePhone,
  validateRequired,
  validateUrl,
} from '../../components/forms/validators';

describe('validators', () => {
  it('email', () => {
    expect(isValidEmail('ana@optica.com.ar')).toBe(true);
    expect(isValidEmail('ana.perez+test@mail.co')).toBe(true);
    expect(isValidEmail('ana@optica')).toBe(false);
    expect(isValidEmail('ana@@optica.com')).toBe(false);
    expect(isValidEmail('ana..perez@optica.com')).toBe(false);
    expect(validateEmail('nope', { lang: 'es' })).toMatch(/email válido/);
    expect(validateEmail('nope', { lang: 'en' })).toMatch(/valid email/);
    expect(validateEmail('ok@mail.com')).toBeUndefined();
  });

  it('treats empty values as valid unless required', () => {
    expect(validateEmail('')).toBeUndefined();
    expect(validateEmail('  ', { required: true, lang: 'es' })).toBe(
      'Este campo es obligatorio.'
    );
    expect(validateRequired('', { lang: 'en' })).toBe('This field is required.');
    expect(validateRequired('x')).toBeUndefined();
  });

  it('phone: generic by default, strict AR on request', () => {
    expect(validatePhone('11 2345-6789')).toBeUndefined();
    expect(validatePhone('12345', { lang: 'es' })).toBe(
      'Ingresá un teléfono válido.'
    );
    expect(validatePhone('5123456789', { phoneCountry: 'AR' })).toBeDefined();
    expect(validatePhone('+54 9 11 2345-6789', { phoneCountry: 'AR' })).toBeUndefined();
  });

  it('url', () => {
    expect(isValidUrl('https://optica.com.ar/tienda')).toBe(true);
    expect(isValidUrl('optica.com.ar')).toBe(true);
    expect(isValidUrl('optica.com.ar', false)).toBe(false);
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
    expect(isValidUrl('http://localhost')).toBe(false);
    expect(validateUrl('no es url', { lang: 'es' })).toMatch(/URL válida/);
  });

  it('cuit and number', () => {
    expect(validateCuit('20-12345678-6')).toBeUndefined();
    expect(validateCuit('20-12345678-5', { lang: 'es' })).toMatch(/CUIT/);
    expect(validateNumber('1.234,5')).toBeUndefined();
    expect(validateNumber('abc', { lang: 'fr' })).toMatch(/nombre valide/);
  });

  it('custom message wins', () => {
    expect(validateEmail('x', { message: 'Mal' })).toBe('Mal');
  });

  it('builds react-hook-form rules', () => {
    const rules = getValidationRules('email', { lang: 'es' });
    const validate = rules.validate as Record<string, (v: unknown) => unknown>;
    expect(validate.email('ok@mail.com')).toBe(true);
    expect(validate.email('bad')).toMatch(/email válido/);
  });

  it('infers the validator from input props', () => {
    expect(inferValidationType({ type: 'email' })).toBe('email');
    expect(inferValidationType({ type: 'tel' })).toBe('phone');
    expect(inferValidationType({ type: 'url' })).toBe('url');
    expect(inferValidationType({ mask: 'cuit' })).toBe('cuit');
    expect(inferValidationType({ type: 'text' })).toBeUndefined();
    expect(inferValidationType({ type: 'email', validationType: false })).toBeUndefined();
  });
});
