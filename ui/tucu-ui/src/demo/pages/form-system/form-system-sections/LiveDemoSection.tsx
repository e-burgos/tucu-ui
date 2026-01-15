import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Button, AnchorLink } from '../../../../index';

const LiveDemoSection: React.FC = () => {
  return (
    <>
      <CardContainer>
        <CardTitle title="Live Demo Form" className="mt-2 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h4" className="font-semibold">
                Interactive Form Example
              </Typography>
            </div>

            <div className="flex justify-center">
              <Button size="small" className="animate-bounce">
                <AnchorLink to="/form-system/example">
                  Go to Form Example
                </AnchorLink>
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default LiveDemoSection;

