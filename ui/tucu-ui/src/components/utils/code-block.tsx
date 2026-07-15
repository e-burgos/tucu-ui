import { useState, useEffect } from 'react';
import Scrollbar from '../common/scrollbar';
import { Check, Copy, ChevronUp, ChevronDown } from 'lucide-react';
import cn from 'classnames';
import { useIsMobile } from '../../hooks/use-is-mobile';

// Loaded lazily (not as static top-level imports) so bundlers that eagerly
// evaluate this whole package (e.g. Vite's dev-mode dep optimizer) never
// execute prismjs's language files before its core sets up the shared
// `Prism` object they rely on as a global. Each loader is a literal
// specifier (not a template string) so bundlers can statically analyze
// and code-split it. Some languages extend others (e.g. tsx extends jsx
// and typescript) and throw if their dependency isn't registered first,
// so each entry also lists the languages it requires.
const languageLoaders: Record<
  string,
  { deps?: string[]; load: () => Promise<unknown> }
> = {
  markup: { load: () => import('prismjs/components/prism-markup') },
  clike: { load: () => import('prismjs/components/prism-clike') },
  javascript: {
    deps: ['clike'],
    load: () => import('prismjs/components/prism-javascript'),
  },
  typescript: {
    deps: ['javascript'],
    load: () => import('prismjs/components/prism-typescript'),
  },
  jsx: {
    deps: ['markup', 'javascript'],
    load: () => import('prismjs/components/prism-jsx'),
  },
  tsx: {
    deps: ['jsx', 'typescript'],
    load: () => import('prismjs/components/prism-tsx'),
  },
  css: { load: () => import('prismjs/components/prism-css') },
  bash: { load: () => import('prismjs/components/prism-bash') },
  json: { load: () => import('prismjs/components/prism-json') },
  python: { load: () => import('prismjs/components/prism-python') },
  java: {
    deps: ['clike'],
    load: () => import('prismjs/components/prism-java'),
  },
  sql: { load: () => import('prismjs/components/prism-sql') },
};

let prismCorePromise: Promise<typeof import('prismjs')> | null = null;
const languagePromises = new Map<string, Promise<unknown>>();

function loadLanguage(language: string): Promise<unknown> {
  const entry = languageLoaders[language];
  if (!entry) return Promise.resolve();
  let promise = languagePromises.get(language);
  if (!promise) {
    promise = Promise.all((entry.deps ?? []).map(loadLanguage)).then(() =>
      entry.load()
    );
    languagePromises.set(language, promise);
  }
  return promise;
}

async function loadPrism(language?: string) {
  if (!prismCorePromise) {
    prismCorePromise = import('prismjs');
  }
  const { default: Prism } = await prismCorePromise;
  if (language && languageLoaders[language]) {
    await loadLanguage(language).catch(() => {
      languagePromises.delete(language);
    });
  }
  return Prism;
}

export const CodeBlock = ({
  code,
  language,
  expanded = true,
  noExpand = false,
  className,
}: {
  code: string;
  language?: string;
  expanded?: boolean;
  noExpand?: boolean;
  className?: string;
}) => {
  const { isMobile } = useIsMobile();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(
    Boolean(noExpand ? false : expanded)
  );
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    loadPrism(language).then((Prism) => {
      if (cancelled) return;
      if (language && Prism.languages[language]) {
        setHighlightedCode(
          Prism.highlight(code, Prism.languages[language], language)
        );
      } else {
        setHighlightedCode(code);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      data-tucu="code-block"
      className={cn(
        'overflow-x-auto min-h-[150px] relative rounded-xl border mt-4',
        'bg-gray-100 dark:bg-gray-800 border-border hover:border-gray-400 dark:hover:border-gray-600',
        isExpanded
          ? 'h-fit max-h-[300px] transition-all duration-300'
          : 'h-full transition-all duration-300',
        className
      )}
    >
      <div
        className={cn(
          'absolute z-10 top-1 right-1 p-2 flex justify-end items-center w-full gap-1',
          isMobile && 'flex-col items-end'
        )}
      >
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          className={cn(
            'code-block-btn p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
            isMobile && 'p-1 w-8 h-8'
          )}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
          <span className="sr-only">{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
        {!noExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'code-block-btn p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
              isMobile && 'p-1 w-8 h-8'
            )}
            title="Expand/Collapse"
          >
            {!isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        )}

        {language && (
          <div
            className={cn(
              'code-block-btn p-2 text-sm font-mono bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:pointer dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
              isMobile && 'w-max max-w-11 h-8'
            )}
          >
            {language}
          </div>
        )}
      </div>

      <Scrollbar
        className={`overflow-x-auto h-full p-4 pr-16 pt-4 lg:pr-4 lg:pt-16 transition-all duration-300`}
      >
        <pre className="text-xs whitespace-pre-wrap font-mono block">
          <code
            className={`language-${language || 'text'}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </Scrollbar>
    </div>
  );
};

export default CodeBlock;
