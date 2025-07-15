import { ErrorContainerExample } from './example/error-container-example';
import { FormMethodsExample } from './example/form-methods-example';
import { type FormValues } from './example/validations';

import formExampleCode from './example/form-example.tsx?raw';
import errorContainerCode from './example/error-container-example.tsx?raw';
import formMethodsCode from './example/form-methods-example.tsx?raw';
import constantsCode from './example/constants.ts?raw';
import validationsCode from './example/validations.ts?raw';
import SimpleFormExample from './example/simple-form-example';
import {
  Form,
  Typography,
  CardContainer,
  CardTitle,
  LucideIcons,
  CodeBlock,
} from 'tucu-ui';

export default function CodeExamplePage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <Form<FormValues> onSubmit={() => {}}>
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
                Form System Code Example
              </Typography>

              <Typography
                tag="p"
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
              >
                This is a code example that demonstrates the use of the Tucu UI
                form system.
              </Typography>
            </div>
          </div>
        </section>

        {/* Form Example Section */}
        <section className="space-y-8">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Form Example Component" className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-md">
                    <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Basic Form Implementation
                  </Typography>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <LucideIcons.Info className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          What is it?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          The main example form component. Demonstrates how to
                          use the centralized form system with validation,
                          fields, and state management. Uses the{' '}
                          <code>Form</code> component from <code>tucu-ui</code>{' '}
                          to provide React Hook Form context to all child
                          fields.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Code className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it implemented?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Defines the form using{' '}
                          <code>{'<Form<FormValues> ...>'}</code>, uses{' '}
                          <code>FormField</code> for each field, passes
                          centralized validation via{' '}
                          <code>validationSchema</code>, and includes helper
                          components for error and method display.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Play className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it used?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Simply render <code>{'<FormExample />'}</code> to get
                          a fully validated, error-handling form.
                        </Typography>
                      </div>
                    </li>
                  </ul>

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Code Example
                  </Typography>
                  <CodeBlock code={formExampleCode} />

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Live Demo
                  </Typography>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <SimpleFormExample />
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* Error Container Example Section */}
        <section className="space-y-8">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Error Container Example" className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                    <LucideIcons.AlertCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Form Error Handling
                  </Typography>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <LucideIcons.Info className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          What is it?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          A component that consumes the React Hook Form context
                          using <code>useFormContext</code> and displays the
                          current form errors.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Code className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it implemented?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Uses <code>useFormContext&lt;FormValues&gt;()</code>{' '}
                          to access <code>formState.errors</code> and renders a{' '}
                          <code>&lt;pre&gt;</code> block with the current errors
                          as JSON.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Play className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it used?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Place <code>{'<ErrorContainerExample />'}</code>{' '}
                          inside a <code>{'<Form>'}</code> to see real-time form
                          errors.
                        </Typography>
                      </div>
                    </li>
                  </ul>

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Code Example
                  </Typography>
                  <CodeBlock code={errorContainerCode} />

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Live Demo
                  </Typography>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <ErrorContainerExample />
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* Form Methods Example Section */}
        <section className="space-y-8">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Form Methods Example" className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 shadow-md">
                    <LucideIcons.Wand2 className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Form Method Manipulation
                  </Typography>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <LucideIcons.Info className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          What is it?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          A component that demonstrates how to access and
                          manipulate form methods (reset, trigger, setValue,
                          getValues, watch, etc.) using the React Hook Form
                          context.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Code className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it implemented?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Uses <code>useFormContext&lt;FormValues&gt;()</code>{' '}
                          to access form methods and state, shows real-time
                          field values, and provides buttons to interact with
                          the form programmatically.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Play className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it used?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Place <code>{'<FormMethodsExample />'}</code> inside a{' '}
                          <code>{'<Form>'}</code> to interact with and observe
                          form state and methods.
                        </Typography>
                      </div>
                    </li>
                  </ul>

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Code Example
                  </Typography>
                  <CodeBlock code={formMethodsCode} />

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Live Demo
                  </Typography>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <FormMethodsExample />
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* Constants Section */}
        <section className="space-y-8">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Constants" className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 shadow-md">
                    <LucideIcons.ListChecks className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Form Options & Constants
                  </Typography>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <LucideIcons.Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          What is it?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          A file of reusable constants for select, radio, and
                          other field options.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Code className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it implemented?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Exports arrays like <code>countryOptions</code>,{' '}
                          <code>genderOptions</code>, and{' '}
                          <code>developerOptions</code> for use in form fields.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Play className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it used?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Use these constants in <code>InputSelect</code>,{' '}
                          <code>RadioGroup</code>, etc., to populate field
                          options.
                        </Typography>
                      </div>
                    </li>
                  </ul>

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Code Example
                  </Typography>
                  <CodeBlock code={constantsCode} />
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* Validations Section */}
        <section className="space-y-8">
          <CardContainer className="overflow-hidden">
            <CardTitle title="Validations" className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
                    <LucideIcons.ShieldCheck className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Form Validation Rules
                  </Typography>
                </div>

                <div className="space-y-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <LucideIcons.Info className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          What is it?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          A centralized file for form validation rules and
                          default values.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Code className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it implemented?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Defines the <code>FormValues</code> interface, exports{' '}
                          <code>defaultValues</code> for initial form state, and{' '}
                          <code>formValidations</code> for field validation
                          rules.
                        </Typography>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LucideIcons.Play className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <Typography tag="span" className="font-semibold block">
                          How is it used?
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Pass <code>formValidations</code> and{' '}
                          <code>defaultValues</code> to the <code>Form</code>{' '}
                          component to enable centralized, type-safe validation
                          and state.
                        </Typography>
                      </div>
                    </li>
                  </ul>

                  <Typography tag="h4" className="font-semibold text-lg mt-6">
                    Code Example
                  </Typography>
                  <CodeBlock code={validationsCode} />
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>
      </Form>
    </div>
  );
}
