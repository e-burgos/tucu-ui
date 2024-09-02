import React from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { TData } from '../../common/types';
import useTableColors from '../../hooks/useTableColors';

interface FooterProps {
  className?: string;
  sx?: React.CSSProperties;
  table: Table<TData>;
}
const Footer: React.FC<FooterProps> = ({ className, sx, table }) => {
  const { colors } = useTableColors();
  return (
    <tfoot
      className={className}
      style={{ borderTop: `1px solid ${colors.divider}`, ...sx }}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header, index) => (
            <th key={header.id}>
              <div
                style={{
                  borderRight:
                    index !== footerGroup.headers?.length - 1
                      ? `2px solid ${colors.divider}`
                      : undefined,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

export default Footer;
