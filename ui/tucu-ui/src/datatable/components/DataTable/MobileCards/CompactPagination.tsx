'use client';

import React from 'react';
import { cn } from '../../../common/helpers/cn';
import { formatMessage } from '../../../../libs/i18n/messages';
import { useTucuMessages } from '../../../../libs/i18n/use-tucu-messages';
import ArrowIndicator from '../../Assets/ArrowIndicator';
import { IconButton } from '../../Common/IconButton';
import type { CompactPaginationModel } from './paginationModels';

export interface CompactPaginationProps {
  model: CompactPaginationModel;
  className?: string;
  style?: React.CSSProperties;
}

const CompactPagination: React.FC<CompactPaginationProps> = ({
  model,
  className,
  style,
}) => {
  const t = useTucuMessages().datatable;
  const { pageIndex, pageSize, total, pageCount } = model;
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <nav
      aria-label={t.pagination}
      data-tucu="datatable-pagination-compact"
      className={cn(
        'flex w-full flex-col items-center gap-1 border-t border-table-divider p-3 text-table-primary-text',
        className
      )}
      style={style}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <IconButton
          size="xl"
          isPinned
          onClick={model.onPrevious}
          disabled={!model.canPrevious}
          aria-label={t.previousPage}
          icon={<ArrowIndicator direction="left" />}
        />
        <span aria-live="polite" className="text-sm font-medium">
          {formatMessage(t.pageOf, { page: pageIndex + 1, pages: pageCount })}
        </span>
        <IconButton
          size="xl"
          isPinned
          onClick={model.onNext}
          disabled={!model.canNext}
          aria-label={t.nextPage}
          icon={<ArrowIndicator direction="right" />}
        />
      </div>
      <p className="m-0 text-xs text-table-secondary-text">
        {formatMessage(t.range, { from, to, total })}
      </p>
    </nav>
  );
};

export default CompactPagination;
