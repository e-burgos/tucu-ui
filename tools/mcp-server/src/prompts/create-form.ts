// ─── Prompt: create-form ─────────────────────────────────────────────────────

export function getCreateFormPrompt(fields: string, validation?: string): string {
  return `You are generating a form using @e-burgos/tucu-ui's Form system.

FIELDS: ${fields}
${validation ? `VALIDATION: ${validation}` : ''}

RULES:
1. Import { Form, Input, Select, Checkbox, Button } from '@e-burgos/tucu-ui'
2. Use the <Form /> component (wraps react-hook-form)
3. Define defaultValues in useFormProps
4. Define validation rules in validationSchema prop
5. All inputs must have a \`name\` prop (auto-registers with Form)
6. Submit button must have type="submit"
7. Use variant="solid" size="medium" on submit Button

PATTERN:
\`\`\`tsx
import { Form, Input, Select, Button } from '@e-burgos/tucu-ui';

interface FormData {
  // typed fields
}

const MyForm = () => (
  <Form<FormData>
    onSubmit={(data) => console.log(data)}
    useFormProps={{ defaultValues: { ... }, mode: 'onChange' }}
    validationSchema={{
      fieldName: { required: 'Required', minLength: { value: 3, message: 'Min 3' } }
    }}
    className="space-y-4"
  >
    <Input name="fieldName" label="Field" variant="ghost" />
    <Button type="submit" variant="solid" size="medium">Submit</Button>
  </Form>
);
\`\`\`

AVAILABLE INPUTS:
- Input: text, email, password, number, date (with dateFormat + locale)
- Select: options={SelectOption[]}, where SelectOption = { name, value, icon? }
- Checkbox: size="sm"|"md"|"lg", shape="rounded"|"square"
- Radio/RadioGroup: direction="vertical"|"horizontal"
- Textarea: for multiline text
- Switch: toggle ON/OFF
- FileInput: accept="img"|"pdf"|"all", multiple
- InputSearcher: autocomplete with search

Generate the form with correct types, validation, and proper variants.`;
}
