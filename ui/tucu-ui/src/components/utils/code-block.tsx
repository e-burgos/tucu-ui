import { useState, useEffect } from 'react';
import Scrollbar from '../common/scrollbar';
import { Check, Copy, ChevronUp, ChevronDown } from 'lucide-react';
import Prism from 'prismjs';
import cn from 'classnames';

// Import Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import { useIsMobile } from '../../hooks/use-is-mobile';

export const CodeBlock = ({
  code,
  language,
  expanded = true,
  noExpand = false,
}: {
  code: string;
  language?: string;
  expanded?: boolean;
  noExpand?: boolean;
}) => {
  const { isMobile } = useIsMobile();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(noExpand ? false : expanded);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (language && Prism.languages[language]) {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language],
        language
      );
      setHighlightedCode(highlighted);
    } else {
      setHighlightedCode(code);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative h-full overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-gray-600 transition-colors mt-4">
      <div
        className={cn(
          'absolute z-20 top-1 right-1 p-2 flex justify-end items-center w-full gap-1',
          isMobile && 'flex-col items-end'
        )}
      >
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          className={cn(
            'p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
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
              'p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
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
              'p-2 text-xs font-mono bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:pointer dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800',
              isMobile && 'w-11 max-w-11 h-8'
            )}
          >
            {language}
          </div>
        )}
      </div>

      <Scrollbar
        className={`overflow-x-auto ${
          isExpanded ? 'max-h-[300px] h-[300px]' : 'h-full'
        } transition-all duration-300`}
      >
        <pre className="text-sm whitespace-pre-wrap font-mono block">
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
