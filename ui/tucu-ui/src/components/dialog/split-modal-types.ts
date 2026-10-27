import type * as React from 'react';
import type { ModalCloseButtonProps, ModalSize } from './modal';

export type SplitModalItemStatus =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type SplitModalItemKind = 'nav' | 'info' | 'action';

export type SplitModalSelectionMode = 'nav' | 'option' | 'none';

export interface SplitModalAction {
  /** Unique id of the action. */
  id: string;
  /** Visible label; the accessible name when `sidebarActionsIconOnly` is set. */
  label: React.ReactNode;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Tooltip content; with `sidebarActionsIconOnly` it defaults to the label. */
  tooltip?: React.ReactNode;
  /** Called when the action is triggered. */
  onClick: () => void;
  /** Prevents triggering the action. */
  disabled?: boolean;
  /** Visual tone; `danger` marks destructive actions. Defaults to `default`. */
  variant?: 'default' | 'danger';
}

export interface SplitModalNavItem {
  /** Unique id of the item across every section; reported by `onActiveItemChange`. */
  id: string;
  /** Visible label of the item. */
  label: React.ReactNode;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Content rendered at the end of the item (counter, tag). */
  badge?: React.ReactNode;
  /** Renders a status dot with a localized screen-reader description. */
  status?: SplitModalItemStatus;
  /** Skips the item in keyboard navigation and prevents selecting it. */
  disabled?: boolean;
  /** Secondary line rendered under the label. */
  description?: React.ReactNode;
  /**
   * `nav` (default) is a selectable item; `info` is static content without button semantics or focus;
   * `action` is a plain button that calls `onClick` and never becomes active.
   */
  kind?: SplitModalItemKind;
  /** Value rendered at the end of an `info` item. */
  value?: React.ReactNode;
  /** Called by `action` items, and by any item of a section whose `selectionMode` is `none`. */
  onClick?: () => void;
}

export interface SplitModalSection {
  /** Unique id of the section. */
  id: string;
  /** Heading of the section, shown above its items from the `md` breakpoint. */
  label?: React.ReactNode;
  /** Navigation items of the section. */
  items: SplitModalNavItem[];
  /**
   * `nav` (default) follows the modal-level `activeItemId`; `option` keeps its own selection as a
   * radio group independent from the navigation; `none` renders plain buttons without active state.
   */
  selectionMode?: SplitModalSelectionMode;
  /** Selected item of an `option` section (controlled). */
  activeItemId?: string;
  /** Initially selected item of an `option` section when `activeItemId` is not provided. */
  defaultActiveItemId?: string;
  /** Called with the id of the item the user selects in an `option` section. */
  onActiveItemChange?: (id: string) => void;
}

export type SplitModalSidebarPosition = 'start' | 'end';

export interface SplitModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Called when the modal closes through the close button, Escape or the overlay. */
  onClose?: () => void;
  /** Mirrors `Modal`: called with `false` when the modal closes. */
  setIsOpen?: (isOpen: boolean) => void;
  /** Whether Escape and the overlay can close the modal. */
  closeable?: boolean;
  /** Hides the close button of the header. */
  hideCloseButton?: boolean;
  /** Title rendered in the header; it labels the dialog. */
  title?: React.ReactNode;
  /** Chips rendered next to the title. */
  chips?: React.ReactNode;
  /** Actions rendered at the end of the header, before the close button. */
  headerActions?: React.ReactNode;
  /** Navigation sections rendered in the sidebar (tab bar below `md`). */
  sections?: SplitModalSection[];
  /** Id of the active item (controlled). */
  activeItemId?: string;
  /** Id of the initially active item when `activeItemId` is not provided. */
  defaultActiveItemId?: string;
  /** Called with the id of the item the user selects. */
  onActiveItemChange?: (id: string) => void;
  /** Accessible name of the navigation landmark. Defaults to the localized `splitModal.navigation`. */
  navigationLabel?: string;
  /** Content rendered at the top of the sidebar, above the navigation. */
  sidebarHeader?: React.ReactNode;
  /** Compact action list rendered in the sidebar above `sidebarFooter`. */
  sidebarActions?: SplitModalAction[];
  /** Renders `sidebarActions` as icon buttons with a Tooltip instead of labelled rows. */
  sidebarActionsIconOnly?: boolean;
  /** Content rendered at the bottom of the sidebar (a bottom bar below `md`). */
  sidebarFooter?: React.ReactNode;
  /** Free sidebar content rendered after the navigation. */
  sidebar?: React.ReactNode;
  /** Side of the dialog where the sidebar sits from the `md` breakpoint. */
  sidebarPosition?: SplitModalSidebarPosition;
  /** Width of the sidebar from the `md` breakpoint; a CSS length or a number of pixels. */
  sidebarWidth?: number | string;
  /** Body content; it scrolls independently from the sidebar. */
  children?: React.ReactNode;
  /** Content rendered in a bar under the body. */
  footer?: React.ReactNode;
  /** Maximum width of the dialog; defaults to `56rem` unless `size` is set. */
  maxWidth?: number | string;
  /** Maximum height of the area below the header; defaults to the `Modal` height of the same `size` (`60vh` for `md`). */
  maxHeight?: number | string;
  /** Width preset of `Modal`; when set, the default `maxWidth` is not applied. */
  size?: ModalSize;
  /** Accessible name of the close button. Defaults to the localized `dialog.close`. */
  closeLabel?: string;
  /** Tooltip content shown on the close button through the tucu `Tooltip`. */
  closeTooltip?: React.ReactNode;
  /** Attributes spread onto the close button. */
  closeButtonProps?: ModalCloseButtonProps;
  /** Extra classes merged onto the backdrop overlay. */
  overlayClassName?: string;
  /** Extra classes merged onto the dialog panel. */
  className?: string;
  /** Extra classes merged onto the sidebar. */
  sidebarClassName?: string;
  /** Extra classes merged onto the scrollable body. */
  bodyClassName?: string;
  /** Element focused when the modal opens. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Accessible name of the dialog; takes precedence over `title`. */
  'aria-label'?: string;
  /** `data-*` attributes are forwarded to the element with `role="dialog"`. */
  [dataAttribute: `data-${string}`]: string | undefined;
}
