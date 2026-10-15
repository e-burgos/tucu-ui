import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Form,
  FormField,
  Input,
  Button,
  showToast,
} from '@e-burgos/tucu-ui';

const fieldTypesData = [
  {
    input: '<Input type="email" />',
    validator: 'email',
    value: '—',
  },
  {
    input: '<Input type="tel" />',
    validator: 'phone (international, 8–15 digits)',
    value: 'add mask="phone" to format',
  },
  {
    input: '<Input mask="phone" phoneCountry="AR" />',
    validator: 'phone, strict per country',
    value: '+54 9 11 2345-6789 · unmask → +5491123456789',
  },
  {
    input: '<Input mask="cuit" />',
    validator: 'CUIT/CUIL check digit',
    value: '20-12345678-6 · unmask → 20123456786',
  },
  {
    input: '<Input type="url" />',
    validator: 'url (http/https)',
    value: '—',
  },
  {
    input: '<Input mask="currency" />',
    validator: 'validationType="number"',
    value: '$ 1.234,56 · unmask → 1234.56',
  },
];

const fieldTypesColumns = [
  {
    key: 'input',
    label: 'Input',
    render: (value: unknown) => (
      <code className="text-xs text-brand">{String(value)}</code>
    ),
  },
  { key: 'validator', label: 'Built-in validator' },
  { key: 'value', label: 'Display / stored value' },
];

const formCode = `import { Form, FormField, Input, Button, showToast } from '@e-burgos/tucu-ui';

// <ThemeProvider lang="es" …> makes every built-in message Spanish
<Form<Customer> onSubmit={() => showToast('Cliente guardado', { variant: 'success' })}
  useFormProps={{ mode: 'onTouched' }}>
  <FormField<Customer> name="email" label="Email" rules={{ required: true }}>
    <Input type="email" />
  </FormField>
  <FormField<Customer> name="phone" label="Teléfono">
    <Input type="tel" mask="phone" unmask />
  </FormField>
  <FormField<Customer> name="cuit" label="CUIT">
    <Input mask="cuit" unmask />
  </FormField>
  <FormField<Customer> name="balance" label="Saldo">
    <Input mask="currency" unmask validationType="number" />
  </FormField>
  <Button type="submit">Guardar</Button>
</Form>`;

const helpersCode = `import {
  validateEmail, validatePhone, validateCuit, getValidationRules,
  formatPhone, normalizePhone, registerPhoneCountry,
} from '@e-burgos/tucu-ui';

validateEmail('ana@', { lang: 'es' });      // 'Ingresá un email válido, …'
validatePhone('11 2345-6789', { phoneCountry: 'AR' }); // undefined (valid)
validateCuit('20-12345678-6');              // undefined (valid)

formatPhone('5491123456789');               // '+54 9 11 2345-6789'
normalizePhone('011 15 2345-6789');         // '+5491123456789'

// react-hook-form rules for register() / validationSchema
register('cuit', getValidationRules('cuit', { lang: 'es', required: true }));

// Another country
registerPhoneCountry({
  code: 'UY', dialCode: '598',
  parseNational: (d) => ({ national: d.replace(/^0/, ''), mobile: false }),
  isValidNational: (n) => /^\\d{8}$/.test(n),
  formatNational: (d) => d.replace(/(\\d{2})(\\d{3})(\\d+)/, '$1 $2 $3'),
});`;

type Customer = {
  email: string;
  phone: string;
  cuit: string;
  balance: string;
};

const MasksAndValidatorsSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<Customer | null>(null);

  return (
    <section className="space-y-8">
      <div className="text-center">
        <Typography tag="h2" className="mb-2">
          Masks &amp; Built-in Validators
        </Typography>
        <Typography
          tag="p"
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Inputs format phone (Argentina by default), CUIT/CUIL, currency and
          numbers while typing. Email, phone, URL and CUIT fields validate by
          default, with messages in the ThemeProvider{' '}
          <code className="px-1 py-0.5 border border-border rounded text-xs">
            lang
          </code>{' '}
          (es, en, fr).
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <div className="w-full p-4 sm:p-6">
          <BasicTable
            columns={fieldTypesColumns}
            data={fieldTypesData as Array<Record<string, unknown>>}
          />
        </div>
      </CardContainer>

      <div className="grid gap-6 lg:grid-cols-2">
        <CardContainer>
          <CardTitle title="Live demo">
            <div className="w-full space-y-4 p-4">
              <Form<Customer>
                onSubmit={(data) => {
                  setSubmitted(data);
                  showToast('Saved', { variant: 'success' });
                }}
                useFormProps={{ mode: 'onTouched' }}
              >
                <FormField<Customer>
                  name="email"
                  label="Email"
                  rules={{ required: true }}
                >
                  <Input type="email" placeholder="ana@optica.com.ar" />
                </FormField>
                <FormField<Customer> name="phone" label="Phone (AR)">
                  <Input
                    type="tel"
                    mask="phone"
                    unmask
                    placeholder="11 2345-6789"
                  />
                </FormField>
                <FormField<Customer> name="cuit" label="CUIT">
                  <Input mask="cuit" unmask placeholder="20-12345678-6" />
                </FormField>
                <FormField<Customer> name="balance" label="Balance">
                  <Input
                    mask="currency"
                    unmask
                    validationType="number"
                    placeholder="$ 0,00"
                  />
                </FormField>
                <Button type="submit">Submit</Button>
              </Form>
              {submitted && (
                <CodeBlock
                  language="json"
                  code={JSON.stringify(submitted, null, 2)}
                />
              )}
            </div>
          </CardTitle>
        </CardContainer>
        <CardContainer>
          <CardTitle title="Usage">
            <div className="w-full p-4">
              <CodeBlock language="tsx" code={formCode} />
            </div>
          </CardTitle>
        </CardContainer>
      </div>

      <CardContainer>
        <CardTitle title="Standalone helpers">
          <div className="w-full p-4">
            <CodeBlock language="tsx" code={helpersCode} />
          </div>
        </CardTitle>
      </CardContainer>
    </section>
  );
};

export default MasksAndValidatorsSection;
