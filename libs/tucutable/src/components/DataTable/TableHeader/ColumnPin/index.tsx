import React, { useState } from 'react';
import { Header } from '@tanstack/react-table';
import { HoverType, TData } from '../../../../common/types';
import useTableColors from '../../../../hooks/useTableColors';
import PinIndicator from '../../../Assets/PinIndicator';
import styles from './column-pin.module.css';

interface ColumnPinProps {
  header: Header<TData, unknown>;
  color?: string;
  enablePinLeftColumns?: boolean;
  enablePinRightColumns?: boolean;
}

const ColumnPin: React.FC<ColumnPinProps> = ({
  header,
  color,
  enablePinLeftColumns,
  enablePinRightColumns,
}) => {
  const { colors } = useTableColors();
  const [hover, setHover] = useState<HoverType>({ hover: false, index: 0 });
  return (
    <div className={styles.container}>
      {enablePinLeftColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'left' && (
          <button
            className={styles.pinButton}
            onMouseEnter={() => setHover({ hover: true, index: 0 })}
            onMouseLeave={() => setHover({ hover: false, index: 0 })}
            onClick={() => {
              header.column.pin('left');
            }}
          >
            <PinIndicator
              direction="down"
              size={20}
              color={
                hover.hover && hover.index === 0 ? colors.primaryText : color
              }
            />
          </button>
        )}
      {header.column.getIsPinned() && (
        <button
          className={styles.pinButton}
          onMouseEnter={() => setHover({ hover: true, index: 1 })}
          onMouseLeave={() => setHover({ hover: false, index: 1 })}
          onClick={() => {
            header.column.pin(false);
          }}
        >
          <PinIndicator
            direction="down"
            size={20}
            color={
              hover.hover && hover.index === 1 ? colors.primaryText : color
            }
          />
        </button>
      )}
      {enablePinRightColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'right' && (
          <button
            className={styles.pinButton}
            onMouseEnter={() => setHover({ hover: true, index: 2 })}
            onMouseLeave={() => setHover({ hover: false, index: 2 })}
            onClick={() => {
              header.column.pin('right');
            }}
          >
            <PinIndicator
              direction="right"
              size={20}
              color={
                hover.hover && hover.index === 2 ? colors.primaryText : color
              }
            />
          </button>
        )}
    </div>
  );
};

export default ColumnPin;
