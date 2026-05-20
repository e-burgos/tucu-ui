import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  LucideIcons,
  HeroCard,
} from '../../../../../index';
import { MacOSTahoeSearchBar } from '../../../../../components/macos/tahoe/controls/search-bar-tahoe';
import { AutoPropsTable } from '../../../../components/auto-props-table';
import { PropPlayground } from '../../../../components/prop-playground';

export const TahoeSearchBarSection: React.FC = () => {
  const [value, setValue] = useState('');
  const [lgValue, setLgValue] = useState('Documents');

  return (
    <>
      <HeroCard
        title="Search Bar"
        description="Liquid Glass search field with glass material background, clear button, and submit/escape keyboard support."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border border-cyan-500/50">
            <LucideIcons.Search className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Sizes" className="mt-2 mb-2">
          <div className="flex flex-col gap-4 max-w-sm">
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Small
              </span>
              <MacOSTahoeSearchBar
                size="sm"
                placeholder="Search..."
                className="w-full"
              />
            </div>
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Medium (default)
              </span>
              <MacOSTahoeSearchBar
                size="md"
                placeholder="Search..."
                className="w-full"
              />
            </div>
            <div>
              <span className="text-[12px] text-[var(--macos-tahoe-text-muted)] mb-1 block">
                Large
              </span>
              <MacOSTahoeSearchBar
                size="lg"
                placeholder="Search..."
                className="w-full"
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Interactive" className="mt-2 mb-2">
          <div className="max-w-md space-y-3">
            <MacOSTahoeSearchBar
              value={value}
              onChange={setValue}
              onClear={() => setValue('')}
              onSubmit={(v) => alert(`Searched: ${v}`)}
              placeholder="Type and press Enter..."
              className="w-full"
            />
            <p className="text-[12px] text-[var(--macos-tahoe-text-muted)]">
              Current value: &ldquo;{value}&rdquo;
            </p>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="With Pre-filled Value" className="mt-2 mb-2">
          <MacOSTahoeSearchBar
            value={lgValue}
            onChange={setLgValue}
            onClear={() => setLgValue('')}
            size="lg"
            className="max-w-sm"
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <CodeBlock
            code={`import { MacOSTahoeSearchBar } from '@e-burgos/tucu-ui';

<MacOSTahoeSearchBar
  value={query}
  placeholder="Search files..."
  size="md"
  onChange={setQuery}
  onClear={() => setQuery('')}
  onSubmit={(q) => search(q)}
/>`}
            language="tsx"
          />
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="MacOSTahoeSearchBar"
        defaultValues={{
          placeholder: 'Search...',
          size: 'md',
          autoFocus: false,
        }}
        includeProps={['placeholder', 'size', 'autoFocus']}
        excludeProps={['className', 'value', 'onChange', 'onClear', 'onSubmit']}
      >
        {(props) => (
          <div className="max-w-sm">
            <MacOSTahoeSearchBar {...props} className="w-full" />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="MacOSTahoeSearchBar" />
    </>
  );
};

export default TahoeSearchBarSection;
