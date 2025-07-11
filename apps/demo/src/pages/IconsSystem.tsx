import { CardContainer, CardTitle, Typography, LucideIcons } from 'tucu-ui';

export function IconsSystem() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <LucideIcons.Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <Typography tag="h1" className="mb-4 text-4xl font-bold">
          Icons System
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Comprehensive icon system with Lucide React integration.
        </Typography>
      </div>

      <CardContainer className="p-6">
        <CardTitle className="mb-6">Icons System Documentation</CardTitle>
        <Typography tag="p" className="text-gray-600 dark:text-gray-400">
          This page will contain detailed icons system documentation based on
          the MDX content.
        </Typography>
      </CardContainer>
    </div>
  );
}
