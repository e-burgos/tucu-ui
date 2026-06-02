type ClassType = string | null | undefined | false | number | Array<ClassType>;

/**
 * Combine class names
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param classesProp - The class names to combine
 */
export function cn(...classesProp: Array<ClassType>): string {
  const classes = Array.isArray(classesProp) ? classesProp : [classesProp];
  return classes.flat().filter(Boolean).join(' ');
}
