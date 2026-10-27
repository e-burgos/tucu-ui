const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export const isHexColor = (value: string): boolean => HEX_PATTERN.test(value);

const expandShortHex = (hex: string): string =>
  hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;

const channelToLinear = (channel: number): number => {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

export const relativeLuminance = (hex: string): number => {
  const full = expandShortHex(hex);
  const [r, g, b] = [1, 3, 5].map((start) =>
    channelToLinear(parseInt(full.slice(start, start + 2), 16))
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (first: string, second: string): number => {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a
  );
  return (lighter + 0.05) / (darker + 0.05);
};

const LIGHT_CONTRAST_COLOR = '#ffffff';
const DARK_CONTRAST_COLOR = '#111111';

export const readableTextColorOn = (background: string): string =>
  contrastRatio(background, LIGHT_CONTRAST_COLOR) >=
  contrastRatio(background, DARK_CONTRAST_COLOR)
    ? LIGHT_CONTRAST_COLOR
    : DARK_CONTRAST_COLOR;
