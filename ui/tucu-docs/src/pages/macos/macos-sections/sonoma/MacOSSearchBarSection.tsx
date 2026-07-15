import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { MacOSSearchBar } from '@tucu-ui-internal/components/macos/sonoma/controls/search-bar';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

// ─── PropPlayground sub-component (avoids hooks-in-render-prop violation) ──────
function SearchBarPlayground(props: {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState('');
  return (
    <div className="w-full max-w-lg mx-auto">
      <MacOSSearchBar
        {...props}
        value={value}
        onChange={setValue}
        onClear={() => setValue('')}
        onSubmit={(v) => alert(`Submitted: ${v}`)}
      />
    </div>
  );
}

export const MacOSSearchBarSection: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <HeroCard
        title="SearchBar"
        description="A macOS-style search input with clear button, keyboard submit, auto-focus, and multiple sizes. Includes smooth transitions and icon accent matching the system appearance."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-cyan-500/50">
            <LucideIcons.Search className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 max-w-lg mx-auto">
            <MacOSSearchBar
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              onSubmit={(v) => alert(`Search: ${v}`)}
              placeholder="Search files, apps, settings…"
            />
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              Current value: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{query || '(empty)'}</code>
            </p>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4 max-w-lg mx-auto">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size}>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">{size}</p>
                <MacOSSearchBar
                  size={size}
                  placeholder={`Size: ${size}`}
                  value=""
                  onChange={() => undefined}
                />
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSSearchBar"
        defaultValues={{
          placeholder: 'Search…',
          size: 'md',
          autoFocus: false,
        }}
        controlOverrides={[
          { name: 'placeholder', type: 'text', description: 'Placeholder text' },
          { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], description: 'Input size' },
          { name: 'autoFocus', type: 'boolean', description: 'Auto-focus on mount' },
        ]}
        includeProps={['placeholder', 'size', 'autoFocus']}
        excludeProps={['className', 'value', 'onChange', 'onClear', 'onSubmit']}
      >
        {(props) => <SearchBarPlayground {...props} />}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSSearchBar" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { MacOSSearchBar } from '@e-burgos/tucu-ui';

function SearchDemo() {
  const [value, setValue] = useState('');

  return (
    <MacOSSearchBar
      value={value}
      onChange={setValue}
      onClear={() => setValue('')}
      onSubmit={(v) => console.log('Search:', v)}
      placeholder="Search files, apps, settings…"
      size="md"       // 'sm' | 'md' | 'lg'
      autoFocus={false}
    />
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSSearchBarSection;
