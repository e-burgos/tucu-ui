import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons } from '../../../../index';

const BestPracticesSection: React.FC = () => {
  return (
    <>
      <CardContainer>
        <CardTitle title="Best Practices" className="mt-2 mb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Performance & UX
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {[
                    'Use mode: "onBlur" for better performance on large forms',
                    'Provide clear, helpful error messages',
                    'Show validation feedback in real-time',
                    'Use loading states during submission',
                    'Implement proper focus management',
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
                  <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Development
                  </Typography>
                </div>
                <ul className="space-y-2">
                  {[
                    'Define TypeScript interfaces for form data',
                    'Use generic types with Form and FormField components',
                    'Leverage centralized validation schemas',
                    'Always provide labels for accessibility',
                    'Maintain logical tab order for keyboard navigation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <LucideIcons.Code className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default BestPracticesSection;

