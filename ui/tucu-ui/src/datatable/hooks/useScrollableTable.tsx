import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

/**
 * UseScrollableTable
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @property {number} containerWith - The width of the container.
 * @property {boolean} isScrollable - Whether the table is scrollable.
 * @property {number} scrollX - The scroll x of the table.
 * @property {function} handleScroll - The function to handle the scroll of the table.
 *
 * @template TData - The type of the data in the table.
 */

export type UseScrollableTable = {
  containerWith: number;
  isScrollable: boolean;
  scrollX: number;
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

/**
 * useScrollableTable
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param {React.MutableRefObject<HTMLDivElement>} tableContainerRef - The ref of the table container.
 * @returns {UseScrollableTable} The object with the container width, is scrollable, scroll x, and handle scroll.
 *
 * @template TData - The type of the data in the table.
 */

export const useScrollableTable = (
  tableContainerRef: React.MutableRefObject<HTMLDivElement>
): UseScrollableTable => {
  const [scrollX, setScrollX] = useState<number>(0);
  const containerElement = tableContainerRef.current;
  const [containerWith, setContainerWidth] = useState(
    containerElement?.clientWidth
  );
  const isScrollable =
    containerElement?.scrollWidth > containerElement?.clientWidth;

  const handleScroll = debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    setScrollX(scrollLeft);
  }, 50);

  useEffect(() => {
    function updateSize() {
      const containerElement = tableContainerRef.current;
      setContainerWidth(containerElement?.clientWidth || 0);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [tableContainerRef]);

  return {
    containerWith,
    isScrollable,
    scrollX,
    handleScroll,
  };
};

export default useScrollableTable;
