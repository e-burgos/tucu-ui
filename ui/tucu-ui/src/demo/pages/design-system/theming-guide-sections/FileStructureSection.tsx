import React from 'react';
import { CardContainer, CardTitle, Typography, Alert, CodeBlock } from '../../../../index';

const FileStructureSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          File Structure & Important Notes
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Understanding the theme system architecture
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardContainer>
          <CardTitle title="File Structure" className="mt-2 mb-6">
            <div className="space-y-4">
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
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Important Notes" className="mt-2 mb-6">
            <div className="space-y-4">
              <Alert variant="info" dismissible={false}>
                <Typography tag="h5" className="font-semibold text-sm mb-2">
                  Spacing Classes
                </Typography>
                <Typography tag="p" className="text-xs">
                  All spacing classes use arbitrary values (e.g.,{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded">
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
                  Theme settings are automatically persisted to localStorage
                  using Zustand's persist middleware. Storage key:{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded">
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
                  Theme colors are injected as CSS variables on the document
                  root. These variables are used by Tailwind utilities and can
                  be referenced directly in CSS or inline styles.
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </>
  );
};

export default FileStructureSection;

