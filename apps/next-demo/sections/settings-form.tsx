'use client';

import { useState } from 'react';
import { Button, Form, FormField, Input } from '@e-burgos/tucu-ui';

type SettingsValues = { displayName: string; email: string };

export function SettingsForm() {
  const [saved, setSaved] = useState<SettingsValues | null>(null);

  return (
    <Form<SettingsValues>
      onSubmit={setSaved}
      useFormProps={{ defaultValues: { displayName: '', email: '' } }}
      className="max-w-md space-y-4"
    >
      <FormField<SettingsValues>
        name="displayName"
        label="Display name"
        rules={{ required: true }}
      >
        <Input placeholder="Your name" />
      </FormField>
      <FormField<SettingsValues>
        name="email"
        label="Email"
        rules={{ required: true }}
      >
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <Button type="submit">Save</Button>
      {saved && <p data-testid="saved">Saved {saved.displayName}</p>}
    </Form>
  );
}
