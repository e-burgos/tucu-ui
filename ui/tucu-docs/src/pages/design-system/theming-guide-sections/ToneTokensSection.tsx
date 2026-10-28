import React from 'react';
import {
  Alert,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';

const toneTokenGroups: { group: string; tokens: string }[] = [
  {
    group: 'Alert without appearance',
    tokens: '--tucu-alert-{error,warning,success,info}-{bg,border,fg}',
  },
  {
    group: 'Tooltip color dark / light',
    tokens:
      '--tucu-tooltip-dark-{bg,fg}, --tucu-tooltip-light-{bg,fg,border,arrow-border}',
  },
  {
    group: 'Badge legacy color="light-dark", ConfirmDialog icon',
    tokens:
      '--tucu-badge-light-dark-{fg,border}, --tucu-confirm-dialog-{danger,warning,success,info}-{bg,fg}',
  },
  {
    group: 'ColorCard',
    tokens:
      '--tucu-color-card-<color>-{from,to,fg,border} (blue, indigo, cyan, purple, emerald, orange, green, red, pink, amber, teal, violet, rose, sky)',
  },
  {
    group: 'Input, Textarea, Select, PinCode, InputSearcher color',
    tokens:
      '--tucu-input-<tone>-accent, --tucu-input-<tone>-ghost-{border,border-hover,bg,ring}, --tucu-input-<tone>-solid-{border,bg,bg-hover,ring}, --tucu-input-<tone>-transparent-{bg,bg-hover,ring}, --tucu-control-<tone>-{accent-text,chip-bg,chip-bg-hover}, --tucu-control-text, --tucu-control-hover-ring (tone: primary, secondary, danger, info, success, warning)',
  },
  {
    group: 'FileInput color',
    tokens:
      '--tucu-file-input-<tone>-{wrapper-border,wrapper-bg,dropzone-border,dropzone-bg,dropzone-border-active,dropzone-bg-active}',
  },
  {
    group: 'Button',
    tokens:
      '--tucu-button-gray-{bg,text}, --tucu-button-transparent-{hover-bg,busy-bg}, --tucu-button-ring-offset, --tucu-button-disabled-{bg,text,solid-text}',
  },
];

const tokenOverrideSnippet = `:root {
  --tucu-alert-error-bg: #fff1f2;
  --tucu-alert-error-border: #fda4af;
  --tucu-alert-error-fg: #9f1239;
}

.dark {
  --tucu-alert-error-bg: #4c0519;
  --tucu-alert-error-border: #9f1239;
  --tucu-alert-error-fg: #fecdd3;
}

.billing-scope {
  --tucu-alert-info-bg: #ecfeff;
}`;

const classNameSnippet = `import { Alert } from '@e-burgos/tucu-ui';

<Alert
  variant="error"
  className="bg-rose-50 dark:bg-rose-950"
>
  Payment failed
</Alert>`;

const ToneTokensSection: React.FC = () => (
  <>
    <HeroCard
      title="Tone tokens"
      description="Component tone maps read CSS custom properties instead of dark: variants and !important, so any override wins in light, dark and ThemeScope."
      icon={
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-rose-500 via-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
          <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
        </div>
      }
    />

    <CardContainer className="overflow-hidden">
      <CardTitle title="What changed in v3.10.0" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            Since v3.10.0 the tone maps of Alert (without appearance), Tooltip
            (color dark / light), Badge legacy light-dark, ConfirmDialog,
            ColorCard, Button and the color variants of Input, Textarea, Select,
            PinCode, InputSearcher and FileInput read tokens declared in
            @layer components instead of dark: variants or !important. A
            utility in className or a token override wins in light and dark,
            also inside a ThemeScope.
          </Typography>
          <Alert variant="warning">
            The macOS themes (Sonoma and Tahoe) style these components with
            their own rules outside any layer, so while a macOS theme is
            active its colors win over tone tokens and className utilities.
            Tone tokens apply with the default themes.
          </Alert>
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="Token groups" className="mt-2 mb-2">
        <div className="w-full p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4 font-semibold">Group</th>
                <th className="py-2 font-semibold">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {toneTokenGroups.map((row) => (
                <tr
                  key={row.group}
                  className="border-b border-gray-100 dark:border-gray-800 align-top"
                >
                  <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">
                    Tones: {row.group}
                  </td>
                  <td className="py-2">
                    <code className="text-brand break-words">{row.tokens}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="Override with tokens or className" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            Override tokens globally on :root, per mode on .dark, or on any
            wrapper or scope.
          </Typography>
          <CodeBlock language="css" code={tokenOverrideSnippet} />
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            Or pass utilities directly in className.
          </Typography>
          <CodeBlock language="tsx" code={classNameSnippet} />
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer className="overflow-hidden">
      <CardTitle title="Live example" className="mt-2 mb-2">
        <div className="w-full space-y-4 p-4 sm:p-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            The second alert sets --tucu-alert-info-bg on its wrapper. With a
            macOS theme active both alerts look the same; switch to a default
            theme in the settings to see the override.
          </Typography>
          <Alert variant="info">Default info alert</Alert>
          <div
            style={
              { '--tucu-alert-info-bg': '#fef3c7' } as React.CSSProperties
            }
          >
            <Alert variant="info">Info alert with a token override</Alert>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  </>
);

export default ToneTokensSection;
