import FormExample from '@tucu-ui-internal/components/forms/example/form-example';
import { HeroCard, LucideIcons } from '@e-burgos/tucu-ui';

export function FormExamplePage() {
  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Form System In Action"
        description="This is a simple form example that demonstrates the use of the Tucu UI form system."
        githubButton
        getStartedButton
        docsButton="form-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Form Example Section */}
      <section className="space-y-8 max-w-7xl w-full mx-auto">
        <FormExample />
      </section>
    </div>
  );
}

export default FormExamplePage;
