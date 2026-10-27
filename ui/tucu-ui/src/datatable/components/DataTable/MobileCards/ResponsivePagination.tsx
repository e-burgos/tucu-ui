'use client';

import React from 'react';
import CompactPagination from './CompactPagination';
import { MOBILE_CARDS_CLASSES, ResolvedMobileCards } from './breakpoints';
import type { CompactPaginationModel } from './paginationModels';

export interface ResponsivePaginationProps {
  mobileCards: ResolvedMobileCards | null;
  model?: CompactPaginationModel;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ResponsivePagination: React.FC<ResponsivePaginationProps> = ({
  mobileCards,
  model,
  style,
  children,
}) => {
  if (!mobileCards || !model) return <>{children}</>;
  const classes = MOBILE_CARDS_CLASSES[mobileCards.breakpoint];
  return (
    <>
      <div className={classes.fullPagination}>{children}</div>
      <CompactPagination
        model={model}
        className={classes.compactPagination}
        style={style}
      />
    </>
  );
};

export default ResponsivePagination;
