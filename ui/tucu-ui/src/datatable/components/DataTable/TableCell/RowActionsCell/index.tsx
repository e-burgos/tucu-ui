import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Row } from '@tanstack/react-table';
import { validateScopes } from '../../../../common/functions/user-scopes';
import {
  HoverType,
  IRowActions,
  RowActionsType,
  TData,
} from '../../../../common/types';
import useComponentEventListener from '../../../../hooks/useComponentEventListener';
import { cn } from '../../../../common/helpers/cn';
import DeleteIndicator from '../../../Assets/DeleteIndicator';
import DownloadIndicator from '../../../Assets/DownloadIndicator';
import EditIndicator from '../../../Assets/EditIndicator';
import MoreIndicator from '../../../Assets/MoreIndicator';
import OpenNewTab from '../../../Assets/OpenNewTab';
import ViewDetailsIndicator from '../../../Assets/ViewDetailsIndicator';
import VoidIndicator from '../../../Assets/VoidIndicator';
import { IconButton } from '../../../Common/IconButton';
import { Tooltip } from '../../../Common/Tooltip';

/**
 * Props for the RowActionsCell component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} tableId - The id of the table.
 * @property {Row<TData>} row - The row data.
 * @property {HoverType} hoverRow - The hover row data.
 * @property {Array<IRowActions<TData>>} rowActions - The row actions.
 * @property {function(HoverType): void} setHoverRow - The function to set the hover row.
 * @property {function(boolean): void} setOpenActions - The function to set the open actions.
 * @property {boolean} forceShowMenuActions - Whether to force show the menu actions.
 *
 * @template TData - The type of the data in the table.
 */

export interface RowActionsCellProps {
  tableId: string;
  row: Row<TData>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  setHoverRow: (value: HoverType) => void;
  setOpenActions: (value: boolean) => void;
  forceShowMenuActions?: boolean;
}

const RowActionsCell: React.FC<RowActionsCellProps> = ({
  tableId,
  row,
  hoverRow,
  rowActions,
  setOpenActions,
  setHoverRow,
  forceShowMenuActions,
}) => {
  const { element: tableContainer } = useComponentEventListener(
    `${tableId}-container`
  );
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [hoverOption, setHoverOption] = useState<HoverType>({
    hover: false,
    index: 0,
  });

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    bottom: 0,
  });
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
      });
    }
  };

  const closeMenu = useCallback(() => {
    setOpenActions(false);
    setOpenOptions(false);
    updateMenuPosition();
  }, [setOpenActions]);

  const openMenu = () => {
    const event = new CustomEvent('closeAllMenus');
    window.dispatchEvent(event);

    if (openOptions) {
      setOpenActions(false);
      setOpenOptions(false);
    } else {
      setOpenActions(true);
      setOpenOptions(true);
      updateMenuPosition();
    }
  };

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (openOptions) {
        updateMenuPosition();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [openOptions]);

  const handleAssetAction = (action: RowActionsType) => {
    switch (action) {
      case 'more':
        return <MoreIndicator size={18} direction={'vertical'} />;
      case 'view':
        return <ViewDetailsIndicator size={18} />;
      case 'delete':
        return <DeleteIndicator size={18} />;
      case 'edit':
        return <EditIndicator size={18} />;
      case 'download':
        return <DownloadIndicator size={18} />;
      case 'void':
        return <VoidIndicator size={18} />;
      case 'open-new-tab':
        return <OpenNewTab size={18} />;
      default:
        return <MoreIndicator size={18} direction={'vertical'} />;
    }
  };

  const isRowActionDisabled = (action: IRowActions<TData>) =>
    action?.disabled?.(row) ?? !validateScopes(action?.requiredScopes);

  const toggleTableScroll = useCallback(() => {
    if (tableContainer)
      tableContainer.style.overflow = openOptions ? 'hidden' : 'auto';
  }, [openOptions, tableContainer]);

  useEffect(() => {
    toggleTableScroll();
    setOpenActions?.(openOptions);
    // if (!hoverRow.hover) setOpenOptions(false);
  }, [hoverRow.hover, openOptions, setOpenActions, toggleTableScroll]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        openOptions &&
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(event.target as Node)
      ) {
        setHoverOption({ hover: false, index: 0 });
        setOpenOptions(false);
        setOpenActions(false);
      }
    };

    window.addEventListener('click', onClickOutside);

    return () => window.removeEventListener('click', onClickOutside);
  }, [openOptions, setOpenActions]);

  useEffect(() => {
    const handleCloseAllMenus = () => {
      closeMenu();
    };

    window.addEventListener('closeAllMenus', handleCloseAllMenus);
    return () => {
      window.removeEventListener('closeAllMenus', handleCloseAllMenus);
    };
  }, [closeMenu]);

  const firstActionRow = rowActions?.[0];
  const showMoreMenu = rowActions?.length === 1 && !forceShowMenuActions;

  const hideSingleAction = firstActionRow?.hidden?.(row);
  const singleActionLabel =
    firstActionRow?.showLabelInTooltip && firstActionRow?.label?.(row);
  const isSingleActionDisabled = Boolean(
    isRowActionDisabled(firstActionRow as IRowActions<TData>)
  );

  return (
    <>
      <div
        className={cn(
          'relative text-center',
          (hoverRow.hover || openOptions) && !hideSingleAction
            ? 'visible'
            : 'invisible'
        )}
        style={{ zIndex: openOptions ? 99999 : 'auto' }}
      >
        {showMoreMenu &&
        (firstActionRow?.showOptions?.(row) === undefined ||
          !firstActionRow?.showOptions?.(row)) ? (
          <Tooltip text={singleActionLabel as string} position="top">
            <IconButton
              isPinned
              icon={handleAssetAction(firstActionRow?.action as RowActionsType)}
              onClick={(event) => {
                // NO DELETE: stop event when send setRowClick in table
                event?.stopPropagation?.();
                firstActionRow?.onClick?.(row);
              }}
              disabled={isSingleActionDisabled}
              style={{
                margin: '0 auto',
              }}
            />
          </Tooltip>
        ) : (
          <IconButton
            icon={handleAssetAction('more')}
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={(event) => {
              // NO DELETE: stop event when send setRowClick in table
              event?.stopPropagation?.();
              openMenu();
            }}
            style={{
              margin: '0 auto',
            }}
          />
        )}
      </div>

      {openOptions &&
        createPortal(
          <div
            ref={optionsContainerRef}
            className={cn(
              'flex flex-col min-w-[175px] rounded px-0 py-2 w-max h-fit max-h-[200px] overflow-auto bg-table-paper-bg border border-table-divider fixed transition-all duration-100 ease-in table-dropdown-shadow'
            )}
            style={{
              top: menuPosition.top,
              left: menuPosition.left - 180,
              zIndex: 99999,
            }}
          >
            {rowActions?.map((action, index) => {
              const disabled = isRowActionDisabled(action);
              const isHovered =
                !disabled && hoverOption.hover && hoverOption.index === index;
              return (
                <div
                  key={`${tableId}-${row.id}-${action.action}-${index}`}
                  className={cn(
                    'flex flex-row justify-start items-center relative px-4 w-full h-[35px] gap-1',
                    action?.showOptions?.(row) === undefined ||
                      action?.showOptions?.(row)
                      ? 'flex'
                      : 'hidden',
                    isHovered ? 'bg-table-row-hover' : 'bg-table-paper-bg',
                    disabled ? 'cursor-default' : 'cursor-pointer'
                  )}
                  onClick={() => {
                    if (disabled) return;
                    action.onClick(row);
                    setOpenOptions(false);
                    setOpenActions(false);
                    setHoverRow({ hover: false, index: 0 });
                  }}
                  onPointerEnter={() => setHoverOption({ hover: true, index })}
                  onPointerLeave={() => setHoverOption({ hover: false, index })}
                >
                  <p
                    className={cn(
                      'font-sans text-base font-normal leading-6 tracking-[0.15px] text-left',
                      disabled
                        ? 'text-table-disabled'
                        : 'text-table-primary-text'
                    )}
                  >
                    {action.label(row)}
                  </p>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
};

export default RowActionsCell;
