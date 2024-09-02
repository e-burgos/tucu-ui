import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import {
  HoverType,
  IRowActions,
  RowActionsType,
  TData,
} from '../../../../../common/types';
import useTableColors from '../../../../../hooks/useTableColors';
import AssetButton from '../../../../Assets/AssetButton';
import DeleteIndicator from '../../../../Assets/DeleteIndicator';
import DownloadIndicator from '../../../../Assets/DownloadIndicator';
import EditIndicator from '../../../../Assets/EditIndicator';
import MoreIndicator from '../../../../Assets/MoreIndicator';
import VisibilityIndicator from '../../../../Assets/VisibilityIndicator';
import VoidIndicator from '../../../../Assets/VoidIndicator';
import styles from './row-actions-cell.module.css';

interface RowActionsCellProps {
  row: Row<TData>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  setHoverRow: (value: HoverType) => void;
  setOpenActions?: (value: boolean) => void;
}

const RowActionsCell: React.FC<RowActionsCellProps> = ({
  row,
  hoverRow,
  rowActions,
  setOpenActions,
  setHoverRow,
}) => {
  const { colors } = useTableColors();
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [hoverOption, setHoverOption] = useState<HoverType>({
    hover: false,
    index: 0,
  });

  useEffect(() => {
    setOpenActions?.(openOptions);
    if (!hoverRow.hover) setOpenOptions(false);
  }, [openOptions, setOpenActions, hoverRow.hover]);

  const handleAssetAction = (action: RowActionsType) => {
    switch (action) {
      case 'more':
        return <MoreIndicator size={20} direction={'vertical'} />;
      case 'view':
        return <VisibilityIndicator size={20} visibility={'on'} />;
      case 'delete':
        return <DeleteIndicator size={20} />;
      case 'edit':
        return <EditIndicator size={20} />;
      case 'download':
        return <DownloadIndicator size={20} />;
      case 'void':
        return <VoidIndicator size={20} />;
      default:
        return <MoreIndicator size={20} direction={'vertical'} />;
    }
  };

  return (
    <div
      style={{
        visibility: hoverRow.hover || openOptions ? 'visible' : 'hidden',
      }}
      className={styles.buttonContainer}
    >
      {rowActions?.length === 1 ? (
        <AssetButton active onClick={() => rowActions[0].onClick(row)}>
          {handleAssetAction(rowActions[0].action)}
        </AssetButton>
      ) : (
        <AssetButton active onClick={() => setOpenOptions(!openOptions)}>
          {handleAssetAction('more')}
        </AssetButton>
      )}
      {openOptions && (
        <div
          style={{
            backgroundColor: colors.paperBg,
            border: `1px solid ${colors.paperBg}`,
          }}
          className={styles.optionsContainer}
          onMouseLeave={() => {
            setOpenOptions(false);
            setHoverOption({ hover: false, index: 0 });
          }}
        >
          {rowActions?.map((action, index) => (
            <div
              key={action.action}
              className={styles.option}
              onClick={() => {
                action.onClick(row);
                setOpenOptions(false);
                setHoverRow({ hover: false, index: 0 });
              }}
              style={{
                backgroundColor:
                  hoverOption.hover && hoverOption.index === index
                    ? colors.rowHover
                    : colors.paperBg,
              }}
              onPointerEnter={() => setHoverOption({ hover: true, index })}
              onPointerLeave={() => setHoverOption({ hover: false, index })}
            >
              <p
                style={{
                  color: colors.primaryText,
                }}
              >
                {action.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RowActionsCell;
