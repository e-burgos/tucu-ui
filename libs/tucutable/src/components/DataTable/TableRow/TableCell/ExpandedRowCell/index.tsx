import { Row } from '@tanstack/react-table';
import { HoverType, TData } from '../../../../../common/types';
import ArrowIndicator from '../../../../Assets/ArrowIndicator';
import AssetButton from '../../../../Assets/AssetButton';
import styles from './expanded-row-cell.module.css';

interface ExpandedRowCellProps {
  row: Row<TData>;
  hoverRow: HoverType;
}

const ExpandedRowCell: React.FC<ExpandedRowCellProps> = ({ row, hoverRow }) => {
  return (
    <div className={styles.container}>
      <AssetButton
        data-id="expanded-row-cell"
        bgColor={hoverRow.hover ? 'actionHover' : 'row'}
        onClick={row.getToggleExpandedHandler()}
      >
        {row.getIsExpanded() ? (
          <ArrowIndicator direction="up" size={20} />
        ) : (
          <ArrowIndicator direction="down" size={20} />
        )}
      </AssetButton>
    </div>
  );
};

export default ExpandedRowCell;
