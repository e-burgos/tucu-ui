import cn from 'classnames';

const classes = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  p: '',
  i: '',
  b: '',
  q: 'text-quote',
  em: '',
  strong: '',
  small: '',
  span: '',
  del: '',
  mark: '',
  abbr: 'cursor-help',
  pre: 'border-2 border-gray-300 py-3 px-4 rounded-xl dark:border-gray-700 dark:bg-gray-800 bg-gray-100',
  code: 'whitespace-pre prose text-sm prose-sm py-2 px-3 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-current px-4 py-2 rounded-lg block font-mono',
  kbd: 'bg-gray-100 border border-gray-300 text-gray-900 rounded-lg leading-none inline-flex items-center justify-center text-sm py-1.5 px-2',
  blockquote: 'border-l-4 border-gray-300 text-quote py-3 px-4',
  sub: 'p-3 text-sx text-bottom',
  sup: 'p-3 text-sx text-top',
  headline: 'text-headline',
  body: 'text-body',
  'label-1': 'text-label-1',
  'label-2': 'text-label-2',
  caption: 'text-caption',
  legal: 'text-legal',
};

const textColorClasses = {
  default: 'text-primary-color',
  primary: 'text-primary',
  secondary: 'text-secondary-color',
  dark: 'text-dark',
  light: 'text-light',
  muted: 'text-muted',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

const fontFamilyClasses = {
  default: 'font-sans',
  mono: 'font-mono',
};

export interface TypographyProps {
  /**  */
  tag?: keyof typeof classes;
  /** title attribute only appear when tag is `abbr` */
  title?: string;
  /** Add custom color for the text */
  color?: keyof typeof textColorClasses;
  /** Add custom background color for the text */
  fontFamily?: keyof typeof fontFamilyClasses;
  /** Add custom classes for extra style */
  className?: string;
}

const validHtmlTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'i',
  'b',
  'q',
  'em',
  'strong',
  'small',
  'span',
  'del',
  'mark',
  'abbr',
  'pre',
  'code',
  'kbd',
  'blockquote',
  'sub',
  'sup',
] as const;

/**
 * Text component is the used to render text and paragraphs within an interface using well-defined typographic styles.
 *  It renders a `<p>` tag by default.
 */
export function Typography({
  tag = 'p',
  title,
  children,
  className,
  color,
  fontFamily,
}: React.PropsWithChildren<TypographyProps>) {
  const isCustomTag = !validHtmlTags.includes(
    tag as (typeof validHtmlTags)[number]
  );
  const Component = (isCustomTag ? 'div' : tag) as React.ElementType;
  let textColorClass = '';
  let fontFamilyClass = '';
  if (tag === 'abbr' && title === undefined) {
    console.warn('title attribute is missing for abbr tag.');
  }
  if (color) {
    textColorClass = textColorClasses[color as keyof typeof textColorClasses];
  }
  if (fontFamily) {
    fontFamilyClass =
      fontFamilyClasses[fontFamily as keyof typeof fontFamilyClasses];
  }
  return (
    <Component
      {...(title && { title })}
      className={cn(classes[tag], fontFamilyClass, textColorClass, className)}
    >
      {children}
    </Component>
  );
}

export default Typography;
