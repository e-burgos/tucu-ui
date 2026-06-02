import { ExpandedColumn } from './helpers/ExpandedColumn';
import { RowActionsColumn } from './helpers/RowActionsColumn';
import { RowSelectionColumn } from './helpers/RowSelectionColumn';

export const IGNORE_REPORT_COLUMNS = [
  RowActionsColumn.id,
  ExpandedColumn.id,
  RowSelectionColumn.id,
];
