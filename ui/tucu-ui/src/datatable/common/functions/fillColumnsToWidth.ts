/**
 * Minimal sizing contract shared by TanStack column definitions.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface FillableColumn {
  /** Base width in pixels. Falls back to `DEFAULT_FILL_COLUMN_SIZE`. */
  size?: number;
  /** Lower bound in pixels; the base width never goes below it. */
  minSize?: number;
  /** Upper bound in pixels; the column stops growing once it reaches it. */
  maxSize?: number;
}

export const DEFAULT_FILL_COLUMN_SIZE = 150;

export const resolveBaseColumnSize = (column: FillableColumn): number =>
  Math.max(column.size ?? DEFAULT_FILL_COLUMN_SIZE, column.minSize ?? 0);

const canGrow = (column: FillableColumn, size: number): boolean =>
  column.maxSize === undefined || size < column.maxSize;

function growProportionally(
  columns: FillableColumn[],
  baseSizes: number[],
  extraWidth: number
): number[] {
  const grown = [...baseSizes];
  let remaining = extraWidth;
  let growable = columns
    .map((_, index) => index)
    .filter((index) => canGrow(columns[index], grown[index]));

  while (remaining > 0 && growable.length > 0) {
    const weight = growable.reduce((sum, index) => sum + baseSizes[index], 0);
    let capped = false;
    let distributed = 0;
    for (const index of growable) {
      const share = (remaining * baseSizes[index]) / weight;
      const maxSize = columns[index].maxSize ?? Number.POSITIVE_INFINITY;
      const next = Math.min(grown[index] + share, maxSize);
      distributed += next - grown[index];
      if (next === maxSize) capped = true;
      grown[index] = next;
    }
    remaining -= distributed;
    if (!capped) break;
    growable = growable.filter((index) => canGrow(columns[index], grown[index]));
  }
  return grown;
}

function roundWithoutOverflow(
  columns: FillableColumn[],
  sizes: number[],
  targetWidth: number
): number[] {
  const rounded = sizes.map(Math.floor);
  const total = rounded.reduce((sum, size) => sum + size, 0);
  const leftover = Math.max(0, Math.floor(targetWidth - total));
  for (let index = rounded.length - 1; index >= 0; index -= 1) {
    const maxSize = columns[index].maxSize ?? Number.POSITIVE_INFINITY;
    if (rounded[index] + leftover <= maxSize) {
      rounded[index] += leftover;
      break;
    }
  }
  return rounded;
}

/**
 * Grows the columns proportionally to their base size so they fill `availableWidth`,
 * honouring `maxSize` (the surplus is redistributed) and never overflowing after rounding.
 * Returns the same array when there is no room to grow.
 *
 * @category libs/datatable
 * @subcategory Functions
 */
export function fillColumnsToWidth<C extends FillableColumn>(
  columns: C[],
  availableWidth: number
): C[] {
  if (columns.length === 0 || availableWidth <= 0) return columns;
  const baseSizes = columns.map(resolveBaseColumnSize);
  const baseTotal = baseSizes.reduce((sum, size) => sum + size, 0);
  if (availableWidth <= baseTotal) return columns;

  const grown = growProportionally(
    columns,
    baseSizes,
    availableWidth - baseTotal
  );
  const grownTotal = grown.reduce((sum, size) => sum + size, 0);
  const sizes = roundWithoutOverflow(
    columns,
    grown,
    Math.min(availableWidth, grownTotal)
  );
  return columns.map((column, index) => ({ ...column, size: sizes[index] }));
}
