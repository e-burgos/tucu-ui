import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Modal,
  Select,
  ThemeScope,
  Typography,
  listThemePresets,
  resolveThemePreset,
  type SelectOption,
} from '@e-burgos/tucu-ui';

const scopeSelectOptions: SelectOption[] = [
  { name: 'Weekly', value: 'weekly' },
  { name: 'Monthly', value: 'monthly' },
  { name: 'Yearly', value: 'yearly' },
];

interface ScopeShowcaseProps {
  preset: string;
  mode: 'light' | 'dark';
}

const ScopeShowcase: React.FC<ScopeShowcaseProps> = ({ preset, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<SelectOption>(scopeSelectOptions[0]);

  return (
    <ThemeScope
      preset={preset}
      mode={mode}
      className="relative flex-1 min-w-[280px] rounded-xl p-4 sm:p-6 space-y-4"
    >
      <Typography tag="h4">
        {preset} · {mode}
      </Typography>
      <Card>
        <Typography tag="p">
          Card, buttons and select inherit the scope preset.
        </Typography>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <Select
        label="Period"
        options={scopeSelectOptions}
        selectedOption={period}
        onChange={setPeriod}
      />
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Open modal
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="sm"
        text={{ title: `Modal in ${preset}` }}
      >
        <Typography tag="p">
          This modal is mounted in the scope portal host, so it keeps the{' '}
          {preset} preset in {mode} mode.
        </Typography>
      </Modal>
    </ThemeScope>
  );
};

const resolveSnippet = `import { registerThemePresets, resolveThemePreset } from '@e-burgos/tucu-ui';

registerThemePresets({
  name: 'acme',
  accent: '#e11d48',
  darkAccent: '#fb7185',
  radius: 'lg',
  cards: 'solid',
  buttons: 'pill',
});

const preset = resolveThemePreset({
  host: window.location.host,
  tenant,
  rules: [
    { host: 'app.acme.com', preset: 'acme' },
    { host: '*.partner.io', preset: 'classic' },
    { tenant: 'globex', preset: { name: 'globex', accent: '#0ea5e9' } },
  ],
  fallback: 'glass',
});

<ThemeProvider preset={preset} defaultMode="system" menuItems={menuItems}>
  <App />
</ThemeProvider>`;

const scopeSnippet = `<div className="flex gap-4">
  <ThemeScope preset="vibrant" mode="light">
    <Card>...</Card>
    <Button>Primary</Button>
    <Select options={options} />
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>...</Modal>
  </ThemeScope>
  <ThemeScope preset="elegant" mode="dark">...</ThemeScope>
</div>`;

const contractSnippet = `/* variables written by presets and scopes */
--tucu-accent  --tucu-accent-contrast
--tucu-radius  --tucu-control-radius
--tucu-font    --tucu-heading-font
--tucu-card-bg --tucu-card-border --tucu-card-shadow --tucu-card-blur

/* attributes on the scope root */
data-tucu-theme  data-tucu-mode
data-tucu-cards="glass|solid|outlined"
data-tucu-buttons="rounded|pill|square"
data-tucu-font   data-tucu-heading-font`;

const resolvedPreview = resolveThemePreset({
  host: 'shop.partner.io',
  rules: [{ host: '*.partner.io', preset: 'classic' }],
  fallback: 'glass',
});

const ThemePresetsSection: React.FC = () => (
  <>
    <HeroCard
      title="Theme Presets & ThemeScope"
      description="Built-in and custom presets, scoped to the whole document or to a single subtree, with overlays that keep the scope theme."
      icon={
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
          <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
        </div>
      }
    />

    <CardContainer className="overflow-hidden">
      <CardTitle title="Two scopes, two presets" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            Built-in presets: {listThemePresets().map((p) => p.name).join(', ')}
            . Open the select and the modal in each scope: their portals mount
            inside the scope and keep its preset and mode.
          </Typography>
          <div className="flex flex-col lg:flex-row gap-4">
            <ScopeShowcase preset="vibrant" mode="light" />
            <ScopeShowcase preset="elegant" mode="dark" />
          </div>
          <CodeBlock language="tsx" code={scopeSnippet} />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="Register and resolve by host" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            resolveThemePreset picks a preset by host (exact or wildcard),
            tenant, or falls back. For shop.partner.io this page resolves to{' '}
            <code className="text-brand">{resolvedPreview?.name}</code>.
          </Typography>
          <CodeBlock language="tsx" code={resolveSnippet} />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="Public contract" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            dark: utilities respect one level of opposite-mode nesting (a light
            scope inside html.dark). Deeper alternation is not supported.
          </Typography>
          <CodeBlock language="css" code={contractSnippet} />
        </div>
      </CardTitle>
    </CardContainer>
  </>
);

export default ThemePresetsSection;
