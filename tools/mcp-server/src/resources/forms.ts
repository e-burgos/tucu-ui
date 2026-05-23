// ─── Resource: Form System ───────────────────────────────────────────────────

export function getFormsContent(): string {
  return `# Form System — @e-burgos/tucu-ui

## Core Concepts
- \`<Form />\` wraps react-hook-form's FormProvider
- All inputs auto-register inside Form via the \`name\` prop
- Validation rules defined centrally in \`validationSchema\`
- Access form methods via \`useFormContext()\`

## Form Component Props
\`\`\`typescript
interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  useFormProps?: UseFormProps<T>;  // defaultValues, mode, etc.
  validationSchema?: FormValidations<T>;
  className?: string;
}
\`\`\`

## Basic Example
\`\`\`tsx
import { Form, Input, Button } from '@e-burgos/tucu-ui';

const SimpleForm = () => (
  <Form
    onSubmit={(data) => console.log(data)}
    useFormProps={{ defaultValues: { name: '', email: '' } }}
    className="space-y-4"
  >
    <Input name="name" label="Name" />
    <Input name="email" label="Email" type="email" />
    <Button type="submit" variant="solid" size="medium">Submit</Button>
  </Form>
);
\`\`\`

## Render Function Pattern
\`\`\`tsx
<Form onSubmit={handleSubmit} useFormProps={{ mode: 'onChange' }}>
  {(methods) => (
    <>
      <Input name="search" label="Search" />
      <p>Current value: {methods.watch('search')}</p>
      <Button type="submit" variant="solid" disabled={!methods.formState.isValid}>
        Search
      </Button>
    </>
  )}
</Form>
\`\`\`

## Validation Schema
\`\`\`tsx
const validationSchema = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\\S+@\\S+$/, message: 'Invalid email format' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Minimum 8 characters' },
  },
  age: {
    required: 'Age is required',
    min: { value: 18, message: 'Must be at least 18' },
    max: { value: 120, message: 'Invalid age' },
  },
};

<Form onSubmit={handleSubmit} validationSchema={validationSchema}>
  <Input name="email" label="Email" type="email" />
  <Input name="password" label="Password" type="password" />
  <Input name="age" label="Age" type="number" />
</Form>
\`\`\`

## Available Validation Rules
| Rule | Example | Description |
|------|---------|-------------|
| required | \`{ required: 'Field is required' }\` | Field must have value |
| minLength | \`{ minLength: { value: 3, message: 'Min 3' } }\` | Minimum chars |
| maxLength | \`{ maxLength: { value: 100, message: 'Max 100' } }\` | Maximum chars |
| min | \`{ min: { value: 0, message: 'Min 0' } }\` | Minimum number |
| max | \`{ max: { value: 999, message: 'Max 999' } }\` | Maximum number |
| pattern | \`{ pattern: { value: /regex/, message: '...' } }\` | Regex validation |
| validate | \`{ validate: (v) => v !== 'bad' \\|\\| 'Invalid' }\` | Custom function |

## useFormContext() Hook
\`\`\`typescript
const {
  watch,       // watch('fieldName') or watch() for all
  getValues,   // getValues('fieldName')
  setValue,     // setValue('fieldName', value, { shouldValidate: true })
  trigger,     // trigger() all or trigger('fieldName')
  clearErrors, // clearErrors('fieldName')
  formState: { errors, isDirty, isValid, isSubmitting },
  reset,       // reset() or reset({ field: value })
  setFocus,    // setFocus('fieldName')
  setError,    // setError('fieldName', { type: 'manual', message: '...' })
} = useFormContext();
\`\`\`

## Input Components (inside Form)
| Component | Key Props |
|-----------|-----------|
| Input | label, error, variant (ghost/solid/transparent), suffix, icon, dateFormat, locale |
| Select | options: SelectOption[], variant, label, errorMessage |
| Checkbox | size (sm/md/lg), color, shape (rounded/square) |
| Radio | variant, size (sm/md/lg/xl), color |
| RadioGroup | direction (vertical/horizontal), options |
| Textarea | label, error, variant, helperText |
| Switch | label, offLabel, onLabel, checked, onChange |
| PinCode | length, type (text/number), mask, variant |
| FileInput | accept (img/pdf/csvAndExcel/all), multiple |
| InputSearcher | options, initialValue, multiple, variant |

## Types
\`\`\`typescript
type SelectOption = { name: string; value: string; icon?: ReactNode };
\`\`\`

## Re-exports from react-hook-form
SubmitHandler, UseFormProps, FieldValues, UseFormReturn, Controller, useFormContext, Path, FieldError, RegisterOptions, FieldErrors
`;
}
