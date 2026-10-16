// ─── Resource: Form System ───────────────────────────────────────────────────

export function getFormsContent(): string {
  return `# Form System — @e-burgos/tucu-ui

## Core Concepts
- \`<Form />\` wraps react-hook-form's FormProvider
- Connect each control with \`<FormField name="...">\` (Controller-based)
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
import { Form, FormField, Input, Button } from '@e-burgos/tucu-ui';

const SimpleForm = () => (
  <Form
    onSubmit={(data) => console.log(data)}
    useFormProps={{ defaultValues: { name: '', email: '' } }}
    className="space-y-4"
  >
    <FormField name="name" label="Name"><Input /></FormField>
    <FormField name="email" label="Email"><Input type="email" /></FormField>
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

## Field types: masks and built-in validation
Wrap each control in \`FormField\` (inputs are not auto-registered by \`name\`).
\`FormField\` infers a validator from the child \`Input\` and adds it to your \`rules\`;
\`required: true\` becomes a localized message. Messages follow \`ThemeProvider lang\` (es | en | fr).

| Child Input | Validator | Mask / value |
|---|---|---|
| \`type="email"\` | email (max 254 chars, local part max 64; empty+required → "Ingresá un email" in es) | — |
| \`type="tel"\` | phone (generic international, 8–15 digits) | add \`mask="phone"\` to format |
| \`mask="phone"\` (+ \`phoneCountry\`, default \`AR\`) | phone, strict per country | \`+54 9 11 2345-6789\` (\`0054 …\` is accepted like \`+54\`; complete landlines get \`+54\`); \`unmask\` → \`+5491123456789\` |
| \`mask="cuit"\` | CUIT/CUIL check digit | \`20-12345678-6\`; \`unmask\` → \`20123456786\` |
| \`type="url"\` | url (http/https, protocol optional) | — |
| \`mask="currency"\` / \`mask="number"\` | — (use \`validationType="number"\`) | \`$ 1.234,56\`; \`unmask\` → \`1234.56\` |

Opt out with \`<FormField autoValidate={false}>\` or \`<Input validationType={false}>\`.
Outside forms, \`<Input type="email">\` validates on blur by itself (\`autoValidate\`, default true).

\`\`\`tsx
<FormField<Customer> name="phone" label="Teléfono" rules={{ required: true }}>
  <Input type="tel" mask="phone" unmask />
</FormField>
<FormField<Customer> name="cuit" label="CUIT">
  <Input mask="cuit" unmask />
</FormField>
\`\`\`

Standalone helpers: \`validateEmail | validatePhone | validateUrl | validateCuit | validateRequired | validateNumber\`
(each returns the message or \`undefined\`), \`getValidationRules(type, { lang, required, phoneCountry })\`
for \`register\`/\`validationSchema\`, \`formatPhone\`, \`normalizePhone\`, \`isValidPhone\`,
\`formatCuit\`, \`isValidCuit\`, \`formatNumber\`, \`parseNumber\`, \`createMask\`,
\`registerPhoneCountry({ code, dialCode, parseNational, isValidNational, formatNational })\`.

## Input Components (inside Form)
| Component | Key Props |
|-----------|-----------|
| Input | label, error, variant (ghost/solid/transparent), suffix, icon, mask, unmask, phoneCountry, maskOptions, autoValidate, validationType, dateFormat, locale, min/max (date) |
| Select | options: SelectOption[], variant, label, errorMessage |
| Checkbox | size (sm/md/lg), color, shape (rounded/square) |
| Radio | variant, size (sm/md/lg/xl), color |
| RadioGroup | direction (vertical/horizontal), options |
| Textarea | label, error, variant, helperText |
| Switch | label, offLabel, onLabel (ON/OFF translated by \`lang\`; \`null\` omits), checked, onChange — renders \`role="switch"\` |
| PinCode | length, type (text/number), mask, variant |
| FileInput | accept (img/pdf/csvAndExcel/all), multiple |
| InputSearcher | options, initialValue, multiple, variant |

## Types
\`\`\`typescript
type SelectOption = { name: string; value: string; icon?: ReactNode };
\`\`\`

## Re-exports from react-hook-form
SubmitHandler, UseFormProps, FieldValues, UseFormReturn, Controller, useFormContext, Path, FieldError (as FormFieldError), RegisterOptions, FieldErrors

\`useFormContext\`/\`Controller\` are re-exported straight from
\`ui/tucu-ui/src/components/forms/hook-form.tsx\` (\`export { Controller, useFormContext }\`)
— you never need \`react-hook-form\` as a direct dependency to use them.

## Advanced pattern: programmatic submit for content outside the \`<form>\` DOM node

\`useFormContext\` is not just for reading values — it is the only way to submit a \`Form\`
from content that reads its context but is **not a DOM descendant of the \`<form>\`
element**, e.g. fields rendered inside a \`Drawer\`/\`DrawerContainer\` portaled to
\`document.body\` (see \`tucu://catalog\`'s \`DrawerContainer\` entry and
\`tucu://styling-overrides\`). React context reaches across a portal, but native HTML form
submission does not — a \`<button type="submit">\` inside a portaled drawer is not a
descendant of the \`<form>\` in the DOM, so it never fires the form's submit event, and no
error is thrown; it just silently does nothing.

The fix is to keep the \`Form\` as the single source of truth and trigger submission by
hand from inside the portaled content, using \`handleSubmit\` off \`useFormContext\`:

\`\`\`tsx
import { Form, Input, Button, useFormContext, DrawerContainer } from '@e-burgos/tucu-ui';
import type { FieldValues } from '@e-burgos/tucu-ui';

function DrawerFields<TValues extends FieldValues>({ onApply }: { onApply: () => void }) {
  // Reads the SAME Form context even though this renders inside a portal
  const { handleSubmit, resetField } = useFormContext<TValues>();
  return (
    <>
      <Input name="query" label="Search" />
      <Button type="button" variant="solid" onClick={handleSubmit(() => onApply())}>
        Apply
      </Button>
      <Button type="button" variant="ghost" onClick={() => resetField('query' as never)}>
        Clear
      </Button>
    </>
  );
}

<Form onSubmit={(data) => applyFilters(data)}>
  <Input name="name" label="Name" />
  <DrawerContainer isOpen={isOpen} setIsOpen={setIsOpen}>
    <div className="pointer-events-auto">
      <DrawerFields onApply={() => setIsOpen(false)} />
    </div>
  </DrawerContainer>
</Form>
\`\`\`

Notes: the "Apply" button must be \`type="button"\`, not \`"submit"\` — a native submit
inside the portal still would not fire, so there's no reason to use it and it invites
the false assumption that it works. Use \`resetField\` per field for a "clear this
section only" control, never \`reset()\` (which clears the whole \`Form\`, including
fields outside the drawer).
`;
}
