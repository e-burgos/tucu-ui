import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Best Practices" className="mt-2 mb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                    <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Do's
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {[
                    'Use descriptive route names and paths',
                    'Keep route hierarchy logical and shallow (max 2-3 levels)',
                    'Use consistent naming conventions',
                    'Leverage TypeScript for type safety',
                    'Use useMemo for dynamic route generation',
                    'Include icons for better UX',
                    'Test routes with different user roles',
                    'Use basePath for MFE applications',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-red-500 to-rose-500 shadow-lg">
                    <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Don'ts
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {[
                    'Create overly deep nesting (>3 levels)',
                    'Use generic names like "Page" or "Component"',
                    'Hardcode routes in components',
                    'Forget to handle 404 pages',
                    'Mix routing logic with business logic',
                    'Skip accessibility considerations',
                    'Ignore mobile navigation UX',
                    'Mix StandaloneApp and MFE patterns',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default BestPracticesSection;
