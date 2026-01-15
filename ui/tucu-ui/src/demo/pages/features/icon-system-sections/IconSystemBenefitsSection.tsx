import React from 'react';
import {
  Alert,
  Typography,
  LucideIcons,
} from '../../../../index';

const IconSystemBenefitsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
            <Typography tag="h6" className="font-semibold">
              Icon System Benefits
            </Typography>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>
                Single namespace import for all Lucide icons (5000+ icons)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Automatic tree-shaking for optimal bundle size</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>
                TypeScript support with full icon name completion for both
                systems
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Seamless integration with Tailwind CSS utilities</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>98+ theme-aware custom icons with brand consistency</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>
                Unified API for both custom and Lucide icons for easy migration
              </span>
            </li>
          </ul>
        </div>
      </Alert>
    </div>
  );
};

export default IconSystemBenefitsSection;

