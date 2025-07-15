import { useState } from 'react';
import Scrollbar from '../common/scrollbar';
import Typography from '../typography';
import { Check, Copy, ChevronUp, ChevronDown } from 'lucide-react';

export const CodeBlock = ({
  code,
  language,
}: {
  code: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative h-full overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:border-gray-600 transition-colors mt-4">
      <div className="absolute z-20 top-3 right-3 p-2 flex justify-end items-center w-full gap-1">
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
          <span className="sr-only">{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          title="Expand/Collapse"
        >
          {!isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {language && (
          <div className="p-2 text-xs font-mono bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            {language}
          </div>
        )}
      </div>

      <Scrollbar
        className={`overflow-x-auto ${
          isExpanded ? 'max-h-[300px] h-[300px]' : 'h-full'
        } transition-all duration-300`}
      >
        <Typography
          tag="code"
          className="text-sm whitespace-pre-wrap font-mono block"
        >
          {code}
        </Typography>
      </Scrollbar>
    </div>
  );
};

export default CodeBlock;
