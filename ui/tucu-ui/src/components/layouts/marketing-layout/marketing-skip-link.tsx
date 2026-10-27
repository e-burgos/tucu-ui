'use client';

import { useTucuMessages } from '../../../libs/i18n/use-tucu-messages';

export function MarketingSkipLink({
  targetId,
  label,
}: {
  targetId: string;
  label?: string;
}) {
  const messages = useTucuMessages();
  return (
    <a
      href={`#${targetId}`}
      data-tucu="marketing-skip-link"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-lg dark:focus:bg-gray-900 dark:focus:text-white"
    >
      {label ?? messages.marketing.skipToContent}
    </a>
  );
}
