import { LucideIcons } from '@tucu-ui';
import FormExample from './example/form-example';
import HeroPage from '../../components/HeroPage';

export default function FormExamplePage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroPage
        title="Form System In Action"
        description="This is a simple form example that demonstrates the use of the Tucu UI form system."
        githubButton
        getStartedButton
        docsButton="form-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Form Example Section */}
      <section className="space-y-8">
        <FormExample />
      </section>
    </div>
  );
}
