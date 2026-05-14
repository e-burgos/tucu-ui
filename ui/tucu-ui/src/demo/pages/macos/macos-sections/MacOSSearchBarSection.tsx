import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { MacOSSearchBar } from '../../../../components/macos/search-bar';

export const MacOSSearchBarSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [lastSubmit, setLastSubmit] = useState('');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MacOSSearchBar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A native macOS pill-shaped search field with a clear button, focus
          ring, and keyboard shortcuts (Enter to submit, Escape to clear).
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            <MacOSSearchBar
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              onSubmit={(v) => setLastSubmit(v)}
              placeholder="Search anything…"
            />
            {lastSubmit && (
              <p className="text-xs text-gray-500">
                Last submitted:{' '}
                <strong className="text-gray-800 dark:text-gray-200">
                  {lastSubmit}
                </strong>
              </p>
            )}
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Small
              </p>
              <MacOSSearchBar size="sm" placeholder="Search…" />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Medium (default)
              </p>
              <MacOSSearchBar size="md" placeholder="Search…" />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Large
              </p>
              <MacOSSearchBar size="lg" placeholder="Search…" />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSearchBar } from '@e-burgos/tucu-ui';

function Toolbar() {
  const [query, setQuery] = useState('');

  return (
    <MacOSSearchBar
      value={query}
      onChange={setQuery}
      onClear={() => setQuery('')}
      onSubmit={(value) => console.log('search:', value)}
      placeholder="Search…"
      size="md"       // 'sm' | 'md' | 'lg'
    />
  );
}

// Keyboard shortcuts built in:
// Enter  → fires onSubmit(value)
// Escape → fires onClear()`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSSearchBarSection;
