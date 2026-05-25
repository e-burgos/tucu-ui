// ─── Form Patterns Registry ─────────────────────────────────────────────────
// Predefined form patterns for generate_form tool.

export interface FormFieldPattern {
  name: string;
  component: string;
  type: string;
  label: string;
  validation: string;
  props?: Record<string, string>;
}

export interface FormPattern {
  name: string;
  description: string;
  fields: FormFieldPattern[];
  validationSchema: string;
  fullExample: string;
}

export const formPatterns: FormPattern[] = [
  // ─── Login ────────────────────────────────────────────────
  {
    name: 'login',
    description: 'Login form with email and password fields.',
    fields: [
      {
        name: 'email',
        component: 'Input',
        type: 'email',
        label: 'Email',
        validation: 'z.string().email("Invalid email")',
        props: { placeholder: 'you@example.com', variant: 'ghost' },
      },
      {
        name: 'password',
        component: 'Input',
        type: 'password',
        label: 'Password',
        validation: 'z.string().min(6, "Min 6 characters")',
        props: { placeholder: '••••••••', variant: 'ghost' },
      },
    ],
    validationSchema: `import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;`,
    fullExample: `import { Form, Input, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const handleSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ email: '', password: '' }}>
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="ghost"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            variant="ghost"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button variant="solid" size="medium" type="submit">
            Sign In
          </Button>
        </>
      )}
    </Form>
  );
}`,
  },

  // ─── Registration ─────────────────────────────────────────
  {
    name: 'registration',
    description:
      'Registration form with name, email, password, and confirmation.',
    fields: [
      {
        name: 'name',
        component: 'Input',
        type: 'text',
        label: 'Full Name',
        validation: 'z.string().min(2, "Min 2 characters")',
        props: { placeholder: 'John Doe', variant: 'ghost' },
      },
      {
        name: 'email',
        component: 'Input',
        type: 'email',
        label: 'Email',
        validation: 'z.string().email("Invalid email")',
        props: { placeholder: 'you@example.com', variant: 'ghost' },
      },
      {
        name: 'password',
        component: 'Input',
        type: 'password',
        label: 'Password',
        validation: 'z.string().min(8, "Min 8 characters")',
        props: { placeholder: '••••••••', variant: 'ghost' },
      },
      {
        name: 'confirmPassword',
        component: 'Input',
        type: 'password',
        label: 'Confirm Password',
        validation: 'z.string()',
        props: { placeholder: '••••••••', variant: 'ghost' },
      },
    ],
    validationSchema: `import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(2, "Min 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;`,
    fullExample: `import { Form, Input, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(2, "Min 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const handleSubmit = (data: RegistrationFormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ name: '', email: '', password: '', confirmPassword: '' }}>
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label="Full Name"
            placeholder="John Doe"
            variant="ghost"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="ghost"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            variant="ghost"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            variant="ghost"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <Button variant="solid" size="medium" type="submit">
            Create Account
          </Button>
        </>
      )}
    </Form>
  );
}`,
  },

  // ─── Contact ──────────────────────────────────────────────
  {
    name: 'contact',
    description: 'Contact form with name, email, subject, and message.',
    fields: [
      {
        name: 'name',
        component: 'Input',
        type: 'text',
        label: 'Name',
        validation: 'z.string().min(2, "Required")',
        props: { placeholder: 'Your name', variant: 'ghost' },
      },
      {
        name: 'email',
        component: 'Input',
        type: 'email',
        label: 'Email',
        validation: 'z.string().email("Invalid email")',
        props: { placeholder: 'you@example.com', variant: 'ghost' },
      },
      {
        name: 'subject',
        component: 'Input',
        type: 'text',
        label: 'Subject',
        validation: 'z.string().min(3, "Min 3 characters")',
        props: { placeholder: 'Subject', variant: 'ghost' },
      },
      {
        name: 'message',
        component: 'Textarea',
        type: 'textarea',
        label: 'Message',
        validation: 'z.string().min(10, "Min 10 characters")',
        props: { placeholder: 'Your message...', variant: 'ghost', rows: '4' },
      },
    ],
    validationSchema: `import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Min 3 characters"),
  message: z.string().min(10, "Min 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;`,
    fullExample: `import { Form, Input, Textarea, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Min 3 characters"),
  message: z.string().min(10, "Min 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const handleSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ name: '', email: '', subject: '', message: '' }}>
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label="Name"
            placeholder="Your name"
            variant="ghost"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="ghost"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Subject"
            placeholder="Subject"
            variant="ghost"
            {...register('subject')}
            error={errors.subject?.message}
          />
          <Textarea
            label="Message"
            placeholder="Your message..."
            variant="ghost"
            rows={4}
            {...register('message')}
            error={errors.message?.message}
          />
          <Button variant="solid" size="medium" type="submit">
            Send Message
          </Button>
        </>
      )}
    </Form>
  );
}`,
  },

  // ─── Settings ─────────────────────────────────────────────
  {
    name: 'settings',
    description:
      'Settings form with various input types — text, select, switch.',
    fields: [
      {
        name: 'displayName',
        component: 'Input',
        type: 'text',
        label: 'Display Name',
        validation: 'z.string().min(2)',
        props: { variant: 'ghost' },
      },
      {
        name: 'language',
        component: 'Select',
        type: 'select',
        label: 'Language',
        validation: 'z.string()',
        props: { variant: 'ghost' },
      },
      {
        name: 'notifications',
        component: 'Switch',
        type: 'checkbox',
        label: 'Enable Notifications',
        validation: 'z.boolean()',
      },
      {
        name: 'theme',
        component: 'Select',
        type: 'select',
        label: 'Theme',
        validation: 'z.enum(["light", "dark", "system"])',
        props: { variant: 'ghost' },
      },
    ],
    validationSchema: `import { z } from 'zod';

const settingsSchema = z.object({
  displayName: z.string().min(2),
  language: z.string(),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
});

type SettingsFormData = z.infer<typeof settingsSchema>;`,
    fullExample: `import { Form, Input, Select, Switch, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const settingsSchema = z.object({
  displayName: z.string().min(2),
  language: z.string(),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export function SettingsForm() {
  const handleSubmit = (data: SettingsFormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ displayName: '', language: 'en', notifications: true, theme: 'system' }}>
      {({ register, setValue, watch }) => (
        <>
          <Input
            label="Display Name"
            variant="ghost"
            {...register('displayName')}
          />
          <Select
            label="Language"
            variant="ghost"
            options={[
              { name: 'English', value: 'en' },
              { name: 'Spanish', value: 'es' },
              { name: 'Portuguese', value: 'pt' },
            ]}
            value={watch('language')}
            onSelect={(val) => setValue('language', val)}
          />
          <Switch
            label="Enable Notifications"
            checked={watch('notifications')}
            onChange={(val) => setValue('notifications', val)}
          />
          <Select
            label="Theme"
            variant="ghost"
            options={[
              { name: 'Light', value: 'light' },
              { name: 'Dark', value: 'dark' },
              { name: 'System', value: 'system' },
            ]}
            value={watch('theme')}
            onSelect={(val) => setValue('theme', val)}
          />
          <Button variant="solid" size="medium" type="submit">
            Save Settings
          </Button>
        </>
      )}
    </Form>
  );
}`,
  },

  // ─── Search / Filter ──────────────────────────────────────
  {
    name: 'search-filter',
    description:
      'Search and filter form with InputSearcher, Select, and DatePicker.',
    fields: [
      {
        name: 'query',
        component: 'InputSearcher',
        type: 'text',
        label: 'Search',
        validation: 'z.string().optional()',
        props: { variant: 'ghost', placeholder: 'Search...' },
      },
      {
        name: 'category',
        component: 'Select',
        type: 'select',
        label: 'Category',
        validation: 'z.string().optional()',
        props: { variant: 'ghost' },
      },
      {
        name: 'dateFrom',
        component: 'DatePicker',
        type: 'date',
        label: 'From Date',
        validation: 'z.date().optional()',
      },
      {
        name: 'dateTo',
        component: 'DatePicker',
        type: 'date',
        label: 'To Date',
        validation: 'z.date().optional()',
      },
    ],
    validationSchema: `import { z } from 'zod';

const searchFilterSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

type SearchFilterFormData = z.infer<typeof searchFilterSchema>;`,
    fullExample: `import { Form, InputSearcher, Select, DatePicker, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const searchFilterSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

type SearchFilterFormData = z.infer<typeof searchFilterSchema>;

export function SearchFilterForm({ onFilter }: { onFilter: (data: SearchFilterFormData) => void }) {
  return (
    <Form onSubmit={onFilter} defaultValues={{ query: '', category: '', dateFrom: undefined, dateTo: undefined }}>
      {({ setValue, watch }) => (
        <div className="flex flex-wrap gap-4 items-end">
          <InputSearcher
            label="Search"
            variant="ghost"
            placeholder="Search..."
            options={[]}
            initialValue={watch('query') || ''}
            onOptionSelect={(opt) => setValue('query', Array.isArray(opt) ? opt[0]?.value : opt.value)}
          />
          <Select
            label="Category"
            variant="ghost"
            options={[
              { name: 'All', value: '' },
              { name: 'Category A', value: 'a' },
              { name: 'Category B', value: 'b' },
            ]}
            value={watch('category') || ''}
            onSelect={(val) => setValue('category', val)}
          />
          <DatePicker
            label="From Date"
            value={watch('dateFrom')}
            onChange={(date) => setValue('dateFrom', date)}
          />
          <DatePicker
            label="To Date"
            value={watch('dateTo')}
            onChange={(date) => setValue('dateTo', date)}
          />
          <Button variant="solid" size="small" type="submit">
            Apply Filters
          </Button>
        </div>
      )}
    </Form>
  );
}`,
  },

  // ─── CRUD ─────────────────────────────────────────────────
  {
    name: 'crud',
    description: 'Generic CRUD form template for entity creation/editing.',
    fields: [
      {
        name: 'name',
        component: 'Input',
        type: 'text',
        label: 'Name',
        validation: 'z.string().min(1, "Required")',
        props: { variant: 'ghost', placeholder: 'Enter name' },
      },
      {
        name: 'description',
        component: 'Textarea',
        type: 'textarea',
        label: 'Description',
        validation: 'z.string().optional()',
        props: {
          variant: 'ghost',
          placeholder: 'Enter description',
          rows: '3',
        },
      },
      {
        name: 'status',
        component: 'Select',
        type: 'select',
        label: 'Status',
        validation: 'z.enum(["active", "inactive", "draft"])',
        props: { variant: 'ghost' },
      },
    ],
    validationSchema: `import { z } from 'zod';

const entitySchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"]),
});

type EntityFormData = z.infer<typeof entitySchema>;`,
    fullExample: `import { Form, Input, Textarea, Select, Button } from '@e-burgos/tucu-ui';
import { z } from 'zod';

const entitySchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"]),
});

type EntityFormData = z.infer<typeof entitySchema>;

interface CrudFormProps {
  initialData?: Partial<EntityFormData>;
  onSubmit: (data: EntityFormData) => void;
  isEditing?: boolean;
}

export function CrudForm({ initialData, onSubmit, isEditing }: CrudFormProps) {
  return (
    <Form onSubmit={onSubmit} defaultValues={{ name: '', description: '', status: 'draft', ...initialData }}>
      {({ register, setValue, watch, formState: { errors } }) => (
        <>
          <Input
            label="Name"
            variant="ghost"
            placeholder="Enter name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Textarea
            label="Description"
            variant="ghost"
            placeholder="Enter description"
            rows={3}
            {...register('description')}
          />
          <Select
            label="Status"
            variant="ghost"
            options={[
              { name: 'Active', value: 'active' },
              { name: 'Inactive', value: 'inactive' },
              { name: 'Draft', value: 'draft' },
            ]}
            value={watch('status')}
            onSelect={(val) => setValue('status', val)}
          />
          <Button variant="solid" size="medium" type="submit">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </>
      )}
    </Form>
  );
}`,
  },
];

// ─── Helper functions ───────────────────────────────────────────────────────

export function getFormPatternByName(name: string): FormPattern | undefined {
  return formPatterns.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export function getAvailableFormPatterns(): string[] {
  return formPatterns.map((p) => p.name);
}
