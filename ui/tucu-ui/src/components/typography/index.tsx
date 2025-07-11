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
  code: 'border border-gray-300 py-2 px-3 rounded-md shadow-sm',
  kbd: 'bg-gray-100 border border-gray-300 text-gray-900 rounded-lg leading-none inline-flex items-center justify-center text-sm py-1.5 px-2',
  blockquote: 'border-l-4 border-gray-300 text-quote py-3 px-4',
  sub: '',
  sup: '',
};

export interface TypographyProps {
  /**  */
  tag?: keyof typeof classes;
  /** title attribute only appear when tag is `abbr` */
  title?: string;
  /** Add custom classes for extra style */
  className?: string;
}

/**
 * Text component is the used to render text and paragraphs within an interface using well-defined typographic styles.
 *  It renders a `<p>` tag by default.
 */
export function Typography({
  tag = 'p',
  title,
  children,
  className,
}: React.PropsWithChildren<TypographyProps>) {
  const Component = tag;
  if (tag === 'abbr' && title === undefined) {
    console.warn('title attribute is missing for abbr tag.');
  }
  return (
    <Component
      {...(title && { title })}
      className={cn(classes[tag], className)}
    >
      {children}
    </Component>
  );
}

export default Typography;
