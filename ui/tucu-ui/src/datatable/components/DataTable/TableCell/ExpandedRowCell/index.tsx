import { Row } from '@tanstack/react-table';
import { HoverType, TData } from '../../../../common/types';
import ArrowIndicator from '../../../Assets/ArrowIndicator';
import { IconButton } from '../../../Common/IconButton';

/**
 * Props for the ExpandedRowCell component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {Row<TData>} row - The row data.
 * @property {HoverType} hoverRow - The hover row data.
 *
 * @template TData - The type of the data in the table.
 */

interface ExpandedRowCellProps {
  row: Row<TData>;
  hoverRow: HoverType;
}

const ExpandedRowCell: React.FC<ExpandedRowCellProps> = ({
  row,
  //hoverRow
}) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <IconButton
        data-id="expanded-row-cell"
        onClick={row.getToggleExpandedHandler()}
        icon={
          row.getIsExpanded() ? (
            <ArrowIndicator direction="up" size={18} />
          ) : (
            <ArrowIndicator direction="down" size={18} />
          )
        }
      />
    </div>
  );
};

export default ExpandedRowCell;
