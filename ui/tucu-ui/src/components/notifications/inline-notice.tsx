import React from 'react';
import { cn } from '../../libs/cn';
import { Check } from '../icons/check';
import { InfoCircle } from '../icons/info-circle';
import { Warning } from '../icons/warning';
import { Alert } from './alert';

export type InlineNoticeTone = 'error' | 'success' | 'info' | 'warning';

export interface InlineNoticeProps {
  /** Status of the notice; error announces assertively, the rest politely. */
  tone?: InlineNoticeTone;
  /** One message renders inline, several render as a bullet list. Renders nothing when empty. */
  messages: string | string[] | React.ReactNode;
  /** Extra class names merged after the defaults. */
  className?: string;
}

const toneIcons: Record<InlineNoticeTone, React.ElementType> = {
  error: InfoCircle,
  success: Check,
  info: InfoCircle,
  warning: Warning,
};

function isRenderable(message: React.ReactNode): boolean {
  return (
    message !== null &&
    message !== undefined &&
    message !== '' &&
    message !== false &&
    message !== true
  );
}

function toMessageList(
  messages: InlineNoticeProps['messages']
): React.ReactNode[] {
  const list: React.ReactNode[] = Array.isArray(messages)
    ? messages
    : [messages];
  return list.filter(isRenderable);
}

export function InlineNotice({
  tone = 'error',
  messages,
  className,
}: InlineNoticeProps) {
  const list = toMessageList(messages);
  if (list.length === 0) return null;

  const Icon = toneIcons[tone];

  return (
    <Alert
      data-tucu="inline-notice"
      data-tone={tone}
      variant={tone}
      appearance="soft"
      live={tone === 'error' ? 'assertive' : 'polite'}
      density="compact"
      className={cn('flex items-start gap-3 p-3 leading-5', className)}
    >
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <div data-tucu="inline-notice-body" className="min-w-0">
        {list.length === 1 ? (
          list[0]
        ) : (
          <ul className="list-disc space-y-1 ps-4">
            {list.map((message, index) => (
              <li key={typeof message === 'string' ? message : index}>
                {message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Alert>
  );
}

export default InlineNotice;
