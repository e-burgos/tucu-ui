export function checkIsPercentage(value: string) {
  return new RegExp(`^[\\d.,]+%$`).test(value);
}

export function parseNumericValueForExport(
  raw: string,
  options?: {
    maxDecimals?: number;
    isPercentage?: boolean;
  },
): number | undefined {
  const maxDecimals = options?.maxDecimals ?? 8;
  const cleaned = raw
    .replace(/,/g, '')
    .replace(/[^0-9.]/g, '')
    .trim();

  if (!!options?.isPercentage && !checkIsPercentage(raw)) {
    return undefined;
  }

  const match = cleaned.match(new RegExp(`^\\d+(\\.\\d{1,${maxDecimals}})?$`));

  const num = Number(cleaned);

  if (match && !isNaN(num)) {
    return Number(num.toFixed(maxDecimals));
  }

  return undefined;
}
