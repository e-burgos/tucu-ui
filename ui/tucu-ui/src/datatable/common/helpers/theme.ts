/**
 * Get the CSS color name
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param color - The color
 */

export function getCSSColorName(color: string): string {
  return `--table-${color}`;
}
