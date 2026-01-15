import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons } from '../../../../index';

const ImplementationGuidelinesSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Implementation Guidelines
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Best practices and common pitfalls when implementing the design system
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <CardTitle title="Best Practices" className="mt-2 mb-2">
            <div className="w-full space-y-4 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-sm">
                  <LucideIcons.CheckCircle className="h-5 w-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold text-green-700">
                  Best Practices
                </Typography>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Use semantic HTML elements</li>
                <li>• Follow consistent naming conventions</li>
                <li>• Implement proper ARIA attributes</li>
                <li>• Test across different devices</li>
                <li>• Optimize for performance</li>
                <li>• Document component usage</li>
              </ul>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <CardTitle title="Common Pitfalls" className="mt-2 mb-2">
            <div className="w-full space-y-4 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-linear-to-br from-red-500 via-rose-500 to-pink-500 shadow-sm">
                  <LucideIcons.XCircle className="h-5 w-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold text-red-700">
                  Common Pitfalls
                </Typography>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Inconsistent spacing usage</li>
                <li>• Mixing different color systems</li>
                <li>• Ignoring responsive design</li>
                <li>• Overriding component styles</li>
                <li>• Missing accessibility features</li>
                <li>• Not following design tokens</li>
              </ul>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </>
  );
};

export default ImplementationGuidelinesSection;

