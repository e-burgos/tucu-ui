import { describe, it, expect } from 'vitest';
import {
  createMask,
  formatCuit,
  formatNumber,
  formatPhone,
  isValidCuit,
  isValidPhone,
  normalizePhone,
  parseNumber,
  registerPhoneCountry,
  caretForSignificantCount,
} from '../../components/forms/masks';

describe('phone mask (AR)', () => {
  it('formats AMBA landline and mobile numbers', () => {
    expect(formatPhone('1123456789')).toBe('+54 11 2345-6789');
    expect(formatPhone('+5491123456789')).toBe('+54 9 11 2345-6789');
    expect(formatPhone('+54 11 2345 6789')).toBe('+54 11 2345-6789');
  });

  it('formats interior numbers with a 3-digit area code', () => {
    expect(formatPhone('3511234567')).toBe('+54 351 123-4567');
    expect(formatPhone('+54 9 351 1234567')).toBe('+54 9 351 123-4567');
  });

  it('formats progressively while typing', () => {
    expect(formatPhone('1')).toBe('1');
    expect(formatPhone('112')).toBe('11 2');
    expect(formatPhone('1123456')).toBe('11 2345-6');
    expect(formatPhone('+5')).toBe('+5');
    expect(formatPhone('+549')).toBe('+54 9');
    expect(formatPhone('+54911')).toBe('+54 9 11');
  });

  it('is idempotent', () => {
    for (const v of [
      '1123456789',
      '+5491123456789',
      '3511234567',
      '+54 9 11 2345',
    ]) {
      const once = formatPhone(v);
      expect(formatPhone(once)).toBe(once);
    }
  });

  it('drops the trunk 0 and promotes domestic mobile (15) numbers', () => {
    expect(formatPhone('01123456789')).toBe('+54 11 2345-6789');
    expect(formatPhone('11 15 2345 6789')).toBe('+54 9 11 2345-6789');
    expect(formatPhone('351 15 123 4567')).toBe('+54 9 351 123-4567');
  });

  it('accepts the 0054 exit code like +54', () => {
    expect(formatPhone('0054 9 11 2345-6789')).toBe('+54 9 11 2345-6789');
    expect(formatPhone('005491123456789')).toBe('+54 9 11 2345-6789');
    expect(formatPhone('0054 351 123-4567')).toBe('+54 351 123-4567');
    expect(normalizePhone('0054 9 11 2345-6789')).toBe('+5491123456789');
    expect(isValidPhone('0054 9 11 2345-6789', 'AR')).toBe(true);
  });

  it('adds +54 once a landline is complete, keeping partial input domestic', () => {
    expect(formatPhone('112345678')).toBe('11 2345-678');
    expect(formatPhone('1123456789')).toBe('+54 11 2345-6789');
    expect(formatPhone('011 2345-6789')).toBe('+54 11 2345-6789');
  });

  it('normalizes to E.164', () => {
    expect(normalizePhone('11 2345-6789')).toBe('+541123456789');
    expect(normalizePhone('+54 9 11 2345-6789')).toBe('+5491123456789');
    expect(normalizePhone('011 15 2345-6789')).toBe('+5491123456789');
    expect(normalizePhone('11 2345')).toBe('');
  });

  it('validates AR numbers', () => {
    expect(isValidPhone('+54 9 11 2345-6789', 'AR')).toBe(true);
    expect(isValidPhone('351 123-4567', 'AR')).toBe(true);
    expect(isValidPhone('11 2345', 'AR')).toBe(false);
    expect(isValidPhone('5123456789', 'AR')).toBe(false); // area codes start 1-3
    expect(isValidPhone('11-ABCD-6789', 'AR')).toBe(false);
  });

  it('validates generic international numbers', () => {
    expect(isValidPhone('+598 99 123 456', 'INTL')).toBe(true);
    expect(isValidPhone('1234567', 'INTL')).toBe(false);
  });

  it('accepts new countries through registerPhoneCountry', () => {
    registerPhoneCountry({
      code: 'UY',
      dialCode: '598',
      parseNational: (d) => ({ national: d.replace(/^0/, ''), mobile: false }),
      isValidNational: (n) => /^\d{8}$/.test(n),
      formatNational: (d) =>
        d.replace(/^(\d{2})(\d{3})?(\d+)?$/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join(' ')
        ),
    });
    expect(isValidPhone('+598 99 123 456', 'UY')).toBe(true);
    expect(formatPhone('+59899123456', 'UY')).toBe('+598 99 123 456');
  });
});

describe('CUIT mask', () => {
  it('formats progressively', () => {
    expect(formatCuit('20')).toBe('20');
    expect(formatCuit('20123')).toBe('20-123');
    expect(formatCuit('20123456786')).toBe('20-12345678-6');
    expect(formatCuit('20-12345678-6999')).toBe('20-12345678-6');
  });

  it('checks prefix and check digit', () => {
    expect(isValidCuit('20-12345678-6')).toBe(true);
    expect(isValidCuit('30-71234567-1')).toBe(true);
    expect(isValidCuit('20-12345678-5')).toBe(false);
    expect(isValidCuit('99-12345678-6')).toBe(false);
    expect(isValidCuit('20-1234567')).toBe(false);
  });
});

describe('number and currency masks', () => {
  it('groups thousands with the locale separators', () => {
    expect(formatNumber('1234567')).toBe('1.234.567');
    expect(formatNumber('1234567', { locale: 'en-US' })).toBe('1,234,567');
  });

  it('keeps up to `decimals` decimal digits', () => {
    expect(formatNumber('1234,567', { decimals: 2 })).toBe('1.234,56');
    expect(formatNumber('1234,', { decimals: 2 })).toBe('1.234,');
    expect(formatNumber('12.5', { decimals: 2, locale: 'en-US' })).toBe('12.5');
  });

  it('parses formatted values back', () => {
    expect(parseNumber('1.234,56')).toBe(1234.56);
    expect(parseNumber('$ 1.234,56', { prefix: '$ ' })).toBe(1234.56);
    expect(Number.isNaN(parseNumber(''))).toBe(true);
  });

  it('currency mask formats with prefix and round-trips raw values', () => {
    const mask = createMask('currency', { locale: 'es-AR' });
    expect(mask.format('123456')).toBe('$ 123.456');
    expect(mask.unformat('$ 1.234,5')).toBe('1234.5');
    expect(mask.fromRaw?.('1234.5')).toBe('$ 1.234,5');
    expect(mask.format('')).toBe('');
  });

  it('number mask supports negatives when allowed', () => {
    const mask = createMask('number', { allowNegative: true });
    expect(mask.format('-1500')).toBe('-1.500');
    expect(mask.unformat('-1.500')).toBe('-1500');
  });
});

describe('caretForSignificantCount', () => {
  it('maps content characters to caret positions', () => {
    expect(caretForSignificantCount('11 2345-6789', 2)).toBe(2);
    expect(caretForSignificantCount('11 2345-6789', 3)).toBe(4);
    expect(caretForSignificantCount('11 2345-6789', 7)).toBe(9);
    expect(caretForSignificantCount('11 2345-6789', 0)).toBe(0);
  });
});
