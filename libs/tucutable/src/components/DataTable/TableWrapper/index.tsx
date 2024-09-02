import React from 'react';
import styles from '../../../common/styles/main.module.css';
import { IDataTableStyles } from '../../../common/types';
import useTableColors from '../../../hooks/useTableColors';

export interface TableWrapperProps {
  tableId: string;
  title?: string;
  border?: boolean;
  headerContainer?: React.ReactNode;
  children: React.ReactNode;
  sx?: IDataTableStyles;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableId,
  title,
  border,
  headerContainer,
  children,
  sx,
}) => {
  const { colors } = useTableColors();

  const handleBorder = () => {
    if (border) return `1px solid ${colors.divider}`;
    if (!border && border !== undefined) return 'none';
    if (title && border === undefined) return `1px solid ${colors.divider}`;
    if (headerContainer && border === undefined)
      return `1px solid ${colors.divider}`;
    return 'none';
  };

  return (
    <div
      id={`${tableId}-wapper`}
      className={`
        ${styles.wrapper} 
        ${title || headerContainer ? styles.borderWrapper : undefined} 
        ${border || border === undefined ? styles.border : undefined}`}
      style={{
        backgroundColor: colors.defaultBg,
        border: handleBorder(),
        borderRadius: border || title || headerContainer ? '4px' : '0px',
        ...sx?.wrapper,
      }}
    >
      {headerContainer && (
        <div className={styles.headerContainer} style={{ ...sx?.container }}>
          {headerContainer}
        </div>
      )}
      {title && (
        <div className={styles.titleContainer}>
          <h6
            className={styles.title}
            style={{
              color: colors.primaryText,
            }}
          >
            {title}
          </h6>
        </div>
      )}
      {children}
    </div>
  );
};

export default TableWrapper;
