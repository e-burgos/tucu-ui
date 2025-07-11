import { CardContainer, CardTitle, Typography, LucideIcons } from 'tucu-ui';

export function ThemingGuide() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <LucideIcons.Paintbrush className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <Typography tag="h1" className="mb-4 text-4xl font-bold">
          Theming Guide
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Complete guide to customizing themes and styling.
        </Typography>
      </div>

      <CardContainer className="p-6">
        <CardTitle className="mb-6">Theming Guide Documentation</CardTitle>
        <Typography tag="p" className="text-gray-600 dark:text-gray-400">
          This page will contain detailed theming guide documentation based on
          the MDX content.
        </Typography>
      </CardContainer>
    </div>
  );
}
