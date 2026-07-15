import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  Button,
  AnchorLink,
} from '@e-burgos/tucu-ui';

const LiveDemoSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Live Demo Form"
        description="See the form system in action with a fully functional interactive example featuring validation, error states, and submission handling."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Play className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Interactive Example
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Navigate to the full form example to interact with all input types,
            validation modes, and form methods
          </Typography>
        </div>

        <CardContainer>
          <div className="w-full p-6 sm:p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <LucideIcons.ExternalLink className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <Typography tag="h3" className="font-semibold text-lg">
                  Form Example Page
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-500 dark:text-gray-400 max-w-md"
                >
                  A complete form with all available input types, centralized
                  validation, real-time error feedback, and submission handling.
                </Typography>
              </div>
              <div className="flex gap-3">
                <Button size="medium">
                  <AnchorLink to="/form-system/example">
                    <span className="flex items-center gap-2">
                      <LucideIcons.Play className="w-4 h-4" />
                      Open Form Example
                    </span>
                  </AnchorLink>
                </Button>
                <Button size="medium" variant="ghost">
                  <AnchorLink to="/form-system/code-example">
                    <span className="flex items-center gap-2">
                      <LucideIcons.Code className="w-4 h-4" />
                      View Source Code
                    </span>
                  </AnchorLink>
                </Button>
              </div>
            </div>
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default LiveDemoSection;
