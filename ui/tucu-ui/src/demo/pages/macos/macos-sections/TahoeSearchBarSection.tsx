import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
} from '../../../../index';
import { MacOSTahoeSearchBar } from '../../../../components/macos/tahoe/search-bar-tahoe';

export const TahoeSearchBarSection: React.FC = () => {
  const [value, setValue] = useState('');
  const [lgValue, setLgValue] = useState('Documents');

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Search Bar
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Liquid Glass search field with glass material background, clear
          button, and submit/escape keyboard support.
        </Typography>
      </div>

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
        <CardTitle title="Usage" className="mt-2 mb-2">
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
    </>
  );
};

export default TahoeSearchBarSection;
