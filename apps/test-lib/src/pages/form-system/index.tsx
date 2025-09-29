import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
  Button,
  AnchorLink,
  CodeBlock,
} from '@tucu-ui';
import HeroPage from '../../components/HeroPage';

export function FormSystem() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Form System"
        description="Comprehensive form handling built on React Hook Form with powerful validation, state management, and excellent developer experience."
        githubButton
        getStartedButton
        docsButton="form-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Architecture Overview */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Architecture Overview
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built on React Hook Form for performance and developer experience
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <LucideIcons.Box className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Form Container',
              description:
                'Main wrapper with built-in state management and submission handling',
              color: 'from-blue-500 via-indigo-500 to-purple-500',
            },
            {
              icon: (
                <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'FormField Wrapper',
              description:
                'Connects inputs to validation with automatic error handling',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.CheckCircle className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Validation System',
              description:
                'Built-in and custom validation rules with TypeScript support',
              color: 'from-orange-500 via-red-500 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Performance',
              description:
                'Minimal re-renders with optimized form state management',
              color: 'from-purple-500 via-violet-500 to-indigo-500',
            },
          ].map((item, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm"
                >
                  {item.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Basic Usage */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Basic Form Usage" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                  <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Simple Contact Form
                </Typography>
              </div>
              <div className="">
                <CodeBlock
                  language="tsx"
                  code={`import { Form, FormField, Input, Button } from 'tucu-ui';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const handleSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form<ContactFormData>
      onSubmit={handleSubmit}
      useFormProps={{
        defaultValues: { name: '', email: '', message: '' },
      }}
    >
      <FormField<ContactFormData>
        name="name"
        label="Full Name"
        rules={{ required: 'Name is required' }}
      >
        <Input placeholder="Enter your name" />
      </FormField>

      <FormField<ContactFormData>
        name="email"
        label="Email Address"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      >
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <Button type="submit">Send Message</Button>
    </Form>
  );
}`}
                />
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Form Components */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Form Components
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Complete collection of form inputs and controls
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Text Inputs',
              description: 'Input, Textarea with validation support',
              color: 'from-blue-500 to-cyan-500',
              types: ['Input', 'Textarea', 'Password'],
            },
            {
              icon: (
                <LucideIcons.List className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Selection',
              description: 'Dropdowns and selection components',
              color: 'from-green-500 to-emerald-500',
              types: ['InputSelect', 'Combobox', 'Autocomplete'],
            },
            {
              icon: (
                <LucideIcons.CheckSquare className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Choice Controls',
              description: 'Checkbox and radio button groups',
              color: 'from-purple-500 to-violet-500',
              types: ['Checkbox', 'Radio', 'RadioGroup'],
            },
            {
              icon: (
                <LucideIcons.Calendar className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Date & Time',
              description: 'Date and time picker components',
              color: 'from-orange-500 to-red-500',
              types: ['DatePicker', 'TimePicker', 'DateRange'],
            },
            {
              icon: (
                <LucideIcons.Upload className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'File Upload',
              description: 'File input with drag & drop support',
              color: 'from-pink-500 to-rose-500',
              types: ['FileInput', 'ImageUpload', 'MultiFile'],
            },
            {
              icon: (
                <LucideIcons.Hash className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Specialized',
              description: 'PIN codes, sliders, and custom inputs',
              color: 'from-indigo-500 to-purple-500',
              types: ['PinCode', 'RangeSlider', 'ColorPicker'],
            },
          ].map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {category.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {category.description}
                </Typography>
                <div className="flex flex-wrap gap-1">
                  {category.types.map((type, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Live Demo Form */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Live Demo Form" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                  <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Interactive Form Example
                </Typography>
              </div>

              <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-light-dark rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  <Button size="small" className="animate-bounce">
                    <AnchorLink to="/form-system/example">
                      Go to Form Example
                    </AnchorLink>
                  </Button>
                </h2>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Validation System */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Validation System" className="mt-2 mb-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg shadow-lg">
                      <LucideIcons.Shield className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Built-in Rules
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    {[
                      { rule: 'required', description: 'Field is mandatory' },
                      {
                        rule: 'minLength',
                        description: 'Minimum character count',
                      },
                      {
                        rule: 'maxLength',
                        description: 'Maximum character count',
                      },
                      {
                        rule: 'pattern',
                        description: 'Regex pattern matching',
                      },
                      {
                        rule: 'min/max',
                        description: 'Numeric range validation',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <code className="text-sm font-medium">{item.rule}</code>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                      <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Custom Validation
                    </Typography>
                  </div>
                  <div className="">
                    <CodeBlock
                      language="tsx"
                      code={`rules={{
  validate: {
    strength: (value) => {
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\\d/.test(value);
      
      if (!hasUpper || !hasLower || !hasNumber) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return true;
    }
  }
}}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Advanced Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Advanced Features
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful features for complex form scenarios
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <LucideIcons.GitBranch className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Conditional Fields',
              description:
                'Show/hide fields based on other field values with dynamic validation',
              color: 'from-blue-500 via-indigo-500 to-purple-500',
            },
            {
              icon: (
                <LucideIcons.Plus className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dynamic Arrays',
              description:
                'Handle dynamic lists of fields with add/remove functionality',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.ArrowRight className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Multi-Step Forms',
              description:
                'Wizard-style forms with step validation and progress tracking',
              color: 'from-orange-500 via-red-500 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Async Validation',
              description:
                'Server-side validation with debouncing and loading states',
              color: 'from-purple-500 via-violet-500 to-indigo-500',
            },
            {
              icon: (
                <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Form State Management',
              description:
                'Real-time access to form state, values, and validation status',
              color: 'from-pink-500 via-rose-500 to-red-500',
            },
            {
              icon: (
                <LucideIcons.AlertTriangle className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Error Handling',
              description:
                'Comprehensive error handling with custom error display options',
              color: 'from-yellow-500 via-orange-500 to-red-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Best Practices" className="mt-2 mb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                      <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-green-600 dark:text-green-400"
                    >
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
                        <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                      <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography
                      tag="h4"
                      className="font-semibold text-blue-600 dark:text-blue-400"
                    >
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
                        <LucideIcons.Code className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
