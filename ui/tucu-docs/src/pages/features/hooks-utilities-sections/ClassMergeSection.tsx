import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  cn,
} from '@e-burgos/tucu-ui';

const ClassMergeSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="cn and extendClassMergeTokens"
        description="Class merging with tailwind-merge used by every component, so className overrides of h-*, bg-* or text-* win over the defaults."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Combine className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="cn()" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              cn combines classnames with tailwind-merge: later conflicting
              utilities replace earlier ones.
            </Typography>
            <code className="block rounded border border-border p-3 text-xs">
              {cn('h-10 bg-red-500 px-2', 'h-12 bg-blue-500')}
            </code>
            <CodeBlock
              language="tsx"
              code={`import { cn } from '@e-burgos/tucu-ui';

cn('h-10 bg-red-500 px-2', 'h-12 bg-blue-500');

<Button className="h-12 bg-blue-500">Taller</Button>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="extendClassMergeTokens()" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Register custom theme tokens (font sizes, shadows, radii, colors,
              font families) so tailwind-merge resolves conflicts between them
              correctly. Call it once at startup.
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { extendClassMergeTokens } from '@e-burgos/tucu-ui';

extendClassMergeTokens({
  fontSize: ['body-lg'],
  shadow: ['soft'],
  radius: ['card'],
  color: ['surface'],
  fontFamily: ['display'],
});`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ClassMergeSection;
