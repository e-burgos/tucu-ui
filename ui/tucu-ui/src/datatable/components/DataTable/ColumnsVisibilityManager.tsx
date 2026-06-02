import React, { useState } from 'react';
import { useDataTableContext } from '../../context/index';
import Drawer from '../../../components/dialog/drawer';
import Button from '../../../components/buttons/button';
import Checkbox from '../../../components/inputs/checkbox';
import { SlidersHorizontal } from 'lucide-react';

export const ColumnsVisibilityManager: React.FC = () => {
  const context = useDataTableContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!context) return null;

  const { table } = context;
  if (!table) return null;

  // Filter columns that are hideable
  const columns = table.getAllLeafColumns().filter((col) => col.getCanHide());

  const handleToggleAll = (visible: boolean) => {
    columns.forEach((col) => {
      col.toggleVisibility(visible);
    });
  };

  return (
    <div className="flex items-center" data-testid="columns-visibility-manager">
      <Button
        variant="ghost"
        size="small"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        color="primary"
        className="border border-1! px-3! text-foreground! border-[var(--color-table-divider)]!"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-xs font-semibold">Columns</span>
      </Button>

      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position="right"
        type="sidebar"
        title="Manage Columns"
        className="w-80 bg-table-box-bg border-l border-table-divider"
      >
        <div className="flex flex-col h-full space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-table-divider pb-4 px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-table-secondary-text">
              Visible Columns
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="transparent"
                size="tiny"
                color="primary"
                onClick={() => handleToggleAll(true)}
                className="text-xs font-medium!"
              >
                Show All
              </Button>
              <span className="text-table-secondary-text opacity-40 text-xs">
                |
              </span>
              <Button
                variant="transparent"
                size="tiny"
                color="danger"
                onClick={() => handleToggleAll(false)}
                className="text-xs font-medium!"
              >
                Hide All
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 px-2">
            {columns.map((column) => {
              const id = column.id;
              const header = column.columnDef.header;
              const label =
                typeof header === 'string'
                  ? header
                  : typeof header === 'function'
                  ? id
                  : id;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-table-row-hover transition-colors"
                >
                  <Checkbox
                    id={`col-visibility-${id}`}
                    label={label}
                    checked={column.getIsVisible()}
                    onChange={(e) => column.toggleVisibility(e.target.checked)}
                    size="sm"
                    className="w-full select-none"
                    labelClassName="pl-2 font-medium text-table-primary-text text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ColumnsVisibilityManager;
