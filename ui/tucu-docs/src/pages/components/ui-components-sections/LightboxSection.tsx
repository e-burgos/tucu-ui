import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Lightbox,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const svgDataUri = (label: string, from: string, to: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><text x="600" y="420" font-size="96" fill="white" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`
  )}`;

const items = [
  { label: 'Sunrise', from: '#f59e0b', to: '#ef4444' },
  { label: 'Ocean', from: '#0ea5e9', to: '#6366f1' },
  { label: 'Forest', from: '#10b981', to: '#14532d' },
  { label: 'Dusk', from: '#a855f7', to: '#1e1b4b' },
].map(({ label, from, to }) => ({
  src: svgDataUri(label, from, to),
  alt: label,
  caption: label,
}));

const LightboxSection: React.FC = () => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <HeroCard
        title="Lightbox"
        description="Fullscreen image viewer with keyboard and swipe navigation, thumbnails, counter, zoom and looping."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Expand className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Gallery" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((item, i) => (
              <button
                key={item.alt}
                type="button"
                onClick={() => setIndex(i)}
                className="overflow-hidden rounded-lg"
                aria-label={`Open ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} className="w-full h-auto" />
              </button>
            ))}
          </div>
          <Lightbox
            items={items}
            index={index}
            onIndexChange={setIndex}
            onClose={() => setIndex(null)}
            showThumbnails
            loop
          />
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="Lightbox" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Lightbox } from '@e-burgos/tucu-ui';

const [index, setIndex] = useState<number | null>(null);

<Lightbox
  items={photos.map((p) => ({ src: p.url, alt: p.title, caption: p.title }))}
  index={index}
  onIndexChange={setIndex}
  onClose={() => setIndex(null)}
  showThumbnails
  loop
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default LightboxSection;
