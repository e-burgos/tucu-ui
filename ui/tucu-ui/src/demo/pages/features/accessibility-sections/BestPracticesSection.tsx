import React from 'react';
import {
  Alert,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
            <Typography tag="h6" className="font-semibold">
              Accessibility Best Practices
            </Typography>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Use semantic HTML elements whenever possible</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Provide alternative text for all images</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>
                Ensure sufficient color contrast (4.5:1 for normal text)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Make all functionality keyboard accessible</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Use ARIA labels and descriptions appropriately</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Test with real users who use assistive technologies</span>
            </li>
          </ul>
        </div>
      </Alert>
    </div>
  );
};

export default BestPracticesSection;

