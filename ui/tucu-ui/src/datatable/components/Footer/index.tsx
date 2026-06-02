import React from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { TData } from '../../common/types';
import { cn } from '../../common/helpers/cn';
import useGetCommonPinningStyles from '../../hooks/useGetCommonPinningStyles';

/**
 * FooterProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param className - The className
 * @param sx - The sx
 * @param table - The table
 */
interface FooterProps {
  className?: string;
  sx?: React.CSSProperties;
  table: Table<TData>;
}

const Footer: React.FC<FooterProps> = ({ className, sx, table }) => {
  return (
    <div
      role="rowgroup"
      data-testid="table-footer"
      className={cn(['max-h-[48px]', className])}
      style={sx}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <div
          key={footerGroup.id}
          role="row"
          className="flex items-center h-full max-h-full min-h-full bg-table-header-bg"
        >
          {footerGroup.headers
            .filter((header) => header.column.getIsVisible())
            .map((header, index) => {
              const { pinStyles, isPinned } = useGetCommonPinningStyles(
                header.column
              );
              const width = header.getSize();

              return (
                <div
                  key={header.id}
                  role="cell"
                  className={cn([
                    'min-w-0 relative overflow-hidden whitespace-nowrap text-ellipsis p-0 h-full transition-[background-color] duration-200 ease-in-out',
                    isPinned ? 'bg-table-header-pinned' : 'bg-table-header-bg',
                    index !== footerGroup.headers?.length - 1 &&
                      'border-r  border-table-divider',
                  ])}
                  style={{
                    ...pinStyles,
                    width: width,
                    minWidth: header.column.columnDef.minSize,
                    maxWidth: header.column.columnDef.maxSize,
                  }}
                >
                  <div className="flex items-center justify-start bg-transparent w-full max-w-full p-0 h-full box-border px-3">
                    <div className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap items-center text-table-secondary-text">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Footer;
