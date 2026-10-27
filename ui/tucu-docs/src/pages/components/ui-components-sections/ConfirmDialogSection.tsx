import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
  ConfirmDialog,
} from '@e-burgos/tucu-ui';
import type { ConfirmDialogTone } from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const tones: ConfirmDialogTone[] = ['danger', 'warning', 'info', 'success'];

const ConfirmDialogSection: React.FC = () => {
  const [tone, setTone] = useState<ConfirmDialogTone | null>(null);
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTone(null);
    }, 1200);
  };

  return (
    <>
      <HeroCard
        title="ConfirmDialog"
        description="Accessible confirmation dialog (role alertdialog) with tones, loading state and safe initial focus."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Tones" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography tag="p" className="mb-3">
              Confirm shows a spinner and blocks Escape and overlay closing
              while loading. The danger tone focuses Cancel first.
            </Typography>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <Button key={t} variant="outline" onClick={() => setTone(t)}>
                  {t}
                </Button>
              ))}
            </div>
            <ConfirmDialog
              isOpen={tone !== null}
              tone={tone ?? 'info'}
              title={`Confirm ${tone ?? ''} action`}
              description="This is the dialog description."
              loading={loading}
              onConfirm={confirm}
              onCancel={() => setTone(null)}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="ConfirmDialog" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ConfirmDialog } from '@e-burgos/tucu-ui';

<ConfirmDialog
  isOpen={open}
  tone="danger"
  title="Delete invoice?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  loading={deleting}
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ConfirmDialogSection;
