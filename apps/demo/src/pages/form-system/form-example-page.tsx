import { Typography, LucideIcons } from 'tucu-ui';
import FormExample from './example/form-example';

export default function FormExamplePage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-transparent rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            <Typography
              tag="h1"
              className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Form System In Action
            </Typography>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              This is a simple form example that demonstrates the use of the
              Tucu UI form system.
            </Typography>
          </div>
        </div>
      </section>

      {/* Form Example Section */}
      <section className="space-y-8">
        <FormExample />
      </section>
    </div>
  );
}
