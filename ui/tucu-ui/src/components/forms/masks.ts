/**
 * Input masks: pure, idempotent formatters (`format(format(x)) === format(x)`)
 * plus the inverse `unformat` that returns the raw value to store or send.
 * Used by `<Input mask="...">`, and usable on their own.
 */

export interface MaskDefinition {
  /** Formats any (partial) user input for display. Must be idempotent. */
  format: (value: string) => string;
  /** Returns the raw value (digits, E.164, plain number string). */
  unformat: (value: string) => string;
  /** Characters that count as "content" when restoring the caret. */
  isSignificant?: (char: string) => boolean;
  /**
   * Formats a stored raw value (what `unformat` returned) for display.
   * Needed when the raw form is ambiguous for `format`, e.g. `1234.5` in a
   * locale that uses `.` as the group separator. Defaults to `format`.
   */
  fromRaw?: (raw: string) => string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

const onlyDigits = (value: string) => (value || '').replace(/\D/g, '');
const isDigit = (char: string) => char >= '0' && char <= '9';

/* ─── Phone ─────────────────────────────────────────────────── */

export interface PhoneCountryDefinition {
  /** ISO 3166-1 alpha-2 code, e.g. `AR`. */
  code: string;
  /** International dialing code without `+`, e.g. `54`. */
  dialCode: string;
  /** Formats the national part while typing (digits only in, text out). */
  formatNational: (digits: string, options: { mobile: boolean }) => string;
  /**
   * Splits raw digits (without country code) into the national significant
   * number and a mobile flag, removing trunk/mobile prefixes.
   */
  parseNational: (digits: string) => { national: string; mobile: boolean };
  /** Whether a national significant number is complete and valid. */
  isValidNational: (national: string, mobile: boolean) => boolean;
  /** Prefix inserted between the dial code and a mobile number (AR: `9`). */
  mobilePrefix?: string;
}

/** Area code length for an Argentine national number (best effort). */
function arAreaLength(national: string): number {
  return national.startsWith('11') ? 2 : 3;
}

const AR_PHONE: PhoneCountryDefinition = {
  code: 'AR',
  dialCode: '54',
  mobilePrefix: '9',
  parseNational(raw) {
    let digits = raw;
    let mobile = false;
    if (digits.startsWith('0')) digits = digits.slice(1); // trunk prefix
    if (digits.startsWith('9') && digits.length >= 11) {
      mobile = true; // international mobile prefix: 9 + 10 digits
      digits = digits.slice(1);
    }
    // Domestic mobile: area code + "15" + subscriber (e.g. 11 15 2345-6789)
    if (digits.length === 12) {
      for (const areaLength of digits.startsWith('11') ? [2] : [3, 4]) {
        if (digits.slice(areaLength, areaLength + 2) === '15') {
          digits = digits.slice(0, areaLength) + digits.slice(areaLength + 2);
          mobile = true;
          break;
        }
      }
    }
    return { national: digits, mobile };
  },
  isValidNational(national) {
    return /^[123]\d{9}$/.test(national);
  },
  formatNational(digits) {
    if (!digits) return '';
    const areaLength = arAreaLength(digits);
    const area = digits.slice(0, areaLength);
    const subscriber = digits.slice(areaLength, 10);
    if (!subscriber) return area;
    // 11 2345-6789 (AMBA, 8-digit subscriber) · 351 123-4567 (7 digits)
    const firstGroup = areaLength === 2 ? 4 : 3;
    return subscriber.length > firstGroup
      ? `${area} ${subscriber.slice(0, firstGroup)}-${subscriber.slice(firstGroup)}`
      : `${area} ${subscriber}`;
  },
};

/** Generic E.164 fallback: 8 to 15 digits including the country code. */
const INTL_PHONE: PhoneCountryDefinition = {
  code: 'INTL',
  dialCode: '',
  parseNational: (digits) => ({ national: digits, mobile: false }),
  isValidNational: (national) => /^\d{6,14}$/.test(national),
  formatNational: (digits) => digits.replace(/(\d{3,4})(?=\d)/g, '$1 ').trim(),
};

const PHONE_COUNTRIES: Record<string, PhoneCountryDefinition> = {
  AR: AR_PHONE,
  INTL: INTL_PHONE,
};

/** Registers (or replaces) a phone country so masks and validators know it. */
export function registerPhoneCountry(definition: PhoneCountryDefinition) {
  PHONE_COUNTRIES[definition.code.toUpperCase()] = definition;
}

export function getPhoneCountry(country = 'AR'): PhoneCountryDefinition {
  return PHONE_COUNTRIES[country.toUpperCase()] ?? INTL_PHONE;
}

export type PhoneCountry = 'AR' | 'INTL' | (string & Record<never, never>);

interface ParsedPhone {
  international: boolean;
  national: string;
  mobile: boolean;
}

function parsePhone(value: string, def: PhoneCountryDefinition): ParsedPhone {
  const trimmed = (value || '').trim();
  let digits = onlyDigits(trimmed);
  const international =
    trimmed.startsWith('+') ||
    (!!def.dialCode && digits.startsWith(def.dialCode) && digits.length > 10);
  if (def.dialCode && digits.startsWith(def.dialCode) && international) {
    digits = digits.slice(def.dialCode.length);
  }
  const { national, mobile } = def.parseNational(digits);
  return { international, national, mobile };
}

/**
 * Formats a phone number while typing.
 * AR: `+54 9 11 2345-6789`, `11 2345-6789`, `+54 351 123-4567`.
 */
export function formatPhone(
  value: string,
  country: PhoneCountry = 'AR'
): string {
  const def = getPhoneCountry(country);
  const trimmed = (value || '').trim();
  if (!trimmed) return '';
  if (!def.dialCode) {
    const digits = onlyDigits(trimmed).slice(0, 15);
    return `${trimmed.startsWith('+') ? '+' : ''}${def.formatNational(digits, {
      mobile: false,
    })}`;
  }
  const digits = onlyDigits(trimmed);
  const typedInternational =
    trimmed.startsWith('+') || digits.startsWith(def.dialCode);
  if (!typedInternational) {
    // Domestic input. The trunk "0" is dropped; a complete number with a
    // mobile marker ("15") is promoted to the canonical international form.
    const domestic = digits.replace(/^0/, '').slice(0, 12);
    if (domestic.length <= 10) return def.formatNational(domestic, { mobile: false });
    const parsed = def.parseNational(domestic);
    if (parsed.national.length === 10 && def.isValidNational(parsed.national, parsed.mobile)) {
      return formatPhone(
        `+${def.dialCode}${parsed.mobile ? def.mobilePrefix ?? '' : ''}${parsed.national}`,
        country
      );
    }
    const areaLength = domestic.startsWith('11') ? 2 : 3;
    return `${domestic.slice(0, areaLength)} ${domestic.slice(areaLength)}`;
  }
  if (!digits.startsWith(def.dialCode)) {
    // Still typing the dial code (`+5`), or a number from another country:
    // keep it as typed (generic grouping) instead of forcing this country.
    return def.dialCode.startsWith(digits)
      ? `+${digits}`
      : formatPhone(trimmed, 'INTL');
  }
  let rest = digits.slice(def.dialCode.length);
  let mobile = false;
  if (def.mobilePrefix && rest.startsWith(def.mobilePrefix)) {
    mobile = true;
    rest = rest.slice(def.mobilePrefix.length);
  }
  rest = rest.slice(0, 10);
  const national = def.formatNational(rest, { mobile });
  return [`+${def.dialCode}`, mobile ? def.mobilePrefix : '', national]
    .filter(Boolean)
    .join(' ');
}

/** Returns the E.164 form (`+5491123456789`) or `''` when incomplete. */
export function normalizePhone(value: string, country: PhoneCountry = 'AR') {
  const def = getPhoneCountry(country);
  if (!def.dialCode) {
    const digits = onlyDigits(value);
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : '';
  }
  const parsed = parsePhone(value, def);
  if (!def.isValidNational(parsed.national, parsed.mobile)) return '';
  return `+${def.dialCode}${parsed.mobile && def.mobilePrefix ? def.mobilePrefix : ''}${
    parsed.national
  }`;
}

export function isValidPhone(value: string, country: PhoneCountry = 'AR') {
  if (!/^[\d\s\-+().]*$/.test(value || '')) return false;
  return normalizePhone(value, country) !== '';
}

/* ─── CUIT / CUIL ───────────────────────────────────────────── */

/** `20123456786` → `20-12345678-6` (progressive while typing). */
export function formatCuit(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
}

const CUIT_PREFIXES = ['20', '23', '24', '25', '26', '27', '30', '33', '34'];
const CUIT_WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/** Validates prefix and AFIP/ARCA check digit. */
export function isValidCuit(value: string) {
  const digits = onlyDigits(value);
  if (!/^\d{11}$/.test(digits) || !CUIT_PREFIXES.includes(digits.slice(0, 2))) {
    return false;
  }
  const sum = CUIT_WEIGHTS.reduce(
    (acc, weight, index) => acc + weight * Number(digits[index]),
    0
  );
  const mod = 11 - (sum % 11);
  const check = mod === 11 ? 0 : mod;
  return check !== 10 && check === Number(digits[10]);
}

/* ─── Numbers & currency ────────────────────────────────────── */

export interface NumberMaskOptions {
  /** Locale for separators. Default `es-AR` (`1.234,56`). */
  locale?: string;
  /** Max decimal digits. Default 0 for numbers, 2 for currency. */
  decimals?: number;
  allowNegative?: boolean;
  /** Text shown before the number, e.g. `$ `. */
  prefix?: string;
}

function separators(locale: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.8);
  return {
    group: parts.find((p) => p.type === 'group')?.value ?? ',',
    decimal: parts.find((p) => p.type === 'decimal')?.value ?? '.',
  };
}

/** Formats a (partial) number for display while typing. */
export function formatNumber(value: string, options: NumberMaskOptions = {}) {
  const { locale = 'es-AR', decimals = 0, allowNegative = false, prefix = '' } =
    options;
  const { group, decimal } = separators(locale);
  let text = (value || '').startsWith(prefix)
    ? (value || '').slice(prefix.length)
    : value || '';
  const negative = allowNegative && text.trim().startsWith('-');
  // Accept both the locale decimal and "." typed on numeric keypads, but only
  // when "." is not the group separator of this locale.
  if (decimal !== '.' && group !== '.') text = text.replace(/\./g, decimal);
  const decimalIndex = decimals > 0 ? text.indexOf(decimal) : -1;
  const integerPart = onlyDigits(
    decimalIndex >= 0 ? text.slice(0, decimalIndex) : text
  ).replace(/^0+(?=\d)/, '');
  const decimalPart =
    decimalIndex >= 0 ? onlyDigits(text.slice(decimalIndex)).slice(0, decimals) : '';
  if (!integerPart && decimalIndex < 0) return negative ? `${prefix}-` : '';
  const grouped = (integerPart || '0').replace(/\B(?=(\d{3})+(?!\d))/g, group);
  return `${prefix}${negative ? '-' : ''}${grouped}${
    decimalIndex >= 0 ? `${decimal}${decimalPart}` : ''
  }`;
}

/** Parses a formatted number back to a JS number (NaN when empty). */
export function parseNumber(value: string, options: NumberMaskOptions = {}) {
  const { locale = 'es-AR', prefix = '' } = options;
  const { group, decimal } = separators(locale);
  let text = (value || '').trim();
  if (prefix && text.startsWith(prefix)) text = text.slice(prefix.length);
  text = text.split(group).join('').replace(decimal, '.').replace(/[^\d.-]/g, '');
  return text === '' || text === '-' ? NaN : Number(text);
}

/* ─── Mask registry ─────────────────────────────────────────── */

export type MaskType = 'phone' | 'cuit' | 'currency' | 'number';

export interface MaskOptions extends NumberMaskOptions {
  /** Country for `mask="phone"`. Default `AR`. */
  phoneCountry?: PhoneCountry;
  /** Currency symbol for `mask="currency"`. Default `$`. */
  currencySymbol?: string;
}

export function createMask(
  type: MaskType,
  options: MaskOptions = {}
): MaskDefinition {
  switch (type) {
    case 'phone': {
      const country = options.phoneCountry ?? 'AR';
      return {
        format: (v) => formatPhone(v, country),
        unformat: (v) => normalizePhone(v, country) || onlyDigits(v),
        isSignificant: isDigit,
        inputMode: 'tel',
      };
    }
    case 'cuit':
      return {
        format: formatCuit,
        unformat: onlyDigits,
        isSignificant: isDigit,
        inputMode: 'numeric',
      };
    case 'currency':
    case 'number': {
      const isCurrency = type === 'currency';
      const numberOptions: NumberMaskOptions = {
        ...options,
        decimals: options.decimals ?? (isCurrency ? 2 : 0),
        prefix:
          options.prefix ??
          (isCurrency ? `${options.currencySymbol ?? '$'} ` : ''),
      };
      const { decimal } = separators(numberOptions.locale ?? 'es-AR');
      return {
        format: (v) => formatNumber(v, numberOptions),
        fromRaw: (raw) => {
          const parsed = Number(raw);
          return raw === '' || Number.isNaN(parsed)
            ? formatNumber(raw, numberOptions)
            : formatNumber(String(parsed).replace('.', decimal), numberOptions);
        },
        unformat: (v) => {
          const parsed = parseNumber(v, numberOptions);
          return Number.isNaN(parsed) ? '' : String(parsed);
        },
        isSignificant: (c) => isDigit(c) || c === decimal || c === '-',
        inputMode: (numberOptions.decimals ?? 0) > 0 ? 'decimal' : 'numeric',
      };
    }
  }
}

/**
 * Caret position in `formatted` that keeps `significantBefore` content
 * characters to its left. Used to restore the caret after re-formatting.
 */
export function caretForSignificantCount(
  formatted: string,
  significantBefore: number,
  isSignificant: (char: string) => boolean = isDigit
) {
  if (significantBefore <= 0) {
    const first = [...formatted].findIndex(isSignificant);
    return first === -1 ? formatted.length : first;
  }
  let seen = 0;
  for (let index = 0; index < formatted.length; index++) {
    if (isSignificant(formatted[index])) seen++;
    if (seen === significantBefore) return index + 1;
  }
  return formatted.length;
}
