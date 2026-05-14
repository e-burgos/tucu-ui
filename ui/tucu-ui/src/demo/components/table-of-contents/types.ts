export interface TableOfContentsItem {
  id: string;
  label: string;
  category?: string;
}

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
  title?: string;
  className?: string;
  onItemClick?: (item: TableOfContentsItem) => void;
  children?: React.ReactNode;
  onSidebarToggle?: (isOpen: boolean) => void;
  /** Navigation mode: 'anchor' scrolls to sections (default), 'route' navigates via onItemClick */
  navigationMode?: 'anchor' | 'route';
  /** Active section ID (used in 'route' mode to highlight the current item) */
  activeSectionId?: string;
}
