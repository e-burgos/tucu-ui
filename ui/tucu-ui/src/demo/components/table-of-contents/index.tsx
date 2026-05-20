import React from 'react';
import { useTheme, LAYOUT_OPTIONS } from '../../../index';
import type { TableOfContentsProps, TableOfContentsItem } from './types';
import { TocDefault } from './toc-default';
import { TocSonoma } from './toc-sonoma';
import { TocTahoe } from './toc-tahoe';

export type { TableOfContentsItem, TableOfContentsProps };

export const TableOfContents: React.FC<TableOfContentsProps> = (props) => {
  const { layout } = useTheme();

  if (
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK
  ) {
    return <TocTahoe {...props} />;
  }

  if (layout === LAYOUT_OPTIONS.MACOS) {
    return <TocSonoma {...props} />;
  }

  return <TocDefault {...props} />;
};

export default TableOfContents;
