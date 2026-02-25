# Skill: Tucu-UI Form System

Complete guide to building forms with `@e-burgos/tucu-ui`. The library wraps `react-hook-form` with a declarative `<Form />` component, integrated input components, and centralized validation patterns.

> **Companion Skills**: See `tucu-ui-catalog` for full component props, `tucu-ui` for overview, `tucu-ui-design-system` for theming.
> **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## 1. Core Concepts

- **`<Form />`** wraps `react-hook-form`'s `FormProvider`, managing context, submission, and validation.
- All input components (`Input`, `Select`, `Checkbox`, etc.) are **controlled** when placed inside `<Form />` — they auto-register via the `name` prop.
- Validation rules are defined **centrally** in `validationSchema` — keep input components free of logic.
- Access form methods in child components via **`useFormContext()`**.

---

## 2. `<Form />` Component

### Props

```typescript
interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;                      // Called with validated data
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  useFormProps?: UseFormProps<T>;                   // react-hook-form config (defaultValues, mode, etc.)
  validationSchema?: FormValidations<T>;           // Centralized validation rules
  className?: string;
}
```

### Basic Example

```tsx
import { Form, Input, Button } from '@e-burgos/tucu-ui';

const SimpleForm = () => (
  <Form
    onSubmit={(data) => console.log(data)}
    useFormProps={{ defaultValues: { name: '', email: '' } }}
    className="space-y-4"
  >
    <Input name="name" label="Name" />
    <Input name="email" label="Email" type="email" />
    <Button type="submit">Submit</Button>
  </Form>
);
```

### Render Function Pattern

Use when you need direct access to form methods in the parent:

```tsx
<Form onSubmit={handleSubmit} useFormProps={{ mode: 'onChange' }}>
  {(methods) => (
    <>
      <Input name="search" label="Search" />
      <p>Current value: {methods.watch('search')}</p>
      <Button type="submit" disabled={!methods.formState.isValid}>Search</Button>
    </>
  )}
</Form>
```

---

## 3. Validation Schema

Define all validation rules in one place. Supports all standard `react-hook-form` rules.

### Available Rules

| Rule          | Example                                                       | Description                    |
| ------------- | ------------------------------------------------------------- | ------------------------------ |
| `required`    | `{ required: 'Field is required' }`                           | Field must have a value        |
| `minLength`   | `{ minLength: { value: 3, message: 'Min 3 chars' } }`        | Minimum character count        |
| `maxLength`   | `{ maxLength: { value: 100, message: 'Max 100 chars' } }`    | Maximum character count        |
| `min`         | `{ min: { value: 0, message: 'Min value 0' } }`              | Minimum numeric value          |
| `max`         | `{ max: { value: 999, message: 'Max value 999' } }`          | Maximum numeric value          |
| `pattern`     | `{ pattern: { value: /regex/, message: 'Invalid format' } }` | Regex validation               |
| `validate`    | `{ validate: (v) => v !== 'bad' \|\| 'Invalid' }`            | Custom validation function     |

### Example

```tsx
const validationSchema = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Minimum 8 characters' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Must include uppercase, lowercase, and number',
    },
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
```

---

## 4. `useFormContext()` Hook

Access all `react-hook-form` methods from any child component inside `<Form />`.

### Available Methods

```typescript
const {
  // Values
  watch,                // watch('fieldName') or watch() for all
  getValues,            // getValues('fieldName') or getValues()
  setValue,             // setValue('fieldName', value, { shouldValidate: true })

  // Validation
  trigger,              // trigger() all or trigger('fieldName')
  clearErrors,          // clearErrors('fieldName')

  // Form state
  formState: {
    errors,             // { fieldName: { message: string } }
    isDirty,            // true if any field changed
    isValid,            // true if all validations pass
    isSubmitting,       // true during async submission
    isSubmitSuccessful,
    dirtyFields,
    touchedFields,
  },

  // Control
  reset,                // reset() or reset({ field: value })
  resetField,           // resetField('fieldName')
  setFocus,             // setFocus('fieldName')
  setError,             // setError('fieldName', { type: 'manual', message: '...' })
} = useFormContext();
```

### Pattern: Submit Button in Child Component

```tsx
import { useFormContext, Button } from '@e-burgos/tucu-ui';

const FormActions = () => {
  const { formState: { isSubmitting, isValid, isDirty }, reset } = useFormContext();

  return (
    <div className="flex gap-4">
      <Button type="button" variant="ghost" onClick={() => reset()} disabled={!isDirty}>
        Reset
      </Button>
      <Button type="submit" isLoading={isSubmitting} disabled={!isValid}>
        Save
      </Button>
    </div>
  );
};
```

### Pattern: Conditional Fields

```tsx
import { useFormContext, Input, Select } from '@e-burgos/tucu-ui';

const AddressFields = () => {
  const { watch } = useFormContext();
  const country = watch('country');

  return (
    <>
      <Select name="country" label="Country" options={countries} />
      {country === 'US' && <Input name="state" label="State" />}
      {country === 'US' && <Input name="zipCode" label="ZIP Code" />}
      {country !== 'US' && <Input name="postalCode" label="Postal Code" />}
    </>
  );
};
```

---

## 5. Input Components Reference

All inputs auto-register when used inside `<Form />` with a `name` prop.

### Text & Numbers

#### `Input`

```tsx
// Standard text
<Input name="fullName" label="Full Name" variant="solid" />

// Email
<Input name="email" label="Email" type="email" />

// Password (auto toggle visibility)
<Input name="password" label="Password" type="password" />

// Number
<Input name="quantity" label="Quantity" type="number" />

// Date picker with i18n
<Input name="birthDate" label="Date of Birth" type="date" locale="en-US" />

// With suffix icon
<Input name="website" label="Website" suffix={<LucideIcons.Globe />} />
```

**Variants:** `ghost` (default), `solid`, `transparent`

#### `Textarea`

```tsx
<Textarea name="description" label="Description" helperText="Maximum 500 characters" variant="solid" />
```

#### `PinCode`

```tsx
// OTP / Verification code
<PinCode name="otp" length={6} type="number" mask />

// Regular PIN
<PinCode name="pin" length={4} size="large" rounded variant="solid" color="primary" />
```

### Selection

#### `Select`

```tsx
<Select
  name="role"
  label="Role"
  options={[
    { name: 'Admin', value: 'admin' },
    { name: 'Editor', value: 'editor' },
    { name: 'Viewer', value: 'viewer' },
  ]}
  variant="solid"
  placeholder="Select a role"
/>
```

#### `Checkbox`

```tsx
<Checkbox name="terms" label="I accept the terms and conditions" size="md" shape="rounded" />
<Checkbox name="newsletter" label="Subscribe to newsletter" color="primary" labelPlacement="end" />
```

#### `Radio` & `RadioGroup`

```tsx
// Group with options
<RadioGroup
  name="gender"
  direction="horizontal"
  options={[
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' },
  ]}
/>
```

#### `Switch`

```tsx
<Switch name="darkMode" label="Dark Mode" onLabel="On" offLabel="Off" />
```

#### `ToggleBar`

```tsx
<ToggleBar
  title="Email Notifications"
  subTitle="Receive updates via email"
  icon={<LucideIcons.Mail />}
  checked={enabled}
  onChange={setEnabled}
/>
```

### Files

#### `FileInput`

```tsx
<FileInput name="avatar" label="Profile Photo" accept="img" />
<FileInput name="documents" label="Documents" accept="imgAndPdf" multiple />
<FileInput name="spreadsheet" label="Data File" accept="csvAndExcel" placeholderText="Drop your file here" />
```

**Accept options:** `img`, `pdf`, `csvAndExcel`, `imgAndPdf`, `all`

### Search

#### `InputSearcher`

```tsx
<InputSearcher
  name="search"
  options={[
    { name: 'React', value: 'react' },
    { name: 'Vue', value: 'vue' },
    { name: 'Angular', value: 'angular' },
  ]}
  noMatchesMessage="No frameworks found"
  multiple
  variant="solid"
/>
```

---

## 6. `FormField` Component

For custom inputs that don't have built-in Form integration, use `FormField` to wrap them with `Controller`.

```tsx
import { Form, FormField } from '@e-burgos/tucu-ui';

<Form onSubmit={handleSubmit}>
  <FormField name="customField" label="Custom Input" rules={{ required: 'Required' }}>
    <MyCustomInput />
  </FormField>
</Form>
```

**Props:**

| Prop         | Type               | Description                      |
| ------------ | ------------------ | -------------------------------- |
| `name`       | `Path<T>`          | Field name in form data          |
| `label`      | `string?`          | Label text                       |
| `helperText` | `string?`          | Help text below the field        |
| `rules`      | `RegisterOptions?` | Validation rules for this field  |
| `hideError`  | `boolean?`         | Hide error message               |
| `showHelper` | `boolean?`         | Show helper text even with error |
| `children`   | `ReactElement`     | The input element to control     |

---

## 7. Re-exported Types from react-hook-form

The library re-exports these types for convenience — no need to install `react-hook-form` directly:

```typescript
import {
  SubmitHandler,
  UseFormProps,
  FieldValues,
  UseFormReturn,
  Controller,
  useFormContext,
  Path,
  FieldError,
  RegisterOptions,
  FieldErrors,
} from '@e-burgos/tucu-ui';
```

---

## 8. Complete Form Patterns

### Login Form

```tsx
import { Form, Input, Checkbox, Button, useFormContext } from '@e-burgos/tucu-ui';

const validationSchema = {
  email: { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } },
  password: { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } },
};

const LoginButton = () => {
  const { formState: { isSubmitting, isValid } } = useFormContext();
  return <Button type="submit" isLoading={isSubmitting} disabled={!isValid} fullWidth>Sign In</Button>;
};

const LoginForm = ({ onLogin }) => (
  <Form
    onSubmit={onLogin}
    validationSchema={validationSchema}
    useFormProps={{ mode: 'onChange', defaultValues: { email: '', password: '', remember: false } }}
    className="space-y-4"
  >
    <Input name="email" label="Email" type="email" variant="solid" />
    <Input name="password" label="Password" type="password" variant="solid" />
    <Checkbox name="remember" label="Remember me" />
    <LoginButton />
  </Form>
);
```

### Registration Form with Multiple Sections

```tsx
import { Form, Input, Select, Checkbox, RadioGroup, FileInput, Button } from '@e-burgos/tucu-ui';

const validationSchema = {
  firstName: { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } },
  lastName: { required: 'Required' },
  email: { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } },
  password: { required: 'Required', minLength: { value: 8, message: 'Min 8 chars' } },
  role: { required: 'Select a role' },
  terms: { required: 'You must accept the terms' },
};

const RegistrationForm = ({ onRegister }) => (
  <Form
    onSubmit={onRegister}
    validationSchema={validationSchema}
    useFormProps={{ mode: 'onChange' }}
    className="space-y-6"
  >
    {/* Personal Info */}
    <div className="grid grid-cols-2 gap-4">
      <Input name="firstName" label="First Name" />
      <Input name="lastName" label="Last Name" />
    </div>
    <Input name="email" label="Email" type="email" />
    <Input name="password" label="Password" type="password" />

    {/* Role & Preferences */}
    <Select
      name="role"
      label="Role"
      options={[
        { name: 'Developer', value: 'dev' },
        { name: 'Designer', value: 'design' },
        { name: 'Manager', value: 'manager' },
      ]}
    />
    <RadioGroup
      name="experience"
      direction="horizontal"
      options={[
        { label: 'Junior', value: 'junior' },
        { label: 'Mid', value: 'mid' },
        { label: 'Senior', value: 'senior' },
      ]}
    />

    {/* Avatar */}
    <FileInput name="avatar" label="Profile Photo" accept="img" />

    {/* Terms */}
    <Checkbox name="terms" label="I accept the terms and conditions" />

    <Button type="submit" fullWidth>Create Account</Button>
  </Form>
);
```

### Settings Form with Programmatic Control

```tsx
import { Form, Input, Switch, ToggleBar, Button, useFormContext, LucideIcons } from '@e-burgos/tucu-ui';

const SettingsActions = () => {
  const { formState: { isDirty, isSubmitting }, reset } = useFormContext();

  return (
    <div className="flex justify-end gap-4">
      <Button type="button" variant="ghost" onClick={() => reset()} disabled={!isDirty}>
        Discard Changes
      </Button>
      <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
        Save Settings
      </Button>
    </div>
  );
};

const SettingsForm = ({ currentSettings, onSave }) => (
  <Form
    onSubmit={onSave}
    useFormProps={{ defaultValues: currentSettings, mode: 'onChange' }}
    className="space-y-6"
  >
    <Input name="displayName" label="Display Name" variant="solid" />
    <Input name="bio" label="Bio" variant="solid" />
    <Switch name="emailNotifications" label="Email Notifications" onLabel="On" offLabel="Off" />
    <Switch name="pushNotifications" label="Push Notifications" onLabel="On" offLabel="Off" />
    <ToggleBar
      title="Marketing Emails"
      subTitle="Receive promotional content"
      icon={<LucideIcons.Mail />}
      checked={false}
      onChange={() => {}}
    />
    <SettingsActions />
  </Form>
);
```

### Pre-built Authentication Forms

The library includes ready-to-use auth forms — no need to build from scratch:

```tsx
import { SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm } from '@e-burgos/tucu-ui';

// Login
<SignInForm
  title="Welcome Back"
  forgetPasswordPath="/auth/forgot-password"
  onSubmit={(data) => login(data.email, data.password)}
  isLoading={loading}
  error={errorMessage}
/>

// Registration
<SignUpForm
  title="Create Account"
  onSubmit={(data) => register(data)}
  termsOfServicePath="/terms"
  privacyPolicyPath="/privacy"
/>

// Forgot Password
<ForgetPasswordForm
  title="Reset Password"
  onSubmit={(data) => sendResetEmail(data.email)}
  successMessage="Check your inbox"
/>

// PIN Verification
<ResetPinForm
  title="Enter Code"
  pinLength={6}
  signInPath="/auth/login"
  onSubmit={(data) => verifyPin(data.pin)}
/>
```

---

## 9. Agent Guidelines for Forms

1. **Always use `<Form />`** — never use raw `<form>` or direct `react-hook-form` `useForm()`.
2. **Centralize validations** in `validationSchema` — don't add `rules` prop to individual inputs.
3. **Use `useFormContext()`** in child components for submit buttons, conditional fields, and programmatic control.
4. **Set `mode: 'onChange'`** in `useFormProps` for real-time validation feedback.
5. **Provide `defaultValues`** in `useFormProps` to prevent uncontrolled-to-controlled warnings.
6. **Import types from `@e-burgos/tucu-ui`** — don't install `react-hook-form` as a separate dependency.
7. **Use built-in auth forms** (`SignInForm`, `SignUpForm`, etc.) instead of building login/register from scratch.
