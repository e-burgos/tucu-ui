/**
 * Built-in field validators with localized messages (`lang`: en | es | fr).
 * Each `validate*` returns the error message, or `undefined` when valid.
 * Empty values are valid unless `required` is set, so optional fields can
 * be left blank.
 */
import type { RegisterOptions, FieldValues } from 'react-hook-form';
import { getTucuMessages, TucuMessages } from '../../libs/i18n/messages';
import { isValidCuit, isValidPhone, parseNumber, PhoneCountry } from './masks';

export type FieldValidationType =
  | 'email'
  | 'phone'
  | 'url'
  | 'cuit'
  | 'number'
  | 'required';

export interface ValidatorOptions {
  lang?: string;
  required?: boolean;
  /** Overrides the built-in message. */
  message?: string;
  /** Phone country (`AR` strict, `INTL` generic E.164). Default `INTL`. */
  phoneCountry?: PhoneCountry;
  /** URL: accept `example.com` without protocol. Default true. */
  allowMissingProtocol?: boolean;
  /** Locale for `number` parsing. Default `es-AR`. */
  locale?: string;
}

const EMAIL_PATTERN =
  /^[A-Z0-9._%+-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)*\.[A-Z]{2,}$/i;

const EMAIL_MAX_LENGTH = 254;
const EMAIL_LOCAL_PART_MAX_LENGTH = 64;

const isBlank = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0);

export function isValidEmail(value: string) {
  const email = (value || '').trim();
  if (email.length > EMAIL_MAX_LENGTH) return false;
  const localPart = email.slice(0, email.lastIndexOf('@'));
  if (localPart.length > EMAIL_LOCAL_PART_MAX_LENGTH) return false;
  return EMAIL_PATTERN.test(email) && !email.includes('..');
}

export function isValidUrl(value: string, allowMissingProtocol = true) {
  const text = (value || '').trim();
  if (!text || /\s/.test(text)) return false;
  const candidate =
    allowMissingProtocol && !/^[a-z][a-z\d+.-]*:/i.test(text)
      ? `https://${text}`
      : text;
  try {
    const url = new URL(candidate);
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      /^[^.]+(\.[^.]+)+$/.test(url.hostname)
    );
  } catch {
    return false;
  }
}

function messageFor(
  key: keyof TucuMessages['validation'],
  options: ValidatorOptions
) {
  return options.message ?? getTucuMessages(options.lang).validation[key];
}

export function validateRequired(
  value: unknown,
  options: ValidatorOptions = {}
) {
  return isBlank(value) || value === false
    ? messageFor('required', options)
    : undefined;
}

function optional(
  value: unknown,
  options: ValidatorOptions,
  check: (text: string) => boolean,
  key: keyof TucuMessages['validation'],
  requiredKey: keyof TucuMessages['validation'] = 'required'
) {
  if (isBlank(value)) {
    return options.required ? messageFor(requiredKey, options) : undefined;
  }
  return check(String(value)) ? undefined : messageFor(key, options);
}

export const validateEmail = (value: unknown, options: ValidatorOptions = {}) =>
  optional(value, options, isValidEmail, 'email', 'requiredEmail');

export const validatePhone = (value: unknown, options: ValidatorOptions = {}) =>
  optional(
    value,
    options,
    (text) => isValidPhone(text, options.phoneCountry ?? 'INTL'),
    'phone'
  );

export const validateUrl = (value: unknown, options: ValidatorOptions = {}) =>
  optional(
    value,
    options,
    (text) => isValidUrl(text, options.allowMissingProtocol ?? true),
    'url'
  );

export const validateCuit = (value: unknown, options: ValidatorOptions = {}) =>
  optional(value, options, isValidCuit, 'cuit');

export const validateNumber = (
  value: unknown,
  options: ValidatorOptions = {}
) =>
  optional(
    value,
    options,
    (text) =>
      typeof value === 'number'
        ? Number.isFinite(value)
        : !Number.isNaN(parseNumber(text, { locale: options.locale })),
    'number'
  );

export const fieldValidators: Record<
  FieldValidationType,
  (value: unknown, options?: ValidatorOptions) => string | undefined
> = {
  email: validateEmail,
  phone: validatePhone,
  url: validateUrl,
  cuit: validateCuit,
  number: validateNumber,
  required: validateRequired,
};

/** Runs the built-in validator for `type`. */
export function validateField(
  type: FieldValidationType,
  value: unknown,
  options: ValidatorOptions = {}
) {
  return fieldValidators[type](value, options);
}

/**
 * react-hook-form rules for a field type, ready for `FormField rules`,
 * `register(name, rules)` or `Form validationSchema`.
 *
 * @example
 * <FormField name="email" rules={getValidationRules('email', { lang: 'es', required: true })}>
 */
export function getValidationRules<
  TFieldValues extends FieldValues = FieldValues
>(
  type: FieldValidationType,
  options: ValidatorOptions = {}
): RegisterOptions<TFieldValues> {
  return {
    validate: {
      [type]: (value: unknown) => validateField(type, value, options) ?? true,
    },
  } as RegisterOptions<TFieldValues>;
}

/** Maps an input `type`/`mask` to the validator that applies by default. */
export function inferValidationType(props: {
  type?: string;
  mask?: unknown;
  validationType?: FieldValidationType | false;
}): FieldValidationType | undefined {
  if (props.validationType === false) return undefined;
  if (props.validationType) return props.validationType;
  if (props.mask === 'phone') return 'phone';
  if (props.mask === 'cuit') return 'cuit';
  if (props.type === 'email') return 'email';
  if (props.type === 'tel') return 'phone';
  if (props.type === 'url') return 'url';
  return undefined;
}
