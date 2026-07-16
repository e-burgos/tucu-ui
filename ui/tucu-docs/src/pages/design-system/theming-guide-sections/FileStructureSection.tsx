import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const FileStructureSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="File Structure"
        description="Understand the theme system's file organization and important architectural notes."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-gray-500 via-slate-500 to-zinc-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.FolderTree className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Theme File Organization
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Key directories and files in the theme system
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Directory Tree">
            <CodeBlock
              language="markdown"
              code={`ui/tucu-ui/src/
├── themes/
│   ├── components/
│   │   ├── theme-provider/
│   │   │   ├── index.tsx
│   │   │   ├── single-app-theme-provider.tsx
│   │   │   ├── mfe-app-theme-provider.tsx
│   │   │   └── theme-wrapper.tsx
│   │   └── settings/
│   │       ├── settings-button.tsx
│   │       ├── settings-drawer.tsx
│   │       ├── switch-mode.tsx
│   │       └── lang-selector.tsx
│   ├── hooks/
│   │   ├── use-theme.tsx
│   │   ├── use-theme-color.ts
│   │   └── use-direction.ts
│   ├── config/
│   │   └── index.ts
│   ├── auth/
│   ├── pages/
│   ├── router/
│   ├── types/
│   └── index.ts
└── assets/css/
    └── globals.css`}
            />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Important Notes
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Key architectural details to keep in mind
          </Typography>
        </div>
        <div className="space-y-4">
          <Alert variant="info" dismissible={false}>
            <Typography tag="h5" className="font-semibold text-sm mb-2">
              Spacing Classes
            </Typography>
            <Typography tag="p" className="text-xs">
              All spacing classes use arbitrary values (e.g.,{' '}
              <code className="px-1 py-0.5 border border-border dark:border-border rounded">
                p-[16px]
              </code>
              ) instead of Tailwind defaults to maintain original spacing
              values.
            </Typography>
          </Alert>

          <Alert variant="warning" dismissible={false}>
            <Typography tag="h5" className="font-semibold text-sm mb-2">
              Theme Persistence
            </Typography>
            <Typography tag="p" className="text-xs">
              Theme settings are automatically persisted to localStorage using
              Zustand's persist middleware. Storage key:{' '}
              <code className="px-1 py-0.5 border border-border dark:border-border rounded">
                theme-storage
              </code>
              .
            </Typography>
          </Alert>

          <Alert variant="success" dismissible={false}>
            <Typography tag="h5" className="font-semibold text-sm mb-2">
              CSS Variables
            </Typography>
            <Typography tag="p" className="text-xs">
              Theme colors are injected as CSS variables on the document root.
              These variables are used by Tailwind utilities and can be
              referenced directly in CSS or inline styles.
            </Typography>
          </Alert>
        </div>
      </section>
    </>
  );
};

export default FileStructureSection;
